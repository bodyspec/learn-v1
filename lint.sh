#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Parse flags
RUN_TESTS=true
for arg in "$@"; do
    case "$arg" in
        --no-tests) RUN_TESTS=false ;;
    esac
done

echo -e "${GREEN}Running linters...${NC}"

# Backend linting
echo -e "\n${YELLOW}=== Backend Linting ===${NC}"

cd "${BACKEND_DIR}"

if [ ! -d ".venv" ]; then
    echo -e "${RED}Virtual environment not found. Run dev.sh first.${NC}"
    exit 1
fi

source .venv/bin/activate

echo -e "\n${YELLOW}Running flake8...${NC}"
flake8 app --max-line-length=100 --extend-ignore=E501

echo -e "\n${YELLOW}Running mypy...${NC}"
mypy app --ignore-missing-imports

echo -e "\n${YELLOW}Running isort (check only)...${NC}"
isort app --check-only --diff

# Frontend linting
echo -e "\n${YELLOW}=== Frontend Linting ===${NC}"

cd "${FRONTEND_DIR}"

if [ ! -d "node_modules" ]; then
    echo -e "${RED}node_modules not found. Run dev.sh first.${NC}"
    exit 1
fi

echo -e "\n${YELLOW}Running eslint...${NC}"
npm run lint

echo -e "\n${YELLOW}Running TypeScript type check...${NC}"
npx tsc --noEmit

echo -e "\n${GREEN}All linters passed!${NC}"

# Run tests unless --no-tests flag is passed
if [ "$RUN_TESTS" = true ]; then
    echo -e "\n${YELLOW}=== Running Tests ===${NC}"

    echo -e "\n${YELLOW}Running backend tests...${NC}"
    cd "${BACKEND_DIR}"
    source .venv/bin/activate
    python -m pytest tests/ -v

    echo -e "\n${YELLOW}Running frontend tests...${NC}"
    cd "${FRONTEND_DIR}"
    npx vitest run --project unit

    echo -e "\n${GREEN}All linters and tests passed!${NC}"
else
    echo -e "${YELLOW}Skipping tests (--no-tests flag)${NC}"
fi
