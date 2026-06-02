'use client';

import { useSyncExternalStore } from 'react';
import { getCookie } from 'cookies-next';
import { useAppSelector } from '@/lib/redux/hooks';
import { selectAuth } from '@/lib/redux/slices/authSlice';

const emptySubscribe = () => () => {};

/** True when Redux auth matches cookie or both are absent (safe to run protected queries / redirects). */
export function useAuthReady() {
  const { isAuthenticated, token } = useAppSelector(selectAuth);
  const checked = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const cookieToken =
    checked && typeof window !== 'undefined' ? getCookie('authToken') : undefined;
  const refreshCookie =
    checked && typeof window !== 'undefined' ? getCookie('refreshToken') : undefined;
  const hasCookie = typeof cookieToken === 'string' && cookieToken.length > 0;
  const hasRefreshCookie =
    typeof refreshCookie === 'string' && refreshCookie.length > 0;

  const awaitingHydration = (hasCookie || hasRefreshCookie) && !isAuthenticated;
  const ready = checked && !awaitingHydration;

  return {
    ready,
    awaitingHydration,
    isAuthenticated: isAuthenticated && !!token,
    hasCookie,
    hasRefreshCookie,
  };
}
