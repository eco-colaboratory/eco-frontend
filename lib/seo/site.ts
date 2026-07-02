export const SITE = {
  name: 'CHẠM Flora',
  shortName: 'CHẠM Flora',
  defaultDescription:
    'CHẠM Flora là nền tảng game hóa hành động xanh cho Gen Z, kêu gọi tài trợ và hợp tác CSR để chuyển đổi vườn hoa ảo thành vườn hoa thật.',
  locale: 'vi_VN',
  gameThumbnail: {
    url: '/assets/game/thumnail.png?v=2',
    width: 1024,
    height: 500,
    alt: 'Thumbnail game CHẠM Flora',
  },
} as const

export function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '')
  return url || 'https://ecocham.xyz'
}
