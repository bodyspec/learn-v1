# Content Style Guide — BodySpec Learn Deep-Dives

Based on analysis of all 4 existing deep-dive files.

## Heading Hierarchy

- **H1:** Single per document, descriptive title (no article). E.g., "Understanding Sarcopenia"
- **H2:** Major sections. Always include "Overview" (first) and "Summary" (last before References)
- **H3:** Subsections — questions or declarative statements

## Tone

Clinical-conversational hybrid. Professional but accessible. Evidence-based throughout.
- "You" used moderately in guidance sections, never in clinical sections
- Descriptive voice dominates; imperative used sparingly for recommendations
- Conditional language for recommendations: "can", "may", "consider", "should be considered"
- Present tense for facts: "DEXA provides..."

## Citations

Markdown footnotes, numbered sequentially:
- Inline: `(Author et al., Year)[^1]`
- Definition at end: `[^1]: Full citation with DOI`
- Cite: specific statistics, diagnostic criteria, clinical trial data, guideline recommendations
- Don't cite: general physiology, definitions, obvious clinical relationships

## Callout Boxes (3 types only)

```
:::note        — Supplementary info, definitions (1-2 per doc)
:::clinical    — Important clinical guidance, ICD codes, practice points (2-4 per doc)
:::warning     — Cautions, contraindications, critical distinctions (1-3 per doc)
```

## Lists

- Dashes for bullets, numbers for sequential steps
- Always introduce with a colon and context sentence
- Bold opening phrase pattern: `- **Term:** (explanation)`

## Tables

Markdown format. Source citation below in italics. Used for comparisons, thresholds, criteria.

## Diagrams

```markdown
![Descriptive alt text 5-12 words](/content/assets/diagrams/filename-slug.svg)
```
Placed inline with narrative. 1-2 per document.

## Section Lengths

- Overview: 150-250 words
- Content sections: 200-500 words per H2
- Summary: 100-150 words
- Total document: 2,000-3,500 words (without references)

## Structural Pattern

Overview → "Why This Matters" → Definition/Mechanism → Clinical Application → Monitoring/Intervention → Special Populations (if applicable) → Patient Communication (if applicable) → Summary → References

## Key Conventions

- Parentheticals for clarification: "(also called...)", "(measured by...)"
- Em-dash for emphasis (sparingly)
- Bold key terms on first mention
- Active voice preferred
- Paragraphs: 3-5 sentences
- Evidence hierarchy respected: "Established" vs "Emerging" vs "Some research suggests"
