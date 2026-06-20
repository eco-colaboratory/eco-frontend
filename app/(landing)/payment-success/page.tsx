/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectIsAuthenticated, selectAuthToken } from '@/lib/redux/slices/authSlice'
import { fetchTopup, type OrderStatusResponse } from '@/lib/api/services/fetchTopup'
import { fetchAuth, type UserProfile } from '@/lib/api/services/fetchAuth'
import { ChamBloomMotionProvider } from '@/app/(landing)/_components/layout'

// Icon Coin sử dụng hình ảnh thực tế của game
function CoinIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <Image
      src="/assets/coin/coin.PNG"
      alt="Coin"
      width={24}
      height={24}
      className={className}
      unoptimized
    />
  )
}

// Hoa nở 3D rực rỡ ăn mừng thành công
function SuccessFlower() {
  return (
    <div className="w-32 h-32 flex items-center justify-center animate-bloom-bounce-glow">
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
        {/* Chậu hoa */}
        <path d="M40 85 L44 105 H76 L80 85 Z" fill="#d77a44" stroke="#4f3516" strokeWidth="2.5" />
        <rect x="35" y="77" width="50" height="8" rx="2" fill="#bd6431" stroke="#4f3516" strokeWidth="2.5" />
        <ellipse cx="60" cy="77" rx="20" ry="3" fill="#6a4c33" />
        
        {/* Thân cây */}
        <path d="M60 77 V40" stroke="#63982e" strokeWidth="5.5" strokeLinecap="round" />
        
        {/* Cánh hoa vàng nở rộ xếp thành vòng tròn */}
        <g fill="#ffcb45" stroke="#4f3516" strokeWidth="2.5">
          <path d="M60 40 C53 20 67 20 60 40 Z" />
          <path d="M60 40 C78 30 78 45 60 40 Z" />
          <path d="M60 40 C67 60 53 60 60 40 Z" />
          <path d="M60 40 C42 45 42 30 60 40 Z" />
          <path d="M60 40 C46 25 56 16 60 40 Z" />
          <path d="M60 40 C74 25 64 16 60 40 Z" />
          <path d="M60 40 C74 55 64 64 60 40 Z" />
          <path d="M60 40 C46 55 56 64 60 40 Z" />
        </g>
        
        {/* Nhụy hoa hồng rực rỡ ở giữa */}
        <circle cx="60" cy="40" r="12" fill="#f58fb1" stroke="#4f3516" strokeWidth="2.5" />
        {/* Điểm lấp lánh */}
        <circle cx="56" cy="36" r="2.5" fill="white" />
        
        {/* Các ngôi sao phát sáng xung quanh */}
        <polygon points="25,25 28,29 32,29 29,32 30,36 26,34 22,36 23,32 20,29 24,29" fill="#ffcb45" />
        <polygon points="95,35 97,37 99,37 97,39 98,41 95,40 92,41 93,39 91,37 93,37" fill="#ffcb45" />
      </svg>
    </div>
  )
}

