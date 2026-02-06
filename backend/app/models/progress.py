import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Index, String, UniqueConstraint
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User


class SectionProgress(Base):
    __tablename__ = 'section_progress'

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
    section_slug: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )
    completed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )

    # Relationships
    user: Mapped['User'] = relationship('User', back_populates='progress')

    __table_args__ = (
        UniqueConstraint('user_id', 'module_id', 'section_slug', name='unique_user_section'),
        Index('idx_progress_user_module', 'user_id', 'module_id'),
    )
