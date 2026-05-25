/**
 * Single-flight token refresh — shared by the Axios 401 interceptor and
 * refreshTokenAsync so concurrent callers never hit the API twice with the
 * same (possibly rotating) refresh token.
 */
import axios from "axios";
import type { AuthTokenData } from "@/lib/api/services/fetchAuth";

let refreshInFlight: Promise<AuthTokenData> | null = null;

export async function refreshAccessToken(refreshToken: string): Promise<AuthTokenData> {
  if (!refreshInFlight) {
    refreshInFlight = axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}api/auth/refresh-token`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        const data = response.data?.data as AuthTokenData | undefined;
        if (!data?.accessToken || !data?.refreshToken) {
          throw new Error("Invalid refresh response");
        }
        return data;
      })
      .finally(() => {
        refreshInFlight = null;
      });
  }

  return refreshInFlight;
}
