# Phase 3: Cards & Typography

## Goal

Apply the hero visual language at the content level: swap solid-white cards for `GlassCard`, add `.bloom-headline-accent` gradient treatment to `h2` accent text, add missing `SectionLabel` instances, and tighten the `CoreIdea` step pills to match hero glass pill style.

---

## Tasks

- [ ] **3.1 — `AboutSection`: upgrade card material**
  The 3 about cards currently use `bg-white/70 backdrop-blur-sm`. Swap to `<GlassCard>`. **No** `.bloom-headline-accent` on About (stakeholder: gradient chỉ một vài từ, 3 section khác).

- [ ] **3.2 — `AchievementsSection`: upgrade card material + SectionLabel**
  Cards currently use `bg-white` (solid). Swap to `<GlassCard className="border-2 border-bloom-gold/30 p-8 md:p-12 text-center">` to retain the gold border while gaining the glass material. Upgrade `SectionLabel` to `variant="glass" tone="light"` on cream.

- [ ] **3.3 — `SponsorshipSection`: upgrade tier cards + SectionLabel**
  Tier cards use `bg-white` solid. Swap to `<GlassCard>` with `border-2 border-{tierBorder}` for the gold/green distinction. The fund usage box (`bg-white/60`) is already close — upgrade to `<GlassCard className="max-w-2xl">`. SectionLabel: `variant="glass" tone="light"` on gradient-to-cream bg.

- [ ] **3.4 — `VisionMissionSection`: add missing SectionLabel**
  Currently no `SectionLabel` at all — the section jumps straight to `h2`. Add `<SectionLabel variant="glass" tone="light">Tầm nhìn & Sứ mệnh</SectionLabel>` above the Vision block only. This is the only section missing a label entirely.

  > **Note:** VisionMission uses a split editorial layout (image + text). Place the label above the first `h2` only (Vision block). Mission block can remain label-free per the alternating editorial convention.

- [ ] **3.5 — `CoreIdeaSection`: light band + hero glass pills**
  After Phase 2 (`bg="cream"`): change `h2` to `text-bloom-green-deep`; keep `headlineGold` as `text-bloom-gold`. Add `<SectionLabel variant="glass" tone="light">` (copy inline hoặc từ content nếu có key). Step pills: hero badge classes — `border border-white/20 bg-white/15 backdrop-blur-md text-bloom-green-deep` (`tone="light"`). Remove all `text-white` from section.

- [ ] **3.6 — `ValuePropSection`: add missing SectionLabel**
  No `SectionLabel` present. Add `<SectionLabel variant="glass" tone="light">Tại sao đồng hành?</SectionLabel>`. Since the bg is now cream (from Phase 2), use light tone.

- [ ] **3.7 — `BenefitsSection`: glass SectionLabel; keep table structure**
  SectionLabel exists (plain). Upgrade to `variant="glass" tone="light"` on mist background. **Do NOT glass-wrap the table itself** — keep `bg-white` on the table container for maximum scannability. The overlay note box can upgrade to `GlassCard` styling (`bg-white/90 backdrop-blur-sm`) which it already approximates.

- [ ] **3.8 — `ContactSection`: add SectionLabel; keep CTA as-is**
  No `SectionLabel` present. Add `<SectionLabel variant="glass" tone="dark" className="text-center">Liên hệ</SectionLabel>` above the h2 (dark band — white text per hero partners pill). The CTA (`rounded-full bg-bloom-green-mid`) is already hero-consistent — no change. Do **not** add glassmorphism to the main CTA button (it would hurt call-to-action clarity on a dark background).

- [ ] **3.9 — Apply `.bloom-headline-accent` (chỉ 3 section, một vài từ)**
  Wrap **only** these substrings:
  - `AchievementsSection` — từ cuối (e.g. "công nhận")
  - `SponsorshipSection` — "đồng hành" (2 từ cuối)
  - `ValuePropSection` — "đồng hành" (1 từ giữa)
  
  **Do NOT apply:** About, CoreIdea (`headlineGold` đủ accent), Contact, VisionMission, Benefits.

---

## Files Touched

| File | Action |
|------|--------|
| `app/(landing)/_components/cham-bloom/about-section.tsx` | Swap to `GlassCard`; optional accent span |
| `app/(landing)/_components/cham-bloom/achievements-section.tsx` | Swap to `GlassCard`; upgrade `SectionLabel` variant |
| `app/(landing)/_components/cham-bloom/sponsorship-section.tsx` | Swap tier cards + fund box to `GlassCard`; upgrade `SectionLabel` |
| `app/(landing)/_components/cham-bloom/vision-mission-section.tsx` | Add `SectionLabel` for Vision |
| `app/(landing)/_components/cham-bloom/core-idea-section.tsx` | Upgrade step pills to hero glass style |
| `app/(landing)/_components/cham-bloom/value-prop-section.tsx` | Add `SectionLabel`; optional accent span on h2 |
| `app/(landing)/_components/cham-bloom/benefits-section.tsx` | Upgrade `SectionLabel` variant; upgrade overlay note to `GlassCard` |
| `app/(landing)/_components/cham-bloom/contact-section.tsx` | Add `SectionLabel` |
| `app/globals.css` | `.bloom-headline-accent` applied (created Phase 1); no additional changes |

---

## Acceptance Criteria

- [ ] **Tiêu chí SC-3:** Tất cả 8 section có ít nhất một `SectionLabel` hoặc có h2 trực tiếp đóng vai trò label (VisionMission Vision block). Kiểm tra code review.
- [ ] `CoreIdeaSection` step pills hiển thị glass style (`bg-white/15 backdrop-blur-md`) thay vì `bg-bloom-green-mid/20`.
- [ ] Cards trong `AchievementsSection` và `SponsorshipSection` không còn `bg-white` solid; dùng `GlassCard`.
- [ ] Bảng quyền lợi (`BenefitsSection` table) vẫn dùng `bg-white` — **không** blur. Kiểm tra contrast vẫn đạt WCAG AA.
- [ ] `.bloom-headline-accent` spans hiển thị gradient text đúng trên nền cream và mist.
- [ ] Smoke test tiếp tục xanh — section IDs và heading text không thay đổi.

---

## Dependencies

- **Phase 1 must be complete** — `GlassCard`, `SectionLabel` variant, `.bloom-headline-accent` must exist.
- **Phase 2 must be complete** — sections must use `SectionShell` before cards/typography are upgraded (avoids double-touch of the same file).

---

## Risks

- **`.bloom-headline-accent` on h2 content from `CHAM_BLOOM_CONTENT`** — the content keys are plain strings; wrapping a substring in a `<span>` requires either splitting the string at the call site or adding a new content field. The safest approach is to split at the call site with a known delimiter (e.g., last N words) rather than modifying the content file. Document the decision inline.
- **GlassCard on tier cards with `border-2 border-bloom-gold`** — `GlassCard` default has `border border-bloom-green-mid/15`. The gold tier cards must override the border via `className`. Confirm `cn()` merge works correctly (Tailwind Merge should handle `border` vs `border-2`).
- **`VisionMissionSection` SectionLabel placement** — the editorial layout is image/text alternating. A label that spans both blocks may look odd. Restrict to the Vision text block only and confirm the layout still reads naturally on mobile.
