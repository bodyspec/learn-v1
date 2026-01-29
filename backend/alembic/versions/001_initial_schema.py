"""Initial schema

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = '001'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Create users table
    op.create_table(
        'users',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('keycloak_id', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('name', sa.String(255), nullable=True),
        sa.Column('role_type', sa.String(50), nullable=True),
        sa.Column('organization', sa.String(255), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('last_login', sa.DateTime(timezone=True), nullable=True),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('idx_users_keycloak_id', 'users', ['keycloak_id'], unique=True)
    op.create_index('idx_users_email', 'users', ['email'], unique=False)

    # Create section_progress table
    op.create_table(
        'section_progress',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('module_id', sa.String(50), nullable=False),
        sa.Column('section_slug', sa.String(100), nullable=False),
        sa.Column('completed_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'module_id', 'section_slug', name='unique_user_section'),
    )
    op.create_index('idx_progress_user', 'section_progress', ['user_id'], unique=False)
    op.create_index('idx_progress_module', 'section_progress', ['module_id'], unique=False)

    # Create quiz_attempts table
    op.create_table(
        'quiz_attempts',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('module_id', sa.String(50), nullable=False),
        sa.Column('score', sa.Integer(), nullable=False),
        sa.Column('passed', sa.Boolean(), nullable=False),
        sa.Column('answers', postgresql.JSONB(), nullable=False),
        sa.Column('time_spent_seconds', sa.Integer(), nullable=True),
        sa.Column('attempted_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('idx_quiz_user', 'quiz_attempts', ['user_id'], unique=False)
    op.create_index('idx_quiz_module', 'quiz_attempts', ['module_id'], unique=False)

    # Create certificates table
    op.create_table(
        'certificates',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('user_id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('track', sa.String(50), nullable=False),
        sa.Column('certificate_uid', sa.String(20), nullable=False),
        sa.Column('recipient_name', sa.String(255), nullable=False),
        sa.Column('recipient_email', sa.String(255), nullable=False),
        sa.Column('issued_at', sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column('expires_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('revoked_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('revocation_reason', sa.Text(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ondelete='CASCADE'),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('idx_cert_uid', 'certificates', ['certificate_uid'], unique=True)
    op.create_index('idx_cert_user', 'certificates', ['user_id'], unique=False)
    op.create_index('idx_cert_track', 'certificates', ['track'], unique=False)


def downgrade() -> None:
    op.drop_table('certificates')
    op.drop_table('quiz_attempts')
    op.drop_table('section_progress')
    op.drop_table('users')
