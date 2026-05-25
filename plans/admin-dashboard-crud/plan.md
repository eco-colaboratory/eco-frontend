# Plan: Admin Dashboard CRUD

**Status:** Complete  
**Date:** 2026-05-25  
**Mode:** Hard  
**Test:** default (`npm run build`; manual API testing against live backend)  
**Spec:** [docs/api/api-authorization.md](../../docs/api/api-authorization.md)

## Overview

Build an admin dashboard at `app/(admin)/admin/*` for **ROLE_ADMIN** users to manage players (users) and four catalog entities (Items, Decors, Synergies, FlowerTemplates). Middleware already protects `/admin/*` and login redirects Admin to `/admin/dashboard`; this plan adds routes, API services, React Query data layer, and CRUD UI.

Admins with multiple JWT roles (e.g. Admin + Instructor) retain access to non-admin routes per existing `middleware.ts` — the admin shell does not block cross-area navigation.

## Product decisions (2026-05-25)

| Topic | Decision |
|-------|----------|
| **Delivery** | **UI-first** — ship layout + tables/forms with sensible placeholders; wire/refine API field-by-field as backend responses are confirmed |
| **User roles** | Admin may assign **any** role including `Admin` / `SuperAdmin` (no UI escalation block) |
| **UI fidelity** | **Simple v1** — minimal shadcn tables/dialogs; polish visuals after real API shapes are known |
| **Pagination** | **Server-side** on all lists: Users + Items + Decors + Synergies + FlowerTemplates (`page` / `pageSize` — confirm param names in Phase 2 probe) |
| **Theme** | **Neutral** admin shell (shadcn default / slate), not Cham Bloom landing styling |

## Phases

- [x] [Phase 1: Shell & RBAC](./phase-01-shell-rbac.md) — Admin route group, sidebar layout, dashboard placeholder, shadcn shell components
- [x] [Phase 2: API & Types](./phase-02-api-types.md) — Shared response/pagination types, fetch services, generic catalog factory + hooks
- [x] [Phase 3: Users](./phase-03-users.md) — Paginated user list, create/edit, ban/unban
- [x] [Phase 4: Items & Decors](./phase-04-catalog-items-decors.md) — Catalog CRUD for Items and Decors
- [x] [Phase 5: Synergies & Flower Templates](./phase-05-catalog-synergies-flowers.md) — Catalog CRUD for Synergies and FlowerTemplates
- [x] [Phase 6: Polish & A11y](./phase-06-polish-a11y.md) — Loading/error states, toasts, keyboard nav, responsive sidebar

## Research Summary

| Source | Verdict |
|--------|---------|
| **Primary** | React Query for server state; Redux auth only. Generic catalog factory for 4 entities (not users). shadcn: sidebar, sheet, dropdown-menu, breadcrumb, pagination, separator, scroll-area. `fetchXxx.ts` service pattern like `fetchAuth.ts`. |
| **Alternative (partial)** | Do **not** build a dual server-fetch layer in v1 — use existing `apiService` axios client. Do **not** monolithic single page — split routes per entity. Catalog-first phasing within catalog phases is OK. `POST /api/apiconfigs` is **out of scope v1**. |

## Dependencies

- Backend API running at `NEXT_PUBLIC_API_URL` with Admin/SuperAdmin JWT
- Existing: `middleware.ts` (ROLE_ADMIN gate), `lib/api/core.ts` (axios + token refresh), `QueryProvider`, shadcn table/dialog/form
- Admin test account with JWT role `Admin` or `SuperAdmin`

## Success Criteria

1. **`npm run build`** passes with zero TypeScript errors.
2. Admin login → lands on `/admin/dashboard`; non-admin cannot access `/admin/*` (middleware redirect).
3. **Users:** paginated list loads from `GET /api/user`; create/update via POST/PUT; ban/unban via POST endpoints; UI reflects server state after mutations.
4. **Catalog (4 entities):** each has its own route with list + create/edit dialog + delete confirmation; GET is public, mutations require admin token — **required** manual verification: POST/PUT/DELETE without token returns 401/403; UI shows error toast (not success).
5. **`GET /api/user`** returns 401/403 without Admin/SuperAdmin token (verify in Phase 2; document result in Risks if backend differs).
6. Sidebar navigation links to all admin sections; active route highlighted; breadcrumbs show current section.
7. All mutations show success/error feedback (toast); list views show loading skeletons and empty states. API services unwrap `isSuccess: false` on HTTP 200 as errors (shared helper from Phase 2).
8. Keyboard-accessible: focus trap in dialogs, visible focus rings, table actions reachable via keyboard.
9. User create/edit includes full role select (all roles backend supports, including Admin/SuperAdmin). Ban/unban disabled for the logged-in admin's own row (safety only).
10. All list pages use **server-side pagination** controls (not client-only full fetch).

## Risks

| Severity | Risk | Mitigation |
|----------|------|------------|
| HIGH | Backend DTO fields unknown — forms may send wrong shape | Placeholder TypeScript interfaces marked "confirm with backend DTO"; validate with live API in Phase 2 before building forms |
| HIGH | Paginated user list response shape undocumented | Probe `GET /api/user` early; define `PaginatedResponse<T>` with flexible `metaData` parsing |
| MEDIUM | `ApiConfigsController` deferred but listed in auth doc | Explicitly out of scope v1; note in sidebar as future or omit |
| MEDIUM | JWT role string mismatch (`Admin` vs `ROLE_ADMIN`) | Already handled by `normalizeRoles()` — no change needed; verify in manual test |
| LOW | UI-first vs typed API | Use placeholder/mock rows optional in Phase 1–3 until probe; replace with live data incrementally |
| LOW | Missing shadcn components block layout | Install in Phase 1 via shadcn CLI before layout work |
| LOW | Soft-delete semantics on catalog DELETE | Probe DELETE + subsequent GET in Phase 4; AC matches backend (row hidden vs. badge) |
| MEDIUM | Cookie vs Redux token drift | Middleware uses cookie; `apiService` uses Redux — verify both set on login before admin fetches |
| MEDIUM | `GET /api/user` auth not documented as public/protected in auth doc | Phase 2 must verify 401/403 without admin token; if public, escalate backend fix before shipping Users UI |
| NOTED | Multi-role admin can leave `/admin/*` for courses/instructor routes | Documented in Overview; no extra nav required in v1 |
| NOTED | Phase 1 manual test: use Student account for non-admin redirect (Player → `/`) | See phase-01 manual test step 5 |

## Session Notes
<!-- Updated by cook automatically — do not edit manually -->

**Last active:** 2026-05-25  
**Phase in progress:** —  
**Status:** All phases complete — `npm run build` pass

### Decisions made this session
- Neutral slate admin shell (custom sidebar + mobile drawer, no components.json shadcn CLI)
- Split `catalog-config` (services) vs `catalog-hooks` (client) to avoid RSC import errors
- `normalizePaginatedData` flex parser for unknown backend pagination shapes
- Full role select on user form; self-ban disabled only
- Catalog entity pages as thin client wrappers per resource

### Next immediate action
- Manual test with Admin JWT against live API; adjust DTO/pagination field names from responses
