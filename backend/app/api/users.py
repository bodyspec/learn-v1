from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.services.user_service import update_user

router = APIRouter()


@router.put('/me', response_model=UserResponse)
async def update_current_user(
    update_data: UserUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Update current user profile."""
    return await update_user(db, current_user, update_data)
