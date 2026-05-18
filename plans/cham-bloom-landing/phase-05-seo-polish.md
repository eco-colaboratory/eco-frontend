# Phase 5: SEO + Polish

## Goal

Make the page production-ready: correct Vietnamese metadata, Open Graph / Twitter cards, Organization JSON-LD, sitemap entry, accessibility audit fixes, performance budgets met, and a Playwright visual smoke test confirming the full scroll experience renders correctly at both desktop and mobile breakpoints.

## Dependencies

- Phases 1–4 complete: all 9 sections render, no console errors, `pnpm build` passes.
- `lib/seo/metadata.ts` exports `buildPageMetadata` **or** implement minimal SEO helpers per `docs/SEO.md` if the folder does not exist yet in the repo.
- `lib/seo/site.ts` exports `getSiteUrlFromRequest` and `getSiteUrl`.
- `app/sitemap.ts` exists and follows the established extension pattern.

---

## Files to Create / Modify

| Action | Path | Purpose |
|---|---|---|
| Modify | `app/page.tsx` | Export production `metadata` via `buildPageMetadata`; add page-level JSON-LD |
| Create | `app/_components/cham-bloom/page-json-ld.tsx` | Server Component emitting `<script type="application/ld+json">` for Organization |
| Modify | `app/sitemap.ts` | Add `/` static entry (or confirm it exists and is correct) |
| Modify | `app/globals.css` | Scoped scroll polish on `.cham-bloom-page` only (not global `html`) |
| Create | `e2e/cham-bloom-smoke.spec.ts` | Playwright visual smoke test (full-page desktop + mobile screenshots) |
| Modify | `app/layout.tsx` | Add `<link rel="preconnect">` for Google Fonts if not already present |

---

## Implementation Steps

1. **Wire production metadata (CHẠM Bloom only).** In `app/page.tsx`, export `metadata` with title/description for CHẠM Bloom. **Remove all `REQ-Bean9` and `Eco Learning` strings** from page metadata, OG `siteName`, and Twitter cards. Update root `app/layout.tsx` defaults: `title` template `%s | CHẠM Bloom`, `siteName: 'CHẠM Bloom'`, description in Vietnamese. If `buildPageMetadata` hardcodes `REQ-Bean9`, change helper/site constant to `CHẠM Bloom` or pass `siteName: 'CHẠM Bloom'`. Verify: canonical, `og:locale: vi_VN`, `og:image` → `/images/cham-bloom/og-cover.webp` (placeholder OK).

2. **Add Organization JSON-LD.** Create `app/_components/cham-bloom/page-json-ld.tsx` as a Server Component. It calls `getSiteUrlFromRequest()` to resolve the origin (multi-domain safe) and emits a `<script type="application/ld+json">` with an `@graph` containing an `Organization` node: `name: "CHẠM Bloom"`, `url`, `sameAs: [facebookUrl]`, `description`, and a `logo` ImageObject. Import and render `<PageJsonLd />` as the first child in `app/page.tsx` (before the navbar).

3. **Update sitemap.** In `app/sitemap.ts`, confirm the root `/` entry exists with `priority: 1.0` and `changeFrequency: "monthly"`. If it doesn't exist, add it. Do not add any other CHẠM Bloom-specific URLs (this is a single-page scroll; no sub-routes).

4. **Scoped CSS polish (landing only).** In `app/globals.css`, add to `@layer base`: `.cham-bloom-page { scroll-behavior: smooth; }` and `.cham-bloom-page [id] { scroll-margin-top: 5rem; }` (navbar offset for anchor links). Do **not** set `scroll-behavior` on global `html` — other app routes must remain unaffected. Add `.cham-bloom-page ::selection { background-color: var(--bloom-green-mid); color: white; }`.

