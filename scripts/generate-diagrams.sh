#!/usr/bin/env bash
set -euo pipefail

# Batch generate diagram PNGs using PaperBanana
# Usage: ./scripts/generate-diagrams.sh [--dry-run]
# Assumes: backend venv is active, GOOGLE_API_KEY is set

DRY_RUN=false
if [[ "${1:-}" == "--dry-run" ]]; then
    DRY_RUN=true
fi

SPEC_DIR="specs/diagrams"
OUTPUT_DIR="content/assets/diagrams"
PASS=0
FAIL=0
SKIP=0

mkdir -p "$OUTPUT_DIR"

for spec in "$SPEC_DIR"/*.md; do
    name=$(basename "$spec" .md)
    title=$(grep -m1 '^# ' "$spec" | sed 's/^# //')
    output="$OUTPUT_DIR/$name.png"

    cmd="paperbanana generate --input \"$spec\" --caption \"$title\" --output \"$output\" --vlm-model gemini-3-flash-preview --iterations 2"

    if $DRY_RUN; then
        echo "[DRY RUN] $cmd"
        ((SKIP++))
        continue
    fi

    echo "Generating: $name"
    if eval "$cmd"; then
        echo "  PASS $name"
        ((PASS++))
    else
        echo "  FAIL $name"
        ((FAIL++))
    fi
done

echo ""
echo "Done: $PASS passed, $FAIL failed, $SKIP skipped"
