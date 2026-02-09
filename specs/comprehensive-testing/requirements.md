# Requirements — Comprehensive Testing

## Q&A Record

(Questions and answers will be appended here as we go.)

---

### Q1: What's your testing philosophy for layer responsibilities?

The three layers can either have distinct roles (no overlap) or intentional overlap for safety. For example:

- **Distinct**: Backend unit tests cover business logic + edge cases, frontend unit tests cover component rendering + interactions, E2E tests cover critical user journeys only. Minimal overlap.
- **Defense-in-depth**: Some overlap is intentional — e.g., both backend unit tests AND E2E tests verify that submitting a quiz with a failing score returns the right result.

Which approach do you prefer?

**A1:** Defense-in-depth. Intentional overlap across layers is acceptable — critical paths should be verified at multiple levels.

---

### Q2: Are there any constraints on test runtime or CI environment?

For example:
- Do you run tests in CI (GitHub Actions, etc.)? If so, are there time or cost limits?
- WeasyPrint requires system dependencies — should PDF tests be skipped in CI or is WeasyPrint available?
- E2E tests need Keycloak + Postgres running — is that set up in CI or are E2E tests local-only?

This affects what we can realistically test and how we structure mocking.

**A2:** No constraints currently. No CI pipeline in place yet — all tests run locally. No limits on runtime, dependencies, or cost.

---

### Q3: For frontend unit tests, what's your priority?

Currently 0/15 pages and 0/7 hooks are tested. The E2E suite already covers many user journeys through these pages. Given defense-in-depth, we could:

- **Hooks-first**: Test React Query hooks (useProgress, useCertificates, useQuiz, useAdmin, etc.) — these are the data layer and catch API contract regressions fast without a browser.
- **Components-first**: Test the remaining 26 untested components (Quiz.tsx is the biggest gap — handles answer tracking, submission, retry logic).
- **Pages-first**: Test page-level composition (Dashboard, QuizPage, ModuleView) — most overlap with E2E but catches rendering bugs.

Which would you prioritize, or do you want all three?

**A3:** All three — hooks, components, and pages. Full frontend unit test coverage.

---

### Q4: For E2E tests, what's your expectation?

You already have 31 spec files covering auth, navigation, content, quizzes, certificates, progress, dashboard, account portal, and more. Should we:

- **Audit only**: Identify specific gaps in the existing 31 specs (e.g., missing error states, admin flows, edge cases) and add tests to fill them
- **Audit + new specs**: Also add entirely new spec files for untested flows (e.g., admin user management E2E, certificate PDF download E2E)
- **Keep as-is**: E2E coverage is strong enough — focus effort on backend + frontend unit tests instead

**A4:** Audit + new specs. Identify gaps in existing E2E tests and add new spec files for untested flows.

---

### Q5: Should we include any non-functional testing?

Beyond correctness testing, there are other dimensions:

- **Accessibility (a11y)**: Automated checks for ARIA labels, keyboard navigation, color contrast (e.g., axe-core integration in Playwright or Vitest)
- **Performance**: Lighthouse CI, API response time assertions, bundle size checks
- **Security**: OWASP-style checks (auth bypass attempts, injection, CORS validation)
- **None**: Stick to functional correctness testing only

**A5:** Functional correctness testing only. Skip a11y, performance, and security testing for now.
