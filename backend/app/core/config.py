import json
from typing import Any, Union
from pydantic import field_validator
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
    cors_origins: Union[list[str], str] = ["http://localhost:5173"]
    solver_time_limit_s: float = 30.0
    jwt_secret: str = "chronos-super-secret-jwt-key-for-saas-timetable"
    jwt_algorithm: str = "HS256"
    jwt_expiration_minutes: int = 60 * 24 * 7  # 7 days
    platform_token: str = "chronos-platform-dev-secret"

    model_config = {"env_prefix": "CHRONOS_"}

    @field_validator("cors_origins", mode="before")
    @classmethod
    def assemble_cors_origins(cls, v: Any) -> list[str]:
        if isinstance(v, str):
            v = v.strip()
            if not v:
                return ["*"]
            if (v.startswith('"') and v.endswith('"')) or (v.startswith("'") and v.endswith("'")):
                v = v[1:-1].strip()
            if v.startswith("[") and v.endswith("]"):
                try:
                    parsed = json.loads(v)
                    if isinstance(parsed, list):
                        return [str(item).strip() for item in parsed if item]
                except Exception:
                    pass
            return [origin.strip() for origin in v.split(",") if origin.strip()]
        elif isinstance(v, (list, tuple)):
            return [str(item).strip() for item in v if item]
        return ["*"]


settings = Settings()
