import uuid
from collections.abc import AsyncGenerator

import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_admin_user, get_current_user
from app.core.database import get_db
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User
from tests.conftest import _mock_current_user


@pytest.fixture
async def admin_user(db_session: AsyncSession) -> User:
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-admin-001',
        email='admin@bodyspec.com',
        name='Admin User',
        is_admin=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def regular_user(db_session: AsyncSession) -> User:
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-regular-001',
        email='regular@example.com',
        name='Regular User',
        role_type='trainer',
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def bodyspec_user(db_session: AsyncSession) -> User:
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-bodyspec-001',
        email='newadmin@bodyspec.com',
        name='Bodyspec User',
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def other_admin(db_session: AsyncSession) -> User:
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-admin-002',
        email='otheradmin@bodyspec.com',
        name='Other Admin',
        is_admin=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


def _make_admin_app(admin: User, db_session: AsyncSession) -> FastAPI:
    from app.main import create_app

    app = create_app()

    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = _mock_current_user(admin)
    app.dependency_overrides[get_admin_user] = _mock_current_user(admin)
    return app


def _make_non_admin_app(user: User, db_session: AsyncSession) -> FastAPI:
    from app.main import create_app

    app = create_app()

    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield db_session

    async def non_admin_override():
        from fastapi import HTTPException, status
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail='Admin access required')

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = _mock_current_user(user)
    app.dependency_overrides[get_admin_user] = non_admin_override
    return app


# --- List users ---

@pytest.mark.asyncio
async def test_list_users(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/admin/users')

    assert response.status_code == 200
    data = response.json()
    assert data['total'] == 2
    assert len(data['users']) == 2
    assert data['page'] == 1
    assert data['per_page'] == 25


@pytest.mark.asyncio
async def test_list_users_search(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/admin/users', params={'search': 'regular'})

    assert response.status_code == 200
    data = response.json()
    assert data['total'] == 1
    assert data['users'][0]['email'] == 'regular@example.com'


@pytest.mark.asyncio
async def test_list_users_pagination(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/admin/users', params={'per_page': 1, 'page': 1})

    assert response.status_code == 200
    data = response.json()
    assert data['total'] == 2
    assert len(data['users']) == 1


@pytest.mark.asyncio
async def test_list_users_forbidden_for_non_admin(regular_user: User, db_session: AsyncSession) -> None:
    app = _make_non_admin_app(regular_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/admin/users')

    assert response.status_code == 403


# --- User detail ---

@pytest.mark.asyncio
async def test_get_user_detail(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    # Add some progress data
    db_session.add(SectionProgress(user_id=regular_user.id, module_id='core', section_slug='01-intro'))
    db_session.add(QuizAttempt(
        user_id=regular_user.id, module_id='core', score=85, passed=True,
        answers={'q1': 1}, time_spent_seconds=60,
    ))
    await db_session.commit()

    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get(f'/api/v1/admin/users/{regular_user.id}')

    assert response.status_code == 200
    data = response.json()
    assert data['email'] == 'regular@example.com'
    assert data['sections_completed'] == 1
    assert data['quizzes_passed'] == 1
    assert len(data['module_progress']) == 1
    assert len(data['quiz_attempts']) == 1


@pytest.mark.asyncio
async def test_get_user_detail_not_found(admin_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get(f'/api/v1/admin/users/{uuid.uuid4()}')

    assert response.status_code == 404


# --- Promote ---

@pytest.mark.asyncio
async def test_promote_bodyspec_user(admin_user: User, bodyspec_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.put(f'/api/v1/admin/users/{bodyspec_user.id}/promote')

    assert response.status_code == 200
    assert response.json()['is_admin'] is True


@pytest.mark.asyncio
async def test_promote_non_bodyspec_user_fails(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.put(f'/api/v1/admin/users/{regular_user.id}/promote')

    assert response.status_code == 400
    assert 'bodyspec.com' in response.json()['detail']


# --- Demote ---

@pytest.mark.asyncio
async def test_demote_other_admin(admin_user: User, other_admin: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.put(f'/api/v1/admin/users/{other_admin.id}/demote')

    assert response.status_code == 200
    assert response.json()['is_admin'] is False


@pytest.mark.asyncio
async def test_demote_self_fails(admin_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.put(f'/api/v1/admin/users/{admin_user.id}/demote')

    assert response.status_code == 400
    assert 'yourself' in response.json()['detail']


# --- Delete ---

@pytest.mark.asyncio
async def test_delete_non_admin_user(admin_user: User, regular_user: User, db_session: AsyncSession) -> None:
    # Add data that should cascade delete
    db_session.add(SectionProgress(user_id=regular_user.id, module_id='core', section_slug='01-intro'))
    await db_session.commit()

    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.delete(f'/api/v1/admin/users/{regular_user.id}')

    assert response.status_code == 204

    # Verify user is gone
    deleted = await db_session.get(User, regular_user.id)
    assert deleted is None


@pytest.mark.asyncio
async def test_delete_admin_user_fails(admin_user: User, other_admin: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.delete(f'/api/v1/admin/users/{other_admin.id}')

    assert response.status_code == 400
    assert 'admin' in response.json()['detail'].lower()


@pytest.mark.asyncio
async def test_delete_nonexistent_user_fails(admin_user: User, db_session: AsyncSession) -> None:
    app = _make_admin_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.delete(f'/api/v1/admin/users/{uuid.uuid4()}')

    assert response.status_code == 404