// Hoa buồn khi thanh toán hết hạn / lỗi
function PendingOrExpiredFlower() {
  return (
    <div className="w-32 h-32 flex items-center justify-center animate-bloom-sway">
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
        {/* Chậu hoa */}
        <path d="M35 70 L38 90 H62 L65 70 Z" fill="#d77a44" stroke="#4f3516" strokeWidth="2.5" />
        <rect x="30" y="62" width="40" height="8" rx="2" fill="#bd6431" stroke="#4f3516" strokeWidth="2.5" />
        {/* Thân cây nghiêng nhẹ */}
        <path d="M50 62 Q45 45 42 35" stroke="#82bf47" strokeWidth="4.5" strokeLinecap="round" />
        {/* Bông hoa rũ xuống */}
        <g transform="translate(42, 35) rotate(15)">
          <circle cx="0" cy="0" r="10" fill="#a5b4fc" stroke="#4f3516" strokeWidth="2" />
          <circle cx="0" cy="0" r="5" fill="#818cf8" stroke="#4f3516" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  )
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const token = useAppSelector(selectAuthToken)

  const orderCodeStr = searchParams.get('orderCode')
  const orderCode = orderCodeStr ? parseInt(orderCodeStr, 10) : null

  const [statusData, setStatusData] = useState<OrderStatusResponse | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(() => {
    return orderCode ? null : 'Không tìm thấy mã đơn hàng cần xác thực.'
  })
  const [loading, setLoading] = useState(() => !!orderCode)
  const [pollCount, setPollCount] = useState(0)

  // Polling API kiểm tra trạng thái đơn hàng
  useEffect(() => {
    if (!orderCode) {
      return
    }

    if (!isAuthenticated || !token) {
      // Đợi cho đến khi trạng thái xác thực sẵn sàng
      return
    }

    let isMounted = true
    let timer: NodeJS.Timeout
    const maxAttempts = 10
    const intervalMs = 2000

    async function pollStatus() {
      try {
        const data = await fetchTopup.getOrderStatus(orderCode!)
        if (!isMounted) return

        setStatusData(data)
        
        if (data.status === 'Paid') {
          // Thanh toán thành công, fetch lại profile mới để cập nhật số coin
          try {
            const profileRes = await fetchAuth.getProfile()
            if (profileRes.isSuccess && isMounted) {
              setProfile(profileRes.data)
            }
          } catch (pe) {
            console.error('Error fetching updated profile:', pe)
          }
          setLoading(false)
        } else if (data.status !== 'Pending') {
          // Các trạng thái kết thúc khác (Cancelled, Expired)
          setLoading(false)
        } else {
          // Nếu vẫn Pending, tiếp tục poll
          if (pollCount < maxAttempts - 1) {
            setPollCount((prev) => prev + 1)
            timer = setTimeout(pollStatus, intervalMs)
          } else {
            // Đã hết số lần poll nhưng vẫn Pending
            setLoading(false)
          }
        }
      } catch (error: any) {
        if (isMounted) {
          setErrorMsg(error.message || 'Lỗi khi kiểm tra trạng thái đơn nạp.')
          setLoading(false)
        }
      }
    }

    pollStatus()

    return () => {
      isMounted = false
      if (timer) clearTimeout(timer)
    }
  }, [orderCode, isAuthenticated, token, pollCount])

  // Xử lý làm mới thủ công
  const handleManualRefresh = async () => {
    if (!orderCode) return
    try {
      setLoading(true)
      const data = await fetchTopup.getOrderStatus(orderCode)
      setStatusData(data)
      if (data.status === 'Paid') {
        const profileRes = await fetchAuth.getProfile()
        if (profileRes.isSuccess) {
          setProfile(profileRes.data)
        }
        toast.success('Xác thực thanh toán thành công!')
      } else if (data.status === 'Pending') {
        toast.info('Giao dịch vẫn đang được xử lý bởi cổng thanh toán.')
      } else {
        toast.error(`Giao dịch ở trạng thái: ${data.status}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Kiểm tra thất bại.')
    } finally {
      setLoading(false)
    }
  }

  // Giao diện khi thiếu mã đơn hàng hoặc lỗi nghiêm trọng
  if (!orderCode || errorMsg) {
    return (
      <div className="bloom-card-3d bg-[#fffdf8] p-8 max-w-lg mx-auto text-center mt-10">
        <div className="flex justify-center mb-6">
          <div className="bg-bloom-petal-soft p-4 rounded-full border-[2.5px] border-bloom-green-deep">
            <svg className="w-10 h-10 text-bloom-petal animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <h2 className="font-display font-black text-2xl mb-3 text-bloom-green-deep">Thông Tin Không Hợp Lệ</h2>
        <p className="text-sm text-bloom-green-deep/75 mb-6 leading-relaxed">
          {errorMsg || 'Không thể tìm thấy mã đơn hàng nạp coin của bạn hoặc liên kết đã bị thay đổi.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/topup" className="bloom-btn-3d bloom-btn-3d-primary px-6 py-2.5 text-xs text-bloom-green-deep">
            Quay lại cửa hàng
          </Link>
          <Link href="/" className="bloom-btn-3d bloom-btn-3d-outline px-6 py-2.5 text-xs text-bloom-green-deep">
            Về trang chủ
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 mt-10">
      <AnimatePresence mode="wait">
        
        {/* TRẠNG THÁI LOADING / POLLING */}
        {loading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bloom-card-3d bg-[#fffdf8] p-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                {/* Vòng xoay mầm cây */}
                <div className="absolute inset-0 rounded-full border-4 border-bloom-green-mid/20 border-t-bloom-green-mid animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-6 h-6 text-bloom-accent-mint animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <h2 className="font-display font-black text-2xl mb-3 text-bloom-green-deep">Đang Xác Thực Giao Dịch</h2>
            <p className="text-sm text-bloom-green-deep/75 max-w-md mx-auto mb-6 leading-relaxed">
              Chúng tôi đang kiểm tra kết quả thanh toán đơn hàng <strong className="font-bold tabular-nums">#{orderCode}</strong> từ cổng PayOS. Vui lòng giữ kết nối internet và không tắt tab này...
            </p>
            
            {/* Thanh tiến trình 3D dễ thương */}
            <div className="w-full max-w-xs mx-auto bg-bloom-green-light border-[2px] border-bloom-green-deep rounded-full h-5 overflow-hidden p-0.5 shadow-[2px_2px_0px_#4f3516] mb-2">
              <motion.div 
                className="bg-bloom-accent-mint h-full rounded-full border-[1px] border-bloom-green-deep"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(100, (pollCount + 1) * 10)}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-[10px] uppercase font-bold text-bloom-green-deep/50 tracking-wider">
              Lần quét: {pollCount + 1}/10
            </span>
          </motion.div>
        )}

        {/* TRẠNG THÁI THANH TOÁN THÀNH CÔNG (PAID) */}
        {!loading && statusData?.status === 'Paid' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="bloom-card-3d bg-[#fffdf8] p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <SuccessFlower />
            </div>

            <h2 className="font-display font-black text-3xl mb-3 text-bloom-green-deep bloom-text-shadow">
              Nạp Coin Thành Công!
            </h2>
            <p className="text-sm text-bloom-green-deep/75 max-w-md mx-auto mb-6 leading-relaxed">
              Chúc mừng! Đơn hàng <strong className="font-bold tabular-nums">#{orderCode}</strong> đã được thanh toán hoàn tất. Hệ thống đã cộng coin vào tài khoản game của bạn.
            </p>

            {/* Khối hiển thị thông tin tài khoản & Số dư mới */}
            <div className="max-w-md mx-auto bg-bloom-green-light border-[2.5px] border-bloom-green-deep rounded-2xl p-5 mb-8 shadow-[4px_4px_0px_#4f3516] text-left grid grid-cols-2 gap-4">
              <div className="border-r-[1.5px] border-bloom-green-deep/15 pr-4">
                <span className="text-[10px] uppercase font-bold text-bloom-green-deep/55 tracking-wider block mb-1">Mã đơn hàng</span>
                <span className="font-mono font-bold text-xs text-bloom-green-deep select-all">#{orderCode}</span>
              </div>
              <div className="pl-2">
                <span className="text-[10px] uppercase font-bold text-bloom-green-deep/55 tracking-wider block mb-1">Số dư coin hiện tại</span>
                <span className="font-display font-black text-lg text-bloom-green-deep flex items-center gap-1 tabular-nums">
                  {profile ? profile.currency.toLocaleString() : '---'}
                  <CoinIcon className="w-5 h-5 shrink-0" />
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topup" className="bloom-btn-3d bloom-btn-3d-primary px-8 py-3 text-xs text-bloom-green-deep w-full sm:w-auto">
                Tiếp tục nạp coin
              </Link>
              <Link href="/" className="bloom-btn-3d bloom-btn-3d-outline px-8 py-3 text-xs text-bloom-green-deep w-full sm:w-auto">
                Quay lại trang chủ
              </Link>
            </div>
          </motion.div>
        )}

        {/* TRẠNG THÁI GIAO DỊCH PENDING QUÁ HẠN (VẪN CHƯA PAID) */}
        {!loading && statusData?.status === 'Pending' && (
          <motion.div
            key="pending-timeout"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bloom-card-3d bg-[#fffdf8] p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <PendingOrExpiredFlower />
            </div>

            <h2 className="font-display font-black text-2xl mb-3 text-bloom-green-deep">Giao Dịch Đang Chờ Xử Lý</h2>
            <p className="text-xs sm:text-sm text-bloom-green-deep/75 max-w-md mx-auto mb-6 leading-relaxed">
              Chúng tôi chưa nhận được phản hồi thanh toán thành công của đơn hàng <strong className="font-bold">#{orderCode}</strong> từ ngân hàng. Nếu bạn đã chuyển khoản, giao dịch có thể cần vài phút để cập nhật.
            </p>

            <div className="max-w-md mx-auto bg-bloom-green-light border-[2px] border-bloom-green-deep rounded-xl p-4 mb-6 text-left text-xs text-bloom-green-deep/80 space-y-2">
              <p>• <strong>Bạn đã chuyển khoản?</strong> Vui lòng click vào nút &quot;Làm mới kết quả&quot; bên dưới để kiểm tra lại.</p>
              <p>• <strong>Lỗi kết nối?</strong> Nếu tài khoản ngân hàng của bạn đã bị trừ tiền mà coin chưa vào game sau 10 phút, vui lòng chụp màn hình giao dịch và liên hệ Fanpage CHẠM Flora để được hỗ trợ thủ công.</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={handleManualRefresh}
                className="bloom-btn-3d bloom-btn-3d-primary px-6 py-2.5 text-xs text-bloom-green-deep w-full sm:w-auto"
              >
                Làm mới kết quả
              </button>
              <Link href="/topup" className="bloom-btn-3d bloom-btn-3d-outline px-6 py-2.5 text-xs text-bloom-green-deep w-full sm:w-auto">
                Quay lại nạp coin
              </Link>
            </div>
          </motion.div>
        )}

        {/* TRẠNG THÁI ĐƠN HÀNG HẾT HẠN (EXPIRED) HOẶC BỊ HỦY (CANCELLED) */}
        {!loading && statusData && statusData.status !== 'Paid' && statusData.status !== 'Pending' && (
          <motion.div
            key="failed"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bloom-card-3d bg-[#fffdf8] p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <PendingOrExpiredFlower />
            </div>

            <h2 className="font-display font-black text-2xl mb-3 text-bloom-green-deep">
              {statusData.status === 'Expired' ? 'Đơn Hàng Đã Hết Hạn' : 'Đơn Hàng Bị Hủy'}
            </h2>
            <p className="text-xs sm:text-sm text-bloom-green-deep/75 max-w-md mx-auto mb-6 leading-relaxed">
              Rất tiếc, đơn hàng nạp coin <strong className="font-bold">#{orderCode}</strong> đã ở trạng thái: 
              <span className="font-extrabold text-bloom-petal ml-1">
                {statusData.status === 'Expired' ? 'HẾT HẠN (15 Phút)' : 'ĐÃ HỦY'}
              </span>.
              Nếu bạn chưa thực hiện thanh toán, vui lòng quay lại cửa hàng để tạo một đơn hàng mới.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/topup" className="bloom-btn-3d bloom-btn-3d-primary px-6 py-2.5 text-xs text-bloom-green-deep w-full sm:w-auto">
                Tạo đơn hàng mới
              </Link>
              <Link href="/" className="bloom-btn-3d bloom-btn-3d-outline px-6 py-2.5 text-xs text-bloom-green-deep w-full sm:w-auto">
                Về trang chủ
              </Link>
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  )
}

export default function PaymentSuccessPage() {
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
              href="/topup" 
              className="bloom-btn-3d bloom-btn-3d-outline px-5 py-2 text-xs"
            >
              Quay lại nạp coin
            </Link>
          </div>
        </header>

        {/* Bọc nội dung trong Suspense để tránh build error với useSearchParams */}
        <Suspense fallback={
          <div className="max-w-2xl mx-auto px-6 mt-20 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-bloom-green-mid border-t-transparent"></div>
            <p className="mt-4 text-sm text-bloom-green-deep/60">Đang tải thông tin đơn hàng...</p>
          </div>
        }>
          <PaymentSuccessContent />
        </Suspense>
      </main>
    </ChamBloomMotionProvider>
  )
}
