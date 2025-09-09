from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
from datetime import datetime

class ErrorResponse(BaseModel):
    detail: str
    error_type: str
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())

class UploadResponse(BaseModel):
    dataset_id: str
    filename: str
    rows: int
    cols: int
    columns: List[str]
    file_size_bytes: int
    uploaded_at: str

class AnalyzeRequest(BaseModel):
    dataset_id: str
    prompt: str

class PlotResponse(BaseModel):
    name: str
    mime: str
    b64: str

class AnalysisResponse(BaseModel):
    dataset_id: str
    prompt: str
    eda: Dict[str, Any]
    plots: List[PlotResponse]
    insights: Dict[str, Any]
    analysis_timestamp: str

class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str

class DatasetMetadataResponse(BaseModel):
    dataset_id: str
    filename: str
    rows: int
    cols: int
    columns: List[str]
    file_size_bytes: int
    uploaded_at: str
    file_path: str

class DeleteResponse(BaseModel):
    dataset_id: str
    deleted: bool
    deleted_at: str