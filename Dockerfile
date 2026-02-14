# ---- Frontend build ----
FROM node:22-alpine AS frontend-builder
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
COPY content/ ../content/

# Vite bakes these into the JS bundle at build time
ARG VITE_APP_NAME=BodySpec\ Learn
ARG VITE_APP_VERSION=1.0.0
ARG VITE_KEYCLOAK_URL=https://auth.bodyspec.com
ARG VITE_KEYCLOAK_REALM=bodyspec
ARG VITE_KEYCLOAK_CLIENT_ID=bodyspec-learn-v1
ENV VITE_APP_NAME=${VITE_APP_NAME} \
    VITE_APP_VERSION=${VITE_APP_VERSION} \
    VITE_KEYCLOAK_URL=${VITE_KEYCLOAK_URL} \
    VITE_KEYCLOAK_REALM=${VITE_KEYCLOAK_REALM} \
    VITE_KEYCLOAK_CLIENT_ID=${VITE_KEYCLOAK_CLIENT_ID}

RUN npm run build

# ---- Production image ----
FROM python:3.12-alpine AS runner

# System dependencies (WeasyPrint needs pango/fontconfig)
RUN apk add --no-cache \
    bash coreutils ca-certificates tzdata \
    pango fontconfig ttf-freefont \
    && apk add --no-cache --virtual .build-deps \
    gcc musl-dev python3-dev libffi-dev

WORKDIR /app

# Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps

# Application code
COPY backend/app app/
COPY backend/alembic alembic/
COPY backend/alembic.ini ./
COPY content content/
COPY setup/* ./
COPY --from=frontend-builder /frontend/dist /app/static

RUN chmod +x prod.sh

# Non-root user
RUN adduser -D -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

ENV PYTHONPATH=/app \
    PYTHONUNBUFFERED=1 \
    STATIC_FILES_DIR=/app/static
EXPOSE 8000

CMD ["./prod.sh"]
