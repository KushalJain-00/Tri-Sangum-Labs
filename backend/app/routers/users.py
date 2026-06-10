# backend/app/routers/users.py — User endpoints (TRD Section 6.4)
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth import get_current_user
from app.schemas.user import UserResponse, UserUpdate
from app.schemas.project import ProjectResponse
from app.services import user_service, project_service, contribution_service

router = APIRouter()


@router.get("/{username}")
async def get_user_profile(
    username: str,
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/users/:username — public profile."""
    user = await user_service.get_by_username(db, username)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # Get user's projects
    projects = await project_service.get_user_projects(db, user.id)

    # Get accepted contributions
    contributions = await contribution_service.get_user_contributions(db, user.id)
    accepted = [c for c in contributions if c.status == "accepted"]

    return {
        "user": UserResponse.model_validate(user),
        "projects": [ProjectResponse.model_validate(p) for p in projects if p.status != "inactive"],
        "accepted_contributions": [
            {
                "id": str(c.id),
                "project_id": str(c.project_id),
                "status": c.status,
                "created_at": c.created_at.isoformat(),
            }
            for c in accepted
        ],
    }


@router.put("/me", response_model=UserResponse)
async def update_me(
    data: UserUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """PUT /api/v1/users/me — update current user profile."""
    updated = await user_service.update_user(
        db, current_user, data.model_dump(exclude_unset=True)
    )
    return UserResponse.model_validate(updated)


@router.post("/me/avatar")
async def upload_avatar(
    file: UploadFile = File(...),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/users/me/avatar — Cloudinary upload, MIME validation, 5MB max."""
    # Validate MIME type server-side (TRD Section 10.2)
    allowed_types = {"image/jpeg", "image/png", "image/gif", "image/webp"}
    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only JPEG, PNG, GIF, and WebP images are allowed.",
        )

    # Read file and check size (5MB max)
    contents = await file.read()
    if len(contents) > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image must be under 5MB.",
        )

    # Upload to Cloudinary
    try:
        import cloudinary
        import cloudinary.uploader
        from app.config import settings

        cloudinary.config(
            cloud_name=settings.CLOUDINARY_CLOUD_NAME,
            api_key=settings.CLOUDINARY_API_KEY,
            api_secret=settings.CLOUDINARY_API_SECRET,
        )

        result = cloudinary.uploader.upload(
            contents,
            folder="trisangum/avatars",
            public_id=str(current_user.id),
            overwrite=True,
            transformation={"width": 256, "height": 256, "crop": "fill"},
        )
        avatar_url = result["secure_url"]
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not upload image. Please try again.",
        )

    # Update user record
    await user_service.update_user(db, current_user, {"avatar_url": avatar_url})
    return {"avatar_url": avatar_url}


@router.get("/me/projects")
async def get_my_projects(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/users/me/projects — own projects including inactive."""
    projects = await project_service.get_user_projects(db, current_user.id)
    return {"projects": [ProjectResponse.model_validate(p) for p in projects]}


@router.get("/me/dashboard")
async def get_dashboard(
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/users/me/dashboard — projects, incoming, outgoing in one call."""
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    from app.models.project import Project
    from app.models.contribution import Contribution

    # My projects
    projects = await project_service.get_user_projects(db, current_user.id)

    # Incoming requests (on my projects)
    project_ids = [p.id for p in projects]
    incoming = []
    if project_ids:
        result = await db.execute(
            select(Contribution)
            .options(selectinload(Contribution.user), selectinload(Contribution.project))
            .where(Contribution.project_id.in_(project_ids))
            .order_by(Contribution.created_at.desc())
        )
        incoming = list(result.scalars().all())

    # Outgoing requests
    outgoing = await contribution_service.get_user_contributions(db, current_user.id)

    return {
        "projects": [ProjectResponse.model_validate(p) for p in projects],
        "incoming_requests": [
            {
                "id": str(c.id),
                "project_id": str(c.project_id),
                "project_title": c.project.title if c.project else "",
                "user_id": str(c.user_id),
                "user_name": c.user.full_name if c.user else "",
                "user_username": c.user.username if c.user else "",
                "user_avatar_url": c.user.avatar_url if c.user else None,
                "status": c.status,
                "message": c.message,
                "created_at": c.created_at.isoformat(),
            }
            for c in incoming
        ],
        "outgoing_requests": [
            {
                "id": str(c.id),
                "project_id": str(c.project_id),
                "project_title": c.project.title if c.project else "",
                "status": c.status,
                "message": c.message,
                "created_at": c.created_at.isoformat(),
            }
            for c in outgoing
        ],
    }
