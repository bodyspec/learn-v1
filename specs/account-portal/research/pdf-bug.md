# Certificate PDF Download Bug — Research

## Symptom
User reports downloading a `pdf.json` file instead of an actual PDF.

## Root Cause Analysis

### Backend (Correct)
- **Endpoint:** `GET /api/v1/certificates/{certificate_uid}/pdf` (`backend/app/api/certificates.py:95-125`)
- Returns `Response(content=pdf_bytes, media_type='application/pdf')` with proper `Content-Disposition: attachment` header
- WeasyPrint generates the PDF correctly on the server side

### Frontend (Issue)
- **Certificate component** (`frontend/src/components/Certificate.tsx:50-57`) uses a plain `<a href={url} download>` tag
- The URL points to `/api/v1/certificates/{uid}/pdf`
- **API client** (`frontend/src/api/client.ts:16`) hardcodes `Content-Type: application/json` on ALL requests

### The Problem
The `<a href download>` tag makes a native browser request — this bypasses the API client entirely. However, the endpoint requires **authentication** (`Depends(get_current_user)`). A native `<a>` tag won't include the Bearer token.

Two likely failure modes:
1. The request hits the backend without a token → returns a 401 JSON error → browser saves it as `pdf.json`
2. The Vite proxy or some interceptor interferes with the response

## Recommended Fix
Use a JavaScript-driven download that:
1. Fetches the PDF via the API client (with auth token)
2. Creates a Blob URL from the response
3. Triggers download programmatically

Alternatively, use a time-limited signed URL pattern so the `<a>` tag can work without Bearer auth.
