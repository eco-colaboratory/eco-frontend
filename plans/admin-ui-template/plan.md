# Plan: Admin UI Template Restructure

Status: ✅ Complete  
Date: 2026-05-25  
Mode: Hard  
Test: `npm run build` + manual admin smoke with Admin JWT  
Slug: `admin-ui-template`  
Predecessor: [plans/admin-dashboard-crud](../admin-dashboard-crud/plan.md) — Status: Complete

## Product decisions (validated 2026-05-25)

| # | Topic | Decision |
|---|--------|----------|
| 1 | DataTable kit | **v1 bridge** — keep existing table + `AdminPagination`; full TanStack `components/data-table/*` in **v2** |
| 2 | shadcn bootstrap | Run **`npx shadcn@latest init`**; backup + manual merge `globals.css` (do not overwrite project tokens) |
| 3 | Color theme | **Keep current slate/neutral admin palette** — do not switch to shadcn zinc default; sidebar/header use existing `slate-*` / CSS vars, not template zinc reskin |
| 4 | Dashboard charts | **Placeholder/mock data** in Phase 6 until dashboard API exists |
| 5 | Settings + ConfigDrawer | **Out of scope** this plan (v2) |

## Overview

Rebuild `app/(admin)/admin/*` UI to align with `docs/setup/DASHBOARD-UI-TEMPLATE.md` (shadcn-admin v2.2 playbook). All working API logic, hooks, and RBAC are preserved; only the presentation layer (shell, sidebar, route composition, header placement) is restructured. Delivery is phased: **v1 scope** ships the full architectural skeleton + route migration; **v2 scope** (data-table kit, ⌘K command palette, settings, real dashboard charts) is explicitly deferred per the prior "simple v1" product decision.

## Phases

- [x] [Phase 1: Bootstrap shadcn](./phase-01-bootstrap-shadcn.md) — shadcn init (safe globals.css), add sidebar/command/sheet primitives, chart CSS tokens
- [x] [Phase 2: Layout Shell](./phase-02-layout-shell.md) — LayoutProvider, SearchProvider, AppSidebar, Header, Main, sidebar-data; rewrite admin/layout.tsx to shell-only
- [x] [Phase 3: Route Scaffold](./phase-03-route-scaffold.md) — Thin page.tsx + `*-page.tsx` composition root for all 6 routes; Header+Main moved out of layout
- [x] [Phase 4: Users Migration](./phase-04-users-migration.md) — Users route-local components; bridge existing table UI; document v2 TanStack DataTable upgrade path
- [x] [Phase 5: Catalog Migration](./phase-05-catalog-migration.md) — items, decors, flower-templates, synergies route-local components
- [x] [Phase 6: Dashboard Polish](./phase-06-dashboard-polish.md) — Dashboard KPI stat cards + recharts (placeholder data OK if API unavailable)
- [x] [Phase 7: Global Polish & A11y](./phase-07-global-polish-a11y.md) — Command menu (v2 stub OK), theme switch, profile dropdown, navigation progress, deprecate `components/admin/*`

## Research Summary

| Dimension | Primary (4-phase full) | Alternative — Hybrid (lower regression risk) | **Chosen** |
|-----------|------------------------|----------------------------------------------|------------|
| Shell swap | Phase 1 of 4 | Phase 1 of 7 (same) | Both agree |
| Data-table kit | Full TanStack DataTable kit in v1 | Defer to v2; bridge existing table | **Hybrid — defer** (aligns with prior "simple v1" decision) |
| ⌘K Command palette | Full cmdk in v1 | Stub button only in v1; full in v2 | **Hybrid — stub v1** |
| Dashboard charts | Real recharts in v1 | Placeholder acceptable | **Hybrid — placeholder OK** |
| Settings route | Full settings in v1 | Defer entirely | **Hybrid — defer** |
| Regression risk | Higher (big-bang) | Lower (incremental) | **Hybrid wins** |

