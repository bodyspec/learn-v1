# Summary: Content Quality Revision

## Artifacts

| File | Description |
|------|-------------|
| `rough-idea.md` | Original idea and scope |
| `requirements.md` | 7 Q&A pairs clarifying scope, tone, constraints |
| `research/content-audit.md` | Per-file quality assessment with 4 priority tiers |
| `research/style-guide.md` | Extracted tone, citation, and markdown conventions from gold standard files |
| `research/cross-references.md` | Inventory of all cross-references to remove |
| `design.md` | Detailed design with acceptance criteria (Given-When-Then) |
| `plan.md` | 8-step implementation plan with per-step files, guidance, and verification |

## Overview

All 24 educational content files in the BodySpec Learn platform will be revised for consistent prose quality. No factual content changes — same topics, better writing.

- **3 files** need major revision (prose ratio 40-50%, structural issues)
- **9 files** need moderate revision (specific sections too list/table-heavy)
- **10 files** need minor revision (targeted fixes: missing citations, brief explanations)
- **2 files** are gold standard and define the quality bar

The implementation plan works through files in priority order (worst first), with automated verification after each batch. The plan produces working, reviewable content at every step.

## Next Steps

1. **Implement via Ralph** — use `ralph run` with a PDD preset to execute the plan autonomously
2. **Implement manually** — work through `plan.md` step by step, starting with the verification script
