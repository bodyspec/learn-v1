# Account Portal — Implementation Plan

## Checklist

- [ ] Step 1: Database migration + admin auth dependency
- [ ] Step 2: Account portal layout (sidebar + routing)
- [ ] Step 3: Certificate PDF download fix
- [ ] Step 4: Admin backend API endpoints
- [ ] Step 5: Admin frontend — user list + detail views
- [ ] Step 6: Admin frontend — promote, demote, delete actions
- [ ] Step 7: Reset progress — backend + frontend
- [ ] Step 8: E2E tests — portal navigation + screenshots
- [ ] Step 9: E2E tests — admin, PDF, reset progress flows

---

## Step 1: Database migration + admin auth dependency

**Objective:** Add the `is_admin` column and the backend authorization layer so all subsequent admin work has a foundation.

**Implementation guidance:**
- Create Alembic migration: add `is_admin` boolean column to `users` table, default `false`, not nullable
- In the same migration, seed `roy@bodyspec.com` as admin via `UPDATE` statement
- Add `is_admin` field to the SQLAlchemy `User` model
- Add `is_admin` to the `UserResponse` Pydantic schema (returned by `/auth/me`)
- Create `get_admin_user()` dependency in `auth/dependencies.py` that wraps `get_current_user()` and raises 403 if `!is_admin`
- Update frontend `User` TypeScript type to include `is_admin: boolean`

**Test requirements:**
- Unit test: `get_admin_user` returns user when `is_admin=True`
- Unit test: `get_admin_user` raises 403 when `is_admin=False`
- Unit test: `/auth/me` response includes `is_admin` field

**Integration notes:** No visible UI changes yet. The auth/me endpoint now returns `is_admin`, which the frontend will use in Step 2.

**Demo:** Call `GET /api/v1/auth/me` and see `is_admin: true` for `roy@bodyspec.com`, `false` for others.

---

## Step 2: Account portal layout (sidebar + routing)

**Objective:** Create the account portal shell with sidebar navigation and move existing pages into it. This is the core UI change — demoable end-to-end immediately.

**Implementation guidance:**
- Create `AccountLayout` component: flex container with sidebar + content `<Outlet />`
- Create `AccountSidebar` component:
  - Links: Dashboard (LayoutDashboard), Certificates (Award), Profile (User), Admin (Shield, conditional on `is_admin`)
  - Sign Out at bottom (LogOut icon)
  - Active state via `useLocation()`: left border `border-salad-100` + `bg-bs-dark3`
  - Hover: `bg-bs-dark3`
  - Desktop: fixed 256px sidebar
  - Mobile (<768px): hidden by default, hamburger button in portal header, overlay with backdrop
- Add routes in React Router:
  - `/account` → redirect to `/account/dashboard`
  - `/account/dashboard` → existing DashboardPage
  - `/account/certificates` → existing CertificatesPage
  - `/account/profile` → existing ProfilePage
  - `/account/admin` → placeholder (built in Step 5)
  - `/account/admin/users/:userId` → placeholder (built in Step 5)
- Add redirects: `/dashboard` → `/account/dashboard`, `/certificates` → `/account/certificates`, `/profile` → `/account/profile`
- Wrap `/account/*` routes with `ProtectedRoute`
- Update `Navigation.tsx`: replace user dropdown items (Dashboard/Certificates/Profile) with single "Account" link to `/account/dashboard`. Keep Sign Out if desired (also in sidebar).

**Test requirements:**
- Verify all three pages render correctly inside the new layout
- Verify redirects from old routes work
- Verify sidebar link highlighting matches current route

**Integration notes:** Existing page components are reused as-is. Only the wrapping layout and routing changes.

**Demo:** Login → click "Account" in top nav → see sidebar with Dashboard active → click Certificates → content switches, sidebar updates → resize to mobile → hamburger appears → toggle sidebar overlay.

---

## Step 3: Certificate PDF download fix

**Objective:** Fix the PDF download so it delivers an actual PDF instead of `pdf.json`. Standalone fix with no dependencies on other steps.

**Implementation guidance:**
- In `Certificate.tsx`, replace the `<a href download>` with a button that triggers a JS download:
  ```typescript
  async function downloadPdf(certificateUid: string, token: string) {
    const response = await fetch(`/api/v1/certificates/${certificateUid}/pdf`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (!response.ok) throw new Error('Download failed')
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `certificate-${certificateUid}.pdf`
    a.click()
    URL.revokeObjectURL(url)
  }
  ```
- Add error handling: show toast on failure instead of broken file
- Remove `getCertificatePdfUrl()` helper if no longer needed

**Test requirements:**
- Unit test: mock fetch, verify blob download flow
- E2E test planned in Step 9

**Integration notes:** This is a self-contained frontend fix. Backend endpoint is already correct.

