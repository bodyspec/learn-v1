#!/bin/bash

set -e

PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
BACKEND_DIR="${PROJECT_ROOT}/backend"
FRONTEND_DIR="${PROJECT_ROOT}/frontend"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

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
