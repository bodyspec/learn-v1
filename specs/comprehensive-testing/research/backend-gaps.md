# Backend Test Gap Analysis

Generated: 2026-02-09

## Summary

| Area | Source Functions | Tested | Untested | Gap % |
|------|-----------------|--------|----------|-------|
| certificate_service.py | 6 functions | 4 | 2 | 33% |
| quiz_service.py | 5 functions | 5 (but missing edge cases) | 0 | ~10% edge cases |
| auth/dependencies.py | 3 functions | 3 (partially) | 0 | ~40% scenario coverage |
| auth/keycloak.py | 3 methods | 2 | 1 | 33% |
| pdf_generator.py | 1 function | 0 | 1 | 100% |
| admin_service.py | 5 functions | 0 (only API-level) | 5 | 100% unit-level |
| API route: certificates | 5 endpoints | 4 | 1 | 20% |
| API route: auth | 1 endpoint | 1 (in test_admin_auth) | 0 | 0% |

## Confirmed Missing Test Files

- `backend/tests/test_api_auth.py` -- DOES NOT EXIST. The `/api/v1/auth/me` endpoint is only tested tangentially in `test_admin_auth.py` (checking is_admin field). No dedicated auth API tests.
- `backend/tests/test_pdf_generator.py` -- DOES NOT EXIST. Zero coverage for PDF generation.
- `backend/tests/test_admin_service.py` -- DOES NOT EXIST. The admin service functions (`list_users`, `get_user_detail`, `promote_user`, `demote_user`, `delete_user`) are only tested through API-level integration tests in `test_api_admin.py`, with no direct unit tests.

---

## Detailed Gap Analysis by File

### 1. `backend/app/services/certificate_service.py`

**Functions in source:**
1. `has_active_certificate(db, user_id, track)` -- lines 29-46
2. `create_certificate(db, user_id, track, recipient_name, recipient_email)` -- lines 49-83
3. `get_user_certificates(db, user_id)` -- lines 86-96
4. `get_certificate_by_uid(db, certificate_uid)` -- lines 99-107
5. `verify_certificate(certificate)` -- lines 110-148
6. `revoke_certificate(db, certificate_uid, reason)` -- lines 151-165

**What is tested in `test_certificate_service.py`:**
- Certificate model: `generate_uid` format, uniqueness, current year, ambiguous chars (4 tests)
- `create_certificate`: basic creation, multiple certificates unique UIDs (2 tests)
- `get_user_certificates`: basic, excludes revoked, empty list (3 tests)
- `get_certificate_by_uid`: found, not found (2 tests)
- `verify_certificate`: valid, None, revoked, expired (4 tests)
- `TRACK_INFO`: structure validation (2 tests)

**CONFIRMED UNTESTED:**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `has_active_certificate()` | Returns `True` when active (non-revoked, non-expired) certificate exists | HIGH |
| 2 | `has_active_certificate()` | Returns `False` when no certificate exists | HIGH |
| 3 | `has_active_certificate()` | Returns `False` when only revoked certificates exist | HIGH |
| 4 | `has_active_certificate()` | Returns `False` when only expired certificates exist | HIGH |
| 5 | `has_active_certificate()` | Returns `False` for different track than requested | MEDIUM |
| 6 | `revoke_certificate()` | Successfully revokes an existing certificate (sets `revoked_at` and `revocation_reason`) | HIGH |
| 7 | `revoke_certificate()` | Returns `None` when certificate UID not found | HIGH |
| 8 | `revoke_certificate()` | Revoking an already-revoked certificate (overwrites timestamp) | LOW |
| 9 | `verify_certificate()` | Certificate with unknown track (not in TRACK_INFO) falls back to `track.title()` | LOW |

**Notes:** `has_active_certificate` is called in the certificates API route (`POST /api/v1/certificates`) to prevent duplicate certificate issuance, but the 409 conflict path is never tested at any level. `revoke_certificate` is completely untested at both service and API level.

---

### 2. `backend/app/services/quiz_service.py`

**Functions in source:**
1. `load_quiz(module_id)` -- lines 21-27
2. `grade_quiz(submission)` -- lines 30-74
3. `record_quiz_attempt(db, user_id, submission, result)` -- lines 77-95
4. `get_quiz_attempts(db, user_id, module_id)` -- lines 98-128
5. `has_passed_quiz(db, user_id, module_id)` -- lines 131-148

