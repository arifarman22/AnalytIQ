from pydantic_settings import BaseSettings
from typing import List


class Settings(BaseSettings):
    APP_NAME: str = "AnalytIQ"
    APP_VERSION: str = "2.1.0"
    APP_DEBUG: bool = False

    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:pass@host/dbname"
    DB_POOL_SIZE: int = 5
    DB_MAX_OVERFLOW: int = 10
    DB_POOL_TIMEOUT: int = 30

    # JWT
    SECRET_KEY: str = "change-this-to-a-random-secret-key-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 8  # 8 hours

    # CORS
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # File handling
    MAX_FILE_SIZE: int = 50 * 1024 * 1024
    SUPPORTED_FILE_TYPES: List[str] = [".csv", ".xlsx", ".xls"]

    # OpenAI
    OPENAI_API_KEY: str = ""

    # Analysis
    MAX_PLOTS: int = 6
    MAX_ROWS_ANALYSIS: int = 100_000

    # Rate limiting
    RATE_LIMIT_AUTH: str = "5/minute"
    RATE_LIMIT_UPLOAD: str = "10/minute"
    RATE_LIMIT_ANALYSIS: str = "5/minute"

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
