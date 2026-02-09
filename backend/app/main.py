import logging
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.router import api_router
from app.core.config import get_settings
from app.core.database import close_db, init_db

settings = get_settings()


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """Application lifespan manager."""
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()


def _configure_logging() -> None:
    """Quiet down noisy third-party loggers."""
    for name in ('sqlalchemy.engine', 'uvicorn.access', 'alembic'):
        logging.getLogger(name).setLevel(logging.WARNING)


def create_app() -> FastAPI:
    _configure_logging()

    app = FastAPI(
        title='BodySpec Learn',
        description='DEXA Education Platform API',
        version='1.0.0',
        lifespan=lifespan,
        docs_url='/docs' if settings.environment == 'development' else None,
        redoc_url='/redoc' if settings.environment == 'development' else None,
    )

    # CORS middleware
    app.add_middleware(
        CORSMiddleware,
        allow_origins=['http://localhost:5173'] if settings.environment == 'development' else [],
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    # API routes
    app.include_router(api_router, prefix='/api/v1')

    # Static files (frontend build) - served in production
    try:
        app.mount('/static', StaticFiles(directory='static'), name='static')
    except RuntimeError:
        # Static directory doesn't exist in development
        pass

    @app.get('/health')
    async def health_check() -> dict[str, str]:
        return {'status': 'healthy'}

    return app


app = create_app()
