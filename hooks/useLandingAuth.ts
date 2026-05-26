'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { handleLandingAuthSuccess } from '@/lib/auth/handle-landing-auth-success'
import {
  loginAsync,
  logoutAsync,
  registerAsync,
  selectAuth,
  setupAutoRefresh,
} from '@/lib/redux/slices/authSlice'
import type { RegisterRequest } from '@/lib/api/services/fetchAuth'
import type { AppDispatch } from '@/lib/redux/store'

type AuthSessionPayload = {
  token: string
  refreshToken: string
  user: import('@/lib/redux/slices/authSlice').User | null
}

function getErrorMessage(err: unknown, fallback: string) {
  if (typeof err === 'string') return err
  if (err instanceof Error) return err.message
  return fallback
}

export function useLandingAuth() {
  const dispatch = useAppDispatch() as AppDispatch
  const router = useRouter()
  const { isLoading, error } = useAppSelector(selectAuth)

  const afterAuthSuccess = (
    result: AuthSessionPayload,
    successToast: string,
    onSuccess?: () => void,
  ) => {
    if (result.token) {
      setupAutoRefresh(result.token, dispatch)
    }

    toast.success(successToast)
    handleLandingAuthSuccess(result, { router, onSuccess })
    return result
  }

  const login = async (
    credentials: { account: string; password: string },
    onSuccess?: () => void,
  ) => {
    try {
      const result = await dispatch(loginAsync(credentials)).unwrap()
      return afterAuthSuccess(result, 'Đăng nhập thành công', onSuccess)
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'Đăng nhập thất bại')
      toast.error(message)
      throw err
    }
  }

  const register = async (payload: RegisterRequest, onSuccess?: () => void) => {
    try {
      const result = await dispatch(registerAsync(payload)).unwrap()
      return afterAuthSuccess(result, 'Đăng ký thành công', onSuccess)
    } catch (err: unknown) {
      const message = getErrorMessage(err, 'Đăng ký thất bại')
      toast.error(message)
      throw err
    }
  }

  const logout = async () => {
    await dispatch(logoutAsync()).unwrap()
    toast.success('Đăng xuất thành công')
  }

  return { login, register, logout, isLoading, error }
}
