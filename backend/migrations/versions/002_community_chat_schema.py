"""Add community and project chat schema

Revision ID: 002
Revises: 001
Create Date: 2026-06-12 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("ALTER TABLE users ADD COLUMN IF NOT EXISTS reputation INTEGER NOT NULL DEFAULT 0")
    op.execute("ALTER TABLE projects ADD COLUMN IF NOT EXISTS upvote_count INTEGER NOT NULL DEFAULT 0")
    op.execute("ALTER TABLE projects ADD COLUMN IF NOT EXISTS comment_count INTEGER NOT NULL DEFAULT 0")

    op.create_table(
        "project_upvotes",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("project_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("value", sa.Integer(), server_default="1", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["project_id"], ["projects.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("user_id", "project_id", name="uq_project_upvote_user_project"),
    )
    op.create_index("idx_project_upvotes_project", "project_upvotes", ["project_id"], unique=False)
    op.create_index("idx_project_upvotes_user", "project_upvotes", ["user_id"], unique=False)

    op.create_table(
        "project_comments",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("project_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("parent_id", postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["project_id"], ["projects.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["parent_id"], ["project_comments.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("idx_project_comments_project", "project_comments", ["project_id"], unique=False)
    op.create_index("idx_project_comments_user", "project_comments", ["user_id"], unique=False)
    op.create_index("idx_project_comments_parent", "project_comments", ["parent_id"], unique=False)

    op.create_table(
        "project_messages",
        sa.Column("id", postgresql.UUID(as_uuid=True), server_default=sa.text("gen_random_uuid()"), nullable=False),
        sa.Column("project_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.ForeignKeyConstraint(["project_id"], ["projects.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("idx_project_messages_project", "project_messages", ["project_id"], unique=False)
    op.create_index("idx_project_messages_user", "project_messages", ["user_id"], unique=False)


def downgrade() -> None:
    op.drop_table("project_messages")
    op.drop_table("project_comments")
    op.drop_table("project_upvotes")
    op.drop_column("projects", "comment_count")
    op.drop_column("projects", "upvote_count")
    op.drop_column("users", "reputation")
