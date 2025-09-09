import os
import io
import uuid
import pandas as pd
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional, Dict, Any
import base64
from datetime import datetime

from .schemas import UploadResponse, PlotResponse, AnalysisResponse, AnalyzeRequest, ErrorResponse
from .eda import generate_eda, generate_default_plots


# Initialize FastAPI app
app = FastAPI(
    title="Dataset Analysis API",
    description="API for uploading datasets and generating AI-powered insights",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
DATA_DIR = "uploaded_datasets"
MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
SUPPORTED_FILE_TYPES = ['.csv', '.xlsx', '.xls']

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Helper Functions
def validate_file_size(content: bytes) -> bool:
    """Validate that the file size is within limits"""
    return len(content) <= MAX_FILE_SIZE

# API Endpoints
@app.post("/upload", 
          response_model=UploadResponse, 
          responses={400: {"model": ErrorResponse}, 413: {"model": ErrorResponse}})
async def upload_dataset(file: UploadFile = File(...)):
    """
    Upload a dataset file (CSV or Excel format).
    
    - **file**: The dataset file to upload
    - Returns: Metadata about the uploaded dataset
    """
    # Validate file type
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in SUPPORTED_FILE_TYPES:
        raise HTTPException(
            status_code=400, 
            detail=f"Unsupported file type. Supported types: {', '.join(SUPPORTED_FILE_TYPES)}"
        )
    
    # Read file contents
    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")
    
    # Validate file size
    if not validate_file_size(contents):
        raise HTTPException(
            status_code=413, 
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE//(1024*1024)}MB"
        )
    
    # Generate unique dataset ID
    dataset_id = str(uuid.uuid4())
    save_path = os.path.join(DATA_DIR, f"{dataset_id}{file_ext}")
    
    # Save file
    try:
        with open(save_path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")
    
    # Read into pandas for metadata extraction
    try:
        if file_ext == '.csv':
            df = pd.read_csv(io.BytesIO(contents))
        else:
            df = pd.read_excel(io.BytesIO(contents))
    except Exception as e:
        # Clean up the saved file if reading fails
        os.remove(save_path)
        raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")
    
    return UploadResponse(
        dataset_id=dataset_id,
        filename=file.filename,
        rows=len(df),
        cols=len(df.columns),
        columns=list(df.columns),
        file_size_bytes=len(contents),
        uploaded_at=datetime.now().isoformat()
    )


@app.post("/analyze", 
          response_model=AnalysisResponse,
          responses={404: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def analyze(req: AnalyzeRequest):
    """
    Analyze a dataset and generate insights based on a prompt.
    
    - **dataset_id**: ID of the previously uploaded dataset
    - **prompt**: Analysis prompt or question about the data
    - Returns: EDA, visualizations, and AI-generated insights
    """
    # Try to find the dataset file
    csv_path = os.path.join(DATA_DIR, f"{req.dataset_id}.csv")
    xlsx_path = os.path.join(DATA_DIR, f"{req.dataset_id}.xlsx")
    xls_path = os.path.join(DATA_DIR, f"{req.dataset_id}.xls")
    
    file_path = None
    if os.path.exists(csv_path):
        file_path = csv_path
    elif os.path.exists(xlsx_path):
        file_path = xlsx_path
    elif os.path.exists(xls_path):
        file_path = xls_path
    else:
        raise HTTPException(status_code=404, detail="Dataset not found")
    
    # Load the dataset
    try:
        if file_path.endswith('.csv'):
            df = pd.read_csv(file_path)
        else:
            df = pd.read_excel(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")
    
    # Generate EDA
    eda = generate_eda(df)
    
    # Generate default visualizations
    plots = generate_default_plots(df, max_plots=4)
    
    # Generate insights using LLM
    try:
        from openai_client import generate_insights_from_prompt
        insights = generate_insights_from_prompt(df, req.prompt, eda)
    except ImportError:
        insights = {"error": "OpenAI client not configured."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating insights: {str(e)}")
    return {
        "dataset_id": req.dataset_id,
        "prompt": req.prompt,
        "eda": eda,
        "plots": plots,
        "insights": insights,
        "analysis_timestamp": datetime.now().isoformat()
    }


# Health check endpoint
@app.get("/health")
async def health_check():
    """Check if the API is running"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)