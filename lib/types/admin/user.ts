/** Confirm fields with backend DTO */
export interface AdminUser {
  id: string;
  username: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  isBanned?: boolean;
  createdAt?: string;
  currency?: number;
  level?: number;
}

export interface CreateUserRequest {
  username: string;
  email?: string;
  password: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  currency?: number;
  level?: number;
}

export interface UpdateUserRequest {
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  currency?: number;
  level?: number;
}

export const ASSIGNABLE_ROLES = [
  'Player',
  'Admin',
  'SuperAdmin',
  'Instructor',
  'Student',
] as const;
