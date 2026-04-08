import io
import pandas as pd
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.auth import get_current_user
from app.core.config import settings
from app.models.user import User
from app.models.dataset import Dataset, Analysis
from app.schemas import AnalyzeRequest, AnalysisResponse, AnalysisListItem
from app.eda import generate_eda, generate_default_plots
from typing import List

router = APIRouter(prefix="/analyses", tags=["Analyses"])


@router.post("/", response_model=AnalysisResponse, status_code=201)
async def run_analysis(
    req: AnalyzeRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(Dataset).where(Dataset.id == req.dataset_id, Dataset.owner_id == user.id))
    dataset = result.scalar_one_or_none()
    if not dataset:
        raise HTTPException(status_code=404, detail="Dataset not found")

    try:
        df = pd.read_csv(io.StringIO(dataset.file_content))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error loading dataset: {str(e)}")

    eda = generate_eda(df)
    plots = generate_default_plots(df, max_plots=settings.MAX_PLOTS)

    insights = {"message": "Analysis complete."}
    if settings.OPENAI_API_KEY:
        try:
            from app.openai_client import generate_insights_from_prompt
            insights = generate_insights_from_prompt(df, req.prompt, eda)
        except Exception as e:
            insights = {"message": "Analysis complete.", "ai_error": str(e)}

    analysis = Analysis(
        owner_id=user.id,
        dataset_id=dataset.id,
        prompt=req.prompt,
        eda=eda,
        plots=plots,
        insights=insights
    )
    db.add(analysis)
    await db.commit()
    await db.refresh(analysis)

    return AnalysisResponse(
        id=str(analysis.id), dataset_id=str(analysis.dataset_id),
        prompt=analysis.prompt, eda=analysis.eda, plots=analysis.plots,
        insights=analysis.insights, created_at=analysis.created_at
    )


@router.get("/", response_model=List[AnalysisListItem])
async def list_analyses(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(Analysis).where(Analysis.owner_id == user.id).order_by(Analysis.created_at.desc()).limit(50)
    )
    return [
        AnalysisListItem(id=str(a.id), dataset_id=str(a.dataset_id), prompt=a.prompt, created_at=a.created_at)
        for a in result.scalars().all()
    ]


@router.get("/{analysis_id}", response_model=AnalysisResponse)
async def get_analysis(analysis_id: str, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Analysis).where(Analysis.id == analysis_id, Analysis.owner_id == user.id))
    a = result.scalar_one_or_none()
    if not a:
        raise HTTPException(status_code=404, detail="Analysis not found")
    return AnalysisResponse(
        id=str(a.id), dataset_id=str(a.dataset_id), prompt=a.prompt,
        eda=a.eda, plots=a.plots, insights=a.insights, created_at=a.created_at
    )
