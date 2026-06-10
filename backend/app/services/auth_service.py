# backend/app/services/auth_service.py — Supabase Auth integration
import httpx
from app.config import settings


async def register_supabase_user(email: str, password: str) -> dict:
    """Register a new user with Supabase Auth."""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.SUPABASE_URL}/auth/v1/signup",
            json={"email": email, "password": password},
            headers={
                "apikey": _get_service_key(),
                "Content-Type": "application/json",
            },
        )
        if response.status_code >= 400:
            return {"error": response.json()}
        return response.json()


async def login_supabase_user(email: str, password: str) -> dict:
    """Login via Supabase Auth — returns JWT."""
    async with httpx.AsyncClient() as client:
        response = await client.post(
            f"{settings.SUPABASE_URL}/auth/v1/token?grant_type=password",
            json={"email": email, "password": password},
            headers={
                "apikey": _get_service_key(),
                "Content-Type": "application/json",
            },
        )
        if response.status_code >= 400:
            return {"error": response.json()}
        return response.json()


async def request_password_reset(email: str) -> None:
    """Send password reset email via Supabase — always returns success."""
    async with httpx.AsyncClient() as client:
        await client.post(
            f"{settings.SUPABASE_URL}/auth/v1/recover",
            json={"email": email},
            headers={
                "apikey": _get_service_key(),
                "Content-Type": "application/json",
            },
        )


def _get_service_key() -> str:
    """Get the Supabase anon key for server-side auth calls.
    Note: We use the JWT secret for verification but the service/anon key
    for making API calls to Supabase Auth endpoints."""
    # For server-side calls, we need the service role key or anon key.
    # In production, this should be the service_role key set as env var.
    # For now, we'll extract from SUPABASE_URL or use a separate env var.
    import os
    return os.getenv("SUPABASE_SERVICE_ROLE_KEY", os.getenv("SUPABASE_ANON_KEY", ""))
