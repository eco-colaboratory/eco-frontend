# Phase 3: Editorial Sections

## Goal

Build the four mid-page storytelling sections — About, Vision + Mission, Core Idea, and Achievements — each with distinct editorial layouts, alternating background treatments, and scroll-triggered animations, realising the "Editorial Garden" design direction and advancing the narrative from "what is CHẠM Bloom?" to "why does it matter?"

## Dependencies

- Phase 1 complete: tokens, font, `CHAM_BLOOM_CONTENT` (about, vision, mission, coreIdea, achievements), `MotionWrapper` ready.
- Phase 2 complete: `app/page.tsx` scaffolded; hero and navbar render without errors; `overflow-x-hidden` on wrapper.

---

## Files to Create / Modify

| Action | Path | Purpose |
|---|---|---|
| Modify | `app/_components/cham-bloom/about-section.tsx` | 3-column icon card layout on cream BG |
| Modify | `app/_components/cham-bloom/vision-mission-section.tsx` | Split editorial alternating-image layout |
| Modify | `app/_components/cham-bloom/core-idea-section.tsx` | Dark-green full-bleed with 3-step pill sequence |
| Modify | `app/_components/cham-bloom/achievements-section.tsx` | 2-card achievement showcase with gold badges |
| Modify | `app/page.tsx` | Replace stubs with real section components; add section `id` anchors |

---

## Implementation Steps

1. **About section** (`about-section.tsx`, Server Component). Render on `bg-bloom-cream` with `max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32`. Structure: label tag ("Về chúng tôi") → serif H2 ("CHẠM Bloom là gì?") → three-column card grid. Each card (from `CHAM_BLOOM_CONTENT.about.cards`) uses: `rounded-2xl bg-white/70 backdrop-blur-sm border border-bloom-green-mid/15 p-6`, a botanical Lucide icon (or inline SVG) in `text-bloom-green-mid`, bold card title in `font-display text-xl`, and 2-line description in body text. Wrap each card in `MotionWrapper` with staggered delays (0.1, 0.2, 0.3 s). Add `id="about"` to the section root.

2. **Vision + Mission section** (`vision-mission-section.tsx`, Server Component). Render on `bg-bloom-green-mist`. Build two stacked editorial rows using CSS Grid (`grid-cols-1 md:grid-cols-12 gap-8 md:gap-16`):
   - **Vision row:** text block (cols 1–5, `font-display` H2 + body) left; botanical photo (cols 6–12, `next/image`, `rounded-3xl object-cover h-80 md:h-[480px]`) right.
   - **Mission row:** botanical photo (cols 1–7) left; text block (cols 8–12) right — reversed to create visual rhythm.
   Wrap each row's text block in `MotionWrapper` (slide from opposite side: use `x: -40` for left-entry, `x: 40` for right-entry in the Framer Motion variant). Add `id="vision"` to the section root. Both vision and mission copy sourced from `CHAM_BLOOM_CONTENT.vision` / `CHAM_BLOOM_CONTENT.mission`.

3. **Core Idea section** (`core-idea-section.tsx`, Server Component). Render full-bleed dark green (`bg-bloom-green-deep text-white`) with `py-32 px-4`. Center-aligned layout:
   - Large serif headline from `CHAM_BLOOM_CONTENT.coreIdea.headline` in `font-display text-4xl md:text-6xl text-white`.
   - Second line in `text-bloom-gold` (the transformative payoff phrase).
   - Below: a horizontal 3-step flow indicator rendered as pill nodes ("Chơi game", "Chạm hoa", "Trồng thật") connected by dashed lines (`border-t border-dashed border-bloom-green-mid/40`). Each pill: `rounded-full bg-bloom-green-mid/20 border border-bloom-green-mid/40 px-5 py-2 text-white text-sm`. Animate nodes sequentially (delay 0.2 s per node) using `MotionWrapper`. Add `id="core-idea"` to section.

4. **Achievements section** (`achievements-section.tsx`, Server Component). Render on `bg-bloom-cream py-24 px-4`. Structure: label tag ("Thành tích") → serif H2 ("Được công nhận") → two large achievement cards in a `grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto`. Each card (from `CHAM_BLOOM_CONTENT.achievements`): `rounded-3xl bg-white border-2 border-bloom-gold/30 p-8 md:p-12 flex flex-col items-center text-center`, with a large trophy/medal Lucide icon in `text-bloom-gold w-12 h-12 mb-4`, the achievement title in `font-display text-3xl text-bloom-green-deep`, and the subtitle (competition name) in body text. Wrap each card in `MotionWrapper` with `delay: 0.15 * index`. Add `id="achievements"` to section.

5. **Wire sections into page.** In `app/page.tsx`, import the four implemented components and replace their stubs. Ensure section order is: Hero → About → Vision+Mission → Core Idea → Achievements. Confirm each section has a unique `id` attribute matching the navbar smooth-scroll anchors from Phase 2.

6. **Playwright visual smoke test.** Extend the Phase 2 smoke script to scroll through all four sections, confirm each section heading is visible in viewport, and capture a scroll-through screenshot strip. Verify no layout overflow (check `document.body.scrollWidth <= window.innerWidth`).

---

## Acceptance Criteria

- All four sections render without console errors.
- About section H2 and 3 cards visible on 1280 px desktop; cards stack to 1-column on 375 px mobile.
- Vision row shows text left + photo right; Mission row shows photo left + text right on md+ screens. Both stack vertically on mobile.
- Core Idea section renders with dark green full-bleed background; gold text line is visually distinct.
- 3-step pills in Core Idea section are connected visually by dashed lines.
- Achievement cards display gold border ring and trophy icon; both card titles match `CHAM_BLOOM_CONTENT.achievements` entries.
- Scroll-triggered animations fire (elements invisible at load, animate in as they enter viewport) — verifiable by disabling JS and confirming static fallback is readable.
- `pnpm lint` and `pnpm build` pass with no errors.
- Lighthouse Accessibility ≥ 90 (headings hierarchy: one H1 in hero, H2 per section, H3 for cards).

---

## Risks

- **Split grid on Safari iOS:** CSS Grid `grid-cols-12` with fractional spanning can misrender on older Safari — add `min-w-0` to child elements to prevent overflow.
- **Photo aspect ratio enforcement:** Editorial rows need fixed-height photos that don't collapse — use explicit `h-[400px]` container with `next/image fill` + `object-cover` inside a `relative` wrapper, not `width/height` props.
- **Reduced motion:** If `useReducedMotion` is true, `MotionWrapper` should render children immediately visible (`opacity: 1, y: 0`) with no transition — verify this in Phase 1's `motion-wrapper.tsx` before building these sections.
