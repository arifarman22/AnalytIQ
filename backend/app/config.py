from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API settings
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    LOG_LEVEL: str = "INFO"
    
    # File handling
    DATA_DIR: str = "uploaded_datasets"
    MAX_FILE_SIZE: int = 50 * 1024 * 1024  # 50MB
    SUPPORTED_FILE_TYPES: List[str] = ['.csv', '.xlsx', '.xls']
    
    # CORS
    ALLOWED_ORIGINS: List[str] = ["*"]
    
    # Analysis settings
    MAX_PLOTS: int = 6
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()