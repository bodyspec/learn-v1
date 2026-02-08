#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"
PID_FILE="${PROJECT_ROOT}/.dev.pid"

# Preferred ports — frontend range must match Keycloak redirect_uri whitelist
BACKEND_PORT_START=8000
BACKEND_PORT_MAX=8099
FRONTEND_PORT_START=9000
FRONTEND_PORT_MAX=9001

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if a port is in use; returns 0 if busy
port_busy() {
    lsof -Pi :"$1" -sTCP:LISTEN -t >/dev/null 2>&1
}

# Check if a PID from our PID file is still running
pid_alive() {
    kill -0 "$1" 2>/dev/null
}

# Find a free port starting from $1, warn if it exceeds $2 (configured max)
find_port() {
    local port=$1 max=$2 label=$3
    while port_busy "$port"; do
        port=$((port + 1))
    done
    if [ "$port" -gt "$max" ]; then
        echo -e "${YELLOW}Port $port for $label is outside configured range ($1-$max).${NC}" >&2
        echo -e "${YELLOW}Keycloak auth may not work on this port.${NC}" >&2
        if [ ! -t 0 ]; then
            echo -e "${RED}Non-interactive mode — aborting (no configured port available).${NC}" >&2
            exit 1
        fi
        read -rp "Continue with port $port anyway? [y/N] " answer
        case "$answer" in
            [yY]|[yY][eE][sS]) ;;
            *)
                echo -e "${RED}Aborting.${NC}" >&2
                exit 1
                ;;
        esac
    fi
    echo "$port"
}

# Kill a previous learn-v1 run if still alive, then find free ports
acquire_ports() {
    # Step 1: Handle our own previous run (from .dev.pid)
    if [ -f "$PID_FILE" ]; then
        local stale_pids=()
        while read -r pid; do
            if pid_alive "$pid"; then
                stale_pids+=("$pid")
            fi
        done < "$PID_FILE"

        if [ ${#stale_pids[@]} -gt 0 ]; then
            echo -e "${YELLOW}Previous learn-v1 dev session still running (PIDs: ${stale_pids[*]})${NC}"

            if [ ! -t 0 ]; then
                echo -e "${YELLOW}Non-interactive mode — killing previous session...${NC}"
            else
                read -rp "Kill previous session? [y/N] " answer
                case "$answer" in
                    [yY]|[yY][eE][sS]) ;;
                    *)
                        echo -e "${RED}Aborting.${NC}"
                        exit 1
                        ;;
                esac
            fi

            for pid in "${stale_pids[@]}"; do
                echo -e "${YELLOW}Killing PID $pid...${NC}"
                kill "$pid" 2>/dev/null || true
            done

            # Wait for processes to exit
            local retries=10 i=0
            for pid in "${stale_pids[@]}"; do
                while pid_alive "$pid"; do
                    sleep 0.5
                    i=$((i + 1))
                    if [ $i -ge $retries ]; then
                        echo -e "${RED}Previous session still running after waiting. Aborting.${NC}"
                        exit 1
                    fi
                done
            done
        fi
        rm -f "$PID_FILE"
    fi

    # Step 2: Find free ports, auto-incrementing within configured range
    BACKEND_PORT=$(find_port "$BACKEND_PORT_START" "$BACKEND_PORT_MAX" "backend")
    FRONTEND_PORT=$(find_port "$FRONTEND_PORT_START" "$FRONTEND_PORT_MAX" "frontend")
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
    wait $BACKEND_PID 2>/dev/null
    wait $FRONTEND_PID 2>/dev/null
    rm -f "$PID_FILE"
    exit 0
}

# Install all dependencies (Python venv, npm, .env)
install_deps() {
    if [ ! -d "${BACKEND_DIR}/.venv" ]; then
        echo -e "${YELLOW}Creating Python virtual environment...${NC}"
        python3 -m venv "${BACKEND_DIR}/.venv"
    fi
    source "${BACKEND_DIR}/.venv/bin/activate"
    pip install -q --upgrade pip
    echo -e "${YELLOW}Installing Python dependencies...${NC}"
    pip install -q -e "${BACKEND_DIR}[dev]"

    if [ ! -d "${FRONTEND_DIR}/node_modules" ]; then
        echo -e "${YELLOW}Installing npm dependencies...${NC}"
        (cd "${FRONTEND_DIR}" && npm install)
    fi

    if [ ! -f "${PROJECT_ROOT}/.env" ]; then
        echo -e "${YELLOW}Creating .env from .env.example...${NC}"
        cp "${PROJECT_ROOT}/.env.example" "${PROJECT_ROOT}/.env"
    fi
}

# E2E subcommand: install deps, start servers, run Playwright
cmd_e2e() {
    install_deps

    # Ensure Playwright browsers are installed
    echo -e "${YELLOW}Checking Playwright browsers...${NC}"
    (cd "${FRONTEND_DIR}" && npx playwright install --with-deps chromium)

    acquire_ports

    echo -e "${YELLOW}Backend port: ${BACKEND_PORT}${NC}"
    echo -e "${YELLOW}Frontend port: ${FRONTEND_PORT}${NC}"

    trap cleanup SIGINT SIGTERM

    # Start backend (no --reload for e2e)
    echo -e "${GREEN}Starting backend on port ${BACKEND_PORT}...${NC}"
    (cd "${BACKEND_DIR}" && source .venv/bin/activate && \
        python -m uvicorn app.main:app --host 0.0.0.0 --port ${BACKEND_PORT}) &
    BACKEND_PID=$!

    # Start frontend
    export VITE_BACKEND_PORT=${BACKEND_PORT}
    echo -e "${GREEN}Starting frontend on port ${FRONTEND_PORT}...${NC}"
    (cd "${FRONTEND_DIR}" && npm run dev -- --port ${FRONTEND_PORT}) &
    FRONTEND_PID=$!

    echo "$BACKEND_PID" > "$PID_FILE"
    echo "$FRONTEND_PID" >> "$PID_FILE"

    wait_for_healthy "http://localhost:${BACKEND_PORT}/health" 30
    wait_for_healthy "http://localhost:${FRONTEND_PORT}" 30

    echo -e "${GREEN}Servers ready. Running E2E tests...${NC}"

    local exit_code=0
    (cd "${FRONTEND_DIR}" && \
        PLAYWRIGHT_BASE_URL="http://localhost:${FRONTEND_PORT}" \
        npx playwright test "$@") || exit_code=$?

    cleanup
    exit $exit_code
}

# Handle subcommands
case "${1:-}" in
    e2e)
        cmd_e2e "${@:2}"
        ;;
    storybook)
        install_deps
        echo -e "${GREEN}Starting Storybook...${NC}"
        cd "${FRONTEND_DIR}"
        npm run storybook
        exit 0
        ;;
    "")
        ;; # default: start dev servers below
    *)
        echo -e "${RED}Unknown command: $1${NC}"
        echo "Usage: ./dev.sh [storybook|e2e]"
        exit 1
        ;;
esac

echo -e "${GREEN}Starting BodySpec Learn development environment...${NC}"

install_deps
acquire_ports

echo -e "${YELLOW}Backend port: ${BACKEND_PORT}${NC}"
echo -e "${YELLOW}Frontend port: ${FRONTEND_PORT}${NC}"

export VITE_BACKEND_PORT=${BACKEND_PORT}

trap cleanup SIGINT SIGTERM

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
