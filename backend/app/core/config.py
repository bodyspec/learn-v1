from functools import lru_cache
from typing import Literal

from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file='../.env',
        env_file_encoding='utf-8',
        extra='ignore',
    )

    # API Configuration
    api_host: str = '0.0.0.0'
    api_port: int = 8000

    # Database
    database_url: str = 'postgresql://postgres:postgres@localhost:5432/learn'

    # Keycloak Authentication
    keycloak_url: str = 'https://keycloak.bodyspec.com/realms/bodyspec'
    keycloak_client_id: str = 'dexa-education'
    keycloak_client_secret: SecretStr = SecretStr('')
    keycloak_redirect_uri: str = 'http://localhost:8000/api/v1/auth/callback'

    # App Secret
    secret_key: SecretStr = SecretStr('dev-secret-key-change-in-production')

    # Environment
    environment: Literal['development', 'production'] = 'development'
    log_level: str = 'INFO'


@lru_cache
def get_settings() -> Settings:
    return Settings()
