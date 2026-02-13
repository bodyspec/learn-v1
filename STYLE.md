# BodySpec Brand Style Guide

This document defines the visual language for BodySpec Learn to ensure brand consistency with bodyspec.com.

**Source of truth:** `~/workspace/bodyspec/images/web-v3/src/variables.scss`

---

## Color Palette

### Primary Colors (from web-v3/variables.scss)

| Color | Hex | Variable | Tailwind | Usage |
|-------|-----|----------|----------|-------|
| Dark | `#1C3133` | `$newdark` | `bs-dark` | Primary text, headings, dark buttons |
| Dark 55% | `#7C8D90` | `$newdark55` | `bs-dark55` | Muted/secondary text |
| Dark 15% | `#DFE2E2` | `$newdark15` | `bs-dark15` | Borders, dividers |
| Dark 3% | `#F8F8F8` | `$newdark3` | `bs-dark3` | Section backgrounds |

### Accent Colors (Salad/Green)

| Color | Hex | Variable | Tailwind | Usage |
|-------|-----|----------|----------|-------|
| Salad 100 | `#69D994` | `$salad100` | `salad-100` | Links, accent elements |
| Salad 90 | `#9DDEAD` | `$salad90` | `salad-90` | Light CTA buttons |
| Salad 80 | `#B3E5C2` | `$salad80` | `salad-80` | Hover states |
| Salad 70 | `#CCEDD6` | `$salad70` | `salad-70` | Light hover states |
| Salad 60 | `#E5F6EB` | `$salad60` | `salad-60` | Very light backgrounds, icon containers |
| Green Text | `#60C888` | `$greentext` | `greentext` | Accent text (like "life changing") |

### Other Colors

| Color | Hex | Variable | Usage |
|-------|-----|----------|-------|
| White | `#FFFFFF` | `$white0` | Backgrounds, button text |
| Blue Action | `#46C9F7` | `$blueAction` | Interactive elements (sparingly) |
| Red Text | `#E87D7D` | `$redtext` | Error states |

---

## Button Styles

Based on `web-v3/src/components/Button/styles.module.scss`:

### Primary Button (`.btn-primary`)
- Background: `#1C3133` (bs-dark)
- Text: `#FFFFFF` (white)
- Border: `#1C3133` (bs-dark)
- Hover: Invert to white bg, dark text

### Light Button (`.btn-light`)
- Background: `#9DDEAD` (salad-90)
- Text: `#1C3133` (bs-dark)
- Border: `#9DDEAD` (salad-90)
- Hover: `#E5F6EB` (salad-60)

### Outline Button (`.btn-outline`)
- Background: `#FFFFFF` (white)
- Text: `#1C3133` (bs-dark)
- Border: `#1C3133` (bs-dark)
- Hover: Invert to dark bg, white text

### Outline Green Button (`.btn-outline-green`)
- Background: `#FFFFFF` (white)
- Text: `#1C3133` (bs-dark)
- Border: `#9DDEAD` (salad-90)
- Hover: `#CCEDD6` (salad-70)

---

## Typography

### Font Stack
```css
font-family: 'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Font Weights
- Thin: 100
- Light: 200
- Normal: 400
- Medium: 500
- Semibold: 600
- Bold: 700
- Extrabold: 800

### Text Colors
- Primary text: `#1C3133` (bs-dark)
- Secondary/muted text: `#7C8D90` (bs-dark55)
- Accent text: `#60C888` (greentext)
- Links: `#69D994` (salad-100)

---

## Cards & Containers

### Card Style
```css
background: #FFFFFF;
border: 1px solid #DFE2E2; /* bs-dark15 */
border-radius: 0.5rem; /* 8px */
```

### Card Hover
```css
border-color: #7C8D90; /* bs-dark55 */
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
```

### Section Backgrounds
- Light gray: `#F8F8F8` (bs-dark3)
- Light green: `#E5F6EB` (salad-60)

---

## Tailwind Configuration

In `tailwind.config.js`:

```javascript
colors: {
  bs: {
    dark: '#1C3133',
    dark55: '#7C8D90',
    dark15: '#DFE2E2',
    dark3: '#F8F8F8',
  },
  salad: {
    100: '#69D994',
    90: '#9DDEAD',
    80: '#B3E5C2',
    70: '#CCEDD6',
    60: '#E5F6EB',
  },
  greentext: '#60C888',
},
fontFamily: {
  sans: ['Poppins', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
},
// ...
plugins: [require('@tailwindcss/typography')]
```

---

## Usage Examples

### Hero Section
```jsx
<h1 className="text-bs-dark">
  Ready for your <span className="text-greentext">expert-level</span> DEXA education?
</h1>
<p className="text-bs-dark55">Description text...</p>
<button className="btn-light">Get started</button>
```

### Cards
```jsx
<div className="bg-white border border-bs-dark15 rounded-lg p-6 hover:border-bs-dark55">
  <h3 className="text-bs-dark">Card Title</h3>
  <p className="text-bs-dark55">Card description...</p>
  <a className="text-salad-100">Learn more →</a>
</div>
```

### Footer
```jsx
<footer className="bg-bs-dark">
  <p className="text-white/70">Footer text</p>
</footer>
```
