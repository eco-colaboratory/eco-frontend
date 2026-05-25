# Phase 5: Catalog Migration

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; all 4 catalog routes CRUD functional via route-local components

## Goal

Move catalog entity UIs from `components/admin/catalog/*` into their respective `app/(admin)/admin/<entity>/components/` folders, following the same route-local pattern established in Phase 4. The 4 entities are: **items**, **decors**, **flower-templates**, **synergies**. All hooks in `hooks/admin/*` and API services in `lib/admin/*` are untouched. The `CatalogCrudPage` and `CatalogAdminPage` shared patterns are decomposed into per-entity files.

**Template reference:** §2.2 page-local files, §8.2 Recipe B (list/CRUD), §8.4 Recipe D (simple form-only), §10 Provider + Dialogs pattern

## Prerequisites

- Phase 3 complete: each catalog route has a `*-page.tsx` composition root with `<Header>` + `<Main>`
- Phase 4 complete: users migration pattern established and verified
- Hooks available: `hooks/admin/useItems.ts`, `useDecors.ts`, `useFlowerTemplates.ts`, `useSynergies.ts` (or generic catalog hook)
- **Synergies recipe (blocking):** Read `components/admin/catalog/synergies-admin-page.tsx` before coding — record whether it uses list+CRUD (Recipe B) or card-only (Recipe D) in this phase file's checklist, then implement matching components

## Per-Entity Task Groups

### Items (`app/(admin)/admin/items/components/`)

- [ ] Create `items-provider.tsx` — context for `open` state and `currentItem` row
- [ ] Create `items-primary-buttons.tsx` — "Create Item" button
- [ ] Create `items-table.tsx` — bridge table using existing items list hook; inline columns
- [ ] Create `items-mutate-drawer.tsx` — Sheet form for create/edit with item fields
- [ ] Create `items-dialogs.tsx` — aggregator: drawer + delete AlertDialog
- [ ] Update `items-page.tsx` — wrap with `<ItemsProvider>`, heading + `<ItemsPrimaryButtons>`, table, dialogs

### Decors (`app/(admin)/admin/decors/components/`)

- [ ] Create `decors-provider.tsx`, `decors-primary-buttons.tsx`, `decors-table.tsx`, `decors-mutate-drawer.tsx`, `decors-dialogs.tsx`
- [ ] Update `decors-page.tsx` — same pattern as items

### Flower Templates (`app/(admin)/admin/flower-templates/components/`)

- [ ] Create `flower-templates-provider.tsx`, `flower-templates-primary-buttons.tsx`, `flower-templates-table.tsx`, `flower-templates-mutate-drawer.tsx`, `flower-templates-dialogs.tsx`
- [ ] Update `flower-templates-page.tsx` — same pattern

### Synergies (`app/(admin)/admin/synergies/components/`)

- [ ] Assess if synergies has list + CRUD or is simpler — if list exists, use Recipe B (Provider + Table + Dialogs); if config-only, use Recipe D (Header + Main + Card content only, no table)
- [ ] Create appropriate component set per recipe
- [ ] Update `synergies-page.tsx`

### Shared Cleanup

- [ ] After all 4 entities migrate, verify `components/admin/catalog/*` is no longer imported anywhere in route files
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/items/components/items-provider.tsx` | Create | Context (F9) |
| `app/(admin)/admin/items/components/items-primary-buttons.tsx` | Create | Create button (F8) |
| `app/(admin)/admin/items/components/items-table.tsx` | Create | Bridge table |
| `app/(admin)/admin/items/components/items-mutate-drawer.tsx` | Create | Sheet form (F1) |
| `app/(admin)/admin/items/components/items-dialogs.tsx` | Create | Aggregator (F10) |
| `app/(admin)/admin/items/components/items-page.tsx` | Modify | Add provider + buttons + dialogs |
| `app/(admin)/admin/decors/components/decors-*.tsx` | Create (5 files) | Same pattern |
| `app/(admin)/admin/decors/components/decors-page.tsx` | Modify | Same pattern |
| `app/(admin)/admin/flower-templates/components/flower-templates-*.tsx` | Create (5 files) | Same pattern |
| `app/(admin)/admin/flower-templates/components/flower-templates-page.tsx` | Modify | Same pattern |
| `app/(admin)/admin/synergies/components/synergies-*.tsx` | Create (3–5 files) | Recipe B or D per assessment |
| `app/(admin)/admin/synergies/components/synergies-page.tsx` | Modify | Same pattern |

> **Keep (do not delete yet):** `components/admin/catalog/*` — Phase 7 removes them.

## Manual Test Steps

1. `/admin/items` — list renders; Create button opens Sheet; submit creates item; edit opens pre-filled; delete confirms
2. `/admin/decors` — same CRUD smoke test
3. `/admin/flower-templates` — same CRUD smoke test
4. `/admin/synergies` — renders correctly (table or card per recipe assessed)
5. All 4 routes: toast success after create/edit/delete
6. Run `npm run build`

## Done Criteria

- All 4 catalog entities have route-local `components/` with Provider + Table + Drawer + Dialogs pattern (or Recipe D for synergies if list-free)
- All existing create/edit/delete mutations work identically to pre-migration
- No import of `components/admin/catalog/*` in any route file
- `npm run build` passes
