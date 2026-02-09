from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AdminUserSummary(BaseModel):
    id: UUID
    email: str
    name: str | None
    role_type: str | None
    is_admin: bool
    last_login: datetime | None
    created_at: datetime
    sections_completed: int
    quizzes_passed: int
    certificates_count: int

    class Config:
        from_attributes = True


class AdminUserListResponse(BaseModel):
    users: list[AdminUserSummary]
    total: int
    page: int
    per_page: int


class ModuleProgressDetail(BaseModel):
    module_id: str
    sections_completed: int

    class Config:
        from_attributes = True


class QuizAttemptDetail(BaseModel):
    id: UUID
    module_id: str
    score: int
    passed: bool
    attempted_at: datetime

    class Config:
        from_attributes = True


class CertificateDetail(BaseModel):
    id: UUID
    track: str
    certificate_uid: str
    issued_at: datetime

    class Config:
        from_attributes = True


class AdminUserDetail(AdminUserSummary):
    module_progress: list[ModuleProgressDetail]
    quiz_attempts: list[QuizAttemptDetail]
    certificates: list[CertificateDetail]
