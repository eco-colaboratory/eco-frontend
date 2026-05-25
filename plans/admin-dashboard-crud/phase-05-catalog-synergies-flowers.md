# Phase 5: Catalog — Synergies & Flower Templates

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`; manual CRUD against live API)

## Goal

Complete catalog admin coverage for **Synergies** and **FlowerTemplates** — same **simple** pattern as Phase 4 (minimal table, dialogs, **server-side pagination**). Wire API incrementally per product UI-first decision.

## Prerequisites

- Phase 4 complete (shared catalog UI components proven with Items + Decors)
- Phase 2 complete (`fetchSynergies`, `fetchFlowerTemplates`, types)

## Tasks

- [ ] Create `lib/admin/catalog/entities/synergies.config.ts` — columns, form fields, zod schema
- [ ] Create `lib/admin/catalog/entities/flower-templates.config.ts` — columns, form fields, zod schema
- [ ] Wire `app/(admin)/admin/synergies/page.tsx` using catalog page + synergies config
- [ ] Wire `app/(admin)/admin/flower-templates/page.tsx` using catalog page + flower-templates config
- [ ] Synergy `itemIds`: **multi-select** populated from `GET /api/items` (required); zod validates non-empty UUIDs/ids — no raw JSON text fallback in v1
- [ ] Verify all four catalog entities appear in sidebar and dashboard quick links
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/synergies/page.tsx` | Modify | Synergies CRUD page |
| `app/(admin)/admin/flower-templates/page.tsx` | Modify | Flower templates CRUD page |
| `lib/admin/catalog/entities/synergies.config.ts` | Create | Synergies entity config |
| `lib/admin/catalog/entities/flower-templates.config.ts` | Create | FlowerTemplates entity config |
| `lib/admin/catalog/catalog-config.ts` | Modify | Register synergies + flower-templates |
| `app/(admin)/admin/dashboard/page.tsx` | Modify | Ensure quick links include all 4 catalog + users |

### Synergies — Columns & Form Fields

**Table columns:** name, bonusMultiplier, item count (derived from `itemIds?.length`), createdAt, actions

**Form fields (confirm with backend DTO):**
- `name` (required)
- `description` (textarea, optional)
- `bonusMultiplier` (number, optional)
- `itemIds` (multi-select of Items — fetch from `GET /api/items` for options; confirm relation shape)

### Flower Templates — Columns & Form Fields

**Table columns:** name, petalCount, createdAt, actions

**Form fields (confirm with backend DTO):**
- `name` (required)
- `description` (textarea, optional)
- `petalCount` (number, optional)
- `colorPalette` (comma-separated or tag input → string[], optional)
- `imageUrl` (url, optional)

### API Endpoints

| Entity | GET list | POST | PUT | DELETE |
|--------|----------|------|-----|--------|
| Synergies | `/api/synergies` | `/api/synergies` | `/api/synergies/{id}` | `/api/synergies/{id}` |
| FlowerTemplates | `/api/flowertemplates` | `/api/flowertemplates` | `/api/flowertemplates/{id}` | `/api/flowertemplates/{id}` |

## Acceptance Criteria

- `/admin/synergies` and `/admin/flower-templates` have working UI shell + **server-side pagination**; CRUD wired when API shapes known
- Reuses Phase 4 catalog components without forking table/dialog logic
- Synergy `itemIds` field works with backend (multi-select or documented fallback)
- Dashboard quick links navigate to all 6 admin sections (dashboard, users, 4 catalog)
- All catalog mutations invalidate React Query cache and show toasts
- `npm run build` passes

## Manual Test Steps

1. Open `/admin/synergies` → list loads
2. Create synergy with name + optional itemIds → success
3. Edit synergy bonusMultiplier → persists
4. Delete synergy → removed from list
5. Open `/admin/flower-templates` → repeat create/edit/delete cycle
6. From dashboard, click each quick link → correct page loads
7. Run `npm run build` → zero errors
