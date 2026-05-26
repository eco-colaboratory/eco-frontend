'use client'

import { useLandingAuth } from '@/hooks/useLandingAuth'
import { AuthCredentialsForm, type AuthCredentials } from './auth-credentials-form'

type LoginFormProps = {
  onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, isLoading, error } = useLandingAuth()

  const handleSubmit = async (credentials: AuthCredentials) => {
    await login(credentials, onSuccess)
  }

  return (
    <div className="space-y-3">
      {error ? (
        <p
          className="rounded-2xl border border-red-200/80 bg-red-50 px-3 py-2.5 text-center text-xs text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}
      <AuthCredentialsForm
        mode="login"
        submitLabel={isLoading ? 'Đang xử lý…' : 'Tiếp tục'}
        isLoading={isLoading}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
