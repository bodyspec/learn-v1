# Account Portal — Summary

## Artifacts

| File | Description |
|------|-------------|
| `rough-idea.md` | Original idea from PROMPT.local.md |
| `requirements.md` | 11 Q&As covering layout, admin, PDF, reset, and UX decisions |
| `research/pdf-bug.md` | Root cause analysis of the pdf.json download bug |
| `research/ui-patterns.md` | Design system documentation (colors, components, patterns) |
| `research/admin-auth.md` | Admin authorization pattern research |
| `design.md` | Full design: architecture, data models, interfaces, acceptance criteria, testing |
| `plan.md` | 9-step incremental implementation plan |
| `summary.md` | This file |

## Overview

The Account Portal consolidates Dashboard, Certificates, and Profile into a sidebar-navigated portal at `/account/*`. It adds admin user management (view, promote, demote, delete), fixes the broken certificate PDF download, and introduces a progress reset feature with type-to-confirm safety.

### Key Decisions
- Sidebar layout with hamburger toggle on mobile
- `is_admin` boolean in DB (not Keycloak roles)
- Hard-enforce `@bodyspec.com` domain for admin promotion
- JS Blob download to fix PDF auth issue
- Type "RESET" confirmation for progress reset with selectable scope

## Next Steps

To implement this plan, work through the 9 steps in `plan.md` sequentially (Steps 3 and 4 can be parallelized). Each step is designed to be independently demoable and testable.
