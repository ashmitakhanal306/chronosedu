"""API LAYER entrypoint. Run: uvicorn app.main:app --reload"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, health, setup, timetable
from app.core.config import INSECURE_DEFAULT_JWT_SECRETS, settings
from app.db.models import Base
from app.db.session import engine


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Security requirement: Fail startup immediately if CHRONOS_JWT_SECRET is default or insecure
    if not settings.jwt_secret or settings.jwt_secret in INSECURE_DEFAULT_JWT_SECRETS:
        raise RuntimeError(
            "FATAL SECURITY FAILURE: CHRONOS_JWT_SECRET is unset or using an insecure default value! "
            "Server startup aborted. Set CHRONOS_JWT_SECRET in your environment to a secure random string."
        )

    # Ensure tables are created on startup (e.g. for sqlite / local dev)
    Base.metadata.create_all(bind=engine)

    # Seed demo school if database is empty
    from app.db.seed import seed_demo_school_if_empty
    seed_demo_school_if_empty()

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

app.include_router(auth.router)
app.include_router(health.router)
app.include_router(setup.router)
app.include_router(timetable.router)
