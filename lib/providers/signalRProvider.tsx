'use client'

import { ReactNode } from 'react'
// import { useSignalR } from '@/hooks/useSignalR'
// import { useSignalRNotifications } from '@/hooks/useSignalRNotifications'

/**
 * Auto-connects SignalR WebSocket khi app load.
 * Đặt cao trong cây component để giữ 1 connection duy nhất.
 */
export function SignalRProvider({ children }: { children: ReactNode }) {
  // Tạm ẩn SignalR đi theo yêu cầu, bỏ comment khi cần mở lại
  // useSignalR()
  // useSignalRNotifications()
  return <>{children}</>
}
