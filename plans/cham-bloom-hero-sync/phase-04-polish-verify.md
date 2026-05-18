# Phase 4: Polish & Verify

## Goal

Run the full verification suite, remove dead classes, extract **`BloomButton`** (required), and run Playwright smoke + screenshots. No baseline comparison needed.

---

## Tasks

- [ ] **4.1 — Purge dead utility classes**
  Search for leftover `bg-white` on section backgrounds, orphaned `py-20`/`py-24` on `<section>` tags (now managed by `SectionShell`), and redundant `px-4` on section roots. Remove any that `SectionShell` now covers.
  ```
  rg "py-20" app/\(landing\)
  rg "bg-white\"" app/\(landing\)/_components/cham-bloom
  ```

- [ ] **4.2 — Run Playwright smoke test; capture screenshots**
  Execute `npx playwright test e2e/cham-bloom-smoke.spec.ts`. Overwrite `cham-bloom-desktop.png` / `cham-bloom-mobile.png`. No baseline folder required. Confirm: no broken layout, no horizontal scroll.

- [ ] **4.3 — Accessibility spot-check**
  Run `axe` or Playwright accessibility scan on the rendered page. Verify:
  - Glass cards have sufficient color contrast for text (`bg-white/60` on `bloom-cream` — check contrast ratio).
  - `SectionLabel variant="glass" tone="dark"` on contact — white text on `bg-white/15` over deep green; if contrast fails, use `text-bloom-gold` fallback (not on CoreIdea — that section has no SectionLabel).
  - Table in `BenefitsSection` still passes (unchanged, but confirm).

- [ ] **4.4 — Extract `BloomButton` (required)**
  Create `bloom-button.tsx` with `variant`: `primary` | `outline` (match hero CTAs). Wire into `hero-section.tsx` (primary + secondary) and `contact-section.tsx` (primary). Export from `index.ts`.

- [ ] **4.5 — Review `section-shell.tsx` and `glass-card.tsx` for completeness**
  Confirm both components have JSDoc comments explaining their purpose and accepted `bg` / `variant` props. This ensures the next developer understands when to reach for each primitive.

- [ ] **4.6 — Final visual review (human sign-off)**
  Load `http://localhost:3000` in the browser. Scroll from hero through all 8 sections. Confirm visual continuity: the glass pill `SectionLabel`, consistent spacing bands, gradient h2 accents, and `GlassCard` materials read as one coherent design system — not a patchwork.

- [ ] **4.7 — Update `index.ts` barrel export (cleanup)**
  Ensure all new exports (`SectionShell`, `GlassCard`, optionally `BloomButton`) are exported from `index.ts`. Remove any duplicate or stale import paths in section files.

---

## Files Touched

| File | Action |
|------|--------|
| Any section file with leftover dead classes | Cleanup |
| `app/(landing)/_components/cham-bloom/section-shell.tsx` | JSDoc |
| `app/(landing)/_components/cham-bloom/glass-card.tsx` | JSDoc |
| `app/(landing)/_components/cham-bloom/bloom-button.tsx` | **Create** (required) |
| `app/(landing)/_components/cham-bloom/hero-section.tsx` | Use `BloomButton` |
| `app/(landing)/_components/cham-bloom/contact-section.tsx` | Use `BloomButton` |
| `app/(landing)/_components/cham-bloom/index.ts` | Final export cleanup |
| `e2e/screenshots/` | New screenshot artifacts |

---

## Acceptance Criteria

- [ ] **SC-1:** `npx playwright test e2e/cham-bloom-smoke.spec.ts` — tất cả test xanh.
- [ ] **SC-2:** No horizontal overflow at 390 px (confirmed by smoke test assertion).
- [ ] **SC-4:** `rg "py-20" app/\(landing\)` → 0 kết quả.
- [ ] **SC-5:** `rg 'bg-white"' app/\(landing\)/_components/cham-bloom` → 0 kết quả on `<section>` tags (table interior may still use `bg-white` — acceptable).
- [ ] **SC-6:** Playwright screenshots captured post-refactor.
- [ ] **SC-7:** `BloomButton` used in hero + contact.
- [ ] TypeScript compiler (`tsc --noEmit`) báo 0 lỗi mới.
- [ ] `SectionShell` và `GlassCard` có JSDoc trước khi merge.

---

## Dependencies

- **Phases 1–3 must be complete.**
- Playwright must be configured and dev server accessible (`npx playwright test` requires running Next.js dev or a production build).

---

## Risks

- **Contrast failures on glass SectionLabel (dark bands)** — `bg-white/15` with white text may fall just under WCAG AA at small font sizes (xs tracking-widest). Mitigation: if contrast fails, swap the dark-band label variant to `text-bloom-gold` which has higher contrast against the deep green background.
- **`CoreIdea` light band** — gold on cream contrast is lower than gold on deep green; verify WCAG AA on `headlineGold` in Phase 4 a11y pass.
