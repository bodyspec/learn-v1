from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.certificate import (
    CertificateCreate,
    CertificateResponse,
    CertificatesListResponse,
    CertificateVerifyResponse,
)
from app.services.certificate_service import (
    create_certificate,
    get_certificate_by_uid,
    get_user_certificates,
    has_active_certificate,
    verify_certificate,
)
from app.services.pdf_generator import generate_certificate_pdf
from app.services.quiz_service import has_passed_quiz

router = APIRouter()

# Track requirements: which modules must be passed
TRACK_REQUIREMENTS = {
    'physician': ['core', 'physician'],
    'chiropractor': ['core', 'chiropractor'],
    'trainer': ['core', 'trainer'],
}


@router.get('/certificates', response_model=CertificatesListResponse)
async def list_certificates(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> CertificatesListResponse:
    """Get all certificates for current user."""
    certificates = await get_user_certificates(db, current_user.id)
    return CertificatesListResponse(certificates=certificates)


@router.post('/certificates', response_model=CertificateResponse, status_code=201)
async def request_certificate(
    request: CertificateCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> CertificateResponse:
    """Request certificate issuance for completed track."""
    required_modules = TRACK_REQUIREMENTS.get(request.track, [])

    # Check if user has passed all required quizzes
    missing_quizzes = []
    for module_id in required_modules:
        if not await has_passed_quiz(db, current_user.id, module_id):
            missing_quizzes.append(module_id)

    if missing_quizzes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={
                'error': 'certificate_requirements_not_met',
                'message': 'You must complete all required modules and pass all quizzes for this track.',
                'missing': {
                    'quizzes': missing_quizzes,
                },
            },
        )

    # Check for existing active certificate
    if await has_active_certificate(db, current_user.id, request.track):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail='An active certificate already exists for this track.',
        )

    # Get recipient name
    recipient_name = current_user.name or current_user.email

    # Create certificate
    certificate = await create_certificate(
        db,
        user_id=current_user.id,
        track=request.track,
        recipient_name=recipient_name,
        recipient_email=current_user.email,
    )

    return certificate


@router.get('/certificates/{certificate_uid}/pdf')
async def download_certificate_pdf(
    certificate_uid: str,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> Response:
    """Download certificate as PDF."""
    certificate = await get_certificate_by_uid(db, certificate_uid)

    if certificate is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='Certificate not found',
        )

    # Only allow owner to download
    if certificate.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail='Access denied',
        )

    pdf_bytes = generate_certificate_pdf(certificate)

    return Response(
        content=pdf_bytes,
        media_type='application/pdf',
        headers={
            'Content-Disposition': f'attachment; filename="certificate-{certificate_uid}.pdf"',
        },
    )


@router.get('/verify/{certificate_uid}', response_model=CertificateVerifyResponse)
async def verify_certificate_endpoint(
    certificate_uid: str,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> CertificateVerifyResponse:
    """Public endpoint - verify certificate validity."""
    certificate = await get_certificate_by_uid(db, certificate_uid)
    return verify_certificate(certificate)
