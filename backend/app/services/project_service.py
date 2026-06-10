# backend/app/services/project_service.py — Project service layer (TRD Section 5.7, 6.2)
import uuid
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import select, update, func, text, desc
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.project import Project
from app.models.project_star import ProjectStar


async def get_by_id(db: AsyncSession, project_id: uuid.UUID) -> Project | None:
    result = await db.execute(
        select(Project)
        .options(selectinload(Project.owner))
        .where(Project.id == project_id)
    )
    return result.scalar_one_or_none()


async def list_projects(
    db: AsyncSession,
    page: int = 1,
    per_page: int = 20,
    type_filter: Optional[str] = None,
    category_filter: Optional[str] = None,
    tags_filter: Optional[list[str]] = None,
    city_filter: Optional[str] = None,
    college_filter: Optional[str] = None,
    search_query: Optional[str] = None,
    sort: str = "latest",
) -> tuple[list[Project], int]:
    """List projects with filters, search, sort, and pagination."""
    query = select(Project).options(selectinload(Project.owner)).where(Project.status != "inactive")

    # Filters
    if type_filter:
        query = query.where(Project.type == type_filter)
    if category_filter:
        query = query.where(Project.category == category_filter)
    if tags_filter:
        query = query.where(Project.tags.overlap(tags_filter))
    if city_filter:
        query = query.where(Project.city == city_filter)
    if college_filter:
        query = query.where(Project.college == college_filter)

    # Full-text search (TRD Section 5.6) — NEVER use ILIKE
    if search_query and len(search_query) >= 2:
        ts_query = func.plainto_tsquery("english", search_query)
        query = query.where(Project.search_vector.op("@@")(ts_query))
        # Order by relevance when searching
        if sort == "latest":
            query = query.order_by(
                func.ts_rank(Project.search_vector, ts_query).desc(),
                Project.created_at.desc(),
            )

    # Sort
    if not (search_query and len(search_query) >= 2 and sort == "latest"):
        if sort == "latest":
            query = query.order_by(Project.created_at.desc())
        elif sort == "trending":
            query = query.order_by(Project.trending_score.desc())
        elif sort == "month":
            thirty_days_ago = datetime.now(timezone.utc).replace(
                day=1, hour=0, minute=0, second=0, microsecond=0
            )
            query = query.where(Project.created_at >= thirty_days_ago)
            query = query.order_by(Project.created_at.desc())

    # Count total before pagination
    count_query = select(func.count()).select_from(query.subquery())
    total_result = await db.execute(count_query)
    total = total_result.scalar()

    # Pagination
    offset = (page - 1) * per_page
    query = query.offset(offset).limit(per_page)

    result = await db.execute(query)
    projects = result.scalars().all()

    return list(projects), total


async def create_project(db: AsyncSession, owner_id: uuid.UUID, data: dict) -> Project:
    # Convert looking_for string to array
    looking_for = data.pop("looking_for", "")
    if isinstance(looking_for, str):
        looking_for = [s.strip() for s in looking_for.split(",") if s.strip()]

    project = Project(owner_id=owner_id, looking_for=looking_for, **data)
    db.add(project)
    await db.commit()
    await db.refresh(project)
    return project


async def update_project(db: AsyncSession, project: Project, data: dict) -> Project:
    for key, value in data.items():
        if value is not None:
            if key == "looking_for" and isinstance(value, str):
                value = [s.strip() for s in value.split(",") if s.strip()]
            setattr(project, key, value)
    await db.commit()
    await db.refresh(project)
    return project


async def delete_project(db: AsyncSession, project: Project) -> None:
    await db.delete(project)
    await db.commit()


async def toggle_star(
    db: AsyncSession, project_id: uuid.UUID, user_id: uuid.UUID
) -> tuple[bool, int]:
    """Star toggle with atomic counter update (TRD Section 5.7)."""
    existing = await db.get(ProjectStar, (project_id, user_id))
    if existing:
        await db.delete(existing)
        await db.execute(
            update(Project)
            .where(Project.id == project_id)
            .values(star_count=Project.star_count - 1)
        )
        starred = False
    else:
        db.add(ProjectStar(project_id=project_id, user_id=user_id))
        await db.execute(
            update(Project)
            .where(Project.id == project_id)
            .values(star_count=Project.star_count + 1)
        )
        starred = True
    await db.commit()

    # Return updated count
    project = await db.get(Project, project_id)
    return starred, project.star_count


async def update_status(db: AsyncSession, project: Project, status: str) -> Project:
    project.status = status
    await db.commit()
    await db.refresh(project)
    return project


async def get_trending_tags(db: AsyncSession) -> list[dict]:
    """Top 10 tags by usage in last 7 days (TRD Section 6.2)."""
    from datetime import timedelta

    cutoff = datetime.now(timezone.utc) - timedelta(days=7)
    result = await db.execute(
        text("""
            SELECT tag, COUNT(*) as count
            FROM projects, LATERAL unnest(tags) AS tag
            WHERE created_at >= :cutoff AND status != 'inactive'
            GROUP BY tag
            ORDER BY count DESC
            LIMIT 10
        """),
        {"cutoff": cutoff},
    )
    return [{"tag": row[0], "count": row[1]} for row in result.fetchall()]


async def get_user_projects(db: AsyncSession, owner_id: uuid.UUID) -> list[Project]:
    result = await db.execute(
        select(Project)
        .where(Project.owner_id == owner_id)
        .order_by(Project.created_at.desc())
    )
    return list(result.scalars().all())
