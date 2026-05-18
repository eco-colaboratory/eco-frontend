export const SITE = {
  name: 'CHẠM Bloom',
  shortName: 'CHẠM Bloom',
  defaultDescription:
    'Game hóa hành động xanh cho Gen Z — biến vườn hoa ảo thành vườn hoa thật. Trang tài trợ chính thức.',
  locale: 'vi_VN',
} as const

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '')
  return url || 'http://localhost:3000'
}
