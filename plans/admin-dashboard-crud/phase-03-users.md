# Phase 3: Users

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`; manual CRUD against live API)

## Goal

Replace the users placeholder with a full admin user management page: paginated table, create/edit dialog, ban/unban actions. Uses dedicated `fetchUsers` + custom React Query hooks (not the catalog factory).

## Prerequisites

- Phase 1 complete (shell + `/admin/users` route)
- Phase 2 complete (`fetchUsers.ts`, `AdminUser` types, pagination types)

## Tasks

- [ ] Create `hooks/admin/useUsers.ts` — `useUsersList(params)`, `useCreateUser`, `useUpdateUser`, `useBanUser`, `useUnbanUser`
- [ ] Create `components/admin/users/users-table.tsx` — `@tanstack/react-table` with columns: username, email, role, status (banned), actions
- [ ] Create `components/admin/users/user-form-dialog.tsx` — create/edit form with react-hook-form + zod schema
- [ ] Create `components/admin/users/user-ban-dialog.tsx` — confirm ban/unban with reason optional
- [ ] Create `components/admin/users/user-row-actions.tsx` — dropdown: Edit, Ban/Unban
- [ ] Wire `app/(admin)/admin/users/page.tsx` — table + pagination controls + "Add user" button
- [ ] Handle loading (skeleton), empty state, and API error display
- [ ] Toast on success/error for all mutations
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/users/page.tsx` | Modify | Full users page (replace placeholder) |
| `hooks/admin/useUsers.ts` | Create | React Query hooks for user CRUD |
| `components/admin/users/users-table.tsx` | Create | Data table |
| `components/admin/users/user-form-dialog.tsx` | Create | Create/edit modal |
| `components/admin/users/user-ban-dialog.tsx` | Create | Ban/unban confirmation |
| `components/admin/users/user-row-actions.tsx` | Create | Row action menu |
| `components/admin/users/user-schema.ts` | Create | Zod validation for form |
| `components/admin/users/index.ts` | Create | Exports |

### Form Fields (confirm with backend DTO)

**Create:**
- `username` (required)
- `password` (required on create only)
- `email` (optional)
- `firstName`, `lastName` (optional)
- `role` (select — all roles backend supports, including `Admin` / `SuperAdmin` / `Player`; confirm enum from API probe)

**Edit:**
- Same minus password (unless backend supports password reset via PUT)

**Ban/Unban:**
- No body required per API doc; optional confirmation dialog only

### Pagination

- Server-side pagination via `GET /api/user?page=&pageSize=` (confirm param names in Phase 2 probe)
- shadcn `Pagination` component at table footer
- Page state in URL search params (`?page=1`) optional but recommended for shareable links

## Acceptance Criteria

- Users page loads paginated list from `GET /api/user`
- "Add user" opens dialog → POST succeeds → table refreshes → success toast
- Edit row → PUT succeeds → row updates
- Ban toggles `POST .../ban`; Unban toggles `POST .../unban`; banned status visible in table
- **Self-actions:** Ban/Unban disabled for the logged-in admin's own user row (match `user.id` from JWT/Redux)
- **Roles:** Create/edit may assign any role (including Admin/SuperAdmin) per product decision
- API errors show toast with `message` from response (including `isSuccess: false` via unwrap helper); until API wired, UI may use placeholder data without blocking layout work
- Loading skeleton while fetching; empty state when no users
- `npm run build` passes

## Manual Test Steps

1. Navigate to `/admin/users` as Admin → table loads with data
2. Change pagination page → new data loads
3. Create a test user → appears in list
4. Edit user username → change persists after refresh
5. Ban user → status column shows banned; unban restores
6. Log out → `/admin/users` redirects to login
7. Run `npm run build` → zero errors
