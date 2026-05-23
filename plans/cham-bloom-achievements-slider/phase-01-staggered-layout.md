# Phase 1: Staggered 3-card layout + slot rotation

## Requirements

Replace the current `grid grid-cols-1 sm:grid-cols-2` (3 items → broken 2+1) with a **showcase slider** layout aligned to the provided mockup:

| Slot | Visual role (when active) | Approx. placement |
|------|---------------------------|-------------------|
| **Hero** | Largest card, green ring, "Đang xem" badge | Top-left, ~55–60% width |
| **Peek A** | Medium, partial overlap right | Top-right, ~38–42% width, slightly higher |
| **Peek B** | Medium | Below hero, left-aligned, ~45–50% width |

When `activeIndex` changes, **rotate which slide occupies which slot** — do not only restyle in place; the active image should move to the hero slot.

## Implementation steps

1. **Add helper** (inline in file, no new module):

   ```ts
   function getSlot(index: number, activeIndex: number): 'hero' | 'peek-a' | 'peek-b' {
     const offset = (index - activeIndex + SLIDES.length) % SLIDES.length
     return offset === 0 ? 'hero' : offset === 1 ? 'peek-a' : 'peek-b'
   }
   ```

2. **Replace right-column grid** with:

   ```tsx
   <div className="relative w-full min-h-[380px] sm:min-h-[420px] md:min-h-[460px] px-2 sm:px-4">
     {SLIDES.map((slide, index) => {
       const slot = getSlot(index, activeIndex)
       // className maps slot → absolute position + size + z-index
     })}
   </div>
   ```

3. **Slot → Tailwind map** (tune against mockup):

   - `hero`: `absolute left-0 top-0 w-[58%] z-20 aspect-[16/10]`
   - `peek-a`: `absolute right-0 top-2 w-[40%] z-10 aspect-[4/3]`
   - `peek-b`: `absolute left-4 bottom-0 w-[48%] z-10 aspect-[16/10]`

4. **Active vs inactive styles** (apply when `slot === 'hero'`):

   - Active: `ring-4 ring-bloom-green-mid ring-offset-2 opacity-100 scale-100`
   - Inactive: `opacity-55 hover:opacity-80 scale-[0.97] border-white/30` (no ring)

5. **Preserve** existing overlay gradient, bottom caption (`value` + `label`), `Image` `fill` + `object-cover`.

6. **Click handler** on each card: `setActiveIndex(index)` (unchanged).

## Files

| File | Action |
|------|--------|
| `app/(landing)/_components/cham-bloom/achievements-section.tsx` | Edit right column only |

## Success criteria

- [ ] Three cards visible on `md+` without third card wrapping to a lonely row
- [ ] Changing slide moves the large card to the clicked/active item
- [ ] Left column behavior unchanged

## Architecture notes

- Container `relative` + children `absolute` avoids CSS Grid column count mismatch with 3 items.
- `z-index`: hero > peek cards; hover on peek raises z-index slightly optional.
