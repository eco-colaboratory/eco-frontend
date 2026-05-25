# Phase 2: Layout Shell

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; `/admin/dashboard` renders the new shell

## Goal

Build the full template shell: context providers (`LayoutProvider`, `SearchProvider`), shared layout components (`AppSidebar`, `Header`, `Main`, `NavGroup`, `NavUser`), and `sidebar-data.ts` config — then **rewrite `admin/layout.tsx`** to the shell-only pattern (SidebarProvider + AppSidebar + SidebarInset, no Header/Main). The old `AdminSidebar` and `AdminHeader` are kept but no longer used by layout.

**Template reference:** §4 Admin shell, §5 Sidebar setup, §6 Header, §7 Main, §5.1 sidebar-data config

## Prerequisites

- Phase 1 complete: `components/ui/sidebar.tsx` and `components/ui/command.tsx` exist
- `AdminGuard` in `components/admin/admin-guard.tsx` must be preserved and wrapped around the shell
- **ThemeProvider:** Verify `ThemeProvider` from `next-themes` wraps the app in `app/layout.tsx` (`attribute="class"`). Add if absent — required before ThemeSwitch in Phase 3

> **Branch rule:** Complete Phase 3 in the **same branch/PR** as Phase 2. After Phase 2, layout has no Header/Main — pages will look broken until Phase 3 lands.

## Tasks

- [ ] Create `context/layout-provider.tsx` — provides `sidebarVariant` and `collapsibleMode` state (v1: **in-memory only**; localStorage persistence deferred to v2 to avoid hydration mismatch)
- [ ] Create `context/search-provider.tsx` — provides `open`/`setOpen` state for command palette trigger; v1 stub is sufficient (full cmdk wired in Phase 7)
- [ ] Create `components/layout/data/sidebar-data.ts` — translate `ADMIN_NAV_ITEMS` from `components/admin/admin-nav-config.ts` into `navGroups` array matching §5.1 format; one group "General" with all 6 routes (Dashboard, Users, Items, Decors, Synergies, Flower Templates) using existing icon imports
- [ ] Create `components/layout/nav-group.tsx` — renders a single nav group title + flat link items (S8); active via `pathname === url || pathname.startsWith(url + '/')` (avoid bare `startsWith(url)` so `/admin/users` does not match `/admin/user`); **no collapsible submenu in v1** (S9–S10 deferred to v2)
- [ ] Create `components/layout/nav-user.tsx` — SidebarFooter user avatar + name + email from auth state; dropdown with Sign Out action (wire to existing logout hook)
- [ ] Create `components/layout/app-sidebar.tsx` — assembles `SidebarHeader` (app title "Eco Admin"), `SidebarContent` (NavGroup × N from sidebar-data), `SidebarFooter` (NavUser), `SidebarRail`; style with **existing slate palette** (`slate-900` active, `slate-600` text) — not zinc/shadcn-admin default colors
- [ ] Create `components/layout/header.tsx` — accepts `fixed` prop; renders sticky header with backdrop blur on scroll; children slot for H2–H8 items; includes `SidebarTrigger` + `Separator` on the left as built-ins
- [ ] Create `components/layout/main.tsx` — wrapper with `px-4 py-6`; `fixed` prop → `flex grow flex-col overflow-hidden`; `fluid` prop → no max-width cap; default → `max-w-7xl`
- [ ] Create `components/skip-to-main.tsx` — accessible skip link pointing to `#content` (S15)
- [ ] Rewrite `app/(admin)/admin/layout.tsx` — wrap with `AdminGuard`; inside: `SearchProvider` → `LayoutProvider` → `SidebarProvider defaultOpen` → `SkipToMain` + `AppSidebar` + `SidebarInset @container/content` → `{children}`; **remove** `AdminSidebar`, `AdminHeader`, and the hardcoded `<main>` wrapper
- [ ] Preserve the `metadata` export in `layout.tsx` (title template `%s | Eco Admin`)

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `context/layout-provider.tsx` | Create | Sidebar variant/collapsible state (S16) |
| `context/search-provider.tsx` | Create | ⌘K open state (S17) — v1 stub |
| `components/layout/data/sidebar-data.ts` | Create | Nav config from ADMIN_NAV_ITEMS (§5.1) |
| `components/layout/nav-group.tsx` | Create | Nav group renderer with active + collapsible (S6–S10) |
| `components/layout/nav-user.tsx` | Create | SidebarFooter user info + logout (S12) |
| `components/layout/app-sidebar.tsx` | Create | Full sidebar assembly (S2–S14) |
| `components/layout/header.tsx` | Create | Header toolbar wrapper (H1–H2) |
| `components/layout/main.tsx` | Create | Content area wrapper (M1) |
| `components/skip-to-main.tsx` | Create | A11y skip link (S15) |
| `app/(admin)/admin/layout.tsx` | **Rewrite** | Shell-only: no Header/Main (§4) |

> **Do NOT delete yet:** `components/admin/admin-sidebar.tsx`, `components/admin/admin-header.tsx` — they will be deprecated in Phase 7 after all pages migrate.

## Manual Test Steps

1. Navigate to `/admin/dashboard` — confirm new AppSidebar renders with all 6 nav links
2. Click each nav link — confirm active state highlights correctly
3. Resize to mobile — confirm sidebar collapses to Sheet trigger
4. Confirm `AdminGuard` still redirects non-admin users (log in as Player; hit `/admin/dashboard`)
5. Confirm dashboard content still renders (even if unstyled, no `<Main>` wrapper yet — that's Phase 3)
6. Run `npm run build`

## Done Criteria

- `admin/layout.tsx` contains only `AdminGuard` + providers + `SidebarProvider` + `AppSidebar` + `SidebarInset{children}` — no `AdminSidebar`, no `AdminHeader`, no `<main>`
- `sidebar-data.ts` has all 6 routes matching `ADMIN_NAV_ITEMS` hrefs exactly
- Active nav link highlighted when visiting each route
- AdminGuard redirect still functions
- `npm run build` passes
