import uuid
from collections.abc import AsyncGenerator

import pytest
from fastapi import FastAPI, HTTPException
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_admin_user, get_current_user
from app.core.database import get_db
from app.models.user import User
from tests.conftest import _mock_current_user


@pytest.fixture
async def admin_user(db_session: AsyncSession) -> User:
    """Create an admin user for testing."""
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-admin-user-789',
        email='admin@bodyspec.com',
        name='Admin User',
        is_admin=True,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def non_admin_user(db_session: AsyncSession) -> User:
    """Create a non-admin user for testing."""
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-nonadmin-user-101',
        email='user@example.com',
        name='Regular User',
        is_admin=False,
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


def _make_app(user: User, db_session: AsyncSession) -> FastAPI:
    """Create a FastAPI app with overridden dependencies for a specific user."""
    from app.main import create_app

    app = create_app()

    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield db_session

    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = _mock_current_user(user)
    return app


@pytest.mark.asyncio
async def test_auth_me_includes_is_admin_true(
    admin_user: User, db_session: AsyncSession
) -> None:
    """GET /api/v1/auth/me returns is_admin=true for admin users."""
    app = _make_app(admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/auth/me')
    assert response.status_code == 200
    data = response.json()
    assert data['is_admin'] is True


@pytest.mark.asyncio
async def test_auth_me_includes_is_admin_false(
    non_admin_user: User, db_session: AsyncSession
) -> None:
    """GET /api/v1/auth/me returns is_admin=false for non-admin users."""
    app = _make_app(non_admin_user, db_session)
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as client:
        response = await client.get('/api/v1/auth/me')
    assert response.status_code == 200
    data = response.json()
    assert data['is_admin'] is False


@pytest.mark.asyncio
async def test_user_is_admin_defaults_to_false(db_session: AsyncSession) -> None:
    """New users default to is_admin=False."""
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-new-user-999',
        email='newuser@example.com',
        name='New User',
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    assert user.is_admin is False


@pytest.mark.asyncio
async def test_get_admin_user_returns_admin(admin_user: User) -> None:
    """get_admin_user returns the user when is_admin=True."""
    result = await get_admin_user(admin_user)
    assert result is admin_user
    assert result.is_admin is True


@pytest.mark.asyncio
async def test_get_admin_user_raises_403_for_non_admin(non_admin_user: User) -> None:
    """get_admin_user raises 403 when is_admin=False."""
    with pytest.raises(HTTPException) as exc_info:
        await get_admin_user(non_admin_user)
    assert exc_info.value.status_code == 403
    assert exc_info.value.detail == 'Admin access required'
