'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from 'next-themes'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ReduxProvider } from './reduxProvider'
import { QueryProvider } from './queryProvider'
import { SignalRProvider } from './signalRProvider'
import { useAuthSyncAcrossTabs } from '@/hooks/useAuthSyncAcrossTabs'
import { useAuthHydration } from '@/hooks/useAuthHydration'

// Sync logout giữa các tabs + restore session from cookies
function AuthSyncProvider({ children }: { children: ReactNode }) {
  useAuthSyncAcrossTabs()
  useAuthHydration()
  return <>{children}</>
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <TooltipProvider delayDuration={0}>
        <ReduxProvider>
          <QueryProvider>
            <SignalRProvider>
              <AuthSyncProvider>{children}</AuthSyncProvider>
            </SignalRProvider>
          </QueryProvider>
        </ReduxProvider>
      </TooltipProvider>
    </ThemeProvider>
  )
}
