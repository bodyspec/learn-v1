from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class QuizSubmission(BaseModel):
    module_id: str
    answers: dict[str, int]  # question_id -> selected option index
    time_spent_seconds: int | None = None


class QuestionResult(BaseModel):
    question_id: str
    correct: bool
    selected_option: int
    correct_option: int
    explanation: str


class QuizSubmissionResult(BaseModel):
    score: int
    passed: bool
    passing_score: int
    results: list[QuestionResult]
    certificate_eligible: bool


class QuizAttemptResponse(BaseModel):
    id: UUID
    score: int
    passed: bool
    attempted_at: datetime


class QuizAttemptsResponse(BaseModel):
    attempts: list[QuizAttemptResponse]
    best_score: int | None
    passed: bool
