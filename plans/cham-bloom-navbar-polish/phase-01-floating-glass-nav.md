# Phase 1: Floating Glass Navbar

## Goal

Refactor `navbar.tsx` to implement the **Dynamic Floating Glassmorphic Navbar** pattern from `docs/Header.md` §3, adapted to CHẠM Bloom design tokens and landing-only scope.

## Dependencies

- `framer-motion` ^12.x (already in `package.json`)
- Phase 2 cham-bloom landing complete (navbar wired in `app/page.tsx`)
- `CHAM_BLOOM_CONTENT.contact` for CTA + `mailto:`

## Files to Modify

| Action | Path |
|--------|------|
| Modify | `app/(landing)/_components/cham-bloom/navbar.tsx` |

No new files unless extracting constants (optional `navbar-scroll.ts` — **avoid** unless file exceeds ~150 lines).

---

## Implementation Steps

### 1. Client motion shell

Replace plain `<header>` / `<nav>` with Framer Motion primitives:

```tsx
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
```

- `headerRef` on outer wrapper for `useScroll({ target: headerRef, offset: ['start start', 'end start'] })`
- `useMotionValueEvent(scrollY, 'change', (latest) => setIsScrolled(latest > 100))`
- Threshold **100px** (Header.md), not 60px

### 2. Scrolled vs default layout

**`motion.nav`** (or wrapper) with animated props:

| Prop | Default (`!isScrolled`) | Scrolled (`isScrolled`) |
|------|-------------------------|-------------------------|
| `width` | `100%` | `75%` (responsive: `min(75%, calc(100% - 2rem))`) |
| `y` | `0` | `20` |
| `borderRadius` | `0` or `12px` | `9999px` (`rounded-full`) |
| `backgroundColor` | transparent | `rgba(var(--bloom-cream-rgb), 0.8)` or `bg-bloom-cream/80` via className toggle |
| `backdropFilter` | none | `blur(10px)` |
| `boxShadow` | none | layered soft shadow (Header.md style, bloom-tinted neutral) |

**Transition:** `type: 'spring', stiffness: 200, damping: 50`

Use `className` + `cn()` for static typography/colors; animate layout via `style` or motion `animate` prop keyed on `isScrolled`.

### 3. Three-column grid when scrolled

When `isScrolled`, switch inner container to:

```tsx
className="grid grid-cols-3 items-center px-4 sm:px-6 py-3"
```

- Col 1: Logo (`Link` + `Leaf` icon) — unchanged branding
- Col 2: `hidden md:flex justify-center gap-8` — `NAV_LINKS`
- Col 3: `hidden sm:flex justify-end` — CTA button

When **not** scrolled, keep current `flex justify-between` (or always grid with empty center on mobile) — pick one layout that does not jump link positions abruptly.

### 4. Remove conflicting styles

- Drop `scrolled && 'border-b border-bloom-green-mid/20 ...'` in favor of pill shadow (no full-width border in scrolled state)
- Fix `style={{ animationDelay: '0.1s', opacity: 0 }}` — either:
  - `motion.nav` `initial={{ opacity: 0, y: 10 }}` `animate={{ opacity: 1, y: 0 }}` once on mount, or
  - keep CSS `animate-fade-in-up` on inner content only (not on motion layout node)

### 5. Mobile menu

- Hamburger stays `sm:hidden` / desktop CTA `hidden sm:block`
- When menu open + scrolled: extend panel below pill with `rounded-b-2xl`, `bg-bloom-cream/95 backdrop-blur-md`, `animate-fade-in-overlay`
- `onClick` on links still closes menu
- Consider `body` scroll lock optional — **not required** for Fast scope

### 6. Accessibility

- Preserve `aria-label` on menu toggle
- `prefers-reduced-motion`: `useReducedMotion()` from framer-motion — if true, skip `width`/`y` animation; apply scrolled classes instantly
- Focus rings on CTA and links unchanged

### 7. Verify integration

- Scroll hero → about: pill appears, anchors still land correctly
- Resize 375px / 1280px
- Run `pnpm lint`

---

## Acceptance Criteria

- [x] Scroll > 100px triggers pill morph with spring animation
- [x] Scroll ≤ 100px returns to full-width transparent state
- [x] Desktop center nav aligned in scrolled state (`grid-cols-3`)
- [x] Mobile menu functional with glass styling
- [x] Reduced motion respected
- [x] Lint clean on `navbar.tsx`
- [x] E2E screenshots regenerated

---

## Optional verification (cook default)

- Compare `e2e/screenshots/cham-bloom-desktop.png` before/after at scrollY=0 and scrollY=200
- No new unit tests required; visual regression is sufficient for Fast mode
