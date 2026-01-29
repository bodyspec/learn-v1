from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.keycloak import get_keycloak_auth
from app.core.config import get_settings
from app.core.database import get_db
from app.models.user import User
from app.services.user_service import get_or_create_user

settings = get_settings()

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl=f'{settings.keycloak_url}/protocol/openid-connect/auth',
    tokenUrl=f'{settings.keycloak_url}/protocol/openid-connect/token',
    auto_error=False,
)


async def get_current_user(
    token: Annotated[str | None, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """Get current authenticated user. Raises 401 if not authenticated."""
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Not authenticated',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    keycloak = get_keycloak_auth()
    payload = await keycloak.validate_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token',
            headers={'WWW-Authenticate': 'Bearer'},
        )

    # Get or create user in our database
    user = await get_or_create_user(
        db,
        keycloak_id=payload['sub'],
        email=payload.get('email', ''),
        name=payload.get('name'),
    )

    return user


async def get_optional_user(
    token: Annotated[str | None, Depends(oauth2_scheme)],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User | None:
    """Get current user if authenticated, None otherwise."""
    if not token:
        return None

    try:
        return await get_current_user(token, db)
    except HTTPException:
        return None
