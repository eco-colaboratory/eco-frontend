# Plan: Cham Bloom — Achievements 3-image slider UI

**Status:** Complete  
**Mode:** Fast  
**Test:** default (visual + existing e2e smoke screenshots)  
**Spec:** none

## Goal

Refactor `AchievementsSection` so the right column behaves as a **3-image showcase slider**: all three photos remain visible in a staggered composition (per design mockup), with one **active** card emphasized; prev/next and click sync the left copy panel.

## Scope Challenge

| Check | Answer |
|-------|--------|
| **Exists?** | Yes — `achievements-section.tsx` already has `activeIndex`, arrows, and 3 `SLIDES`; layout is wrong (`sm:grid-cols-2` → awkward 2+1 grid). |
| **Minimum?** | Restyle right column only: staggered 3-slot layout + position rotation by `activeIndex`. Keep left panel, data, CTA, section shell. |
| **Complexity?** | **Fast** — 1 primary file, familiar React state + Tailwind; no new deps. |

**Out of scope:** Embla/Carousel library, moving `SLIDES` to `cham-bloom-landing.ts`, copy changes, new images.

## Architecture

```
activeIndex ──► left panel (existing key={activeIndex} fade)
              └► right panel: 3 fixed slots (hero / top-right / bottom-left)
                    each slide gets slot by (index - activeIndex + 3) % 3
```

- **Desktop (md+):** Relative container ~`min-h-[420px]`, absolute-positioned cards with preset `%` top/left/width; active = largest + ring + "Đang xem"; inactive = smaller, lower opacity, clickable.
- **Mobile:** Single hero card for active slide + horizontal thumbnail strip (3 small cards) below or above — avoids cramped triple overlap.

## Phases

- [x] Phase 1: Staggered 3-card layout + slot rotation (`phase-01-staggered-layout.md`)
- [x] Phase 2: Polish, a11y, responsive + screenshot check (`phase-02-polish-a11y.md`)

## Success criteria

1. Desktop: all 3 images visible simultaneously in staggered layout matching mockup hierarchy (one dominant, two secondary).
2. Prev/next and card click update `activeIndex`; left text and right emphasis stay in sync.
3. No layout jump from ring/scale clipping (safe padding on container).
4. Keyboard: arrows focusable; optional `aria-live` on active label.
5. `e2e/cham-bloom-smoke.spec.ts` screenshots still pass (no broken section).

## Risks

| Risk | Mitigation |
|------|------------|
| Overlap clips on small laptops | Use `%` widths ≤ 58% hero; `overflow-visible` parent with `px` gutter |
| Two Gen G slides identical copy confuses users | Accept for now (same event, different photos); optional dot labels "1/3" later |
| Motion sensitivity | Respect `prefers-reduced-motion` — shorten/disable scale transitions |

## Session Notes

<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-23  
**Phase in progress:** —  
**Status:** Both phases complete

### Decisions made this session
- Extracted `AchievementSlideCard` to share desktop/mobile markup; mobile hero is a `div` (display-only), thumbs remain buttons.
- Desktop showcase hidden below `md`; mobile uses hero + 3-col thumb grid.

### Next immediate action
- None — feature complete. Re-run Playwright smoke screenshots if committing visual changes.
