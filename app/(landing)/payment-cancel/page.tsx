'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChamBloomMotionProvider } from '@/app/(landing)/_components/layout'

// Mầm cây hơi nghiêng buồn bã khi hủy giao dịch
function CancelledFlower() {
  return (
    <div className="w-32 h-32 flex items-center justify-center animate-bloom-sway">
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Chậu hoa đất nung */}
        <path d="M35 70 L38 90 H62 L65 70 Z" fill="#d77a44" stroke="#4f3516" strokeWidth="2.5" />
        <rect x="30" y="62" width="40" height="8" rx="2" fill="#bd6431" stroke="#4f3516" strokeWidth="2.5" />
        
        {/* Thân cây hơi rũ xuống */}
        <path d="M50 62 Q44 48 40 38" stroke="#82bf47" strokeWidth="4.5" strokeLinecap="round" />
        
        {/* Lá cây rũ */}
        <path d="M44 52 Q32 48 38 42 Q45 46 44 52 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2" />
        
        {/* Đóa hoa rũ nghiêng */}
        <g transform="translate(40, 38) rotate(20)">
          {/* Cánh hoa xám/nhạt buồn */}
          <circle cx="0" cy="-6" r="6" fill="#fde0e8" stroke="#4f3516" strokeWidth="1.5" />
          <circle cx="6" cy="0" r="6" fill="#fde0e8" stroke="#4f3516" strokeWidth="1.5" />
          <circle cx="0" cy="6" r="6" fill="#fde0e8" stroke="#4f3516" strokeWidth="1.5" />
          <circle cx="-6" cy="0" r="6" fill="#fde0e8" stroke="#4f3516" strokeWidth="1.5" />
          {/* Nhụy hoa ở giữa */}
          <circle cx="0" cy="0" r="5" fill="#f58fb1" stroke="#4f3516" strokeWidth="1.5" />
        </g>
        
        {/* Đám mây nhỏ mưa dễ thương phía trên */}
        <path d="M60 20 C60 17 65 15 68 17 C70 15 75 16 76 19 C78 19 80 21 79 23 C79 25 77 26 75 26 H62 C60 26 59 24 60 20 Z" fill="#cbd5e1" stroke="#4f3516" strokeWidth="1.5" />
        <line x1="65" y1="30" x2="63" y2="34" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="72" y1="30" x2="70" y2="34" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default function PaymentCancelPage() {
  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page min-h-screen bg-bloom-cream text-bloom-green-deep font-sans pb-20 overflow-x-hidden">
        
        {/* Header Tối Giản */}
        <header className="w-full border-b-[2.5px] border-bloom-green-deep bg-white/70 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:scale-[1.02] transition-transform">
              <Image
                src="/assets/logo/CHAM-Flora.png"
                alt="CHẠM Flora Logo"
                width={120}
                height={40}
                className="h-[32px] sm:h-[38px] w-auto shrink-0 object-contain"
              />
            </Link>
            <Link 
              href="/" 
              className="bloom-btn-3d bloom-btn-3d-outline px-5 py-2 text-xs"
            >
              Về trang chủ
            </Link>
          </div>
        </header>

        <div className="max-w-2xl mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bloom-card-3d bg-[#fffdf8] p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <CancelledFlower />
            </div>

            <h2 className="font-display font-black text-2xl sm:text-3xl mb-3 text-bloom-green-deep bloom-text-shadow">
              Giao Dịch Đã Bị Hủy
            </h2>
            <p className="text-xs sm:text-sm text-bloom-green-deep/75 max-w-md mx-auto mb-6 leading-relaxed">
              Bạn đã chọn hủy thanh toán hoặc cổng thanh toán không nhận được thông tin hoàn tất giao dịch. 
              <br />
              <strong className="text-bloom-green-deep font-bold mt-2 block">
                Đừng lo lắng, tài khoản ngân hàng của bạn không bị trừ tiền!
              </strong>
            </p>

            <div className="max-w-md mx-auto bg-bloom-petal-soft/30 border-[2px] border-bloom-petal/25 rounded-xl p-4 mb-8 text-left text-xs text-bloom-green-deep/80 space-y-1.5">
              <p>• Nếu đây là sự cố ngoài ý muốn, bạn có thể tạo lại một đơn nạp mới và tiến hành quét mã QR/chuyển khoản lại.</p>
              <p>• Vui lòng thanh toán trong thời hạn quy định (15 phút) sau khi được chuyển hướng sang cổng PayOS để đơn nạp không bị hết hạn tự động.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link 
                href="/topup" 
                className="bloom-btn-3d bloom-btn-3d-primary px-8 py-3 text-xs text-bloom-green-deep w-full sm:w-auto"
              >
                Thử lại nạp coin
              </Link>
              <Link 
                href="/" 
                className="bloom-btn-3d bloom-btn-3d-outline px-8 py-3 text-xs text-bloom-green-deep w-full sm:w-auto"
              >
                Quay lại trang chủ
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
    </ChamBloomMotionProvider>
  )
}
