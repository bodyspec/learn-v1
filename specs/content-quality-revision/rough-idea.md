# Rough Idea: Content Quality Revision

## Problem

The BodySpec Learn platform has 24 educational content files (markdown) across modules and deep-dives. Quality is inconsistent:

- **Some files are well-written prose** with good introductions and context.
- **Others are table/list-heavy** and lack narrative context or introductions.
- **Cross-references between sections** (e.g., "in the previous section...") break self-containment — each section should introduce its subject directly and be internally consistent.

## Goal

Revise all content files so they are:

1. **High quality prose** — good introductions that set up the topic, narrative flow, not just raw lists/tables.
2. **Self-contained** — no references to "previous" or "next" sections. Each section introduces its subject directly.
3. **Consistent citation standards** — any new or revised content must follow the same reference and citation conventions already used in the best existing files.

## Scope

24 markdown files across:

### Modules
- `content/modules/core/` — 6 files (01-how-dexa-works through 06-scan-preparation)
- `content/modules/chiropractor/` — 3 files
- `content/modules/physician/` — 4 files
- `content/modules/trainer/` — 3 files

### Deep-Dives
- `content/deep-dives/bone-health/` — 2 files
- `content/deep-dives/glp1-monitoring/` — 2 files
- `content/deep-dives/sarcopenia/` — 2 files
- `content/deep-dives/visceral-fat/` — 2 files
