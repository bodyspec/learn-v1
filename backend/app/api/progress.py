from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.schemas.progress import ProgressResponse, SectionComplete, SectionProgressResponse
from app.services.progress_service import get_user_progress, mark_section_complete

router = APIRouter()


@router.get('', response_model=ProgressResponse)
async def get_progress(
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> ProgressResponse:
    """Get all progress for current user."""
    return await get_user_progress(db, current_user.id)


@router.post('/section', response_model=SectionProgressResponse, status_code=201)
async def complete_section(
    section: SectionComplete,
    current_user: Annotated[User, Depends(get_current_user)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> SectionProgressResponse:
    """Mark a section as complete."""
    progress = await mark_section_complete(
        db,
        current_user.id,
        section.module_id,
        section.section_slug,
    )
    return SectionProgressResponse(
        module_id=progress.module_id,
        section_slug=progress.section_slug,
        completed_at=progress.completed_at,
    )
