'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useLandingAuth } from '@/hooks/useLandingAuth'
import { AuthFormField, AuthTextField, authFieldClass } from './auth-form-field'
import {
  type RegisterFormValues,
  validateRegisterForm,
} from './register-schema'

const INITIAL_VALUES: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
}

type RegisterFormProps = {
  onSuccess?: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register, isLoading, error } = useLandingAuth()
  const [values, setValues] = useState<RegisterFormValues>(INITIAL_VALUES)
  const [fieldErrors, setFieldErrors] = useState<ReturnType<typeof validateRegisterForm>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const setField = <K extends keyof RegisterFormValues>(key: K, value: RegisterFormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
    setFieldErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const errors = validateRegisterForm(values)
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }

    const { confirmPassword: _, ...payload } = values
    await register(
      {
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        username: payload.username,
        password: payload.password,
      },
      onSuccess,
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3.5" noValidate>
      {error ? (
        <p
          className="rounded-2xl border border-red-200/80 bg-red-50 px-3 py-2.5 text-center text-xs text-red-700"
          role="alert"
        >
          {error}
        </p>
      ) : null}

      <div className="grid grid-cols-2 gap-3">
        <AuthTextField
          id="register-firstName"
          label="Họ"
          autoComplete="given-name"
          placeholder="Nguyễn"
          value={values.firstName}
          onChange={(v) => setField('firstName', v)}
          error={fieldErrors.firstName}
          disabled={isLoading}
        />
        <AuthTextField
          id="register-lastName"
          label="Tên"
          autoComplete="family-name"
          placeholder="An"
          value={values.lastName}
          onChange={(v) => setField('lastName', v)}
          error={fieldErrors.lastName}
          disabled={isLoading}
        />
      </div>

      <AuthTextField
        id="register-email"
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="you@example.com"
        value={values.email}
        onChange={(v) => setField('email', v)}
        error={fieldErrors.email}
        disabled={isLoading}
      />

      <AuthTextField
        id="register-username"
        label="Tên đăng nhập"
        autoComplete="username"
        placeholder="username"
        value={values.username}
        onChange={(v) => setField('username', v)}
        error={fieldErrors.username}
        disabled={isLoading}
      />

      <AuthFormField
        id="register-password"
        label="Mật khẩu"
        error={fieldErrors.password}
      >
        <div className="relative">
          <Input
            id="register-password"
            name="register-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Nhập mật khẩu"
            value={values.password}
            onChange={(e) => setField('password', e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
            className={cn(authFieldClass, 'pr-11')}
          />
          <PasswordToggle
            visible={showPassword}
            onToggle={() => setShowPassword((v) => !v)}
            disabled={isLoading}
          />
        </div>
      </AuthFormField>

      <AuthFormField
        id="register-confirmPassword"
        label="Xác nhận mật khẩu"
        error={fieldErrors.confirmPassword}
      >
        <div className="relative">
          <Input
            id="register-confirmPassword"
            name="register-confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            autoComplete="new-password"
            placeholder="Nhập lại mật khẩu"
            value={values.confirmPassword}
            onChange={(e) => setField('confirmPassword', e.target.value)}
            required
            disabled={isLoading}
            className={cn(authFieldClass, 'pr-11')}
          />
          <PasswordToggle
            visible={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((v) => !v)}
            disabled={isLoading}
          />
        </div>
      </AuthFormField>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-11 w-full rounded-2xl bg-bloom-green-mid font-display text-sm font-semibold text-white shadow-[0_4px_14px_rgba(27,138,66,0.35)] hover:bg-bloom-green-deep disabled:opacity-60"
      >
        {isLoading ? 'Đang tạo tài khoản…' : 'Tạo tài khoản'}
      </Button>
    </form>
  )
}

function PasswordToggle({
  visible,
  onToggle,
  disabled,
}: {
  visible: boolean
  onToggle: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-bloom-green-deep/45 transition-colors hover:bg-white/80 hover:text-bloom-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-bloom-green-mid"
      onClick={onToggle}
      disabled={disabled}
      aria-label={visible ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
      aria-pressed={visible}
    >
      {visible ? <EyeOff className="h-4 w-4" aria-hidden /> : <Eye className="h-4 w-4" aria-hidden />}
    </button>
  )
}
