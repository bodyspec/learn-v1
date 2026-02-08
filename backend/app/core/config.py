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
    database_host: str = 'localhost'
    database_port: int = 5432
    database_name: str = 'learn'
    database_user: str = 'postgres'
    database_pass: str = 'postgres'

    database_ssl: bool = False

    @property
    def database_url(self) -> str:
        url = (
            f'postgresql://{self.database_user}:{self.database_pass}'
            f'@{self.database_host}:{self.database_port}'
            f'/{self.database_name}'
        )
        if self.database_ssl:
            url += '?ssl=require'
        return url

    # Keycloak Authentication (PKCE — no client secret needed)
    keycloak_url: str = 'https://auth.bodyspec.com/realms/bodyspec'
    keycloak_client_id: str = 'bodyspec-learn-v1'

    # App Secret
    secret_key: SecretStr = SecretStr('dev-secret-key-change-in-production')

    # Environment
    environment: Literal['development', 'production'] = 'development'
    log_level: str = 'INFO'


@lru_cache
def get_settings() -> Settings:
    return Settings()
