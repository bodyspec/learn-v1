from typing import Any
from uuid import UUID

import yaml
from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import get_settings
from app.models.quiz import QuizAttempt
from app.schemas.quiz import (
    QuestionResult,
    QuizAttemptResponse,
    QuizAttemptsResponse,
    QuizSubmission,
    QuizSubmissionResult,
)

# Track requirements: which modules must be passed for each track certificate
TRACK_REQUIREMENTS = {
    'physician': ['core', 'physician'],
    'chiropractor': ['core', 'chiropractor'],
    'trainer': ['core', 'trainer'],
}


def load_quiz(module_id: str) -> dict[str, Any] | None:
    """Load quiz definition from YAML file."""
    quiz_path = get_settings().content_dir / 'quizzes' / f'{module_id}.yaml'
    if not quiz_path.exists():
        return None
    with open(quiz_path) as f:
        return yaml.safe_load(f)


def grade_quiz(submission: QuizSubmission) -> QuizSubmissionResult | None:
    """Grade a quiz submission and return results."""
    quiz = load_quiz(submission.module_id)
    if quiz is None:
        return None

    questions = quiz.get('questions', [])
    passing_score = quiz.get('passing_score', 80)

    results: list[QuestionResult] = []
    correct_count = 0

    for question in questions:
        question_id = question['id']
        selected = submission.answers.get(question_id)

        # Find correct option index
        correct_option = -1
        for i, option in enumerate(question['options']):
            if option.get('correct', False):
                correct_option = i
                break

        is_correct = selected == correct_option
        if is_correct:
            correct_count += 1

        results.append(QuestionResult(
            question_id=question_id,
            correct=is_correct,
            selected_option=selected if selected is not None else -1,
            correct_option=correct_option,
            explanation=question.get('explanation', ''),
        ))

    score = int((correct_count / len(questions)) * 100) if questions else 0
    passed = score >= passing_score

    return QuizSubmissionResult(
        score=score,
        passed=passed,
        passing_score=passing_score,
        results=results,
        certificate_eligible=False,
    )


async def record_quiz_attempt(
    db: AsyncSession,
    user_id: UUID,
    submission: QuizSubmission,
    result: QuizSubmissionResult,
) -> QuizAttempt:
    """Record a quiz attempt in the database."""
    attempt = QuizAttempt(
        user_id=user_id,
        module_id=submission.module_id,
        score=result.score,
        passed=result.passed,
        answers=submission.answers,
        time_spent_seconds=submission.time_spent_seconds,
    )
    db.add(attempt)
    await db.commit()
    await db.refresh(attempt)
    return attempt


async def get_quiz_attempts(
    db: AsyncSession,
    user_id: UUID,
    module_id: str,
) -> QuizAttemptsResponse:
    """Get all quiz attempts for a user and module."""
    result = await db.execute(
        select(QuizAttempt)
        .where(and_(QuizAttempt.user_id == user_id, QuizAttempt.module_id == module_id))
        .order_by(QuizAttempt.attempted_at.asc())
    )
    attempts = result.scalars().all()

    attempt_responses = [
        QuizAttemptResponse(
            id=a.id,
            score=a.score,
            passed=a.passed,
            attempted_at=a.attempted_at,
        )
        for a in attempts
    ]

    best_score = max((a.score for a in attempts), default=None)
    passed = any(a.passed for a in attempts)

    return QuizAttemptsResponse(
        attempts=attempt_responses,
        best_score=best_score,
        passed=passed,
    )


async def has_passed_quiz(
    db: AsyncSession,
    user_id: UUID,
    module_id: str,
) -> bool:
    """Check if user has passed a quiz."""
    result = await db.execute(
        select(QuizAttempt)
        .where(
            and_(
                QuizAttempt.user_id == user_id,
                QuizAttempt.module_id == module_id,
                QuizAttempt.passed == True,  # noqa: E712
            )
        )
        .limit(1)
    )
    return result.scalar_one_or_none() is not None
