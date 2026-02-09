from fastapi import APIRouter

from app.api.admin import router as admin_router
from app.api.auth import router as auth_router
from app.api.certificates import router as certificates_router
from app.api.progress import router as progress_router
from app.api.quiz import router as quiz_router
from app.api.users import router as users_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix='/auth', tags=['auth'])
api_router.include_router(users_router, prefix='/users', tags=['users'])
api_router.include_router(progress_router, prefix='/progress', tags=['progress'])
api_router.include_router(quiz_router, prefix='/quiz', tags=['quiz'])
api_router.include_router(certificates_router, tags=['certificates'])
api_router.include_router(admin_router, prefix='/admin', tags=['admin'])
