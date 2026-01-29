# BodySpec Brand Style Guide

This document defines the visual language for BodySpec Learn to ensure brand consistency with bodyspec.com.

---

## Color Palette

### Primary Colors

| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| BodySpec Dark | `#1a365d` | `bodyspec-blue` | Logo, headings, primary text |
| BodySpec Mint | `#8ECFBC` | `mint-500` | Accent color, highlights, "life changing" text |
| BodySpec Light Mint | `#E8F5F1` | `mint-50` | Section backgrounds, cards |

### Button Colors

| Type | Background | Text |
|------|------------|------|
| Primary CTA | `#8ECFBC` (mint) | `#1a365d` (dark) |
| Secondary CTA | `#1a365d` (dark) | `#ffffff` (white) |
| Outline | transparent | `#1a365d` with border |

### Neutral Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Dark text | `#1a365d` | Headings, body text |
| Gray text | `#64748b` | Secondary text, descriptions |
| Light gray | `#f1f5f9` | Borders, dividers |
| Off-white | `#f8faf9` | Page backgrounds |

### Accent Colors (use sparingly)

| Color | Hex | Usage |
|-------|-----|-------|
| Cyan accent | `#5FCFCF` | Interactive elements, links |
| Success green | `#22c55e` | Completion states, checkmarks |

---

## Typography

### Font Stack
- **Primary**: System font stack (San Francisco, Segoe UI, etc.)
- **Headings**: Bold weight (700)
- **Body**: Regular weight (400)

### Heading Hierarchy

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 | 36-48px | Bold | `#1a365d` |
| H2 | 28-32px | Bold | `#1a365d` |
| H3 | 20-24px | Semibold | `#1a365d` |
| Body | 16-18px | Regular | `#1a365d` or `#64748b` |
| Small | 14px | Regular | `#64748b` |

### Text Styling
- Headlines can use mint color for emphasis on key phrases (e.g., "life changing")
- Links use cyan accent color with underline on hover
- No uppercase text except for small labels/badges

---

## Buttons

### Primary Button (Mint)
```css
background: #8ECFBC;
color: #1a365d;
border-radius: 8px;
padding: 12px 24px;
font-weight: 500;
```

### Secondary Button (Dark)
```css
background: #1a365d;
color: #ffffff;
border-radius: 8px;
padding: 12px 24px;
font-weight: 500;
```

### Button States
- Hover: Slight darken (10%)
- Focus: Ring with mint color
- Disabled: 50% opacity

---

## Cards & Containers

### Card Style
```css
background: #ffffff;
border: 1px solid #e2e8f0;
border-radius: 12px;
padding: 24px;
```

### Section Backgrounds
- Alternate between white and light mint (`#E8F5F1` / `#f0fdf9`)
- Use for visual separation between page sections

### Decorative Elements
- Thin mint/cyan circular outlines as background accents
- Subtle, not distracting

---

## Icons

### Style
- Line icons (not filled)
- Stroke width: 1.5-2px
- Color: `#1a365d` (dark) or `#8ECFBC` (mint accent)

### Icon Sources
- Lucide React (current)
- Keep consistent stroke weight across all icons

---

## Spacing

### Section Spacing
- Between major sections: 64-80px
- Between subsections: 32-48px
- Card grid gap: 24px

### Component Spacing
- Card padding: 24px
- Button padding: 12px 24px
- Input padding: 12px 16px

---

## Current Site Gaps (Learn vs Main Site)

### Issues to Address

1. **Primary button color**: Learn uses bright blue (`#2563eb`), main site uses mint (`#8ECFBC`)
   - **Fix**: Update `btn-primary` to use mint background with dark text

2. **Section backgrounds**: Learn uses `gray-50`, main site uses light mint tints
   - **Fix**: Add mint-tinted backgrounds for alternating sections

3. **Link color**: Learn uses standard blue, main site uses cyan accent
   - **Fix**: Update link colors to cyan (`#5FCFCF`)

4. **Card radius**: Learn uses `rounded-md` (6px), main site uses larger radius (~12px)
   - **Fix**: Increase to `rounded-xl` for cards

5. **Footer**: Learn has minimal footer, main site has dark footer with multiple columns
   - **Fix**: Consider matching footer style for brand consistency

6. **Decorative elements**: Main site uses subtle circular outlines as accents
   - **Fix**: Consider adding similar decorative elements (optional)

---

## Tailwind Configuration Updates

Add to `tailwind.config.js`:

```javascript
colors: {
  bodyspec: {
    blue: '#1a365d',
    gold: '#c5a572',
  },
  mint: {
    50: '#f0fdf9',
    100: '#E8F5F1',
    200: '#ccfbef',
    300: '#99f6db',
    400: '#5ceac3',
    500: '#8ECFBC',  // Primary mint
    600: '#14b8a6',
    700: '#0f766e',
  },
  cyan: {
    accent: '#5FCFCF',
  },
}
```

---

## Implementation Priority

1. **High**: Button colors (mint primary)
2. **High**: Link colors (cyan accent)
3. **Medium**: Section background tints
4. **Medium**: Card border radius
5. **Low**: Footer redesign
6. **Low**: Decorative elements

---

## Examples from Main Site

### Hero Section
- Large bold heading with mint accent on key phrase
- Mint CTA button with dark text
- Light mint background tint

### Pricing Cards
- White cards with subtle border
- Dark CTA buttons
- Cyan accent for "MOST POPULAR" labels

### Footer
- Dark (`#1a365d`) background
- White text
- Mint subscribe button
- Multi-column layout
