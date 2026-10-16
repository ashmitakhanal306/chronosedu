"""Configuration (12-factor: everything from environment)."""
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://chronos:chronos@localhost:5432/chronos"
    cors_origins: list[str] = ["http://localhost:5173"]
    solver_time_limit_s: float = 30.0

    model_config = {"env_prefix": "CHRONOS_"}


settings = Settings()
