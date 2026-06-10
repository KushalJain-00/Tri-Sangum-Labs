# backend/app/schemas/community.py — Pydantic schemas for upvotes and comments
import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


# --- Upvote Schemas ---

class UpvoteRequest(BaseModel):
    value: int = Field(1, ge=-1, le=1)  # 1 = upvote, -1 = downvote, 0 = remove


class UpvoteResponse(BaseModel):
    upvoted: int  # 1, -1, or 0 (user's current vote)
    upvote_count: int  # net score on the project


# --- Comment Schemas ---

class CommentCreate(BaseModel):
    content: str = Field(..., min_length=1, max_length=2000)
    parent_id: Optional[uuid.UUID] = None


class CommentAuthor(BaseModel):
    id: uuid.UUID
    username: str
    full_name: str
    avatar_url: Optional[str] = None
    reputation: int = 0

    model_config = {"from_attributes": True}


class CommentResponse(BaseModel):
    id: uuid.UUID
    project_id: uuid.UUID
    user_id: uuid.UUID
    parent_id: Optional[uuid.UUID] = None
    content: str
    created_at: datetime
    updated_at: datetime
    author: Optional[CommentAuthor] = None

    model_config = {"from_attributes": True}


class CommentListResponse(BaseModel):
    comments: list[CommentResponse]
    total: int
