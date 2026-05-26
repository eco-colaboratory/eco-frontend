'use client'

import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export type AuthCredentials = {
  account: string
  password: string
}

const fieldClass =
  'h-11 rounded-2xl border-0 bg-bloom-green-light/50 font-sans shadow-none ring-1 ring-bloom-green-mid/15 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-bloom-green-mid/40'

type AuthCredentialsFormProps = {
  mode: 'login' | 'register'
  submitLabel: string
  className?: string
  isLoading?: boolean
  onSubmit?: (credentials: AuthCredentials) => void | Promise<void>
}

export function AuthCredentialsForm({
  mode,
  submitLabel,
  className,
  isLoading = false,
  onSubmit,
}: AuthCredentialsFormProps) {
  const [account, setAccount] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!account.trim() || !password) return
    await onSubmit?.({ account: account.trim(), password })
  }

  const accountId = `${mode}-account`
  const passwordId = `${mode}-password`

  return (
    <form onSubmit={handleSubmit} className={cn('space-y-3.5', className)} noValidate>
      <div className="space-y-1.5">
        <Label
          htmlFor={accountId}
          className="font-sans text-xs font-medium text-bloom-green-deep/80"
        >
          {mode === 'login' ? 'Email hoặc tên đăng nhập' : 'Email'}
        </Label>
        <Input
          id={accountId}
          name="account"
          type={mode === 'login' ? 'text' : 'email'}
          autoComplete={mode === 'login' ? 'username' : 'email'}
          placeholder={mode === 'login' ? 'you@email.com hoặc username' : 'you@example.com'}
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          required
          disabled={isLoading}
          className={fieldClass}
        />
      </div>

      <div className="space-y-1.5">
        <Label
          htmlFor={passwordId}
          className="font-sans text-xs font-medium text-bloom-green-deep/80"
        >
          Mật khẩu
        </Label>
        <div className="relative">
          <Input
            id={passwordId}
            name="password"
            type={showPassword ? 'text' : 'password'}
            autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            disabled={isLoading}
            className={cn(fieldClass, 'pr-11')}
          />
          <button
            type="button"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-bloom-green-deep/45 transition-colors hover:bg-white/80 hover:text-bloom-green-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-bloom-green-mid"
            onClick={() => setShowPassword((value) => !value)}
            disabled={isLoading}
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            aria-pressed={showPassword}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden />
            ) : (
              <Eye className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="mt-1 h-11 w-full rounded-2xl bg-bloom-green-mid font-display text-sm font-semibold text-white shadow-[0_4px_14px_rgba(27,138,66,0.35)] hover:bg-bloom-green-deep disabled:opacity-60"
      >
        {submitLabel}
      </Button>
    </form>
  )
}
