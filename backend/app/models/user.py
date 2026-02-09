import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.certificate import Certificate
    from app.models.progress import SectionProgress
    from app.models.quiz import QuizAttempt


class User(Base):
    __tablename__ = 'users'

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
    )
    keycloak_id: Mapped[str] = mapped_column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
    )
    email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
        index=True,
    )
    name: Mapped[str | None] = mapped_column(String(255))
    role_type: Mapped[str | None] = mapped_column(String(50))  # physician, chiropractor, trainer, other
    organization: Mapped[str | None] = mapped_column(String(255))
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, server_default='false')
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )
    last_login: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))

    # Relationships
    progress: Mapped[list['SectionProgress']] = relationship(
        'SectionProgress',
        back_populates='user',
        cascade='all, delete-orphan',
    )
    quiz_attempts: Mapped[list['QuizAttempt']] = relationship(
        'QuizAttempt',
        back_populates='user',
        cascade='all, delete-orphan',
    )
    certificates: Mapped[list['Certificate']] = relationship(
        'Certificate',
        back_populates='user',
        cascade='all, delete-orphan',
    )
