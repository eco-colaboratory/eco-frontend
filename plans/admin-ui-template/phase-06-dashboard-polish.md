# Phase 6: Dashboard Polish

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes; `/admin/dashboard` renders KPI cards + at least one chart

## Goal

Rebuild the dashboard page with the template's widget pattern: KPI stat cards, a recharts BarChart (Overview), and an area chart stub (Analytics). Placeholder/static data is acceptable if no dashboard API endpoint exists yet — the goal is the correct structural and visual pattern. A `TopNav` with Overview / Analytics tabs is the composition frame.

**Template reference:** §8.1 Recipe A dashboard, §14 Charts full catalog, §3.5 Dashboard widgets, §14.2 Chart tokens (already added in Phase 1), §14.4 Card wrapper, §14.5 Recipe CH2 BarChart, §14.6 Recipe CH4 AreaChart

## Prerequisites

- Phase 3 complete: `dashboard-page.tsx` composition root with `<Header>` + `<Main>` exists
- Phase 1 complete: `--chart-1`…`--chart-5` CSS tokens in `globals.css`
- `recharts` already in `package.json`
- shadcn `card`, `tabs`, `skeleton` primitives available

## Tasks

- [ ] Create `app/(admin)/admin/dashboard/components/stat-cards.tsx` — 4-column KPI grid (`lg:grid-cols-4`); each card: metric label, large number, percentage delta, icon; static placeholder data or props if API available (D1, CH1 pattern)
- [ ] Create `app/(admin)/admin/dashboard/components/overview-chart.tsx` — recharts `BarChart` in `ResponsiveContainer height={350}`; uses `--chart-1` fill via `className='fill-primary'`; accepts `data` prop; static mock data as default for v1 (CH2, §14.5 recipe)
- [ ] Create `app/(admin)/admin/dashboard/components/analytics-chart.tsx` — recharts `AreaChart` 2-series (clicks + uniques) per §14.6; static placeholder data for v1 (CH4)
- [ ] Create `app/(admin)/admin/dashboard/components/dashboard-page.tsx` — replaces Phase 3 stub; top `<Header fixed>` with `<TopNav>` tabs (Overview / Analytics) on left + `<ThemeSwitch>` + `<ProfileDropdown>` on right; `<Main>` with: Tabs `Overview` → stat-cards grid + `lg:grid-cols-7` bar chart; Tabs `Analytics` → area chart (CH14–CH15 pattern)
- [ ] Create `components/layout/top-nav.tsx` — tab links component for dashboard header; uses `ui/tabs` horizontal (H5 pattern); v1 only needs 2 tabs
- [ ] Wrap all chart files in `'use client'` directive (recharts requirement per §14.1)
- [ ] Ensure `StatCards` is a server-compatible component if data is static (no `'use client'` unless it needs state)
- [ ] If a real dashboard API endpoint exists (e.g. aggregate stats), fetch in a server component and pass as props to `DashboardPage`; if absent, use clearly-labeled placeholder constants
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `app/(admin)/admin/dashboard/components/stat-cards.tsx` | Create | 4× KPI cards (D1, CH1) |
| `app/(admin)/admin/dashboard/components/overview-chart.tsx` | Create | BarChart recharts (CH2, §14.5) |
| `app/(admin)/admin/dashboard/components/analytics-chart.tsx` | Create | AreaChart 2-series (CH4, §14.6) |
| `app/(admin)/admin/dashboard/components/dashboard-page.tsx` | Create/Replace | Full composition (§8.1) |
| `components/layout/top-nav.tsx` | Create | Tab links for dashboard header (H5) |

> Dashboard `page.tsx` is already a thin wrapper from Phase 3 — no change needed.

## Manual Test Steps

1. `/admin/dashboard` — confirm 4 KPI stat cards render in a grid
2. Confirm "Overview" tab shows bar chart inside a Card
3. Switch to "Analytics" tab — confirm area chart renders
4. Toggle dark mode — confirm charts adapt (`fill-primary` / `oklch` tokens work in dark)
5. Mobile: confirm charts are responsive (`ResponsiveContainer` shrinks); stat cards stack to 2 columns
6. Run `npm run build`

## Done Criteria

- Dashboard renders KPI cards, BarChart (Overview tab), and AreaChart (Analytics tab)
- Dark mode visual check passes (no hardcoded hex colors in charts)
- All chart components have `'use client'` directive
- Static placeholder data clearly labeled with a `// TODO: replace with API` comment
- `npm run build` passes
