# Comprehensive Testing — Implementation Plan

## Progress Checklist

- [x] Step 1: Backend — Certificate service gaps (HIGH)
- [x] Step 2: Backend — Auth gaps (HIGH)
- [x] Step 3: Backend — API gaps (HIGH) + new test_api_auth.py
- [x] Step 4: Backend — Quiz service edge cases (MEDIUM)
- [x] Step 5: Backend — New test_pdf_generator.py
- [x] Step 6: Backend — New test_admin_service.py + remaining LOW
- [x] Step 7: Frontend — Test utilities + API admin tests
- [x] Step 8: Frontend — Hook tests
- [x] Step 9: Frontend — Common component tests
- [x] Step 10: Frontend — Quiz.tsx + Navigation.tsx (critical components)
- [x] Step 11: Frontend — Remaining component tests
- [x] Step 12: Frontend — Page tests (Tier 1: SectionView, ModuleView, CertificatesPage)
- [x] Step 13: Frontend — Page tests (Tier 2: Dashboard, ProfilePage, QuizPage, ModuleList)
- [x] Step 14: Frontend — Page tests (Tier 3: account pages, admin pages, Home, VerifyPage)
- [x] Step 15: E2E — Update helpers.ts + fix test quality issues
- [x] Step 16: E2E — Admin specs (admin.spec.ts, admin-protection.spec.ts)
- [x] Step 17: E2E — Deep-dive content spec + final verification

---

## Step 1: Backend — Certificate service gaps (HIGH)

**Objective**: Add `has_active_certificate()` and `revoke_certificate()` test coverage — the two entirely untested certificate service functions.

**Implementation guidance**:
- Add fixtures for `active_certificate`, `expired_certificate`, `revoked_certificate` in the existing `test_certificate_service.py` (or in `conftest.py` if reusable elsewhere).
- For expired certificates, create a Certificate with `expires_at` set to a past datetime.
- For `has_active_certificate()`, test all 5 scenarios: active (True), no cert (False), revoked (False), expired (False), wrong track (False).
- For `revoke_certificate()`, test 3 scenarios: success (revoked_at + reason set), not found (returns None), already revoked (overwrites timestamp).
- Also add the missing `verify_certificate()` unknown track fallback test.

**Test requirements**:
- 9 new tests total in `backend/tests/test_certificate_service.py`
- All tests use the existing async SQLite session fixture
- Verify exact field values (revoked_at, revocation_reason, expires_at)

**Integration notes**:
- Run `./dev.sh test` — all 119 tests (110 existing + 9 new) must pass
- No changes to production code

**Demo**: Run `python -m pytest backend/tests/test_certificate_service.py -v` and show 26 passing tests (17 existing + 9 new).

---

## Step 2: Backend — Auth gaps (HIGH)

**Objective**: Add happy-path tests for `get_current_user()`, `get_optional_user()`, and `validate_token()` — currently only failure paths are tested.

**Implementation guidance**:
- In `test_auth.py`, add to the existing `TestAuthDependencies` class:
  - `get_current_user()` with valid token — mock `keycloak_auth.validate_token` to return a payload, verify user is returned from `get_or_create_user`
  - `get_current_user()` with valid token for new user — verify user creation
  - `get_optional_user()` with valid token — returns user
  - `get_optional_user()` with invalid token — returns None (catches HTTPException)
- In `TestKeycloakAuth` class:
  - `validate_token()` with valid JWT — requires mocking JWKS keys, creating a test JWT with matching kid/azp, and verifying payload return
  - `validate_token()` with wrong kid — returns None
  - `validate_token()` with wrong azp — returns None
  - `validate_token()` with expired token — returns None
  - `get_current_user()` with token missing email — defaults to empty string

**Test requirements**:
- 9 new tests in `backend/tests/test_auth.py`
- For `validate_token` tests, use `PyJWT` to create real test JWTs signed with a test RSA key
- Mock `get_public_keys()` to return the test key

