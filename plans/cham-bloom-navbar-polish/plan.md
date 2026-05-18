# Plan: CHẠM Bloom Navbar — Floating Glass Polish

**Status:** Complete (Phase 1)  
**Mode:** Fast  
**Testing:** default (lint + manual scroll/mobile check; optional Playwright screenshot)  
**Source of truth:** [`docs/Header.md`](../../docs/Header.md) §3 (Dynamic Floating Glassmorphic Navbar) — **visual pattern only**  
**Target:** [`app/(landing)/_components/cham-bloom/navbar.tsx`](../../app/(landing)/_components/cham-bloom/navbar.tsx)

---

## Scope Challenge

| Question | Answer |
|----------|--------|
| **Exists?** | Yes — navbar has fade-in, transparent→`border-b` + `backdrop-blur` at 60px scroll, mobile drawer. Missing floating pill morph. |
| **Minimum?** | Adopt Header.md scroll morph (width shrink, `rounded-full`, spring motion, layered shadow). Keep existing links, CTA, content — **no** search, cart, auth, CategoryMenu. |
| **Complexity?** | **Fast** — 1 primary file; `framer-motion` already in `package.json`; no new APIs or security surface. |

---

## Goal

Upgrade the CHẠM Bloom landing navbar from a flat sticky bar to a **floating glassmorphic pill** when the user scrolls past ~100px, matching the motion and layout principles documented in `Header.md`, while preserving Editorial Garden tokens (`bloom-cream`, `bloom-green-*`, `brand-magenta` CTA) and existing anchor links.

---

## Out of Scope (explicit)

- Beyond 8 features: `CategoryMenu`, `SearchSuggestions`, `PriceFilterMenu`, avatar VIP badges, cart, notifications
- New dependencies (Framer Motion already installed)
- Changes to hero, sections, or `CHAM_BLOOM_CONTENT` structure
- `components/layout/Header.tsx` port (file does not exist in this repo)

---

## DESIGN.md vs Header.md alignment

| Aspect | Current (`navbar.tsx`) | After polish (`Header.md` pattern) |
|--------|------------------------|-------------------------------------|
| Scroll threshold | 60px | **100px** (per Header.md) |
| Scrolled shape | Full-width bar + bottom border | **75% width**, `rounded-full`, floated (`y: 20`) |
| Background | `bg-bloom-cream/95` + `border-b` | `bg-bloom-cream/80` (or `white/80` on hero) + `backdrop-blur(10px)` + soft multi-layer shadow |
| Motion | CSS `animate-fade-in-up` only | Framer Motion **spring** (`stiffness: 200`, `damping: 50`) on layout props |
| Layout | `flex justify-between` | **`grid grid-cols-3`** when scrolled (logo \| nav \| CTA) for balanced center nav |
| Mobile menu | Full-width panel below nav | Panel **inherits pill width** or full-bleed below floating bar; same bloom glass tokens |

---

## Phases

| # | File | Summary |
|---|------|---------|
| 1 | [phase-01-floating-glass-nav.md](./phase-01-floating-glass-nav.md) | Framer Motion scroll listener, pill morph, grid layout, mobile + a11y |

---

## Acceptance Criteria (measurable)

1. At `scrollY ≤ 100`: navbar spans full content width (`max-w-7xl`), transparent/minimal chrome, no heavy shadow.
2. At `scrollY > 100`: navbar animates to **~75% width**, **`rounded-full`**, **~20px** top offset, **backdrop blur**, visible soft shadow; transition feels smooth (spring, not linear CSS).
3. Desktop: logo left, anchor links centered, CTA right — visually balanced (3-column grid in scrolled state).
4. Mobile: hamburger works; open menu uses glass styling; CTA reachable; no horizontal overflow.
5. `prefers-reduced-motion: reduce`: no width/y spring animation; instant or simplified solid bar state.
6. Anchor scroll targets (`#about`, etc.) still clear fixed nav — existing `.cham-bloom-page [id] { scroll-margin-top }` unchanged.
7. `pnpm lint` passes.

---

## Risks

| Risk | Mitigation |
|------|------------|
| `opacity: 0` inline style on `<nav>` may fight Motion mount | Remove inline opacity; rely on `initial`/`animate` on `motion.nav` or keep one-shot fade-in |
| Pill width awkward on small phones | Use `w-[92%] sm:w-[85%] md:w-3/4` instead of rigid 75% if needed |
| Mobile menu detached from pill | Anchor dropdown to `motion.nav` container; `rounded-b-2xl` when open |
| Hero overlap | Keep `z-50`; test over video + cream sections |

---

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-18  
**Phase in progress:** —  
**Status:** Phase 1 implemented

### Decisions made this session
- Pill background: `bloom-cream/80` (user confirmed)
- Pill width: `w-[92%]` → `sm:w-[85%]` → `md:w-3/4` (responsive mobile)
- Layout: always `grid-cols-3`
- Mount animation: Framer Motion (`initial`/`animate`), not CSS `animate-fade-in-up`
- E2E screenshots: regenerate via `cham-bloom-smoke.spec.ts`

### Next immediate action
- None — polish complete

## Phases checklist

- [x] Phase 1: Floating Glass Navbar

## Cook command

```
/ck:cook --fast plans/cham-bloom-navbar-polish/plan.md
```
