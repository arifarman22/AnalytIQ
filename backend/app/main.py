import os
import io
import uuid
import pandas as pd
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

from app.schemas import UploadResponse, AnalysisResponse, AnalyzeRequest, ErrorResponse
from app.eda import generate_eda, generate_default_plots

app = FastAPI(
    title="Dataset Analysis API",
    description="API for uploading datasets and generating AI-powered insights",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DATA_DIR = "uploaded_datasets"
MAX_FILE_SIZE = 50 * 1024 * 1024
SUPPORTED_FILE_TYPES = ['.csv', '.xlsx', '.xls']
os.makedirs(DATA_DIR, exist_ok=True)


@app.post("/upload", response_model=UploadResponse,
          responses={400: {"model": ErrorResponse}, 413: {"model": ErrorResponse}})
async def upload_dataset(file: UploadFile = File(...)):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in SUPPORTED_FILE_TYPES:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Supported: {', '.join(SUPPORTED_FILE_TYPES)}")

    try:
        contents = await file.read()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error reading file: {str(e)}")

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail=f"File too large. Max {MAX_FILE_SIZE // (1024 * 1024)}MB")

    dataset_id = str(uuid.uuid4())
    save_path = os.path.join(DATA_DIR, f"{dataset_id}{file_ext}")

    try:
        with open(save_path, 'wb') as f:
            f.write(contents)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    try:
        df = pd.read_csv(io.BytesIO(contents)) if file_ext == '.csv' else pd.read_excel(io.BytesIO(contents))
    except Exception as e:
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


@app.post("/analyze", response_model=AnalysisResponse,
          responses={404: {"model": ErrorResponse}, 500: {"model": ErrorResponse}})
async def analyze(req: AnalyzeRequest):
    file_path = None
    for ext in SUPPORTED_FILE_TYPES:
        path = os.path.join(DATA_DIR, f"{req.dataset_id}{ext}")
        if os.path.exists(path):
            file_path = path
            break

    if not file_path:
        raise HTTPException(status_code=404, detail="Dataset not found")

    try:
        df = pd.read_csv(file_path) if file_path.endswith('.csv') else pd.read_excel(file_path)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")

    eda = generate_eda(df)
    plots = generate_default_plots(df, max_plots=4)

    insights = {"message": "Analysis complete. Configure OPENAI_API_KEY for AI-powered insights."}
    if os.getenv('OPENAI_API_KEY'):
        try:
            from app.openai_client import generate_insights_from_prompt
            insights = generate_insights_from_prompt(df, req.prompt, eda)
        except Exception as e:
            insights = {"error": f"AI insights unavailable: {str(e)}"}

    return {
        "dataset_id": req.dataset_id,
        "prompt": req.prompt,
        "eda": eda,
        "plots": plots,
        "insights": insights,
        "analysis_timestamp": datetime.now().isoformat()
    }


@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
