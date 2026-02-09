import uuid

from fastapi import HTTPException, status
from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.certificate import Certificate
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User
from app.schemas.admin import (
    AdminUserDetail,
    AdminUserListResponse,
    AdminUserSummary,
    CertificateDetail,
    ModuleProgressDetail,
    QuizAttemptDetail,
)


async def list_users(
    db: AsyncSession,
    page: int = 1,
    per_page: int = 25,
    search: str | None = None,
) -> AdminUserListResponse:
    """List users with progress summary counts."""
    # Base query
    query = select(User)

    if search:
        pattern = f'%{search}%'
        query = query.where(
            User.name.ilike(pattern) | User.email.ilike(pattern)
        )

    # Count total
    count_query = select(func.count()).select_from(query.subquery())
    total = (await db.execute(count_query)).scalar() or 0

    # Paginate
    query = query.order_by(User.created_at.desc())
    query = query.offset((page - 1) * per_page).limit(per_page)

    result = await db.execute(query)
    users = result.scalars().all()

    # Get progress counts for each user
    summaries = []
    for user in users:
        sections_count = (await db.execute(
            select(func.count()).where(SectionProgress.user_id == user.id)
        )).scalar() or 0

        quizzes_count = (await db.execute(
            select(func.count()).where(
                QuizAttempt.user_id == user.id,
                QuizAttempt.passed.is_(True),
            )
        )).scalar() or 0

        certs_count = (await db.execute(
            select(func.count()).where(
                Certificate.user_id == user.id,
                Certificate.revoked_at.is_(None),
            )
        )).scalar() or 0

        summaries.append(AdminUserSummary(
            id=user.id,
            email=user.email,
            name=user.name,
            role_type=user.role_type,
            is_admin=user.is_admin,
            last_login=user.last_login,
            created_at=user.created_at,
            sections_completed=sections_count,
            quizzes_passed=quizzes_count,
            certificates_count=certs_count,
        ))

    return AdminUserListResponse(
        users=summaries,
        total=total,
        page=page,
        per_page=per_page,
    )


async def get_user_detail(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> AdminUserDetail:
    """Get detailed user info including progress, quizzes, and certificates."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )

    # Sections by module
    sections_result = await db.execute(
        select(
            SectionProgress.module_id,
            func.count().label('count'),
        )
        .where(SectionProgress.user_id == user_id)
        .group_by(SectionProgress.module_id)
    )
    module_progress = [
        ModuleProgressDetail(module_id=row.module_id, sections_completed=row.count)
        for row in sections_result
    ]

    # Quiz attempts
    quiz_result = await db.execute(
        select(QuizAttempt)
        .where(QuizAttempt.user_id == user_id)
        .order_by(QuizAttempt.attempted_at.desc())
    )
    quiz_attempts = [
        QuizAttemptDetail(
            id=qa.id,
            module_id=qa.module_id,
            score=qa.score,
            passed=qa.passed,
            attempted_at=qa.attempted_at,
        )
        for qa in quiz_result.scalars()
    ]

    # Certificates
    cert_result = await db.execute(
        select(Certificate)
        .where(Certificate.user_id == user_id, Certificate.revoked_at.is_(None))
        .order_by(Certificate.issued_at.desc())
    )
    certificates = [
        CertificateDetail(
            id=c.id,
            track=c.track,
            certificate_uid=c.certificate_uid,
            issued_at=c.issued_at,
        )
        for c in cert_result.scalars()
    ]

    # Summary counts
    sections_count = sum(mp.sections_completed for mp in module_progress)
    quizzes_count = sum(1 for qa in quiz_attempts if qa.passed)
    certs_count = len(certificates)

    return AdminUserDetail(
        id=user.id,
        email=user.email,
        name=user.name,
        role_type=user.role_type,
        is_admin=user.is_admin,
        last_login=user.last_login,
        created_at=user.created_at,
        sections_completed=sections_count,
        quizzes_passed=quizzes_count,
        certificates_count=certs_count,
        module_progress=module_progress,
        quiz_attempts=quiz_attempts,
        certificates=certificates,
    )


async def promote_user(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> User:
    """Promote a user to admin. Only @bodyspec.com emails allowed."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )

    if not user.email.endswith('@bodyspec.com'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Only @bodyspec.com users can be promoted',
        )

    user.is_admin = True
    await db.commit()
    await db.refresh(user)
    return user


async def demote_user(
    db: AsyncSession,
    user_id: uuid.UUID,
    current_user_id: uuid.UUID,
) -> User:
    """Demote an admin user. Cannot self-demote."""
    if user_id == current_user_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Cannot demote yourself',
        )

    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )

    user.is_admin = False
    await db.commit()
    await db.refresh(user)
    return user


async def delete_user(
    db: AsyncSession,
    user_id: uuid.UUID,
) -> None:
    """Delete a non-admin user and all their data."""
    user = await db.get(User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found',
        )

    if user.is_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Cannot delete an admin user',
        )

    await db.delete(user)
    await db.commit()
