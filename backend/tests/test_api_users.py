import pytest
from httpx import AsyncClient
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certificate import Certificate
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt


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


# --- Reset progress ---

@pytest.mark.asyncio
async def test_reset_sections(
    client: AsyncClient, sample_section_progress: SectionProgress, db_session: AsyncSession,
) -> None:
    response = await client.post('/api/v1/users/me/reset-progress', json={'sections': True})
    assert response.status_code == 200
    data = response.json()
    assert data['sections_deleted'] == 1
    assert data['quizzes_deleted'] == 0
    assert data['certificates_deleted'] == 0

    count = (await db_session.execute(
        select(func.count()).select_from(SectionProgress)
    )).scalar_one()
    assert count == 0


@pytest.mark.asyncio
async def test_reset_quizzes(
    client: AsyncClient, sample_quiz_attempt: QuizAttempt, db_session: AsyncSession,
) -> None:
    response = await client.post('/api/v1/users/me/reset-progress', json={'quizzes': True})
    assert response.status_code == 200
    data = response.json()
    assert data['quizzes_deleted'] == 1


@pytest.mark.asyncio
async def test_reset_certificates(
    client: AsyncClient, sample_certificate: Certificate, db_session: AsyncSession,
) -> None:
    response = await client.post('/api/v1/users/me/reset-progress', json={'certificates': True})
    assert response.status_code == 200
    data = response.json()
    assert data['certificates_deleted'] == 1


@pytest.mark.asyncio
async def test_reset_all(
    client: AsyncClient,
    sample_section_progress: SectionProgress,
    sample_quiz_attempt: QuizAttempt,
    sample_certificate: Certificate,
    db_session: AsyncSession,
) -> None:
    response = await client.post(
        '/api/v1/users/me/reset-progress',
        json={'sections': True, 'quizzes': True, 'certificates': True},
    )
    assert response.status_code == 200
    data = response.json()
    assert data['sections_deleted'] == 1
    assert data['quizzes_deleted'] == 1
    assert data['certificates_deleted'] == 1


@pytest.mark.asyncio
async def test_reset_nothing_selected(client: AsyncClient) -> None:
    response = await client.post('/api/v1/users/me/reset-progress', json={})
    assert response.status_code == 200
    data = response.json()
    assert data['sections_deleted'] == 0
    assert data['quizzes_deleted'] == 0
    assert data['certificates_deleted'] == 0
