from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from datetime import datetime, timezone
from app.core.database import get_db
from app.core.auth import hash_password, verify_password, create_access_token, get_current_user
from app.models.user import User
from app.schemas import SignupRequest, LoginRequest, TokenResponse, UserResponse, UserUpdate

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/signup", response_model=TokenResponse, status_code=201)
async def signup(req: SignupRequest, db: AsyncSession = Depends(get_db)):
    existing = await db.execute(select(User).where(User.email == req.email))
    if existing.scalar_one_or_none():
        raise HTTPException(status_code=409, detail="Email already registered")

    user = User(
        email=req.email,
        name=req.name,
        hashed_password=hash_password(req.password),
        company=req.company or ""
    )
    db.add(user)
    await db.commit()
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
async def login(req: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == req.email))
    user = result.scalar_one_or_none()
    if not user or not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    user.last_login = datetime.now(timezone.utc)
    await db.commit()

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
        user.name = req.name
    if req.company is not None:
        user.company = req.company
    await db.commit()
    await db.refresh(user)
    return UserResponse(
        id=str(user.id), email=user.email, name=user.name,
        company=user.company, plan=user.plan, created_at=user.created_at
    )
