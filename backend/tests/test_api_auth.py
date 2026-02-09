import pytest
from httpx import ASGITransport, AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


@pytest.mark.asyncio
async def test_get_me_authenticated(
    client: AsyncClient,
    sample_user: User,
) -> None:
    """GET /api/v1/auth/me returns full user profile when authenticated."""
    response = await client.get('/api/v1/auth/me')
    assert response.status_code == 200
    data = response.json()
    assert data['email'] == sample_user.email
    assert data['name'] == sample_user.name
    assert data['role_type'] == sample_user.role_type
    assert data['organization'] == sample_user.organization
    assert 'is_admin' in data


@pytest.mark.asyncio
async def test_get_me_unauthenticated(
    db_session: AsyncSession,
) -> None:
    """GET /api/v1/auth/me returns 401 when no token provided."""
    from app.main import create_app
    from app.core.database import get_db

    app = create_app()

    async def override_get_db():
        yield db_session

    app.dependency_overrides[get_db] = override_get_db

    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as ac:
        response = await ac.get('/api/v1/auth/me')
    assert response.status_code == 401