**Integration notes**:
- Run `./dev.sh test` — all 128 tests must pass (119 + 9)

**Demo**: Run `python -m pytest backend/tests/test_auth.py -v` and show 15 passing tests (6 existing + 9 new).

---

## Step 3: Backend — API gaps (HIGH) + new test_api_auth.py

**Objective**: Add the 409 conflict and invalid track tests for certificates API, and create the dedicated auth API test file.

**Implementation guidance**:
- In `test_api_certificates.py`, add:
  - Test that `POST /api/v1/certificates` returns 409 when user already has an active certificate for the track. Setup: create a user, create a certificate for them, then POST to create another.
  - Test that `POST /api/v1/certificates` returns 422 for an invalid track name.
- Create `test_api_auth.py`:
  - Test `GET /api/v1/auth/me` returns 200 with full user data (name, email, role_type, is_admin) when authenticated.
  - Test `GET /api/v1/auth/me` returns 401 when no token provided.

**Test requirements**:
- 2 new tests in `backend/tests/test_api_certificates.py`
- 2 new tests in `backend/tests/test_api_auth.py` (new file)
- Use the existing `authenticated_client` fixture for auth tests

**Integration notes**:
- Run `./dev.sh test` — all 132 tests must pass (128 + 4)
- `test_api_auth.py` follows the same pattern as other `test_api_*.py` files

**Demo**: Run `python -m pytest backend/tests/test_api_auth.py backend/tests/test_api_certificates.py -v`.

---

## Step 4: Backend — Quiz service edge cases (MEDIUM)

**Objective**: Cover quiz grading edge cases and quiz attempts filtering.

**Implementation guidance**:
- In `test_quiz_service.py`, add to `TestGradeQuiz`:
  - Empty questions list (`questions: []`) — score should be 0, passed should be False (tests the division-by-zero guard)
  - Custom `passing_score` (e.g., 70 instead of 80) — verify threshold is respected
  - Question with no `correct: true` option — `correct_option` stays -1, all answers treated as wrong
- Add to quiz attempts tests:
  - `get_quiz_attempts()` with multiple modules — verify only requested module's attempts are returned
  - `get_quiz_attempts()` where best score is from a non-latest attempt — verify best_score is still the highest
  - `record_quiz_attempt()` with `time_spent_seconds=None` — stored as NULL
  - `grade_quiz()` with question missing `explanation` — defaults to empty string

**Test requirements**:
- 7 new tests in `backend/tests/test_quiz_service.py`
- Use existing quiz YAML loading or mock quiz data

**Integration notes**:
- Run `./dev.sh test` — all 139 tests must pass (132 + 7)

**Demo**: Run `python -m pytest backend/tests/test_quiz_service.py -v` and show 23 passing tests (16 + 7).

---

## Step 5: Backend — New test_pdf_generator.py

**Objective**: Create PDF generation tests with WeasyPrint mocked.

**Implementation guidance**:
- Create `backend/tests/test_pdf_generator.py`
- Mock `WeasyPrint.HTML().write_pdf()` to return `b'%PDF-fake'`
- Test `generate_certificate_pdf()` for:
  1. Known track (physician) — verify template receives correct track title from TRACK_INFO
  2. Unknown track — verify fallback to `track.title()` and generic description
  3. Certificate with `expires_at=None` — template renders without expiration line
  4. Logo file missing — `logo_data_uri` is empty string, no crash
  5. Return value is bytes and non-empty
- To test template rendering without WeasyPrint, consider capturing the HTML string passed to `HTML(string=...)` and asserting on its content (recipient name, UID, dates).

**Test requirements**:
- 5 new tests in `backend/tests/test_pdf_generator.py` (new file)
- Mock `weasyprint.HTML` at the module level
- Mock `pathlib.Path.exists` for logo file tests
- Create a minimal Certificate object (or use a fixture) with required fields

