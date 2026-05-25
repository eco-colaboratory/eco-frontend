# Phase 2: API & Types

**Plan:** [plan.md](./plan.md)  
**Status:** Planned  
**Testing:** default (`npm run build`; probe live API manually)

## Goal

Define TypeScript types for API responses and all five entity domains. Implement `fetchXxx.ts` services using existing `apiService` (axios). Build a **generic catalog factory** (service + React Query hooks) reusable by Items, Decors, Synergies, and FlowerTemplates — **not** Users.

**UI-first note:** Types may stay placeholder; Phase 2 can ship minimal services + pagination params while UI phases use skeleton/empty states until response shapes are confirmed.

## Prerequisites

- Phase 1 complete (routes exist)
- Backend reachable at `NEXT_PUBLIC_API_URL`
- [api-authorization.md](../../docs/api/api-authorization.md) reviewed for endpoint list

## Tasks

- [ ] Define shared API wrapper types in `lib/types/api/`
- [ ] Define entity types with placeholder fields (mark "confirm with backend DTO")
- [ ] Implement `fetchUsers.ts` — list (paginated), getById, create, update, ban, unban
- [ ] Create `lib/admin/catalog/createCatalogService.ts` — **canonical** generic CRUD factory parameterized by base path
- [ ] Per-entity `fetchItems.ts`, `fetchDecors.ts`, etc. — **thin re-exports** from factory config only (no duplicated CRUD logic)
- [ ] Create `lib/api/unwrapApiResponse.ts` — throw on `isSuccess === false`; all services use it
- [ ] Create `lib/admin/catalog/createCatalogHooks.ts` — React Query hooks: `useCatalogList`, `useCatalogCreate`, `useCatalogUpdate`, `useCatalogDelete`
- [ ] Create `lib/admin/catalog/catalog-config.ts` — entity configs (path, queryKey prefix, display name)
- [ ] Probe live API for pagination shape on `GET /api/user` and list endpoints; adjust types
- [ ] Run `npm run build`

## Files to Create / Modify

| Path | Action | Purpose |
|------|--------|---------|
| `lib/api/unwrapApiResponse.ts` | Create | Throw on `isSuccess === false`; used by all admin services |
| `lib/types/api/api-response.ts` | Create | Generic `ApiResponse<T>`, `ApiListResponse<T>` |
| `lib/types/api/pagination.ts` | Create | `PaginationParams`, `PaginatedData<T>` |
| `lib/types/admin/user.ts` | Create | User DTOs (see types below) |
| `lib/types/catalog/item.ts` | Create | Item DTOs |
| `lib/types/catalog/decor.ts` | Create | Decor DTOs |
| `lib/types/catalog/synergy.ts` | Create | Synergy DTOs |
| `lib/types/catalog/flower-template.ts` | Create | FlowerTemplate DTOs |
| `lib/api/services/fetchUsers.ts` | Create | User admin API |
| `lib/api/services/fetchItems.ts` | Create | Items API |
| `lib/api/services/fetchDecors.ts` | Create | Decors API |
| `lib/api/services/fetchSynergies.ts` | Create | Synergies API |
| `lib/api/services/fetchFlowerTemplates.ts` | Create | FlowerTemplates API |
| `lib/admin/catalog/createCatalogService.ts` | Create | Generic axios CRUD factory |
| `lib/admin/catalog/createCatalogHooks.ts` | Create | React Query hook factory |
| `lib/admin/catalog/catalog-config.ts` | Create | Entity metadata registry |
| `lib/admin/catalog/index.ts` | Create | Exports |

### TypeScript Types (placeholder — confirm with backend DTO)

