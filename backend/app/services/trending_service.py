# backend/app/services/trending_service.py — Trending score recalculation (TRD Section 5.8)
from datetime import datetime, timedelta, timezone

from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.project import Project
from app.models.project_star import ProjectStar
from app.models.contribution import Contribution
from app.database import async_session


async def recalculate_trending(db: AsyncSession):
    """
    Recalculate trending scores for all projects.
    Formula: (stars_7d * 2) + (requests_7d * 3) + (total_stars * 0.1)
    """
    cutoff = datetime.now(timezone.utc) - timedelta(days=7)

    # Stars gained in last 7 days per project
    stars_result = await db.execute(
        select(
            ProjectStar.project_id,
            func.count().label("count"),
        )
        .where(ProjectStar.created_at >= cutoff)
        .group_by(ProjectStar.project_id)
    )
    stars_7d_map = {row[0]: row[1] for row in stars_result.fetchall()}

    # Contribution requests in last 7 days per project
    requests_result = await db.execute(
        select(
            Contribution.project_id,
            func.count().label("count"),
        )
        .where(Contribution.created_at >= cutoff)
        .group_by(Contribution.project_id)
    )
    requests_7d_map = {row[0]: row[1] for row in requests_result.fetchall()}

    # Update all projects
    projects_result = await db.execute(select(Project))
    for project in projects_result.scalars():
        s7 = stars_7d_map.get(project.id, 0)
        r7 = requests_7d_map.get(project.id, 0)
        score = (s7 * 2) + (r7 * 3) + (project.star_count * 0.1)
        project.trending_score = score

    await db.commit()


async def recalculate_trending_job():
    """APScheduler job wrapper — creates its own session."""
    async with async_session() as db:
        await recalculate_trending(db)
