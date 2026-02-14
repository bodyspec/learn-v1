import logging
import os
from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
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

    @app.get('/health')
    async def health_check() -> dict[str, str]:
        return {'status': 'healthy'}

    # Static files (frontend build) - served in production
    static_dir = Path(os.getenv('STATIC_FILES_DIR', '/app/static'))
    if static_dir.exists() and static_dir.is_dir():
        app.mount('/assets', StaticFiles(directory=static_dir / 'assets'), name='assets')

        @app.get('/')
        async def serve_frontend() -> FileResponse:
            return FileResponse(static_dir / 'index.html')

        @app.get('/{full_path:path}')
        async def catch_all(full_path: str) -> FileResponse:
            if full_path.startswith(('api/', 'docs', 'openapi.json', 'redoc', 'health')):
                return JSONResponse({'error': 'Not found'}, status_code=404)
            file_path = static_dir / full_path
            if file_path.is_file():
                return FileResponse(file_path)
            return FileResponse(static_dir / 'index.html')

    return app


app = create_app()
