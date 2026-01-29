# Build frontend
FROM node:22-alpine AS frontend-builder
WORKDIR /frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
ARG VITE_APP_NAME=BodySpec\ Learn
ARG VITE_APP_VERSION=1.0.0
ARG VITE_KEYCLOAK_URL
ARG VITE_KEYCLOAK_REALM=bodyspec
ARG VITE_KEYCLOAK_CLIENT_ID=dexa-education
ENV VITE_APP_NAME=${VITE_APP_NAME}
ENV VITE_APP_VERSION=${VITE_APP_VERSION}
ENV VITE_KEYCLOAK_URL=${VITE_KEYCLOAK_URL}
ENV VITE_KEYCLOAK_REALM=${VITE_KEYCLOAK_REALM}
ENV VITE_KEYCLOAK_CLIENT_ID=${VITE_KEYCLOAK_CLIENT_ID}
RUN npm run build

# Production image
FROM python:3.12-alpine AS runner

# Install system dependencies for WeasyPrint
RUN apk add --no-cache \
    bash \
    coreutils \
    ca-certificates \
    tzdata \
    # WeasyPrint dependencies
    pango \
    fontconfig \
    ttf-freefont \
    # Build dependencies (will be removed)
    && apk add --no-cache --virtual .build-deps \
    gcc \
    musl-dev \
    python3-dev \
    libffi-dev

WORKDIR /app

# Install Python dependencies
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt \
    && apk del .build-deps

# Copy backend
COPY backend/app app/
COPY backend/alembic alembic/
COPY backend/alembic.ini ./
COPY content content/
COPY setup/* ./

# Copy frontend build
COPY --from=frontend-builder /frontend/dist /app/static

# Create non-root user
RUN adduser -D -u 1000 appuser && chown -R appuser:appuser /app
USER appuser

ENV PYTHONPATH=/app
ENV PYTHONUNBUFFERED=1
EXPOSE 8000

CMD ["./prod.sh"]
