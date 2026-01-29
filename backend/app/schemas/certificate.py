from datetime import datetime
from typing import Literal
from uuid import UUID

from pydantic import BaseModel


class CertificateCreate(BaseModel):
    track: Literal['physician', 'chiropractor', 'trainer']


class CertificateResponse(BaseModel):
    id: UUID
    track: str
    certificate_uid: str
    recipient_name: str
    issued_at: datetime
    expires_at: datetime | None = None

    class Config:
        from_attributes = True


class CertificatesListResponse(BaseModel):
    certificates: list[CertificateResponse]


class CertificateVerifyResponse(BaseModel):
    valid: bool
    certificate_uid: str | None = None
    recipient_name: str | None = None
    track: str | None = None
    track_title: str | None = None
    issued_at: datetime | None = None
    expires_at: datetime | None = None
    reason: Literal['not_found', 'revoked', 'expired'] | None = None
    revoked_at: datetime | None = None
