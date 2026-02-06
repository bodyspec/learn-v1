import uuid

import pytest
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import UserUpdate
from app.services.user_service import get_or_create_user, update_user


@pytest.mark.asyncio
async def test_create_new_user(db_session: AsyncSession) -> None:
    """get_or_create_user creates a new user when keycloak_id does not exist."""
    user = await get_or_create_user(
        db_session,
        keycloak_id='new-kc-id',
        email='new@bodyspec.com',
        name='New User',
    )
    assert user.keycloak_id == 'new-kc-id'
    assert user.email == 'new@bodyspec.com'
    assert user.name == 'New User'
    assert user.id is not None


@pytest.mark.asyncio
async def test_get_existing_user(db_session: AsyncSession, sample_user: User) -> None:
    """get_or_create_user returns existing user and updates last_login."""
    user = await get_or_create_user(
        db_session,
        keycloak_id=sample_user.keycloak_id,
        email=sample_user.email,
        name=sample_user.name,
    )
    assert user.id == sample_user.id
    assert user.last_login is not None


@pytest.mark.asyncio
async def test_get_or_create_updates_email_if_changed(
    db_session: AsyncSession, sample_user: User
) -> None:
    """get_or_create_user updates email when it changes in Keycloak."""
    new_email = 'updated@bodyspec.com'
    user = await get_or_create_user(
        db_session,
        keycloak_id=sample_user.keycloak_id,
        email=new_email,
        name=sample_user.name,
    )
    assert user.email == new_email


@pytest.mark.asyncio
async def test_get_or_create_updates_name_if_changed(
    db_session: AsyncSession, sample_user: User
) -> None:
    """get_or_create_user updates name when it changes in Keycloak."""
    user = await get_or_create_user(
        db_session,
        keycloak_id=sample_user.keycloak_id,
        email=sample_user.email,
        name='Updated Name',
    )
    assert user.name == 'Updated Name'


@pytest.mark.asyncio
async def test_get_or_create_does_not_overwrite_name_with_none(
    db_session: AsyncSession, sample_user: User
) -> None:
    """get_or_create_user does not clear name if Keycloak sends None."""
    user = await get_or_create_user(
        db_session,
        keycloak_id=sample_user.keycloak_id,
        email=sample_user.email,
        name=None,
    )
    assert user.name == sample_user.name


@pytest.mark.asyncio
async def test_update_user_name(db_session: AsyncSession, sample_user: User) -> None:
    """update_user updates the user name."""
    updated = await update_user(
        db_session,
        sample_user,
        UserUpdate(name='Dr. Smith'),
    )
    assert updated.name == 'Dr. Smith'
    assert updated.id == sample_user.id


@pytest.mark.asyncio
async def test_update_user_role_type(db_session: AsyncSession, sample_user: User) -> None:
    """update_user updates the role type."""
    updated = await update_user(
        db_session,
        sample_user,
        UserUpdate(role_type='trainer'),
    )
    assert updated.role_type == 'trainer'


@pytest.mark.asyncio
async def test_update_user_organization(db_session: AsyncSession, sample_user: User) -> None:
    """update_user updates the organization."""
    updated = await update_user(
        db_session,
        sample_user,
        UserUpdate(organization='New Clinic'),
    )
    assert updated.organization == 'New Clinic'


@pytest.mark.asyncio
async def test_update_user_partial(db_session: AsyncSession, sample_user: User) -> None:
    """update_user only changes provided fields, leaving others untouched."""
    original_name = sample_user.name
    updated = await update_user(
        db_session,
        sample_user,
        UserUpdate(organization='Partial Clinic'),
    )
    assert updated.organization == 'Partial Clinic'
    assert updated.name == original_name


@pytest.mark.asyncio
async def test_create_multiple_users(db_session: AsyncSession) -> None:
    """Creating multiple users with different keycloak_ids works."""
    user1 = await get_or_create_user(db_session, keycloak_id='kc-1', email='a@b.com')
    user2 = await get_or_create_user(db_session, keycloak_id='kc-2', email='c@d.com')
    assert user1.id != user2.id
    assert user1.keycloak_id != user2.keycloak_id
