from pathlib import Path
from unittest.mock import patch

import pytest
from httpx import AsyncClient

CORRECT_CONTENT_DIR = Path(__file__).parent.parent.parent / 'content'

pytestmark = pytest.mark.asyncio

_patch_content = patch('app.services.quiz_service.CONTENT_DIR', CORRECT_CONTENT_DIR)


@_patch_content
async def test_submit_quiz_success(client: AsyncClient) -> None:
    """POST /api/v1/quiz/submit grades a quiz submission."""
    response = await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'core',
            'answers': {
                'core-q1': 1,
                'core-q2': 1,
                'core-q3': 2,
                'core-q4': 1,
                'core-q5': 1,
                'core-q6': 1,
                'core-q7': 1,
                'core-q8': 2,
            },
            'time_spent_seconds': 180,
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert 'score' in data
    assert 'passed' in data
    assert 'passing_score' in data
    assert 'results' in data
    assert isinstance(data['results'], list)
    assert data['score'] == 100
    assert data['passed'] is True


@_patch_content
async def test_submit_quiz_failing(client: AsyncClient) -> None:
    """POST /api/v1/quiz/submit with wrong answers fails."""
    response = await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'core',
            'answers': {
                'core-q1': 0,
                'core-q2': 0,
                'core-q3': 0,
                'core-q4': 0,
                'core-q5': 0,
                'core-q6': 0,
                'core-q7': 0,
                'core-q8': 0,
            },
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data['passed'] is False
    assert data['score'] == 0


@_patch_content
async def test_submit_quiz_nonexistent_module(client: AsyncClient) -> None:
    """POST /api/v1/quiz/submit for unknown module returns 404."""
    response = await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'nonexistent-module',
            'answers': {},
        },
    )
    assert response.status_code == 404


async def test_get_attempts_empty(client: AsyncClient) -> None:
    """GET /api/v1/quiz/attempts/{module_id} returns empty for new user."""
    response = await client.get('/api/v1/quiz/attempts/core')
    assert response.status_code == 200
    data = response.json()
    assert data['attempts'] == []
    assert data['best_score'] is None
    assert data['passed'] is False


@_patch_content
async def test_get_attempts_after_submission(client: AsyncClient) -> None:
    """After submitting a quiz, attempts endpoint reflects it."""
    await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'core',
            'answers': {
                'core-q1': 1,
                'core-q2': 1,
                'core-q3': 2,
                'core-q4': 1,
                'core-q5': 1,
                'core-q6': 1,
                'core-q7': 1,
                'core-q8': 2,
            },
        },
    )

    response = await client.get('/api/v1/quiz/attempts/core')
    assert response.status_code == 200
    data = response.json()
    assert len(data['attempts']) == 1
    assert data['best_score'] == 100
    assert data['passed'] is True


@_patch_content
async def test_multiple_quiz_attempts(client: AsyncClient) -> None:
    """Multiple submissions are all tracked."""
    await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'core',
            'answers': {'core-q1': 0, 'core-q2': 0, 'core-q3': 0, 'core-q4': 0,
                        'core-q5': 0, 'core-q6': 0, 'core-q7': 0, 'core-q8': 0},
        },
    )
    await client.post(
        '/api/v1/quiz/submit',
        json={
            'module_id': 'core',
            'answers': {'core-q1': 1, 'core-q2': 1, 'core-q3': 2, 'core-q4': 1,
                        'core-q5': 1, 'core-q6': 1, 'core-q7': 1, 'core-q8': 2},
        },
    )

    response = await client.get('/api/v1/quiz/attempts/core')
    data = response.json()
    assert len(data['attempts']) == 2
    assert data['best_score'] == 100
    assert data['passed'] is True
