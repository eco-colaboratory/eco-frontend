# Phase 1: Design Primitives

## Goal

Establish the shared building blocks that all 8 below-hero sections will use. Nothing is wired into existing sections yet — this phase is purely additive.

---

## Tasks

- [ ] **1.1 — Add `.bloom-headline-accent` to `globals.css`**
  Add a CSS utility class under `@layer utilities` that applies the same gradient text treatment as the hero `h1` accent span (`bg-gradient-to-r from-bloom-green-deep via-bloom-green-mid to-gray-500 bg-clip-text text-transparent`). Also add `.bloom-glass-pill` if useful for the `SectionLabel` glass variant.

- [ ] **1.2 — Create `section-shell.tsx`**
  New component in `app/(landing)/_components/cham-bloom/`. Accepts `id`, `className`, `children`, and an optional `bg` prop (enum: `cream | mist | light-to-cream | deep`). Renders a `<section>` with the resolved background class and fixed vertical padding `py-24 md:py-32`. Passes `id` through so SEO anchors are preserved.

- [ ] **1.3 — Update `section-label.tsx` with `glass` variant + `tone`**
  Add optional `variant` (`plain` | `glass`, default `plain`) and `tone` (`light` | `dark`, default `light`). The `glass` variant matches the hero badge shell: `rounded-full border border-white/20 bg-white/15 px-4 py-2 backdrop-blur-md text-xs font-medium uppercase tracking-widest`.
  - `tone="light"` (cream/mist): `text-bloom-green-deep` — **same as hero badge** (`hero-section.tsx` line 46).
  - `tone="dark"` (deep bands / over imagery): `text-white` — **same as hero partners pill** (line 84).
  The `plain` variant is unchanged. Full backward compatibility when props are omitted.

- [ ] **1.4 — Create `glass-card.tsx`**
  New component wrapping a `<article>` (or generic `as` prop). Default styles: `rounded-2xl border border-bloom-green-mid/15 bg-white/60 p-6 backdrop-blur-sm`. Accepts `className` for overrides. For dark-band contexts (core-idea, contact) where the existing markup uses inline glass already, `GlassCard` is optional — don't force it where it doesn't fit.

- [ ] **1.5 — Export new components from `index.ts`**
  Add `SectionShell`, `GlassCard` to the barrel export so all section files can import from `'./index'` or the component directly.

---

## Files Touched

| File | Action |
|------|--------|
| `app/globals.css` | Add `.bloom-headline-accent`, optionally `.bloom-glass-pill` utilities |
| `app/(landing)/_components/cham-bloom/section-shell.tsx` | **Create** |
| `app/(landing)/_components/cham-bloom/glass-card.tsx` | **Create** |
| `app/(landing)/_components/cham-bloom/section-label.tsx` | Update — add `variant` prop |
| `app/(landing)/_components/cham-bloom/index.ts` | Add new exports |

---

## Acceptance Criteria

- [ ] `SectionLabel variant="glass" tone="light"` renders a glass pill matching the hero badge (`text-bloom-green-deep` on cream). `tone="dark"` matches the hero partners pill (`text-white`).
- [ ] `SectionShell bg="cream"` wraps children in `<section>` with `bg-bloom-cream py-24 md:py-32`.
- [ ] `GlassCard` renders with visible subtle blur; `bg-white/60` on cream background is distinguishable.
- [ ] `.bloom-headline-accent` applied to an inline `<span>` inside an `h2` produces the same gradient text as the hero `h1` accent.
- [ ] No existing section is broken (Phase 1 is additive only — no section files modified).
- [ ] TypeScript: no new type errors introduced.

---

## Dependencies

- None. This phase has no prerequisite phases.

---

## Risks

- **`backdrop-blur` in `globals.css` `@layer utilities`** — Tailwind v4 (`@import "tailwindcss"`) uses `@layer utilities` safely. Confirm the layer ordering does not conflict with `@theme` block. Mitigation: place utility after `@layer base` blocks.
- **`variant` prop defaults** — if any existing call site passes no `variant`, it must silently default to `plain`. Test by verifying current sections are unaffected after adding the prop.
