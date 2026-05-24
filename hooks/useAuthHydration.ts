'use client'

import { useEffect, useRef } from 'react'
import { getCookie } from 'cookies-next'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import {
  selectIsAuthenticated,
  setTokenWithRefresh,
  setupAutoRefresh,
} from '@/lib/redux/slices/authSlice'
import type { AppDispatch } from '@/lib/redux/store'

/** Restore Redux auth from cookies on first client load (e.g. landing F5). */
export function useAuthHydration() {
  const dispatch = useAppDispatch()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const didHydrate = useRef(false)

  useEffect(() => {
    if (didHydrate.current || isAuthenticated) return

    const accessToken = getCookie('authToken')
    if (typeof accessToken !== 'string' || !accessToken) {
      didHydrate.current = true
      return
    }

    const refreshToken = getCookie('refreshToken')
    const refresh =
      typeof refreshToken === 'string' && refreshToken ? refreshToken : ''

    dispatch(setTokenWithRefresh({ accessToken, refreshToken: refresh }))
    if (refresh) {
      setupAutoRefresh(accessToken, dispatch as AppDispatch)
    }

    didHydrate.current = true
  }, [dispatch, isAuthenticated])
}
