# Comprehensive Testing — Design Document

## Overview

BodySpec Learn is a DEXA education platform with a Python/FastAPI backend, React/TypeScript frontend, and Playwright E2E tests. Current test coverage is partial: 110 backend unit tests (~80% of the original plan), 53 frontend unit tests (covering 10 of 43 testable files), and ~125 E2E tests across 31 spec files.

This design defines a defense-in-depth testing strategy that fills all gaps across three layers — backend unit tests, frontend unit tests, and E2E integration tests — with intentional overlap on critical paths. The goal is comprehensive functional correctness testing.

**Scope**: ~250 new tests across all three layers, bringing total coverage from ~288 tests to ~538 tests.

---

## Detailed Requirements

### R1: Defense-in-depth philosophy
Critical user paths (quiz submission, certificate lifecycle, progress tracking, authentication) must be verified at multiple layers. Overlap between layers is intentional.

### R2: All three layers covered
- Backend: Fill 46 missing test cases (15 HIGH, 14 MEDIUM, 13 LOW priority) plus 3 new test files
- Frontend: Add ~185 tests covering all 33 untested files (hooks, components, pages)
- E2E: Add ~15-25 tests for admin flows, deep-dive content, and additional track lifecycles

### R3: No CI constraints
All tests run locally. No restrictions on runtime, system dependencies, or tooling.

### R4: Functional correctness only
No accessibility, performance, or security testing in this phase.

