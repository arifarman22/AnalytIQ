import re
import html
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.database import get_db
from app.core.auth import hash_password, verify_password, create_access_token, get_current_user
from app.core.config import settings
from app.models.user import User
from app.schemas import SignupRequest, LoginRequest, TokenResponse, UserResponse, UserUpdate

router = APIRouter(prefix="/auth", tags=["Authentication"])
limiter = Limiter(key_func=get_remote_address)


def sanitize(text: str) -> str:
    return html.escape(text.strip()) if text else ""


@router.post("/signup", response_model=TokenResponse, status_code=201)
@limiter.limit(settings.RATE_LIMIT_AUTH)
async def signup(request: Request, req: SignupRequest, db: AsyncSession = Depends(get_db)):
    name = sanitize(req.name)
    if not re.match(r'^[a-zA-Z0-9\s\-\.]+$', name):
        raise HTTPException(status_code=400, detail="Name contains invalid characters")

    existing = await db.execute(select(User).where(User.email == req.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        email=req.email.lower().strip(),
        name=name,
        hashed_password=hash_password(req.password),
        company=sanitize(req.company) if req.company else ""
    )
    db.add(user)
    await db.flush()
    await db.refresh(user)

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=str(user.id), email=user.email, name=user.name,
            company=user.company, plan=user.plan, created_at=user.created_at
        )
    )


@router.post("/login", response_model=TokenResponse)
@limiter.limit(settings.RATE_LIMIT_AUTH)
async def login(request: Request, req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email.lower().strip()))
    user = result.scalar_one_or_none()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    if not user.is_active:
        raise HTTPException(status_code=403, detail="Account deactivated")

    user.last_login = datetime.now(timezone.utc)
    await db.flush()

    token = create_access_token({"sub": str(user.id)})
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=str(user.id), email=user.email, name=user.name,
            company=user.company, plan=user.plan, created_at=user.created_at
        )
    )


@router.get("/me", response_model=UserResponse)
async def get_me(user: User = Depends(get_current_user)):
    return UserResponse(
        id=str(user.id), email=user.email, name=user.name,
        company=user.company, plan=user.plan, created_at=user.created_at
    )


@router.patch("/me", response_model=UserResponse)
async def update_me(req: UserUpdate, user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    if req.name is not None:
        name = sanitize(req.name)
        if not re.match(r'^[a-zA-Z0-9\s\-\.]+$', name):
            raise HTTPException(status_code=400, detail="Name contains invalid characters")
        user.name = name
    if req.company is not None:
        user.company = sanitize(req.company)
    await db.flush()
    await db.refresh(user)
    return UserResponse(
        id=str(user.id), email=user.email, name=user.name,
        company=user.company, plan=user.plan, created_at=user.created_at
    )
