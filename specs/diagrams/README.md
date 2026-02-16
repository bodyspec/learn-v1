# Diagram Specs

Markdown specs that define educational diagrams for the course content. Each spec describes layout, content, and placement for a single diagram.

Generated PNGs live in `content/assets/diagrams/`. There are currently 31 specs and 31 matching PNGs.

## Generating diagrams

Diagrams are generated with [PaperBanana](https://github.com/llmsresearch/paperbanana), which uses Google Gemini to run a multi-agent pipeline (Planner, Stylist, Visualizer, Critic) with iterative refinement.

### Prerequisites

- Python venv activated (the backend venv works)
- `pip install paperbanana`
- `GOOGLE_API_KEY` env var set (billing-enabled Gemini key — see `.env.example`)

### Single diagram

```bash
paperbanana generate \
  --input specs/diagrams/sarcopenia-diagnostic-algorithm.md \
  --caption "EWGSOP2 sarcopenia diagnostic algorithm flowchart" \
  --output content/assets/diagrams/sarcopenia-diagnostic-algorithm.png \
  --vlm-model gemini-3-flash-preview \
  --iterations 2
```

### Batch generation

```bash
./scripts/generate-diagrams.sh            # generate all diagrams
./scripts/generate-diagrams.sh --dry-run   # preview commands without running
```

### CLI flags

| Flag | Description |
|------|-------------|
| `--input` | Path to the diagram spec markdown file |
| `--caption` | Figure caption / communicative intent (be descriptive) |
| `--output` | Output image path |
| `--vlm-model` | VLM for planning/critique (default: `gemini-2.0-flash`, recommend `gemini-3-flash-preview`) |
| `--iterations` | Max refinement rounds (default: 3) |

The image generation model is `gemini-3-pro-image-preview` (the default, no flag needed).

## Spec format

Each spec is a markdown file with YAML frontmatter:

```yaml
---
target_file: content/deep-dives/sarcopenia/01-sarcopenia-aging.md
target_section: "## Assessment"
placement: Inline image after the section heading
output_path: content/assets/diagrams/sarcopenia-diagnostic-algorithm.svg
---
```

Followed by sections describing purpose, visual layout, content/data, and style guidelines. The `output_path` in frontmatter is informational — the actual output path is set via the `--output` CLI flag.

## HTML-generated diagrams

Some diagrams are generated from HTML templates via Playwright instead of PaperBanana. This produces pixel-perfect, deterministic output that is consistent across regenerations.

| Diagram | Generator |
|---------|-----------|
| `body-fat-ranges-male.png` | `node scripts/generate-body-fat-charts.mjs` |
| `body-fat-ranges-female.png` | `node scripts/generate-body-fat-charts.mjs` |

The corresponding spec files (`body-fat-ranges-male.md`, `body-fat-ranges-female.md`) are kept as reference documentation but are **not used for generation**. The batch script `generate-diagrams.sh` automatically skips these specs.

## Notes

- The critic may approve on the first iteration, so `--iterations 2` is a reasonable default
- Intermediate iterations and metadata are saved to `specs/diagrams/run_<timestamp>/`
- A billing-enabled API key is recommended — free-tier quotas exhaust quickly
