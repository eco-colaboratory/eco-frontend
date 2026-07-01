import { buildPageMetadata } from '@/lib/seo/metadata'
import DownloadPageClient from './download-client'

export const metadata = buildPageMetadata({
  title: 'Tải Game CHẠM Flora | Bản Cài Đặt Windows',
  description:
    'Tải game CHẠM Flora phiên bản mới nhất cho máy tính Windows (.exe). Bắt đầu hành trình gieo hạt trồng vườn hoa sinh thái ảo và nhận phần quà thực tế bảo vệ môi trường.',
  path: '/download',
})

export default function DownloadPage() {
  return <DownloadPageClient />
}