**Integration notes**:
- Run `./dev.sh test` — all 144 tests must pass (139 + 5)
- Verify no WeasyPrint system dependency is required to run tests

**Demo**: Run `python -m pytest backend/tests/test_pdf_generator.py -v` and show 5 passing tests.

---

## Step 6: Backend — New test_admin_service.py + remaining LOW

**Objective**: Create admin service unit tests and fill remaining LOW priority gaps.

**Implementation guidance**:
- Create `backend/tests/test_admin_service.py` with tests for all 5 functions:
  - `promote_user()`: user not found (404), non-bodyspec email (400), already admin (idempotent)
  - `demote_user()`: user not found (404), self-demote (400), already non-admin (idempotent)
  - `delete_user()`: cascading delete verified (user + progress + quizzes + certs removed)
  - `list_users()`: empty database, search matches email only
  - `get_user_detail()`: user with no progress, user with multiple module progress entries
- Add remaining LOW priority cert test: `revoke_certificate()` on already-revoked cert overwrites timestamp

**Test requirements**:
- 10 new tests in `backend/tests/test_admin_service.py` (new file)
- 1 new test in `backend/tests/test_certificate_service.py` (if not already added in Step 1)
- Use existing DB fixtures; create test users with `@bodyspec.com` and non-bodyspec emails

**Integration notes**:
- Run `./dev.sh test` — all 155-156 tests must pass
- This completes all backend testing. Run full suite to verify.

**Demo**: Run `python -m pytest backend/tests/ -v --tb=short` and show ~156 all passing. Backend phase complete.

---

## Step 7: Frontend — Test utilities + API admin tests

**Objective**: Create shared test utilities for hooks and pages, then add admin API tests.

**Implementation guidance**:
- Create or extend `frontend/src/__tests__/test-utils.ts` (or add to existing setup.ts):
  ```typescript
  // renderHookWithProviders — wraps hook in QueryClientProvider + AuthProvider mock
  // renderPageWithProviders — wraps page in MemoryRouter + QueryClientProvider + AuthProvider mock
  // createMockAuthState — factory for auth state (authenticated, unauthenticated, admin)
  // mockResponse — if not already shared, extract from existing tests
  ```
- Create `frontend/src/__tests__/api-admin.test.ts`:
  - Test `getAdminUsers(token, params)` — correct URL, query params, auth header
  - Test `getAdminUserDetail(token, userId)` — correct URL
  - Test `promoteUser(token, userId)` — PUT with correct URL
  - Test `demoteUser(token, userId)` — PUT with correct URL
  - Test `deleteUser(token, userId)` — DELETE with correct URL
  - Test `resetProgress(token, data)` — POST with correct body
  - Test error handling for each (401, 404)
- Follow existing `api-*.test.ts` patterns exactly

**Test requirements**:
- ~10 new tests in `frontend/src/__tests__/api-admin.test.ts` (new file)
- Shared test utilities reusable by all subsequent steps
- Existing 53 frontend tests must still pass

**Integration notes**:
- Run `./dev.sh test` — all backend (156) + frontend (63) tests pass

**Demo**: Run frontend tests and show the new `api-admin.test.ts` passing alongside existing API tests.

---

## Step 8: Frontend — Hook tests

**Objective**: Test all 7 hook files covering React Query integration, auth gating, and cache invalidation.

**Implementation guidance**:
- Use `renderHookWithProviders` from Step 7
- Create QueryClient with `retry: false` and fresh instance per test to avoid cache leakage
- For each hook file, test:
  - **useModules.test.ts** (~5 tests): Returns correct shape, filters by track, handles unknown IDs. Mock `@/content`.
  - **useProgress.test.ts** (~6 tests): Returns null when unauthenticated, fetches when authenticated, `useMarkSectionComplete` calls API and invalidates cache.
  - **useCertificates.test.ts** (~4 tests): Returns empty when unauthenticated, extracts `.certificates`, `useRequestCertificate` invalidates cache.
  - **useQuiz.test.ts** (~3 tests): `useSubmitQuiz` calls API, invalidates both progress and quiz attempts caches.
  - **useVerifyCertificate.test.ts** (~3 tests): Disabled when uid undefined, fetches when provided.
  - **useUpdateProfile.test.ts** (~2 tests): Calls PUT /users/me with data and token.
  - **useAdmin.test.ts** (~6 tests): Queries disabled for non-admin, each mutation calls correct API, `useResetProgress` invalidates both progress and certificates.

