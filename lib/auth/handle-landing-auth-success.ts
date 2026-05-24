import { ROLE_ADMIN } from '@/lib/types/roles'
import type { User } from '@/lib/redux/slices/authSlice'

export type AuthSessionResult = {
  token: string
  refreshToken: string
  user: User | null
}

type LandingRouter = {
  push: (href: string) => void
}

/** Post-login/register: Admin → dashboard, else stay on landing via callback. */
export function handleLandingAuthSuccess(
  result: AuthSessionResult,
  options: {
    router: LandingRouter
    onSuccess?: () => void
  },
): 'admin-redirect' | 'landing' {
  const roles = result.user?.role ?? []
  if (roles.includes(ROLE_ADMIN)) {
    options.router.push('/admin/dashboard')
    return 'admin-redirect'
  }

  options.onSuccess?.()
  return 'landing'
}
