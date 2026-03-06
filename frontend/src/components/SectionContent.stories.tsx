import type { Meta, StoryObj } from '@storybook/react-vite'
import SectionContent from './SectionContent'

const meta: Meta<typeof SectionContent> = {
  title: 'Components/SectionContent',
  component: SectionContent,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    content: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SectionContent>

export const BasicMarkdown: Story = {
  args: {
    content: `# How DEXA Works

DEXA (Dual-Energy X-ray Absorptiometry) uses two X-ray beams at different energy levels to measure bone mineral density and body composition.

## Key Principles

The technology works by passing two X-ray beams through the body. Different tissues absorb these beams at different rates:

- **Bone** absorbs the most radiation
- **Fat tissue** absorbs an intermediate amount
- **Lean tissue** absorbs the least

## Measurement Process

1. The patient lies on a padded table
2. A scanning arm passes over the body
3. Detectors measure how much of each beam passes through
4. Software calculates tissue composition

The entire scan takes approximately **6-7 minutes** and involves very low radiation exposure.`,
  },
}

export const WithTable: Story = {
  args: {
    content: `# Body Composition Ranges

| Category | Men | Women |
|----------|-----|-------|
| Essential Fat | 2-5% | 10-13% |
| Athletic | 6-13% | 14-20% |
| Fitness | 14-17% | 21-24% |
| Average | 18-24% | 25-31% |

These ranges are general guidelines and may vary by individual.`,
  },
}

export const WithCallouts: Story = {
  args: {
    content: `# Important Safety Information

:::note
DEXA scans use very low radiation doses, approximately 1/10th of a standard chest X-ray.
:::

## Contraindications

:::warning
DEXA scans should not be performed on pregnant patients. Always verify pregnancy status before scanning.
:::

## Best Practices

:::tip
For the most accurate results, ensure the patient is well-hydrated and has not exercised within 24 hours of the scan.
:::

:::clinical
In clinical settings, serial DEXA measurements should be spaced at least 3 months apart to detect meaningful changes in body composition.
:::`,
  },
}

export const WithCodeBlock: Story = {
  args: {
    content: `# Calculating Body Fat Percentage

The formula used by DEXA software:

\`\`\`
Body Fat % = (Fat Mass / Total Mass) x 100
Lean Mass Index = Lean Mass (kg) / Height (m)^2
\`\`\`

Where \`Total Mass = Fat Mass + Lean Mass + Bone Mineral Content\`.`,
  },
}

export const WithImages: Story = {
  args: {
    content: `# DEXA Report Overview

A typical DEXA report includes several key visualizations and data points.

![DEXA scan example](/placeholder-scan.svg)

The image above shows a whole-body DEXA scan with regional analysis.

## Reading the Report

Each region of interest is color-coded for easy identification.`,
  },
}

export const ClinicalCase: Story = {
  args: {
    content: `# How DEXA Works

DEXA uses two X-ray beams at different energy levels to measure body composition.

:::case
A 54-year-old postmenopausal woman with T2DM and BMI 27 presents with suspected sarcopenic obesity. Her weight alone is unrevealing.

**Clinical Question:** What can DEXA tell us that a scale, BMI, or BIA cannot — and what are its limits?
:::

## The Technology

DEXA scanners emit two low-energy X-ray beams at different energy levels.`,
  },
}

export const ClinicalTakeaways: Story = {
  args: {
    content: `# Key Metrics Explained

Understanding each measurement is essential for meaningful interpretation.

:::takeaways
1. **DEXA is the reference standard for body composition.** Three-compartment model outperforms BIA and skinfold methods for clinical decision-making.
2. **Regional analysis is clinically unique to DEXA.** Only DEXA identifies trunk adiposity, limb asymmetries, and site-specific lean mass loss.
3. **Radiation exposure is negligible — 1-10 uSv.** Should not be a barrier to referral or repeat scanning.
4. **DEXA cannot assess muscle quality.** Does not distinguish intramuscular fat infiltration, fiber type, or functional capacity.
5. **Hydration status affects lean mass readings.** Flag scans in acutely ill, edematous, or post-dialysis patients.
6. **VAT is the highest-priority cardiometabolic metric.** 100 cm2 marks a meaningful risk inflection.
7. **A/G ratio reveals fat distribution risk beyond total fat.** Ratio >= 1.0 signals android predominance.
:::`,
  },
}

export const RedFlags: Story = {
  args: {
    content: `# Red Flags & Referrals

Certain DEXA findings warrant further investigation.

:::redflag
- Limb lean mass asymmetry > 10% — evaluate for neurologic, surgical, or musculoskeletal pathology
- VAT > 160 cm2 — structured intervention; > 200 cm2 — comprehensive medical evaluation
- Declining BMC trend across >= 2 serial scans — refer for clinical BMD
:::

These findings should prompt appropriate clinical follow-up.`,
  },
}

export const ClinicalThresholds: Story = {
  args: {
    content: `# VAT Risk Assessment

Clinical risk thresholds for VAT area:

:::thresholds
| Metric | Threshold | Action |
|--------|-----------|--------|
| VAT area | > 100 cm2 | Counsel, optimize lifestyle |
| VAT area | > 160 cm2 | Structured intervention plan |
| VAT area | > 200 cm2 | Comprehensive medical evaluation |
:::

Individual risk depends on the full clinical picture.`,
  },
}

export const AllClinicalBlocks: Story = {
  args: {
    content: `# Complete Clinical Section Example

This story demonstrates all four clinical block types together.

:::case
A 48-year-old male, BMI 24.8 (normal). Fasting glucose 108, TG 190. DEXA: Body fat 31%, VAT 148 cm2, A/G ratio 1.3, FFMI 17.2.

**Clinical Question:** Which metrics drive concern — in what order — and what is the next step?
:::

## Key Findings

The VAT level of 148 cm2 places this patient in the moderate-to-elevated risk range.

:::thresholds
| Metric | Threshold | Action |
|--------|-----------|--------|
| VAT area | > 100 cm2 | Counsel, optimize lifestyle |
| VAT area | > 160 cm2 | Structured intervention plan |
| VAT area | > 200 cm2 | Comprehensive medical evaluation |
:::

## Warning Signs

:::redflag
- Limb lean mass asymmetry > 10% — evaluate for neurologic, surgical, or musculoskeletal pathology
- VAT > 160 cm2 — structured intervention; > 200 cm2 — comprehensive medical evaluation
- Declining BMC trend across >= 2 serial scans — refer for clinical BMD
:::

## Summary

:::takeaways
1. **VAT is the highest-priority cardiometabolic metric.** 100 cm2 marks a meaningful risk inflection. 160 cm2 = structured intervention. 200 cm2 = comprehensive medical evaluation.
2. **A/G ratio reveals fat distribution risk beyond total fat.** Ratio >= 1.0 signals android predominance. Trend over time is more informative than any single value.
3. **FFMI detects sarcopenia and overfat phenotypes BMI misses.** Declining FFMI during weight loss signals muscle catabolism requiring immediate intervention.
4. **TOFI phenotype is a clinical blind spot.** Normal-weight patients with elevated VAT carry high metabolic risk.
5. **Body fat categories are relative, not diagnostic.** Interpret in context of age, sex, and clinical goals.
6. **Lean body mass predicts metabolic resilience.** Preserving LBM is a primary goal during weight loss.
7. **Whole-body bone data is screening-level only.** Do not substitute for dedicated hip/spine DXA when osteoporosis diagnosis is the question.
:::`,
  },
}

export const WithFootnotes: Story = {
  args: {
    content: `# Understanding T-Scores

A T-score compares your bone density to that of a healthy 30-year-old adult[^1]. The World Health Organization defines osteoporosis based on T-score thresholds[^2].

## Classification

- **Normal**: T-score of -1.0 or above
- **Osteopenia**: T-score between -1.0 and -2.5
- **Osteoporosis**: T-score of -2.5 or below

Serial measurements should be compared using the least significant change (LSC) to determine if a real change has occurred[^3].

[^1]: T-scores use the young adult reference population from the NHANES III database.
[^2]: WHO Technical Report Series, No. 921 (2003).
[^3]: The LSC is typically 2-3% for total body composition and 3-5% for regional measurements.`,
  },
}
