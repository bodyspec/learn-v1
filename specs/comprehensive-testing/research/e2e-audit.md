# E2E Playwright Test Suite Audit

**Date:** 2026-02-09
**Location:** `/Users/rshi/workspace/bodyspec/images/learn-v1/e2e/tests/`
**Total spec files:** 31
**Helper file:** `helpers.ts`
**Browser:** Chromium only (`fullyParallel: false`, `workers: 1`)

---

## Table of Contents

1. [Shared Helpers](#shared-helpers)
2. [Per-Spec File Audit](#per-spec-file-audit)
3. [Coverage Summary](#coverage-summary)
4. [Flows NOT Covered](#flows-not-covered)
5. [Recommendations](#recommendations)

---

## Shared Helpers

**File:** `helpers.ts`

Provides reusable utilities for authenticated test flows:

| Helper | Purpose |
|--------|---------|
| `signIn(page, email?, password?)` | Full Keycloak SSO sign-in flow; waits for user menu SVG button to appear |
| `completeQuizWithFirstOptions(page)` | Answers all quiz questions with the first option (likely fails); returns question count |
| `completeQuizCorrectly(page, moduleId)` | Answers all questions with known correct answers; supports `core` and `physician` modules |
| `requireAuth()` | Validates `E2E_TEST_EMAIL` and `E2E_TEST_PASSWORD` are set |
| `CORRECT_ANSWERS` | Hardcoded correct answer strings for `core` (8 questions) and `physician` (8 questions) |

**Notable gap:** Correct answers are only defined for `core` and `physician` modules. No correct answers for `chiropractor` or `trainer` quizzes, limiting full-lifecycle testing of those tracks.

---

## Per-Spec File Audit

### 1. `auth.spec.ts`

**Flows tested:** Authentication (sign in, sign out)
**Auth required:** Yes
**Tests (2):**
- Sign in via Keycloak and verify user menu icon appears in nav
- Sign out and verify "Sign in" button reappears

**Key assertions:**
- Keycloak redirect URL pattern (`auth.bodyspec.com`)
- "Sign in" button disappears after auth
- User menu button with SVG icon is visible
- "Sign Out" button in dropdown works

**Gaps:**
- No test for invalid credentials (wrong email/password)
- No test for expired session / token refresh
- No test for concurrent session handling

---

### 2. `content.spec.ts`

**Flows tested:** Content completeness across all tracks
**Auth required:** No
**Tests (9):**
- Each track page (physician, chiropractor, trainer) loads with correct heading
- Each track has clickable module cards linking to `/module/`
- Core module page lists sections (How DEXA Works, Accuracy & Validity, Key Metrics)
- First section renders markdown content with >100 chars
- All 4 quiz pages (core, physician, chiropractor, trainer) load with question count and passing score

**Key assertions:**
- Track page h1 matches title (e.g., "Clinical Applications")
- Module cards link to `/module/` paths
- Markdown `.prose` area has substantial text
- Quiz info shows question count and "80% to pass"

**Gaps:**
- No deep-dive content verification (bone-health, glp1-monitoring, sarcopenia, visceral-fat)
- No verification that all sections for all modules are accessible (only core module sections checked)
- No check for physician/chiropractor/trainer module section content rendering

---

### 3. `full-flow.spec.ts`

**Flows tested:** End-to-end learning navigation flow
**Auth required:** No
**Tests (3):**
- Homepage -> track -> module -> section -> quiz full navigation chain
- Navigation between tracks via nav links
- Section images and assets load without HTTP errors (checks `/content/assets` responses)

**Key assertions:**
- URL transitions at each step
- Content loads (`.prose` visible)
- Continue button advances to next section
- Back link returns to module
- Take Quiz navigates to `/quiz/core`
- No 4xx/5xx responses for content assets

**Gaps:**
- Only tests core track flow; does not test physician/chiropractor/trainer full flows
- Asset loading test uses `waitForLoadState('networkidle')` which can hang with Keycloak SSO
- No authenticated full flow test

---

### 4. `homepage-cta.spec.ts`

**Flows tested:** Bottom CTA section on homepage
**Auth required:** No
**Tests (2):**
- Bottom CTA shows "All content is free and publicly accessible"
- Bottom "Get Started" button navigates to `/track/physician`

**Key assertions:**
- CTA text content visibility
- Navigation to physician track

**Gaps:**
- Minimal; well-scoped spec

---

### 5. `homepage.spec.ts`

**Flows tested:** Homepage content and structure
**Auth required:** No
**Tests (4):**
- Hero section renders with title, subtitle, and "Get started" CTA pointing to `/track/physician`
- Shows all three track cards (Physicians, Chiropractors, Trainers)
- Track cards link to correct track pages
- "What You'll Learn" section shows all four learning topics

**Key assertions:**
- h1 contains "DEXA Education"
- Three track card h3 headings visible
- Track card hrefs are correct
- Learning topic headings visible

**Gaps:**
- No responsive layout testing (covered separately in `mobile-nav.spec.ts`)
- No check for footer content

---

### 6. `mobile-nav.spec.ts`

**Flows tested:** Mobile navigation (375x667 viewport)
**Auth required:** No
**Tests (5):**
- Desktop track links hidden on mobile
- Hamburger button visible on mobile
- Hamburger opens mobile menu with track links
- Clicking track link navigates and closes menu
- Clicking hamburger again closes menu (toggle behavior)

**Key assertions:**
- Desktop nav `.hidden.sm:ml-10` not visible
- Mobile hamburger `nav button.sm:hidden` visible
- Mobile menu shows Physicians, Chiropractors, Trainers links
- Menu closes after navigation or re-toggle

**Gaps:**
- No mobile sign-in flow test
- No mobile quiz/section navigation test
- No mobile account portal test (covered in `account-portal.spec.ts`)

---

### 7. `module-progress.spec.ts`

**Flows tested:** Module page with authenticated progress tracking
**Auth required:** Yes
**Tests (4):**
- Authenticated user sees progress bar on module page
- Completing a section shows checkmark (section links exist)
- Module page shows Get Started or Continue button
- Passed quiz shows "Complete" badge and "Passed" status on module page

**Key assertions:**
- Progress bar `.bg-gray-200.rounded-full.overflow-hidden` visible
- Section links to `/module/core/` exist
- "Complete" badge visible after quiz pass
- "Passed" text visible after quiz pass

**Gaps:**
- The "Get Started or Continue" test has `expect(true).toBe(true)` -- effectively a no-op assertion
- Does not verify exact progress percentage values
- Only tests core module, not other modules

---

### 8. `module.spec.ts`

**Flows tested:** Module view page structure and navigation (unauthenticated)
**Auth required:** No
**Tests (9):**
- Core module loads with title and description
- Shows estimated time (20 minutes) and section count (5 sections)
- Lists all 5 section titles
- Clicking a section navigates to section view
- Shows quiz section with Take Quiz button
- Take Quiz navigates to quiz page
- Shows sign-in prompt for unauthenticated users
- Has back link to track page
- Invalid module shows "Not Found"

**Key assertions:**
- Module metadata (time, section count) displayed
- All section titles visible
- Navigation to sections and quiz works
- SignInPrompt card visible for unauthenticated users
- 404 handling for invalid modules

**Gaps:**
- Only tests core module; other modules not verified for structure
- No test for deep-dive modules appearing on track-specific module pages

---

### 9. `navigation.spec.ts`

**Flows tested:** Top navigation bar
**Auth required:** No
**Tests (6):**
- Shows "BodySpec" and "Learn" branding
- Shows track links (Physicians, Chiropractors, Trainers)
- Shows sign-in button when not authenticated
- Clicking logo navigates to homepage
- Clicking track link navigates to track page
- Clicking logo from deep page navigates home

**Key assertions:**
- Branding text visible
- Track nav links visible and navigable
- Logo link works from any page depth

**Gaps:**
- No active/highlighted state verification for current track
- No test for auth state changes in nav (covered in `auth.spec.ts` and `user-menu.spec.ts`)

---

### 10. `not-found.spec.ts`

**Flows tested:** 404 page handling
**Auth required:** No
**Tests (4):**
- `/track/invalid` shows Not Found
- `/module/invalid` shows Not Found
- `/module/core/invalid-section` shows Not Found
- `/quiz/invalid` shows Not Found

**Key assertions:**
- "Not Found" text visible for all invalid routes

**Gaps:**
- No test for completely arbitrary routes (e.g., `/foo/bar`)
- No test for 404 appearance/styling
- No test for `/verify/` with malformed IDs (partially covered in `verify.spec.ts`)

---

### 11. `quiz-results.spec.ts`

**Flows tested:** Quiz results display details (unauthenticated)
**Auth required:** No
**Tests (7):**
- Results show pass/fail card with score percentage
- Failed quiz shows "Try Again" button and passing score requirement
- Results show "Review Your Answers" section
- Each question shows explanation text in blue boxes
- Correct answers highlighted in green
- Selected answers show "(your answer)" label
- Try Again resets quiz to question 1
- Unauthenticated results show sign-in prompt

**Key assertions:**
- Score pattern `You scored X%`
- Try Again button visible on failure
- "80% required to pass" text
- Explanation boxes in `.bg-blue-50`
- Green highlights `.bg-green-50.border.border-green-200`
- "(your answer)" labels present
- Sign-in prompt text visible

**Gaps:**
- Always uses first-option answers (likely fails); no guaranteed pass scenario tested
- Failed quiz assertions are conditional (`if (!passed)`) -- flaky if first options happen to pass

---

### 12. `quiz.spec.ts`

**Flows tested:** Complete quiz interaction flow (unauthenticated)
**Auth required:** No
**Tests (11):**
- Quiz page loads with module title and info
- Shows back link to module
- Shows first question with progress bar
- Can select an answer option (updates "1 of X answered")
- Next button advances to next question
- Previous button goes back
- Completing quiz shows results with score and Try Again
- Invalid quiz module shows Not Found
- Previous button disabled on first question
- Submit Quiz disabled when not all questions answered
- Navigating without answering shows "0 answered"
- Try Again resets to question 1 with all answers cleared

**Key assertions:**
- Quiz title includes module name
- Progress counter updates correctly
- Navigation between questions works
- Submit disabled until all answered
- Previous disabled on Q1
- Results page shows after submission

**Gaps:**
- Only tests core quiz; other quizzes not tested for interaction
- No test for keyboard navigation
- No test for changing an already-selected answer

---

### 13. `scroll-top.spec.ts`

**Flows tested:** Auto-scroll to top on section navigation
**Auth required:** No
**Tests (1):**
- Navigating to next section scrolls page to top (`window.scrollY === 0`)

**Key assertions:**
- After Continue click, new section visible
- `window.scrollY` resets to 0

**Gaps:**
- Only tests forward navigation; doesn't test Previous button scroll behavior
- Conditional logic if page is not tall enough to scroll

---

### 14. `section-progress.spec.ts`

**Flows tested:** Section completion state for authenticated users
**Auth required:** Yes
**Tests (2):**
- Completed section shows "Complete" badge on revisit
- Authenticated section view does not show SignInPrompt

**Key assertions:**
- "Complete" badge visible after revisiting completed section
- SignInPrompt `Sign In` button NOT visible when authenticated

**Gaps:**
- Only tests section 02-accuracy; doesn't test last section completion behavior
- Does not verify progress API call was made successfully

---

### 15. `section.spec.ts`

**Flows tested:** Section view structure and navigation (unauthenticated)
**Auth required:** No
**Tests (11):**
- First section loads with content and section counter
- Shows back link to module
- Renders markdown content (>100 chars)
- First section has no Previous link
- First section has Continue button
- Continue navigates to next section
- Last section shows "Finish & View Module" button
- "Finish & View Module" navigates back to module
- Middle section has both Previous and Continue
- Previous navigates to previous section
- Shows sign-in prompt for unauthenticated users
- Invalid section shows Not Found

**Key assertions:**
- Section counter format ("Section X of Y")
- Navigation buttons correct per position (first/middle/last)
- Markdown content renders
- SignInPrompt visible for unauthenticated users

**Gaps:**
- Only tests core module sections
- No test for content-specific elements (images, code blocks, tables within markdown)

---

### 16. `track-progress.spec.ts`

**Flows tested:** Track page with authenticated progress display
**Auth required:** Yes
**Tests (2):**
- Authenticated user sees module cards on track page
- Module cards show progress text after completing a section

**Key assertions:**
- Module links exist on track page
- Progress text pattern `X of Y sections complete` visible after section completion
- Waits for progress API response before asserting

**Gaps:**
- Only tests physician track
- Does not verify progress bar visual display
- Does not test 100% completion state

---

### 17. `tracks.spec.ts`

**Flows tested:** Track page structure (unauthenticated)
**Auth required:** No
**Tests (6):**
- All three tracks load with correct titles
- All three tracks show "Core Fundamentals" section
- Track page has back link to home (and navigation works)
- Shows DEXA Fundamentals module card
- Clicking module card navigates to module view
- Invalid track shows Not Found

**Key assertions:**
- Track titles match expected strings
- Core Fundamentals heading visible on all tracks
- Back to Home link navigates correctly
- Module card navigation works

**Gaps:**
- Does not verify track-specific module cards (only verifies DEXA Fundamentals shared module)
- No test for track-specific descriptions or audience info

---

### 18. `verify.spec.ts`

**Flows tested:** Certificate verification page
**Auth required:** No
**Tests (2):**
- Shows verification page title for fake UID
- Invalid certificate shows appropriate message

**Key assertions:**
- Page contains Verification/Certificate/not found/Failed text
- Loading spinner disappears

**Gaps:**
- No test with a valid certificate UID (covered in `certificate-lifecycle.spec.ts`)
- Assertions are very loose (regex matching body text)
- No test for verification page structure/layout

---

### 19. `user-menu.spec.ts`

**Flows tested:** Account navigation via user menu
**Auth required:** Yes
**Tests (3):**
- Account link visible for authenticated users
- Account link navigates to account portal with sidebar (Dashboard, Certificates, Profile links)
- Sidebar Sign Out resets nav to show sign-in button

**Key assertions:**
- Account link in nav visible
- URL contains `/account/dashboard`
- Sidebar links visible
- Sign Out resets to sign-in state

**Gaps:**
- Does not test user menu dropdown (only Account link)
- No test for admin-specific menu items

---

### 20. `deep-links.spec.ts`

**Flows tested:** Direct URL access (deep linking)
**Auth required:** No
**Tests (7):**
- Track, module, section, quiz, verify pages all load via direct URL
- Old `/dashboard` redirects to `/` (unauthenticated)
- Old `/certificates` redirects to `/` (unauthenticated)

**Key assertions:**
- Pages load correctly when accessed directly (not via navigation)
- Legacy route redirects work for unauthenticated users

**Gaps:**
- No deep link test for account portal pages when authenticated
- No test for `/account/admin` deep link

---

### 21. `protected-routes.spec.ts`

**Flows tested:** Route protection for account pages
**Auth required:** No
**Tests (4):**
- `/account/dashboard` redirects to `/` when unauthenticated
- `/account/certificates` redirects to `/` when unauthenticated
- `/account/profile` redirects to `/` when unauthenticated
- Old `/dashboard` redirects to `/` when unauthenticated

**Key assertions:**
- All account routes redirect unauthenticated users to homepage

**Gaps:**
- No test for `/account/admin` protection (admin-only route)
- No test verifying the redirect preserves intended destination (return URL after login)

---

### 22. `dashboard.spec.ts`

**Flows tested:** Dashboard page content and functionality
**Auth required:** Yes (except unauthenticated redirect test)
**Tests (6):**
- Unauthenticated visit redirects to home
- Shows welcome heading with user name
- Shows three quick-stat cards (sections, quizzes, certificates)
- Shows track progress section with all three tracks and Continue links
- Progress bars visible in track progress
- Recent activity section appears after section completion
- Certificates CTA card conditionally shows View Certificates link

**Key assertions:**
- Welcome heading includes "Welcome back,"
- Stat card labels visible
- Three Continue links pointing to correct track paths
- Progress bars exist (>= 3)
- Recent Activity shows completed section text
- View Certificates link conditional on cert presence

**Gaps:**
- No test for empty dashboard state (brand new user)
- Certificates CTA test is conditional -- may never actually exercise the "has certs" branch
- No test for stat card values (just label visibility)

---

### 23. `certificates.spec.ts`

**Flows tested:** Certificates page structure
**Auth required:** Yes
**Tests (5):**
- Unauthenticated visit redirects to home
- Shows "Your Certificates" heading
- Shows available tracks section heading
- Track card titles appear (Clinical Applications, Body Composition, Programming)
- Shows empty state message OR cert/claim content

**Key assertions:**
- Page heading contains "Your Certificates"
- Track titles exist
- Either empty state or certificate content present

**Gaps:**
- No test for claiming a certificate (covered in `certificate-lifecycle.spec.ts`)
- No test for multiple certificates display
- Empty state test is conditional -- may never exercise the "has certs" path

---

### 24. `profile.spec.ts`

**Flows tested:** Profile settings page
**Auth required:** Yes
**Tests (7):**
- Unauthenticated visit redirects to home
- Shows "Profile Settings" heading
- Email field visible, disabled, and pre-filled
- Email helper text about identity provider
- Name field is editable
- Role dropdown has 5 options (blank + 4 roles); can select values
- Organization field is editable
- Save Changes submits and shows success message

**Key assertions:**
- Email field is disabled and non-empty
- Name and organization fields are enabled
- Role select has correct option count
- Role select accepts "physician" and "other" values
- "Profile updated successfully!" message appears after save

**Gaps:**
- No test for validation errors (empty name, etc.)
- No test for concurrent save attempts
- Does not verify saved values persist after page reload

---

### 25. `console-errors.spec.ts`

**Flows tested:** JavaScript error monitoring across pages
**Auth required:** Partial (some tests authenticated, some not)
**Tests (9):**
- Unauthenticated: homepage, track, module, section, quiz, quiz submission -- no JS errors
- Authenticated: dashboard, certificates, profile -- no JS errors

**Key assertions:**
- `page.on('pageerror')` captures zero errors for each page

**Gaps:**
- Does not monitor `console.error` or `console.warn`, only uncaught exceptions
- No test for network error scenarios (API down, timeouts)

---

### 26. `api-dedup.spec.ts`

**Flows tested:** API request deduplication
**Auth required:** Yes
**Tests (3):**
- Dashboard fires each API endpoint exactly once
- Certificates page fires each API endpoint exactly once
- Profile page fires each API endpoint exactly once

**Key assertions:**
- Tracks all `/api/v1/` requests
- No duplicate `METHOD /path` combinations

**Gaps:**
- Does not test dedup after navigation between pages (e.g., dashboard -> certificates -> dashboard)
- Hardcoded 1-second wait for API calls to settle (could miss delayed requests or be flaky)
- Does not test unauthenticated pages for dedup

---

### 27. `progress.spec.ts`

**Flows tested:** Section progress tracking integration
**Auth required:** Yes
**Tests (1):**
- Clicking Continue marks section complete and dashboard reflects it

**Key assertions:**
- Continue advances to next section
- Dashboard shows "Sections completed" stat card

**Gaps:**
- Does not verify the count value in the stat card
- Only tests a single section completion
- Does not test idempotency (completing same section twice)

---

### 28. `quiz-authenticated.spec.ts`

**Flows tested:** Authenticated quiz submission
**Auth required:** Yes
**Tests (5):**
- Signed-in user can submit quiz and see results
- Results do NOT show sign-in prompt for authenticated users
- Quiz attempt is reflected on dashboard (Quizzes passed stat visible)
- First-option answers result in Try Again (score < 80%)
- Correct answers result in Congratulations message (score >= 80%)

**Key assertions:**
- Score displayed
- No sign-in prompt for authenticated users
- Dashboard reflects quiz attempts
- First-option => fail path (conditional)
- Correct answers => pass path

**Gaps:**
- Only tests core quiz
- "First-option fail" test is conditional (`if (!passed)`) -- could pass silently
- Does not verify quiz attempt count or score on dashboard
- No test for retaking a previously passed quiz

---

### 29. `certificate-lifecycle.spec.ts`

**Flows tested:** Full certificate lifecycle (pass quizzes -> claim -> verify)
**Auth required:** Yes
**Tests (1, but comprehensive):**
- Pass core quiz with correct answers
- Pass physician quiz with correct answers
- Verify "eligible for certificate" message and link
- Navigate to certificates page
- Claim certificate (if not already claimed)
- Verify certificate card shows: title, ID format (BS-YYYY-XXXXXX), issued to, date, Download PDF, Copy Verify Link
- Extract certificate UID and verify via `/verify/` page
- Verify page shows "Valid Certificate" and "Verified by BodySpec Learn"

**Key assertions:**
- Congratulations on both quiz passes
- "You're eligible for a certificate!" message
- Certificate ID format validation
- Download PDF and Copy Verify Link buttons present
- Verification page confirms valid certificate

**Gaps:**
- 180-second timeout; very long test
- Only tests physician track lifecycle (no chiropractor/trainer)
- Claim button logic conditional -- may skip claiming if already claimed
- No test for downloading the actual PDF content
- No test for claiming certificate for other tracks

---

### 30. `account-portal.spec.ts`

**Flows tested:** Account portal navigation and layout
**Auth required:** Yes
**Tests (7):**
- Account link navigates to portal with sidebar
- Sidebar navigation switches between Dashboard, Certificates, Profile
- Old `/dashboard` redirects to `/account/dashboard` when authenticated
- Old `/certificates` redirects to `/account/certificates` when authenticated
- Old `/profile` redirects to `/account/profile` when authenticated
- Desktop screenshots of all portal pages
- Mobile sidebar toggle and navigation (375x667)

**Key assertions:**
- Sidebar links present (Dashboard, Certificates, Profile)
- Content changes when sidebar links clicked
- Legacy route redirects work for authenticated users
- Mobile: desktop sidebar hidden, hamburger visible, mobile overlay sidebar works
- Mobile sidebar closes after navigation

**Gaps:**
- Screenshot test does not assert visual layout (just captures screenshots)
- No test for tablet breakpoint
- Admin sidebar link not tested

---

### 31. `account-features.spec.ts`

**Flows tested:** Account feature functionality
**Auth required:** Yes
**Tests (3):**
- Certificate PDF download returns valid file (intercepts download event, checks `.pdf` filename)
- Profile page shows Danger Zone with "Reset Progress..." button
- Reset progress modal has type-to-confirm safety (checkboxes, RESET input, button enable/disable, cancel)
- Reset progress full cycle: complete section -> reset sections -> re-complete section

**Key assertions:**
- Download filename matches `certificate-*.pdf`
- Danger Zone section visible
- Modal shows warnings and checkboxes (Section progress, Quiz attempts, Certificates)
- RESET confirmation input required
- Button disabled without selection and confirmation
- Cancel closes modal
- Reset API call succeeds (200 response)
- Post-reset, progress tracking still works

**Gaps:**
- PDF download test conditional (skips if no certificates exist)
- Does not verify PDF content/rendering
- Does not test resetting quizzes or certificates (only sections)
- No test for error handling during reset (e.g., network failure)

---

## Coverage Summary

### Flows that ARE Covered

| Category | Coverage |
|----------|----------|
| **Authentication** | Sign in, sign out, user menu visibility, session state |
| **Homepage** | Hero section, track cards, CTA, "What You'll Learn" |
| **Navigation** | Desktop nav, mobile nav, logo navigation, track switching |
| **Track pages** | All 3 tracks load, correct titles, module cards, back links, invalid track 404 |
| **Module pages** | Core module structure, sections list, quiz section, sign-in prompt, invalid 404 |
| **Section pages** | Content rendering, navigation (Continue/Previous/Finish), position-specific buttons, sign-in prompt, 404 |
| **Quiz (unauthenticated)** | Full quiz flow, navigation, progress counter, submit/disabled states, results display, Try Again |
| **Quiz (authenticated)** | Submit with auth, no sign-in prompt, dashboard reflection, pass/fail paths |
| **Quiz results** | Score display, review answers, explanations, correct/incorrect highlighting, Try Again reset |
| **Progress tracking** | Section completion, module progress bar, track progress, dashboard stats, section completion badge |
| **Certificates page** | Page structure, track cards, empty state, available tracks |
| **Certificate lifecycle** | Pass quizzes -> claim -> verify (physician track only) |
| **Certificate verification** | Valid and invalid certificate UIDs |
| **PDF download** | Download event fires, filename is correct |
| **Dashboard** | Welcome heading, stat cards, track progress, progress bars, recent activity, certificates CTA |
| **Profile** | Form fields, disabled email, role dropdown, save changes, success message |
| **Reset progress** | Modal UI, type-to-confirm safety, full reset cycle |
| **Account portal** | Sidebar navigation, route switching, legacy redirects, mobile toggle |
| **Protected routes** | Unauthenticated redirect for all account routes |
| **Deep links** | Direct URL access for all public routes, legacy redirects |
| **Scroll behavior** | Scroll-to-top on section navigation |
| **Error monitoring** | No JS errors on all major pages (auth + unauth) |
| **API dedup** | No duplicate API calls on account pages |
| **404 handling** | Invalid track, module, section, quiz routes |
| **Content completeness** | All tracks load, quiz metadata correct, markdown renders |

### Flows that are NOT Covered

| Category | Missing Coverage | Risk Level |
|----------|-----------------|------------|
| **Admin user management** | No E2E tests for `/account/admin` or `/account/admin/users/:userId` -- listing users, searching, promoting, demoting, deleting users | **High** |
| **Admin route protection** | No test that `/account/admin` is restricted to admin users; no test that non-admin users are blocked | **High** |
| **Invalid credentials** | No test for wrong email/password at Keycloak login | Medium |
| **Deep-dive content** | No tests for deep-dive modules (bone-health, glp1-monitoring, sarcopenia, visceral-fat) | Medium |
| **Chiropractor/Trainer quiz lifecycle** | No correct answers defined for chiropractor/trainer modules; cannot test full lifecycle for these tracks | Medium |
| **Certificate claiming (all tracks)** | Only physician track certificate lifecycle tested; chiropractor and trainer tracks untested | Medium |
| **Profile validation errors** | No test for invalid profile form submissions | Medium |
| **Profile persistence** | No test that saved profile values persist after page reload | Low |
| **Network error states** | No tests for API failure, timeout, or network offline scenarios | Medium |
| **Loading states** | No explicit tests for loading spinners during data fetch | Low |
| **Keyboard navigation** | No keyboard accessibility testing for quiz or navigation | Medium |
| **Browser compatibility** | Only runs Chromium; no Firefox or WebKit coverage | Low |
| **Session expiry** | No test for behavior when auth token expires mid-session | Medium |
| **Concurrent quiz submissions** | No test for double-submit prevention on quiz | Low |
| **Copy Verify Link** | Button visibility tested but clipboard copy not verified | Low |
| **Quiz answer change** | No test for changing a previously selected answer before submission | Low |
| **Multiple certificate display** | No test for users with multiple earned certificates | Low |
| **Retaking passed quiz** | No test for taking a quiz again after already passing | Low |
| **Footer content** | No tests for footer (if any exists) | Low |
| **Responsive quiz/section** | No mobile viewport tests for quiz or section pages | Low |
| **Arbitrary 404 routes** | Only known route patterns tested; no wildcard 404 test | Low |

---

## Recommendations

### Priority 1: New Spec Files Needed

#### `admin.spec.ts` -- Admin User Management
This is the most significant gap. The admin UI has full CRUD operations (list, search, promote, demote, delete) with no E2E coverage.

Recommended tests:
- Non-admin user cannot access `/account/admin` (redirected or 403)
- Admin user sees "User Management" heading with user table
- Search filters users by name/email
- Pagination works (Next/Previous page)
- Promote button visible only for `@bodyspec.com` users
- Demote button works (cannot self-demote)
- Delete user shows confirmation modal
- Delete user removes them from the list
- Admin user detail page (`/account/admin/users/:userId`) loads with user info, module progress, quiz attempts, certificates

**Blocker:** Requires an admin test account in Keycloak and a second non-admin test account for promote/demote/delete testing.

#### `deep-dive-content.spec.ts` -- Deep Dive Modules
Recommended tests:
- Each deep-dive module page loads (bone-health, glp1-monitoring, sarcopenia, visceral-fat)
- Deep-dive sections render markdown content
- Deep-dive modules appear on appropriate track pages

### Priority 2: Additions to Existing Specs

#### Add to `helpers.ts`
- Define `CORRECT_ANSWERS` for `chiropractor` and `trainer` modules to enable full lifecycle tests

#### Add to `protected-routes.spec.ts`
- Test that `/account/admin` redirects non-admin authenticated users (not just unauthenticated)

#### Add to `quiz.spec.ts`
- Test changing a selected answer before submission
- Test keyboard navigation between questions

#### Add to `profile.spec.ts`
- Test that saved profile values persist after page reload
- Test form validation (submit with empty required fields)

#### Add to `certificate-lifecycle.spec.ts` or new `certificate-lifecycle-chiropractor.spec.ts`
- Full lifecycle test for chiropractor track
- Full lifecycle test for trainer track

#### Add to `auth.spec.ts`
- Test invalid credentials handling (error message displayed)

### Priority 3: Infrastructure Improvements

| Improvement | Rationale |
|-------------|-----------|
| Add Firefox project to `playwright.config.ts` | Cross-browser coverage |
| Add WebKit project for Safari testing | Many users may be on Safari/iOS |
| Create a `test.afterEach` hook to check `console.error` across all tests | Currently only `console-errors.spec.ts` checks this |
| Reduce conditional assertions (`if (visible)... else expect(true)`) | These create silently passing tests that may miss regressions |
| Add API mock/intercept tests for error states | Verify graceful degradation when backend returns 500s |
| Consider test data isolation (reset progress before suite runs) | Tests currently depend on prior state, making them order-dependent |

### Priority 4: Test Quality Issues

1. **`module-progress.spec.ts` test 3** ("shows Get Started or Continue button"): Contains `expect(true).toBe(true)` which always passes. Should be rewritten to make a meaningful assertion.

2. **Conditional assertions in `quiz-results.spec.ts` and `quiz-authenticated.spec.ts`**: Tests like "failed quiz shows Try Again" use `if (!passed)` guards. If the first options happen to yield a passing score (unlikely but possible with content changes), the test silently passes without testing anything.

3. **Shared state between tests**: Tests run serially (`workers: 1`, `fullyParallel: false`) and share a single Keycloak session. Completing sections/quizzes in earlier tests affects later tests' assertions (e.g., progress counts, certificate availability). This creates implicit ordering dependencies.

4. **Hardcoded `waitForTimeout` calls**: Multiple tests use `waitForTimeout(500)` or `waitForTimeout(1000)` instead of waiting for specific conditions. These are fragile and could cause flakiness on slower machines.

---

## Test Count by Auth Mode

| Mode | Spec Files | Test Count |
|------|------------|------------|
| Unauthenticated only | 15 | ~70 |
| Authenticated only | 13 | ~40 |
| Mixed (both) | 3 | ~15 |
| **Total** | **31** | **~125** |

---

## Test Count by Feature Area

| Feature Area | Test Count | Spec Files |
|--------------|------------|------------|
| Quiz flow | ~25 | quiz.spec.ts, quiz-results.spec.ts, quiz-authenticated.spec.ts |
| Navigation & routing | ~20 | navigation.spec.ts, deep-links.spec.ts, protected-routes.spec.ts, mobile-nav.spec.ts |
| Account portal | ~15 | dashboard.spec.ts, certificates.spec.ts, profile.spec.ts, account-portal.spec.ts |
| Content display | ~15 | homepage.spec.ts, content.spec.ts, module.spec.ts, section.spec.ts, tracks.spec.ts |
| Progress tracking | ~10 | module-progress.spec.ts, section-progress.spec.ts, track-progress.spec.ts, progress.spec.ts |
| Authentication | ~5 | auth.spec.ts, user-menu.spec.ts |
| Certificates | ~10 | certificate-lifecycle.spec.ts, account-features.spec.ts, verify.spec.ts |
| Quality/regression | ~15 | console-errors.spec.ts, api-dedup.spec.ts, scroll-top.spec.ts, full-flow.spec.ts, not-found.spec.ts, homepage-cta.spec.ts |
| Admin | 0 | *none* |
