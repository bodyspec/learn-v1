import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_update_user_name(client: AsyncClient) -> None:
    """PUT /api/v1/users/me updates user name."""
    response = await client.put(
        '/api/v1/users/me',
        json={'name': 'Dr. Updated'},
    )
    assert response.status_code == 200
    data = response.json()
    assert data['name'] == 'Dr. Updated'


@pytest.mark.asyncio
async def test_update_user_role_type(client: AsyncClient) -> None:
    """PUT /api/v1/users/me updates role type."""
    response = await client.put(
        '/api/v1/users/me',
        json={'role_type': 'trainer'},
    )
    assert response.status_code == 200
    data = response.json()
    assert data['role_type'] == 'trainer'


@pytest.mark.asyncio
async def test_update_user_organization(client: AsyncClient) -> None:
    """PUT /api/v1/users/me updates organization."""
    response = await client.put(
        '/api/v1/users/me',
        json={'organization': 'New Clinic'},
    )
    assert response.status_code == 200
    data = response.json()
    assert data['organization'] == 'New Clinic'


@pytest.mark.asyncio
async def test_update_user_response_format(client: AsyncClient) -> None:
    """PUT /api/v1/users/me returns proper response shape."""
    response = await client.put(
        '/api/v1/users/me',
        json={'name': 'Test'},
    )
    data = response.json()
    assert 'id' in data
    assert 'email' in data
    assert 'name' in data
    assert 'role_type' in data
    assert 'organization' in data
    assert 'is_admin' in data
