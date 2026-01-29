from functools import lru_cache
from typing import Any

import httpx
from jose import JWTError, jwt

from app.core.config import get_settings


class KeycloakAuth:
    """Keycloak authentication handler."""

    def __init__(self) -> None:
        self.settings = get_settings()
        self._public_keys: dict[str, Any] | None = None

    @property
    def auth_url(self) -> str:
        return f'{self.settings.keycloak_url}/protocol/openid-connect/auth'

    @property
    def token_url(self) -> str:
        return f'{self.settings.keycloak_url}/protocol/openid-connect/token'

    @property
    def logout_url(self) -> str:
        return f'{self.settings.keycloak_url}/protocol/openid-connect/logout'

    @property
    def certs_url(self) -> str:
        return f'{self.settings.keycloak_url}/protocol/openid-connect/certs'

    async def get_public_keys(self) -> dict[str, Any]:
        """Fetch and cache Keycloak public keys for JWT validation."""
        if self._public_keys is None:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.certs_url)
                response.raise_for_status()
                self._public_keys = response.json()
        return self._public_keys

    async def validate_token(self, token: str) -> dict[str, Any] | None:
        """
        Validate JWT token and return payload if valid.

        Returns None if token is invalid.
        """
        try:
            jwks = await self.get_public_keys()

            # Get the key ID from the token header
            unverified_header = jwt.get_unverified_header(token)
            kid = unverified_header.get('kid')

            # Find the matching key
            public_key = None
            for key in jwks.get('keys', []):
                if key.get('kid') == kid:
                    public_key = key
                    break

            if public_key is None:
                return None

            # Decode and validate the token
            payload = jwt.decode(
                token,
                public_key,
                algorithms=['RS256'],
                audience=self.settings.keycloak_client_id,
                options={
                    'verify_aud': True,
                    'verify_exp': True,
                },
            )
            return payload
        except JWTError:
            return None

    async def exchange_code(self, code: str) -> dict[str, Any] | None:
        """Exchange authorization code for tokens."""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                self.token_url,
                data={
                    'grant_type': 'authorization_code',
                    'client_id': self.settings.keycloak_client_id,
                    'client_secret': self.settings.keycloak_client_secret.get_secret_value(),
                    'code': code,
                    'redirect_uri': self.settings.keycloak_redirect_uri,
                },
            )
            if response.status_code != 200:
                return None
            return response.json()

    def get_authorization_url(self, state: str) -> str:
        """Generate Keycloak authorization URL."""
        params = {
            'client_id': self.settings.keycloak_client_id,
            'redirect_uri': self.settings.keycloak_redirect_uri,
            'response_type': 'code',
            'scope': 'openid email profile',
            'state': state,
        }
        query = '&'.join(f'{k}={v}' for k, v in params.items())
        return f'{self.auth_url}?{query}'


@lru_cache
def get_keycloak_auth() -> KeycloakAuth:
    return KeycloakAuth()
