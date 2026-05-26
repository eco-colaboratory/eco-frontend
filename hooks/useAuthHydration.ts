'use client'

import { useEffect, useRef } from 'react'
import { getCookie } from 'cookies-next'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  selectIsAuthenticated,
  setTokenWithRefresh,
  setupAutoRefresh,
  refreshTokenAsync,
} from '@/lib/redux/slices/authSlice'
import type { AppDispatch } from '@/lib/redux/store'

/** Restore Redux auth from cookies on first client load (e.g. landing F5).
 *
 * Cases handled:
 *  1. Both authToken + refreshToken cookies present → hydrate directly.
 *  2. Only refreshToken cookie present (authToken expired/missing) → dispatch
 *     refreshTokenAsync so a new accessToken is obtained before any API call.
 *  3. Neither cookie → skip (unauthenticated).
 */
export function useAuthHydration() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const didHydrate = useRef(false)

  useEffect(() => {
    if (didHydrate.current) return

    const accessToken = getCookie('authToken')
    const refreshTokenCookie = getCookie('refreshToken')
    const refresh =
      typeof refreshTokenCookie === 'string' && refreshTokenCookie
        ? refreshTokenCookie
        : ''

    if (typeof accessToken === 'string' && accessToken) {
      // Case 1: we have an access token — hydrate Redux directly.
      if (!isAuthenticated) {
        dispatch(setTokenWithRefresh({ accessToken, refreshToken: refresh }))
        if (refresh) {
          setupAutoRefresh(accessToken, dispatch as AppDispatch)
        }
      }
      didHydrate.current = true
      return
    }

    if (refresh) {
      // Case 2: no access token but refresh token exists — trigger silent refresh.
      didHydrate.current = true
      dispatch(refreshTokenAsync())
      return
    }

    // Case 3: nothing to hydrate.
    didHydrate.current = true
  }, [dispatch, isAuthenticated])
}
