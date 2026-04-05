from pydantic import BaseModel, EmailStr, Field
from typing import List, Dict, Any, Optional
from datetime import datetime


# Auth
class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    company: Optional[str] = ""


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


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
    name: Optional[str] = None
    company: Optional[str] = None


# Datasets
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


# Analysis
class AnalyzeRequest(BaseModel):
    dataset_id: str
    prompt: str = Field(min_length=3, max_length=2000)


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


# Errors
class ErrorResponse(BaseModel):
    detail: str


class PlotResponse(BaseModel):
    name: str
    mime: str
    b64: str