```typescript
// lib/types/api/api-response.ts
export interface ApiResponse<T> {
  isSuccess: boolean;
  message: string;
  data: T;
  metaData?: string;
}

// lib/types/api/pagination.ts
export interface PaginationParams {
  page?: number;       // confirm query param names with backend
  pageSize?: number;
  search?: string;
}

export interface PaginatedData<T> {
  items: T[];          // confirm field name: items | data | results
  totalCount: number;  // confirm field name
  page: number;
  pageSize: number;
  totalPages?: number;
}

// lib/types/admin/user.ts
export interface AdminUser {
  id: string;          // GUID
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;       // "Player" | "Admin" | etc.
  isBanned?: boolean;  // confirm field name
  createdAt?: string;  // ISO date
}

export interface CreateUserRequest {
  username: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
}

// lib/types/catalog/item.ts
export interface Item {
  id: string;
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateItemRequest {
  name: string;
  description?: string;
  price?: number;
  imageUrl?: string;
}

export type UpdateItemRequest = Partial<CreateItemRequest>;

// lib/types/catalog/decor.ts
export interface Decor {
  id: string;
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  createdAt?: string;
}

export interface CreateDecorRequest {
  name: string;
  description?: string;
  category?: string;
  imageUrl?: string;
}

export type UpdateDecorRequest = Partial<CreateDecorRequest>;

// lib/types/catalog/synergy.ts
export interface Synergy {
  id: string;
  name: string;
  description?: string;
  itemIds?: string[];   // confirm relation shape
  bonusMultiplier?: number;
  createdAt?: string;
}

export interface CreateSynergyRequest {
  name: string;
  description?: string;
  itemIds?: string[];
  bonusMultiplier?: number;
}

export type UpdateSynergyRequest = Partial<CreateSynergyRequest>;

// lib/types/catalog/flower-template.ts
export interface FlowerTemplate {
  id: string;
  name: string;
  description?: string;
  petalCount?: number;
  colorPalette?: string[];
  imageUrl?: string;
  createdAt?: string;
}

export interface CreateFlowerTemplateRequest {
  name: string;
  description?: string;
  petalCount?: number;
  colorPalette?: string[];
  imageUrl?: string;
}

export type UpdateFlowerTemplateRequest = Partial<CreateFlowerTemplateRequest>;
```

### Service Endpoints (from api-authorization.md)

| Service | Methods |
|---------|---------|
| `fetchUsers` | `GET /api/user`, `GET /api/user/{id}`, `POST /api/user`, `PUT /api/user/{id}`, `POST /api/user/{id}/ban`, `POST /api/user/{id}/unban` |
| `fetchItems` | `GET /api/items?page&pageSize`, `GET/POST/PUT/DELETE` as documented |
| `fetchDecors` | `GET /api/decors?page&pageSize`, mutations as documented |
| `fetchSynergies` | `GET /api/synergies?page&pageSize`, mutations as documented |
| `fetchFlowerTemplates` | `GET /api/flowertemplates?page&pageSize`, mutations as documented |

All list methods accept `PaginationParams` and return `PaginatedData<T>` (field names confirmed in probe).

### Catalog Factory Shape

```typescript
// createCatalogService<T, CreateT, UpdateT>(basePath: string)
// Returns: { list, getById, create, update, remove }

// createCatalogHooks<T, CreateT, UpdateT>(config: CatalogEntityConfig)
// Returns: useList, useCreate, useUpdate, useDelete with queryKey invalidation
```

## Acceptance Criteria

- All fetch services compile and use `apiService` + **`unwrapApiResponse`** (throw when `isSuccess === false` on HTTP 200)
- Catalog factory is **canonical**; per-entity fetch files are thin wrappers only — no parallel CRUD implementations
- React Query hooks invalidate list cache on create/update/delete
- Types exported and importable from `@/lib/types/...`
- **`GET /api/user` without admin token** returns 401 or 403 (document result in plan Risks if not)
- **Phase 2 gate:** pagination shape from `GET /api/user` parsed; at least one catalog `GET` parsed — **do not start Phase 3** until gate passes or types are updated from probe
- **Mutation auth (required):** `POST /api/items` (or any catalog POST) without Bearer token returns 401; with admin token succeeds or returns validation error (not silent `isSuccess: false` without UI handling)
- `npm run build` passes

## Manual Test Steps

1. Call `fetchItems.list()` with admin session → confirm parseable JSON
2. Call `GET /api/user?page=1` with admin token → record pagination field names; update `PaginatedData`
3. Call `GET /api/user` **without** token → expect 401/403; record in plan Risks if 200
4. Call `POST /api/items` without token → expect 401; with admin token → expect success or validation error surfaced via unwrap
5. Run `npm run build` → zero errors