### R5: Follow existing conventions
New tests must match existing patterns in each layer (pytest fixtures, Vitest/RTL patterns, Playwright helpers).

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    E2E (Playwright)                      │
│  Browser-level integration tests against live servers    │
│  ~125 existing + ~20 new = ~145 total                   │
│  Covers: user journeys, admin flows, cross-page state   │
├─────────────────────────────────────────────────────────┤
│              Frontend Unit (Vitest + RTL)                │
│  Component/hook/page tests with mocked APIs             │
│  ~53 existing + ~185 new = ~238 total                   │
│  Covers: rendering, interactions, state, mutations      │
├─────────────────────────────────────────────────────────┤
│              Backend Unit (pytest + asyncio)             │
│  Service/API/auth tests with in-memory SQLite           │
│  ~110 existing + ~46 new = ~156 total                   │
│  Covers: business logic, edge cases, API contracts      │
└─────────────────────────────────────────────────────────┘
```

### Layer responsibilities

| Layer | Primary responsibility | Overlap areas |
|-------|----------------------|---------------|
| Backend unit | Business logic correctness, edge cases, error paths, data integrity | Quiz scoring, certificate eligibility, auth validation |
| Frontend unit | Component rendering, user interactions, state management, API contract | Quiz flow, progress display, certificate claiming |
| E2E | Full user journeys, cross-page state, real auth flows | Quiz lifecycle, certificate lifecycle, progress tracking |

---

## Components and Interfaces

### Backend test organization

```
backend/tests/
├── conftest.py                    # (exists) Async DB session, fixtures, test user factory
├── test_quiz_service.py           # (exists, +7 tests) Edge cases for grading and attempts
├── test_progress_service.py       # (exists, no changes needed)
├── test_certificate_service.py    # (exists, +9 tests) has_active_certificate + revoke_certificate
├── test_user_service.py           # (exists, no changes needed)
├── test_auth.py                   # (exists, +9 tests) Happy paths for get_current_user, get_optional_user, validate_token
├── test_api_quiz.py               # (exists, no changes needed)
├── test_api_progress.py           # (exists, no changes needed)
├── test_api_certificates.py       # (exists, +2 tests) 409 conflict + invalid track
├── test_api_users.py              # (exists, no changes needed)
├── test_api_auth.py               # (NEW, 2 tests) GET /api/v1/auth/me dedicated tests
├── test_api_admin.py              # (exists, no changes needed)
├── test_admin_auth.py             # (exists, no changes needed)
├── test_admin_service.py          # (NEW, 10 tests) Unit tests for admin service functions
└── test_pdf_generator.py          # (NEW, 5 tests) PDF generation with WeasyPrint mock
```

### Frontend test organization

```
frontend/src/__tests__/
├── setup.ts                           # (exists) Vitest setup
│
│ # API layer (existing + 1 new)
├── api-client.test.ts                 # (exists)
├── api-progress.test.ts              # (exists)
├── api-quiz.test.ts                  # (exists)
├── api-certificates.test.ts          # (exists)
├── api-admin.test.ts                 # (NEW, ~10 tests)
│
│ # Auth components (existing)
├── ProtectedRoute.test.tsx           # (exists)
│
│ # Component tests (existing + 6 new)
├── CertificateVerification.test.tsx  # (exists)
├── ModuleCard.test.tsx               # (exists)
├── ProgressIndicator.test.tsx        # (exists)
├── QuizQuestion.test.tsx             # (exists)
├── QuizResults.test.tsx              # (exists)
├── Quiz.test.tsx                     # (NEW, ~16 tests) Full quiz flow
├── Navigation.test.tsx               # (NEW, ~7 tests)
├── SectionContent.test.tsx           # (NEW, ~7 tests) Markdown + callouts
├── Certificate.test.tsx              # (NEW, ~10 tests) PDF download, clipboard
├── Layout.test.tsx                   # (NEW, ~4 tests)
├── TrackCard.test.tsx                # (NEW, ~4 tests)
│
│ # Common components (5 new)
├── BackLink.test.tsx                 # (NEW, ~3 tests)
├── LoadingSpinner.test.tsx           # (NEW, ~3 tests)
├── NotFound.test.tsx                 # (NEW, ~4 tests)
├── PageHeader.test.tsx               # (NEW, ~4 tests)
├── SignInPrompt.test.tsx             # (NEW, ~4 tests)
│
│ # Hook tests (7 new)
├── useModules.test.ts                # (NEW, ~5 tests)
├── useProgress.test.ts               # (NEW, ~6 tests)
├── useCertificates.test.ts           # (NEW, ~4 tests)
├── useQuiz.test.ts                   # (NEW, ~3 tests)
├── useVerifyCertificate.test.ts      # (NEW, ~3 tests)
├── useUpdateProfile.test.ts          # (NEW, ~2 tests)
├── useAdmin.test.ts                  # (NEW, ~6 tests)
│
│ # Page tests (14 new)
├── Home.test.tsx                     # (NEW, ~5 tests)
├── QuizPage.test.tsx                 # (NEW, ~5 tests)
├── ModuleList.test.tsx               # (NEW, ~7 tests)
├── ModuleView.test.tsx               # (NEW, ~10 tests)
├── SectionView.test.tsx              # (NEW, ~10 tests)
├── VerifyPage.test.tsx               # (NEW, ~4 tests)
├── CertificatesPage.test.tsx         # (NEW, ~8 tests)
├── Dashboard.test.tsx                # (NEW, ~7 tests)
├── ProfilePage.test.tsx              # (NEW, ~8 tests)
├── AccountLayout.test.tsx            # (NEW, ~3 tests)
├── AccountSidebar.test.tsx           # (NEW, ~7 tests)
├── ResetProgressModal.test.tsx       # (NEW, ~6 tests)
├── AdminUserList.test.tsx            # (NEW, ~8 tests)
└── AdminUserDetail.test.tsx          # (NEW, ~8 tests)
```

### E2E test organization

```
e2e/tests/
├── helpers.ts                        # (exists, update: add chiropractor/trainer correct answers)
│
│ # New spec files
├── admin.spec.ts                     # (NEW, ~10 tests) Admin user management flows
├── admin-protection.spec.ts          # (NEW, ~3 tests) Admin route access control
├── deep-dive-content.spec.ts         # (NEW, ~4 tests) Deep-dive module pages
│
│ # Existing spec updates
├── module-progress.spec.ts           # (fix no-op assertion)
├── quiz-results.spec.ts              # (fix conditional assertions)
├── quiz-authenticated.spec.ts        # (fix conditional assertions)
```

---

## Data Models

### Backend test fixtures

**Existing fixtures** (in `conftest.py`):
- `db_session` — async SQLite in-memory session
- `test_user` — User factory with keycloak_id, email, name
- `authenticated_client` — FastAPI TestClient with mocked Keycloak auth

**New fixtures needed**:

```python
# For test_certificate_service.py
@pytest.fixture
async def active_certificate(db_session, test_user):
    """Certificate that is non-revoked and non-expired."""

@pytest.fixture
async def expired_certificate(db_session, test_user):
    """Certificate with expires_at in the past."""

@pytest.fixture
async def revoked_certificate(db_session, test_user):
    """Certificate with revoked_at set."""

# For test_pdf_generator.py
@pytest.fixture
def mock_weasyprint():
    """Mock WeasyPrint HTML().write_pdf() to return fake PDF bytes."""

# For test_auth.py
@pytest.fixture
def valid_jwt_payload():
    """Returns a dict matching Keycloak token payload structure."""

@pytest.fixture
def mock_keycloak_with_keys():
    """KeycloakAuth instance with mocked JWKS keys for token validation."""
