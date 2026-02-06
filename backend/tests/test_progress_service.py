import uuid

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User
from app.services.progress_service import (
    get_user_progress,
    is_module_complete,
    mark_section_complete,
)


@pytest.mark.asyncio
async def test_mark_section_complete(db_session: AsyncSession, sample_user: User) -> None:
    """mark_section_complete creates a new progress record."""
    progress = await mark_section_complete(
        db_session,
        sample_user.id,
        'core',
        '01-how-dexa-works',
    )
    assert progress.user_id == sample_user.id
    assert progress.module_id == 'core'
    assert progress.section_slug == '01-how-dexa-works'
    assert progress.completed_at is not None


@pytest.mark.asyncio
async def test_mark_section_complete_idempotent(
    db_session: AsyncSession,
    sample_user: User,
    sample_section_progress: SectionProgress,
) -> None:
    """Marking the same section complete again returns the existing record."""
    progress = await mark_section_complete(
        db_session,
        sample_user.id,
        'core',
        '01-how-dexa-works',
    )
    assert progress.id == sample_section_progress.id


@pytest.mark.asyncio
async def test_mark_different_sections(db_session: AsyncSession, sample_user: User) -> None:
    """Marking different sections creates separate records."""
    p1 = await mark_section_complete(
        db_session, sample_user.id, 'core', '01-how-dexa-works'
    )
    p2 = await mark_section_complete(
        db_session, sample_user.id, 'core', '02-what-dexa-measures'
    )
    assert p1.id != p2.id
    assert p1.section_slug != p2.section_slug


@pytest.mark.asyncio
async def test_is_module_complete_true(
    db_session: AsyncSession, sample_user: User
) -> None:
    """is_module_complete returns True when all sections are done."""
    sections = ['01-how-dexa-works', '02-what-dexa-measures']
    for slug in sections:
        await mark_section_complete(db_session, sample_user.id, 'core', slug)

    result = await is_module_complete(db_session, sample_user.id, 'core', sections)
    assert result is True


@pytest.mark.asyncio
async def test_is_module_complete_false(
    db_session: AsyncSession, sample_user: User
) -> None:
    """is_module_complete returns False when not all sections are done."""
    await mark_section_complete(
        db_session, sample_user.id, 'core', '01-how-dexa-works'
    )
    sections = ['01-how-dexa-works', '02-what-dexa-measures']
    result = await is_module_complete(db_session, sample_user.id, 'core', sections)
    assert result is False


@pytest.mark.asyncio
async def test_is_module_complete_no_progress(
    db_session: AsyncSession, sample_user: User
) -> None:
    """is_module_complete returns False when no sections are complete."""
    result = await is_module_complete(
        db_session, sample_user.id, 'core', ['01-how-dexa-works']
    )
    assert result is False


@pytest.mark.asyncio
async def test_is_module_complete_empty_requirements(
    db_session: AsyncSession, sample_user: User
) -> None:
    """is_module_complete returns True when no sections are required."""
    result = await is_module_complete(db_session, sample_user.id, 'core', [])
    assert result is True


@pytest.mark.asyncio
async def test_get_user_progress_empty(
    db_session: AsyncSession, sample_user: User
) -> None:
    """get_user_progress returns empty data for a new user."""
    progress = await get_user_progress(db_session, sample_user.id)
    assert progress.sections_completed == []
    assert progress.modules_completed == []
    assert progress.quizzes_passed == {}


@pytest.mark.asyncio
async def test_get_user_progress_with_sections(
    db_session: AsyncSession,
    sample_user: User,
    sample_section_progress: SectionProgress,
) -> None:
    """get_user_progress includes completed sections."""
    progress = await get_user_progress(db_session, sample_user.id)
    assert len(progress.sections_completed) == 1
    assert progress.sections_completed[0].module_id == 'core'
    assert progress.sections_completed[0].section_slug == '01-how-dexa-works'


@pytest.mark.asyncio
async def test_get_user_progress_with_passed_quiz(
    db_session: AsyncSession,
    sample_user: User,
    sample_quiz_attempt: QuizAttempt,
) -> None:
    """get_user_progress includes passed quizzes and marks modules complete."""
    progress = await get_user_progress(db_session, sample_user.id)
    assert 'core' in progress.quizzes_passed
    assert progress.quizzes_passed['core'].score == 90
    assert 'core' in progress.modules_completed


@pytest.mark.asyncio
async def test_get_user_progress_only_passed_quizzes(
    db_session: AsyncSession,
    sample_user: User,
    sample_failed_quiz_attempt: QuizAttempt,
) -> None:
    """get_user_progress does not include failed quiz attempts in quizzes_passed."""
    progress = await get_user_progress(db_session, sample_user.id)
    assert 'core' not in progress.quizzes_passed
    assert progress.modules_completed == []


@pytest.mark.asyncio
async def test_progress_isolated_between_users(
    db_session: AsyncSession,
    sample_user: User,
    second_user: User,
    sample_section_progress: SectionProgress,
) -> None:
    """Progress for one user does not appear for another user."""
    progress = await get_user_progress(db_session, second_user.id)
    assert progress.sections_completed == []