5. **Accessibility audit and fixes.** Using the browser DevTools Accessibility panel or `axe-core`, identify and fix: missing `aria-label` on icon-only buttons (hamburger, Facebook icon link); ensure all images have meaningful Vietnamese `alt` text (not just filenames); confirm color contrast ratio ≥ 4.5:1 for body text on `bg-bloom-green-mist` and `bg-bloom-cream` backgrounds (use a contrast checker); verify landmark structure (`<header>`, `<main>`, `<footer>` wrapping the correct sections); confirm focus order is logical (tab through navbar → CTA → sections).

6. **Performance budget check.** Run `pnpm build && pnpm start`, then Lighthouse on `localhost:3000`. Target: Performance ≥ 85, Accessibility ≥ 90, Best Practices ≥ 90, SEO ≥ 95 on desktop. If Performance is below 85, diagnose with the Waterfall view — likely causes: hero image LCP (ensure `priority` + WebP ≤ 300 KB), Framer Motion bundle (ensure `LazyMotion` + `domAnimation` are used), or unused font weights (remove any Playfair Display weight not used in the design).

7. **Playwright visual smoke test.** Write `e2e/cham-bloom-smoke.spec.ts` using the project's existing Playwright setup (if it exists) or a standalone script following the `playwright-skill` pattern. The test should:
   - Navigate to `http://localhost:3000`.
   - Assert page `<title>` contains "CHẠM Bloom".
   - Assert H1 text is visible.
   - Scroll to `#sponsorship` and assert all 6 tier card headings are present in the DOM.
   - Scroll to `#contact` and assert the CTA button is visible.
   - Take a full-page screenshot at 1440 × 900 (desktop) and 390 × 844 (iPhone 14 viewport).
   - Store screenshots to `e2e/screenshots/cham-bloom-desktop.png` and `e2e/screenshots/cham-bloom-mobile.png`.
   - Assert no horizontal overflow: `expect(await page.evaluate(() => document.body.scrollWidth)).toBeLessThanOrEqual(1440)` on desktop.

8. **Final review checklist.** Before marking phase complete: confirm `pnpm build` produces zero TS errors; run `pnpm lint`; open the built page in an incognito window and verify OG tags with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) URL pattern (paste the production URL when live); confirm the page renders above the fold in under 3 s on a simulated 4G connection in DevTools.

---

## Acceptance Criteria

- `<title>` on `http://localhost:3000` includes "CHẠM Bloom" and the agreed site suffix (`| CHẠM Bloom`, not `| REQ-Bean9`, unless product owner explicitly keeps Eco Learning branding).
- `curl -s http://localhost:3000 | grep -o 'application/ld+json'` returns at least one match.
- `curl -s http://localhost:3000/sitemap.xml | grep '<loc>'` includes the root URL.
- Lighthouse desktop scores: Performance ≥ 85, Accessibility ≥ 90, SEO ≥ 95.
- Playwright smoke test passes: both screenshots captured, no assertion failures.
- `axe-core` reports zero critical violations on the rendered page.
- `pnpm lint` exits with code 0; `pnpm build` exits with code 0.
- No horizontal scrollbar visible at 375 px viewport width in Chrome DevTools device simulation.

---

## Risks

- **`buildPageMetadata` OG suffix mismatch:** The function appends `| REQ-Bean9` to OG title but the CHẠM Bloom page is a different product — verify the suffix is acceptable or whether a separate site name constant is needed; if so, update `lib/seo/site.ts` accordingly.
- **Playwright not installed in repo:** If no `e2e/` directory exists, install `@playwright/test` as a dev dependency and add a `"test:e2e"` script to `package.json` — do not skip the smoke test.
- **`getSiteUrlFromRequest` in static export:** If the project is statically exported (`output: 'export'`), this function cannot read request headers — fall back to `getSiteUrl()` for JSON-LD. Check `next.config.*` before implementing.
- **Font preconnect missing:** Without `<link rel="preconnect" href="https://fonts.gstatic.com">` in `<head>`, Playfair Display will load late and cause CLS — add it to `app/layout.tsx` via a `<Head>` equivalent (in App Router, use `export const metadata.alternates` or add it directly in the root layout JSX).