**Test requirements**:
- 7 new test files, ~29 tests total
- All hooks tested with `@testing-library/react` `renderHook`
- Mock fetch for API calls, mock useAuth for auth state

**Integration notes**:
- Run `./dev.sh test` — all backend + frontend (~92 total frontend) tests pass

**Demo**: Run `npx vitest run --reporter=verbose` from frontend/ and show all hook tests passing.

---

## Step 9: Frontend — Common component tests

**Objective**: Test all 5 common components (BackLink, LoadingSpinner, NotFound, PageHeader, SignInPrompt).

**Implementation guidance**:
- These are simple presentational components — straightforward RTL tests.
- **BackLink.test.tsx** (~3 tests): Renders link with correct href, displays label, applies className.
- **LoadingSpinner.test.tsx** (~3 tests): Shows spinner, shows/hides message, fullHeight class.
- **NotFound.test.tsx** (~4 tests): Renders title, optional message, default/custom back link.
- **PageHeader.test.tsx** (~4 tests): Renders h1 title, optional description, BackLink when props present, badge/children.
- **SignInPrompt.test.tsx** (~4 tests): Default/custom message, compact mode, click calls login().

**Test requirements**:
- 5 new test files, ~18 tests total
- `SignInPrompt` requires `useAuth` mock (for `login` function)
- Others only need `MemoryRouter` wrapping

**Integration notes**:
- Run `./dev.sh test` — all ~110 frontend tests pass

**Demo**: All common components have green tests — foundation components fully verified.

---

## Step 10: Frontend — Quiz.tsx + Navigation.tsx (critical components)

**Objective**: Test the two most complex untested components.

**Implementation guidance**:
- **Quiz.test.tsx** (~16 tests):
  - Renders first question with "Question 1 of N"
  - Shows "0 of N answered" initially
  - Clicking option updates answer count
  - Next/Previous navigation works, Previous disabled on Q1
  - Submit button only appears on last question
  - Submit disabled until all questions answered
  - **Authenticated path**: calls `submitQuizMutation.mutateAsync` with module_id, answers, time_spent_seconds
  - **Unauthenticated path**: calculates results locally, `certificate_eligible` is false
  - Shows "Submitting..." while mutation is pending
  - After submission, renders QuizResults
  - `onComplete` callback called with result
  - Try Again resets all state (answers cleared, back to Q1)
  - Progress bar width updates
  - `showSignInPrompt` true for unauthenticated local results
  - Mock `useAuth` for auth/unauth paths, mock `useSubmitQuiz` returning a mock mutation
  - Create a minimal quiz fixture with 3 questions

- **Navigation.test.tsx** (~7 tests):
  - Renders BodySpec branding with "/" link
  - Shows track links with correct hrefs
  - Unauthenticated: shows "Sign in" button, click calls login()
  - Authenticated: shows Account link to "/account/dashboard"
  - Mobile hamburger toggles menu visibility
  - Mobile menu closes when link clicked
  - Hamburger has `sm:hidden` class

**Test requirements**:
- 2 new test files, ~23 tests total
- Quiz tests need `useAuth` and `useSubmitQuiz` mocked
- Navigation tests need `useAuth` mocked + MemoryRouter

**Integration notes**:
- Run `./dev.sh test` — all ~133 frontend tests pass

**Demo**: Show Quiz.test.tsx covering both auth and unauth submission paths — the most critical untested component now verified.

