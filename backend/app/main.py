"""API LAYER entrypoint. Run: uvicorn app.main:app --reload"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, timetable
from app.core.config import settings

app = FastAPI(title="ChronosEdu API", version="0.1.0")
app.add_middleware(CORSMiddleware, allow_origins=settings.cors_origins, allow_methods=["*"], allow_headers=["*"])
app.include_router(health.router)
app.include_router(timetable.router)
