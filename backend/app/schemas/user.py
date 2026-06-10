# backend/app/schemas/user.py — Pydantic v2 schemas for user endpoints
import uuid
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    username: str = Field(..., min_length=3, max_length=30, pattern=r"^[a-z0-9_-]+$")
    full_name: str = Field(..., min_length=2, max_length=100)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    bio: Optional[str] = Field(None, max_length=300)
    city: Optional[str] = Field(None, max_length=100)
    college: Optional[str] = Field(None, max_length=150)
    github_url: Optional[str] = None


class UserResponse(BaseModel):
    id: uuid.UUID
    email: str
    username: str
    full_name: str
    bio: Optional[str] = None
    city: Optional[str] = None
    college: Optional[str] = None
    avatar_url: Optional[str] = None
    github_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    reputation: int

    model_config = {"from_attributes": True}


class PasswordResetRequest(BaseModel):
    email: EmailStr


class AuthResponse(BaseModel):
    user: UserResponse
    access_token: str
