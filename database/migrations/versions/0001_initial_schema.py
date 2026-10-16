"""Initial schema migration

Revision ID: 0001_initial_schema
Revises:
Create Date: 2026-10-16

"""
from pathlib import Path
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

revision: str = "0001_initial_schema"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Read and execute database/schema.sql on PostgreSQL
    schema_path = Path(__file__).resolve().parents[2] / "schema.sql"
    if schema_path.exists():
        sql = schema_path.read_text(encoding="utf-8")
        # Split on non-procedure semicolons or execute via raw connection
        connection = op.get_bind()
        if connection.dialect.name == "postgresql":
            connection.exec_driver_sql(sql)
        else:
            from app.db.models import Base
            Base.metadata.create_all(bind=connection)


def downgrade() -> None:
    connection = op.get_bind()
    from app.db.models import Base
    Base.metadata.drop_all(bind=connection)
