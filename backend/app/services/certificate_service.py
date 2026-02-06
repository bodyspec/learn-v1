from datetime import datetime, timedelta, timezone
from uuid import UUID

from sqlalchemy import and_, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certificate import Certificate
from app.schemas.certificate import CertificateVerifyResponse

# Certificates expire after 2 years
CERTIFICATE_VALIDITY_YEARS = 2

TRACK_INFO = {
    'physician': {
        'title': 'Clinical Applications',
        'description': 'clinical application of body composition analysis',
    },
    'chiropractor': {
        'title': 'Body Composition in Practice',
        'description': 'integrating body composition data into chiropractic care',
    },
    'trainer': {
        'title': 'Programming with DEXA Data',
        'description': 'using body composition analysis for fitness programming',
    },
}


async def has_active_certificate(
    db: AsyncSession,
    user_id: UUID,
    track: str,
) -> bool:
    """Check if user already has an active (non-revoked, non-expired) certificate for a track."""
    now = datetime.now(timezone.utc)
    result = await db.execute(
        select(Certificate).where(
            and_(
                Certificate.user_id == user_id,
                Certificate.track == track,
                Certificate.revoked_at == None,  # noqa: E711
                (Certificate.expires_at == None) | (Certificate.expires_at > now),  # noqa: E711
            )
        ).limit(1)
    )
    return result.scalar_one_or_none() is not None


async def create_certificate(
    db: AsyncSession,
    user_id: UUID,
    track: str,
    recipient_name: str,
    recipient_email: str,
) -> Certificate:
    """Create a new certificate."""
    # Generate unique certificate ID
    certificate_uid = Certificate.generate_uid()

    # Ensure uniqueness (retry if collision)
    while True:
        result = await db.execute(
            select(Certificate).where(Certificate.certificate_uid == certificate_uid)
        )
        if result.scalar_one_or_none() is None:
            break
        certificate_uid = Certificate.generate_uid()

    now = datetime.now(timezone.utc)
    expires_at = now + timedelta(days=365 * CERTIFICATE_VALIDITY_YEARS)

    certificate = Certificate(
        user_id=user_id,
        track=track,
        certificate_uid=certificate_uid,
        recipient_name=recipient_name,
        recipient_email=recipient_email,
        expires_at=expires_at,
    )
    db.add(certificate)
    await db.commit()
    await db.refresh(certificate)
    return certificate


async def get_user_certificates(
    db: AsyncSession,
    user_id: UUID,
) -> list[Certificate]:
    """Get all certificates for a user."""
    result = await db.execute(
        select(Certificate)
        .where(and_(Certificate.user_id == user_id, Certificate.revoked_at == None))  # noqa: E711
        .order_by(Certificate.issued_at.desc())
    )
    return list(result.scalars().all())


async def get_certificate_by_uid(
    db: AsyncSession,
    certificate_uid: str,
) -> Certificate | None:
    """Get a certificate by its public UID."""
    result = await db.execute(
        select(Certificate).where(Certificate.certificate_uid == certificate_uid)
    )
    return result.scalar_one_or_none()


def verify_certificate(certificate: Certificate | None) -> CertificateVerifyResponse:
    """Verify a certificate and return its status."""
    if certificate is None:
        return CertificateVerifyResponse(
            valid=False,
            reason='not_found',
        )

    if certificate.revoked_at is not None:
        return CertificateVerifyResponse(
            valid=False,
            certificate_uid=certificate.certificate_uid,
            recipient_name=certificate.recipient_name,
            track=certificate.track,
            reason='revoked',
            revoked_at=certificate.revoked_at,
        )

    if certificate.expires_at and certificate.expires_at < datetime.now(timezone.utc):
        return CertificateVerifyResponse(
            valid=False,
            certificate_uid=certificate.certificate_uid,
            recipient_name=certificate.recipient_name,
            track=certificate.track,
            reason='expired',
            expires_at=certificate.expires_at,
        )

    track_info = TRACK_INFO.get(certificate.track, {})

    return CertificateVerifyResponse(
        valid=True,
        certificate_uid=certificate.certificate_uid,
        recipient_name=certificate.recipient_name,
        track=certificate.track,
        track_title=track_info.get('title', certificate.track.title()),
        issued_at=certificate.issued_at,
        expires_at=certificate.expires_at,
    )


async def revoke_certificate(
    db: AsyncSession,
    certificate_uid: str,
    reason: str,
) -> Certificate | None:
    """Revoke a certificate by its UID."""
    certificate = await get_certificate_by_uid(db, certificate_uid)
    if certificate is None:
        return None

    certificate.revoked_at = datetime.now(timezone.utc)
    certificate.revocation_reason = reason
    await db.commit()
    await db.refresh(certificate)
    return certificate
