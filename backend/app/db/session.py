"""DATABASE ACCESS — the only module that opens DB connections.

Multi-tenancy: every request runs inside a transaction that sets
`app.current_school_id` when connected to PostgreSQL (enforcing database/schema.sql RLS).
"""
from __future__ import annotations

from contextlib import contextmanager
from typing import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

# Engine setup
connect_args = {}
if settings.database_url.startswith("sqlite"):
    connect_args["check_same_thread"] = False

engine = create_engine(
    settings.database_url,
    pool_pre_ping=True,
    connect_args=connect_args,
)

SessionLocal = sessionmaker(bind=engine, autoflush=False, expire_on_commit=False)


@contextmanager
def tenant_session(school_id: str) -> Generator[Session, None, None]:
    """Context manager for a database session scoped to a specific school tenant."""
    session: Session = SessionLocal()
    try:
        if session.bind and session.bind.dialect.name == "postgresql":
            session.execute(
                text("SELECT set_config('app.current_school_id', :sid, true)"),
                {"sid": str(school_id)},
            )
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def get_tenant_db(school_id: str) -> Generator[Session, None, None]:
    """FastAPI dependency for injecting tenant-scoped database sessions."""
    with tenant_session(school_id) as session:
        yield session