---

## Step 11: Frontend — Remaining component tests

**Objective**: Test SectionContent, Certificate, Layout, and TrackCard.

**Implementation guidance**:
- **SectionContent.test.tsx** (~7 tests):
  - Renders basic markdown (headings, paragraphs, links)
  - `processCallouts()` transforms `:::note` blocks into styled divs
  - Multiple callout types (note, warning, tip, clinical)
  - Images get `rounded-lg shadow-md` classes and `loading="lazy"`
  - Tables wrapped in `overflow-x-auto`
  - GFM features (tables, strikethrough)
- **Certificate.test.tsx** (~10 tests):
  - Renders track title, UID, recipient name, dates
  - Shows expiry only when present
  - "Copy Verify Link" copies URL to clipboard, shows "Copied!" temporarily
  - "Download PDF" fetches with auth header, triggers download
  - Shows "Downloading..." while pending
  - Shows error on download failure
  - Fallback track title for unknown tracks
  - Mock: `useAuth`, `navigator.clipboard.writeText`, `fetch`, `URL.createObjectURL`
- **Layout.test.tsx** (~4 tests): Renders Navigation, footer with year, external links, Outlet.
- **TrackCard.test.tsx** (~4 tests): Title, description, link, icon, "Start learning" text.

**Test requirements**:
- 4 new test files, ~25 tests total

**Integration notes**:
- Run `./dev.sh test` — all ~158 frontend tests pass
- All components now have test coverage

**Demo**: Component test suite complete — 32 original + 25 new component tests.

---

## Step 12: Frontend — Page tests (Tier 1)

**Objective**: Test the three highest-priority pages: SectionView, ModuleView, CertificatesPage.

**Implementation guidance**:
- **SectionView.test.tsx** (~10 tests):
  - NotFound for missing params/unknown section/module
  - Renders section title and "Section X of Y"
  - Shows "Complete" badge for completed sections
  - Renders SectionContent with markdown
  - "Content not available" when content is null
  - Previous link absent on first section
  - Continue button: authenticated calls markComplete then navigates
  - Continue button: unauthenticated just navigates
  - Last section: "Finish & View Module" text and navigation
  - SignInPrompt for unauthenticated
  - Mock: useAuth, useProgress, useMarkSectionComplete, @/content, useNavigate

- **ModuleView.test.tsx** (~10 tests):
  - NotFound for invalid moduleId
  - Renders module title, description, time, section count
  - Lists sections with checkmarks for completed
  - Progress percentage for authenticated
  - Hidden progress for unauthenticated
  - "Complete" badge when quiz passed
  - "Take Quiz" vs "Passed" based on quiz status
  - "Get Started" / "Continue" / hidden based on progress
  - SignInPrompt for unauthenticated
  - Mock: useProgress, @/content

- **CertificatesPage.test.tsx** (~8 tests):
  - Loading spinner
  - Renders earned certificates
  - "Earned Certificates" heading when certs exist
  - Available tracks with eligibility check
  - "Claim Certificate" button for eligible tracks
  - "Processing..." while pending
  - Requirements text for ineligible tracks
  - Error display on failed request
  - Mock: useCertificates, useRequestCertificate, useProgress

**Test requirements**:
- 3 new test files, ~28 tests total
- These pages have the most complex conditional rendering

**Integration notes**:
- Run `./dev.sh test` — all ~186 frontend tests pass

**Demo**: The three most complex pages now have unit test coverage.

---

## Step 13: Frontend — Page tests (Tier 2)

**Objective**: Test Dashboard, ProfilePage, QuizPage, and ModuleList.

**Implementation guidance**:
- **Dashboard.test.tsx** (~7 tests):
  - Loading spinner
  - Welcome message with name (fallback to email)
  - Quick stats cards with correct counts
  - Track progress with Continue links
  - "Certified" badge for tracks with certificates
  - Recent activity (last 5 sections)
  - Certificate CTA conditionally shown
  - Mock: useAuth, useProgress, useCertificates, @/content