**Demo:** Login → go to Certificates → click "Download PDF" on an earned certificate → browser downloads `certificate-{uid}.pdf` as a valid PDF file.

---

## Step 4: Admin backend API endpoints

**Objective:** Build all admin API endpoints so the frontend has data to work with.

**Implementation guidance:**
- Create `api/admin.py` router with prefix `/admin`
- All endpoints use `Depends(get_admin_user)`
- Endpoints:
  - `GET /admin/users?page=1&per_page=25&search=` — Query users with progress counts via subqueries (sections_completed, quizzes_passed, certificates_count). Paginate. Optional search by name/email (ILIKE).
  - `GET /admin/users/{user_id}` — Full user detail with module_progress, quiz_attempts, certificates lists
  - `PUT /admin/users/{user_id}/promote` — Check email ends with `@bodyspec.com`, set `is_admin=True`. Return 400 if domain mismatch.
  - `PUT /admin/users/{user_id}/demote` — Check not self-demote, set `is_admin=False`. Return 400 if self.
  - `DELETE /admin/users/{user_id}` — Check target is not admin. Hard delete user (cascade handles related records). Return 204.
- Create Pydantic schemas: `AdminUserSummary`, `AdminUserListResponse`, `AdminUserDetail`
- Create `services/admin_service.py` for business logic (list users, get detail, promote, demote, delete)
- Register router in `main.py`

**Test requirements:**
- Unit test each endpoint: success case + error cases (403, 400, 404)
- Test pagination and search filtering
- Test cascade delete removes progress, quiz attempts, certificates
- Test domain enforcement on promote

**Integration notes:** Frontend hooks created in Step 5 will consume these endpoints.

**Demo:** Via Swagger UI (`/docs`): authenticate as admin → `GET /admin/users` returns user list with progress → `PUT /admin/users/{id}/promote` promotes a user → `DELETE /admin/users/{id}` removes a test user.

---

## Step 5: Admin frontend — user list + detail views

**Objective:** Build the admin UI for viewing users and their progress.

**Implementation guidance:**
- Create React Query hooks: `useAdminUsers(page, search)`, `useAdminUserDetail(userId)`
- Create `AdminUserList` page:
  - Search input (debounced, 300ms)
  - Table: Name, Email, Role, Last Login, Progress %, Certs #, Actions column
  - Rows clickable → navigate to `/account/admin/users/:id`
  - Pagination controls (prev/next + page indicator)
  - Loading spinner while fetching
  - Empty state if no users match search
- Create `AdminUserDetail` page:
  - Back link to user list
  - Header card: name, email, role, admin badge, joined, last login
  - Module progress section: card per module with sections completed / total + progress bar
  - Quiz attempts section: table with module, score, pass/fail, date
  - Certificates section: list with track, UID, issued date
- Wire up routes in AccountLayout (replace placeholders from Step 2)
- Admin route guard: if user navigates to `/account/admin` without `is_admin`, redirect to `/account/dashboard`

**Test requirements:**
- Verify admin page renders user list
- Verify search filters results
- Verify clicking a row navigates to detail
- Verify non-admin redirect

**Integration notes:** Action buttons (promote/demote/delete) are rendered but wired up in Step 6.

**Demo:** Login as admin → click Admin in sidebar → see all users in a table → search by name → click a user → see their full progress breakdown → back to list.

---

## Step 6: Admin frontend — promote, demote, delete actions

**Objective:** Wire up the admin action buttons with confirmation flows.

**Implementation guidance:**
- Create React Query mutations: `usePromoteUser()`, `useDemoteUser()`, `useDeleteUser()`
- In `AdminUserList` action column:
  - **Promote button:** Shown only for `@bodyspec.com` non-admin users. Calls promote mutation. On success, invalidate user list query.
  - **Demote button:** Shown for admin users (except current user). Calls demote mutation. On success, invalidate.
  - **Delete button:** Shown for non-admin users. Opens confirmation modal ("Are you sure you want to permanently delete {name}? This cannot be undone."). On confirm, calls delete mutation. On success, invalidate and show toast.
- Also show promote/demote/delete in `AdminUserDetail` header area
- Error toasts for all failure cases (400, 404)

**Test requirements:**
- Verify promote button only visible for @bodyspec.com non-admins
- Verify demote button not visible for self
- Verify delete confirmation modal flow
- Verify list refreshes after each action

**Integration notes:** All mutations invalidate the `adminUsers` query key to refresh the list.

**Demo:** Login as admin → Admin panel → promote a @bodyspec.com user → see them become admin → demote them back → delete a test user → confirm → user disappears from list.

---

## Step 7: Reset progress — backend + frontend

**Objective:** Add the reset progress feature with type-to-confirm safety pattern.

**Implementation guidance:**

