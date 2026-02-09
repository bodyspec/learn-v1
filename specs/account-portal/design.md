# Account Portal — Detailed Design

## Overview

Transform the existing separate protected pages (Dashboard, Certificates, Profile) into a unified Account Portal with sidebar navigation, add admin user management, fix the certificate PDF download, and implement a progress reset feature with safety confirmation.

The portal lives under `/account/*` with a persistent left sidebar. Admin functionality is gated behind an `is_admin` database flag. The PDF fix addresses a missing auth token on native downloads. Progress reset uses a type-to-confirm pattern for safety.

---

## Detailed Requirements

### 1. Account Portal Layout

- **Route prefix:** `/account/` with sub-routes: `dashboard`, `certificates`, `profile`, `admin`
- **Desktop:** Persistent left sidebar (~256px) with navigation links + content area on right
- **Mobile:** Sidebar hidden behind hamburger toggle, slides in as overlay with backdrop
- **Top nav change:** Replace the user dropdown (Dashboard/Certificates/Profile) with a single "Account" link pointing to `/account/dashboard`. Keep "Sign Out" accessible in sidebar footer or top nav.
- **Old routes** (`/dashboard`, `/certificates`, `/profile`) redirect to `/account/*` equivalents

### 2. Sidebar Navigation

Links (top to bottom):
1. Dashboard (LayoutDashboard icon)
2. Certificates (Award icon)
3. Profile (User icon)
4. Admin (Shield icon) — **only visible if `user.is_admin`**
5. ---
6. Sign Out (LogOut icon) — at bottom of sidebar

Active state: left border accent (`border-salad-100`) + light background (`bg-bs-dark3`)
Hover state: `bg-bs-dark3`

### 3. Admin Section

**Access control:**
- Backend: `get_admin_user()` dependency returns 403 if `!is_admin`
- Frontend: sidebar link hidden, routes return 403/redirect if non-admin navigates directly

