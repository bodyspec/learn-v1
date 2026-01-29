from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.quiz import QuizAttemptsResponse, QuizSubmission, QuizSubmissionResult
from app.services.quiz_service import get_quiz_attempts, grade_quiz, record_quiz_attempt

router = APIRouter()


@router.post('/submit', response_model=QuizSubmissionResult)
async def submit_quiz(
    submission: QuizSubmission,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> QuizSubmissionResult:
    """Submit quiz answers for grading."""
    result = grade_quiz(submission)
    if result is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f'Quiz not found for module: {submission.module_id}',
        )

    # Record the attempt
    await record_quiz_attempt(db, current_user.id, submission, result)

    return result


@router.get('/attempts/{module_id}', response_model=QuizAttemptsResponse)
async def get_attempts(
    module_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> QuizAttemptsResponse:
    """Get quiz attempt history for a module."""
    return await get_quiz_attempts(db, current_user.id, module_id)
