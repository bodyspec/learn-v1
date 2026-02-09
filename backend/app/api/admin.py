import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, Query, Response, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_admin_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.admin import AdminUserDetail, AdminUserListResponse
from app.schemas.user import UserResponse
from app.services import admin_service

router = APIRouter()


@router.get('/users', response_model=AdminUserListResponse)
async def list_users(
    admin: Annotated[User, Depends(get_admin_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
    page: int = Query(default=1, ge=1),
    per_page: int = Query(default=25, ge=1, le=100),
    search: str | None = Query(default=None),
) -> AdminUserListResponse:
    """List all users with progress summary (admin only)."""
    return await admin_service.list_users(db, page=page, per_page=per_page, search=search)


@router.get('/users/{user_id}', response_model=AdminUserDetail)
async def get_user_detail(
    user_id: uuid.UUID,
    admin: Annotated[User, Depends(get_admin_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> AdminUserDetail:
    """Get detailed user info (admin only)."""
    return await admin_service.get_user_detail(db, user_id)


@router.put('/users/{user_id}/promote', response_model=UserResponse)
async def promote_user(
    user_id: uuid.UUID,
    admin: Annotated[User, Depends(get_admin_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Promote a @bodyspec.com user to admin (admin only)."""
    return await admin_service.promote_user(db, user_id)


@router.put('/users/{user_id}/demote', response_model=UserResponse)
async def demote_user(
    user_id: uuid.UUID,
    admin: Annotated[User, Depends(get_admin_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Demote an admin user (admin only, cannot self-demote)."""
    return await admin_service.demote_user(db, user_id, admin.id)


@router.delete('/users/{user_id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    user_id: uuid.UUID,
    admin: Annotated[User, Depends(get_admin_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Response:
    """Delete a non-admin user and all their data (admin only)."""
    await admin_service.delete_user(db, user_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
