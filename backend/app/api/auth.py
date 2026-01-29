import secrets
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query, status
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.auth.dependencies import get_current_user
from app.auth.keycloak import get_keycloak_auth
from app.core.database import get_db
from app.models.user import User
from app.schemas.user import UserResponse
from app.services.user_service import get_or_create_user

router = APIRouter()


@router.get('/login')
async def login() -> RedirectResponse:
    """Redirect to Keycloak login page."""
    keycloak = get_keycloak_auth()
    state = secrets.token_urlsafe(32)
    # In production, store state in session for CSRF protection
    auth_url = keycloak.get_authorization_url(state)
    return RedirectResponse(url=auth_url)


@router.get('/callback')
async def callback(
    code: Annotated[str, Query()],
    state: Annotated[str, Query()],
    db: Annotated[AsyncSession, Depends(get_db)],
) -> dict[str, str]:
    """Handle Keycloak callback after authentication."""
    keycloak = get_keycloak_auth()

    # Exchange code for tokens
    tokens = await keycloak.exchange_code(code)
    if tokens is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Failed to exchange authorization code',
        )

    # Validate access token
    access_token = tokens.get('access_token')
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='No access token in response',
        )

    payload = await keycloak.validate_token(access_token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Invalid access token',
        )

    # Create or update user
    await get_or_create_user(
        db,
        keycloak_id=payload['sub'],
        email=payload.get('email', ''),
        name=payload.get('name'),
    )

    # Return tokens - frontend will store these
    return {
        'access_token': access_token,
        'refresh_token': tokens.get('refresh_token', ''),
        'token_type': 'bearer',
    }


@router.post('/logout')
async def logout() -> dict[str, str]:
    """Logout user."""
    # In production, you might want to revoke the token with Keycloak
    return {'status': 'logged out'}


@router.get('/me', response_model=UserResponse)
async def get_me(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    """Get current authenticated user."""
    return current_user
