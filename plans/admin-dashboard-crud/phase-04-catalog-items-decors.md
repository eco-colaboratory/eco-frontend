# Phase 4: Catalog — Items & Decors

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`; manual CRUD against live API)

## Goal

Implement **simple** admin CRUD pages for **Items** and **Decors**: minimal table + create/edit dialog + delete confirm. **Server-side pagination** on list (`page`, `pageSize`). Shared table shell OK; **per-entity** forms/columns. UI-first: wire API incrementally; table may show skeleton/empty until GET shape confirmed.

## Prerequisites

- Phase 1 complete (routes `/admin/items`, `/admin/decors`)
- Phase 2 complete (catalog factory, `fetchItems`, `fetchDecors`, types)

## Tasks

- [ ] Create shared `components/admin/catalog/catalog-page.tsx` — reusable page shell: title, "Add" button, table slot, loading/error
- [ ] Create `components/admin/catalog/catalog-data-table.tsx` — generic table driven by column config
- [ ] Create `components/admin/catalog/catalog-form-dialog.tsx` — generic create/edit dialog driven by field config
- [ ] Create `components/admin/catalog/catalog-delete-dialog.tsx` — delete confirmation (soft delete per API)
- [ ] Create `components/admin/catalog/catalog-row-actions.tsx` — Edit + Delete dropdown
- [ ] Create entity configs: `lib/admin/catalog/entities/items.config.ts`, `decors.config.ts` (columns, fields, zod schema)
- [ ] Wire `app/(admin)/admin/items/page.tsx` using catalog page + items config
- [ ] Wire `app/(admin)/admin/decors/page.tsx` using catalog page + decors config
- [ ] Toast + query invalidation on all mutations
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/items/page.tsx` | Modify | Items CRUD page |
| `app/(admin)/admin/decors/page.tsx` | Modify | Decors CRUD page |
| `components/admin/catalog/catalog-page.tsx` | Create | Shared page layout |
| `components/admin/catalog/catalog-data-table.tsx` | Create | Generic data table |
| `components/admin/catalog/catalog-form-dialog.tsx` | Create | Generic form dialog |
| `components/admin/catalog/catalog-delete-dialog.tsx` | Create | Delete confirmation |
| `components/admin/catalog/catalog-row-actions.tsx` | Create | Row actions |
| `components/admin/catalog/index.ts` | Create | Exports |
| `lib/admin/catalog/entities/items.config.ts` | Create | Items columns + form fields |
| `lib/admin/catalog/entities/decors.config.ts` | Create | Decors columns + form fields |

### Items — Columns & Form Fields

**Table columns:** name, price (formatted), isActive (badge), createdAt (formatted), actions

**Form fields (confirm with backend DTO):**
- `name` (required)
- `description` (textarea, optional)
- `price` (number, optional)
- `imageUrl` (url, optional)

### Decors — Columns & Form Fields

**Table columns:** name, category, createdAt, actions

**Form fields (confirm with backend DTO):**
- `name` (required)
- `description` (textarea, optional)
- `category` (text or select, optional)
- `imageUrl` (url, optional)

### API Endpoints

| Entity | GET list | GET by id | POST | PUT | DELETE |
|--------|----------|-----------|------|-----|--------|
| Items | `/api/items` | `/api/items/{id}` | `/api/items` | `/api/items/{id}` | `/api/items/{id}` |
| Decors | `/api/decors` | `/api/decors/{id}` | `/api/decors` | `/api/decors/{id}` | `/api/decors/{id}` |

## Acceptance Criteria

- `/admin/items` and `/admin/decors` use **server-side pagination** (`page`, `pageSize` on GET); changing page fetches new data
- List loads from public GET when wired; admin mutations work with bearer token when wired
- Create opens dialog → POST → list refreshes
- Edit pre-fills form → PUT → row updates
- Delete shows confirmation → DELETE → row removed from list
- Shared catalog components used by both pages (no duplicated CRUD logic)
- `npm run build` passes

## Manual Test Steps

1. Open `/admin/items` → list loads (may be empty)
2. Create item with name only → success toast + row appears
3. Edit item description → persists after page refresh
4. Delete item → confirmation → row gone
5. Repeat steps 1–4 for `/admin/decors`
6. Test without admin token (logged out) → middleware blocks access
7. Run `npm run build` → zero errors
