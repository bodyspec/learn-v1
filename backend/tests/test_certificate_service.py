from datetime import datetime, timezone

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certificate import Certificate
from app.models.user import User
from app.services.certificate_service import (
    TRACK_INFO,
    create_certificate,
    get_certificate_by_uid,
    get_user_certificates,
    has_active_certificate,
    revoke_certificate,
    verify_certificate,
)


class TestCertificateModel:
    """Tests for the Certificate model methods."""

    def test_generate_uid_format(self) -> None:
        """Certificate UID follows BS-YYYY-XXXXXX format."""
        uid = Certificate.generate_uid()
        parts = uid.split('-')
        assert len(parts) == 3
        assert parts[0] == 'BS'
        assert len(parts[1]) == 4
        assert parts[1].isdigit()
        assert len(parts[2]) == 6

    def test_generate_uid_uniqueness(self) -> None:
        """Multiple generated UIDs are different."""
        uids = {Certificate.generate_uid() for _ in range(100)}
        # With 30^6 possible values, 100 should all be unique
        assert len(uids) == 100

    def test_generate_uid_uses_current_year(self) -> None:
        """UID contains the current year."""
        uid = Certificate.generate_uid()
        year = str(datetime.now().year)
        assert year in uid

    def test_generate_uid_excludes_ambiguous_chars(self) -> None:
        """UID random part excludes ambiguous characters (0, O, 1, I, L)."""
        ambiguous = set('0O1IL')
        for _ in range(100):
            uid = Certificate.generate_uid()
            random_part = uid.split('-')[2]
            assert not ambiguous.intersection(set(random_part))


@pytest.mark.asyncio
async def test_create_certificate(db_session: AsyncSession, sample_user: User) -> None:
    """create_certificate creates a new certificate with a unique UID."""
    cert = await create_certificate(
        db_session,
        user_id=sample_user.id,
        track='physician',
        recipient_name='Dr. Test',
        recipient_email='test@bodyspec.com',
    )
    assert cert.id is not None
    assert cert.track == 'physician'
    assert cert.recipient_name == 'Dr. Test'
    assert cert.recipient_email == 'test@bodyspec.com'
    assert cert.certificate_uid.startswith('BS-')
    assert cert.revoked_at is None


@pytest.mark.asyncio
async def test_create_multiple_certificates(
    db_session: AsyncSession, sample_user: User
) -> None:
    """Multiple certificates get unique UIDs."""
    certs = []
    for _ in range(5):
        cert = await create_certificate(
            db_session,
            user_id=sample_user.id,
            track='physician',
            recipient_name='Dr. Test',
            recipient_email='test@bodyspec.com',
        )
        certs.append(cert)

    uids = {c.certificate_uid for c in certs}
    assert len(uids) == 5


@pytest.mark.asyncio
async def test_get_user_certificates(
    db_session: AsyncSession,
    sample_user: User,
    sample_certificate: Certificate,
) -> None:
    """get_user_certificates returns non-revoked certificates for a user."""
    certs = await get_user_certificates(db_session, sample_user.id)
    assert len(certs) == 1
    assert certs[0].certificate_uid == sample_certificate.certificate_uid


@pytest.mark.asyncio
async def test_get_user_certificates_excludes_revoked(
    db_session: AsyncSession,
    sample_user: User,
    sample_certificate: Certificate,
    revoked_certificate: Certificate,
) -> None:
    """get_user_certificates filters out revoked certificates."""
    certs = await get_user_certificates(db_session, sample_user.id)
    uids = {c.certificate_uid for c in certs}
    assert sample_certificate.certificate_uid in uids
    assert revoked_certificate.certificate_uid not in uids


@pytest.mark.asyncio
async def test_get_user_certificates_empty(
    db_session: AsyncSession, second_user: User
) -> None:
    """get_user_certificates returns empty list for user with no certificates."""
    certs = await get_user_certificates(db_session, second_user.id)
    assert certs == []


@pytest.mark.asyncio
async def test_get_certificate_by_uid(
    db_session: AsyncSession,
    sample_certificate: Certificate,
) -> None:
    """get_certificate_by_uid returns the certificate matching the UID."""
    cert = await get_certificate_by_uid(
        db_session, sample_certificate.certificate_uid
    )
    assert cert is not None
    assert cert.id == sample_certificate.id


@pytest.mark.asyncio
async def test_get_certificate_by_uid_not_found(
    db_session: AsyncSession,
) -> None:
    """get_certificate_by_uid returns None for unknown UID."""
    cert = await get_certificate_by_uid(db_session, 'BS-9999-NONEXIST')
    assert cert is None


