# Rough Idea: Comprehensive Testing

Ensure comprehensive test coverage across all three layers of BodySpec Learn:

1. **Backend unit tests** — update existing plan (BACKEND_TESTS.local.md), fill ~27 missing tests, add admin coverage
2. **Frontend unit tests** — create plan for pages, hooks, and untested components
3. **E2E tests (Playwright)** — audit existing 31 spec files, identify gaps

## Context

- Backend: 110 tests exist across 13 files (~80% of original plan)
- Frontend: 10 test files covering 6/32 components, 0/15 pages, 0/7 hooks
- E2E: 31 spec files with strong coverage of auth, flows, navigation, certificates
- Existing plan: `BACKEND_TESTS.local.md` covers backend only, missing admin service/API

## Goal

Produce a unified testing strategy that:
- Identifies what each layer should cover (no redundant testing across layers)
- Prioritizes by risk and impact
- Results in a clear implementation plan
