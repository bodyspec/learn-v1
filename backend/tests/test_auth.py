from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from fastapi import HTTPException

from app.auth.keycloak import KeycloakAuth


class TestKeycloakAuth:
    """Tests for Keycloak authentication handler."""

    def test_url_properties(self) -> None:
        """Keycloak URLs are built correctly from settings."""
        auth = KeycloakAuth()
        base = auth.settings.keycloak_url
        assert auth.auth_url == f'{base}/protocol/openid-connect/auth'
        assert auth.token_url == f'{base}/protocol/openid-connect/token'
        assert auth.logout_url == f'{base}/protocol/openid-connect/logout'
        assert auth.certs_url == f'{base}/protocol/openid-connect/certs'

    def test_get_authorization_url(self) -> None:
        """get_authorization_url builds correct URL with params."""
        auth = KeycloakAuth()
        url = auth.get_authorization_url('test-state')
        assert 'client_id=' in url
        assert 'redirect_uri=' in url
        assert 'response_type=code' in url
        assert 'scope=openid+email+profile' in url or 'scope=openid email profile' in url
        assert 'state=test-state' in url

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

    @pytest.mark.asyncio
    async def test_exchange_code_success(self) -> None:
        """exchange_code returns tokens on successful exchange."""
        auth = KeycloakAuth()
        mock_tokens = {
            'access_token': 'test-access-token',
            'refresh_token': 'test-refresh-token',
        }

        with patch('httpx.AsyncClient') as mock_client_cls:
            mock_client = AsyncMock()
            mock_response = MagicMock()
            mock_response.status_code = 200
            mock_response.json.return_value = mock_tokens
            mock_client.post.return_value = mock_response
            mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

            result = await auth.exchange_code('test-code')
            assert result == mock_tokens

    @pytest.mark.asyncio
    async def test_exchange_code_failure(self) -> None:
        """exchange_code returns None on HTTP error."""
        auth = KeycloakAuth()

        with patch('httpx.AsyncClient') as mock_client_cls:
            mock_client = AsyncMock()
            mock_response = MagicMock()
            mock_response.status_code = 400
            mock_client.post.return_value = mock_response
            mock_client_cls.return_value.__aenter__ = AsyncMock(return_value=mock_client)
            mock_client_cls.return_value.__aexit__ = AsyncMock(return_value=False)

            result = await auth.exchange_code('bad-code')
            assert result is None


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
