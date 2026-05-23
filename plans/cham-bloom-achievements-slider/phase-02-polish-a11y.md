# Phase 2: Polish, accessibility, responsive

## Requirements

### Mobile (`< md`)

- Do **not** use triple absolute overlap (unreadable on narrow screens).
- Pattern:
  - **Primary:** full-width active card `aspect-[16/10]`
  - **Thumbnails:** row of 3 small cards (`aspect-video`, `rounded-2xl`) under hero; active thumb gets ring
- Arrows remain in left column (or duplicate under hero if UX testing shows need — prefer left only).

### Accessibility

- Wrap image group: `role="region"` `aria-roledescription="carousel"` `aria-label="Thành tích nổi bật"`
- Active card: `aria-current="true"` on button/card
- Announce slide change: `aria-live="polite"` region with `{activeSlide.label}` (visually hidden)
- Buttons: keep `aria-label="Slide trước"` / `"Slide tiếp theo"`
- Thumbnails: `aria-label={`Xem ${slide.label}`}`

### Motion

```tsx
@media (prefers-reduced-motion: reduce) {
  // transition-none on cards, keep instant index swap
}
```
Use Tailwind: `motion-reduce:transition-none motion-reduce:transform-none`

### Visual polish

- Match mockup: rounded `[2rem]`–`[2.2rem]`, shadow `shadow-lg shadow-bloom-green-deep/15`
- Ensure ring-offset not clipped: parent `overflow-visible`, section padding unchanged
- Optional: slide index dots `1 · 2 · 3` under arrows (low priority)

## Verification

1. Manual: desktop 1280px, 1024px, mobile 390px — compare to mockup PNG in workspace assets
2. Run smoke test if dev server available:
   ```bash
   npx playwright test e2e/cham-bloom-smoke.spec.ts
   ```
3. Quick keyboard: Tab to arrows, Enter triggers prev/next

## Files

| File | Action |
|------|--------|
| `achievements-section.tsx` | Mobile branch + a11y attrs |
| `e2e/screenshots/cham-bloom-*.png` | Update if intentional visual change (commit with feature) |

## Success criteria

- [ ] Mobile shows 1 hero + 3 thumbs, no overlapping clutter
- [ ] `prefers-reduced-motion` disables scale/opacity transitions
- [ ] Carousel region passes basic screen-reader semantics
- [ ] Desktop layout matches staggered mockup within reasonable tolerance
