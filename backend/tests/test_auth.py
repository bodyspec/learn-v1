from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi import HTTPException

from app.auth.keycloak import KeycloakAuth


class TestKeycloakAuth:
    """Tests for Keycloak authentication handler."""

    def test_certs_url(self) -> None:
        """Keycloak certs URL is built correctly from settings."""
        auth = KeycloakAuth()
        base = auth.settings.keycloak_url
        assert auth.certs_url == f'{base}/protocol/openid-connect/certs'

    @pytest.mark.asyncio
    async def test_validate_token_invalid(self) -> None:
        """validate_token returns None for invalid JWT."""
        auth = KeycloakAuth()
        auth._public_keys = {'keys': []}
        result = await auth.validate_token('invalid-token')
        assert result is None

    @pytest.mark.asyncio
    async def test_get_public_keys_caches(self) -> None:
        """get_public_keys caches the result after first fetch."""
        auth = KeycloakAuth()
        mock_keys = {'keys': [{'kid': 'test-key-id', 'kty': 'RSA'}]}

        with patch('httpx.AsyncClient') as mock_client_cls:
            mock_client = AsyncMock()
            mock_response = MagicMock()
            mock_response.json.return_value = mock_keys
            mock_response.raise_for_status = MagicMock()
            mock_client.get.return_value = mock_response
            mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

            keys1 = await auth.get_public_keys()
            keys2 = await auth.get_public_keys()

            assert keys1 == mock_keys
            assert keys2 == mock_keys
            # Only called once due to caching
            mock_client.get.assert_called_once()


class TestAuthDependencies:
    """Tests for auth dependency functions."""

    @pytest.mark.asyncio
    async def test_get_current_user_no_token(self) -> None:
        """get_current_user raises 401 when no token is provided."""
        from unittest.mock import AsyncMock
        from app.auth.dependencies import get_current_user

        with pytest.raises(HTTPException) as exc_info:
            await get_current_user(None, AsyncMock())
        assert exc_info.value.status_code == 401

    @pytest.mark.asyncio
    async def test_get_current_user_invalid_token(self) -> None:
        """get_current_user raises 401 when token validation fails."""
        from app.auth.dependencies import get_current_user

        with patch('app.auth.dependencies.get_keycloak_auth') as mock_kc:
            mock_auth = AsyncMock()
            mock_auth.validate_token.return_value = None
            mock_kc.return_value = mock_auth

            with pytest.raises(HTTPException) as exc_info:
                await get_current_user('bad-token', AsyncMock())
            assert exc_info.value.status_code == 401

    @pytest.mark.asyncio
    async def test_get_optional_user_no_token(self) -> None:
        """get_optional_user returns None when no token is provided."""
        from app.auth.dependencies import get_optional_user

        result = await get_optional_user(None, AsyncMock())
        assert result is None
