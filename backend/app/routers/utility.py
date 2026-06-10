# backend/app/routers/utility.py — Health check and trending tags (TRD Section 6.5)
from datetime import datetime, timezone

from fastapi import APIRouter, Depends
from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.services import project_service

router = APIRouter()


@router.get("/health")
async def health_check(db: AsyncSession = Depends(get_db)):
    """GET /api/v1/health — returns { status: 'ok', db: 'ok', timestamp }"""
    try:
        await db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception:
        db_status = "error"

    return {
        "status": "ok" if db_status == "ok" else "degraded",
        "db": db_status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@router.get("/tags/trending")
async def get_trending_tags(db: AsyncSession = Depends(get_db)):
    """GET /api/v1/tags/trending — top 10 tags used by TrendingBar component."""
    tags = await project_service.get_trending_tags(db)
    return {"tags": tags}
