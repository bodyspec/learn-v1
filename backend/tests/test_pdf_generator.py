from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import pytest

from app.models.certificate import Certificate
from app.services.pdf_generator import generate_certificate_pdf


def _make_cert(**overrides) -> MagicMock:
    """Create a minimal mock Certificate for PDF tests."""
    cert = MagicMock(spec=Certificate)
    cert.track = overrides.get('track', 'physician')
    cert.recipient_name = overrides.get('recipient_name', 'Dr. Test User')
    cert.recipient_email = overrides.get('recipient_email', 'test@bodyspec.com')
    cert.certificate_uid = overrides.get('certificate_uid', 'BS-2026-TEST01')
    cert.issued_at = overrides.get('issued_at', datetime(2026, 1, 15, tzinfo=timezone.utc))
    cert.expires_at = overrides.get('expires_at', datetime(2028, 1, 15, tzinfo=timezone.utc))
    return cert


class TestGenerateCertificatePdf:
    """Tests for PDF certificate generation."""

    @patch('app.services.pdf_generator.HTML')
    def test_known_track_uses_track_info(self, mock_html_cls: MagicMock) -> None:
        """Known track (physician) uses TRACK_INFO title and description."""
        mock_html_cls.return_value.write_pdf.return_value = b'%PDF-fake'

        cert = _make_cert(track='physician')
        result = generate_certificate_pdf(cert)

        assert result == b'%PDF-fake'
        # Verify the HTML string was built with the physician track title
        call_args = mock_html_cls.call_args
        html_string = call_args[1]['string']
        assert 'Clinical Applications' in html_string
        assert 'Dr. Test User' in html_string
        assert 'BS-2026-TEST01' in html_string

    @patch('app.services.pdf_generator.HTML')
    def test_unknown_track_falls_back_to_title_case(self, mock_html_cls: MagicMock) -> None:
        """Unknown track falls back to track.title() and generic description."""
        mock_html_cls.return_value.write_pdf.return_value = b'%PDF-fake'

        cert = _make_cert(track='radiology')
        result = generate_certificate_pdf(cert)

        call_args = mock_html_cls.call_args
        html_string = call_args[1]['string']
        assert 'Radiology' in html_string

    @patch('app.services.pdf_generator.HTML')
    def test_no_expires_at(self, mock_html_cls: MagicMock) -> None:
        """Certificate with expires_at=None renders without expiration."""
        mock_html_cls.return_value.write_pdf.return_value = b'%PDF-fake'

        cert = _make_cert(expires_at=None)
        result = generate_certificate_pdf(cert)

        assert result == b'%PDF-fake'
        # Should not crash — expires_date template var should be None
        call_args = mock_html_cls.call_args
        html_string = call_args[1]['string']
        assert 'January 15, 2026' in html_string  # issued_date still there

    @patch('app.services.pdf_generator.HTML')
    @patch('app.services.pdf_generator.STATIC_DIR')
    def test_logo_missing(self, mock_static_dir: MagicMock, mock_html_cls: MagicMock) -> None:
        """Missing logo file passes empty string, no crash."""
        mock_html_cls.return_value.write_pdf.return_value = b'%PDF-fake'
        mock_logo = MagicMock()
        mock_logo.exists.return_value = False
        mock_static_dir.__truediv__ = MagicMock(return_value=mock_logo)

        cert = _make_cert()
        result = generate_certificate_pdf(cert)
        assert result == b'%PDF-fake'

    @patch('app.services.pdf_generator.HTML')
    def test_returns_non_empty_bytes(self, mock_html_cls: MagicMock) -> None:
        """Return value is non-empty bytes."""
        mock_html_cls.return_value.write_pdf.return_value = b'%PDF-1.4 content'

        cert = _make_cert()
        result = generate_certificate_pdf(cert)

        assert isinstance(result, bytes)
        assert len(result) > 0