```

### Frontend test utilities

**Existing patterns** (to reuse):
- `mockFetch` + `vi.stubGlobal('fetch', mockFetch)` for API mocking
- `vi.mock('@/auth/AuthProvider')` with `mockAuthState` for auth
- `renderWithRouter()` wrapper for components using React Router
- `mockResponse(status, data, ok)` factory for fetch responses

**New utilities needed**:

```typescript
// For hook tests — QueryClient wrapper
function renderHookWithProviders<T>(hook: () => T, options?: {
  authState?: Partial<AuthState>,
  queryClient?: QueryClient,
}) {
  // Wraps in QueryClientProvider + mocked AuthProvider
}

// For page tests — full app context wrapper
function renderPageWithProviders(ui: ReactElement, options?: {
  route?: string,
  authState?: Partial<AuthState>,
}) {
  // MemoryRouter + QueryClientProvider + mocked AuthProvider
}
```

---

## Error Handling

### Backend error scenarios to test

| Error Type | Where Tested | How |
|-----------|-------------|-----|
| 401 Unauthorized | `test_api_auth.py` | Request with no/invalid token |
| 403 Forbidden | `test_admin_auth.py` (exists) | Non-admin accessing admin endpoints |
| 404 Not Found | `test_admin_service.py` | Non-existent user_id in promote/demote/delete |
| 409 Conflict | `test_api_certificates.py` | Duplicate certificate request |
| Division by zero | `test_quiz_service.py` | Empty questions list in grade_quiz |
| None handling | `test_certificate_service.py` | revoke_certificate with invalid UID |

### Frontend error scenarios to test

| Error Type | Where Tested | How |
|-----------|-------------|-----|
| API error response | `Certificate.test.tsx` | PDF download failure shows error message |
| Empty data states | `Dashboard.test.tsx`, `CertificatesPage.test.tsx` | No progress/certificates |
| Missing route params | `QuizPage.test.tsx`, `VerifyPage.test.tsx` | No moduleId/certificateUid |
| Mutation failure | `ProfilePage.test.tsx`, `ResetProgressModal.test.tsx` | Error message display |

---

## Acceptance Criteria

### Backend

**Given** the existing 110 backend tests pass,
**When** all 46 new backend tests are added,
**Then** the total backend test count is 156 and all pass with `./dev.sh test`.

**Given** `has_active_certificate()` has no test coverage,
**When** 4 tests are added (active returns True, no cert returns False, revoked returns False, expired returns False),
**Then** all certificate issuance guard paths are verified.

**Given** `revoke_certificate()` has no test coverage,
**When** 3 tests are added (success, not found, already revoked),
**Then** certificate revocation is fully verified.

**Given** `test_pdf_generator.py` does not exist,
**When** 5 tests are created with WeasyPrint mocked,
**Then** PDF template rendering logic is verified without system dependencies.

**Given** `test_api_auth.py` does not exist,
**When** 2 tests are created (authenticated response, unauthenticated 401),
**Then** the `/api/v1/auth/me` endpoint has dedicated coverage.

**Given** `test_admin_service.py` does not exist,
**When** 10 unit tests are created for all 5 admin service functions,
**Then** admin business logic is verified independently of API routing.

**Given** quiz service tests exist but miss edge cases,
**When** 7 tests are added (empty questions, custom passing_score, multi-module filtering, etc.),
**Then** all grade_quiz and get_quiz_attempts edge cases are covered.

**Given** auth tests exist but miss happy paths,
**When** 9 tests are added (valid token flows, optional user scenarios, token validation),
**Then** both success and failure auth paths are covered.

### Frontend

**Given** frontend has 53 existing tests across 10 files,
**When** ~185 new tests are added across 33 new test files,
**Then** total frontend test count is ~238 and all pass with `./dev.sh test`.

**Given** Quiz.tsx is the most complex untested component,
**When** ~16 tests are added covering question navigation, answer tracking, authenticated/unauthenticated submission, retry, and pending states,
**Then** the complete quiz-taking flow is verified at the unit level.

**Given** zero hooks have test coverage,
**When** tests are added for all 7 hook files,
**Then** React Query integration (cache invalidation, auth gating, enabled conditions) is verified.

**Given** zero pages have test coverage,
**When** tests are added for all 14 page files,
**Then** page composition, data fetching, and conditional rendering are verified.

**Given** new tests follow existing patterns,
**When** any developer reads the test files,
**Then** they see consistent mocking strategies (vi.stubGlobal for fetch, vi.mock for auth, MemoryRouter wrapping).

### E2E

**Given** admin user management has zero E2E coverage,
**When** admin.spec.ts is created with ~10 tests,
**Then** listing, searching, promoting, demoting, and deleting users are verified end-to-end.

**Given** admin route protection has no E2E test,
**When** admin-protection.spec.ts is created with ~3 tests,
**Then** non-admin users are verified to be blocked from admin routes.

**Given** deep-dive content has no E2E tests,
**When** deep-dive-content.spec.ts is created with ~4 tests,
**Then** all 4 deep-dive modules are verified to load and render content.

**Given** helpers.ts only has correct answers for core and physician,
**When** chiropractor and trainer correct answers are added,
**Then** full lifecycle tests for all tracks become possible.

**Given** module-progress.spec.ts has a no-op assertion (`expect(true).toBe(true)`),
**When** the assertion is replaced with a meaningful check,
**Then** the test actually verifies the expected behavior.

**Given** some tests use conditional assertions (`if (!passed)`),
**When** these are replaced with deterministic test paths,
**Then** tests cannot silently pass without exercising the intended code path.

---

## Testing Strategy

### Implementation order

The implementation is organized into 5 phases, each building on the previous and resulting in a working test suite at each checkpoint.

**Phase 1: Backend gaps (HIGH priority)**
Fill critical backend gaps first since they're the fastest to write and cover the most important untested business logic.
- `test_certificate_service.py` — add `has_active_certificate` + `revoke_certificate` (9 tests)
- `test_auth.py` — add happy paths for get_current_user, get_optional_user, validate_token (9 tests)
- `test_api_certificates.py` — add 409 conflict + invalid track (2 tests)
- `test_api_auth.py` — create new file (2 tests)

**Phase 2: Backend gaps (MEDIUM + LOW priority) + new files**
- `test_quiz_service.py` — add edge cases (7 tests)
- `test_pdf_generator.py` — create new file with mocked WeasyPrint (5 tests)
- `test_admin_service.py` — create new file (10 tests)
- Remaining LOW priority cases (2 tests from cert service)

**Phase 3: Frontend — hooks + API + common components**
Build the foundation for frontend testing: shared test utilities, hook tests, and simple components.
- Create `renderHookWithProviders` and `renderPageWithProviders` helpers
- `api-admin.test.ts` (10 tests)
- All 7 hook test files (29 tests)
- All 5 common component test files (18 tests)

**Phase 4: Frontend — complex components + pages**
- `Quiz.test.tsx` (16 tests) — highest priority component
- `Navigation.test.tsx`, `SectionContent.test.tsx`, `Certificate.test.tsx`, `Layout.test.tsx`, `TrackCard.test.tsx` (32 tests)
- All 14 page test files (80 tests)

**Phase 5: E2E gaps + quality fixes**
- Update `helpers.ts` with chiropractor/trainer correct answers
- `admin.spec.ts` (10 tests)
- `admin-protection.spec.ts` (3 tests)
- `deep-dive-content.spec.ts` (4 tests)
- Fix no-op and conditional assertions in existing specs

### Test execution

All tests run via existing `./dev.sh` commands:
- `./dev.sh test` — backend (pytest) + frontend (vitest)
- `./dev.sh e2e` — Playwright E2E tests
- `./dev.sh lint` — run before committing

### Defense-in-depth coverage matrix

| Critical Path | Backend Unit | Frontend Unit | E2E |
|--------------|-------------|---------------|-----|
| Quiz scoring (pass/fail) | grade_quiz edge cases | Quiz.tsx auth/unauth paths | quiz-authenticated.spec.ts |
| Section progress tracking | mark_section_complete idempotency | SectionView.tsx mark-complete | section-progress.spec.ts |
| Certificate eligibility | has_active_certificate | CertificatesPage.tsx eligibility | certificate-lifecycle.spec.ts |
| Certificate issuance (409) | API 409 conflict test | CertificatesPage.tsx error state | certificate-lifecycle.spec.ts |
| Certificate revocation | revoke_certificate unit | — (no UI for revocation) | — |
| Auth flow | validate_token, get_current_user | Navigation.tsx auth states | auth.spec.ts |
| Admin access control | get_admin_user 403 | AccountSidebar.tsx admin link | admin-protection.spec.ts |
| PDF download | generate_certificate_pdf | Certificate.tsx download flow | account-features.spec.ts |
| Reset progress | — (tested via API) | ResetProgressModal.tsx | account-features.spec.ts |

---

## Appendices

### A. Technology choices

| Layer | Tool | Rationale |
|-------|------|-----------|
| Backend | pytest + pytest-asyncio | Already in use; async support for SQLAlchemy |
| Backend DB | SQLite in-memory | Already in use; fast, no external deps |
| Backend mocking | unittest.mock | Already in use; patches for Keycloak, WeasyPrint, filesystem |
| Frontend | Vitest + @testing-library/react | Already in use; fast, good React support |
| Frontend mocking | vi.stubGlobal (fetch), vi.mock (modules) | Already in use; consistent patterns |
| E2E | Playwright (Chromium) | Already in use; 31 specs established |
| E2E auth | Shared Keycloak session (serial execution) | Already in use; avoids test account conflicts |

### B. Research findings summary

1. **Backend**: 46 precise missing test cases identified across 7 files. Most critical: `has_active_certificate()` and `revoke_certificate()` are entirely untested — these guard certificate issuance and revocation. See `research/backend-gaps.md`.

2. **Frontend**: 33 files with zero test coverage. Quiz.tsx is the most complex untested component (multi-step flow, dual auth/unauth submission paths, local result calculation). All hooks lack tests, meaning React Query cache invalidation patterns are unverified. See `research/frontend-audit.md`.

3. **E2E**: 31 specs provide strong journey coverage but have zero admin testing, no deep-dive content tests, and some test quality issues (no-op assertions, conditional tests, hardcoded waits). See `research/e2e-audit.md`.

### C. Alternative approaches considered

1. **Skip frontend page tests, rely on E2E**: Rejected — defense-in-depth requires unit-level verification of page rendering and conditional logic. E2E tests are slower and more brittle.

2. **Use MSW (Mock Service Worker) instead of vi.stubGlobal for fetch**: Not adopted — existing tests consistently use `vi.stubGlobal('fetch', mockFetch)`. Switching to MSW would create inconsistency. Could be reconsidered in a future refactor.

3. **Add snapshot tests for components**: Not adopted — snapshot tests are brittle and provide low signal for this codebase where components are actively evolving.

4. **Skip admin service unit tests since API tests exist**: Rejected — API tests couple routing + auth + service logic. Unit tests isolate business logic edge cases (e.g., promote non-existent user, cascade delete verification).

### D. Test count summary

| Layer | Existing | New | Total |
|-------|---------|-----|-------|
| Backend unit | 110 | 46 | 156 |
| Frontend unit | 53 | 185 | 238 |
| E2E | ~125 | ~20 | ~145 |
| **Total** | **~288** | **~251** | **~539** |

### E. Files to create (new)

**Backend (3 files):**
- `backend/tests/test_api_auth.py`
- `backend/tests/test_admin_service.py`
- `backend/tests/test_pdf_generator.py`

**Frontend (33 files):**
- 1 API test: `api-admin.test.ts`
- 6 component tests: `Quiz.test.tsx`, `Navigation.test.tsx`, `SectionContent.test.tsx`, `Certificate.test.tsx`, `Layout.test.tsx`, `TrackCard.test.tsx`
- 5 common component tests: `BackLink.test.tsx`, `LoadingSpinner.test.tsx`, `NotFound.test.tsx`, `PageHeader.test.tsx`, `SignInPrompt.test.tsx`
- 7 hook tests: `useModules.test.ts`, `useProgress.test.ts`, `useCertificates.test.ts`, `useQuiz.test.ts`, `useVerifyCertificate.test.ts`, `useUpdateProfile.test.ts`, `useAdmin.test.ts`
- 14 page tests: `Home.test.tsx`, `QuizPage.test.tsx`, `ModuleList.test.tsx`, `ModuleView.test.tsx`, `SectionView.test.tsx`, `VerifyPage.test.tsx`, `CertificatesPage.test.tsx`, `Dashboard.test.tsx`, `ProfilePage.test.tsx`, `AccountLayout.test.tsx`, `AccountSidebar.test.tsx`, `ResetProgressModal.test.tsx`, `AdminUserList.test.tsx`, `AdminUserDetail.test.tsx`

**E2E (3 files):**
- `e2e/tests/admin.spec.ts`
- `e2e/tests/admin-protection.spec.ts`
- `e2e/tests/deep-dive-content.spec.ts`

### F. Files to modify (existing)

**Backend (4 files):**
- `backend/tests/test_certificate_service.py` (+9 tests)
- `backend/tests/test_auth.py` (+9 tests)
- `backend/tests/test_quiz_service.py` (+7 tests)
- `backend/tests/test_api_certificates.py` (+2 tests)

**E2E (4 files):**
- `e2e/tests/helpers.ts` (add chiropractor/trainer correct answers)
- `e2e/tests/module-progress.spec.ts` (fix no-op assertion)
- `e2e/tests/quiz-results.spec.ts` (fix conditional assertions)
- `e2e/tests/quiz-authenticated.spec.ts` (fix conditional assertions)
