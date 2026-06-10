import uuid
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.auth import get_current_user
from app.models.message import ProjectMessage
from app.models.project import Project
from app.schemas.message import MessageCreate, MessageResponse, MessageListResponse
from app.services import project_service, contribution_service

router = APIRouter()

async def require_project_team(
    project_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Dependency to ensure the user is part of the project team."""
    project = await project_service.get_by_id(db, project_id)
    if not project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Owner is part of the team
    if project.owner_id == current_user.id:
        return project

    # Check for accepted contribution
    existing = await contribution_service.get_existing(db, project_id, current_user.id)
    if existing and existing.status == "accepted":
        return project

    raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You must be a team member to access this chat.")

@router.get("/{project_id}/messages", response_model=MessageListResponse)
async def get_project_messages(
    project_id: uuid.UUID,
    project: Project = Depends(require_project_team),
    db: AsyncSession = Depends(get_db),
):
    """GET /api/v1/projects/:id/messages — Get project chat messages."""
    result = await db.execute(
        select(ProjectMessage)
        .where(ProjectMessage.project_id == project_id)
        .order_by(ProjectMessage.created_at.asc())
    )
    messages = result.scalars().all()
    return MessageListResponse(messages=[MessageResponse.model_validate(m) for m in messages])

@router.post("/{project_id}/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def post_project_message(
    project_id: uuid.UUID,
    data: MessageCreate,
    project: Project = Depends(require_project_team),
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/projects/:id/messages — Post a new chat message."""
    message = ProjectMessage(
        project_id=project_id,
        user_id=current_user.id,
        content=data.content
    )
    db.add(message)
    await db.commit()
    await db.refresh(message)
    return MessageResponse.model_validate(message)
