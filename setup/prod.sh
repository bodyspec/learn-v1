#!/bin/bash
set -e

export ENVIRONMENT=${ENVIRONMENT:-production}

# Run database migrations
python -m alembic upgrade head

# Start the application
exec python -m uvicorn app.main:app \
    --host 0.0.0.0 \
    --port 8000 \
    --workers 2 \
    --log-config logging_config.json
