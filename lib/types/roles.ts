// Role constants — dùng trong middleware và RBAC checks
export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_INSTRUCTOR = "ROLE_INSTRUCTOR";
export const ROLE_STUDENT = "ROLE_STUDENT";

export type UserRole = typeof ROLE_ADMIN | typeof ROLE_INSTRUCTOR | typeof ROLE_STUDENT;

const JWT_ADMIN_ROLES = new Set(["Admin", "SuperAdmin", ROLE_ADMIN]);

/** Map JWT role strings to app/middleware role constants */
export function normalizeRoles(role: string | string[] | undefined): string[] {
  if (!role) return [];
  const list = Array.isArray(role) ? role : [role];
  return list.map((r) => (JWT_ADMIN_ROLES.has(r) ? ROLE_ADMIN : r));
}

export function hasAdminRole(roles: string[]): boolean {
  return roles.includes(ROLE_ADMIN);
}
