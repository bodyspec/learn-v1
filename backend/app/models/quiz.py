import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, ForeignKey, Index, Integer, String
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User


class QuizAttempt(Base):
    __tablename__ = 'quiz_attempts'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey('users.id', ondelete='CASCADE'),
        nullable=False,
        index=True,
    )
    module_id: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )
    score: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
    )
    passed: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
    )
    answers: Mapped[dict] = mapped_column(
        JSONB,
        nullable=False,
    )
    time_spent_seconds: Mapped[int | None] = mapped_column(Integer)
    attempted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # Relationships
    user: Mapped['User'] = relationship('User', back_populates='quiz_attempts')

    __table_args__ = (
        Index('idx_quiz_user_module', 'user_id', 'module_id'),
        Index('idx_quiz_user_module_passed', 'user_id', 'module_id', 'passed'),
    )
