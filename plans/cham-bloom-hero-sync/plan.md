# Plan: CHẠM Bloom Hero UI Sync — Refactor Below-Hero Sections

Status: ✅ Complete
Date: 2026-05-18
Mode: Hard

---

## Overview

Refactor the 8 below-hero sections of the CHẠM Bloom landing page so they share the same visual language as the hero: glass pills for `SectionLabel`, consistent `py-24 md:py-32` spacing, a `GlassCard` material replacing solid white cards, and a `.bloom-headline-accent` gradient on `h2` anchors. Content, section IDs, order, and SEO metadata are untouched.

**User story origin (VI):** "Hiện tại phần UI từ hero trở xuống chưa đồng bộ với UI của phần hero lắm, refactor lại."

### Stakeholder decisions (2026-05-18)

| # | Quyết định |
|---|------------|
| 1 | **Gradient h2:** chỉ highlight **một vài từ** — tối đa 3 section (Achievements, Sponsorship, ValueProp); **không** accent About / CoreIdea |
| 2 | **Nền section:** giữ **xen kẽ** `bloom-cream` ↔ `bloom-green-mist` |
| 3 | **CoreIdea:** bỏ band tối — chuyển nền sáng (`cream`) + typography/pills giống hero; **Achievements** chuyển `mist` để không hai `cream` liên tiếp |
| 4 | **`BloomButton`:** **bắt buộc** Phase 4 — dùng chung hero + contact |
| 5 | **Baseline screenshot:** **không cần** — smoke test + screenshot mới đủ |

---

## User Stories

### P1 — Must have

| ID | Story |
|----|-------|
| US-01 | Là người truy cập landing, tôi thấy phong cách trực quan nhất quán từ hero xuống đến footer — không bị "vỡ" visual khi scroll. |
| US-02 | Là người truy cập trên mobile, layout và spacing không bị thay đổi nghĩa (nội dung, thứ tự, id neo trang vẫn hoạt động). |
| US-03 | Là nhà tài trợ tiềm năng, các thẻ gói tài trợ và bảng quyền lợi vẫn đọc được rõ ràng sau refactor. |

### P2 — Should have

| ID | Story |
|----|-------|
| US-04 | Là dev review, mỗi section dùng `SectionShell` — không còn spacing ad-hoc (`py-20`, `py-24`, `py-32` hỗn tạp). |
| US-05 | Là dev review, `SectionLabel` có hai variant: `plain` (hiện tại) và `glass` (mới — hero pill style); các section cream/mist dùng `glass`. |

---

## Current Mismatch Audit

| Section | Background | Spacing | SectionLabel | h2 accent | Cards / content |
|---------|-----------|---------|--------------|-----------|-----------------|
| Hero | `bloom-cream` + video | `h-screen` | Glass pill badge | ✅ gradient span | — |
| About | `bloom-cream` | `py-24 md:py-32` ✅ | Plain text | ❌ | `bg-white/70` – near-glass |
| VisionMission | `bloom-green-mist` | `py-24 md:py-32` ✅ | ❌ **missing** | ❌ | — |
| CoreIdea | `bloom-green-deep` → **`bloom-cream`** | `py-32` | ❌ **missing** | gold on light | Steps pills: hero-glass `tone="light"` |
| Achievements | `bloom-cream` → **`bloom-green-mist`** | `py-24` (no md:) | Plain | ❌ | `bg-white` solid |
| Sponsorship | gradient light→cream | `py-24` (no md:) | Plain | ❌ | `bg-white` solid |
| ValueProp | `bg-white` ❌ (should be cream) | `py-20` ❌ | ❌ **missing** | ❌ | bullet list |
| Benefits | `bloom-green-mist` | `py-20` ❌ | Plain | ❌ | table `bg-white` solid |
| Contact | `bloom-green-deep` | `py-32` | ❌ **missing** | — | CTA rounded-full ✅ |

---

## DESIGN Alignment

The hero establishes these design tokens that must propagate below:

```
Glass pill    : rounded-full border border-white/20 bg-white/15 backdrop-blur-md
               (light bg variant: border-bloom-green-mid/20 bg-white/60 backdrop-blur-sm)
h1 gradient   : bg-gradient-to-r from-bloom-green-deep via-bloom-green-mid to-gray-500
               → .bloom-headline-accent applies this to h2 accent spans
CTA button    : rounded-full (already present in contact; needs bloom-button.tsx for reuse)
Spacing unit  : py-24 md:py-32 (SectionShell enforces this)
Background    : cream (about, core-idea, value-prop) | mist (vision, achievements, benefits) | gradient (sponsorship) | deep (contact footer only)
```

---

## Phases