**What is tested in `test_quiz_service.py`:**
- `load_quiz`: core quiz loads, nonexistent returns None (2 tests)
- `grade_quiz`: all correct, all wrong, exact passing, just below passing, missing answers, nonexistent module, explanations, correct option indices (8 tests)
- `record_quiz_attempt`: basic persistence (1 test)
- `get_quiz_attempts`: empty, with data (2 tests)
- `has_passed_quiz`: true, false no attempts, false only failed (3 tests)

**CONFIRMED UNTESTED:**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `grade_quiz()` | Quiz with empty questions list (`questions: []`) -- division-by-zero guard (`score = 0`) | MEDIUM |
| 2 | `grade_quiz()` | Question with no `correct: true` option (correct_option stays -1, all answers "wrong") | LOW |
| 3 | `grade_quiz()` | Question with missing `explanation` field (defaults to empty string) | LOW |
| 4 | `grade_quiz()` | Custom `passing_score` (not 80) in quiz YAML | MEDIUM |
| 5 | `record_quiz_attempt()` | `time_spent_seconds` is None (optional field) | LOW |
| 6 | `get_quiz_attempts()` | Multiple modules -- only returns attempts for requested module | MEDIUM |
| 7 | `get_quiz_attempts()` | Best score calculated correctly when passing attempt is not the latest | LOW |

---

### 3. `backend/app/auth/dependencies.py`

**Functions in source:**
1. `get_current_user(token, db)` -- lines 22-52
2. `get_admin_user(current_user)` -- lines 55-64
3. `get_optional_user(token, db)` -- lines 67-78

**What is tested:**

In `test_auth.py` (TestAuthDependencies class):
- `get_current_user`: no token raises 401, invalid token raises 401 (2 tests)
- `get_optional_user`: no token returns None (1 test)

In `test_admin_auth.py`:
- `get_admin_user`: returns admin, raises 403 for non-admin (2 tests)

**CONFIRMED UNTESTED:**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `get_current_user()` | Valid token -- returns user from `get_or_create_user` (happy path) | HIGH |
| 2 | `get_current_user()` | Valid token for new user -- creates user in database | MEDIUM |
| 3 | `get_current_user()` | Token payload missing `email` field (defaults to `''`) | LOW |
| 4 | `get_current_user()` | Token payload missing `name` field (defaults to `None`) | LOW |
| 5 | `get_optional_user()` | Valid token -- returns user | HIGH |
| 6 | `get_optional_user()` | Invalid/expired token -- returns None (catches HTTPException) | HIGH |

---

### 4. `backend/app/auth/keycloak.py`

**Methods in source:**
1. `KeycloakAuth.certs_url` (property) -- line 18
2. `KeycloakAuth.get_public_keys()` -- lines 21-28
3. `KeycloakAuth.validate_token(token)` -- lines 30-73

**What is tested in `test_auth.py` (TestKeycloakAuth class):**
- `certs_url`: URL constructed correctly (1 test)
- `validate_token`: returns None for invalid JWT with empty keys (1 test)
- `get_public_keys`: caches after first fetch (1 test)

**CONFIRMED UNTESTED:**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `validate_token()` | Valid token with matching kid -- returns decoded payload | HIGH |
| 2 | `validate_token()` | Token with kid not matching any key -- returns None | MEDIUM |
| 3 | `validate_token()` | Token with wrong `azp` (client ID mismatch) -- returns None | MEDIUM |
| 4 | `validate_token()` | Expired token (JWTError) -- returns None | MEDIUM |
| 5 | `get_public_keys()` | Network error during key fetch -- raises exception | LOW |

---

### 5. `backend/app/services/pdf_generator.py` (COMPLETELY UNTESTED)

**Functions in source:**
1. `generate_certificate_pdf(certificate)` -- lines 13-37

**Behavior to test:**
- Loads Jinja2 template from `backend/app/templates/certificate.html`
- Renders template with certificate data (recipient name, track title, UID, dates)
- Falls back to `{'title': track.title(), 'description': 'body composition analysis'}` for unknown tracks
- Handles logo path (checks `logo.exists()`, passes empty string if missing)
- Formats `issued_at` as `%B %d, %Y`
- Handles `expires_at` being None (conditional rendering)
- Calls WeasyPrint `HTML(string=...).write_pdf()` and returns bytes

