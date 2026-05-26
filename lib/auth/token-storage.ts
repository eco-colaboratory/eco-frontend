/**
 * Unified token readers — prefer Redux store, fall back to cookies.
 * Used by the Axios interceptors so tokens are always available even
 * before Redux hydration completes (e.g. first render after F5).
 */
import { store } from "@/lib/redux/store";
import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "./cookie-tokens";

export function getStoredAccessToken(): string | null {
  return store.getState().auth.token ?? getAccessTokenFromCookie();
}

export function getStoredRefreshToken(): string | null {
  return store.getState().auth.refreshToken ?? getRefreshTokenFromCookie();
}