- **ProfilePage.test.tsx** (~8 tests):
  - Pre-fills form with user data
  - Email field disabled
  - Form submission calls updateProfile.mutateAsync
  - Success/error messages
  - "Saving..." disables button while pending
  - Reset Progress button opens modal
  - Empty fields sent as null
  - Role select has 4 options
  - Mock: useAuth, useUpdateProfile

- **QuizPage.test.tsx** (~5 tests):
  - NotFound for missing moduleId, unknown module, missing quiz
  - Renders quiz title as "{module.title} Quiz"
  - Shows question count and passing score
  - Renders Quiz component
  - Mock: @/content, MemoryRouter with params

- **ModuleList.test.tsx** (~7 tests):
  - NotFound for invalid track
  - Renders track title and description
  - Separates core and track-specific modules
  - Passes progress data to ModuleCards
  - Loading spinner while progress loads
  - Works without progress (unauthenticated)
  - Back link to "/"
  - Mock: useProgress, @/content

**Test requirements**:
- 4 new test files, ~27 tests total

**Integration notes**:
- Run `./dev.sh test` — all ~213 frontend tests pass

**Demo**: All user-facing pages with data dependencies are now tested.

---

## Step 14: Frontend — Page tests (Tier 3)

**Objective**: Test remaining pages — account layout, sidebar, admin, and simple pages.

**Implementation guidance**:
- **AccountLayout.test.tsx** (~3 tests): Loading spinner, redirect when unauthenticated, renders sidebar + outlet when authenticated.
- **AccountSidebar.test.tsx** (~7 tests): User info in header, nav links, active link styling, admin link visibility for admin/non-admin, Sign Out calls logout, mobile toggle, overlay.
- **ResetProgressModal.test.tsx** (~6 tests): Three checkboxes with counts, submit disabled until checkbox + "RESET" typed, successful reset calls onClose, error display, cancel calls onClose, "Resetting..." pending state.
- **AdminUserList.test.tsx** (~8 tests): User table, loading state, search, pagination, promote/demote button visibility, delete confirmation, user detail links, admin badge.
- **AdminUserDetail.test.tsx** (~8 tests): Loading state, not found, user info, stats grid, progress/quiz/cert lists, admin actions, back link, delete with navigate.
- **Home.test.tsx** (~5 tests): Hero title, features, three TrackCards, What You'll Learn, CTA link.
- **VerifyPage.test.tsx** (~4 tests): Missing UID message, loading spinner, error state, renders CertificateVerification.

**Test requirements**:
- 7 new test files, ~41 tests total
- Admin page tests need mock admin auth state

**Integration notes**:
- Run `./dev.sh test` — all ~238 frontend tests pass
- This completes all frontend testing. Run full suite to verify.

**Demo**: Run full frontend test suite — 238 tests all green. Frontend phase complete.

---

## Step 15: E2E — Update helpers.ts + fix test quality issues

**Objective**: Prepare E2E infrastructure improvements before adding new specs.

**Implementation guidance**:
- **Update `helpers.ts`**:
  - Add `CORRECT_ANSWERS` entries for `chiropractor` and `trainer` modules
  - This requires examining the quiz YAML files in `content/quizzes/` to extract correct answers
  - Follow the same format as existing core/physician entries
- **Fix `module-progress.spec.ts`**:
  - Replace `expect(true).toBe(true)` in the "shows Get Started or Continue button" test with a meaningful assertion (e.g., check for the actual button text)
- **Fix `quiz-results.spec.ts`**:
  - Replace `if (!passed)` conditional with a deterministic test that uses `completeQuizWithFirstOptions` (known to fail for core quiz) and directly asserts failure path
- **Fix `quiz-authenticated.spec.ts`**:
  - Same pattern — make the first-option-fail test unconditional since core quiz first options are known to be wrong

