# backend/app/services/contribution_service.py — Contribution service layer (TRD Section 6.3)
import uuid
from sqlalchemy import select, update
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.contribution import Contribution
from app.models.project import Project


async def create_contribution(
    db: AsyncSession, project_id: uuid.UUID, user_id: uuid.UUID, message: str
) -> Contribution:
    contribution = Contribution(
        project_id=project_id,
        user_id=user_id,
        message=message,
    )
    db.add(contribution)
    await db.commit()
    await db.refresh(contribution)
    return contribution


async def get_existing(
    db: AsyncSession, project_id: uuid.UUID, user_id: uuid.UUID
) -> Contribution | None:
    result = await db.execute(
        select(Contribution).where(
            Contribution.project_id == project_id,
            Contribution.user_id == user_id,
        )
    )
    return result.scalar_one_or_none()


async def get_for_project(
    db: AsyncSession, project_id: uuid.UUID
) -> list[Contribution]:
    result = await db.execute(
        select(Contribution)
        .options(selectinload(Contribution.user))
        .where(Contribution.project_id == project_id)
        .order_by(Contribution.created_at.desc())
    )
    return list(result.scalars().all())


async def get_user_contributions(
    db: AsyncSession, user_id: uuid.UUID
) -> list[Contribution]:
    result = await db.execute(
        select(Contribution)
        .options(selectinload(Contribution.project))
        .where(Contribution.user_id == user_id)
        .order_by(Contribution.created_at.desc())
    )
    return list(result.scalars().all())


async def update_status(
    db: AsyncSession, contribution_id: uuid.UUID, status: str
) -> Contribution | None:
    result = await db.execute(
        select(Contribution)
        .options(selectinload(Contribution.user), selectinload(Contribution.project))
        .where(Contribution.id == contribution_id)
    )
    contribution = result.scalar_one_or_none()
    if not contribution:
        return None

    old_status = contribution.status
    contribution.status = status

    # Update contributor_count atomically (TRD Section 5.7)
    if status == "accepted" and old_status != "accepted":
        await db.execute(
            update(Project)
            .where(Project.id == contribution.project_id)
            .values(contributor_count=Project.contributor_count + 1)
        )
    elif old_status == "accepted" and status != "accepted":
        await db.execute(
            update(Project)
            .where(Project.id == contribution.project_id)
            .values(contributor_count=Project.contributor_count - 1)
        )

    await db.commit()
    await db.refresh(contribution)
    return contribution
