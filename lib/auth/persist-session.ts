import { setCookie } from "cookies-next";
import { store } from "@/lib/redux/store";
import { getAuthCookieConfig } from "@/utils/cookieConfig";
import type { AuthTokenData } from "@/lib/api/services/fetchAuth";

/** Write refreshed tokens to Redux + cookies (dynamic import avoids circular deps). */
export async function applyRefreshedSession(tokens: AuthTokenData): Promise<void> {
  const { setTokenWithRefresh } = await import("@/lib/redux/slices/authSlice");
  const cookieCfg = getAuthCookieConfig();
  store.dispatch(
    setTokenWithRefresh({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    })
  );
  setCookie("authToken", tokens.accessToken, cookieCfg);
  setCookie("refreshToken", tokens.refreshToken, cookieCfg);
}
