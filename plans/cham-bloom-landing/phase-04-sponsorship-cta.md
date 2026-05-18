# Phase 4: Sponsorship + CTA

## Goal

Build the commercial core of the landing page: the six-tier sponsorship grid, fund usage breakdown, sponsor value proposition, benefits table (with placeholder data), the full-bleed contact CTA section, and a minimal footer — converting a sponsor's interest into direct contact action.

## Dependencies

- Phase 1 complete: `CHAM_BLOOM_CONTENT.tiers`, `.fundUsage`, `.valueProp`, `.benefitsNote`, `.contact` all typed.
- Phase 3 complete: scroll and layout patterns established; `id="achievements"` is the last rendered section.

---

## Files to Create / Modify

| Action | Path | Purpose |
|---|---|---|
| Modify | `app/_components/cham-bloom/sponsorship-section.tsx` | 6-tier grid + fund usage bullets |
| Modify | `app/_components/cham-bloom/value-prop-section.tsx` | 2-col value proposition |
| Modify | `app/_components/cham-bloom/benefits-section.tsx` | Responsive benefits table (placeholder data) |
| Modify | `app/_components/cham-bloom/contact-section.tsx` | Full-bleed dark CTA + footer |
| Modify | `app/page.tsx` | Wire final four sections; confirm end-to-end scroll |

---

## Implementation Steps

1. **Sponsorship tiers grid** (`sponsorship-section.tsx`, Server Component). Render on `bg-gradient-to-b from-bloom-green-light to-bloom-cream py-24 px-4`. Structure:
   - Label tag ("Tài trợ") + serif H2 ("Các gói đồng hành").
   - `grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto mt-12`. Six tier cards, one per entry in `CHAM_BLOOM_CONTENT.tiers`. Each card: `rounded-2xl bg-white border-2 p-6 flex flex-col gap-3 cursor-default hover:shadow-lg transition-shadow`. Border color derived from a `highlight` field in the content model (e.g., `border-bloom-gold` for premium tiers, `border-bloom-green-mid` for base). Card contents: tier name in `font-display text-xl text-bloom-green-deep`; a decorative seed/flower SVG icon at 32 px; a 1-line teaser string from the content model. Wrap the grid in `MotionWrapper` so cards stagger in (delay 0.08 s × index).
   - Below the grid: a "Phân bổ quỹ" subsection with an unordered list of fund usage bullets from `CHAM_BLOOM_CONTENT.fundUsage`, each prefixed with a `•` in `text-bloom-green-mid`. Wrap in a `max-w-2xl mx-auto mt-10 bg-white/60 rounded-2xl p-6` card. Add `id="sponsorship"` to the section root.

2. **Sponsor value proposition** (`value-prop-section.tsx`, Server Component). Render `bg-white py-20 px-4`. Use a `grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto items-center`:
   - Left column: serif H2 from `CHAM_BLOOM_CONTENT.valueProp.title` + 1-paragraph body intro.
   - Right column: an ordered list (styled as `flex flex-col gap-4`) of value bullets from `CHAM_BLOOM_CONTENT.valueProp.bullets`. Each bullet: `flex items-start gap-3` with a `CheckCircle` Lucide icon in `text-bloom-green-mid w-5 h-5 flex-shrink-0 mt-0.5` and the bullet text in body style. Add `id="value"` to section.

3. **Benefits table** (`benefits-section.tsx`, Server Component). Render `bg-bloom-green-mist py-20 px-4`. Label tag ("Quyền lợi") + serif H2 ("Quyền lợi đồng hành"). Render a horizontally-scrollable table (`overflow-x-auto`) with:
   - Header row: "Quyền lợi" column + one column per tier name (6 columns).
   - Data rows: from `CHAM_BLOOM_CONTENT.benefits.rows` (**mock data** for v1); cells contain `✓`, `—`, or short text.
   - **Placeholder state:** Wrap the table in a `relative` container; overlay a `rounded-xl bg-white/80 backdrop-blur-sm border border-dashed border-bloom-green-mid/40 p-6 text-center` banner reading the `CHAM_BLOOM_CONTENT.benefitsNote` string (e.g. "Chi tiết quyền lợi sẽ được cập nhật sớm. Liên hệ để nhận hồ sơ tài trợ đầy đủ.") with a link to the contact section. Remove the overlay once real data is available — no code change needed, just update the content model. Add `id="benefits"` to section.

4. **Contact CTA section + Footer** (`contact-section.tsx`, Server Component). Full-bleed dark section (`relative overflow-hidden bg-bloom-green-deep py-32 px-4`):
   - Optional: a botanical photo at 15% opacity as an absolute-positioned background texture (same `next/image` pattern as hero).
   - Center-aligned content (`z-10 relative`): serif H2 ("Sẵn sàng trồng vườn cùng chúng tôi?") in white → body paragraph → magenta pill CTA button ("Liên hệ ngay" → `mailto:` from `CHAM_BLOOM_CONTENT.contact.email`) → secondary "Facebook" link with external icon → email address displayed as a `<a href="mailto:...">` in `text-white/70 hover:text-white`.
   - Animate the H2, body, and button with `MotionWrapper` stagger.
   - Below the CTA block, render a minimal footer bar (`border-t border-white/10 mt-16 pt-6 text-white/40 text-xs text-center`) with copyright text. Add `id="contact"` to section.

5. **Wire final sections into page.** In `app/page.tsx`, import and render the four new sections after Achievements: Sponsorship → Value Prop → Benefits → Contact. The file should now render all 9 sections in order with no stubs remaining.

6. **End-to-end scroll validation.** Run the Playwright smoke script across the full page: scroll to `#sponsorship`, assert all 6 tier card names are in the DOM; scroll to `#contact`, assert the "Liên hệ ngay" button is visible and its `href` starts with `mailto:`; confirm no horizontal scroll at 375 px viewport width.

---

## Acceptance Criteria

- Six tier cards render in a 2-col (mobile) / 3-col (desktop) grid; tier names match `CHAM_BLOOM_CONTENT.tiers`.
- Fund usage bullets list is visible below the tier grid.
- Value prop section shows 2-column layout on desktop, stacked on mobile; all bullets have green check icons.
- Benefits table renders with 6-tier column headers and at least 6 benefit rows; placeholder banner visible over table.
- Contact section has working `mailto:` link on the CTA button and a visible Facebook link.
- Footer copyright text renders.
- Smooth-scroll from navbar "Gói tài trợ" link lands at `#sponsorship` without page jump (requires `scroll-behavior: smooth` on `html` — add to `globals.css`).
- `pnpm build` produces no errors; all image `alt` text is Vietnamese.

---

## Risks

- **Tier card horizontal overflow on narrow screens:** 2-column grid with long Vietnamese tier names can overflow — use `break-words` on card text and test at 320 px.
- **`mailto:` spam exposure:** Displaying the email directly in HTML exposes it to scrapers — accept this risk for a sponsor page (it is intentionally public-facing), or encode with a simple CSS approach if the team prefers.
- **Benefits table real data timing:** The placeholder banner must be removed before sponsor outreach — add a `// TODO: remove placeholder when benefitsNote is empty` comment in the component so it is easy to find.
- **Footer overlap with fixed nav:** If a sponsor links directly to `#contact`, the section top may be obscured by the fixed navbar — add `scroll-margin-top: 80px` via `[id]` selector in `globals.css`.
