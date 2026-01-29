from pathlib import Path

from jinja2 import Environment, FileSystemLoader
from weasyprint import HTML

from app.models.certificate import Certificate
from app.services.certificate_service import TRACK_INFO

TEMPLATES_DIR = Path(__file__).parent.parent / 'templates'
STATIC_DIR = Path(__file__).parent.parent / 'static'


def generate_certificate_pdf(certificate: Certificate) -> bytes:
    """Generate PDF certificate from HTML template."""
    env = Environment(loader=FileSystemLoader(TEMPLATES_DIR))
    template = env.get_template('certificate.html')

    track_info = TRACK_INFO.get(certificate.track, {
        'title': certificate.track.title(),
        'description': 'body composition analysis',
    })

    logo_path = STATIC_DIR / 'logo.png'

    html_content = template.render(
        logo_path=str(logo_path) if logo_path.exists() else '',
        recipient_name=certificate.recipient_name,
        track_title=track_info['title'],
        track_description=track_info['description'],
        certificate_uid=certificate.certificate_uid,
        issued_date=certificate.issued_at.strftime('%B %d, %Y'),
        expires_date=certificate.expires_at.strftime('%B %d, %Y') if certificate.expires_at else None,
        expires_at=certificate.expires_at,
    )

    pdf_bytes = HTML(string=html_content).write_pdf()
    return pdf_bytes
