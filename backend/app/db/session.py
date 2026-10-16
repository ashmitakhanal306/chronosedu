"""DATABASE ACCESS — the only module that opens DB connections.

Multi-tenancy: every request runs inside a transaction that first sets
`app.current_school_id`, which the Row-Level Security policies in database/schema.sql enforce.
"""
from collections.abc import Iterator

from sqlalchemy import create_engine, text
from sqlalchemy.orm import Session, sessionmaker

from app.core.config import settings

engine = create_engine(settings.database_url, pool_pre_ping=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False)


def tenant_session(school_id: str) -> Iterator[Session]:
    with SessionLocal() as session, session.begin():
        session.execute(text("SELECT set_config('app.current_school_id', :sid, true)"), {"sid": school_id})
        yield session
