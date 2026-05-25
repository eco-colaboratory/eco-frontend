# Phase 1: Shell & RBAC

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`)

## Goal

Create the admin route group with a **neutral** (slate/default shadcn) persistent sidebar layout, navigation to all CRUD sections, and a dashboard landing page. Install missing shadcn shell components. **UI-first:** no API calls required in this phase — layout, routing, and simple placeholder list shells on entity pages.

## Prerequisites

- Middleware protects `/admin/*` for `ROLE_ADMIN` (already done)
- Admin login redirects to `/admin/dashboard` (already done)
- shadcn/ui initialized in project (table, dialog, form exist)

## Tasks

- [ ] Install shadcn components: `sidebar`, `sheet`, `dropdown-menu`, `breadcrumb`, `pagination`, `separator`, `scroll-area`
- [ ] Create `app/(admin)/admin/layout.tsx` with `SidebarProvider`, collapsible sidebar, header with breadcrumb slot
- [ ] Create `components/admin/admin-sidebar.tsx` — nav links: Dashboard, Users, Items, Decors, Synergies, Flower Templates
- [ ] Create `components/admin/admin-header.tsx` — breadcrumb from pathname, user menu (logout via existing auth)
- [ ] Create `app/(admin)/admin/dashboard/page.tsx` — welcome card + quick links to each section
- [ ] Create **simple placeholder pages** for: `users`, `items`, `decors`, `synergies`, `flower-templates` — each with page title, "Add" button stub, empty table skeleton, and pagination footer stub (no live API)
- [ ] Apply neutral theme: `bg-background`, default shadcn tokens — do not reuse Cham Bloom landing gradients/fonts
- [ ] Export admin components from `components/admin/index.ts`
- [ ] Verify mobile: sidebar collapses to sheet on small viewports
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `components/ui/sidebar.tsx` | Create (shadcn) | Sidebar shell |
| `components/ui/sheet.tsx` | Create (shadcn) | Mobile sidebar drawer |
| `components/ui/dropdown-menu.tsx` | Create (shadcn) | User menu |
| `components/ui/breadcrumb.tsx` | Create (shadcn) | Route breadcrumbs |
| `components/ui/pagination.tsx` | Create (shadcn) | Used in Phase 3+ |
| `components/ui/separator.tsx` | Create (shadcn) | Layout dividers |
| `components/ui/scroll-area.tsx` | Create (shadcn) | Scrollable sidebar nav |
| `app/(admin)/admin/layout.tsx` | Create | Admin shell wrapping all `/admin/*` pages |
| `app/(admin)/admin/dashboard/page.tsx` | Create | Landing after login |
| `app/(admin)/admin/users/page.tsx` | Create | Placeholder |
| `app/(admin)/admin/items/page.tsx` | Create | Placeholder |
| `app/(admin)/admin/decors/page.tsx` | Create | Placeholder |
| `app/(admin)/admin/synergies/page.tsx` | Create | Placeholder |
| `app/(admin)/admin/flower-templates/page.tsx` | Create | Placeholder |
| `components/admin/admin-sidebar.tsx` | Create | Navigation + active state |
| `components/admin/admin-header.tsx` | Create | Breadcrumb + logout dropdown |
| `components/admin/admin-nav-config.ts` | Create | Nav item definitions (label, href, icon) |
| `components/admin/index.ts` | Create | Barrel exports |

## Acceptance Criteria

- Navigating to `/admin/dashboard` as Admin renders sidebar + header + dashboard content
- All nav links route to correct paths without 404
- Non-admin user hitting `/admin/dashboard` is redirected by middleware (not layout crash)
- Sidebar shows active state for current route
- Logout from header clears session and redirects to `/login`
- `npm run build` passes

## Manual Test Steps

1. Log in with Admin credentials → confirm redirect to `/admin/dashboard`
2. Click each sidebar link → confirm URL and placeholder page renders
3. Resize to mobile width → sidebar opens via sheet trigger
4. Log out from header dropdown → confirm redirect to `/login`
5. Log in as non-admin (**Student** account) → confirm `/admin/dashboard` redirects to `/courses` (or login if unauthenticated). Optional: Player JWT redirects to `/` per middleware
6. Run `npm run build` → zero errors
