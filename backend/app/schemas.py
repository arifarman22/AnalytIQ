from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import List, Dict, Any, Optional
from datetime import datetime
import re


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)
    company: Optional[str] = Field(default="", max_length=200)

    @field_validator("password")
    @classmethod
    def password_strength(cls, v):
        if not re.search(r'[A-Z]', v):
            raise ValueError("Password must contain at least one uppercase letter")
        if not re.search(r'[a-z]', v):
            raise ValueError("Password must contain at least one lowercase letter")
        if not re.search(r'[0-9]', v):
            raise ValueError("Password must contain at least one digit")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=128)


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: "UserResponse"


class UserResponse(BaseModel):
    id: str
    email: str
    name: str
    company: str
    plan: str
    created_at: datetime

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: Optional[str] = Field(default=None, min_length=2, max_length=100)
    company: Optional[str] = Field(default=None, max_length=200)


class UploadResponse(BaseModel):
    dataset_id: str
    filename: str
    rows: int
    cols: int
    columns: List[str]
    file_size_bytes: int
    uploaded_at: datetime


class DatasetResponse(BaseModel):
    id: str
    filename: str
    rows: int
    cols: int
    columns: List[str]
    file_size_bytes: int
    created_at: datetime

    class Config:
        from_attributes = True


class AnalyzeRequest(BaseModel):
    dataset_id: str = Field(min_length=1, max_length=100)
    prompt: str = Field(min_length=3, max_length=2000)

    @field_validator("prompt")
    @classmethod
    def sanitize_prompt(cls, v):
        return v.strip()


class AnalysisResponse(BaseModel):
    id: str
    dataset_id: str
    prompt: str
    eda: Dict[str, Any]
    plots: List[Dict[str, Any]]
    insights: Dict[str, Any]
    created_at: datetime

    class Config:
        from_attributes = True


class AnalysisListItem(BaseModel):
    id: str
    dataset_id: str
    prompt: str
    created_at: datetime

    class Config:
        from_attributes = True


# Predictions
class PredictRequest(BaseModel):
    dataset_id: str = Field(min_length=1, max_length=100)
    target_column: Optional[str] = Field(default=None, max_length=200)


class PredictResponse(BaseModel):
    id: str
    dataset_id: str
    target_column: str
    task: str
    features_used: List[str]
    train_size: int
    test_size: int
    models: Dict[str, Any]
    best_model: str
    best_score: float
    feature_importance: Dict[str, float]
    sample_predictions: List[Dict[str, str]]
    classes: Optional[List[str]] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ErrorResponse(BaseModel):
    detail: str