**User list view (`/account/admin`):**
- Table columns: Name, Email, Role Type, Last Login, Progress (%), Certificates (#), Actions
- Sortable by column headers
- Search/filter by name or email
- Pagination (25 users per page)
- Action buttons: Promote/Demote (toggle), Delete

**User detail view (`/account/admin/users/:userId`):**
- Header: user name, email, role type, joined date, last login
- Per-module progress breakdown (sections completed / total)
- Quiz attempts: module, score, pass/fail, date
- Certificates: track, issued date, UID
- Back link to user list

**Admin actions:**
- **Promote to admin:** Only for `@bodyspec.com` emails. Backend hard-enforces domain check. Frontend hides button for non-matching emails.
- **Demote admin:** Any admin can demote another admin. Cannot self-demote (backend rejects).
- **Delete user:** Only non-admin users. Confirmation modal required. Hard deletes user + all related data (cascade).

### 4. Certificate PDF Fix

**Problem:** `<a href download>` makes a native browser request without the Bearer auth token. Backend returns 401 JSON, browser saves as `pdf.json`.

**Solution:** Replace native `<a download>` with a JavaScript-driven download:
1. Click handler calls `fetch()` with auth token in Authorization header
2. Response received as Blob
3. Create temporary object URL via `URL.createObjectURL(blob)`
4. Programmatically trigger download via a temporary `<a>` element
5. Revoke object URL after download

**Backend:** No changes needed — endpoint already returns correct `application/pdf` with `Content-Disposition: attachment`.

### 5. Reset Progress

**Location:** Profile page within the account portal (`/account/profile`), at the bottom in a "Danger Zone" section.

**UI flow:**
1. "Reset Progress" button (red/destructive styling) in danger zone section
2. Opens modal with:
   - Warning text: "This action cannot be undone. All selected progress will be permanently deleted."
   - Checkboxes (at least one required):
     - [ ] Section progress (X sections completed)
     - [ ] Quiz attempts (X attempts across Y modules)
     - [ ] Certificates (X certificates earned)
   - Each checkbox shows current count for context
   - Text input: "Type RESET to confirm"
   - Confirm button: disabled until "RESET" typed and at least one checkbox selected
   - Cancel button
3. On confirm: `POST /api/v1/users/me/reset-progress` with `{ sections: bool, quizzes: bool, certificates: bool }`
4. Success: close modal, refresh page data, show success toast
5. Failure: show error in modal

---

## Architecture Overview

```mermaid
graph TB
    subgraph Frontend
        Router[React Router] --> AccountLayout[AccountLayout]
        AccountLayout --> Sidebar[Sidebar Nav]
        AccountLayout --> ContentArea[Content Area]
        ContentArea --> DashboardPage[Dashboard]
        ContentArea --> CertificatesPage[Certificates]
        ContentArea --> ProfilePage[Profile + Reset]
        ContentArea --> AdminPage[Admin Panel]
        AdminPage --> UserList[User List]
        AdminPage --> UserDetail[User Detail]
    end

    subgraph Backend
        AuthDep[get_current_user] --> AdminDep[get_admin_user]
        AdminDep --> AdminRoutes[/api/v1/admin/*]
        AuthDep --> UserRoutes[/api/v1/users/*]
        AuthDep --> CertRoutes[/api/v1/certificates/*]
    end

    Frontend -->|API calls with Bearer token| Backend
```

### Route Structure

| Route | Component | Auth | Admin |
|-------|-----------|------|-------|
| `/account` | Redirect → `/account/dashboard` | Yes | No |
| `/account/dashboard` | DashboardPage | Yes | No |
| `/account/certificates` | CertificatesPage | Yes | No |
| `/account/profile` | ProfilePage (+ Reset) | Yes | No |
| `/account/admin` | AdminUserList | Yes | Yes |
| `/account/admin/users/:id` | AdminUserDetail | Yes | Yes |
| `/dashboard` | Redirect → `/account/dashboard` | — | — |
| `/certificates` | Redirect → `/account/certificates` | — | — |
| `/profile` | Redirect → `/account/profile` | — | — |

---

## Components and Interfaces

### New Frontend Components

**AccountLayout** (`pages/account/AccountLayout.tsx`)
- Wraps all `/account/*` routes
- Contains sidebar + content area
- Manages mobile sidebar toggle state
- Fetches user data to determine admin visibility

**AccountSidebar** (`pages/account/AccountSidebar.tsx`)
- Navigation links with icons
- Active route highlighting via `useLocation()`
- Conditional admin link based on `user.is_admin`
- Mobile: overlay with backdrop, close on navigation or backdrop click
- Sign Out button at bottom

**AdminUserList** (`pages/account/admin/AdminUserList.tsx`)
- Fetches `GET /api/v1/admin/users`
- Renders sortable, searchable table
- Action buttons per row (promote/demote/delete)
- Pagination controls

**AdminUserDetail** (`pages/account/admin/AdminUserDetail.tsx`)
- Fetches `GET /api/v1/admin/users/:id`
- Renders detailed progress, quiz attempts, certificates

**ResetProgressModal** (`pages/account/ResetProgressModal.tsx`)
- Checkboxes for reset scope
- Type-to-confirm input
- Loading state during API call

### New Backend Endpoints

**Admin routes** (`api/admin.py`):

| Method | Path | Body/Params | Response |
|--------|------|-------------|----------|
| GET | `/api/v1/admin/users` | `?page=1&per_page=25&search=` | Paginated user list with progress summary |
| GET | `/api/v1/admin/users/{user_id}` | — | Detailed user with progress, quizzes, certs |
| PUT | `/api/v1/admin/users/{user_id}/promote` | — | 200 OK / 400 if not @bodyspec.com |
| PUT | `/api/v1/admin/users/{user_id}/demote` | — | 200 OK / 400 if self-demote |
| DELETE | `/api/v1/admin/users/{user_id}` | — | 204 No Content / 400 if target is admin |

**Reset progress** (`api/users.py`):

| Method | Path | Body | Response |
|--------|------|------|----------|
| POST | `/api/v1/users/me/reset-progress` | `{ sections: bool, quizzes: bool, certificates: bool }` | 200 OK with counts deleted |

### New React Query Hooks

```typescript
// Admin
useAdminUsers(page, search)      → GET /api/v1/admin/users
useAdminUserDetail(userId)        → GET /api/v1/admin/users/:id
usePromoteUser()                  → PUT /api/v1/admin/users/:id/promote
useDemoteUser()                   → PUT /api/v1/admin/users/:id/demote
useDeleteUser()                   → DELETE /api/v1/admin/users/:id

// Reset
useResetProgress()                → POST /api/v1/users/me/reset-progress
```

### Modified Components

**Navigation.tsx** — Replace user dropdown items with single "Account" link
**Certificate.tsx** — Replace `<a href download>` with JS-driven download function
**AuthProvider.tsx** — Expose `is_admin` from user object

---

## Data Models

### User Model Changes

```python
class User(Base):
    # ... existing fields ...
    is_admin: Mapped[bool] = mapped_column(Boolean, default=False, server_default='false')
```

### Alembic Migration

```python
# Add is_admin column
op.add_column('users', sa.Column('is_admin', sa.Boolean(), server_default='false', nullable=False))

# Seed roy@bodyspec.com as admin
op.execute("UPDATE users SET is_admin = true WHERE email = 'roy@bodyspec.com'")
```

### API Schemas (Pydantic)

```python
# Admin user list item
class AdminUserSummary(BaseModel):
    id: UUID
    email: str
    name: str | None
    role_type: str | None
    is_admin: bool
    last_login: datetime | None
    created_at: datetime
    sections_completed: int
    quizzes_passed: int
    certificates_count: int

# Admin user list response
class AdminUserListResponse(BaseModel):
    users: list[AdminUserSummary]
    total: int
    page: int
    per_page: int

# Admin user detail
class AdminUserDetail(AdminUserSummary):
    module_progress: list[ModuleProgressDetail]
    quiz_attempts: list[QuizAttemptDetail]
    certificates: list[CertificateDetail]

# Reset progress request
class ResetProgressRequest(BaseModel):
    sections: bool = False
    quizzes: bool = False
    certificates: bool = False

# Reset progress response
class ResetProgressResponse(BaseModel):
    sections_deleted: int
    quizzes_deleted: int
    certificates_deleted: int
```

### Frontend Types

```typescript
interface User {
  // ... existing fields ...
  is_admin: boolean
}

interface AdminUserSummary {
  id: string
  email: string
  name: string | null
  role_type: string | null
  is_admin: boolean
  last_login: string | null
  created_at: string
  sections_completed: number
  quizzes_passed: number
  certificates_count: number
}
```

---

## Error Handling

| Scenario | HTTP Status | Message | Frontend Behavior |
|----------|------------|---------|-------------------|
| Non-admin hits admin endpoint | 403 | "Admin access required" | Redirect to dashboard, show toast |
| Promote non-@bodyspec.com user | 400 | "Only @bodyspec.com users can be promoted" | Show error toast |
| Self-demote | 400 | "Cannot demote yourself" | Show error toast |
| Delete admin user | 400 | "Cannot delete an admin user" | Show error toast |
| Delete non-existent user | 404 | "User not found" | Show error toast |
| Reset with no selections | 400 | "At least one category required" | Frontend prevents this (button disabled) |
| PDF download fails | 401/500 | Varies | Show error toast instead of broken download |

---

## Acceptance Criteria

### Account Portal Layout

```
Given I am an authenticated user
When I click "Account" in the top navigation
Then I am taken to /account/dashboard
And I see a left sidebar with Dashboard, Certificates, Profile links
And the Dashboard page content is displayed

Given I am on any /account/* page
When I click a different sidebar link
Then the content area updates to that page
And the sidebar highlights the active link

Given I am on mobile viewport (<768px)
When I tap the hamburger toggle
Then the sidebar slides in as an overlay with a backdrop
When I tap a link or the backdrop
Then the sidebar closes
```

### Admin Section

```
Given I am an admin user
When I view the sidebar
Then I see an "Admin" link between Profile and Sign Out

Given I am not an admin
When I view the sidebar
Then I do not see an "Admin" link
When I navigate directly to /account/admin
Then I am redirected to /account/dashboard

Given I am an admin on the admin page
When the page loads
Then I see a table of all users with name, email, role, last login, progress, certificates
When I click a user row
Then I see their detailed progress, quiz attempts, and certificates

Given I am an admin viewing a @bodyspec.com non-admin user
When I click "Promote to Admin"
Then the user becomes an admin
And the UI updates to show "Demote" instead

Given I am an admin viewing a non-@bodyspec.com user
Then I do not see a "Promote to Admin" button

Given I am an admin viewing another admin
When I click "Demote"
Then the user is demoted
And the UI updates to show "Promote" instead

Given I am an admin
When I try to demote myself
Then the action is rejected with an error

Given I am an admin viewing a non-admin user
When I click "Delete" and confirm
Then the user and all their data are permanently removed
```

### Certificate PDF Download

```
Given I am authenticated and have a certificate
When I click "Download PDF"
Then a PDF file downloads with filename "certificate-{uid}.pdf"
And the file is a valid PDF (not JSON)

Given I am authenticated and click "Download PDF"
When the download fails
Then I see an error message (not a broken file)
```

### Reset Progress

```
Given I am on /account/profile
When I scroll to the Danger Zone section
Then I see a "Reset Progress" button

When I click "Reset Progress"
Then a modal opens with warning text and checkboxes for sections, quizzes, certificates
And each checkbox shows the current count
And the confirm button is disabled

When I check "Section progress" and "Quiz attempts"
And type "RESET" in the confirmation input
Then the confirm button becomes enabled

When I click confirm
Then my section progress and quiz attempts are deleted
And the modal closes
And the page data refreshes showing zero progress

When I open the modal and click Cancel
Then nothing is deleted and the modal closes
```

---

## Testing Strategy

### Unit Tests (Backend)

- `test_get_admin_user_dependency`: Returns user if admin, raises 403 if not
- `test_admin_users_list`: Returns paginated users with progress counts
- `test_admin_user_detail`: Returns full user detail
- `test_promote_user`: Success for @bodyspec.com, 400 for others
- `test_demote_user`: Success for others, 400 for self
- `test_delete_user`: Success for non-admin, 400 for admin target
- `test_reset_progress`: Deletes selected categories, returns counts
- `test_reset_progress_validation`: Rejects empty selection

### Unit Tests (Frontend)

- `AccountSidebar`: Renders correct links, hides admin for non-admins
- `ResetProgressModal`: Checkbox state, type-to-confirm enables button, submit calls API
- `PDF download`: Fetches with token, creates blob, triggers download

### E2E Tests (Playwright)

1. **Account portal navigation**: Login → click Account → verify sidebar + dashboard content → navigate between pages
2. **Mobile sidebar**: Set mobile viewport → verify hamburger → toggle sidebar → navigate
3. **Screenshot tests**: Capture portal layout at desktop and mobile viewports for visual verification
4. **Admin user list**: Login as admin → navigate to admin → verify user table renders
5. **Admin promote/demote**: Promote a @bodyspec.com user → verify → demote → verify
6. **Admin delete user**: Delete test user → verify removed from list
7. **Certificate PDF download**: Earn certificate → download → verify PDF file (check content-type or file size > 0)
8. **Reset progress flow**: Complete some modules → reset sections + quizzes → verify progress cleared → re-complete to test incremental progress
9. **Reset progress confirmation**: Verify button disabled without typing RESET, verify cancel doesn't delete

---

## Appendices

### A. Technology Choices

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Admin storage | DB `is_admin` column | Simple, app-specific, avoids Keycloak config dependency |
| Admin auth | Layered FastAPI dependency | DRY, composable, clear 401/403 semantics |
| PDF download | JS Blob download | Fixes auth issue, works with existing backend |
| Sidebar framework | Tailwind + existing patterns | Consistent with codebase, no new dependencies |
| Domain enforcement | Backend + frontend | Defense in depth |

### B. Research Findings

- **PDF Bug:** Native `<a download>` doesn't include Bearer token → 401 JSON response saved as `pdf.json`. See `research/pdf-bug.md`.
- **UI Patterns:** App uses BodySpec color palette (dark/mint), Poppins font, card-based layouts, lucide-react icons. See `research/ui-patterns.md`.
- **Auth Pattern:** Layered dependency injection is idiomatic FastAPI. See `research/admin-auth.md`.

### C. Alternative Approaches Considered

- **Keycloak roles for admin:** More centralized but adds external dependency and Keycloak configuration overhead. DB column is simpler for a single boolean flag.
- **Tab-based portal:** Simpler but doesn't scale to admin section. Sidebar provides clearer hierarchy.
- **Soft delete for users:** Preserves data but adds complexity (filtering deleted users everywhere). Hard delete is simpler and matches the "clean slate" philosophy of reset progress.
- **Signed URL for PDF:** Would let native `<a>` tags work but requires backend changes (token generation, expiry logic). JS Blob download is simpler and works with existing endpoint.
