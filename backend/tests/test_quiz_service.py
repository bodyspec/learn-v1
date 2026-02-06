import uuid
from pathlib import Path
from unittest.mock import patch

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.quiz import QuizAttempt
from app.models.user import User
from app.schemas.quiz import QuizSubmission, QuizSubmissionResult
from app.services.quiz_service import (
    get_quiz_attempts,
    grade_quiz,
    has_passed_quiz,
    load_quiz,
    record_quiz_attempt,
)

# Minimal quiz fixture for grading tests
SAMPLE_QUIZ = {
    'module_id': 'test-module',
    'passing_score': 80,
    'questions': [
        {
            'id': 'q1',
            'type': 'multiple_choice',
            'text': 'What is 1+1?',
            'options': [
                {'text': '1', 'correct': False},
                {'text': '2', 'correct': True},
                {'text': '3', 'correct': False},
            ],
            'explanation': '1+1=2',
        },
        {
            'id': 'q2',
            'type': 'multiple_choice',
            'text': 'What is 2+2?',
            'options': [
                {'text': '3', 'correct': False},
                {'text': '4', 'correct': True},
                {'text': '5', 'correct': False},
            ],
            'explanation': '2+2=4',
        },
        {
            'id': 'q3',
            'type': 'multiple_choice',
            'text': 'What is 3+3?',
            'options': [
                {'text': '5', 'correct': False},
                {'text': '6', 'correct': True},
                {'text': '7', 'correct': False},
            ],
            'explanation': '3+3=6',
        },
        {
            'id': 'q4',
            'type': 'multiple_choice',
            'text': 'What is 4+4?',
            'options': [
                {'text': '7', 'correct': False},
                {'text': '8', 'correct': True},
                {'text': '9', 'correct': False},
            ],
            'explanation': '4+4=8',
        },
        {
            'id': 'q5',
            'type': 'multiple_choice',
            'text': 'What is 5+5?',
            'options': [
                {'text': '9', 'correct': False},
                {'text': '10', 'correct': True},
                {'text': '11', 'correct': False},
            ],
            'explanation': '5+5=10',
        },
    ],
}


