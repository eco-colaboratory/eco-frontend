# Plan: CHẠM Bloom Sponsor Landing Page

Status: ✅ Complete  
Date: 2026-05-18  
Mode: Hard  
Slug: cham-bloom-landing

---

## Overview

Build a Vietnamese-language, multi-section sponsor landing page for **CHẠM Bloom** (a "Flow & Flora" educational game project) using an **Editorial Garden** ("Tạp chí xanh đương đại") design direction — real flower photography interleaved with game UI accents, bold serif + modern sans typography, generous whitespace, and staggered scroll animations. The page lives at `app/page.tsx` (replacing the starter template) and targets potential corporate sponsors (launching Jun–Sep 2026) with a professional, inspiring tone that still feels Gen Z.

### Editorial Garden — design intent

| Dimension | Direction |
|---|---|
| **Visual** | High-quality real flower photography + subtle game-graphic overlays (HUD frames, pixel petals, UI cards) |
| **Typography** | Playfair Display (editorial serif) + Open Sans (body); large display headlines, wide tracking on labels |
| **Layout** | `max-w-7xl` editorial columns, alternating split grids, full-bleed dark "chapter" bands |
| **Motion** | Staggered fade-in-up on scroll (Framer Motion); optional hero petal float — not a single-viewport-only page |
| **Tone** | Premium magazine × garden story: "ảo thành thật" (virtual becomes real) |
| **CTA** | Magenta brand accent on primary buttons; botanical greens for backgrounds |

