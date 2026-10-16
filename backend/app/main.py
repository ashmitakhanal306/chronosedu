"""API LAYER entrypoint. Run: uvicorn app.main:app --reload"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import health, setup, timetable
from app.core.config import settings
from app.db.models import Base
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure tables are created on startup (e.g. for sqlite / local dev)
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(
    title="ChronosEdu API",
    version="0.1.0",
    description="Multi-tenant school timetable generator & management platform.",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(setup.router)
app.include_router(timetable.router)
