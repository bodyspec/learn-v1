from datetime import datetime

from pydantic import BaseModel


class SectionComplete(BaseModel):
    module_id: str
    section_slug: str


class SectionProgressResponse(BaseModel):
    module_id: str
    section_slug: str
    completed_at: datetime


class QuizResultSummary(BaseModel):
    score: int
    passed_at: datetime


class ProgressResponse(BaseModel):
    sections_completed: list[SectionProgressResponse]
    modules_completed: list[str]
    quizzes_passed: dict[str, QuizResultSummary]
