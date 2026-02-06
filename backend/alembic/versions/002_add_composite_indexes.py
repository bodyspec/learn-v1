"""Add composite indexes for frequently queried columns

Revision ID: 002
Revises: 001
Create Date: 2024-01-15 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

# revision identifiers, used by Alembic.
revision: str = '002'
down_revision: Union[str, None] = '001'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Composite index for section_progress lookups by user + module
    op.create_index('idx_progress_user_module', 'section_progress', ['user_id', 'module_id'])

    # Composite index for quiz_attempts lookups by user + module
    op.create_index('idx_quiz_user_module', 'quiz_attempts', ['user_id', 'module_id'])

    # Composite index for quiz pass checks (user + module + passed)
    op.create_index('idx_quiz_user_module_passed', 'quiz_attempts', ['user_id', 'module_id', 'passed'])


def downgrade() -> None:
    op.drop_index('idx_quiz_user_module_passed', table_name='quiz_attempts')
    op.drop_index('idx_quiz_user_module', table_name='quiz_attempts')
    op.drop_index('idx_progress_user_module', table_name='section_progress')
