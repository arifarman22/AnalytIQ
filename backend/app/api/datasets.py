import io
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.auth import get_current_user
from app.core.config import settings
from app.models.user import User
from app.models.dataset import Dataset
from app.schemas import UploadResponse, DatasetResponse
from typing import List

router = APIRouter(prefix="/datasets", tags=["Datasets"])


@router.post("/upload", response_model=UploadResponse, status_code=201)
async def upload_dataset(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    import os
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in settings.SUPPORTED_FILE_TYPES:
        raise HTTPException(status_code=400, detail=f"Unsupported file type. Supported: {', '.join(settings.SUPPORTED_FILE_TYPES)}")

    contents = await file.read()
    if len(contents) > settings.MAX_FILE_SIZE:
        raise HTTPException(status_code=413, detail=f"File too large. Max {settings.MAX_FILE_SIZE // (1024 * 1024)}MB")

    try:
        if file_ext == ".csv":
            df = pd.read_csv(io.BytesIO(contents))
            file_content = contents.decode("utf-8")
        else:
            df = pd.read_excel(io.BytesIO(contents))
            file_content = df.to_csv(index=False)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error parsing file: {str(e)}")

    dataset = Dataset(
        owner_id=user.id,
        filename=file.filename,
        rows=len(df),
        cols=len(df.columns),
        columns=list(df.columns),
        file_size_bytes=len(contents),
        file_content=file_content,
        file_type=file_ext
    )
    db.add(dataset)
    await db.commit()
    await db.refresh(dataset)

    return UploadResponse(
        dataset_id=str(dataset.id),
        filename=dataset.filename,
        rows=dataset.rows,
        cols=dataset.cols,
        columns=dataset.columns,
        file_size_bytes=dataset.file_size_bytes,
        uploaded_at=dataset.created_at
    )


@router.get("/", response_model=List[DatasetResponse])
async def list_datasets(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Dataset).where(Dataset.owner_id == user.id).order_by(Dataset.created_at.desc()).limit(50)
    )
    datasets = result.scalars().all()
    return [
        DatasetResponse(
            id=str(d.id), filename=d.filename, rows=d.rows, cols=d.cols,
            columns=d.columns, file_size_bytes=d.file_size_bytes, created_at=d.created_at
        ) for d in datasets
    ]


@router.get("/{dataset_id}", response_model=DatasetResponse)
async def get_dataset(dataset_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id, Dataset.owner_id == user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    return DatasetResponse(
        id=str(dataset.id), filename=dataset.filename, rows=dataset.rows, cols=dataset.cols,
        columns=dataset.columns, file_size_bytes=dataset.file_size_bytes, created_at=dataset.created_at
    )


@router.delete("/{dataset_id}", status_code=204)
async def delete_dataset(dataset_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Dataset).where(Dataset.id == dataset_id, Dataset.owner_id == user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")
    await db.delete(dataset)
    await db.commit()
