import uuid

import pytest
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certificate import Certificate
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User
from app.services.admin_service import (
    delete_user,
    demote_user,
    get_user_detail,
    list_users,
    promote_user,
)


class TestPromoteUser:
    """Tests for promote_user()."""

    @pytest.mark.asyncio
    async def test_user_not_found(self, db_session: AsyncSession) -> None:
        """Raises 404 when user doesn't exist."""
        with pytest.raises(HTTPException) as exc_info:
            await promote_user(db_session, uuid.uuid4())
        assert exc_info.value.status_code == 404

    @pytest.mark.asyncio
    async def test_non_bodyspec_email(
        self, db_session: AsyncSession
    ) -> None:
        """Raises 400 for non-@bodyspec.com email."""
        user = User(
            id=uuid.uuid4(),
            keycloak_id='kc-ext',
            email='user@gmail.com',
            name='External User',
        )
        db_session.add(user)
        await db_session.commit()

        with pytest.raises(HTTPException) as exc_info:
            await promote_user(db_session, user.id)
        assert exc_info.value.status_code == 400

    @pytest.mark.asyncio
    async def test_already_admin_idempotent(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Promoting an already-admin user is idempotent."""
        sample_user.is_admin = True
        await db_session.commit()

        result = await promote_user(db_session, sample_user.id)
        assert result.is_admin is True


class TestDemoteUser:
    """Tests for demote_user()."""

    @pytest.mark.asyncio
    async def test_user_not_found(self, db_session: AsyncSession) -> None:
        """Raises 404 when user doesn't exist."""
        with pytest.raises(HTTPException) as exc_info:
            await demote_user(db_session, uuid.uuid4(), uuid.uuid4())
        assert exc_info.value.status_code == 404

    @pytest.mark.asyncio
    async def test_self_demote(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Raises 400 when trying to demote yourself."""
        with pytest.raises(HTTPException) as exc_info:
            await demote_user(db_session, sample_user.id, sample_user.id)
        assert exc_info.value.status_code == 400

    @pytest.mark.asyncio
    async def test_already_non_admin_idempotent(
        self, db_session: AsyncSession, sample_user: User, second_user: User
    ) -> None:
        """Demoting a non-admin user is idempotent."""
        assert second_user.is_admin is False
        result = await demote_user(db_session, second_user.id, sample_user.id)
        assert result.is_admin is False


class TestDeleteUser:
    """Tests for delete_user()."""

    @pytest.mark.asyncio
    async def test_cascading_delete(
        self, db_session: AsyncSession
    ) -> None:
        """Deleting a user removes progress, quiz attempts, and certificates."""
        user = User(
            id=uuid.uuid4(),
            keycloak_id='kc-delete',
            email='delete@example.com',
            name='Delete Me',
        )
        db_session.add(user)
        await db_session.commit()

        # Add related data
        db_session.add(SectionProgress(
            user_id=user.id, module_id='core', section_slug='01-how-dexa-works',
        ))
        db_session.add(QuizAttempt(
            user_id=user.id, module_id='core',
            score=90, passed=True, answers={'q1': 1},
        ))
        db_session.add(Certificate(
            user_id=user.id, track='physician',
            certificate_uid='BS-2026-DEL001',
            recipient_name='Delete Me',
            recipient_email='delete@example.com',
        ))
        await db_session.commit()

        await delete_user(db_session, user.id)

        # Verify user and all data removed
        assert await db_session.get(User, user.id) is None


class TestListUsers:
    """Tests for list_users()."""

    @pytest.mark.asyncio
    async def test_empty_database(self, db_session: AsyncSession) -> None:
        """Returns total=0 and empty list when no users exist."""
        result = await list_users(db_session)
        assert result.total == 0
        assert result.users == []

    @pytest.mark.asyncio
    async def test_search_matches_email(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Search matches email but not name when query is email-specific."""
        result = await list_users(db_session, search='bodyspec')
        assert result.total == 1
        assert result.users[0].email == sample_user.email


class TestGetUserDetail:
    """Tests for get_user_detail()."""

    @pytest.mark.asyncio
    async def test_user_with_no_progress(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Returns user detail with empty progress lists."""
        detail = await get_user_detail(db_session, sample_user.id)
        assert detail.email == sample_user.email
        assert detail.sections_completed == 0
        assert detail.quizzes_passed == 0
        assert detail.certificates_count == 0
        assert detail.module_progress == []
        assert detail.quiz_attempts == []
        assert detail.certificates == []

    @pytest.mark.asyncio
    async def test_user_with_multiple_modules(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Returns correct counts across multiple modules."""
        for module_id in ['core', 'physician']:
            db_session.add(SectionProgress(
                user_id=sample_user.id,
                module_id=module_id,
                section_slug='01-intro',
            ))
        db_session.add(QuizAttempt(
            user_id=sample_user.id, module_id='core',
            score=90, passed=True, answers={'q1': 1},
        ))
        await db_session.commit()

        detail = await get_user_detail(db_session, sample_user.id)
        assert detail.sections_completed == 2
        assert detail.quizzes_passed == 1
        assert len(detail.module_progress) == 2
