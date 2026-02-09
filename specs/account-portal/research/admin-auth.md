# Admin Authorization — Research

## Current Auth Pattern
- Keycloak OIDC → JWT token → `get_current_user()` FastAPI dependency
- All protected endpoints use `Depends(get_current_user)`
- User model has no admin concept — `role_type` is for educational tracks only

## Recommended: Layered Dependency

Add `get_admin_user()` as a second-layer dependency:

```python
async def get_admin_user(
    current_user: Annotated[User, Depends(get_current_user)],
) -> User:
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail='Admin access required')
    return current_user
```

### Benefits
- Reuses existing `get_current_user` (DRY)
- Clear error semantics: 401 (no token) vs 403 (not admin)
- Non-invasive — existing routes unchanged
- Easy to test — mock or patch `is_admin`

## Database Changes Required
- Add `is_admin: bool = False` column to `users` table
- Alembic migration to add column
- Data migration to set `roy@bodyspec.com` as admin

## Admin API Endpoints Needed
- `GET /api/v1/admin/users` — List all users with progress summary
- `GET /api/v1/admin/users/{id}` — Detailed user progress
- `PUT /api/v1/admin/users/{id}/promote` — Promote to admin (requires @bodyspec.com)
- `PUT /api/v1/admin/users/{id}/demote` — Demote from admin
- `DELETE /api/v1/admin/users/{id}` — Hard delete user (non-admin only)

All admin endpoints use `Depends(get_admin_user)`.