- [x] [Phase 1: Design Primitives](./phase-01-design-primitives.md) — Add CSS utility + build `SectionShell`, `GlassCard`, update `SectionLabel` with glass variant
- [x] [Phase 2: Section Shells](./phase-02-section-shells.md) — Wire `SectionShell` into all 8 sections; fix background colors & spacing discrepancies
- [x] [Phase 3: Cards & Typography](./phase-03-cards-typography.md) — Swap solid cards for `GlassCard`, apply `.bloom-headline-accent` to h2 accents, add missing `SectionLabel`s
- [x] [Phase 4: Polish & Verify](./phase-04-polish-verify.md) — Visual regression via Playwright screenshots, a11y check, cleanup dead classes

---

## Research Summary

**Chosen approach — Primary (Extract hero primitives):**
- New shared primitives (`SectionShell`, `GlassCard`, `SectionLabel` variants) give each section the same material system as the hero without duplicating class strings.
- Background rhythm: cream/mist alternate; **CoreIdea** moves to cream (hero sync); **Contact** keeps deep footer band only.
- Motion: `MotionWrapper` (Framer Motion) stays below the fold; hero keeps its CSS `animate-fade-in-up`. No change.
- Tokens-only `@layer` approach (Alternative) was rejected: it misses structural mismatches like missing `SectionLabel`s and the `bg-white` on ValueProp.

**Explicit do-not-touch list:**
- All text content & copy in `lib/content/cham-bloom-landing.ts`
- Section `id` attributes (SEO anchors)
- Section order in `app/page.tsx`
- `HeroSection`, `Navbar`, `HeroVideo`, `PageJsonLd`
- Benefits table layout — do NOT glass-wrap it heavily (scannability concern)
- Existing Playwright smoke test selectors

---

## Dependencies

- None external. All work is within `app/(landing)/_components/cham-bloom/` and `app/globals.css`.
- Next.js Tailwind v4 (`@theme` block already defines all bloom tokens).

---

## Risks

- **HIGH: Glass `SectionLabel` text color** — hero badge on cream uses `text-bloom-green-deep`, not `text-white`. Use `tone="light"` on cream/mist; `tone="dark"` only on `bg-bloom-green-deep` or over imagery. Mitigation: `SectionLabel` exposes `tone` prop (Phase 1).
- **MEDIUM: Over-glassing the Benefits table** — applying heavy `backdrop-blur` to a data table can hurt contrast and scanability. Mitigation: keep table container as subtle `bg-white/80` with a light border; no blur on table interior.
- **MEDIUM: `backdrop-blur` on low-end devices** — can cause jank. Mitigation: the hero already ships `backdrop-blur-md`; we match that precedent and rely on the same `@supports` browser coverage.
- **LOW: Spacing change breaks sticky-nav offset** — `SectionShell` standardises padding but doesn't touch `scroll-margin-top` (already set globally in `.cham-bloom-page [id]`). No risk.
- **LOW: Breaking e2e selectors** — all Playwright selectors target text content and `id` anchors, neither of which changes. No risk.

---

## Success Criteria (Measurable)

| # | Tiêu chí | Cách kiểm tra |
|---|---------|---------------|
| SC-1 | Smoke test `e2e/cham-bloom-smoke.spec.ts` xanh 100% | `npx playwright test` |
| SC-2 | No horizontal scroll on viewport 390 px | smoke test `scrollWidth ≤ viewportWidth + 1` |
| SC-3 | Mỗi section có `SectionLabel` (glass hoặc plain) hoặc h2 editorial rõ ràng; VisionMission có label trên khối Vision | Code review |
| SC-4 | Không còn `py-20` hoặc spacing đơn lẻ trên `<section>` tags | `rg "py-20" app/(landing)` returns 0 |
| SC-5 | `bg-white` không còn là background của `ValuePropSection` | Code review |
| SC-6 | Playwright chụp desktop + mobile sau refactor (không cần baseline) | `e2e/screenshots/` artifacts |
| SC-7 | `BloomButton` dùng ở hero + contact | Code review |

---

## Handoff Note for `/ck:cook`

- **Start with Phase 1** — all later phases depend on the primitives it creates.
- Implement phases sequentially (1 → 2 → 3 → 4).
- Run `npx playwright test` after Phase 4 to confirm SC-1 & SC-2.
- **`BloomButton` is required in Phase 4** — wire hero primary + contact CTA.
- **Gradient accents:** chỉ Achievements, Sponsorship, ValueProp (một vài từ mỗi h2).
- **CoreIdea:** `SectionShell bg="cream"`; `text-white` removed; gold `headlineGold` giữ trên nền sáng.
- Do not change `lib/content/cham-bloom-landing.ts` — it is the single source of truth for copy.

---

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-18
**Phase in progress:** complete
**Status:** All 4 phases shipped; build + e2e green; code review APPROVED 9/10

### Decisions made this session
- CoreIdea → `cream` + hero glass pills; Achievements → `mist` for alternation
- Gradient accent on 3 h2 only; hero h1 reuses `.bloom-headline-accent` utility
- `BloomButton` wired in hero + contact
- Inline labels for Vision/CoreIdea/ValueProp (not in content file)

### Next immediate action
None — ready for human visual sign-off in browser