class TestVerifyCertificate:
    """Tests for the verify_certificate function."""

    def test_verify_valid_certificate(self, sample_certificate: Certificate) -> None:
        """Valid certificate returns valid=True with details."""
        result = verify_certificate(sample_certificate)
        assert result.valid is True
        assert result.certificate_uid == sample_certificate.certificate_uid
        assert result.recipient_name == sample_certificate.recipient_name
        assert result.track == 'physician'
        assert result.track_title == 'Clinical Applications'
        assert result.reason is None

    def test_verify_none_certificate(self) -> None:
        """None certificate returns not_found."""
        result = verify_certificate(None)
        assert result.valid is False
        assert result.reason == 'not_found'

    def test_verify_revoked_certificate(self, revoked_certificate: Certificate) -> None:
        """Revoked certificate returns revoked reason."""
        result = verify_certificate(revoked_certificate)
        assert result.valid is False
        assert result.reason == 'revoked'
        assert result.revoked_at is not None

    def test_verify_expired_certificate(self) -> None:
        """Expired certificate returns expired reason."""
        from unittest.mock import MagicMock
        cert = MagicMock(spec=Certificate)
        cert.revoked_at = None
        cert.expires_at = datetime(2023, 1, 1, tzinfo=timezone.utc)
        cert.certificate_uid = 'BS-2023-EXPIRED'
        cert.recipient_name = 'Test User'
        cert.track = 'chiropractor'

        result = verify_certificate(cert)
        assert result.valid is False
        assert result.reason == 'expired'
        assert result.expires_at is not None


class TestTrackInfo:
    """Tests for TRACK_INFO constant."""

    def test_all_tracks_have_info(self) -> None:
        """All three tracks are defined in TRACK_INFO."""
        assert 'physician' in TRACK_INFO
        assert 'chiropractor' in TRACK_INFO
        assert 'trainer' in TRACK_INFO

    def test_track_info_structure(self) -> None:
        """Each track info has title and description."""
        for track_name, info in TRACK_INFO.items():
            assert 'title' in info, f'{track_name} missing title'
            assert 'description' in info, f'{track_name} missing description'


class TestHasActiveCertificate:
    """Tests for has_active_certificate()."""

    @pytest.mark.asyncio
    async def test_returns_true_for_active_certificate(
        self, db_session: AsyncSession, sample_user: User, sample_certificate: Certificate
    ) -> None:
        """Returns True when an active (non-revoked, non-expired) certificate exists."""
        result = await has_active_certificate(db_session, sample_user.id, 'physician')
        assert result is True

    @pytest.mark.asyncio
    async def test_returns_false_when_no_certificate(
        self, db_session: AsyncSession, sample_user: User
    ) -> None:
        """Returns False when no certificate exists for the user."""
        result = await has_active_certificate(db_session, sample_user.id, 'physician')
        assert result is False

    @pytest.mark.asyncio
    async def test_returns_false_for_revoked_certificate(
        self, db_session: AsyncSession, sample_user: User, revoked_certificate: Certificate
    ) -> None:
        """Returns False when only revoked certificates exist."""
        result = await has_active_certificate(db_session, sample_user.id, 'trainer')
        assert result is False

    @pytest.mark.asyncio
    async def test_returns_false_for_expired_certificate(
        self, db_session: AsyncSession, sample_user: User, expired_certificate: Certificate
    ) -> None:
        """Returns False when only expired certificates exist."""
        result = await has_active_certificate(db_session, sample_user.id, 'chiropractor')
        assert result is False

    @pytest.mark.asyncio
    async def test_returns_false_for_different_track(
        self, db_session: AsyncSession, sample_user: User, sample_certificate: Certificate
    ) -> None:
        """Returns False when certificate exists for a different track."""
        # sample_certificate is for 'physician', querying 'chiropractor'
        result = await has_active_certificate(db_session, sample_user.id, 'chiropractor')
        assert result is False


class TestRevokeCertificate:
    """Tests for revoke_certificate()."""

    @pytest.mark.asyncio
    async def test_revokes_existing_certificate(
        self, db_session: AsyncSession, sample_user: User, sample_certificate: Certificate
    ) -> None:
        """Successfully revokes a certificate, setting revoked_at and reason."""
        result = await revoke_certificate(
            db_session, sample_certificate.certificate_uid, 'Policy violation'
        )
        assert result is not None
        assert result.revoked_at is not None
        assert result.revocation_reason == 'Policy violation'
        assert result.certificate_uid == sample_certificate.certificate_uid

    @pytest.mark.asyncio
    async def test_returns_none_for_unknown_uid(
        self, db_session: AsyncSession
    ) -> None:
        """Returns None when certificate UID is not found."""
        result = await revoke_certificate(db_session, 'BS-9999-NONEXIST', 'Test reason')
        assert result is None

    @pytest.mark.asyncio
    async def test_revoking_already_revoked_overwrites_timestamp(
        self, db_session: AsyncSession, sample_user: User, revoked_certificate: Certificate
    ) -> None:
        """Revoking an already-revoked certificate overwrites the timestamp and reason."""
        original_revoked_at = revoked_certificate.revoked_at
        result = await revoke_certificate(
            db_session, revoked_certificate.certificate_uid, 'New reason'
        )
        assert result is not None
        assert result.revocation_reason == 'New reason'
        assert result.revoked_at >= original_revoked_at


class TestVerifyCertificateUnknownTrack:
    """Test for verify_certificate() with unknown track fallback."""

    def test_unknown_track_falls_back_to_title_case(self) -> None:
        """Certificate with unknown track uses track.title() as track_title."""
        from unittest.mock import MagicMock
        cert = MagicMock(spec=Certificate)
        cert.revoked_at = None
        cert.expires_at = None
        cert.certificate_uid = 'BS-2026-CUSTOM'
        cert.recipient_name = 'Test User'
        cert.track = 'radiology'
        cert.issued_at = datetime(2026, 1, 1, tzinfo=timezone.utc)

        result = verify_certificate(cert)
        assert result.valid is True
        assert result.track_title == 'Radiology'
