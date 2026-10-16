"""Configuration (12-factor: everything from environment)."""
from pydantic_settings import BaseSettings


INSECURE_DEFAULT_JWT_SECRETS: set[str] = {
    "chronos-super-secret-jwt-key-for-saas-timetable",
    "chronos-super-secret-jwt-key-change-in-production",
    "secret",
    "changeme",
    "default",
}


class Settings(BaseSettings):
    database_url: str = "postgresql+psycopg://chronos_app@localhost:5432/chronos"
    cors_origins: list[str] = ["http://localhost:5173"]
    solver_time_limit_s: float = 30.0
    jwt_secret: str = "chronos-super-secret-jwt-key-for-saas-timetable"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60 * 24 * 7  # 7 days

    model_config = {"env_prefix": "CHRONOS_"}


settings = Settings()
