# Phase 7: Global Polish & A11y

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; smoke all 6 routes; a11y spot-check

## Goal

Wire the remaining global UX primitives (ThemeSwitch full implementation, ProfileDropdown full menu, NavigationProgress bar, and a ⌘K Search button stub), then **delete** all deprecated `components/admin/*` files that were superseded by route-local components in Phases 4–5. The full cmdk command palette and ConfigDrawer are explicitly **v2 scope** — only the Search button trigger and `SearchProvider` integration are wired here.

**Template reference:** §3.2 Header toolbar H4–H8, §3.3 Command palette (stub only), §6.2, §13 Handoff checklist, §3.10 Feedback (X1–X10)

## Prerequisites

- Phases 4 and 5 complete: all route-local components migrated and verified
- Phase 6 complete: dashboard renders
- `SearchProvider` (context/search-provider.tsx) created in Phase 2
- `next-themes` in `package.json` and `ThemeProvider` on root layout

## Tasks

### ThemeSwitch (full)

- [ ] Upgrade `components/theme-switch.tsx` stub (from Phase 3) to full implementation: 3-way toggle (Light / Dark / System) using `next-themes` `useTheme`; icon button with tooltip; correct aria-label per mode
- [ ] Verify `ThemeProvider` is on root `app/layout.tsx` (add if absent); ensure `attribute='class'` so Tailwind dark mode works

### ProfileDropdown (full)

- [ ] Upgrade `components/profile-dropdown.tsx` stub to full implementation: `DropdownMenu` with Avatar trigger; menu items: display name + email (non-interactive header), separator, Sign Out action; Sign Out calls existing logout action and redirects to `/login` (H8 pattern)
- [ ] Source user name/email from auth state (existing `selectUser` Redux selector)

### NavigationProgress

- [ ] Create `components/navigation-progress.tsx` — page-transition loading bar at very top of viewport; use `next/navigation` `usePathname` + `useEffect` to start/stop; or integrate a lightweight library like `nextjs-toploader` if already in deps; place in `app/layout.tsx` root (H9, above `<body>` content)

### Search Button (⌘K stub)

- [ ] Create `components/search.tsx` — button that triggers `setOpen(true)` from `SearchProvider`; shows keyboard hint "⌘K" / "Ctrl+K"; visually matches template (H4 pattern)
- [ ] Wire `Search` into all `*-page.tsx` Header slots (add `<Search className='me-auto' />` to the left of ThemeSwitch in each route header per §2.3 example)
- [ ] Add keyboard listener in `SearchProvider` for Ctrl+K / ⌘K to set open state (full CommandMenu dialog is v2)
- [ ] Create `components/coming-soon.tsx` placeholder — used as command palette body until v2 (X6 pattern)

### Deprecate components/admin/*

- [ ] Confirm zero imports remain for: `components/admin/admin-sidebar.tsx`, `components/admin/admin-header.tsx`, `components/admin/users/*`, `components/admin/catalog/*`
- [ ] Run a project-wide import search for `components/admin/` **and** `dynamic(.*components/admin` to catch lazy-loaded references
- [ ] Delete the confirmed-unused files; keep `components/admin/admin-guard.tsx` (still used by `layout.tsx`) and `components/admin/admin-nav-config.ts` (still referenced by `sidebar-data.ts`)
- [ ] Update `components/admin/index.ts` barrel — remove exports for deleted files; keep `AdminGuard` export

### Final Build & Checklist

- [ ] Run through §13 Handoff checklist mentally; document any deferred items as v2 in plan.md
- [ ] Dark mode check: visit each route and toggle; no visual regressions
- [ ] Mobile check: sidebar collapses; header wraps correctly; tables scrollable
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `components/theme-switch.tsx` | Upgrade stub → full | 3-way theme toggle (H6) |
| `components/profile-dropdown.tsx` | Upgrade stub → full | Avatar + logout menu (H8) |
| `components/navigation-progress.tsx` | Create | Top progress bar (H9) |
| `components/search.tsx` | Create | ⌘K trigger button (H4 stub) |
| `components/coming-soon.tsx` | Create | Placeholder for command menu body |
| `app/layout.tsx` | Modify (if needed) | Add ThemeProvider + NavigationProgress |
| All 6 `*-page.tsx` | Modify | Add `<Search className='me-auto' />` to Header |
| `components/admin/admin-sidebar.tsx` | **Delete** | Replaced by AppSidebar |
| `components/admin/admin-header.tsx` | **Delete** | Replaced by route-local Header |
| `components/admin/users/*` (except schema.ts if any) | **Delete** | Replaced by route-local |
| `components/admin/catalog/*` | **Delete** | Replaced by route-local |
| `components/admin/shared/*` | **Delete** | Replaced by layout/main patterns |
| `components/admin/index.ts` | Modify | Remove deleted exports |

> **Keep:** `components/admin/admin-guard.tsx`, `components/admin/admin-nav-config.ts`

## Manual Test Steps

1. Smoke all 6 routes — header shows `[Search] ... [ThemeSwitch] [ProfileDropdown]` in correct order
2. Toggle theme from each route — dark/light transitions cleanly; charts, tables, sidebar all adapt
3. Navigate between routes — progress bar appears at top during transition
4. Click Search button — confirm SearchProvider `open` state triggers (full ⌘K dialog is v2; stub/coming-soon acceptable)
5. Click ProfileDropdown → Sign Out → confirm redirect to `/login`
6. Keyboard: Ctrl+K (or ⌘K) — confirm `SearchProvider` open state sets (console.log acceptable for v1)
7. Check zero 404 errors in browser console for any deleted component paths
8. Mobile: all routes at 375px width — header, sidebar, tables look correct
9. Run `npm run build`

## Done Criteria

- All 6 route headers show Search + ThemeSwitch + ProfileDropdown in correct order
- ThemeSwitch cycles Light / Dark / System; dark mode works across all routes
- ProfileDropdown shows user name/email and Sign Out works
- NavigationProgress bar visible during route transitions
- `components/admin/` contains only `admin-guard.tsx`, `admin-nav-config.ts`, `index.ts`
- `npm run build` passes with zero TypeScript errors
- §13 Handoff checklist items scoped to v1 are all checked; deferred v2 items documented
