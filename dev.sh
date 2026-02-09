#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"
PIDFILE="${PROJECT_ROOT}/.dev.pid"

# Preferred ports — ranges must match Keycloak redirect_uri whitelist
BACKEND_PORT_START=8000
BACKEND_PORT_MAX=8099
FRONTEND_PORT_START=9000
FRONTEND_PORT_MAX=9001

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

log()  { echo -e "${GREEN}$1${NC}"; }
warn() { echo -e "${YELLOW}$1${NC}"; }
err()  { echo -e "${RED}$1${NC}" >&2; }

# Check if a port is in use
port_busy() {
    lsof -Pi :"$1" -sTCP:LISTEN -t >/dev/null 2>&1
}

# Check if a PID is still running
pid_alive() {
    kill -0 "$1" 2>/dev/null
}

# Find an open port starting from $1, warn if it exceeds $2 (configured max)
find_open_port() {
    local port=$1 max=$2 label=$3
    while port_busy "$port"; do
        port=$((port + 1))
    done
    if [ "$port" -gt "$max" ]; then
        warn "Port $port for $label is outside configured range ($1-$max)."
        warn "Keycloak auth may not work on this port."
        if [ ! -t 0 ]; then
            err "Non-interactive mode — aborting (no configured port available)."
            exit 1
        fi
        read -rp "Continue with port $port anyway? [y/N] " answer
        case "$answer" in
            [yY]|[yY][eE][sS]) ;;
            *)
                err "Aborting."
                exit 1
                ;;
        esac
    fi
    echo "$port"
}

# Ensure Python venv exists and deps are installed
setup_backend() {
    if [ ! -d "${BACKEND_DIR}/.venv" ]; then
        warn "Creating Python virtual environment..."
        python3 -m venv "${BACKEND_DIR}/.venv"
    fi
    source "${BACKEND_DIR}/.venv/bin/activate"
    pip install -q --upgrade pip
    warn "Installing Python dependencies..."
    pip install -q -e "${BACKEND_DIR}[dev]"

    if [ ! -f "${PROJECT_ROOT}/.env" ]; then
        warn "Creating .env from .env.example..."
        cp "${PROJECT_ROOT}/.env.example" "${PROJECT_ROOT}/.env"
    fi
}

# Ensure node_modules exists
setup_frontend() {
    if [ ! -d "${FRONTEND_DIR}/node_modules" ]; then
        warn "Installing npm dependencies..."
        (cd "${FRONTEND_DIR}" && npm install)
    fi
}

# Ensure e2e deps and Playwright browsers are installed
setup_e2e() {
    local E2E_DIR="${PROJECT_ROOT}/e2e"
    if [ ! -d "${E2E_DIR}/node_modules" ]; then
        warn "Installing e2e dependencies..."
        (cd "${E2E_DIR}" && npm install)
    fi
    if ! (cd "${E2E_DIR}" && npx playwright install --with-deps chromium) >/dev/null 2>&1; then
        warn "Installing Playwright browsers..."
        (cd "${E2E_DIR}" && npx playwright install chromium)
    fi
}

# Run Alembic migrations
run_migrations() {
    warn "Running database migrations..."
    if ! (cd "${BACKEND_DIR}" && source .venv/bin/activate && alembic upgrade head); then
        err "DATABASE MIGRATIONS FAILED — the app will likely not work correctly."
        err "Run 'cd backend && alembic upgrade head' to see full error output."
        exit 1
    fi
}

# Cleanup background processes on exit
cleanup() {
    echo ""
    warn "Shutting down..."
    kill $BACKEND_PID 2>/dev/null || true
    kill $FRONTEND_PID 2>/dev/null || true
    # Wait briefly for graceful exit, then force-kill stragglers
    local waited=0
    while [ $waited -lt 6 ]; do
        local alive=0
        kill -0 $BACKEND_PID 2>/dev/null && alive=1
        kill -0 $FRONTEND_PID 2>/dev/null && alive=1
        [ $alive -eq 0 ] && break
        sleep 0.5
        waited=$((waited + 1))
    done
    kill -9 $BACKEND_PID 2>/dev/null || true
    kill -9 $FRONTEND_PID 2>/dev/null || true
    wait $BACKEND_PID 2>/dev/null
    wait $FRONTEND_PID 2>/dev/null
    remove_pidfile
    exit 0
}

# Wait for a URL to return a successful response
wait_for_healthy() {
    local url=$1 timeout=${2:-30} elapsed=0
    while ! curl -sf "$url" >/dev/null 2>&1; do
        sleep 1
        elapsed=$((elapsed + 1))
        if [ $elapsed -ge $timeout ]; then
            err "Timeout waiting for $url"
            return 1
        fi
    done
}

# Write PID file with current session info
write_pidfile() {
    cat > "$PIDFILE" <<EOF
BACKEND_PID=$BACKEND_PID
FRONTEND_PID=$FRONTEND_PID
BACKEND_PORT=$BACKEND_PORT
FRONTEND_PORT=$FRONTEND_PORT
EOF
}

