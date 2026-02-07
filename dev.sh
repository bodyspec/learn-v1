#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"
PID_FILE="${PROJECT_ROOT}/.dev.pid"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Find an open port starting from the given number
find_open_port() {
    local port=${1:-8000}
    while lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1; do
        port=$((port + 1))
    done
    echo $port
}

# Kill processes from a previous dev.sh run
kill_existing() {
    if [ -f "$PID_FILE" ]; then
        while read -r pid; do
            if kill -0 "$pid" 2>/dev/null; then
                echo -e "${YELLOW}Killing existing process $pid...${NC}"
                kill "$pid" 2>/dev/null || true
            fi
        done < "$PID_FILE"
        rm -f "$PID_FILE"
        sleep 1
    fi
}

# Wait for a URL to respond successfully
wait_for_healthy() {
    local url=$1 timeout=${2:-30} elapsed=0
    while ! curl -sf "$url" >/dev/null 2>&1; do
        sleep 1
        elapsed=$((elapsed + 1))
        if [ $elapsed -ge $timeout ]; then
            echo -e "${RED}Timeout waiting for $url${NC}"
            exit 1
        fi
    done
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    rm -f "$PID_FILE"
    exit 0
}

echo -e "${GREEN}Starting BodySpec Learn development environment...${NC}"

# Kill any leftover processes from a previous run
kill_existing

BACKEND_PORT=$(find_open_port 8000)
FRONTEND_PORT=$(find_open_port $((BACKEND_PORT + 1000)))

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

# Wait for backend to be healthy
wait_for_healthy "http://localhost:${BACKEND_PORT}/health" 30

# Start frontend
echo -e "${GREEN}Starting frontend on port ${FRONTEND_PORT}...${NC}"
(
    cd "${FRONTEND_DIR}"
    npm run dev -- --port ${FRONTEND_PORT}
) &
FRONTEND_PID=$!

# Write PID file for future runs
echo "$BACKEND_PID" > "$PID_FILE"
echo "$FRONTEND_PID" >> "$PID_FILE"

echo -e "${GREEN}Development servers running!${NC}"
echo -e "  Backend:  http://localhost:${BACKEND_PORT}"
echo -e "  Frontend: http://localhost:${FRONTEND_PORT}"
echo -e "  API Docs: http://localhost:${BACKEND_PORT}/docs"
echo -e "\nPress Ctrl+C to stop."

wait
