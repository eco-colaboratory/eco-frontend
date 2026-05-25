/**
 * Pure cookie readers — no Redux dependency.
 * Safe to import from anywhere, including authSlice.ts, without circular refs.
 */
import { getCookie } from "cookies-next";

export function getAccessTokenFromCookie(): string | null {
  const c = getCookie("authToken");
  return typeof c === "string" && c ? c : null;
}

export function getRefreshTokenFromCookie(): string | null {
  const c = getCookie("refreshToken");
  return typeof c === "string" && c ? c : null;
}
