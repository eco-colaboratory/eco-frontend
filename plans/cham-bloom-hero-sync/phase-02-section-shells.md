# Phase 2: Section Shells

## Goal

Replace the ad-hoc `<section className="bg-* px-4 py-*">` boilerplate in all 8 below-hero sections with `SectionShell`, unifying vertical spacing to `py-24 md:py-32` and correcting background color inconsistencies (notably `ValuePropSection` using `bg-white` instead of `bg-bloom-cream`).

---

## Tasks

- [ ] **2.1 — Wrap `AboutSection` with `SectionShell`**
  Replace `<section id="about" className="bg-bloom-cream py-24 md:py-32">` with `<SectionShell id="about" bg="cream">`. Verify the inner `max-w-7xl px-4 sm:px-6` container remains unchanged.

- [ ] **2.2 — Wrap `VisionMissionSection` with `SectionShell`**
  Replace `<section id="vision" className="bg-bloom-green-mist py-24 md:py-32">` with `<SectionShell id="vision" bg="mist">`. Inner layout (`space-y-20`, grid, `MotionWrapper`) is untouched.

- [ ] **2.3 — Wrap `CoreIdeaSection` with `SectionShell` (hero sync — light band)**
  Replace `bg-bloom-green-deep … text-white` with `<SectionShell id="core-idea" bg="cream">`. Remove `text-white` from section root; headlines use `text-bloom-green-deep`, `headlineGold` keeps `text-bloom-gold` on cream.

- [ ] **2.4 — Wrap `AchievementsSection` with `SectionShell` (fix spacing + alternation)**
  Current: `py-24` on cream. Replace with `<SectionShell id="achievements" bg="mist">` so cream (CoreIdea) ↔ mist (Achievements) alternates. Move `px-4` into inner container.

- [ ] **2.5 — Wrap `SponsorshipSection` with `SectionShell` (fix missing `md:py-32`)**
  Current: `bg-gradient-to-b from-bloom-green-light to-bloom-cream px-4 py-24`. Replace with `<SectionShell id="sponsorship" bg="light-to-cream">`. The gradient background variant must be included in `SectionShell`'s `bg` enum. Move `px-4` into inner container.

- [ ] **2.6 — Wrap `ValuePropSection` with `SectionShell` (fix `bg-white` → `bg-bloom-cream`, fix `py-20` → `py-24 md:py-32`)**
  This is the most impactful correction. Replace `<section id="value" className="bg-white px-4 py-20">` with `<SectionShell id="value" bg="cream">`.

- [ ] **2.7 — Wrap `BenefitsSection` with `SectionShell` (fix `py-20` → `py-24 md:py-32`)**
  Replace `<section id="benefits" className="bg-bloom-green-mist px-4 py-20">` with `<SectionShell id="benefits" bg="mist">`.

- [ ] **2.8 — Wrap `ContactSection` with `SectionShell`**
  Replace `<section id="contact" className="relative overflow-hidden bg-bloom-green-deep px-4 py-32 text-white">` with `<SectionShell id="contact" bg="deep" className="relative overflow-hidden">`. Ensure `text-white` and `overflow-hidden` carry through (either via `SectionShell` deep variant or `className` prop).

---

## Files Touched

| File | Action |
|------|--------|
| `app/(landing)/_components/cham-bloom/about-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/vision-mission-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/core-idea-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/achievements-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/sponsorship-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/value-prop-section.tsx` | Swap `<section>` → `<SectionShell>` + bg fix |
| `app/(landing)/_components/cham-bloom/benefits-section.tsx` | Swap `<section>` → `<SectionShell>` + spacing fix |
| `app/(landing)/_components/cham-bloom/contact-section.tsx` | Swap `<section>` → `<SectionShell>` |
| `app/(landing)/_components/cham-bloom/section-shell.tsx` | (created in Phase 1) |

---

## Acceptance Criteria

- [ ] **Tiêu chí SC-4:** `rg "py-20" app/\(landing\)` trả về 0 kết quả.
- [ ] **Tiêu chí SC-5:** `ValuePropSection` không còn `bg-white`; background là `bg-bloom-cream`.
- [ ] Tất cả 8 section IDs vẫn tồn tại nguyên vẹn (kiểm tra bằng `rg 'id="' app/(landing)`).
- [ ] Không còn `px-4` trực tiếp trên `<section>` tag (đã chuyển vào inner container hoặc `SectionShell` quản lý).
- [ ] Trang render không có layout shift — kiểm tra trực quan bằng browser.
- [ ] TypeScript: no errors from `SectionShell` prop usage.

---

## Dependencies

- **Phase 1 must be complete** — `SectionShell` component must exist before this phase begins.

---

## Risks

- **`ContactSection` has `relative overflow-hidden`** — these positional classes control the background `<Image>` overlay. They must survive the `SectionShell` swap. Pass them via `className` prop and confirm `SectionShell` does not override `position` or `overflow`.
- **`CoreIdeaSection` `text-white`** — the deep dark band needs white text cascading to all children. Either `SectionShell bg="deep"` includes `text-white` by default, or the cook must pass it explicitly. Document the convention in `section-shell.tsx` JSDoc.
- **Gradient background on `SponsorshipSection`** — `bg-gradient-to-b from-bloom-green-light to-bloom-cream` is a multi-class value. `SectionShell` must support this via the `light-to-cream` enum value (or accept a `bgClass` escape-hatch string for custom gradients).
