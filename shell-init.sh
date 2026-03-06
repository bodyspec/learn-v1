#!/bin/bash
# Project environment initialization
# Sourced automatically by VS Code terminal via .vscode/settings.json

# Source profile if not already done (for PATH, nvm, etc.)
if [ -z "$PROFILE_LOADED" ]; then
    export PROFILE_LOADED=1
    source ~/.bash_profile 2>/dev/null
fi

START_TIME=$(date +%s.%N)

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[0;33m'
NC='\033[0m'

# Prompt helper: yes/skip with default skip
ask_install() {
    local prompt="$1"
    read -p "${prompt} [y/N] " -n 1 -r
    echo
    [[ $REPLY =~ ^[Yy]$ ]]
}

PYTHON_CMD="python3"

# Check for missing dependencies
get_missing_deps() {
    local missing=()
    command -v python3 &>/dev/null || missing+=("python3")
    command -v node &>/dev/null || missing+=("node")
    echo "${missing[@]}"
}

# Check if backend venv exists, prompt to create if not
if [ ! -d "backend/.venv" ]; then
    if ! command -v brew &>/dev/null; then
        echo -e "${YELLOW}Homebrew not found. Please install it first: https://brew.sh${NC}"
    else
        missing_deps=$(get_missing_deps)

        echo -e "${YELLOW}Setup required:${NC}"
        if [ -n "$missing_deps" ]; then
            echo -e "  - Install via brew: ${CYAN}${missing_deps}${NC}"
        fi
        echo -e "  - Create Python virtual environment"
        echo -e "  - Install backend dependencies"
        echo -e "  - Install frontend dependencies"

        if ask_install "Proceed?"; then
            if [ -n "$missing_deps" ]; then
                echo "Installing brew dependencies..."
                brew install $missing_deps
            fi
            echo "Creating backend/.venv..."
            $PYTHON_CMD -m venv backend/.venv
            source backend/.venv/bin/activate
            echo "Upgrading pip..."
            pip install --upgrade pip --quiet
            echo "Installing backend dependencies..."
            (cd backend && pip install -e ".[dev]")
            if [ ! -d "frontend/node_modules" ]; then
                echo "Installing frontend dependencies..."
                (cd frontend && npm install)
            fi
            echo -e "${GREEN}Setup complete.${NC}"
        fi
    fi
fi

# Silently activate venv if it exists
if [ -d "backend/.venv" ]; then
    source backend/.venv/bin/activate 2>/dev/null
fi

# Print status line
PYTHON_V=$(command -v python &>/dev/null && python --version 2>/dev/null | cut -d' ' -f2 || echo "n/a")
NODE_V=$(command -v node &>/dev/null && node --version 2>/dev/null || echo "n/a")
ELAPSED=$(echo "$(date +%s.%N) - $START_TIME" | bc)
printf "${CYAN}learn${NC} │ ${BLUE}python ${PYTHON_V}${NC} │ ${GREEN}node ${NODE_V}${NC} │ startup %.3fs\n" "$ELAPSED"