**Test requirements**:
- 0 new tests, but fixes to 3 existing tests
- All 31 existing E2E specs must still pass after changes

**Integration notes**:
- Run `./dev.sh e2e` — all existing tests pass
- helpers.ts changes enable Steps 16-17

**Demo**: Run the fixed specs individually and show they now make real assertions.

---

## Step 16: E2E — Admin specs

**Objective**: Add E2E tests for admin user management — the biggest E2E gap.

**Implementation guidance**:
- **Prerequisite**: An admin test account must exist in Keycloak. Check if the existing test user is an admin (the `test_admin_auth.py` backend tests suggest admin functionality exists). If not, this step may need a second test account or a setup step that promotes the test user via API.
- **admin-protection.spec.ts** (~3 tests):
  - Unauthenticated user visiting `/account/admin` is redirected to "/"
  - Authenticated non-admin user visiting `/account/admin` is redirected or shown access denied
  - Authenticated admin user can access `/account/admin`
- **admin.spec.ts** (~10 tests):
  - Admin sees "User Management" heading with user table
  - User table shows columns (name, email, role, etc.)
  - Search filters users by name/email
  - Clicking a user navigates to detail page
  - User detail page shows progress, quiz attempts, certificates
  - Promote button visible for @bodyspec.com users
  - Promote action changes user to admin
  - Demote action removes admin status
  - Cannot self-demote (button not shown or disabled)
  - Delete user with confirmation modal

**Test requirements**:
- 2 new spec files, ~13 tests total
- Tests require admin-level authentication
- Consider using API calls in test setup to ensure admin status

**Integration notes**:
- Run `./dev.sh e2e` — all specs pass (31 existing + 2 new = 33)
- Admin flows now verified end-to-end

**Demo**: Show admin.spec.ts running in headed mode (`./dev.sh e2e --headed admin.spec.ts`).

---

## Step 17: E2E — Deep-dive content spec + final verification

**Objective**: Add deep-dive content tests and run the complete test suite for final verification.

**Implementation guidance**:
- **deep-dive-content.spec.ts** (~4 tests):
  - Each of the 4 deep-dive modules loads: bone-health, glp1-monitoring, sarcopenia, visceral-fat
  - Module page shows title and description
  - At least one section renders markdown content (>100 chars)
  - Deep-dive modules appear on the correct track pages
- **Final verification**:
  - Run `./dev.sh test` — all backend + frontend tests pass
  - Run `./dev.sh e2e` — all E2E tests pass
  - Run `./dev.sh lint` — no linting errors in new test files

**Test requirements**:
- 1 new spec file, ~4 tests total
- All deep-dive module IDs must match what's in `content/modules/`

**Integration notes**:
- Run full suite: `./dev.sh test && ./dev.sh e2e && ./dev.sh lint`
- This completes the entire testing plan

**Demo**: Full test suite output showing:
- Backend: ~156 tests passing
- Frontend: ~238 tests passing
- E2E: ~145 tests passing (~125 existing + ~20 new)
- Total: ~539 tests, all green

---

## Summary

| Step | Layer | New Tests | Running Total |
|------|-------|-----------|---------------|
| 1 | Backend | 9 | 297 |
| 2 | Backend | 9 | 306 |
| 3 | Backend | 4 | 310 |
| 4 | Backend | 7 | 317 |
| 5 | Backend | 5 | 322 |
| 6 | Backend | 11 | 333 |
| 7 | Frontend | 10 | 343 |
| 8 | Frontend | 29 | 372 |
| 9 | Frontend | 18 | 390 |
| 10 | Frontend | 23 | 413 |
| 11 | Frontend | 25 | 438 |
| 12 | Frontend | 28 | 466 |
| 13 | Frontend | 27 | 493 |
| 14 | Frontend | 41 | 534 |
| 15 | E2E | 0 (fixes) | 534 |
| 16 | E2E | 13 | 547 |
| 17 | E2E | 4 | 551 |
