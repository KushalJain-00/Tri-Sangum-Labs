"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2026-06-10 10:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # 1. Create users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('username', sa.String(length=50), nullable=False),
        sa.Column('full_name', sa.String(length=100), nullable=False),
        sa.Column('bio', sa.Text(), nullable=True),
        sa.Column('city', sa.String(length=100), nullable=True),
        sa.Column('college', sa.String(length=150), nullable=True),
        sa.Column('avatar_url', sa.Text(), nullable=True),
        sa.Column('github_url', sa.Text(), nullable=True),
        sa.Column('reputation', sa.Integer(), server_default='0', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('username')
    )

    # 2. Create projects table
    op.create_table(
        'projects',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('owner_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('title', sa.String(length=120), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('type', sa.String(length=20), nullable=False),
        sa.Column('category', sa.String(length=20), nullable=False),
        sa.Column('status', sa.String(length=20), server_default='idea', nullable=False),
        sa.Column('looking_for', postgresql.ARRAY(sa.Text()), server_default='{}', nullable=False),
        sa.Column('tags', postgresql.ARRAY(sa.Text()), server_default='{}', nullable=False),
        sa.Column('repo_url', sa.Text(), nullable=True),
        sa.Column('city', sa.String(length=100), nullable=True),
        sa.Column('college', sa.String(length=150), nullable=True),
        sa.Column('star_count', sa.Integer(), server_default='0', nullable=False),
        sa.Column('upvote_count', sa.Integer(), server_default='0', nullable=False),
        sa.Column('comment_count', sa.Integer(), server_default='0', nullable=False),
        sa.Column('contributor_count', sa.Integer(), server_default='0', nullable=False),
        sa.Column('trending_score', sa.Float(), server_default='0.0', nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id')
    )

    # Add tsvector generated column (TRD Section 5.6)
    op.execute("""
        ALTER TABLE projects ADD COLUMN search_vector tsvector
        GENERATED ALWAYS AS (
            setweight(to_tsvector('english', coalesce(title, '')), 'A') ||
            setweight(to_tsvector('english', coalesce(description, '')), 'B') ||
            setweight(to_tsvector('english', coalesce(array_to_string(tags, ' '), '')), 'B')
        ) STORED;
    """)

    # 3. Create contributions table
    op.create_table(
        'contributions',
        sa.Column('id', postgresql.UUID(as_uuid=True), server_default=sa.text('gen_random_uuid()'), nullable=False),
        sa.Column('project_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('status', sa.String(length=20), server_default='pending', nullable=False),
        sa.Column('message', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('project_id', 'user_id', name='uq_contribution_project_user')
    )

    # 4. Create project_stars table
    op.create_table(
        'project_stars',
        sa.Column('project_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()'), nullable=False),
        sa.ForeignKeyConstraint(['project_id'], ['projects.id'], ondelete='CASCADE'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('project_id', 'user_id')
    )

    # 5. Create Indexes
    # projects
    op.create_index('idx_projects_owner', 'projects', ['owner_id'], unique=False)
    op.create_index('idx_projects_type', 'projects', ['type'], unique=False, postgresql_where=sa.text("status != 'inactive'"))
    op.create_index('idx_projects_category', 'projects', ['category'], unique=False, postgresql_where=sa.text("status != 'inactive'"))
    op.create_index('idx_projects_created', 'projects', [sa.text('created_at DESC')], unique=False, postgresql_where=sa.text("status != 'inactive'"))
    op.create_index('idx_projects_trending', 'projects', [sa.text('trending_score DESC')], unique=False, postgresql_where=sa.text("status != 'inactive'"))
    op.create_index('idx_projects_search', 'projects', ['search_vector'], unique=False, postgresql_using='gin')
    op.create_index('idx_projects_tags', 'projects', ['tags'], unique=False, postgresql_using='gin')

    # contributions
    op.create_index('idx_contributions_project', 'contributions', ['project_id'], unique=False)
    op.create_index('idx_contributions_user', 'contributions', ['user_id'], unique=False)
    op.create_index('idx_contributions_status', 'contributions', ['status'], unique=False)

    # project_stars
    op.create_index('idx_stars_project', 'project_stars', ['project_id'], unique=False)
    op.create_index('idx_stars_created', 'project_stars', [sa.text('created_at DESC')], unique=False)


def downgrade() -> None:
    op.drop_table('project_stars')
    op.drop_table('contributions')
    op.drop_table('projects')
    op.drop_table('users')
