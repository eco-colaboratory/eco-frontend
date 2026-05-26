'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

export const authFieldClass =
  'h-11 rounded-2xl border-0 bg-bloom-green-light/50 font-sans shadow-none ring-1 ring-bloom-green-mid/15 placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-bloom-green-mid/40'

type AuthFormFieldProps = {
  id: string
  label: string
  error?: string
  children: React.ReactNode
  className?: string
}

export function AuthFormField({ id, label, error, children, className }: AuthFormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={id} className="font-sans text-xs font-medium text-bloom-green-deep/80">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="font-sans text-[11px] text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type AuthTextFieldProps = {
  id: string
  label: string
  type?: string
  autoComplete?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  className?: string
}

export function AuthTextField({
  id,
  label,
  type = 'text',
  autoComplete,
  placeholder,
  value,
  onChange,
  error,
  disabled,
  className,
}: AuthTextFieldProps) {
  return (
    <AuthFormField id={id} label={label} error={error} className={className}>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={authFieldClass}
      />
    </AuthFormField>
  )
}