**Synthesis decision:** Full target architecture (folder structure, shell pattern, route-local composition) ships in v1. Heavy interactive kits (DataTable shared components, full cmdk, ConfigDrawer) are explicitly marked v2 in each phase. The existing CRUD logic is **never deleted** — only relocated.

## v1 vs v2 Scope Boundary

| Feature | v1 (this plan) | v2 (future) |
|---------|---------------|-------------|
| Shell (SidebarProvider + AppSidebar + SidebarInset) | ✅ | — |
| Route-local `*-page.tsx` composition | ✅ | — |
| Header + Main layout components | ✅ | — |
| sidebar-data.ts (mapping from admin-nav-config.ts) | ✅ | — |
| Existing CRUD hooks/services preserved | ✅ | — |
| ThemeSwitch + ProfileDropdown in header | ✅ | — |
| NavigationProgress bar | ✅ | — |
| Dashboard KPI cards (recharts BarChart) | ✅ placeholder OK | Real API data |
| ⌘K CommandMenu (full cmdk) | Stub/button only | ✅ |
| `components/data-table/*` shared kit | Basic only | ✅ Full kit |
| Settings route | ❌ out of scope | ✅ |
| ConfigDrawer | ❌ out of scope | ✅ |

## Dependencies

- `@tanstack/react-table`, `recharts`, `next-themes` already in `package.json`
- `components.json` created in Phase 1
- Existing: `AdminGuard` in `components/admin/admin-guard.tsx`, all hooks in `hooks/admin/*`, lib services in `lib/admin/*`
- Preserve: middleware RBAC (`middleware.ts`), Redux auth slice, `lib/api/core.ts` axios client

## Risks

- HIGH: `shadcn init` may overwrite `globals.css` theme tokens — mitigate by backing up and cherry-pick merging CSS vars
- HIGH: `components/ui/sidebar` is a large generated file — verify import paths don't break existing `ui/*` primitives after shadcn re-init
- MEDIUM: Moving Header+Main out of layout.tsx breaks every existing page render until Phase 3 is complete — **Phases 2 and 3 must land in the same branch/PR**; do not merge Phase 2 alone
- MEDIUM: No `ThemeProvider` on root layout today — Phase 2 must add/verify before ThemeSwitch works
- NOTED: `AdminGuard` is defense-in-depth; middleware is the real `/admin/*` gate
- NOTED: `LayoutProvider` v1 stays in-memory only; persist to localStorage in v2 to avoid hydration mismatch
- MEDIUM: Route-local file moves may break barrel imports in `components/admin/index.ts` — mitigate by updating barrel at end of each migration phase
- LOW: recharts `'use client'` requirement conflicts with server component pages — mitigate by wrapping chart files with `'use client'` directive per §14.1
- LOW: `nuqs` (URL sync for table state) not installed — Phase 4 bridges with existing `useSearchParams` pattern; nuqs is v2 scope

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-25  
**Phase in progress:** —  
**Status:** All 7 phases complete — `npm run build` pass

### Decisions made this session
- `components.json` created manually (slate base); sidebar/command from registry with import path fixes (`Slot` not `Slot.Root`)
- Chart + sidebar CSS tokens merged into `globals.css` without overwriting Cham Bloom tokens
- Phases 2+3 shipped together: `SidebarProvider` shell + `AdminRouteShell` per route
- Users CRUD moved to `app/(admin)/admin/users/components/` with Provider + bridge table
- Catalog routes use `CatalogCrudPage` + entity config inline in `*-page.tsx`
- Dashboard: KPI + Overview/Analytics tabs with placeholder recharts data
- Deprecated `admin-sidebar`, `admin-header`, old `users/*`, catalog `*-admin-page` wrappers
- v1 command menu: nav-only stub via `CommandMenu` + `Search` button

### Next immediate action
- Manual smoke: Admin JWT on all `/admin/*` routes; verify dark mode and ⌘K nav stub
