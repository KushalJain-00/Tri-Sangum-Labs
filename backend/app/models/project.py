# backend/app/models/project.py — TRD Section 5.2
import uuid
from datetime import datetime, timezone

from sqlalchemy import String, Text, Integer, Float, DateTime, ForeignKey, Index, Computed
from sqlalchemy.dialects.postgresql import UUID, ARRAY, TSVECTOR
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    title: Mapped[str] = mapped_column(String(120), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    type: Mapped[str] = mapped_column(String(20), nullable=False)  # open_source / closed / hiring / freelance
    category: Mapped[str] = mapped_column(String(20), nullable=False)  # software / hardware / ml / mobile / devtools / other
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="idea")  # idea / building / launched / inactive
    looking_for: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False, default=list)
    tags: Mapped[list[str]] = mapped_column(ARRAY(Text), nullable=False, default=list)
    repo_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    city: Mapped[str | None] = mapped_column(String(100), nullable=True)
    college: Mapped[str | None] = mapped_column(String(150), nullable=True)
    star_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    upvote_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    comment_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    contributor_count: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    trending_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)

    # Full-text search vector — generated column (TRD Section 5.6)
    search_vector: Mapped[str | None] = mapped_column(
        TSVECTOR,
        Computed(
            "setweight(to_tsvector('english', coalesce(title, '')), 'A') || "
            "setweight(to_tsvector('english', coalesce(description, '')), 'B') || "
            "setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B')",
            persisted=True,
        ),
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False, default=lambda: datetime.now(timezone.utc)
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )

    # Relationships
    owner = relationship("User", back_populates="projects")
    contributions = relationship("Contribution", back_populates="project", cascade="all, delete-orphan")
    stars = relationship("ProjectStar", back_populates="project", cascade="all, delete-orphan")

    # Indexes (TRD Section 5.5)
    __table_args__ = (
        Index("idx_projects_owner", "owner_id"),
        Index("idx_projects_type", "type", postgresql_where="status != 'inactive'"),
        Index("idx_projects_category", "category", postgresql_where="status != 'inactive'"),
        Index("idx_projects_created", created_at.desc(), postgresql_where="status != 'inactive'"),
        Index("idx_projects_trending", trending_score.desc(), postgresql_where="status != 'inactive'"),
        Index("idx_projects_search", "search_vector", postgresql_using="gin"),
        Index("idx_projects_tags", "tags", postgresql_using="gin"),
    )
