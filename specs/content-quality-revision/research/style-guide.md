# Style Guide — Extracted from Best Existing Content

Based on analysis of the two gold-standard files (`core/01-how-dexa-works.md` and `visceral-fat/01-understanding-vat.md`) and patterns across all 24 files.

## Tone & Voice

- **Professional but accessible.** Avoids jargon where possible; defines technical terms on first use.
- **Authoritative without being dry.** Uses evidence confidently, not tentatively.
- **Direct.** Leads with the key point, then supports it. No burying the lede.
- Example (good): "DEXA is the clinical reference standard for measuring body composition."
- Example (avoid): "In this section, we will explore the various ways in which DEXA technology can be used to measure body composition."

## Introduction Pattern

Every section should open with 2-3 sentences that:
1. State what the topic is and why it matters
2. Frame what the reader will learn
3. Do NOT reference other sections ("in the previous section..." or "as we discussed...")

Example from `01-how-dexa-works.md`:
> "DEXA (Dual-Energy X-ray Absorptiometry) is the clinical reference standard for measuring body composition. Originally developed for bone density assessment, DEXA technology has evolved into the most reliable method for measuring fat, lean tissue, and bone mineral content throughout the body."

Example from `visceral-fat/01-understanding-vat.md`:
> "Unlike subcutaneous fat, visceral fat has direct and significant implications for metabolic health."

## Prose Style

- **Narrative-first.** Explain concepts in flowing prose. Use tables and lists to *support* the narrative, not replace it.
- **Context before data.** Always explain *why* something matters before presenting the numbers.
- **Tables embedded in prose.** A table should be preceded by a sentence explaining what it shows and followed by interpretation or key takeaways.
- **Lists used sparingly.** Bullet lists are appropriate for: discrete items (e.g., checklist steps), comparison sets, or brief enumerations. They should not carry the weight of explanation.

### Anti-patterns to fix:
- Heading → bare table with no introduction
- Heading → bullet list of 7+ items with no narrative thread
- Section that is *only* a table or *only* a list
- Seven pathophysiology factors listed without any explanation of mechanisms

## Citation & Reference Conventions

### Format
- Inline parenthetical author-year citations with superscript footnotes: `(Messier et al., 2005)[^1]`
- Footnotes collected at end of file under `## References` heading
- Full academic citations with authors, title, journal, year, and DOI where available

### Example:
```markdown
Every pound of body weight adds approximately 4 pounds of force through the knee during walking (Messier et al., 2005)[^1].

## References

[^1]: Messier SP, et al. "Weight loss reduces knee-joint loads in overweight and obese older adults with knee osteoarthritis." *Arthritis & Rheumatism*. 2005;52(7):2026-2032. doi:10.1002/art.21139
```

### Rules
- Every quantitative claim or specific medical threshold needs a citation
- Guideline references cite the issuing body (e.g., USPSTF, EWGSOP2, ISCD)
- Practical/coaching guidance does NOT need citations (appropriate for communication-focused modules)
- When citing clinical trial data, include study name and year (e.g., "STEP 1 trial (2021)")

## Markdown Conventions

### Callout Blocks
Four semantic callout types used consistently across the codebase:

```markdown
:::note
General information, clarifications, or context. Used for: definitions, statistical methodology, scope notes.
:::

:::tip
Actionable practical guidance. Used for: best practices, coaching advice, quick wins.
:::

:::clinical
Clinical relevance or provider-specific guidance. Used for: diagnostic implications, when-to-consider, clinical pearls.
:::

:::warning
Important caveats, risks, or safety information. Used for: contraindications, measurement limitations, red flags.
:::
```

### Heading Hierarchy
- `## H2` for major sections
- `### H3` for subsections
- No H1 in content files (title comes from `_module.yaml`)
- No deeper than H3

### Image References
- Format: `![Descriptive alt text](/content/assets/diagrams/filename.png)`
- Alt text should be descriptive (not just "diagram")
- Placed within relevant section, not grouped at top/bottom
- Must be preserved exactly during revision

## Self-Containment Rules

1. **No backward references:** Remove "in the previous section," "as we discussed," "as covered earlier"
2. **No forward references:** Remove "we'll cover this later," "the next section explains"
3. **Re-introduce concepts in context** when needed for comprehension: "Body fat percentage — the proportion of total body mass composed of fat tissue — is the most commonly referenced DEXA metric."
4. **Each section should be independently comprehensible** to a reader who hasn't read other sections, while avoiding unnecessary repetition of detailed content.