**CONFIRMED UNTESTED:**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `generate_certificate_pdf()` | Generates valid PDF bytes for known track (physician/chiropractor/trainer) | HIGH |
| 2 | `generate_certificate_pdf()` | Unknown track falls back to `track.title()` and generic description | MEDIUM |
| 3 | `generate_certificate_pdf()` | Certificate with no `expires_at` (None) renders without expiry | MEDIUM |
| 4 | `generate_certificate_pdf()` | Logo file missing -- template renders with empty logo path | LOW |
| 5 | `generate_certificate_pdf()` | Returns bytes (type check), non-empty output | HIGH |

**Implementation note:** WeasyPrint requires system dependencies (Cairo, Pango, etc). Tests can either:
- Mock WeasyPrint's `HTML.write_pdf()` to test template rendering logic only
- Or run as integration tests if WeasyPrint is available in CI

---

### 6. `backend/app/services/admin_service.py` (NO UNIT TESTS)

All admin service functions are tested only at the API level in `test_api_admin.py`. There are no direct unit tests.

**Functions in source:**
1. `list_users(db, page, per_page, search)` -- lines 22-87
2. `get_user_detail(db, user_id)` -- lines 90-168
3. `promote_user(db, user_id)` -- lines 171-192
4. `demote_user(db, user_id, current_user_id)` -- lines 195-217
5. `delete_user(db, user_id)` -- lines 220-239

**What is tested via API in `test_api_admin.py`:**
- `list_users`: basic list, search filter, pagination, forbidden for non-admin (4 tests)
- `get_user_detail`: with progress data, not found (2 tests)
- `promote_user`: bodyspec user success, non-bodyspec fails (2 tests)
- `demote_user`: other admin, self-demote fails (2 tests)
- `delete_user`: non-admin user, admin user fails, nonexistent fails (3 tests)

**CONFIRMED UNTESTED (unit-level gaps not covered by API tests):**

| # | Function | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `promote_user()` | User not found -- raises 404 | MEDIUM |
| 2 | `promote_user()` | Already-admin user -- sets is_admin True again (idempotent) | LOW |
| 3 | `demote_user()` | User not found -- raises 404 | MEDIUM |
| 4 | `demote_user()` | Already non-admin user -- sets is_admin False again (idempotent) | LOW |
| 5 | `list_users()` | Empty database (no users) -- returns total=0, empty list | LOW |
| 6 | `list_users()` | Search matches email but not name | LOW |
| 7 | `get_user_detail()` | User with no progress/quizzes/certificates | LOW |
| 8 | `get_user_detail()` | User with multiple module progress entries | LOW |
| 9 | `delete_user()` | Cascading delete removes progress, quiz attempts, certificates | MEDIUM |

---

### 7. API Route Gaps

#### `POST /api/v1/certificates` -- Duplicate Certificate (409 Conflict)

The certificate API route (line 74 in `backend/app/api/certificates.py`) calls `has_active_certificate()` and returns 409 if an active certificate already exists. This path is **never tested** at the API level.

| # | Endpoint | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `POST /api/v1/certificates` | 409 Conflict when active certificate already exists for the track | HIGH |
| 2 | `POST /api/v1/certificates` | Invalid track name (not in TRACK_REQUIREMENTS) | MEDIUM |
| 3 | `GET /api/v1/certificates/{uid}/pdf` | Successful PDF download for certificate owner | MEDIUM |

#### `GET /api/v1/auth/me` (no dedicated tests)

| # | Endpoint | Scenario | Priority |
|---|----------|----------|----------|
| 1 | `GET /api/v1/auth/me` | Returns full user profile (name, email, role_type, organization, is_admin) | HIGH |
| 2 | `GET /api/v1/auth/me` | Unauthenticated request returns 401 | HIGH |

**Note:** `test_admin_auth.py` tests the `is_admin` field on `/api/v1/auth/me`, but there is no general auth API test verifying the full response shape or unauthenticated behavior.

#### Admin API -- Reset Progress

The admin API in `test_api_admin.py` does not test admin-initiated reset operations (if such endpoints exist). Currently `reset-progress` is user-self-service only (`POST /api/v1/users/me/reset-progress`).

---

## Complete Missing Test Case List (Ordered by Priority)

### HIGH Priority (19 test cases)

