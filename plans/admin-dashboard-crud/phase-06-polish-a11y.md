# Phase 6: Polish & A11y

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`; manual keyboard + responsive pass)

## Goal

Harden the admin dashboard for production use: consistent loading/error/empty states across all pages, accessible dialogs and tables, responsive layout polish, and metadata for admin routes. No new features — quality pass only.

## Prerequisites

- Phases 1–5 complete (all admin pages functional)
- Sonner toast already in root layout

## Tasks

- [ ] Audit all admin pages for consistent patterns: skeleton loading, error boundary or inline error with retry, empty state with CTA
- [ ] Add `aria-label` to icon-only buttons (row actions, sidebar toggle, close dialogs)
- [ ] Verify dialog focus trap and `Escape` to close on all modals
- [ ] Ensure table headers use `<th scope="col">`; sortable columns have accessible names
- [ ] Add skip link or landmark regions (`<main>`, `nav`) in admin layout
- [ ] Responsive pass: sidebar sheet on mobile, table horizontal scroll on narrow viewports, pagination usable on touch
- [ ] Add page titles via `metadata` export on each admin page (e.g. "Users | Admin")
- [ ] Disable submit buttons during mutation pending state (prevent double-submit)
- [ ] Confirm 401 from API triggers existing logout flow (axios interceptor) with friendly message
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/layout.tsx` | Modify | Landmarks, skip link, metadata template |
| `app/(admin)/admin/dashboard/page.tsx` | Modify | Page metadata |
| `app/(admin)/admin/users/page.tsx` | Modify | Page metadata, error/empty polish |
| `app/(admin)/admin/items/page.tsx` | Modify | Page metadata, error/empty polish |
| `app/(admin)/admin/decors/page.tsx` | Modify | Page metadata, error/empty polish |
| `app/(admin)/admin/synergies/page.tsx` | Modify | Page metadata, error/empty polish |
| `app/(admin)/admin/flower-templates/page.tsx` | Modify | Page metadata, error/empty polish |
| `components/admin/admin-sidebar.tsx` | Modify | `aria-current="page"` on active link |
| `components/admin/admin-header.tsx` | Modify | Accessible breadcrumb (`nav aria-label`) |
| `components/admin/catalog/catalog-data-table.tsx` | Modify | Table a11y, horizontal scroll wrapper |
| `components/admin/catalog/catalog-form-dialog.tsx` | Modify | Focus management, pending disable |
| `components/admin/catalog/catalog-delete-dialog.tsx` | Modify | Focus on confirm button, destructive styling |
| `components/admin/users/users-table.tsx` | Modify | Table a11y |
| `components/admin/users/user-form-dialog.tsx` | Modify | Form labels, error announcements |
| `components/admin/shared/admin-empty-state.tsx` | Create | Reusable empty state component |
| `components/admin/shared/admin-error-state.tsx` | Create | Reusable error + retry component |
| `components/admin/shared/admin-table-skeleton.tsx` | Create | Reusable loading skeleton |

## Acceptance Criteria

- Every admin page has unique `<title>` in browser tab
- Tab through sidebar → header → table → row actions without focus traps (except inside open dialog)
- All dialogs: open focuses first field; close returns focus to trigger; Escape closes
- Empty lists show illustration/text + "Add" CTA (not blank page)
- Failed API fetch shows error message + "Retry" button that refetches query
- Double-clicking submit does not create duplicate records
- `npm run build` passes
- No new ESLint/a11y regressions on touched files

## Manual Test Steps

1. **Keyboard:** Tab through `/admin/users` — reach Edit action, open dialog, submit with Enter, close with Escape
2. **Screen reader spot-check:** Verify table headers announced; dialog title read on open
3. **Empty state:** Use entity with zero records (or mock) — empty state renders with add button
4. **Error state:** Stop backend or use invalid token — error UI appears with retry
5. **Mobile (375px):** Sidebar via sheet; table scrolls horizontally; pagination tappable
6. **Metadata:** Check browser tab titles on each admin route
7. Run `npm run build` → zero errors

## Out of Scope (v1 — note only)

- `POST /api/apiconfigs` (ApiConfigs admin UI)
- Server-side catalog pagination (unless backend adds query params mid-sprint)
- Bulk actions (multi-select delete)
- Audit log / activity history
