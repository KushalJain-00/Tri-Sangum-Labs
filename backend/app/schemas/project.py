# backend/app/schemas/project.py — Pydantic v2 schemas for project endpoints
import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field, HttpUrl

from app.schemas.user import UserResponse


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=120)
    description: str = Field(..., min_length=10, max_length=1000)
    type: str = Field(..., pattern=r"^(open_source|closed|hiring|freelance)$")
    category: str = Field(..., pattern=r"^(software|hardware|ml|mobile|devtools|other)$")
    tags: list[str] = Field(..., min_length=1, max_length=10)
    looking_for: str = Field(..., min_length=5, max_length=200)
    repo_url: Optional[str] = None
    city: Optional[str] = Field(None, max_length=100)
    college: Optional[str] = Field(None, max_length=150)


class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=120)
    description: Optional[str] = Field(None, min_length=10, max_length=1000)
    type: Optional[str] = Field(None, pattern=r"^(open_source|closed|hiring|freelance)$")
    category: Optional[str] = Field(None, pattern=r"^(software|hardware|ml|mobile|devtools|other)$")
    tags: Optional[list[str]] = Field(None, max_length=10)
    looking_for: Optional[str] = Field(None, min_length=5, max_length=200)
    repo_url: Optional[str] = None
    city: Optional[str] = Field(None, max_length=100)
    college: Optional[str] = Field(None, max_length=150)


class ProjectStatusUpdate(BaseModel):
    status: str = Field(..., pattern=r"^(idea|building|launched|inactive)$")


class ProjectResponse(BaseModel):
    id: uuid.UUID
    owner_id: uuid.UUID
    title: str
    description: str
    type: str
    category: str
    status: str
    looking_for: list[str]
    tags: list[str]
    repo_url: Optional[str] = None
    city: Optional[str] = None
    college: Optional[str] = None
    star_count: int
    contributor_count: int
    trending_score: float
    created_at: datetime
    updated_at: datetime
    owner: Optional[UserResponse] = None

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total: int
    page: int
    per_page: int


class StarResponse(BaseModel):
    starred: bool
    star_count: int


class TrendingTag(BaseModel):
    tag: str
    count: int


class TrendingTagsResponse(BaseModel):
    tags: list[TrendingTag]
