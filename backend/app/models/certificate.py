import random
import string
import uuid
from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, String, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.database import Base

if TYPE_CHECKING:
    from app.models.user import User


class Certificate(Base):
    __tablename__ = 'certificates'

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
    track: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        index=True,
    )
    certificate_uid: Mapped[str] = mapped_column(
        String(20),
        unique=True,
        nullable=False,
        index=True,
    )
    recipient_name: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    recipient_email: Mapped[str] = mapped_column(
        String(255),
        nullable=False,
    )
    issued_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
    )
    expires_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revoked_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True))
    revocation_reason: Mapped[str | None] = mapped_column(Text)

    # Relationships
    user: Mapped['User'] = relationship('User', back_populates='certificates')

    @staticmethod
    def generate_uid() -> str:
        """Generate a unique certificate ID like BS-2024-X7K9M2."""
        # Exclude ambiguous characters: 0, O, 1, I, L
        chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
        random_part = ''.join(random.choices(chars, k=6))
        year = datetime.now().year
        return f'BS-{year}-{random_part}'
