# backend/app/routers/community.py — Upvotes & Comments API
import uuid
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import select, func, delete
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.auth import get_current_user
from app.models.community import ProjectUpvote, ProjectComment
from app.models.project import Project
from app.models.user import User
from app.schemas.community import (
    UpvoteRequest, UpvoteResponse,
    CommentCreate, CommentResponse, CommentListResponse, CommentAuthor,
)

router = APIRouter()


# ─── Upvotes ───

@router.post("/{project_id}/vote", response_model=UpvoteResponse)
async def vote_project(
    project_id: uuid.UUID,
    data: UpvoteRequest,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Toggle upvote/downvote on a project. value=1 upvote, -1 downvote, 0 remove."""
    # Verify project exists
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    # Find existing vote
    stmt = select(ProjectUpvote).where(
        ProjectUpvote.user_id == current_user.id,
        ProjectUpvote.project_id == project_id,
    )
    result = await db.execute(stmt)
    existing = result.scalar_one_or_none()

    if data.value == 0:
        # Remove vote
        if existing:
            old_value = existing.value
            await db.delete(existing)
            project.upvote_count -= old_value
    elif existing:
        # Update vote
        old_value = existing.value
        existing.value = data.value
        project.upvote_count += (data.value - old_value)
    else:
        # New vote
        vote = ProjectUpvote(
            user_id=current_user.id,
            project_id=project_id,
            value=data.value,
        )
        db.add(vote)
        project.upvote_count += data.value

    await db.commit()
    await db.refresh(project)

    return UpvoteResponse(upvoted=data.value, upvote_count=project.upvote_count)


@router.get("/{project_id}/vote")
async def get_my_vote(
    project_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current user's vote on a project."""
    stmt = select(ProjectUpvote).where(
        ProjectUpvote.user_id == current_user.id,
        ProjectUpvote.project_id == project_id,
    )
    result = await db.execute(stmt)
    existing = result.scalar_one_or_none()
    return {"value": existing.value if existing else 0}


# ─── Comments ───

@router.get("/{project_id}/comments", response_model=CommentListResponse)
async def list_comments(
    project_id: uuid.UUID,
    db: AsyncSession = Depends(get_db),
):
    """Get all comments for a project, flat list. Frontend builds the tree."""
    # Verify project exists
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    stmt = (
        select(ProjectComment)
        .where(ProjectComment.project_id == project_id)
        .options(selectinload(ProjectComment.user))
        .order_by(ProjectComment.created_at.asc())
    )
    result = await db.execute(stmt)
    comments = result.scalars().all()

    response_comments = []
    for c in comments:
        author = None
        if c.user:
            author = CommentAuthor(
                id=c.user.id,
                username=c.user.username,
                full_name=c.user.full_name,
                avatar_url=c.user.avatar_url,
                reputation=c.user.reputation,
            )
        response_comments.append(
            CommentResponse(
                id=c.id,
                project_id=c.project_id,
                user_id=c.user_id,
                parent_id=c.parent_id,
                content=c.content,
                created_at=c.created_at,
                updated_at=c.updated_at,
                author=author,
            )
        )

    return CommentListResponse(comments=response_comments, total=len(response_comments))


@router.post("/{project_id}/comments", status_code=201, response_model=CommentResponse)
async def create_comment(
    project_id: uuid.UUID,
    data: CommentCreate,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Post a comment on a project. Supply parent_id for threaded replies."""
    project = await db.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    if data.parent_id:
        parent = await db.get(ProjectComment, data.parent_id)
        if not parent or parent.project_id != project_id:
            raise HTTPException(status_code=400, detail="Invalid parent comment")

    comment = ProjectComment(
        project_id=project_id,
        user_id=current_user.id,
        parent_id=data.parent_id,
        content=data.content,
    )
    db.add(comment)

    # Increment comment count
    project.comment_count += 1

    await db.commit()
    await db.refresh(comment)

    # Fetch the user for the author field
    user = await db.get(User, current_user.id)
    author = CommentAuthor(
        id=user.id,
        username=user.username,
        full_name=user.full_name,
        avatar_url=user.avatar_url,
        reputation=user.reputation,
    )

    return CommentResponse(
        id=comment.id,
        project_id=comment.project_id,
        user_id=comment.user_id,
        parent_id=comment.parent_id,
        content=comment.content,
        created_at=comment.created_at,
        updated_at=comment.updated_at,
        author=author,
    )


@router.delete("/{project_id}/comments/{comment_id}", status_code=204)
async def delete_comment(
    project_id: uuid.UUID,
    comment_id: uuid.UUID,
    current_user=Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Delete your own comment."""
    comment = await db.get(ProjectComment, comment_id)
    if not comment or comment.project_id != project_id:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your comment")

    project = await db.get(Project, project_id)
    if project:
        project.comment_count = max(0, project.comment_count - 1)

    await db.delete(comment)
    await db.commit()
