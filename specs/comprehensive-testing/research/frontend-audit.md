# Frontend Unit Test Audit

Comprehensive audit of `/Users/rshi/workspace/bodyspec/images/learn-v1/frontend/src/` to identify testing gaps and document what needs coverage.

---

## Table of Contents

1. [Existing Test Coverage Summary](#existing-test-coverage-summary)
2. [Testing Patterns in Use](#testing-patterns-in-use)
3. [Hooks Audit](#hooks-audit)
4. [Components Audit](#components-audit)
5. [Pages Audit](#pages-audit)
6. [Priority Recommendations](#priority-recommendations)

---

## Existing Test Coverage Summary

### Files with tests (11 test files total)

| Test File | What It Tests | Category |
|-----------|--------------|----------|
| `api-client.test.ts` | `apiClient` GET/POST/PUT/DELETE, `ApiError`, 204 handling | API layer |
| `api-progress.test.ts` | `getProgress`, `markSectionComplete` API functions | API layer |
| `api-quiz.test.ts` | `submitQuiz`, `getQuizAttempts` API functions | API layer |
| `api-certificates.test.ts` | `getCertificates`, `requestCertificate`, `verifyCertificate` API functions | API layer |
| `ProtectedRoute.test.tsx` | Loading spinner, sign-in prompt, login callback, children render | Auth component |
| `CertificateVerification.test.tsx` | Valid, not_found, revoked, expired states, expiry date display | Component |
| `ModuleCard.test.tsx` | Title, description, time, sections, link, progress, deep dive badge | Component |
| `ProgressIndicator.test.tsx` | Percentage label, clamping, fractional rounding, size classes, label toggle | Component |
| `QuizQuestion.test.tsx` | Question text, options, selection callback, highlighting, result mode, scenario badge | Component |
| `QuizResults.test.tsx` | Pass/fail display, retry button, certificate eligibility link, sign-in prompt, question review | Component |

### Files WITHOUT tests (not covered at all)

**Hooks (0 of 7 hook files tested):**
- `useModules.ts`
- `useProgress.ts` (useProgress + useMarkSectionComplete)
- `useCertificates.ts` (useCertificates + useRequestCertificate)
- `useQuiz.ts` (useSubmitQuiz)
- `useVerifyCertificate.ts`
- `useUpdateProfile.ts`
- `useAdmin.ts` (useAdminUsers, useAdminUserDetail, usePromoteUser, useDemoteUser, useDeleteUser, useResetProgress)

**Components (6 untested):**
- `Quiz.tsx`
- `Navigation.tsx`
- `SectionContent.tsx`
- `Certificate.tsx`
- `Layout.tsx`
- `TrackCard.tsx`
- `common/BackLink.tsx`
- `common/LoadingSpinner.tsx`
- `common/NotFound.tsx`
- `common/PageHeader.tsx`
- `common/SignInPrompt.tsx`

**Pages (0 of 15 page files tested):**
- `Home.tsx`
- `QuizPage.tsx`
- `ModuleList.tsx`
- `ModuleView.tsx`
- `SectionView.tsx`
- `VerifyPage.tsx`
- `CertificatesPage.tsx`
- `Dashboard.tsx`
- `ProfilePage.tsx`
- `account/AccountLayout.tsx`
- `account/AccountSidebar.tsx`
- `account/ResetProgressModal.tsx`
- `account/admin/AdminUserList.tsx`
- `account/admin/AdminUserDetail.tsx`

**API layer (1 untested):**
- `api/admin.ts` (getAdminUsers, getAdminUserDetail, promoteUser, demoteUser, deleteUser, resetProgress)

---

## Testing Patterns in Use

### Test Framework & Setup

- **Framework**: Vitest with jsdom environment
- **Test location**: `src/__tests__/*.test.{ts,tsx}`
- **Setup file**: `src/__tests__/setup.ts` -- imports `@testing-library/jest-dom/vitest` and calls `cleanup()` after each test
- **Config**: Defined in `vite.config.ts` under `test.projects[0]` (the "unit" project)

### Import Pattern

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
```

### Mocking Strategies

**1. Global fetch mocking (API tests)**
```typescript
const mockFetch = vi.fn()
beforeEach(() => { vi.stubGlobal('fetch', mockFetch) })
afterEach(() => { vi.unstubAllGlobals() })  // or vi.restoreAllMocks()
```

**2. Module-level vi.mock for AuthProvider (component tests)**
```typescript
vi.mock('@/auth/AuthProvider', () => ({
  useAuth: () => mockAuthState,
}))

let mockAuthState: { user: unknown; isAuthenticated: boolean; ... }
```
The `mockAuthState` variable is declared at module scope and mutated in `beforeEach` via a `resetMockAuth()` helper.

**3. Mock response factory (API tests)**
```typescript
function mockResponse(status: number, data: unknown, ok = true) {
  return {
    ok,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    json: vi.fn().mockResolvedValue(data),
  }
}
```

### Router Wrapping

Components using `<Link>` or `useLocation` are wrapped in `<MemoryRouter>`:
```typescript
function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}
```

### Assertion Patterns

- `screen.getByText()` / `screen.queryByText()` for text presence/absence
- `screen.getByRole('link')` + `.toHaveAttribute('href', ...)` for link targets
- `container.querySelector('.class-name')` for CSS class checks
- `fireEvent.click()` for user interactions
- `expect(vi.fn()).toHaveBeenCalledOnce()` for callback verification
- Direct `className` string checks: `expect(buttons[0].className).toContain('border-green-500')`

### Test Structure Convention

- Flat `describe` blocks, one per component/module
- `it` descriptions are short, descriptive, and start with a verb
- No nested `describe` unless grouping by HTTP method (API tests)
- No `test.each` patterns used yet
- Props are defined as consts at the top of `describe` blocks

---

## Hooks Audit

### 1. `useModules` (`/frontend/src/hooks/useModules.ts`)

**What it does**: A simple synchronous wrapper that returns content-loading functions from `@/content`. It exposes `modules` (all modules), `getModule`, `getModulesByTrack`, `getQuiz`, and `getSectionContent`.

**Parameters**: None.

**Returns**: `{ modules, getModule, getModulesByTrack, getQuiz, getSectionContent }`

**What to test**:
- Returns the correct shape (all 5 properties)
- `modules` returns an array of Module objects
- `getModulesByTrack('physician')` filters correctly
- `getModule('core')` returns a valid module or undefined for unknown IDs
- `getQuiz('core')` returns a quiz object or null
- `getSectionContent('core', '01-how-dexa-works')` returns a string or null

**Mocking needed**: Mock `@/content` module functions (they import YAML files at build time).

**Priority**: Low -- thin wrapper around content imports, low risk of bugs.

---

### 2. `useProgress` (`/frontend/src/hooks/queries/useProgress.ts`)

**Exports**: `useProgress()`, `useMarkSectionComplete()`

**useProgress()**:
- Uses `useQuery` with key `['progress']`
- Calls `getProgress(token!)`
- Only enabled when `isAuthenticated && !!token`
- Returns `{ progress, isLoading, error, isAuthenticated, refetch }`

**useMarkSectionComplete()**:
- Uses `useMutation` calling `markSectionComplete(token!, moduleId, sectionSlug)`
- On success: invalidates `queryKeys.progress.all`
- Returns the mutation object

**What to test**:
- `useProgress` returns `null` progress when not authenticated
- `useProgress` returns `null` progress when token is missing
- `useProgress` fetches and returns progress data when authenticated
- `useProgress` sets `isLoading` appropriately
- `useMarkSectionComplete` calls the API with correct params
- `useMarkSectionComplete` invalidates progress cache on success

**Mocking needed**: Mock `@/auth/AuthProvider` (useAuth), `@/api/progress`, wrap in `QueryClientProvider`.

**Priority**: Medium -- core user-facing feature, but the React Query layer is fairly standard.

---

### 3. `useCertificates` (`/frontend/src/hooks/queries/useCertificates.ts`)

**Exports**: `useCertificates()`, `useRequestCertificate()`

**useCertificates()**:
- Uses `useQuery` with key `['certificates']`
- Calls `getCertificates(token!)`, extracts `.certificates` array
- Enabled when `isAuthenticated && !!token`
- Returns `{ certificates, isLoading, error, refetch }`

**useRequestCertificate()**:
- Uses `useMutation` calling `requestCertificate(token!, track)`
- On success: invalidates `queryKeys.certificates.all`

**What to test**:
- Returns empty array when not authenticated
- Extracts `.certificates` from API response correctly
- `useRequestCertificate` sends track parameter
- Cache invalidation on success

**Mocking needed**: Same as useProgress pattern.

**Priority**: Medium.

---

### 4. `useSubmitQuiz` (`/frontend/src/hooks/queries/useQuiz.ts`)

**Exports**: `useSubmitQuiz()`

**What it does**:
- Uses `useMutation` calling `submitQuiz(token!, submission)`
- On success: invalidates both `queryKeys.progress.all` AND `queryKeys.quiz.attempts(variables.module_id)`

**What to test**:
- Calls `submitQuiz` with token and submission payload
- Invalidates both progress and quiz attempts caches on success
- `variables.module_id` is correctly used for quiz attempts cache key

**Mocking needed**: Mock `useAuth`, `@/api/quiz`, wrap in `QueryClientProvider`.

**Priority**: Medium-High -- quiz submission is a critical path.

---

### 5. `useVerifyCertificate` (`/frontend/src/hooks/queries/useVerifyCertificate.ts`)

**Exports**: `useVerifyCertificate(uid)`

**What it does**:
- Uses `useQuery` with key `['verify', uid!]`
- Calls `verifyCertificate(uid!)` -- no auth token required
- Only enabled when `!!uid`

**What to test**:
- Does not fetch when uid is undefined
- Fetches and returns verification data when uid is provided
- Returns correct query states (loading, error, data)

**Mocking needed**: Mock `@/api/certificates` (verifyCertificate). No auth mock needed.

**Priority**: Low -- simple read-only query.

---

### 6. `useUpdateProfile` (`/frontend/src/hooks/queries/useUpdateProfile.ts`)

**Exports**: `useUpdateProfile()`

**What it does**:
- Uses `useMutation` calling `apiClient.put<User>('/users/me', data, token)`
- Accepts `{ name, role_type, organization }` as ProfileUpdate
- No cache invalidation on success

**What to test**:
- Calls PUT /users/me with correct data and token
- Returns mutation states (isPending, isError, etc.)

**Mocking needed**: Mock `useAuth`, `@/api/client`.

**Priority**: Low.

---

### 7. `useAdmin` (`/frontend/src/hooks/queries/useAdmin.ts`)

**Exports**: `useAdminUsers`, `useAdminUserDetail`, `usePromoteUser`, `useDemoteUser`, `useDeleteUser`, `useResetProgress`

**useAdminUsers(page, search)**:
- Enabled only when `isAuthenticated && !!token && !!user?.is_admin`
- Uses custom `adminKeys.users(page, search)` query key
- Calls `getAdminUsers(token!, { page, per_page: 25, search })`

**useAdminUserDetail(userId)**:
- Enabled only when admin + userId exists
- Calls `getAdminUserDetail(token!, userId)`

**usePromoteUser, useDemoteUser, useDeleteUser**:
- Each is a mutation that calls the respective admin API
- All invalidate `['admin']` query key on success

**useResetProgress**:
- Mutation calling `resetProgress(token!, data)` where data is `{ sections, quizzes, certificates }`
- On success: invalidates both `progress` and `certificates` caches

**What to test**:
- Admin queries disabled for non-admin users
- Admin queries disabled when not authenticated
- Each mutation calls the correct API function
- Correct cache invalidation patterns
- `useResetProgress` invalidates both progress AND certificates

**Mocking needed**: Mock `useAuth` (with admin user), `@/api/admin`, wrap in `QueryClientProvider`.

**Priority**: Medium -- admin functionality, but lower user count.

---

## Components Audit

### Already tested components (for reference)

| Component | File | Test Coverage |
|-----------|------|---------------|
| `CertificateVerification` | `CertificateVerification.tsx` | Valid, not_found, revoked, expired states; expiry; verified badge |
| `ModuleCard` | `ModuleCard.tsx` | Title, description, time, sections, link, progress bar, deep dive badge |
| `ProgressIndicator` | `ProgressIndicator.tsx` | Percentage, clamping, rounding, sizes, label visibility |
| `QuizQuestion` | `QuizQuestion.tsx` | Question text, options, selection, highlighting, result mode, scenario badge |
| `QuizResults` | `QuizResults.tsx` | Pass/fail, retry, certificate eligibility, sign-in prompt, question review |
| `ProtectedRoute` | `auth/ProtectedRoute.tsx` | Loading, unauthenticated, authenticated states |

### Untested Components

#### `Quiz.tsx` (`/frontend/src/components/Quiz.tsx`) -- HIGHEST PRIORITY

**What it renders**: The full quiz-taking flow. Shows one question at a time with Previous/Next navigation, a progress bar, and a Submit button on the last question. After submission, it switches to the `QuizResults` view.

**Props**: `{ quiz: Quiz, onComplete?: (result) => void }`

**Internal state**: `currentQuestion`, `answers` (Record<string, number>), `result` (QuizSubmissionResult | null), `startTime`, `showLocalResults`

**Dependencies**: `useAuth()`, `useSubmitQuiz()`, `QuizQuestion`, `QuizResults`

**Key behaviors to test**:
1. Renders first question on mount with "Question 1 of N" label
2. Shows "0 of N answered" initially
3. Clicking an option updates the answer count display
4. "Next" button advances to the next question
5. "Previous" button goes back (disabled on first question)
6. "Submit Quiz" button appears only on the last question
7. "Submit Quiz" is disabled until all questions are answered
8. **Authenticated path**: Submit calls `submitQuizMutation.mutateAsync` with module_id, answers, and time_spent_seconds
9. **Unauthenticated path**: Submit calculates results locally via `calculateLocalResult()`
10. Local result always has `certificate_eligible: false`
11. After submission, renders `QuizResults` component
12. `onComplete` callback is called with the result
13. "Try Again" (via QuizResults onRetry) resets all state
14. Progress bar width updates as user navigates questions
15. Shows "Submitting..." text while mutation is pending
16. `showSignInPrompt` is true for local results when not authenticated

**Mocking needed**: `useAuth()`, `useSubmitQuiz()` (return a mock mutation object with `mutateAsync` and `isPending`)

---

#### `Navigation.tsx` (`/frontend/src/components/Navigation.tsx`)

**What it renders**: Top navigation bar with BodySpec logo, track links (Physicians, Chiropractors, Trainers), and auth-dependent right side (Sign in button or Account link). Mobile hamburger menu toggles visibility.

**Dependencies**: `useAuth()`, `react-router-dom` Link

**Key behaviors to test**:
1. Renders BodySpec branding with link to "/"
2. Shows three track links (Physicians, Chiropractors, Trainers) with correct hrefs
3. When not authenticated: shows "Sign in" button that calls `login()`
4. When authenticated: shows Account link to "/account/dashboard" with User icon
5. Mobile menu toggle: clicking hamburger shows/hides mobile track links
6. Mobile menu closes when a link is clicked (via `onClick` handler)
7. Hamburger button only visible on small screens (has `sm:hidden` class)

**Mocking needed**: `useAuth()`, `MemoryRouter`

---

#### `SectionContent.tsx` (`/frontend/src/components/SectionContent.tsx`)

**What it renders**: Markdown content using `ReactMarkdown` with custom component overrides for callouts, images, tables.

**Props**: `{ content: string }`

**Key behaviors to test**:
1. Renders basic markdown (headings, paragraphs, bold, links)
2. `processCallouts()` transforms `:::note ... :::` into `<div class="callout-note">` blocks
3. Callout types: note, warning, tip, clinical
4. Custom `<img>` gets `rounded-lg shadow-md` classes and `loading="lazy"`
5. Tables are wrapped in `overflow-x-auto` div
6. GFM (GitHub Flavored Markdown) features work (tables, strikethrough)
7. Raw HTML passthrough via `rehype-raw`

**Mocking needed**: None (pure presentational). Consider testing `processCallouts` as a unit function if exported.

---

#### `Certificate.tsx` (`/frontend/src/components/Certificate.tsx`)

**What it renders**: A certificate card showing track title, certificate ID, recipient name, issued date, optional expiry date, a "Download PDF" button, and a "Copy Verify Link" button.

**Props**: `{ certificate: Certificate }`

**Dependencies**: `useAuth()` (for token)

**Key behaviors to test**:
1. Renders track title from `trackTitles` map (physician -> "Clinical Applications", etc.)
2. Falls back to `certificate.track` for unknown tracks
3. Shows certificate UID, recipient name, and formatted issued date
4. Shows expiry date only when `certificate.expires_at` is present
5. "Copy Verify Link" copies `${origin}/verify/${uid}` to clipboard, shows "Copied!" for 2 seconds
6. "Download PDF" fetches `/api/v1/certificates/${uid}/pdf` with auth header
7. Download creates a temporary `<a>` element and triggers download
8. Shows "Downloading..." while PDF is being fetched
9. Shows error message on download failure
10. Download button does nothing when token is null

**Mocking needed**: `useAuth()`, `navigator.clipboard.writeText`, `fetch` (for PDF download), `URL.createObjectURL/revokeObjectURL`, `document.createElement`

---

#### `Layout.tsx` (`/frontend/src/components/Layout.tsx`)

**What it renders**: Page shell with Navigation at top, `<Outlet />` for child routes, and a footer with copyright year, BodySpec.com link, Privacy link, and Terms link.

**Dependencies**: `Navigation`, `react-router-dom` Outlet

**Key behaviors to test**:
1. Renders Navigation component
2. Renders footer with current year
3. Footer links point to bodyspec.com, privacy, and terms with `target="_blank"`
4. `<Outlet />` renders child route content

**Mocking needed**: `MemoryRouter`, mock `useAuth` (for Navigation)

---

#### `TrackCard.tsx` (`/frontend/src/components/TrackCard.tsx`)

**What it renders**: A clickable card linking to `/track/${id}` with an icon, title, description, and "Start learning" CTA.

**Props**: `{ id: string, title: string, description: string, icon: LucideIcon }`

**Key behaviors to test**:
1. Renders title and description text
2. Links to `/track/${id}`
3. Renders the provided icon component
4. Shows "Start learning" text

**Mocking needed**: `MemoryRouter`

**Priority**: Low -- simple presentational component.

---

#### Common Components

##### `BackLink.tsx` (`/frontend/src/components/common/BackLink.tsx`)

**Props**: `{ to: string, label: string, className?: string }`

**Tests needed**:
1. Renders link with correct `to` path
2. Displays label text
3. Includes ArrowLeft icon
4. Uses default `className="mb-6"` when not provided
5. Applies custom className when provided

**Priority**: Low.

---

##### `LoadingSpinner.tsx` (`/frontend/src/components/common/LoadingSpinner.tsx`)

**Props**: `{ message?: string, fullHeight?: boolean }`

**Tests needed**:
1. Renders spinner element (`.animate-spin`)
2. Shows message when provided
3. Hides message when not provided
4. Uses `min-h-[50vh]` when `fullHeight=true` (default)
5. Uses `py-8` when `fullHeight=false`

**Priority**: Low.

---

##### `NotFound.tsx` (`/frontend/src/components/common/NotFound.tsx`)

**Props**: `{ title: string, message?: string, backTo?: string, backLabel?: string }`

**Tests needed**:
1. Renders title text
2. Shows message when provided
3. Hides message when not provided
4. Link defaults to "/" with label "Back to Home"
5. Custom `backTo` and `backLabel` work

**Priority**: Low.

---

##### `PageHeader.tsx` (`/frontend/src/components/common/PageHeader.tsx`)

**Props**: `{ title: string, description?: string, backTo?: string, backLabel?: string, badge?: ReactNode, children?: ReactNode }`

**Tests needed**:
1. Renders title as h1
2. Shows description when provided
3. Shows BackLink when both `backTo` and `backLabel` provided
4. Hides BackLink when either is missing
5. Renders badge node
6. Renders children

**Priority**: Low.

---

##### `SignInPrompt.tsx` (`/frontend/src/components/common/SignInPrompt.tsx`)

**Props**: `{ message?: string, compact?: boolean }`

**Dependencies**: `useAuth()` (for `login`)

**Tests needed**:
1. Default mode: renders message text and "Sign In" button
2. Default message text when not provided
3. Custom message text when provided
4. Compact mode: renders inline "Sign in to save progress" button
5. Clicking button calls `login()`

**Priority**: Low-Medium -- used in multiple pages.

---

## Pages Audit

### `Home.tsx` (`/frontend/src/pages/Home.tsx`)

**What it renders**: Landing page with hero section (title, description, feature badges), three TrackCard components for physician/chiropractor/trainer, "What You'll Learn" section with 4 feature cards, and bottom CTA.

**Data**: Static -- no hooks, no API calls, no auth dependency.

**Key behaviors to test**:
1. Renders hero title "DEXA Education for Healthcare Professionals"
2. Shows three features: "Self-paced learning", "~2 hours total", "Certificate on completion"
3. "Get started" link points to `/track/physician`
4. Renders three TrackCards with correct props
5. "What You'll Learn" section has 4 items: DEXA Technology, Key Metrics, Report Reading, Patient Communication
6. Bottom CTA links to `/track/physician`

**Mocking needed**: `MemoryRouter` only.

**Priority**: Low -- static content, no logic.

---

### `QuizPage.tsx` (`/frontend/src/pages/QuizPage.tsx`)

**What it renders**: Loads a module and quiz by `moduleId` param, renders `Quiz` component. Shows NotFound states for missing module/quiz.

**Dependencies**: `useParams`, `getModule`, `getQuiz`, `Quiz`, `NotFound`, `BackLink`

**Key behaviors to test**:
1. Shows "Quiz Not Found" when `moduleId` is missing
2. Shows "Module Not Found" when module doesn't exist
3. Shows "Quiz Not Found" with back link when module exists but quiz doesn't
4. Renders quiz title as "{module.title} Quiz"
5. Shows question count and passing score
6. Renders `Quiz` component with correct quiz data

**Mocking needed**: `MemoryRouter` with route params, mock `@/content` functions.

---

### `ModuleList.tsx` (`/frontend/src/pages/ModuleList.tsx`)

**What it renders**: Lists modules for a track, separated into "Core Fundamentals" and track-specific sections. Shows progress via `ModuleCard`.

**Dependencies**: `useParams`, `useProgress()`, `getModulesByTrack`, `getTrackInfo`, `ModuleCard`, `NotFound`, `BackLink`, `LoadingSpinner`

**Key behaviors to test**:
1. Shows "Track Not Found" for invalid track param
2. Renders track title and description from `getTrackInfo`
3. Separates core modules and track-specific modules
4. Shows "Core Fundamentals" heading for core modules
5. Shows track-specific heading (e.g., "Clinical Applications" for physician)
6. Passes progress data (sectionsComplete, isComplete) to ModuleCards
7. Shows loading spinner while progress is loading
8. Back link points to "/"
9. Works without progress data (unauthenticated)

**Mocking needed**: `MemoryRouter` with params, mock `useProgress`, mock `@/content`.

---

### `ModuleView.tsx` (`/frontend/src/pages/ModuleView.tsx`)

**What it renders**: Single module detail page with sections list, progress indicator, quiz link, and sign-in prompt for unauthenticated users.

**Dependencies**: `useParams`, `useNavigate`, `useProgress()`, `getModule`, `getQuiz`, `ProgressIndicator`, `NotFound`, `BackLink`, `SignInPrompt`

**Key behaviors to test**:
1. Shows "Module Not Found" for missing/invalid moduleId
2. Renders module title, description, estimated time, section count
3. Lists all sections with checkmarks for completed ones
4. Shows overall progress percentage for authenticated users
5. Hides progress indicator for unauthenticated users
6. Shows "Complete" badge when quiz has been passed
7. Shows "Take Quiz" button when quiz exists and not passed
8. Shows "Passed" label when quiz is passed
9. Shows "Get Started" button linking to first incomplete section
10. Shows "Continue" when some sections are done
11. Hides start/continue when all sections complete
12. Shows SignInPrompt for unauthenticated users
13. "Deep Dive" badge for deep dive modules
14. Back link points to `/track/{module.track}`

**Mocking needed**: `MemoryRouter` with params, `useNavigate`, mock `useProgress`, mock `@/content`.

---

### `SectionView.tsx` (`/frontend/src/pages/SectionView.tsx`)

**What it renders**: Single section content page with navigation (prev/next), "Continue" button that marks section complete, and sign-in prompt.

**Dependencies**: `useParams`, `useNavigate`, `useAuth`, `useProgress`, `useMarkSectionComplete`, `getModule`, `getSectionContent`, `SectionContent`, `NotFound`, `BackLink`, `SignInPrompt`

**Key behaviors to test**:
1. Shows "Section Not Found" for missing params or unknown section slug
2. Shows "Module Not Found" for unknown module
3. Renders section title and "Section X of Y" label
4. Shows "Complete" badge for completed sections
5. Renders markdown content via SectionContent
6. Shows "Content not available yet" when content is null
7. Previous link navigates to prior section (absent on first section)
8. "Continue" button: if authenticated, calls `markComplete.mutateAsync()` then navigates
9. "Continue" button: if unauthenticated, just navigates (no API call)
10. On last section: button text is "Finish & View Module", navigates to module page
11. Scrolls to top on section change (`useEffect` with `sectionSlug` dependency)
12. Shows SignInPrompt for unauthenticated users

**Mocking needed**: `MemoryRouter` with params, `useNavigate`, mock `useAuth`, `useProgress`, `useMarkSectionComplete`, `@/content`.

---

### `VerifyPage.tsx` (`/frontend/src/pages/VerifyPage.tsx`)

**What it renders**: Certificate verification page. Shows loading spinner, error state, or `CertificateVerification` component.

**Dependencies**: `useParams`, `useVerifyCertificate`

**Key behaviors to test**:
1. Shows "No Certificate ID Provided" when `certificateUid` is missing
2. Shows loading spinner with "Verifying certificate..." message
3. Shows "Verification Failed" error message on error
4. Renders `CertificateVerification` component when data is available
5. Shows page title "Certificate Verification"

**Mocking needed**: `MemoryRouter` with params, mock `useVerifyCertificate`.

---

### `CertificatesPage.tsx` (`/frontend/src/pages/CertificatesPage.tsx`)

**What it renders**: User's certificates page with earned certificates and available tracks. Shows eligibility status and "Claim Certificate" button.

**Dependencies**: `useCertificates`, `useRequestCertificate`, `useProgress`, `Certificate`

**Key behaviors to test**:
1. Shows loading spinner while loading
2. Renders earned certificates using Certificate component
3. Shows "Earned Certificates" heading when certificates exist
4. Shows "Available Tracks" heading when no certificates
5. Shows "Other Tracks" heading when some certificates exist
6. Eligibility check: all required modules must have passed quizzes
7. Shows "Claim Certificate" button for eligible tracks
8. Shows "Processing..." while request is pending
9. Shows requirements text for ineligible tracks
10. Shows empty state when no certificates and none eligible
11. Error display for failed certificate requests
12. Clicking "Claim Certificate" calls `requestCert.mutate(trackId)`

**Mocking needed**: Mock `useCertificates`, `useRequestCertificate`, `useProgress`. Wrap in `MemoryRouter` (for Certificate's Link).

---

### `Dashboard.tsx` (`/frontend/src/pages/Dashboard.tsx`)

**What it renders**: User dashboard with welcome message, quick stats (sections completed, quizzes passed, certificates earned), track progress bars, recent activity, and certificates CTA.

**Dependencies**: `useAuth`, `useProgress`, `useCertificates`, `getModules`, `getTrackInfo`, `ProgressIndicator`, `LoadingSpinner`

**Key behaviors to test**:
1. Shows LoadingSpinner while data is loading
2. Welcome message with user's name (falls back to email)
3. Quick stats cards show correct counts
4. Track progress calculates correctly (core modules counted for each track)
5. Shows "Certified" badge for tracks with certificates
6. "Continue" links point to correct track pages
7. Recent activity shows last 5 completed sections in reverse order
8. Certificate CTA appears when user has certificates
9. Correct pluralization: "certificate" vs "certificates"

**Mocking needed**: Mock `useAuth`, `useProgress`, `useCertificates`, `@/content`.

---

### `ProfilePage.tsx` (`/frontend/src/pages/ProfilePage.tsx`)

**What it renders**: Profile settings form with email (read-only), name, role type (select), organization fields. Includes danger zone with reset progress button.

**Dependencies**: `useAuth`, `useUpdateProfile`, `ResetProgressModal`

**Key behaviors to test**:
1. Pre-fills form with user data
2. Email field is disabled
3. Name, role, organization are editable
4. Form submission calls `updateProfile.mutateAsync()` with correct data
5. Shows success message on successful update
6. Shows error message on failed update
7. "Save Changes" button shows "Saving..." while pending
8. "Saving..." disables the submit button
9. "Reset Progress..." button opens ResetProgressModal
10. Modal closes via `onClose` callback
11. Empty name/role/organization sent as `null`
12. Role select has 4 options + empty default

**Mocking needed**: Mock `useAuth`, `useUpdateProfile` mutation, `useProgress` and `useCertificates` (for ResetProgressModal).

---

### `AccountLayout.tsx` (`/frontend/src/pages/account/AccountLayout.tsx`)

**What it renders**: Account page shell with sidebar and content area via `<Outlet />`. Redirects to "/" if not authenticated.

**Dependencies**: `useAuth`, `AccountSidebar`

**Key behaviors to test**:
1. Shows loading spinner while auth is loading
2. Redirects to "/" when not authenticated
3. Renders sidebar and Outlet when authenticated
4. Sidebar toggle state management (open/close)

**Mocking needed**: Mock `useAuth`, `MemoryRouter` with routes.

---

### `AccountSidebar.tsx` (`/frontend/src/pages/account/AccountSidebar.tsx`)

**What it renders**: Account navigation sidebar with Dashboard, Certificates, Profile links. Admin link shown only for admin users. Sign Out button at bottom. Mobile hamburger toggle.

**Props**: `{ isOpen: boolean, onToggle: () => void, onClose: () => void }`

**Dependencies**: `useAuth`, `useLocation`

**Key behaviors to test**:
1. Shows user name and email in sidebar header
2. Renders Dashboard, Certificates, Profile navigation links
3. Active link gets highlighted styling (border-salad-100, bg-bs-dark3)
4. Admin link visible only when `user?.is_admin` is true
5. Admin link hidden for non-admin users
6. Sign Out button calls `logout()` and `onClose()`
7. Mobile hamburger button calls `onToggle()`
8. Mobile overlay visible when `isOpen` is true
9. Clicking overlay calls `onClose()`
10. Clicking a nav link calls `onClose()` (closes mobile menu)

**Mocking needed**: Mock `useAuth`, `MemoryRouter` with specific paths.

---

### `ResetProgressModal.tsx` (`/frontend/src/pages/account/ResetProgressModal.tsx`)

**What it renders**: Modal dialog with checkboxes for selecting what to reset (sections, quizzes, certificates), a confirmation text input requiring "RESET", and submit/cancel buttons.

**Props**: `{ onClose: () => void }`

**Dependencies**: `useResetProgress`, `useProgress`, `useCertificates`

**Key behaviors to test**:
1. Renders all three checkboxes with current counts
2. Submit button disabled until at least one checkbox selected AND "RESET" typed
3. Submit button disabled while mutation is pending
4. Successful reset calls `onClose()`
5. Failed reset shows error message
6. Cancel button calls `onClose()`
7. Shows "Resetting..." text while pending
8. Passes correct `{ sections, quizzes, certificates }` to `resetProgress.mutateAsync`

**Mocking needed**: Mock `useResetProgress`, `useProgress`, `useCertificates`.

---

### `AdminUserList.tsx` (`/frontend/src/pages/account/admin/AdminUserList.tsx`)

**What it renders**: Paginated user management table with search, promote/demote admin, and delete user functionality.

**Dependencies**: `useAuth`, `useAdminUsers`, `usePromoteUser`, `useDemoteUser`, `useDeleteUser`

**Key behaviors to test**:
1. Renders user table with columns: Name, Email, Role, Progress, Certs, Actions
2. Loading spinner while data is loading
3. Search form updates search state and resets to page 1
4. Pagination controls (Previous/Next) with correct disabled states
5. Shows "Page X of Y" and total user count
6. Promote button visible only for @bodyspec.com emails
7. Demote button visible only for admin users (not self)
8. Delete button opens confirmation modal
9. Delete confirmation modal with cancel and delete buttons
10. Delete calls `deleteUser.mutateAsync` and closes modal
11. User names link to detail page `/account/admin/users/${id}`
12. Admin badge shown next to admin user names

**Mocking needed**: Mock `useAuth` (admin user), `useAdminUsers`, `usePromoteUser`, `useDemoteUser`, `useDeleteUser`, `MemoryRouter`.

---

### `AdminUserDetail.tsx` (`/frontend/src/pages/account/admin/AdminUserDetail.tsx`)

**What it renders**: Detailed view of a single user with stats, module progress, quiz attempts, certificates, and admin actions.

**Dependencies**: `useParams`, `useAuth`, `useNavigate`, `useAdminUserDetail`, `usePromoteUser`, `useDemoteUser`, `useDeleteUser`

**Key behaviors to test**:
1. Loading spinner while data is loading
2. "User not found" message when user is null
3. Renders user name, email, role, join date, last login
4. Stats grid: sections completed, quizzes passed, certificates count
5. Module progress list
6. Quiz attempts table with score, pass/fail, date
7. Certificates list with track, UID, date
8. Back link to "/account/admin"
9. Promote button for @bodyspec.com non-admin users
10. Demote button for admin users (not self)
11. Delete button opens confirmation modal
12. Delete calls `deleteUser.mutateAsync` then navigates to admin list
13. Admin badge shown for admin users

**Mocking needed**: Mock `useParams`, `useAuth` (admin), `useNavigate`, `useAdminUserDetail`, `usePromoteUser`, `useDemoteUser`, `useDeleteUser`, `MemoryRouter`.

---

## Priority Recommendations

### Tier 1 -- High Priority (core user flows, complex logic)

| Item | File | Reason |
|------|------|--------|
| `Quiz` component | `components/Quiz.tsx` | Most complex component. Manages multi-step quiz flow, handles both authenticated and unauthenticated submission paths, local result calculation. |
| `SectionView` page | `pages/SectionView.tsx` | Core learning path. Handles section navigation, mark-complete mutations, conditional auth behavior. |
| `ModuleView` page | `pages/ModuleView.tsx` | Key navigation hub. Complex progress calculations, conditional UI for auth/quiz states. |
| `CertificatesPage` | `pages/CertificatesPage.tsx` | Certificate claiming flow with eligibility checks across multiple modules. |
| `Navigation` component | `components/Navigation.tsx` | Global component. Auth-dependent rendering, mobile menu state management. |

### Tier 2 -- Medium Priority (important but simpler logic)

| Item | File | Reason |
|------|------|--------|
| `Certificate` component | `components/Certificate.tsx` | PDF download flow, clipboard interaction, error states. |
| `Dashboard` page | `pages/Dashboard.tsx` | Aggregates multiple data sources, progress calculations. |
| `ResetProgressModal` | `pages/account/ResetProgressModal.tsx` | Destructive action with multi-step confirmation. |
| `ProfilePage` | `pages/ProfilePage.tsx` | Form handling with mutation states. |
| `ModuleList` page | `pages/ModuleList.tsx` | Track filtering, progress mapping. |
| `SectionContent` component | `components/SectionContent.tsx` | Custom markdown processing (callouts). |
| `useProgress` hook | `hooks/queries/useProgress.ts` | Core data hook used across many pages. |
| `useCertificates` hook | `hooks/queries/useCertificates.ts` | Certificate data hook. |
| `useSubmitQuiz` hook | `hooks/queries/useQuiz.ts` | Quiz submission with dual-cache invalidation. |
| `api/admin.ts` | `api/admin.ts` | Admin API functions -- no test coverage yet. |

### Tier 3 -- Low Priority (simple, presentational, or thin wrappers)

| Item | File | Reason |
|------|------|--------|
| `TrackCard` | `components/TrackCard.tsx` | Simple presentational card. |
| `Layout` | `components/Layout.tsx` | Shell component, minimal logic. |
| `Home` page | `pages/Home.tsx` | Static content, no data fetching. |
| `QuizPage` | `pages/QuizPage.tsx` | Thin wrapper around Quiz component. |
| `VerifyPage` | `pages/VerifyPage.tsx` | Thin wrapper around CertificateVerification. |
| `AccountLayout` | `pages/account/AccountLayout.tsx` | Simple auth guard + layout. |
| `AccountSidebar` | `pages/account/AccountSidebar.tsx` | Navigation links + active state. |
| `AdminUserList` | `pages/account/admin/AdminUserList.tsx` | Admin-only, table rendering. |
| `AdminUserDetail` | `pages/account/admin/AdminUserDetail.tsx` | Admin-only, detail view. |
| `BackLink` | `components/common/BackLink.tsx` | Trivial wrapper. |
| `LoadingSpinner` | `components/common/LoadingSpinner.tsx` | Trivial wrapper. |
| `NotFound` | `components/common/NotFound.tsx` | Trivial wrapper. |
| `PageHeader` | `components/common/PageHeader.tsx` | Simple layout component. |
| `SignInPrompt` | `components/common/SignInPrompt.tsx` | Simple but used widely. |
| `useModules` | `hooks/useModules.ts` | Thin wrapper around content imports. |
| `useVerifyCertificate` | `hooks/queries/useVerifyCertificate.ts` | Simple query hook. |
| `useUpdateProfile` | `hooks/queries/useUpdateProfile.ts` | Simple mutation hook. |
| `useAdmin` hooks | `hooks/queries/useAdmin.ts` | Admin-only hooks. |

---

## Test Count Estimates

| Category | Already Tested | Needs Tests | Estimated New Tests |
|----------|---------------|-------------|-------------------|
| API layer | 4 files (17 tests) | 1 file (admin) | ~10 tests |
| Auth components | 1 file (4 tests) | 0 | 0 |
| Components | 5 files (32 tests) | 11 files | ~60 tests |
| Pages | 0 files | 14 files | ~80 tests |
| Hooks | 0 files | 7 files | ~35 tests |
| **Total** | **10 files (53 tests)** | **33 files** | **~185 new tests** |