# Remove PID file
remove_pidfile() {
    rm -f "$PIDFILE"
}

# Check for existing learn-v1 processes and prompt to kill or exit
check_existing() {
    if [ ! -f "$PIDFILE" ]; then
        return 0
    fi

    # Read saved state
    local saved_backend_pid saved_frontend_pid saved_backend_port saved_frontend_port
    saved_backend_pid=$(grep '^BACKEND_PID=' "$PIDFILE" | cut -d= -f2)
    saved_frontend_pid=$(grep '^FRONTEND_PID=' "$PIDFILE" | cut -d= -f2)
    saved_backend_port=$(grep '^BACKEND_PORT=' "$PIDFILE" | cut -d= -f2)
    saved_frontend_port=$(grep '^FRONTEND_PORT=' "$PIDFILE" | cut -d= -f2)

    # Check if any saved processes are still alive
    local alive_pids=()
    for pid in $saved_backend_pid $saved_frontend_pid; do
        if [ -n "$pid" ] && pid_alive "$pid"; then
            alive_pids+=("$pid")
        fi
    done

    if [ ${#alive_pids[@]} -eq 0 ]; then
        # Stale PID file, clean it up
        remove_pidfile
        return 0
    fi

    warn "Existing BodySpec Learn instance detected:"
    [ -n "$saved_backend_pid" ] && pid_alive "$saved_backend_pid" && \
        echo -e "  ${CYAN}Backend  PID ${saved_backend_pid} on port ${saved_backend_port}${NC}"
    [ -n "$saved_frontend_pid" ] && pid_alive "$saved_frontend_pid" && \
        echo -e "  ${CYAN}Frontend PID ${saved_frontend_pid} on port ${saved_frontend_port}${NC}"
    echo ""

    local answer
    if [ ! -t 0 ]; then
        # Non-interactive (CI, piped) — auto-kill
        warn "Non-interactive mode — killing previous session..."
        answer="k"
    else
        echo -e "  ${GREEN}k${NC}) Kill existing and restart"
        echo -e "  ${RED}q${NC}) Quit"
        echo -n "Choice [k/q]: "
        read -r answer
    fi
    case "$answer" in
        k|K)
            for pid in "${alive_pids[@]}"; do
                kill "$pid" 2>/dev/null || true
            done
            # Wait for processes to actually die
            for pid in "${alive_pids[@]}"; do
                local waited=0
                while pid_alive "$pid" && [ $waited -lt 5 ]; do
                    sleep 0.5
                    waited=$((waited + 1))
                done
                # Force kill if still alive
                if pid_alive "$pid"; then
                    kill -9 "$pid" 2>/dev/null || true
                fi
            done
            remove_pidfile
            # Wait for ports to actually be released by the OS
            for port in $saved_backend_port $saved_frontend_port; do
                local pw=0
                while port_busy "$port" && [ $pw -lt 10 ]; do
                    sleep 0.5
                    pw=$((pw + 1))
                done
            done
            # Reuse the same ports
            REUSE_BACKEND_PORT=$saved_backend_port
            REUSE_FRONTEND_PORT=$saved_frontend_port
            log "Killed existing instance."
            ;;
        *)
            log "Exiting."
            exit 0
            ;;
    esac
}

# --- Subcommands ---

cmd_up() {
    check_existing
    BACKEND_PORT=${REUSE_BACKEND_PORT:-$(find_open_port "$BACKEND_PORT_START" "$BACKEND_PORT_MAX" "backend")}
    FRONTEND_PORT=${REUSE_FRONTEND_PORT:-$(find_open_port "$FRONTEND_PORT_START" "$FRONTEND_PORT_MAX" "frontend")}

    log "BodySpec Learn development environment"
    echo -e "  ${CYAN}Backend port:  ${BACKEND_PORT}${NC}"
    echo -e "  ${CYAN}Frontend port: ${FRONTEND_PORT}${NC}"
    echo ""

    setup_backend
    setup_frontend
    run_migrations

    export VITE_BACKEND_PORT=${BACKEND_PORT}

    trap cleanup SIGINT SIGTERM

    # Start backend
    log "Starting backend on port ${BACKEND_PORT}..."
    (
        cd "${BACKEND_DIR}"
        source .venv/bin/activate
        exec python -m uvicorn app.main:app \
            --host 0.0.0.0 \
            --port ${BACKEND_PORT} \
            --reload \
            --reload-dir app
    ) &
    BACKEND_PID=$!

    # Wait for backend to be healthy before starting frontend
    wait_for_healthy "http://localhost:${BACKEND_PORT}/health" 30

    # Start frontend
    log "Starting frontend on port ${FRONTEND_PORT}..."
    (
        cd "${FRONTEND_DIR}"
        exec npm run dev -- --port ${FRONTEND_PORT}
    ) &
    FRONTEND_PID=$!

    write_pidfile

    echo ""
    log "Development servers running!"
    echo -e "  Backend:  ${CYAN}http://localhost:${BACKEND_PORT}${NC}"
    echo -e "  Frontend: ${CYAN}http://localhost:${FRONTEND_PORT}${NC}"
    echo -e "  API Docs: ${CYAN}http://localhost:${BACKEND_PORT}/docs${NC}"
    echo -e "  Health:   ${CYAN}http://localhost:${BACKEND_PORT}/health${NC}"
    echo ""
    echo -e "Press Ctrl+C to stop."

    wait
}

