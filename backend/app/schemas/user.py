from typing import Literal
from uuid import UUID

from pydantic import BaseModel, EmailStr


class UserResponse(BaseModel):
    id: UUID
    email: str
    name: str | None
    role_type: Literal['physician', 'chiropractor', 'trainer', 'other'] | None
    organization: str | None

    class Config:
        from_attributes = True


class UserUpdate(BaseModel):
    name: str | None = None
    role_type: Literal['physician', 'chiropractor', 'trainer', 'other'] | None = None
    organization: str | None = None
