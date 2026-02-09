# UI Patterns & Design System — Research

## Color Palette
- **bs-dark:** `#1C3133` — Primary text, buttons, headings
- **bs-dark55:** `#7C8D90` — Muted/secondary text
- **bs-dark15:** `#DFE2E2` — Borders, dividers
- **bs-dark3:** `#F8F8F8` — Light backgrounds, hover states
- **salad-100:** `#69D994` — Primary accent, CTAs
- **salad-60:** `#E5F6EB` — Light section backgrounds

## Typography
- Font: Poppins with system-ui fallbacks
- Headings: tight line-height, bold
- Body: relaxed line-height (`leading-7`)

## Key Component Patterns
- **Cards:** `.card` class — white bg, rounded-lg, border-bs-dark15
- **Buttons:** `.btn-primary` (dark bg, white text), `.btn-light` (mint bg), `.btn-outline`
- **Icons:** lucide-react, sized h-4/h-6
- **Spacing:** px-4 sm:px-6 lg:px-8, gap-4/gap-6, p-6 inside cards

## Layout
- Max width: `max-w-7xl mx-auto`
- Mobile-first responsive (sm/md/lg breakpoints)
- White backgrounds throughout, no dark mode

## Sidebar Portal Recommendations
- Use established card/border patterns for sidebar items
- Match navigation hover: `bg-bs-dark3` background
- Active state: salad accent (border-left or background tint)
- Icons from lucide-react for each nav item
- Follow responsive padding conventions
- Sidebar width: ~240-256px on desktop
- Mobile: overlay with backdrop, triggered by hamburger
