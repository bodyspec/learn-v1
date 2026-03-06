# Diagram Specs

Markdown specs that define educational diagrams for the course content. Each spec describes layout, content, and placement for a single diagram. Generated PNGs live in `content/assets/diagrams/`.

## Prerequisites

- Python venv activated (the backend venv works)
- `pip install paperbanana`
- `GOOGLE_API_KEY` env var set (billing-enabled Gemini key)

## Generating a diagram

Diagrams are generated with [PaperBanana](https://github.com/llmsresearch/paperbanana), which uses Google Gemini to run a multi-agent pipeline (Planner, Stylist, Visualizer, Critic) with iterative refinement.

```bash
paperbanana generate \
  --input specs/diagrams/regional-divisions.md \
  --caption "Front-facing body outline showing DEXA regional analysis divisions" \
  --output content/assets/diagrams/regional-divisions.png \
  --vlm-model gemini-3-pro-image-preview \
  --image-model gemini-3.1-flash-image-preview \
  --iterations 2
```

The batch script generates all specs at once:

```bash
./scripts/generate-diagrams.sh            # generate all
./scripts/generate-diagrams.sh --dry-run   # preview commands
```

### CLI flags

| Flag | Description |
|------|-------------|
| `--input` | Path to the spec markdown file |
| `--caption` | Figure caption / communicative intent (be descriptive) |
| `--output` | Output image path |
| `--vlm-model` | VLM for planning and critique (`gemini-3-pro-image-preview`) |
| `--image-model` | Image generation model (`gemini-3.1-flash-image-preview`) |
| `--iterations` | Max refinement rounds (default: 3, recommend 2) |

### Tips

- The critic often approves on the first iteration, so `--iterations 2` is a good default.
- Intermediate iterations are saved to `content/assets/diagrams/run_<timestamp>/`.
- A billing-enabled API key is required -- free-tier quotas exhaust quickly.

## Spec format

Each spec is a markdown file with YAML frontmatter:

```yaml
---
target_file: content/modules/core/01-how-dexa-works.md
target_section: "## Regional Analysis"
placement: Inline image after the section heading
output_path: content/assets/diagrams/regional-divisions.png
---
```

Followed by sections describing purpose, visual layout, content/data, color palette, typography, and accessibility. The `output_path` in frontmatter is informational -- the actual output path is set via the `--output` CLI flag.

## HTML-generated diagrams

Some diagrams use HTML templates via Playwright instead of PaperBanana for pixel-perfect, deterministic output:

| Diagram | Generator |
|---------|-----------|
| `body-fat-ranges-male.png` | `node scripts/generate-body-fat-charts.mjs` |
| `body-fat-ranges-female.png` | `node scripts/generate-body-fat-charts.mjs` |

Their spec files are kept as reference documentation but are not used for generation. The batch script skips them automatically.
