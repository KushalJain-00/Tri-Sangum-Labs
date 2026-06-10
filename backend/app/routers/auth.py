# backend/app/routers/auth.py — Auth endpoints (TRD Section 6.1)
import uuid

from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.auth import get_current_user
from app.schemas.user import (
    UserCreate, UserLogin, UserResponse, AuthResponse, PasswordResetRequest,
)
from app.services import auth_service, user_service, email_service

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)


@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=AuthResponse)
@limiter.limit("10/minute")
async def register(
    request: Request,
    data: UserCreate,
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/auth/register — creates user in Supabase Auth + users table."""
    # Check if email/username already taken
    existing_email = await user_service.get_by_email(db, data.email)
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="That email is already registered. Try signing in.",
        )
    existing_username = await user_service.get_by_username(db, data.username)
    if existing_username:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="That username is taken. Try another one.",
        )

    # Register with Supabase Auth
    supabase_result = await auth_service.register_supabase_user(data.email, data.password)
    if "error" in supabase_result:
        error_msg = supabase_result["error"].get("message", "")
        if "already registered" in error_msg.lower():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="That email is already registered. Try signing in.",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Could not create account. Please try again.",
        )

    # Get Supabase user ID
    supabase_user_id = supabase_result.get("user", {}).get("id")
    if not supabase_user_id:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Could not create account. Please try again.",
        )

    # Create user in our DB with the Supabase UUID
    user = await user_service.create_user(
        db,
        user_id=uuid.UUID(supabase_user_id),
        email=data.email,
        username=data.username,
        full_name=data.full_name,
    )

    # Send welcome email (non-blocking)
    try:
        await email_service.send_welcome(user.email, user.full_name)
    except Exception:
        pass  # Don't fail registration if email fails

    access_token = supabase_result.get("access_token", "")
    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
    )


@router.post("/login", response_model=AuthResponse)
@limiter.limit("10/minute")
async def login(
    request: Request,
    data: UserLogin,
    db: AsyncSession = Depends(get_db),
):
    """POST /api/v1/auth/login — validates via Supabase, returns JWT."""
    supabase_result = await auth_service.login_supabase_user(data.email, data.password)
    if "error" in supabase_result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password. Please try again.",
        )

    # Get user from our DB
    supabase_user_id = supabase_result.get("user", {}).get("id")
    user = await user_service.get_by_id(db, uuid.UUID(supabase_user_id))
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Account not found. Please sign up first.",
        )

    access_token = supabase_result.get("access_token", "")
    return AuthResponse(
        user=UserResponse.model_validate(user),
        access_token=access_token,
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user=Depends(get_current_user)):
    """GET /api/v1/auth/me — returns current user."""
    return UserResponse.model_validate(current_user)


@router.post("/logout")
async def logout(current_user=Depends(get_current_user)):
    """POST /api/v1/auth/logout — client-side token invalidation."""
    return {"message": "Signed out successfully."}


@router.post("/password-reset-request")
@limiter.limit("10/minute")
async def password_reset_request(
    request: Request,
    data: PasswordResetRequest,
):
    """POST /api/v1/auth/password-reset-request — always returns 200."""
    try:
        await auth_service.request_password_reset(data.email)
    except Exception:
        pass  # Always return 200 even if email unknown
    return {"message": "If an account with that email exists, you will receive a reset link."}
