import time
from unittest.mock import AsyncMock, MagicMock, patch

import pytest
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives.serialization import Encoding, PublicFormat
from fastapi import HTTPException
from jose import jwt as jose_jwt

from app.auth.keycloak import KeycloakAuth

# Generate a test RSA key pair for JWT tests
_test_private_key = rsa.generate_private_key(public_exponent=65537, key_size=2048)
_test_public_key = _test_private_key.public_key()

# Build a JWKS-style key dict for jose
_test_public_numbers = _test_public_key.public_numbers()


def _int_to_base64url(n: int, length: int) -> str:
    """Convert an integer to base64url-encoded string."""
    import base64
    return base64.urlsafe_b64encode(n.to_bytes(length, 'big')).rstrip(b'=').decode()


_TEST_KID = 'test-key-id'
_TEST_JWK = {
    'kty': 'RSA',
    'kid': _TEST_KID,
    'use': 'sig',
    'n': _int_to_base64url(_test_public_numbers.n, 256),
    'e': _int_to_base64url(_test_public_numbers.e, 3),
}


def _make_test_token(
    kid: str = _TEST_KID,
    azp: str = 'bodyspec-learn-v1',
    exp_offset: int = 3600,
    **extra_claims,
) -> str:
    """Create a signed JWT for testing."""
    now = int(time.time())
    payload = {
        'sub': 'kc-test-user-123',
        'email': 'test@bodyspec.com',
        'name': 'Test User',
        'azp': azp,
        'iat': now,
        'exp': now + exp_offset,
        **extra_claims,
    }
    return jose_jwt.encode(
        payload,
        _test_private_key,
        algorithm='RS256',
        headers={'kid': kid},
    )


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

    @pytest.mark.asyncio
    async def test_validate_token_valid(self) -> None:
        """validate_token returns decoded payload for a valid JWT."""
        auth = KeycloakAuth()
        auth._public_keys = {'keys': [_TEST_JWK]}

        token = _make_test_token()
        result = await auth.validate_token(token)
        assert result is not None
        assert result['sub'] == 'kc-test-user-123'
        assert result['email'] == 'test@bodyspec.com'
        assert result['azp'] == 'bodyspec-learn-v1'

    @pytest.mark.asyncio
    async def test_validate_token_wrong_kid(self) -> None:
        """validate_token returns None when kid doesn't match any JWKS key."""
        auth = KeycloakAuth()
        auth._public_keys = {'keys': [_TEST_JWK]}

        token = _make_test_token(kid='wrong-kid')
        result = await auth.validate_token(token)
        assert result is None

    @pytest.mark.asyncio
    async def test_validate_token_wrong_azp(self) -> None:
        """validate_token returns None when azp doesn't match client_id."""
        auth = KeycloakAuth()
        auth._public_keys = {'keys': [_TEST_JWK]}

        token = _make_test_token(azp='wrong-client-id')
        result = await auth.validate_token(token)
        assert result is None

    @pytest.mark.asyncio
    async def test_validate_token_expired(self) -> None:
        """validate_token returns None for an expired token."""
        auth = KeycloakAuth()
        auth._public_keys = {'keys': [_TEST_JWK]}

        token = _make_test_token(exp_offset=-3600)
        result = await auth.validate_token(token)
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
    async def test_get_current_user_valid_token(self) -> None:
        """get_current_user returns user when token is valid."""
        from unittest.mock import ANY
        from app.auth.dependencies import get_current_user

        mock_user = MagicMock()
        mock_user.email = 'test@bodyspec.com'

        with patch('app.auth.dependencies.get_keycloak_auth') as mock_kc, \
             patch('app.auth.dependencies.get_or_create_user', new_callable=AsyncMock) as mock_create:
            mock_auth = AsyncMock()
            mock_auth.validate_token.return_value = {
                'sub': 'kc-123',
                'email': 'test@bodyspec.com',
                'name': 'Test User',
            }
            mock_kc.return_value = mock_auth
            mock_create.return_value = mock_user

            result = await get_current_user('valid-token', AsyncMock())
            assert result == mock_user
            mock_create.assert_called_once_with(
                ANY,
                keycloak_id='kc-123',
                email='test@bodyspec.com',
                name='Test User',
            )

    @pytest.mark.asyncio
    async def test_get_current_user_missing_email_defaults_to_empty(self) -> None:
        """get_current_user defaults email to empty string when missing from payload."""
        from app.auth.dependencies import get_current_user

        mock_user = MagicMock()

        with patch('app.auth.dependencies.get_keycloak_auth') as mock_kc, \
             patch('app.auth.dependencies.get_or_create_user', new_callable=AsyncMock) as mock_create:
            mock_auth = AsyncMock()
            mock_auth.validate_token.return_value = {
                'sub': 'kc-123',
                # no 'email' key
            }
            mock_kc.return_value = mock_auth
            mock_create.return_value = mock_user

            mock_db = AsyncMock()
            await get_current_user('valid-token', mock_db)
            mock_create.assert_called_once_with(
                mock_db,
                keycloak_id='kc-123',
                email='',
                name=None,
            )

    @pytest.mark.asyncio
    async def test_get_optional_user_no_token(self) -> None:
        """get_optional_user returns None when no token is provided."""
        from app.auth.dependencies import get_optional_user

        result = await get_optional_user(None, AsyncMock())
        assert result is None

    @pytest.mark.asyncio
    async def test_get_optional_user_valid_token(self) -> None:
        """get_optional_user returns user when token is valid."""
        from app.auth.dependencies import get_optional_user

        mock_user = MagicMock()

        with patch('app.auth.dependencies.get_keycloak_auth') as mock_kc, \
             patch('app.auth.dependencies.get_or_create_user', new_callable=AsyncMock) as mock_create:
            mock_auth = AsyncMock()
            mock_auth.validate_token.return_value = {
                'sub': 'kc-123',
                'email': 'test@bodyspec.com',
                'name': 'Test User',
            }
            mock_kc.return_value = mock_auth
            mock_create.return_value = mock_user

            result = await get_optional_user('valid-token', AsyncMock())
            assert result == mock_user

    @pytest.mark.asyncio
    async def test_get_optional_user_invalid_token_returns_none(self) -> None:
        """get_optional_user returns None when token is invalid."""
        from app.auth.dependencies import get_optional_user

        with patch('app.auth.dependencies.get_keycloak_auth') as mock_kc:
            mock_auth = AsyncMock()
            mock_auth.validate_token.return_value = None
            mock_kc.return_value = mock_auth

            result = await get_optional_user('bad-token', AsyncMock())
            assert result is None