cmd_test() {
    setup_backend
    setup_frontend

    log "Running backend tests..."
    (cd "${BACKEND_DIR}" && source .venv/bin/activate && python -m pytest tests/ -v)

    log "Running frontend tests..."
    (cd "${FRONTEND_DIR}" && npm test)

    log "All tests passed!"
}

cmd_lint() {
    setup_backend
    setup_frontend

    log "Running backend lint..."
    (cd "${BACKEND_DIR}" && source .venv/bin/activate && python -m flake8 app/ tests/)

    log "Running frontend lint..."
    (cd "${FRONTEND_DIR}" && npm run lint)

    log "Lint passed!"
}

cmd_db() {
    case "${1:-}" in
        migrate)
            setup_backend
            run_migrations
            ;;
        *)
            echo "Usage: ./dev.sh db [migrate]"
            exit 1
            ;;
    esac
}

cmd_e2e() {
    check_existing

    BACKEND_PORT=${REUSE_BACKEND_PORT:-$(find_open_port "$BACKEND_PORT_START" "$BACKEND_PORT_MAX" "backend")}
    FRONTEND_PORT=${REUSE_FRONTEND_PORT:-$(find_open_port "$FRONTEND_PORT_START" "$FRONTEND_PORT_MAX" "frontend")}

    log "Running E2E tests"
    echo -e "  ${CYAN}Backend port:  ${BACKEND_PORT}${NC}"
    echo -e "  ${CYAN}Frontend port: ${FRONTEND_PORT}${NC}"
    echo ""

    setup_backend
    setup_frontend
    setup_e2e
    run_migrations

    export VITE_BACKEND_PORT=${BACKEND_PORT}

    # Source .env.e2e for Keycloak test account credentials
    source "${PROJECT_ROOT}/.env.e2e" 2>/dev/null || true

    # Start backend in background
    (
        cd "${BACKEND_DIR}"
        source .venv/bin/activate
        exec python -m uvicorn app.main:app \
            --host 0.0.0.0 \
            --port ${BACKEND_PORT}
    ) &
    local backend_pid=$!

    # Start frontend in background
    (
        cd "${FRONTEND_DIR}"
        exec npm run dev -- --port ${FRONTEND_PORT}
    ) &
    local frontend_pid=$!

    # Write PID file for e2e servers too
    BACKEND_PID=$backend_pid
    FRONTEND_PID=$frontend_pid
    write_pidfile

    # Tear down servers on exit (success or failure)
    trap 'kill $backend_pid $frontend_pid 2>/dev/null; remove_pidfile; exit' EXIT INT TERM

    # Wait for both servers to be healthy
    log "Waiting for servers..."
    if ! wait_for_healthy "http://localhost:${BACKEND_PORT}/health" 30; then
        err "Backend failed to start"
        exit 1
    fi
    if ! wait_for_healthy "http://localhost:${FRONTEND_PORT}" 30; then
        err "Frontend failed to start"
        exit 1
    fi
    log "Servers healthy. Running Playwright..."

    # Run Playwright tests, passing through any extra args (e.g. --headed, test file)
    (
        cd "${PROJECT_ROOT}/e2e"
        E2E_FRONTEND_PORT=${FRONTEND_PORT} \
        E2E_TEST_EMAIL="${E2E_TEST_EMAIL}" \
        E2E_TEST_PASSWORD="${E2E_TEST_PASSWORD}" \
        npx playwright test "$@"
    )
}

cmd_storybook() {
    setup_frontend
    log "Starting Storybook..."
    (cd "${FRONTEND_DIR}" && npm run storybook)
}

cmd_help() {
    echo -e "${GREEN}BodySpec Learn Development Script${NC}"
    echo ""
    echo "Usage: ./dev.sh [command]"
    echo ""
    echo "Commands:"
    echo "  (none)      Start dev servers (backend + frontend)"
    echo "  up          Same as no command — start dev servers"
    echo "  test        Run all tests (backend + frontend)"
    echo "  lint        Run linters (flake8 + eslint)"
    echo "  e2e         Run Playwright E2E tests (starts servers automatically)"
    echo "  storybook   Start Storybook"
    echo "  db migrate  Run database migrations"
    echo "  help        Show this help message"
}

# --- Main ---

case "${1:-up}" in
    up|"")
        cmd_up
        ;;
    test)
        cmd_test
        ;;
    lint)
        cmd_lint
        ;;
    db)
        shift
        cmd_db "$@"
        ;;
    e2e)
        shift
        cmd_e2e "$@"
        ;;
    storybook)
        cmd_storybook
        ;;
    help|--help|-h)
        cmd_help
        ;;
    *)
        err "Unknown command: $1"
        cmd_help
        exit 1
        ;;
esac
