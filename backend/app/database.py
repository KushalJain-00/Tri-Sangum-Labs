# backend/app/database.py — Async SQLAlchemy engine and session (TRD Section 4.2)
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import DeclarativeBase

from app.config import settings


# Create async engine with Neon pooled connection
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=(settings.ENVIRONMENT == "development"),
    pool_pre_ping=True,
)

# Async session factory
async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


# Base class for all ORM models
class Base(DeclarativeBase):
    pass


# Dependency for FastAPI — yields an async DB session
async def get_db():
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()
