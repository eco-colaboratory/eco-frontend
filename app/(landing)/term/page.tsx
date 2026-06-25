import { Suspense } from 'react'
import LegalPageContent from './term-client'
import Link from 'next/link'
import Image from 'next/image'
import { ChamBloomMotionProvider } from '@/app/(landing)/_components/layout'

export default function LegalPage() {
  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page min-h-screen bg-bloom-cream text-bloom-green-deep font-sans pb-20">
        {/* Header Tối Giản */}
        <header className="w-full border-b-[2.5px] border-bloom-green-deep bg-white/70 backdrop-blur-md px-4 sm:px-6 py-4 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
              <Image
                src="/assets/logo/CHAM-Flora.png"
                alt="CHẠM Flora Logo"
                width={120}
                height={40}
                className="h-[32px] sm:h-[38px] w-auto shrink-0 object-contain"
                priority
              />
            </Link>
            <Link
              href="/"
              className="bloom-btn-3d bloom-btn-3d-outline px-4 sm:px-5 py-2 text-xs"
            >
              Về trang chủ
            </Link>
          </div>
        </header>

        {/* Suspense Wrapper cho phần tử dùng useSearchParams */}
        <Suspense
          fallback={
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-bloom-green-mid border-t-transparent"></div>
              <p className="mt-4 text-sm text-bloom-green-deep/60">Đang tải nội dung điều khoản...</p>
            </div>
          }
        >
          <LegalPageContent />
        </Suspense>
      </main>
    </ChamBloomMotionProvider>
  )
}