**Note:** `DESIGN.md` is the **hero + chrome spec** (video, gradient masks, navbar, glass, animations). Editorial Garden applies to **sections below the fold** (typography, greens, magazine layout). See [DESIGN.md alignment](#designmd-alignment) below.

### Stakeholder decisions (2026-05-18)

| # | Decision |
|---|----------|
| 1 | **Route:** Replace `app/page.tsx` home entirely (`/`) |
| 2 | **Branding:** `CHẠM Bloom` only — remove `REQ-Bean9` and `Eco Learning` from metadata, OG, root layout defaults |
| 3 | **Assets:** Placeholder images + mock data until final assets |
| 4 | **Benefits table:** Placeholder / mock rows until sponsor doc |
| 5 | **Hero:** Background video from `DESIGN.md` CloudFront URL (loop, muted, autoplay, inline) |

---

## DESIGN.md alignment

| Area | Follow `DESIGN.md`? | Notes |
|------|---------------------|--------|
| Hero video + `pt-[120px]` / `md:pt-[200px]` | **Yes** | Exact URL in `DESIGN.md`; `object-cover`, muted/autoplay/playsInline |
| White gradient masks on video (3 overlays) | **Yes** | Top fade into cream/white upper area — not a dark full-screen overlay |
| Navbar layout (`max-w-7xl`, glass mobile menu, stagger nav) | **Yes** | Copy/links = CHẠM Bloom anchors; CTA = magenta sponsor CTA |
| Glass pill badge (`backdrop-blur-md bg-white/15`) | **Yes** | CHẠM Bloom badge text, not Stellar rating |
| Stagger `fade-in-up` (0.1s–0.6s) | **Yes** | Via `MotionWrapper` or CSS keyframes from globals |
| Bottom bar (glass pill + partner names) | **Adapted** | Optional: milestone partners (Panasonic Gen G, FIP) or “Đang cập nhật” mock |
| Single viewport, no scroll | **No** | Sponsor pitch needs 9 scroll sections — hero is full-viewport only |
| Inter + monochrome B/W | **No** | Editorial Garden: Playfair + Open Sans, bloom greens + magenta CTA |
| Stellar copy / black CTAs | **No** | Vietnamese CHẠM Bloom copy; primary CTA `brand-magenta` |

---

## User Stories

### P1 — Must-have for launch

- **US-01** As a potential sponsor, I can read the full sponsor pitch in Vietnamese on one scrollable page so I understand what CHẠM Bloom is and why I should invest.
- **US-02** As a potential sponsor, I can see the project's achievements (Top 5 Gen G, Á quân FIP) at a glance to assess credibility.
- **US-03** As a potential sponsor, I can view all sponsorship tiers (names, rough fund allocation) to choose the right level.
- **US-04** As a potential sponsor, I can contact the team immediately via the CTA section (email, Facebook, "Liên hệ ngay" button).
- **US-05** As a search engine crawler, I can read meaningful Vietnamese metadata (title, description, OG, JSON-LD) so the page ranks and shares correctly.

### P2 — Important but deferrable

- **US-06** As a mobile visitor, I experience a fully responsive layout (stacked cards, readable typography, usable nav) on screens ≥ 320 px wide.
- **US-07** As a visitor with reduced-motion preferences, I see the page without distracting animations (Framer Motion `useReducedMotion` respected).
- **US-08** As a sponsor, I can download or link to a detailed sponsor benefits document (placeholder link until PDF is ready).

### P3 — Nice-to-have / post-launch

- **US-09** As a visitor, the hero plays the looping background video from `DESIGN.md` (muted, autoplay) with white gradient masks into the editorial upper area.
- **US-10** As a sponsor, I can see an interactive benefits comparison table drawn from sponsor-doc images (Phase 4 placeholder → full table post-asset delivery).
- **US-11** As the team, I can trigger a GSAP "bloom" petal animation on the hero logo without breaking the Framer Motion scroll system.

---

## Design System Tokens

New CSS custom properties to add in `app/globals.css` under `:root` and `@theme`:

| Token (CSS var) | Value | Tailwind class | Usage |
|---|---|---|---|
| `--bloom-green-deep` | `#1a4a2e` | `text-bloom-green-deep` | Section headings on light BG |
| `--bloom-green-mid` | `#2d7a4f` | `bg-bloom-green-mid` | Accent dividers, icon fills |
| `--bloom-green-light` | `#e8f5ee` | `bg-bloom-green-light` | Section background tints |
| `--bloom-green-mist` | `#f0f9f4` | `bg-bloom-green-mist` | Alternating row BG |
| `--bloom-cream` | `#faf8f3` | `bg-bloom-cream` | Hero / card background |
| `--bloom-gold` | `#c9a84c` | `text-bloom-gold` | Achievement badges, tier accents |
| `--brand-magenta` | `#ad1c9a` | `text-brand-magenta` | CTA buttons, magenta accents (existing) |
| `--brand-pink` | `#f4449b` | `text-brand-pink` | Gradient end, hover states (existing) |
| `--font-display` | Playfair Display | `font-display` | Editorial serif headings |
| `--font-body` | Open Sans (existing) | `font-sans` | Body copy |

**Typography scale (display)**

| Element | Class |
|---|---|
| Hero H1 | `font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight` |
| Section H2 | `font-display text-4xl md:text-5xl leading-[1.1]` |
| Section H3 | `font-display text-2xl md:text-3xl` |
| Body large | `font-sans text-lg md:text-xl leading-relaxed` |
| Body base | `font-sans text-base leading-relaxed` |
| Label / tag | `font-sans text-xs uppercase tracking-widest` |

---

## Section Wireframes (text descriptions)

### 1 — Hero (full-viewport, **video BG** per DESIGN.md)
```
┌──────────────────────────────────────────────────────┐
│  [NAVBAR]  z-20 · fade-in-up · glass mobile menu      │
│────────────────────────────────────────────────────── │
│  [White/cream upper zone — gradient masks on video]   │
│    [Glass badge]                                      │
│    Cùng CHẠM Bloom…  [Playfair, dark text on light]   │
│    Tagline + CTAs (magenta primary)                   │
│                                                       │
│  [Video visible lower half — pt-120/200 on <video>]   │
│                                                       │
│  [Optional bottom bar: glass pill + partner mock]     │
│    ↓ bottom fade into bloom-cream section #about     │
└──────────────────────────────────────────────────────┘
```

### 2 — About (CHẠM Bloom là gì?)
```
┌──────────────────────────────────────────────────────┐
│  [BG: bloom-cream]  max-w-7xl centered               │
│                                                       │
│  [Label tag: "Về chúng tôi"]                         │
│  CHẠM Bloom là gì?  [serif H2]                       │
│                                                       │
│  [3-column icon cards]                               │
│  🌱 Game giáo dục  · 🌸 Trải nghiệm ảo · 🌿 Tác động thật│
│  [each card: glass BG, icon, title, 2-line desc]     │
└──────────────────────────────────────────────────────┘
```

### 3 — Vision + Mission (split editorial)
```
┌──────────────────────────────────────────────────────┐
│  [BG: bloom-green-mist]                              │
│                                                       │
│  [LEFT col 5/12]           [RIGHT col 7/12]          │
│  Tầm nhìn                  [Flower photo, rounded]   │
│  [serif H2]                                          │
│  [body text]                                         │
│                                                       │
│  ─────────────────────────────────────────────────── │
│                                                       │
│  [LEFT col 7/12]           [RIGHT col 5/12]          │
│  [Flower photo, rounded]   Sứ mệnh                   │
│                            [serif H2]                 │
│                            [body text]               │
└──────────────────────────────────────────────────────┘
```

### 4 — Core Idea (Vườn hoa ảo → Vườn hoa thật)
```
┌──────────────────────────────────────────────────────┐
│  [BG: dark green #1a4a2e, full bleed]                │
│                                                       │
│  [Center-aligned]                                    │
│  Vườn hoa ảo hôm nay...  [serif, white, large]      │
│  ...là vườn hoa thật ngày mai  [serif, gold, large]  │
│                                                       │
│  [3 step pills: Chơi game → Chạm hoa → Trồng thật]  │
│  [connected by dotted line, animated on scroll]      │
└──────────────────────────────────────────────────────┘
```

### 5 — Achievements
```
┌──────────────────────────────────────────────────────┐
│  [BG: bloom-cream]                                   │
│                                                       │
│  [Label: "Thành tích"]                              │
│  Được công nhận  [serif H2]                          │
│                                                       │
│  [2 achievement cards, large]                        │
│  ┌─────────────────┐  ┌─────────────────┐            │
│  │ 🏆 Top 5        │  │ 🥈 Á quân       │            │
│  │ Gen G           │  │ FIP             │            │
│  │ [gold badge]    │  │ [gold badge]    │            │
│  └─────────────────┘  └─────────────────┘            │
└──────────────────────────────────────────────────────┘
```

### 6 — Sponsorship Tiers
```
┌──────────────────────────────────────────────────────┐
│  [BG: bloom-green-light gradient]                    │
│                                                       │
│  [Label: "Tài trợ"]                                 │
│  Các gói đồng hành  [serif H2]                      │
│                                                       │
│  [6 tier cards, grid 2-col md 3-col]                 │
│  Đồng hành · Bảo trợ TT · Hạt Mầm                  │
│  Mầm Xanh · Vườn Xanh · Nở Xanh                    │
│  [each: tier name, icon, highlight color ring]       │
│                                                       │
│  [Fund usage: donut chart placeholder + bullets]     │
└──────────────────────────────────────────────────────┘
```

### 7 — Sponsor Value Proposition
```
┌──────────────────────────────────────────────────────┐
│  [BG: white]  2-col split                            │
│  LEFT: "Tại sao đồng hành cùng CHẠM Bloom?"         │
│         [serif H2]  [body]                           │
│  RIGHT: [4 value bullets with bloom-green icons]     │
└──────────────────────────────────────────────────────┘
```

### 8 — Benefits Table (placeholder)
```
┌──────────────────────────────────────────────────────┐
│  [BG: bloom-green-mist]                              │
│  Quyền lợi đồng hành  [serif H2]                    │
│  [Responsive table with tier columns]                │
│  [Row headers: Brand visibility, Events, Media…]     │
│  [Cells: ✓ / — / custom text]                       │
│  [Data: placeholder — populated from sponsor doc]    │
└──────────────────────────────────────────────────────┘
```

### 9 — Contact CTA
```
┌──────────────────────────────────────────────────────┐
│  [BG: dark green full-bleed with flower photo overlay]│
│                                                       │
│  Sẵn sàng trồng vườn cùng chúng tôi?  [serif, white]│
│  [Magenta CTA button: "Liên hệ ngay"]               │
│  [Email link]  [Facebook link]                       │
│                                                       │
│  [FOOTER: copyright, team name]                      │
└──────────────────────────────────────────────────────┘
```

---

## Phases

- [x] Phase 1: Foundation — Design tokens, font, content model, image pipeline, route scaffold
- [x] Phase 2: Hero + Navbar — Video hero per DESIGN.md, transparent→solid sticky nav, mobile menu
- [x] Phase 3: Editorial Sections — About, Vision/Mission, Core Idea, Achievements scroll sections
- [x] Phase 4: Sponsorship + CTA — Tiers grid, value prop, benefits table placeholder, contact CTA + footer
- [x] Phase 5: SEO + Polish — Metadata, JSON-LD, sitemap, Playwright smoke

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-18
**Phase in progress:** complete
**Status:** All 5 phases shipped; `pnpm build` and `npm run test:e2e` pass.

### Decisions made this session
- Hero video from DESIGN.md CloudFront URL; cream gradient masks (no dark overlay).
- Branding CHẠM Bloom only in layout + `lib/seo/` (no REQ-Bean9 / Eco Learning).
- Placeholder Unsplash images + mock benefits table with overlay note.
- `useSyncExternalStore` for reduced-motion in hero video (eslint-safe).
- Playwright e2e added with `test:e2e` script.

### Next immediate action
- Replace placeholder images in `lib/content/cham-bloom-landing.ts` when assets arrive.
- Remove `benefitsNote` overlay when sponsor doc table is final.

---

## Research Summary

**Chosen approach:** Single-page scroll at `app/page.tsx` (starter template replaced), with modular section components under `app/_components/cham-bloom/`. Server Components by default; client islands scoped to navbar mobile menu (`"use client"`) and Framer Motion scroll wrappers (`"use client"`). Content fully typed in `lib/content/cham-bloom-landing.ts` — no runtime markdown parsing.

**Typography:** Add Playfair Display via `next/font/google` alongside existing Open Sans. Expose as `--font-display` CSS variable and `font-display` Tailwind utility.

**Animations:** Framer Motion `useInView` + `motion.div` for staggered fade-in-up on all sections. Optional GSAP bloom sequence reserved for hero logo (Phase 5 stretch). `useReducedMotion` respected globally.

**Hero video:** `DESIGN.md` CloudFront MP4 — `<video>` not `next/image` for hero BG. Section images: placeholders in `/public/images/cham-bloom/` (Unsplash/mock) until final assets.

**SEO:** `buildPageMetadata` (from `lib/seo/metadata.ts`) + Organization JSON-LD at page level. `vi_VN` locale. Add static entry to `app/sitemap.ts`.

---

## Dependencies

- `playfair-display` font available via `next/font/google` (no install needed)
- Flower photo assets: team must supply ≥ 3 high-res images for hero + section BGs before Phase 2 starts (placeholder images acceptable for Phase 1–2 dev)
- Detailed sponsor benefits data (table cells): required before Phase 4 can be finalised — use placeholder skeleton until received
- `lib/seo/metadata.ts` must export `buildPageMetadata` (confirmed in docs/SEO.md)
- Root `app/layout.tsx` default metadata still says Eco Learning — Phase 5 replaces with CHẠM Bloom site defaults

---

## Risks

- **HIGH:** Flower photo assets not delivered before Phase 2 — *Mitigation: use free Unsplash botanical images as placeholders with clear `// TODO: replace` comments; keep `next/image` src props in content model so swap is one-line.*
- **HIGH:** Sponsor benefits table data missing — *Mitigation: Phase 4 renders a styled skeleton/placeholder table; real data populates `lib/content/cham-bloom-landing.ts` when sponsor doc is processed.*
- **MEDIUM:** Playfair Display + Open Sans weight mismatch causing CLS on slow connections — *Mitigation: set `display: swap`, use `font-display` variable consistently, add `<link rel="preconnect">` in layout.*
- **MEDIUM:** Framer Motion + SSR hydration mismatch on scroll animations — *Mitigation: wrap all `motion.*` in `"use client"` components; use `LazyMotion` with `domAnimation` feature set to reduce bundle.*
- **LOW:** `app/page.tsx` replacement breaks existing routes or layout — *Mitigation: confirm no other page imports Home; the file is a pure starter template per codebase facts.*
- **LOW:** Vietnamese font rendering inconsistency on Windows — *Mitigation: Open Sans already includes `vietnamese` subset; ensure Playfair Display also loads with `subsets: ['latin', 'vietnamese']`.*
- **NOTED (review):** `lib/seo/` documented in `docs/SEO.md` may not exist yet — implement helpers in Phase 5 or use inline metadata in Phase 1 stubs.
- **NOTED (review):** Benefits table detail lives in sponsor-doc images — ship placeholder in Phase 4; populate `CHAM_BLOOM_CONTENT.benefits` when data arrives.
- **NOTED (review):** `docs/Flow & Flora.md` is ~600KB (embedded images) — never import at runtime; transcribe copy to `lib/content/cham-bloom-landing.ts` only.
