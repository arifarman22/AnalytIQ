from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    # App
    APP_NAME: str = "AnalytIQ"
    APP_VERSION: str = "2.0.0"
    APP_DEBUG: bool = False

    # Database - Neon PostgreSQL
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@host/dbname"

    # JWT Auth
    SECRET_KEY: str = "change-this-to-a-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24  # 24 hours

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # File handling
    MAX_FILE_SIZE: int = 50 * 1024 * 1024
    SUPPORTED_FILE_TYPES: List[str] = [".csv", ".xlsx", ".xls"]

    # OpenAI
    OPENAI_API_KEY: str = ""

    # Analysis
    MAX_PLOTS: int = 6

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
