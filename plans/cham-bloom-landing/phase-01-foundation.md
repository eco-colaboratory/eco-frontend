# Phase 1: Foundation

## Goal

Establish every prerequisite that later phases build on: botanical design tokens, Playfair Display font registration, a typed content model for all page copy, a placeholder image pipeline, and an empty route scaffold — so Phases 2–5 can proceed in parallel without coordination conflicts.

## Dependencies

None (first phase).

---

## Files to Create / Modify

| Action | Path | Purpose |
|---|---|---|
| Modify | `app/globals.css` | Add `--bloom-*` CSS custom properties to `:root`; expose in `@theme` |
| Modify | `app/layout.tsx` | Register Playfair Display via `next/font/google`; add `font-display` CSS variable |
| Create | `lib/content/cham-bloom-landing.ts` | Typed content model — all Vietnamese copy, section data, tier definitions |
| Create | `app/_components/cham-bloom/index.ts` | Barrel export for all section components (stubs initially) |
| Create | `public/images/cham-bloom/.gitkeep` | Reserve image directory; add placeholder WebP images |
| Create | `app/_components/cham-bloom/motion-wrapper.tsx` | Reusable `"use client"` Framer Motion fade-in-up wrapper |

---

## Implementation Steps

1. **Add botanical color tokens.** In `app/globals.css`, add six new CSS custom properties to `:root` (`--bloom-green-deep`, `--bloom-green-mid`, `--bloom-green-light`, `--bloom-green-mist`, `--bloom-cream`, `--bloom-gold`) and register matching `--color-bloom-*` entries in the `@theme` block so Tailwind generates utility classes. Also map body font: `--font-sans: var(--font-open-sans)` in `@theme` so `font-sans` resolves to Open Sans (not system UI).

2. **Register Playfair Display font.** In `app/layout.tsx`, import `Playfair_Display` from `next/font/google` with `subsets: ['latin', 'vietnamese']`, weights `['400', '600', '700', '900']`, and `variable: '--font-display'`. Add the variable to the `<body>` className. Extend the `@theme` block in `globals.css` with `--font-display: var(--font-display)` so `font-display` Tailwind utility works.

3. **Build the typed content model.** Create `lib/content/cham-bloom-landing.ts` exporting `CHAM_BLOOM_CONTENT` with: `hero` (`videoUrl` from `DESIGN.md`, headline, tagline, badge, cta labels, `partners` mock string[]), `about`, `vision`, `mission`, `coreIdea`, `achievements`, `tiers` (6 entries, mock teasers), `fundUsage`, `valueProp`, `benefits` (mock table rows + `benefitsNote`), `contact`. Image paths point to placeholders under `/public/images/cham-bloom/`. All Vietnamese copy — zero hardcoded strings in components.

4. **Scaffold section component stubs.** Create `app/_components/cham-bloom/` directory with one empty (stub) TSX file per section that later phases will fill: `hero-section.tsx`, `about-section.tsx`, `vision-mission-section.tsx`, `core-idea-section.tsx`, `achievements-section.tsx`, `sponsorship-section.tsx`, `value-prop-section.tsx`, `benefits-section.tsx`, `contact-section.tsx`. Each exports a functional component returning `null` for now. Create `index.ts` barrel.

5. **Create the motion wrapper client island.** In `app/_components/cham-bloom/motion-wrapper.tsx`, wrap exports in `LazyMotion` + `domAnimation` (smaller bundle). Build a `"use client"` component that accepts `children`, `delay?: number`, `direction?: 'up' | 'left' | 'right'` (Phase 3 vision/mission alternation), and `className?: string`. It uses Framer Motion `useInView` + `motion.div` to apply a `fadeInUp` variant (opacity 0→1, y 30→0, duration 0.6s, ease `easeOut`; map `direction` to x/y offset). Respect `useReducedMotion()` by passing `duration: 0` when true. This single wrapper is imported by all section components.

6. **Prepare the image directory.** Create `public/images/cham-bloom/` and add at least three placeholder flower WebP images (or `.gitkeep` until real assets arrive). Document the expected filenames in a comment at the top of `lib/content/cham-bloom-landing.ts` so the team knows what to supply.

7. **Replace `app/page.tsx` scaffold.** Replace the Next.js starter template in `app/page.tsx` with a minimal layout wrapped in `<main className="cham-bloom-page">` that imports and renders all section stubs in order (hero → about → vision-mission → core-idea → achievements → sponsorship → value-prop → benefits → contact). Add placeholder `export const metadata` (inline `Metadata` object until `lib/seo/` exists — see Phase 5).

---

## Acceptance Criteria

- `pnpm dev` compiles without errors after these changes.
- Running `pnpm build` produces no TypeScript errors from `lib/content/cham-bloom-landing.ts`.
- `http://localhost:3000` renders a white page (stub components) with no console errors.
- Chrome DevTools → Computed → `font-family` on `<body>` shows Open Sans; a test `font-display` class on any element resolves to Playfair Display.
- All `--bloom-*` CSS variables are visible in DevTools `:root` computed styles.
- `CHAM_BLOOM_CONTENT.tiers` has exactly 6 entries matching the spec tier names.

---

## Risks

- **Font CLS:** Playfair Display loading late can shift layout — set `display: 'swap'` and verify with Lighthouse CLS score ≤ 0.1 before Phase 2 sign-off.
- **Content model drift:** If copy changes after Phase 1, only `lib/content/cham-bloom-landing.ts` needs updating — no component files touched. Document this invariant in a comment.
