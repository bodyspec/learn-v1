from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.schemas.user import UserUpdate


async def get_or_create_user(
    db: AsyncSession,
    keycloak_id: str,
    email: str,
    name: str | None = None,
) -> User:
    """Get existing user or create new one from Keycloak data."""
    result = await db.execute(
        select(User).where(User.keycloak_id == keycloak_id)
    )
    user = result.scalar_one_or_none()

    if user is None:
        user = User(
            keycloak_id=keycloak_id,
            email=email,
            name=name,
        )
        db.add(user)
        await db.commit()
        await db.refresh(user)
    else:
        # Update last login and email/name if changed
        user.last_login = datetime.now(timezone.utc)
        if email and user.email != email:
            user.email = email
        if name and user.name != name:
            user.name = name
        await db.commit()
        await db.refresh(user)

    return user


async def update_user(
    db: AsyncSession,
    user: User,
    update_data: UserUpdate,
) -> User:
    """Update user profile."""
    if update_data.name is not None:
        user.name = update_data.name
    if update_data.role_type is not None:
        user.role_type = update_data.role_type
    if update_data.organization is not None:
        user.organization = update_data.organization

    await db.commit()
    await db.refresh(user)
    return user
