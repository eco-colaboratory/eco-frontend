# Phase 1: Bootstrap shadcn

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Test:** `npm run build` passes after this phase

## Goal

Initialize shadcn/ui properly (creating `components.json`), add the specific primitives required by the template shell that are currently absent (`sidebar`, `command`, `chart CSS tokens`), and inject chart color tokens into `globals.css` without destroying existing CSS variables. This phase has **no route changes** — purely additive dependency work.

**Template reference:** §11 Bootstrap, §13 Checklist, §14.2 Chart tokens

## Prerequisites

- Node 20+, project runs with `npm run dev`
- `@tanstack/react-table`, `recharts`, `next-themes` already in `package.json`
- Existing `components/ui/*` primitives (button, input, table, dialog, sheet, etc.) must survive unmodified

## Tasks

- [ ] Audit `components.json` — if absent, run `npx shadcn@latest init`; when prompted about overwriting `globals.css`, **choose No / manual** and manually merge only the missing CSS variable blocks
- [ ] **Theme:** On init, pick base color aligned with **existing slate admin** (or closest match) — **do not** reskin the app to shadcn zinc; preserve Cham Bloom + admin `slate-*` usage (see plan.md Product decisions §3)
- [ ] Back up `globals.css` before init; after shadcn init diff the two and cherry-pick missing `:root` variable blocks (sidebar tokens, chart tokens) without losing existing Cham Bloom / project tokens
- [ ] Add missing shadcn primitives that the template shell requires and are not yet present: `sidebar`, `command` — run `npx shadcn@latest add sidebar command` (skip already-present ones)
- [ ] Add chart color tokens to `globals.css` per §14.2: `--chart-1` … `--chart-5` in `:root` and `.dark` blocks using `oklch()` values from template
- [ ] Verify `components/ui/sidebar.tsx` was generated correctly and exports `SidebarProvider`, `SidebarInset`, `SidebarTrigger`, `AppSidebar`-related primitives
- [ ] Verify `components/ui/command.tsx` was generated and exports `Command`, `CommandInput`, `CommandGroup`, `CommandItem`
- [ ] Confirm all existing `components/ui/*` files are unchanged (spot-check button, input, table, dialog)
- [ ] Run `npm run build` — zero TypeScript errors; existing routes unaffected

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `components.json` | Create (shadcn init) | Registry config for future `shadcn add` |
| `components/ui/sidebar.tsx` | Create (shadcn add) | SidebarProvider, SidebarInset, SidebarTrigger, SidebarRail (§3.1 S1–S14) |
| `components/ui/command.tsx` | Create (shadcn add) | Command palette primitives (§3.3 C1–C4) |
| `app/globals.css` | Modify — append only | Add `--chart-1`…`--chart-5` tokens in `:root` and `.dark` per §14.2 |

> **Do NOT modify:** any existing `components/ui/*.tsx`, `middleware.ts`, `hooks/`, `lib/`, or route files.

## Manual Test Steps

1. After `shadcn init`: open `globals.css` and confirm chart tokens exist (`--chart-1`) and existing tokens are intact
2. Import `SidebarProvider` from `@/components/ui/sidebar` in a throwaway snippet — confirm TypeScript resolves without error
3. Run `npm run build` — confirm zero new errors versus before this phase
4. Spot-check: `components/ui/button.tsx`, `components/ui/table.tsx` — confirm unchanged

## Done Criteria

- `components.json` exists at project root
- `components/ui/sidebar.tsx` and `components/ui/command.tsx` exist and export expected symbols
- `globals.css` contains `--chart-1` through `--chart-5` in both `:root` and `.dark`
- All previously existing `components/ui/*` files are byte-for-byte unchanged (or shadcn-upgraded, not deleted)
- `npm run build` passes with zero errors
