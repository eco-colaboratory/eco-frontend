# Phase 4: Users Migration

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; Users CRUD fully functional via route-local components

## Goal

Move all users UI from `components/admin/users/*` into `app/(admin)/admin/users/components/` following the template's page-local pattern (§8.2 Recipe B). The existing `useUsersList`, `useCreateUser`, `useUpdateUser`, `useBanUser`, `useUnbanUser` hooks and all API services are **never touched** — only the presentation layer moves. A **bridge approach** is used: the existing `<table>` + `AdminPagination` UI is kept working; the full TanStack DataTable shared kit (`components/data-table/*` with Toolbar, FacetedFilter, BulkActions, etc.) is explicitly **v2 scope** with a documented upgrade path.

**Template reference:** §2.2 page-local files, §8.2 Recipe B, §9 Data Table, §10 Dialogs/Provider pattern

## Prerequisites

- Phase 3 complete: `users-page.tsx` composition root exists and renders inside `<Header>` + `<Main>`
- All hooks in `hooks/admin/useUsers.ts` intact

## v1 Bridge vs v2 DataTable Kit

| Concern | v1 (this phase) | v2 (future) |
|---------|----------------|-------------|
| Table rendering | Bridge: keep existing `<Table>` + shadcn primitives | Full `components/data-table/*` shared kit |
| Column definitions | Inline in `users-table.tsx` (no separate `-columns.tsx` needed) | Extract to `users-columns.tsx` with `ColumnDef[]` |
| Toolbar | Simple search input only | `DataTableToolbar` with FacetedFilter |
| Pagination | Bridge: `AdminPagination` adapted to route-local | `DataTablePagination` with TanStack |
| Bulk actions | Not implemented | `DataTableBulkActions` bulk delete |
| URL sync | `useSearchParams` pattern (existing) | `nuqs` for `page`/`filter`/`sort` |

## Tasks

- [ ] Copy `components/admin/users/user-schema.ts` → `app/(admin)/admin/users/components/user-schema.ts` and update imports in drawer/form components (keep Zod types co-located with route)
- [ ] Create `app/(admin)/admin/users/components/users-provider.tsx` — `UsersContext` with `open` state (`'create' | 'update' | 'delete' | null`) and `currentUser` row; follows §10.1 Provider pattern
- [ ] Create `app/(admin)/admin/users/components/users-primary-buttons.tsx` — "Create User" button that calls `setOpen('create')` from `UsersContext`; matches §2.2 F8 pattern
- [ ] Create `app/(admin)/admin/users/components/users-table.tsx` — render existing `<Table>` structure with columns from inline definition; wire to `useUsersList`; include pagination via adapted `AdminPagination`; wrap with v1 bridge comment noting v2 upgrade path
- [ ] Create `app/(admin)/admin/users/components/users-mutate-drawer.tsx` — `<Sheet>` with `UserFormDialog` content migrated inside; handles both create and update modes; wire to `useCreateUser` / `useUpdateUser`; toast on success
- [ ] Create `app/(admin)/admin/users/components/users-dialogs.tsx` — aggregator rendering `UsersMutateDrawer` + delete `AlertDialog` + ban `AlertDialog`; controlled by `UsersContext`
- [ ] Update `app/(admin)/admin/users/components/users-page.tsx` (from Phase 3) — wrap with `<UsersProvider>`, add `<UsersPrimaryButtons />` to page heading block, render `<UsersTable />` inside `<Main>`, mount `<UsersDialogs />` outside Main
- [ ] Adapt ban/unban logic — move `UserBanDialog` content into `users-dialogs.tsx` ban confirmation; wire `useBanUser` / `useUnbanUser` hooks
- [ ] Add safety guard: self-ban disabled for the logged-in admin row (already exists — verify preserved)
- [ ] Verify `components/admin/users/*` files are no longer imported by any route (they remain on disk for Phase 7 cleanup)
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/users/components/users-provider.tsx` | Create | Dialog open state context (F9) |
| `app/(admin)/admin/users/components/users-primary-buttons.tsx` | Create | Create User button (F8) |
| `app/(admin)/admin/users/components/users-table.tsx` | Create | Bridge table: existing UI + useUsersList |
| `app/(admin)/admin/users/components/users-mutate-drawer.tsx` | Create | Sheet create/edit form (F1) |
| `app/(admin)/admin/users/components/users-dialogs.tsx` | Create | Aggregates drawer + delete + ban alerts (F10) |
| `app/(admin)/admin/users/components/users-page.tsx` | Modify | Add UsersProvider, primary buttons, dialogs |

> **Keep (do not delete yet):** `components/admin/users/*` — Phase 7 removes them after confirming zero imports.

## v2 Upgrade Path Note

When upgrading to full TanStack DataTable kit:
1. Create `components/data-table/toolbar.tsx`, `faceted-filter.tsx`, `pagination.tsx`, `bulk-actions.tsx`, `column-header.tsx`, `view-options.tsx`
2. Extract `users-columns.tsx` with `ColumnDef[]` using `useReactTable` per §9.1–9.4
3. Replace `users-table.tsx` internals only (provider + page stay unchanged)
4. Add `nuqs` for URL sync on `page`/`filter`/`sort`

## Manual Test Steps

1. `/admin/users` — list loads, rows visible, pagination works
2. Click "Create User" button — Sheet opens with form
3. Fill form and submit — toast success, list refreshes
4. Click row edit action — Sheet opens pre-filled; submit updates row
5. Click row delete — AlertDialog confirms; list refreshes after confirm
6. Click ban action on non-self row — confirm dialog; row shows banned state after
7. Confirm ban button is disabled on own admin row
8. Run `npm run build`

## Done Criteria

- All users CRUD (create, edit, delete, ban/unban) functions identically to pre-migration
- `UsersProvider` wraps `users-page.tsx`; `UsersDialogs` mounts outside `<Main>`
- `UsersTable` uses existing `useUsersList` hook — no API calls changed
- No import of `components/admin/users/*` remains in any route file
- `npm run build` passes
