import io
import logging
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.database import get_db
from app.core.auth import get_current_user
from app.core.config import settings
from app.models.user import User
from app.models.dataset import Dataset, Prediction
from app.schemas import PredictRequest, PredictResponse
from app.ml import run_prediction
from typing import List

router = APIRouter(prefix="/predictions", tags=["Predictions"])
limiter = Limiter(key_func=get_remote_address)
logger = logging.getLogger("analytiq")


@router.post("/", response_model=PredictResponse, status_code=201)
@limiter.limit("3/minute")
async def create_prediction(
    request: Request,
    req: PredictRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Dataset).where(Dataset.id == req.dataset_id, Dataset.owner_id == user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    try:
        df = pd.read_csv(io.StringIO(dataset.file_content))
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to load dataset")

    ml_result = run_prediction(df, req.target_column)

    if "error" in ml_result:
        raise HTTPException(status_code=400, detail=ml_result["error"])

    prediction = Prediction(
        owner_id=user.id,
        dataset_id=dataset.id,
        target_column=ml_result["target_column"],
        task=ml_result["task"],
        results=ml_result,
    )
    db.add(prediction)
    await db.flush()
    await db.refresh(prediction)

    return PredictResponse(
        id=str(prediction.id),
        dataset_id=str(prediction.dataset_id),
        created_at=prediction.created_at,
        **ml_result,
    )


@router.get("/", response_model=List[dict])
async def list_predictions(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Prediction).where(Prediction.owner_id == user.id).order_by(Prediction.created_at.desc()).limit(50)
    )
    return [
        {
            "id": str(p.id),
            "dataset_id": str(p.dataset_id),
            "target_column": p.target_column,
            "task": p.task,
            "best_model": p.results.get("best_model"),
            "best_score": p.results.get("best_score"),
            "created_at": p.created_at.isoformat(),
        }
        for p in result.scalars().all()
    ]


@router.get("/{prediction_id}")
async def get_prediction(prediction_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Prediction).where(Prediction.id == prediction_id, Prediction.owner_id == user.id))
    p = result.scalar_one_or_none()
    if not p:
        raise HTTPException(status_code=404, detail="Prediction not found")
    return {
        "id": str(p.id),
        "dataset_id": str(p.dataset_id),
        "target_column": p.target_column,
        "task": p.task,
        "results": p.results,
        "created_at": p.created_at.isoformat(),
    }
