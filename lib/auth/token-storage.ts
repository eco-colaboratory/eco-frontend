/**
 * Unified token readers — prefer Redux store, fall back to cookies.
 * Used by the Axios interceptors so tokens are always available even
 * before Redux hydration completes (e.g. first render after F5).
 */
let activeStore: any = null;

export function registerStore(storeInstance: any) {
  activeStore = storeInstance;
}

import { getAccessTokenFromCookie, getRefreshTokenFromCookie } from "./cookie-tokens";

export function getStoredAccessToken(): string | null {
  return activeStore?.getState().auth?.token ?? getAccessTokenFromCookie();
}

export function getStoredRefreshToken(): string | null {
  return activeStore?.getState().auth?.refreshToken ?? getRefreshTokenFromCookie();
}
