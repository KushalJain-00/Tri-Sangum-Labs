# backend/app/routers/projects.py — Project endpoints (TRD Section 6.2)
import uuid
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth import get_current_user, require_project_owner
from app.schemas.project import (
    ProjectCreate, ProjectUpdate, ProjectStatusUpdate,
    ProjectResponse, ProjectListResponse, StarResponse, TrendingTagsResponse,
)
from app.schemas.user import UserResponse
from app.services import project_service

router = APIRouter()


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    type: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    tags: Optional[str] = Query(None),  # comma-separated
    city: Optional[str] = Query(None),
    college: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
    sort: str = Query("latest", pattern=r"^(latest|trending|month)$"),
    page: int = Query(1, ge=1),
    per_page: int = Query(20, ge=1, le=100),
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/projects — list with filters, search, sort, pagination."""
    tags_list = [t.strip() for t in tags.split(",") if t.strip()] if tags else None

    projects, total = await project_service.list_projects(
        db,
        page=page,
        per_page=per_page,
        type_filter=type,
        category_filter=category,
        tags_filter=tags_list,
        city_filter=city,
        college_filter=college,
        search_query=search,
        sort=sort,
    )

    return ProjectListResponse(
        projects=[ProjectResponse.model_validate(p) for p in projects],
        total=total,
        page=page,
        per_page=per_page,
    )


@router.get("/trending-tags", response_model=TrendingTagsResponse)
async def trending_tags(db: AsyncSession = Depends(get_db)):
    """GET /api/v1/projects/trending-tags — top 10 tags last 7 days."""
    tags = await project_service.get_trending_tags(db)
    return TrendingTagsResponse(tags=tags)


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/projects/:id — single project or 404."""
    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    return ProjectResponse.model_validate(project)


@router.post("", status_code=status.HTTP_201_CREATED, response_model=ProjectResponse)
async def create_project(
    data: ProjectCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/projects — requires auth."""
    project = await project_service.create_project(
        db, owner_id=current_user.id, data=data.model_dump()
    )
    # Reload with owner relationship
    project = await project_service.get_by_id(db, project.id)
    return ProjectResponse.model_validate(project)


@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    data: ProjectUpdate,
    project=Depends(require_project_owner),
    db: AsyncSession = Depends(get_db),
):
    """PUT /api/v1/projects/:id — requires owner, partial update."""
    updated = await project_service.update_project(
        db, project, data.model_dump(exclude_unset=True)
    )
    return ProjectResponse.model_validate(updated)


@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project=Depends(require_project_owner),
    db: AsyncSession = Depends(get_db),
):
    """DELETE /api/v1/projects/:id — requires owner."""
    await project_service.delete_project(db, project)


@router.post("/{project_id}/star", response_model=StarResponse)
async def toggle_star(
    project_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/projects/:id/star — toggle star, atomic counter."""
    # Verify project exists
    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    starred, star_count = await project_service.toggle_star(db, project_id, current_user.id)
    return StarResponse(starred=starred, star_count=star_count)


@router.put("/{project_id}/status", response_model=ProjectResponse)
async def update_status(
    data: ProjectStatusUpdate,
    project=Depends(require_project_owner),
    db: AsyncSession = Depends(get_db),
):
    """PUT /api/v1/projects/:id/status — requires owner."""
    updated = await project_service.update_status(db, project, data.status)
    return ProjectResponse.model_validate(updated)


# --- Contribution endpoints nested under /projects/:id (TRD Section 6.3) ---

@router.post("/{project_id}/contribute", status_code=status.HTTP_201_CREATED)
async def contribute_to_project(
    project_id: uuid.UUID,
    data: ContributionCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/projects/:id/contribute — express interest."""
    from app.schemas.contribution import ContributionCreate, ContributionResponse
    from app.services import contribution_service, email_service

    # Verify project exists
    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # Cannot contribute to own project
    if project.owner_id == current_user.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="You cannot contribute to your own project.",
        )

    # Check for existing contribution (409 if duplicate)
    existing = await contribution_service.get_existing(db, project_id, current_user.id)
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="You have already submitted a request for this project.",
        )

    contribution = await contribution_service.create_contribution(
        db, project_id=project_id, user_id=current_user.id, message=data.message
    )

    # Send email to project owner (non-blocking)
    try:
        await email_service.send_contribution_received(
            owner_email=project.owner.email,
            contributor_name=current_user.full_name,
            project_title=project.title,
            message_preview=data.message,
        )
    except Exception:
        pass

    return ContributionResponse.model_validate(contribution)


@router.get("/{project_id}/contributions")
async def get_project_contributions(
    project_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/projects/:id/contributions — owner only."""
    from app.services import contribution_service
    from app.schemas.contribution import ContributionResponse

    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")
    if project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    contributions = await contribution_service.get_for_project(db, project_id)
    return {"contributions": [ContributionResponse.model_validate(c) for c in contributions]}
