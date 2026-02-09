from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import delete, func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.certificate import Certificate
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User
from app.schemas.user import (
    ResetProgressRequest,
    ResetProgressResponse,
    UserResponse,
    UserUpdate,
)
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


@router.post('/me/reset-progress', response_model=ResetProgressResponse)
async def reset_my_progress(
    data: ResetProgressRequest,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ResetProgressResponse:
    """Reset current user's learning progress."""
    sections_deleted = 0
    quizzes_deleted = 0
    certificates_deleted = 0

    if data.sections:
        result = await db.execute(
            select(func.count()).select_from(SectionProgress).where(
                SectionProgress.user_id == current_user.id
            )
        )
        sections_deleted = result.scalar_one()
        await db.execute(
            delete(SectionProgress).where(SectionProgress.user_id == current_user.id)
        )

    if data.quizzes:
        result = await db.execute(
            select(func.count()).select_from(QuizAttempt).where(
                QuizAttempt.user_id == current_user.id
            )
        )
        quizzes_deleted = result.scalar_one()
        await db.execute(
            delete(QuizAttempt).where(QuizAttempt.user_id == current_user.id)
        )

    if data.certificates:
        result = await db.execute(
            select(func.count()).select_from(Certificate).where(
                Certificate.user_id == current_user.id
            )
        )
        certificates_deleted = result.scalar_one()
        await db.execute(
            delete(Certificate).where(Certificate.user_id == current_user.id)
        )

    await db.commit()

    return ResetProgressResponse(
        sections_deleted=sections_deleted,
        quizzes_deleted=quizzes_deleted,
        certificates_deleted=certificates_deleted,
    )
