import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_get_progress_empty(client: AsyncClient) -> None:
    """GET /api/v1/progress returns empty progress for new user."""
    response = await client.get('/api/v1/progress')
    assert response.status_code == 200
    data = response.json()
    assert data['sections_completed'] == []
    assert data['modules_completed'] == []
    assert data['quizzes_passed'] == {}


@pytest.mark.asyncio
async def test_complete_section(client: AsyncClient) -> None:
    """POST /api/v1/progress/section marks a section complete."""
    response = await client.post(
        '/api/v1/progress/section',
        json={'module_id': 'core', 'section_slug': '01-how-dexa-works'},
    )
    assert response.status_code == 201
    data = response.json()
    assert data['module_id'] == 'core'
    assert data['section_slug'] == '01-how-dexa-works'
    assert 'completed_at' in data


@pytest.mark.asyncio
async def test_complete_section_idempotent(client: AsyncClient) -> None:
    """Completing the same section twice returns 201 both times."""
    payload = {'module_id': 'core', 'section_slug': '01-how-dexa-works'}

    r1 = await client.post('/api/v1/progress/section', json=payload)
    r2 = await client.post('/api/v1/progress/section', json=payload)

    assert r1.status_code == 201
    assert r2.status_code == 201
    # Same completion timestamp
    assert r1.json()['completed_at'] == r2.json()['completed_at']


@pytest.mark.asyncio
async def test_progress_reflects_completed_sections(client: AsyncClient) -> None:
    """After completing a section, GET /progress shows it."""
    await client.post(
        '/api/v1/progress/section',
        json={'module_id': 'core', 'section_slug': '01-how-dexa-works'},
    )
    response = await client.get('/api/v1/progress')
    assert response.status_code == 200
    data = response.json()
    assert len(data['sections_completed']) == 1
    assert data['sections_completed'][0]['section_slug'] == '01-how-dexa-works'


@pytest.mark.asyncio
async def test_complete_multiple_sections(client: AsyncClient) -> None:
    """Completing multiple sections in same module works."""
    sections = ['01-how-dexa-works', '02-what-dexa-measures', '03-reading-your-report']
    for slug in sections:
        r = await client.post(
            '/api/v1/progress/section',
            json={'module_id': 'core', 'section_slug': slug},
        )
        assert r.status_code == 201

    response = await client.get('/api/v1/progress')
    data = response.json()
    assert len(data['sections_completed']) == 3
