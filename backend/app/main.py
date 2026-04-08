from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(title="AnalytIQ")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    return {"status": "ok", "app": "AnalytIQ"}


@app.get("/api/v1/health")
async def health():
    import sys
    return {"status": "ok", "python": sys.version}


# Vercel handler
handler = app
