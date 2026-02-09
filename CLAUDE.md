# BodySpec Learn - DEXA Education Platform

A web application for providing DEXA scan education to healthcare providers and fitness professionals.

## Quick Start

```bash
# Development
./dev.sh

# Production (Docker)
docker build -t bodyspec-learn .
docker run -p 8000:8000 --env-file .env bodyspec-learn
```

## Project Structure

```
learn-v1/
├── backend/           # Python FastAPI backend
│   └── app/
│       ├── main.py    # FastAPI application
│       ├── core/      # Config, database
│       ├── auth/      # Keycloak integration
│       ├── models/    # SQLAlchemy models
│       ├── schemas/   # Pydantic schemas
│       ├── api/       # API routes
│       ├── services/  # Business logic
│       └── templates/ # Certificate HTML templates
├── frontend/          # React + Vite + TypeScript
│   └── src/
│       ├── auth/      # Auth provider, hooks
│       ├── api/       # API client
│       ├── components/# Reusable components
│       ├── pages/     # Page components
│       ├── hooks/     # Custom hooks
│       ├── content/   # Content loader
│       └── types/     # TypeScript types
├── content/           # Educational content (markdown/YAML)
│   ├── modules/       # Track modules
│   ├── deep-dives/    # Optional deep-dive content
│   ├── quizzes/       # Quiz definitions
│   └── assets/        # Images, report samples
├── e2e/               # Playwright E2E tests (standalone package)
│   ├── tests/         # Test spec files + helpers
│   └── playwright.config.ts
├── setup/             # Production scripts
├── dev.sh             # Development launcher
└── Dockerfile         # Multi-stage build
```

## Git Conventions

- Commit prefix: `bl:` (e.g., `bl: Add quiz submission endpoint`)
- Rebase-only workflow, never merge
- Delete branches after merge
- Never push without explicit user request

## Key Commands

```bash
# Development
./dev.sh              # Start both frontend and backend (alias: ./dev.sh up)
./dev.sh help         # Show all commands

# Testing
./dev.sh test         # Run unit tests (backend + frontend)
./dev.sh e2e          # Run Playwright E2E tests (starts servers automatically)
./dev.sh e2e auth.spec.ts  # Run a specific test file
./dev.sh e2e --headed # Run with visible browser

# Linting
./dev.sh lint         # Run flake8 + eslint

# Database migrations
./dev.sh db migrate   # Run alembic upgrade head
cd backend && alembic revision --autogenerate -m "description"

# Build
docker build -t bodyspec-learn .
```

## Tech Stack

- **Backend**: Python 3.12, FastAPI, SQLAlchemy, Alembic, WeasyPrint
- **Frontend**: React 19, TypeScript, Vite, TailwindCSS
- **Database**: PostgreSQL 16
- **Auth**: Keycloak (OIDC)

## Environment Variables

See `.env.example` for required configuration. Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `KEYCLOAK_*` - Authentication configuration
- `SECRET_KEY` - JWT signing key

## API Documentation

When running in development, API docs are available at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Content Format

### Module Metadata (`_module.yaml`)
```yaml
id: core
title: "DEXA Fundamentals"
track: core
sections:
  - slug: 01-how-dexa-works
    file: 01-how-dexa-works.md
    title: "How DEXA Works"
```

### Quiz Format (`quizzes/*.yaml`)
```yaml
module_id: core
passing_score: 80
questions:
  - id: core-q1
    type: multiple_choice
    text: "Question text"
    options:
      - text: "Option A"
        correct: false
      - text: "Option B"
        correct: true
    explanation: "Explanation text"
```

## Tracks

| Track | Audience | Content Focus |
|-------|----------|---------------|
| Core | All users | DEXA fundamentals |
| Physician | MDs, DOs, NPs, PAs | Clinical applications |
| Chiropractor | DCs | MSK relevance |
| Trainer | Personal trainers | Programming with DEXA data |
