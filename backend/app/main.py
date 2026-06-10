# backend/app/main.py — FastAPI app entry point (TRD Section 4.2)
from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.config import settings
from app.database import engine


# Rate limiter (TRD Section 10.2)
limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown events."""
    # Startup: start APScheduler for trending recalculation
    from apscheduler.schedulers.asyncio import AsyncIOScheduler
    from app.services.trending_service import recalculate_trending_job

    scheduler = AsyncIOScheduler()
    scheduler.add_job(recalculate_trending_job, "interval", seconds=3600, id="trending_recalc")
    scheduler.start()
    app.state.scheduler = scheduler

    yield

    # Shutdown
    scheduler.shutdown()
    await engine.dispose()


# Conditionally disable /docs in production (TRD Section 10.2)
docs_url = "/docs" if settings.ENVIRONMENT != "production" else None
redoc_url = "/redoc" if settings.ENVIRONMENT != "production" else None

app = FastAPI(
    title="TriSangum Labs API",
    description="Project-first developer collaboration platform",
    version="1.0.0",
    docs_url=docs_url,
    redoc_url=redoc_url,
    lifespan=lifespan,
)

# Rate limiter state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# CORS (TRD Section 10.2)
origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
from app.routers import auth, projects, users, contributions, utility

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(users.router, prefix="/api/v1/users", tags=["users"])
app.include_router(contributions.router, prefix="/api/v1/contributions", tags=["contributions"])
app.include_router(utility.router, prefix="/api/v1", tags=["utility"])