class TestGradeQuiz:
    """Tests for the grade_quiz function."""

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_all_correct(self, mock_load: object) -> None:
        """All correct answers gives 100% and passes."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1},
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.score == 100
        assert result.passed is True
        assert result.certificate_eligible is True
        assert len(result.results) == 5
        assert all(r.correct for r in result.results)

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_all_wrong(self, mock_load: object) -> None:
        """All wrong answers gives 0% and fails."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0},
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.score == 0
        assert result.passed is False
        assert result.certificate_eligible is False
        assert all(not r.correct for r in result.results)

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_exact_passing(self, mock_load: object) -> None:
        """Exactly at passing score passes."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        # 4 out of 5 = 80%, exactly the passing score
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 0},
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.score == 80
        assert result.passed is True

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_just_below_passing(self, mock_load: object) -> None:
        """Just below passing score fails."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        # 3 out of 5 = 60%, below 80% threshold
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 1, 'q2': 1, 'q3': 1, 'q4': 0, 'q5': 0},
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.score == 60
        assert result.passed is False

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_missing_answers(self, mock_load: object) -> None:
        """Missing answers are treated as wrong (-1 selected)."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 1},  # only 1 of 5 answered
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.score == 20  # 1/5 correct
        # Check that unanswered questions show -1 as selected
        unanswered = [r for r in result.results if r.question_id != 'q1']
        assert all(r.selected_option == -1 for r in unanswered)

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_nonexistent_module(self, mock_load: object) -> None:
        """Returns None for a quiz that doesn't exist."""
        mock_load.return_value = None  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='nonexistent',
            answers={},
        )
        result = grade_quiz(submission)
        assert result is None

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_results_have_explanations(self, mock_load: object) -> None:
        """Each question result includes the explanation."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 1, 'q2': 1, 'q3': 1, 'q4': 1, 'q5': 1},
        )
        result = grade_quiz(submission)
        assert result is not None
        assert result.results[0].explanation == '1+1=2'
        assert result.results[1].explanation == '2+2=4'

    @patch('app.services.quiz_service.load_quiz')
    def test_grade_quiz_correct_option_indices(self, mock_load: object) -> None:
        """Result includes the correct option index for each question."""
        mock_load.return_value = SAMPLE_QUIZ  # type: ignore[attr-defined]
        submission = QuizSubmission(
            module_id='test-module',
            answers={'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0},
        )
        result = grade_quiz(submission)
        assert result is not None
        # All correct answers are at index 1 in our sample quiz
        for r in result.results:
            assert r.correct_option == 1


class TestLoadQuiz:
    """Tests for loading quiz YAML files."""

    CORRECT_CONTENT_DIR = Path(__file__).parent.parent.parent / 'content'

    @patch('app.services.quiz_service.CONTENT_DIR', CORRECT_CONTENT_DIR)
    def test_load_core_quiz(self) -> None:
        """The core quiz file can be loaded."""
        quiz = load_quiz('core')
        assert quiz is not None
        assert quiz['module_id'] == 'core'
        assert quiz['passing_score'] == 80
        assert len(quiz['questions']) > 0

    @patch('app.services.quiz_service.CONTENT_DIR', CORRECT_CONTENT_DIR)
    def test_load_nonexistent_quiz(self) -> None:
        """Loading a nonexistent quiz returns None."""
        quiz = load_quiz('nonexistent-module')
        assert quiz is None


@pytest.mark.asyncio
async def test_record_quiz_attempt(db_session: AsyncSession, sample_user: User) -> None:
    """record_quiz_attempt persists a quiz attempt to the database."""
    submission = QuizSubmission(
        module_id='core',
        answers={'q1': 1},
        time_spent_seconds=60,
    )
    result = QuizSubmissionResult(
        score=85,
        passed=True,
        passing_score=80,
        results=[],
        certificate_eligible=True,
    )
    attempt = await record_quiz_attempt(
        db_session, sample_user.id, submission, result
    )
    assert attempt.id is not None
    assert attempt.user_id == sample_user.id
    assert attempt.module_id == 'core'
    assert attempt.score == 85
    assert attempt.passed is True
    assert attempt.time_spent_seconds == 60


@pytest.mark.asyncio
async def test_get_quiz_attempts_empty(db_session: AsyncSession, sample_user: User) -> None:
    """get_quiz_attempts returns empty list when no attempts exist."""
    response = await get_quiz_attempts(db_session, sample_user.id, 'core')
    assert response.attempts == []
    assert response.best_score is None
    assert response.passed is False


@pytest.mark.asyncio
async def test_get_quiz_attempts_with_data(
    db_session: AsyncSession,
    sample_user: User,
    sample_quiz_attempt: QuizAttempt,
    sample_failed_quiz_attempt: QuizAttempt,
) -> None:
    """get_quiz_attempts returns all attempts with correct best score and passed status."""
    response = await get_quiz_attempts(db_session, sample_user.id, 'core')
    assert len(response.attempts) == 2
    assert response.best_score == 90
    assert response.passed is True


@pytest.mark.asyncio
async def test_has_passed_quiz_true(
    db_session: AsyncSession,
    sample_user: User,
    sample_quiz_attempt: QuizAttempt,
) -> None:
    """has_passed_quiz returns True when a passing attempt exists."""
    result = await has_passed_quiz(db_session, sample_user.id, 'core')
    assert result is True


@pytest.mark.asyncio
async def test_has_passed_quiz_false_no_attempts(
    db_session: AsyncSession, sample_user: User
) -> None:
    """has_passed_quiz returns False when no attempts exist."""
    result = await has_passed_quiz(db_session, sample_user.id, 'core')
    assert result is False


@pytest.mark.asyncio
async def test_has_passed_quiz_false_only_failed(
    db_session: AsyncSession,
    sample_user: User,
    sample_failed_quiz_attempt: QuizAttempt,
) -> None:
    """has_passed_quiz returns False when only failed attempts exist."""
    result = await has_passed_quiz(db_session, sample_user.id, 'core')
    assert result is False
