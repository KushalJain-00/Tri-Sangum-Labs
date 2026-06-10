# backend/app/schemas/contribution.py — Pydantic v2 schemas for contribution endpoints
import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

from app.schemas.user import UserResponse
from app.schemas.project import ProjectResponse


class ContributionCreate(BaseModel):
    message: str = Field(..., min_length=20, max_length=500)


class ContributionStatusUpdate(BaseModel):
    status: str = Field(..., pattern=r"^(accepted|declined)$")


class ContributionResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    user_id: uuid.UUID
    status: str
    message: str
    created_at: datetime
    updated_at: datetime
    user: Optional[UserResponse] = None
    project: Optional[ProjectResponse] = None

    model_config = {"from_attributes": True}
