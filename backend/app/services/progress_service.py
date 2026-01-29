from uuid import UUID

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.schemas.progress import ProgressResponse, QuizResultSummary, SectionProgressResponse


async def get_user_progress(db: AsyncSession, user_id: UUID) -> ProgressResponse:
    """Get all progress for a user."""
    # Get section progress
    result = await db.execute(
        select(SectionProgress).where(SectionProgress.user_id == user_id)
    )
    section_progress = result.scalars().all()

    sections_completed = [
        SectionProgressResponse(
            module_id=sp.module_id,
            section_slug=sp.section_slug,
            completed_at=sp.completed_at,
        )
        for sp in section_progress
    ]

    # Get completed modules (those with all sections done)
    # This requires knowing the module structure - for now we track by quiz passed
    modules_completed: list[str] = []

    # Get passed quizzes
    result = await db.execute(
        select(QuizAttempt)
        .where(and_(QuizAttempt.user_id == user_id, QuizAttempt.passed == True))  # noqa: E712
        .order_by(QuizAttempt.attempted_at.desc())
    )
    passed_attempts = result.scalars().all()

    quizzes_passed: dict[str, QuizResultSummary] = {}
    for attempt in passed_attempts:
        if attempt.module_id not in quizzes_passed:
            quizzes_passed[attempt.module_id] = QuizResultSummary(
                score=attempt.score,
                passed_at=attempt.attempted_at,
            )
            modules_completed.append(attempt.module_id)

    return ProgressResponse(
        sections_completed=sections_completed,
        modules_completed=modules_completed,
        quizzes_passed=quizzes_passed,
    )


async def mark_section_complete(
    db: AsyncSession,
    user_id: UUID,
    module_id: str,
    section_slug: str,
) -> SectionProgress:
    """Mark a section as complete for a user."""
    # Check if already complete
    result = await db.execute(
        select(SectionProgress).where(
            and_(
                SectionProgress.user_id == user_id,
                SectionProgress.module_id == module_id,
                SectionProgress.section_slug == section_slug,
            )
        )
    )
    existing = result.scalar_one_or_none()

    if existing:
        return existing

    progress = SectionProgress(
        user_id=user_id,
        module_id=module_id,
        section_slug=section_slug,
    )
    db.add(progress)
    await db.commit()
    await db.refresh(progress)
    return progress


async def is_module_complete(
    db: AsyncSession,
    user_id: UUID,
    module_id: str,
    required_sections: list[str],
) -> bool:
    """Check if all required sections of a module are complete."""
    result = await db.execute(
        select(SectionProgress.section_slug).where(
            and_(
                SectionProgress.user_id == user_id,
                SectionProgress.module_id == module_id,
            )
        )
    )
    completed_sections = set(result.scalars().all())
    return all(slug in completed_sections for slug in required_sections)