**Backend:**
- Add `POST /api/v1/users/me/reset-progress` in `api/users.py`
- Request body: `ResetProgressRequest { sections: bool, quizzes: bool, certificates: bool }`
- Validate at least one is true, return 400 otherwise
- Delete selected records for `current_user.id`:
  - `sections=true`: DELETE from `section_progress` WHERE user_id = ...
  - `quizzes=true`: DELETE from `quiz_attempts` WHERE user_id = ...
  - `certificates=true`: DELETE from `certificates` WHERE user_id = ...
- Return counts deleted: `ResetProgressResponse { sections_deleted, quizzes_deleted, certificates_deleted }`

**Frontend:**
- Create `useResetProgress()` React Query mutation
- Create `ResetProgressModal` component:
  - Warning banner (red/amber styling): "This action cannot be undone."
  - Checkboxes with current counts fetched from existing progress hooks:
    - [ ] Section progress (N sections completed)
    - [ ] Quiz attempts (N attempts)
    - [ ] Certificates (N certificates)
  - Text input: placeholder "Type RESET to confirm"
  - Confirm button: `btn-primary` with destructive red styling, disabled until RESET typed + at least one checkbox
  - Cancel button
- Add "Danger Zone" section to bottom of Profile page:
  - Red-bordered card
  - "Reset Progress" heading + description text
  - Button opens modal
- On success: close modal, invalidate progress + certificates queries, show success toast with counts

**Test requirements:**
- Backend unit tests: reset each category, reset combinations, reject empty selection
- Frontend: modal state management, button enable/disable logic
- E2E planned in Step 9

**Integration notes:** The reset feature uses existing progress/certificate query hooks for displaying counts, and invalidates them on success.

**Demo:** Login → Profile → scroll to Danger Zone → click Reset Progress → check Sections + Quizzes → type RESET → confirm → dashboard shows zero progress → complete a module again to verify progress tracking still works.

---

## Step 8: E2E tests — portal navigation + screenshots

**Objective:** Verify the portal layout, navigation, and visual consistency with Playwright.

**Implementation guidance:**
- Test: **Account portal navigation**
  - Login → click Account → verify on /account/dashboard → verify sidebar links → click each link → verify content loads
- Test: **Mobile sidebar**
  - Set viewport to 375x667 → login → navigate to account → verify sidebar hidden → click hamburger → verify overlay appears → click link → verify navigation + sidebar closes
- Test: **Screenshot tests**
  - Capture `/account/dashboard` at 1280x720 (desktop) and 375x667 (mobile)
  - Capture `/account/certificates` at desktop
  - Capture `/account/profile` at desktop
  - Capture `/account/admin` at desktop (as admin user)
  - Store screenshots for visual regression baseline
- Test: **Old route redirects**
  - Navigate to `/dashboard` → verify redirected to `/account/dashboard`
  - Same for `/certificates`, `/profile`

**Test requirements:**
- All tests pass in CI (headless Chrome)
- Screenshots saved to `e2e/screenshots/` for review

**Integration notes:** Uses existing E2E auth helpers (`signIn()`, wait for `/auth/me`).

**Demo:** Run `./dev.sh e2e portal` → all navigation tests pass → screenshots captured for review.

---

## Step 9: E2E tests — admin, PDF, reset progress flows

**Objective:** Full end-to-end verification of all new features. The reset progress test also enables incremental testing by clearing test account state.

**Implementation guidance:**
- Test: **Certificate PDF download**
  - Login → ensure test user has a certificate (or earn one via quiz flow)
  - Click Download PDF → intercept the download response → verify content-type is `application/pdf` → verify file size > 0
  - Use Playwright's `page.waitForEvent('download')` to capture the download
- Test: **Admin user list + detail**
  - Login as admin (roy@bodyspec.com or configured admin) → navigate to /account/admin → verify table renders users → search for test user → click → verify detail page shows progress
- Test: **Admin promote/demote**
  - On admin page → find a @bodyspec.com test user → promote → verify admin badge → demote → verify badge removed
- Test: **Admin delete** (use a disposable test user if possible, or skip destructive test in CI)
- Test: **Reset progress — full cycle**
  - Login → complete a module section + pass a quiz (incremental progress)
  - Navigate to Profile → Reset Progress → check all → type RESET → confirm
  - Verify dashboard shows zero progress
  - Complete module section again → verify progress updates
  - This test pattern enables future tests to start from a clean state by resetting first

**Test requirements:**
- PDF test verifies actual file download (not just network response)
- Reset test exercises the full cycle: progress → reset → re-progress
- Admin tests cover the happy path for list, detail, promote, demote

**Integration notes:** The reset progress E2E test doubles as a test account cleanup mechanism — future test suites can call reset at the start to ensure a known state.

**Demo:** Run `./dev.sh e2e` → all 9+ new E2E tests pass → PDF downloads verified → admin actions work → progress resets and re-accumulates correctly.
