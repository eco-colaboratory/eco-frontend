# Phase 3: Route Scaffold

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; all 6 routes render with Header+Main composition

## Goal

Give every admin route the template's `page.tsx` (thin shell) + `components/*-page.tsx` (composition root) pattern. Each `*-page.tsx` mounts a `<Header>` with `ThemeSwitch` + `ProfileDropdown` and a `<Main>` wrapping existing page content. This phase does **not** change any CRUD logic — it only moves the composition boundary from layout to each route's page component.

> **Dashboard quick links:** `ADMIN_QUICK_LINKS` on the current dashboard placeholder is **intentionally removed** here; Phase 6 replaces it with KPI cards + chart tabs per template §8.1.

**Template reference:** §1.1 folder tree, §2.2 page-local files, §2.3 page.tsx pattern, §6 Header, §7 Main, §8.2 Recipe B

## Prerequisites

- Phase 2 complete: `components/layout/header.tsx`, `components/layout/main.tsx`, and new `admin/layout.tsx` shell are in place
- `ThemeSwitch` and `ProfileDropdown` components must exist — create stubs if absent (full wiring in Phase 7)

## Tasks

- [ ] Create stub `components/theme-switch.tsx` if absent — v1: simple dark/light toggle using `next-themes`; full config-drawer version is Phase 7
- [ ] Create stub `components/profile-dropdown.tsx` if absent — v1: avatar + display name + Sign Out link (wire to existing logout); full settings menu is Phase 7
- [ ] For **each of the 6 routes** (`dashboard`, `users`, `items`, `decors`, `flower-templates`, `synergies`), create `app/(admin)/admin/<route>/components/<route>-page.tsx` that:
  - Is `'use client'` if it contains state or hooks
  - Renders `<Header fixed>` with `<ThemeSwitch />` and `<ProfileDropdown />` on the right
  - Renders `<Main>` wrapping the existing content (moved from the old page.tsx or component)
  - For routes that already have a heavy client component (e.g. `UsersPageClient`), simply call it inside `<Main>`
- [ ] Rewrite each `app/(admin)/admin/<route>/page.tsx` to thin wrapper: import the `*-page.tsx` component and default-export it (§2.3 pattern)
- [ ] Preserve all `metadata` exports on `page.tsx` files (title strings)
- [ ] Preserve `Suspense` fallback wrappers where they exist (e.g. users uses `AdminTableSkeleton`)

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `components/theme-switch.tsx` | Create (stub) | Dark/light toggle for header (H6) |
| `components/profile-dropdown.tsx` | Create (stub) | Avatar + logout dropdown (H8) |
| `app/(admin)/admin/dashboard/components/dashboard-page.tsx` | Create | Composition root for dashboard |
| `app/(admin)/admin/users/components/users-page.tsx` | Create | Composition root wrapping UsersPageClient |
| `app/(admin)/admin/items/components/items-page.tsx` | Create | Composition root for items |
| `app/(admin)/admin/decors/components/decors-page.tsx` | Create | Composition root for decors |
| `app/(admin)/admin/flower-templates/components/flower-templates-page.tsx` | Create | Composition root |
| `app/(admin)/admin/synergies/components/synergies-page.tsx` | Create | Composition root |
| `app/(admin)/admin/dashboard/page.tsx` | Rewrite thin | Import DashboardPage |
| `app/(admin)/admin/users/page.tsx` | Rewrite thin | Import UsersPage (keep Suspense) |
| `app/(admin)/admin/items/page.tsx` | Rewrite thin | Import ItemsPage |
| `app/(admin)/admin/decors/page.tsx` | Rewrite thin | Import DecorsPage |
| `app/(admin)/admin/flower-templates/page.tsx` | Rewrite thin | Import FlowerTemplatesPage |
| `app/(admin)/admin/synergies/page.tsx` | Rewrite thin | Import SynergiesPage |

> **Do NOT touch yet:** `components/admin/users/users-page-client.tsx`, `components/admin/catalog/*` — their migration is Phases 4–5.

## Manual Test Steps

1. Visit each route (`/admin/dashboard`, `/admin/users`, `/admin/items`, `/admin/decors`, `/admin/flower-templates`, `/admin/synergies`) — confirm Header renders at top with ThemeSwitch + ProfileDropdown
2. Confirm existing CRUD content (tables, dialogs) still renders beneath the header
3. Confirm `fixed` Header sticks on scroll for a long list page
4. Toggle dark mode via ThemeSwitch — confirm root changes theme class
5. Click ProfileDropdown Sign Out — confirm logout and redirect to `/login`
6. Run `npm run build`

## Done Criteria

- All 6 `page.tsx` files are thin (import one component, default export)
- All 6 `*-page.tsx` composition roots exist and wrap `<Header>` + `<Main>`
- No `AdminHeader` or `AdminSidebar` references remain in any `page.tsx` or `*-page.tsx`
- ThemeSwitch and ProfileDropdown render in every route header
- Existing CRUD functionality unchanged (users CRUD, catalog CRUD still works)
- `npm run build` passes
