from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import get_settings

settings = get_settings()

# Convert postgresql:// to postgresql+asyncpg://
database_url = settings.database_url
if database_url.startswith('postgresql://'):
    database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://', 1)

engine = create_async_engine(
    database_url,
    echo=False,
    pool_pre_ping=True,
    pool_size=5,
    max_overflow=10,
)

async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


class Base(DeclarativeBase):
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        try:
            yield session
        finally:
            await session.close()


async def init_db() -> None:
    """Initialize database connection pool."""
    # Connection will be established on first use
    pass


async def close_db() -> None:
    """Close database connection pool."""
    await engine.dispose()
