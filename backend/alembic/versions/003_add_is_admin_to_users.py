"""Add is_admin column to users table

Revision ID: 003
Revises: 002
Create Date: 2025-02-08 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers, used by Alembic.
revision: str = '003'
down_revision: Union[str, None] = '002'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('users', sa.Column('is_admin', sa.Boolean(), server_default='false', nullable=False))

    # Seed roy@bodyspec.com as admin
    op.execute("UPDATE users SET is_admin = true WHERE email = 'roy@bodyspec.com'")


def downgrade() -> None:
    op.drop_column('users', 'is_admin')
