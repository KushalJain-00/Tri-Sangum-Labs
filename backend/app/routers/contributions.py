# backend/app/routers/contributions.py — Contribution endpoints (TRD Section 6.3)
import uuid

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth import get_current_user
from app.schemas.contribution import ContributionCreate, ContributionStatusUpdate, ContributionResponse
from app.services import contribution_service, project_service, email_service

router = APIRouter()


@router.put("/{contribution_id}", response_model=ContributionResponse)
async def update_contribution_status(
    contribution_id: uuid.UUID,
    data: ContributionStatusUpdate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """PUT /api/v1/contributions/:id — owner only, accept or decline."""
    # Get the contribution and verify ownership
    from sqlalchemy import select
    from sqlalchemy.orm import selectinload
    from app.models.contribution import Contribution

    result = await db.execute(
        select(Contribution)
        .options(selectinload(Contribution.project), selectinload(Contribution.user))
        .where(Contribution.id == contribution_id)
    )
    contribution = result.scalar_one_or_none()
    if not contribution:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Not found")

    # Verify current user owns the project
    if contribution.project.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Forbidden")

    # Update status
    updated = await contribution_service.update_status(db, contribution_id, data.status)

    # Send email to contributor
    try:
        if data.status == "accepted":
            await email_service.send_contribution_accepted(
                contributor_email=contribution.user.email,
                owner_name=current_user.full_name,
                project_title=contribution.project.title,
                project_id=str(contribution.project.id),
            )
        elif data.status == "declined":
            await email_service.send_contribution_declined(
                contributor_email=contribution.user.email,
                project_title=contribution.project.title,
            )
    except Exception:
        pass  # Don't fail the response if email fails

    return ContributionResponse.model_validate(updated)
