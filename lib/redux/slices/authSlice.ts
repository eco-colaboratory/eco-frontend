/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import apiService from "@/lib/api/core";
import { fetchAuth, type RegisterRequest } from "@/lib/api/services/fetchAuth";
import { getAuthCookieConfig } from "@/utils/cookieConfig";
import { normalizeRoles } from "@/lib/types/roles";
import { getRefreshTokenFromCookie } from "@/lib/auth/cookie-tokens";
import { applyRefreshedSession } from "@/lib/auth/persist-session";
import { refreshAccessToken } from "@/lib/auth/refresh-session";
import type { RootState, AppDispatch } from "../store";

export interface User {
  id: string;
  email: string;
  username: string;
  name?: string;
  role: string[];
}

export interface DecodedToken extends User {
  nbf?: number;
  exp?: number;
  iat?: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

let refreshTimer: NodeJS.Timeout | null = null;

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const REFRESH_TOKEN_COOKIE = "refreshToken";

function mapJwtToUser(decoded: Record<string, unknown>): User | null {
  const id = decoded.id as string | undefined;
  if (!id) return null;

  const role = normalizeRoles(decoded.role as string | string[] | undefined);

  return {
    id,
    email: (decoded.email as string) ?? "",
    username:
      (decoded.username as string) ??
      (decoded.userNname as string) ??
      (decoded.name as string) ??
      "",
    name: decoded.name as string | undefined,
    role,
  };
}

export const decodeToken = (token: string): User | null => {
  try {
    const decoded = jwtDecode<Record<string, unknown>>(token);
    return mapJwtToUser(decoded);
  } catch {
    return null;
  }
};

export const decodeTokenWithExpiry = (token: string): DecodedToken | null => {
  try {
    const decoded = jwtDecode<Record<string, unknown>>(token);
    const user = mapJwtToUser(decoded);
    if (!user) return null;
    return {
      ...user,
      nbf: decoded.nbf as number | undefined,
      exp: decoded.exp as number | undefined,
      iat: decoded.iat as number | undefined,
    };
  } catch {
    return null;
  }
};

function persistAuthCookies(accessToken: string, refreshToken: string) {
  const cookieConfig = getAuthCookieConfig();
  setCookie("authToken", accessToken, cookieConfig);
  setCookie(REFRESH_TOKEN_COOKIE, refreshToken, cookieConfig);
}

function clearAuthCookies() {
  deleteCookie("authToken", { path: "/" });
  deleteCookie(REFRESH_TOKEN_COOKIE, { path: "/" });
}

export const setupAutoRefresh = (token: string, dispatch: AppDispatch) => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }

  const decoded = decodeTokenWithExpiry(token);
  if (!decoded?.exp) return;

  const refreshTime = decoded.exp * 1000 - Date.now() - 2 * 60 * 1000;

  if (refreshTime <= 0) {
    dispatch(refreshTokenAsync());
    return;
  }

  refreshTimer = setTimeout(() => dispatch(refreshTokenAsync()), refreshTime);
};

export const clearAutoRefresh = () => {
  if (refreshTimer) {
    clearTimeout(refreshTimer);
    refreshTimer = null;
  }
};

type AuthSessionPayload = {
  token: string;
  refreshToken: string;
  user: User | null;
};

function createAuthSession(accessToken: string, refreshToken: string): AuthSessionPayload {
  persistAuthCookies(accessToken, refreshToken);
  apiService.setAuthToken(accessToken);
  return { token: accessToken, refreshToken, user: decodeToken(accessToken) };
}

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials: { account: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetchAuth.login(credentials);

      if (response.isSuccess && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        return createAuthSession(accessToken, refreshToken);
      }

      return rejectWithValue(response.message || "Login failed");
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

export const registerAsync = createAsyncThunk(
  "auth/register",
  async (payload: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await fetchAuth.register(payload);

      if (response.isSuccess && response.data.accessToken) {
        const { accessToken, refreshToken } = response.data;
        return createAuthSession(accessToken, refreshToken);
      }

      return rejectWithValue(response.message || "Đăng ký thất bại");
    } catch (error: any) {
      return rejectWithValue(error.message || "Đăng ký thất bại");
    }
  }
);

/** Client-only logout — no `/api/auth/logout` on backend. */
export const logoutAsync = createAsyncThunk("auth/logout", async () => {
  clearAuthCookies();
  apiService.setAuthToken(null);
  clearAutoRefresh();

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("logout"));
  }

  return true;
});

export const refreshTokenAsync = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;
      // Fall back to cookie when Redux state is empty (e.g. before hydration).
      const refreshToken = state.auth.refreshToken ?? getRefreshTokenFromCookie();
      if (!refreshToken) return rejectWithValue("No refresh token");

      const tokens = await refreshAccessToken(refreshToken);
      await applyRefreshedSession(tokens);
      setupAutoRefresh(tokens.accessToken, dispatch as AppDispatch);

      const user = decodeToken(tokens.accessToken);
      return {
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokenWithRefresh: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      apiService.setAuthToken(action.payload.accessToken);
      const user = decodeToken(action.payload.accessToken);
      if (user) {
        state.user = user;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      clearAuthCookies();
      apiService.setAuthToken(null);
      clearAutoRefresh();
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(registerAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken ?? null;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
        state.error = null;
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });

    builder
      .addCase(refreshTokenAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshTokenAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.user = action.payload.user;
        state.isAuthenticated = !!action.payload.user;
      })
      .addCase(refreshTokenAsync.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        clearAuthCookies();
        apiService.setAuthToken(null);
        clearAutoRefresh();
      });
  },
});

export const { setTokenWithRefresh, logout, clearError } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