1. **test_certificate_service.py** -- `has_active_certificate()` returns True for active cert
2. **test_certificate_service.py** -- `has_active_certificate()` returns False for no cert
3. **test_certificate_service.py** -- `has_active_certificate()` returns False for revoked cert
4. **test_certificate_service.py** -- `has_active_certificate()` returns False for expired cert
5. **test_certificate_service.py** -- `revoke_certificate()` successfully revokes existing cert
6. **test_certificate_service.py** -- `revoke_certificate()` returns None for unknown UID
7. **test_auth.py** -- `get_current_user()` valid token returns user (happy path)
8. **test_auth.py** -- `get_optional_user()` valid token returns user
9. **test_auth.py** -- `get_optional_user()` invalid token returns None
10. **test_auth.py** -- `validate_token()` valid token with matching kid returns payload
11. **test_pdf_generator.py** (NEW FILE) -- `generate_certificate_pdf()` known track generates bytes
12. **test_pdf_generator.py** (NEW FILE) -- `generate_certificate_pdf()` returns non-empty bytes
13. **test_api_certificates.py** -- `POST /api/v1/certificates` returns 409 when active cert exists
14. **test_api_auth.py** (NEW FILE) -- `GET /api/v1/auth/me` returns full user profile
15. **test_api_auth.py** (NEW FILE) -- `GET /api/v1/auth/me` returns 401 when unauthenticated

### MEDIUM Priority (14 test cases)

16. **test_certificate_service.py** -- `has_active_certificate()` returns False for different track
17. **test_auth.py** -- `get_current_user()` valid token for new user creates user
18. **test_auth.py** -- `validate_token()` token kid not in JWKS returns None
19. **test_auth.py** -- `validate_token()` wrong azp (client ID mismatch) returns None
20. **test_auth.py** -- `validate_token()` expired token returns None
21. **test_pdf_generator.py** -- `generate_certificate_pdf()` unknown track uses fallback title
22. **test_pdf_generator.py** -- `generate_certificate_pdf()` certificate with no expires_at
23. **test_quiz_service.py** -- `grade_quiz()` empty questions list returns score=0
24. **test_quiz_service.py** -- `grade_quiz()` custom passing_score (not 80)
25. **test_quiz_service.py** -- `get_quiz_attempts()` multiple modules returns only requested
26. **test_admin_service.py** (NEW FILE) -- `promote_user()` user not found raises 404
27. **test_admin_service.py** (NEW FILE) -- `demote_user()` user not found raises 404
28. **test_admin_service.py** (NEW FILE) -- `delete_user()` cascading delete verified
29. **test_api_certificates.py** -- `POST /api/v1/certificates` invalid track name

### LOW Priority (13 test cases)

30. **test_certificate_service.py** -- `revoke_certificate()` revoking already-revoked cert
31. **test_certificate_service.py** -- `verify_certificate()` unknown track fallback
32. **test_auth.py** -- `get_current_user()` token missing email field
33. **test_auth.py** -- `get_current_user()` token missing name field
34. **test_auth.py** -- `get_public_keys()` network error
35. **test_pdf_generator.py** -- `generate_certificate_pdf()` logo file missing
36. **test_quiz_service.py** -- `grade_quiz()` question with no correct option
37. **test_quiz_service.py** -- `grade_quiz()` question missing explanation
38. **test_quiz_service.py** -- `record_quiz_attempt()` time_spent_seconds is None
39. **test_quiz_service.py** -- `get_quiz_attempts()` best score from non-latest attempt
40. **test_admin_service.py** -- `promote_user()` already-admin is idempotent
41. **test_admin_service.py** -- `demote_user()` already non-admin is idempotent
42. **test_admin_service.py** -- `list_users()` empty database
43. **test_admin_service.py** -- `list_users()` search matches email only
44. **test_admin_service.py** -- `get_user_detail()` user with no progress data
45. **test_admin_service.py** -- `get_user_detail()` user with multiple modules

**Total: 46 missing test cases across 4 existing files + 3 new files**

---

## New Test Files Needed

| File | Test Count | Description |
|------|-----------|-------------|
| `backend/tests/test_pdf_generator.py` | 5 | PDF generation with WeasyPrint mock |
| `backend/tests/test_api_auth.py` | 2 | Auth API endpoint tests |
| `backend/tests/test_admin_service.py` | 10 | Unit tests for admin service functions |

## Existing Files Needing Additions

| File | New Tests | Description |
|------|-----------|-------------|
| `backend/tests/test_certificate_service.py` | 9 | `has_active_certificate` + `revoke_certificate` |
| `backend/tests/test_auth.py` | 9 | `get_current_user` happy path, `get_optional_user`, `validate_token` scenarios |
| `backend/tests/test_quiz_service.py` | 7 | Edge cases for grading and attempts |
| `backend/tests/test_api_certificates.py` | 2 | 409 conflict + invalid track |
