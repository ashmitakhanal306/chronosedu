"""Add password_hash column to app_user

Revision ID: 0003_add_user_password
Revises: 0002_add_teacher_contact
Create Date: 2026-10-16

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "0003_add_user_password"
down_revision: Union[str, None] = "0002_add_teacher_contact"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c["name"] for c in insp.get_columns("app_user")]
    if "password_hash" not in cols:
        op.add_column("app_user", sa.Column("password_hash", sa.String(length=255), nullable=False, server_default=""))


def downgrade() -> None:
    conn = op.get_bind()
    insp = sa.inspect(conn)
    cols = [c["name"] for c in insp.get_columns("app_user")]
    if "password_hash" in cols:
        op.drop_column("app_user", "password_hash")
