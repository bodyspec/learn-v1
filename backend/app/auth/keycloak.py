from functools import lru_cache
from typing import Any

import httpx
from jose import JWTError, jwt

from app.core.config import get_settings


class KeycloakAuth:
    """Keycloak authentication handler — validates JWTs via JWKS."""

    def __init__(self) -> None:
        self.settings = get_settings()
        self._public_keys: dict[str, Any] | None = None

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

            # Decode and validate the token.
            # Keycloak sets aud="account" by default; the requesting client
            # is identified by the azp (authorized party) claim instead.
            payload = jwt.decode(
                token,
                public_key,
                algorithms=['RS256'],
                options={
                    'verify_aud': False,
                    'verify_exp': True,
                },
            )

            # Verify the token was issued for our client
            azp = payload.get('azp')
            if azp != self.settings.keycloak_client_id:
                return None

            return payload
        except JWTError:
            return None


@lru_cache
def get_keycloak_auth() -> KeycloakAuth:
    return KeycloakAuth()
