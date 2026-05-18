# Phase 2: Hero + Navbar

## Goal

Deliver the full-viewport hero per **`DESIGN.md`** (looping background video, white gradient masks, glass badge, staggered entrance) with CHẠM Bloom copy and Editorial Garden typography on the headline — plus a sticky navbar and optional bottom partner/milestone bar. This is the only section that closely mirrors `DESIGN.md`; the rest of the page scrolls below.

## Dependencies

- Phase 1 complete: `--bloom-*` tokens, Playfair Display, `CHAM_BLOOM_CONTENT.hero` (including `videoUrl`), `MotionWrapper`, `animate-fade-in-up` keyframes in `globals.css`.

---

## Files to Create / Modify

| Action | Path | Purpose |
|---|---|---|
| Modify | `app/_components/cham-bloom/hero-section.tsx` | Video hero per DESIGN.md + CHẠM Bloom content |
| Create | `app/_components/cham-bloom/hero-video.tsx` | `"use client"` `<video>` with autoplay/muted/playsInline |
| Create | `app/_components/cham-bloom/navbar.tsx` | `"use client"` sticky nav per DESIGN.md layout |
| Modify | `app/globals.css` | `fadeInUp` / `fadeInOverlay` keyframes if not added in Phase 1 |
| Modify | `app/page.tsx` | `<Navbar />` + `<HeroSection />`; page scrolls (not `overflow-hidden` on `<main>`) |

---

## DESIGN.md constants (hero)

```ts
// lib/content/cham-bloom-landing.ts — hero.videoUrl
'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_153826_e9005cf7-a1c7-4c7d-886f-fea22d644a9c.mp4'
```

| Spec | Implementation |
|------|----------------|
| Video | `absolute inset-0 w-full h-full object-cover`, `muted` `autoPlay` `loop` `playsInline` |
| Video offset | `pt-[120px] md:pt-[200px]` on `<video>` so motion reads below headline |
| Gradient overlays (z-10) | General: `top-[120px] h-[200px] bg-gradient-to-b from-bloom-cream to-transparent`; Desktop `md:block`: `top-[200px] h-[300px]`; Mobile `md:hidden`: same as general — all `pointer-events-none` |
| Hero content | `z-20`, `max-w-7xl`, centered, stagger delays 0.1–0.6s |
| Glass badge | `backdrop-blur-md bg-white/15 border border-white/20` |
| Bottom bar (optional) | Glass pill + mock partner names (Georgia italic) or achievement labels |

---

## Implementation Steps

1. **Add CSS animations (if missing).** In `app/globals.css`, port from `DESIGN.md`:

   ```css
   @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
   .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
   @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
   .animate-fade-in-overlay { animation: fadeInOverlay 0.4s ease-out forwards; }
   ```

2. **Hero video client island.** `hero-video.tsx` renders `<video src={url} className="absolute inset-0 w-full h-full object-cover pt-[120px] md:pt-[200px]" … />`. Add `aria-hidden` on video; poster optional (`/images/cham-bloom/hero-poster.webp` placeholder).

3. **Hero section layers** (`hero-section.tsx`). Container: `relative h-screen min-h-[700px] min-h-[100svh] overflow-hidden bg-bloom-cream` (white/cream upper — **not** dark overlay). Stack:
   - `<HeroVideo />`
   - Three white/cream gradient overlays (see table above)
   - Content column: glass badge → H1 (Playfair, `text-bloom-green-deep` or gradient on accent line per editorial) → tagline (`text-gray-600`) → CTAs (primary `bg-brand-magenta`, secondary outline)
   - Bottom: optional partner/milestone bar (`absolute bottom-0`, glass pill + mock names from `CHAM_BLOOM_CONTENT.hero.partners`)
   - Bottom transition: `h-48 bg-gradient-to-t from-bloom-cream to-transparent` into `#about`

4. **Navbar** (`navbar.tsx`). Match `DESIGN.md`: `max-w-7xl`, `px-4 sm:px-6 py-4`, `z-50` fixed, `animate-fade-in-up` delay 0.1s. Transparent at top → `bg-bloom-cream/95 backdrop-blur-md border-b` after 60px scroll. Mobile menu: `bg-bloom-cream/95 backdrop-blur-md`, `animate-fade-in-overlay`. Links: Về chúng tôi, Tầm nhìn, Gói tài trợ, Liên hệ. CTA: Liên hệ ngay (magenta).

5. **Page wiring.** `app/page.tsx`: `<main className="cham-bloom-page overflow-x-hidden">` — **allow vertical scroll** for sections below hero (differs from DESIGN.md single-viewport). Hero remains `h-screen`.

6. **A11y.** `prefers-reduced-motion`: hide video, show `hero-poster.webp` static fallback. CTA and nav focus rings visible.

---

## Acceptance Criteria

- Hero uses CloudFront MP4 from `DESIGN.md`; plays muted on desktop and mobile (`playsInline`).
- White/cream gradient masks visible at top; no full-screen `black/60` overlay.
- H1 CHẠM Bloom copy visible in Playfair Display; tagline + 2 CTAs present.
- Navbar matches DESIGN.md interaction pattern; mobile menu opens/closes.
- Scrolling past hero reveals About section (page is **not** single-viewport locked).
- `pnpm lint` clean.

---

## Risks

- **LCP:** Video is heavy — use poster image + `preload="metadata"`; monitor Lighthouse.
- **iOS autoplay:** Requires `muted` + `playsInline`.
- **Reduced motion:** Mandatory static fallback.
