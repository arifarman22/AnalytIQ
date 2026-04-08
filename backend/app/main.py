from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from datetime import datetime, timezone

from app.core.config import settings

limiter = Limiter(key_func=get_remote_address)
startup_error = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global startup_error
    try:
        from app.core.database import init_db
        await init_db()
    except Exception as e:
        startup_error = str(e)
        print(f"[STARTUP ERROR] {e}")
    yield


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse(status_code=429, content={"detail": "Too many requests."})


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from app.api.auth import router as auth_router
from app.api.datasets import router as datasets_router
from app.api.analyses import router as analyses_router

app.include_router(auth_router, prefix="/api/v1")
app.include_router(datasets_router, prefix="/api/v1")
app.include_router(analyses_router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"status": "ok", "app": settings.APP_NAME}


@app.get("/api/v1/health")
async def health_check():
    return {
        "status": "healthy" if not startup_error else "degraded",
        "startup_error": startup_error,
        "db_configured": settings.DATABASE_URL != "postgresql+asyncpg://user:pass@host/dbname",
    }


handler = app
