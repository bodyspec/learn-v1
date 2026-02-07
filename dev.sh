#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting BodySpec Learn development environment...${NC}"

# Find an open port
find_open_port() {
    local port=8000
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        port=$((port + 1))
    done
    echo $port
}

BACKEND_PORT=$(find_open_port)
FRONTEND_PORT=$((BACKEND_PORT + 1000))

echo -e "${YELLOW}Backend port: ${BACKEND_PORT}${NC}"
echo -e "${YELLOW}Frontend port: ${FRONTEND_PORT}${NC}"

# Setup Python virtual environment
if [ ! -d "${BACKEND_DIR}/.venv" ]; then
    echo -e "${YELLOW}Creating Python virtual environment...${NC}"
    python3 -m venv "${BACKEND_DIR}/.venv"
fi

# Activate virtual environment and install dependencies
source "${BACKEND_DIR}/.venv/bin/activate"
pip install -q --upgrade pip
echo -e "${YELLOW}Installing Python dependencies...${NC}"
pip install -q -e "${BACKEND_DIR}[dev]"

# Setup frontend
if [ ! -d "${FRONTEND_DIR}/node_modules" ]; then
    echo -e "${YELLOW}Installing npm dependencies...${NC}"
    (cd "${FRONTEND_DIR}" && npm install)
fi

# Create .env if it doesn't exist
if [ ! -f "${PROJECT_ROOT}/.env" ]; then
    echo -e "${YELLOW}Creating .env from .env.example...${NC}"
    cp "${PROJECT_ROOT}/.env.example" "${PROJECT_ROOT}/.env"
fi

# Export environment variables
export VITE_BACKEND_PORT=${BACKEND_PORT}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    exit 0
}

trap cleanup SIGINT SIGTERM

# Subcommands
case "${1:-}" in
    storybook)
        echo -e "${GREEN}Starting Storybook...${NC}"
        cd "${FRONTEND_DIR}"
        npm run storybook
        exit 0
        ;;
    "")
        ;; # default: start dev servers
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        echo "Usage: ./dev.sh [storybook]"
        exit 1
        ;;
esac

# Start backend
echo -e "${GREEN}Starting backend on port ${BACKEND_PORT}...${NC}"
(
    cd "${BACKEND_DIR}"
    source .venv/bin/activate
    python -m uvicorn app.main:app \
        --host 0.0.0.0 \
        --port ${BACKEND_PORT} \
        --reload \
        --reload-dir app
) &
BACKEND_PID=$!

# Wait for backend to start
sleep 2

# Start frontend
echo -e "${GREEN}Starting frontend on port ${FRONTEND_PORT}...${NC}"
(
    cd "${FRONTEND_DIR}"
    npm run dev -- --port ${FRONTEND_PORT}
) &
FRONTEND_PID=$!

echo -e "${GREEN}Development servers running!${NC}"
echo -e "  Backend:  http://localhost:${BACKEND_PORT}"
echo -e "  Frontend: http://localhost:${FRONTEND_PORT}"
echo -e "  API Docs: http://localhost:${BACKEND_PORT}/docs"
echo -e "\nPress Ctrl+C to stop."

wait
