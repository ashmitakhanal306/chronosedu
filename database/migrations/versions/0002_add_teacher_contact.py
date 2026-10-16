"""Add teacher email and phone columns

Revision ID: 0002_add_teacher_contact
Revises: 0001_initial_schema
Create Date: 2026-10-16

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0002_add_teacher_contact"
down_revision: Union[str, None] = "0001_initial_schema"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c["name"] for c in insp.get_columns("teacher")]
    if "email" not in cols:
        op.add_column("teacher", sa.Column("email", sa.String(length=255), nullable=True))
    if "phone" not in cols:
        op.add_column("teacher", sa.Column("phone", sa.String(length=50), nullable=True))


def downgrade() -> None:
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c["name"] for c in insp.get_columns("teacher")]
    if "phone" in cols:
        op.drop_column("teacher", "phone")
    if "email" in cols:
        op.drop_column("teacher", "email")
