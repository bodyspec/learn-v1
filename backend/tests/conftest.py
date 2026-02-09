import uuid
from collections.abc import AsyncGenerator
from datetime import datetime, timezone

import pytest
from fastapi import FastAPI
from httpx import ASGITransport, AsyncClient
from sqlalchemy import event
from sqlalchemy.dialects.sqlite.base import SQLiteTypeCompiler
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.core.database import Base, get_db
from app.models.certificate import Certificate
from app.models.progress import SectionProgress
from app.models.quiz import QuizAttempt
from app.models.user import User

# Teach SQLite how to compile PostgreSQL-specific types
SQLiteTypeCompiler.visit_JSONB = lambda self, type_, **kw: 'JSON'
SQLiteTypeCompiler.visit_UUID = lambda self, type_, **kw: 'VARCHAR(36)'

# Use an in-memory SQLite database for tests
TEST_DATABASE_URL = 'sqlite+aiosqlite:///:memory:'

engine = create_async_engine(TEST_DATABASE_URL, echo=False)

# Enable foreign key enforcement for SQLite


@event.listens_for(engine.sync_engine, 'connect')
def set_sqlite_pragma(dbapi_conn, connection_record):
    cursor = dbapi_conn.cursor()
    cursor.execute('PRAGMA foreign_keys=ON')
    cursor.close()


TestingSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


@pytest.fixture(autouse=True)
async def setup_database() -> AsyncGenerator[None, None]:
    """Create tables before each test and drop them after."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture
async def db_session() -> AsyncGenerator[AsyncSession, None]:
    """Get an async database session for tests."""
    async with TestingSessionLocal() as session:
        yield session


@pytest.fixture
def sample_user_id() -> uuid.UUID:
    return uuid.uuid4()


@pytest.fixture
async def sample_user(db_session: AsyncSession, sample_user_id: uuid.UUID) -> User:
    """Create a sample user for testing."""
    user = User(
        id=sample_user_id,
        keycloak_id='kc-test-user-123',
        email='testuser@bodyspec.com',
        name='Test User',
        role_type='physician',
        organization='Test Clinic',
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def second_user(db_session: AsyncSession) -> User:
    """Create a second user for ownership tests."""
    user = User(
        id=uuid.uuid4(),
        keycloak_id='kc-test-user-456',
        email='other@bodyspec.com',
        name='Other User',
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)
    return user


@pytest.fixture
async def sample_section_progress(
    db_session: AsyncSession, sample_user: User
) -> SectionProgress:
    """Create a sample section progress record."""
    progress = SectionProgress(
        user_id=sample_user.id,
        module_id='core',
        section_slug='01-how-dexa-works',
    )
    db_session.add(progress)
    await db_session.commit()
    await db_session.refresh(progress)
    return progress


@pytest.fixture
async def sample_quiz_attempt(
    db_session: AsyncSession, sample_user: User
) -> QuizAttempt:
    """Create a sample passing quiz attempt."""
    attempt = QuizAttempt(
        user_id=sample_user.id,
        module_id='core',
        score=90,
        passed=True,
        answers={'core-q1': 1, 'core-q2': 1},
        time_spent_seconds=120,
    )
    db_session.add(attempt)
    await db_session.commit()
    await db_session.refresh(attempt)
    return attempt


@pytest.fixture
async def sample_failed_quiz_attempt(
    db_session: AsyncSession, sample_user: User
) -> QuizAttempt:
    """Create a sample failing quiz attempt."""
    attempt = QuizAttempt(
        user_id=sample_user.id,
        module_id='core',
        score=50,
        passed=False,
        answers={'core-q1': 0, 'core-q2': 3},
        time_spent_seconds=60,
    )
    db_session.add(attempt)
    await db_session.commit()
    await db_session.refresh(attempt)
    return attempt


@pytest.fixture
async def sample_certificate(
    db_session: AsyncSession, sample_user: User
) -> Certificate:
    """Create a sample certificate."""
    cert = Certificate(
        user_id=sample_user.id,
        track='physician',
        certificate_uid='BS-2024-ABC123',
        recipient_name='Test User',
        recipient_email='testuser@bodyspec.com',
    )
    db_session.add(cert)
    await db_session.commit()
    await db_session.refresh(cert)
    return cert


@pytest.fixture
async def revoked_certificate(
    db_session: AsyncSession, sample_user: User
) -> Certificate:
    """Create a revoked certificate."""
    cert = Certificate(
        user_id=sample_user.id,
        track='trainer',
        certificate_uid='BS-2024-REVOKED',
        recipient_name='Test User',
        recipient_email='testuser@bodyspec.com',
        revoked_at=datetime.now(timezone.utc),
        revocation_reason='Academic dishonesty',
    )
    db_session.add(cert)
    await db_session.commit()
    await db_session.refresh(cert)
    return cert


@pytest.fixture
async def expired_certificate(
    db_session: AsyncSession, sample_user: User
) -> Certificate:
    """Create an expired certificate."""
    cert = Certificate(
        user_id=sample_user.id,
        track='chiropractor',
        certificate_uid='BS-2023-EXPIRED',
        recipient_name='Test User',
        recipient_email='testuser@bodyspec.com',
        expires_at=datetime(2023, 1, 1),
    )
    db_session.add(cert)
    await db_session.commit()
    await db_session.refresh(cert)
    return cert


# --- Fixtures for API integration tests ---

def _mock_current_user(user: User):
    """Create a dependency override that returns a specific user."""
    async def override():
        return user
    return override


@pytest.fixture
async def app(sample_user: User, db_session: AsyncSession) -> FastAPI:
    """Create a FastAPI app with overridden dependencies for testing."""
    from app.auth.dependencies import get_current_user
    from app.main import create_app

    app = create_app()

    # Override database dependency
    async def override_get_db() -> AsyncGenerator[AsyncSession, None]:
        yield db_session

    # Override auth dependency
    app.dependency_overrides[get_db] = override_get_db
    app.dependency_overrides[get_current_user] = _mock_current_user(sample_user)

    return app


@pytest.fixture
async def client(app: FastAPI) -> AsyncGenerator[AsyncClient, None]:
    """Create an async HTTP client for API testing."""
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url='http://test') as ac:
        yield ac
