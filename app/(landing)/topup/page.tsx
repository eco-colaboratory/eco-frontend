/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { useAppSelector } from '@/lib/redux/hooks'
import { selectIsAuthenticated, selectAuthToken } from '@/lib/redux/slices/authSlice'
import { AuthModal } from '@/components/widget/auth'
import { fetchTopup, type CoinPackage } from '@/lib/api/services/fetchTopup'
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

// Các hình vẽ SVG biểu tượng cho các gói coin
function PackageVisual({ amount }: { amount: number }) {
  if (amount <= 200) {
    // Gói nhỏ: Mầm cây nhỏ xinh 2 lá mầm
    return (
      <div className="w-24 h-24 flex items-center justify-center animate-bloom-sway">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Chậu đất nung */}
          <path d="M35 70 L40 90 H60 L65 70 Z" fill="#d77a44" stroke="#4f3516" strokeWidth="2.5" />
          <rect x="30" y="62" width="40" height="8" rx="2" fill="#bd6431" stroke="#4f3516" strokeWidth="2.5" />
          {/* Đất */}
          <ellipse cx="50" cy="62" rx="16" ry="3" fill="#6a4c33" />
          {/* Thân cây */}
          <path d="M50 62 V35" stroke="#82bf47" strokeWidth="4" strokeLinecap="round" />
          {/* Lá trái */}
          <path d="M50 48 Q35 45 42 35 Q50 42 50 48 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Lá phải */}
          <path d="M50 42 Q65 38 58 28 Q50 35 50 42 Z" fill="#9bd65d" stroke="#4f3516" strokeWidth="2.5" strokeLinejoin="round" />
          {/* Hạt bụi sáng lấp lánh */}
          <circle cx="28" cy="40" r="2" fill="#ffcb45" />
          <circle cx="72" cy="50" r="3" fill="#ffcb45" />
        </svg>
      </div>
    )
  } else if (amount <= 500) {
    // Gói vừa: Chậu hoa hồng cánh sen hé nở
    return (
      <div className="w-24 h-24 flex items-center justify-center animate-bloom-sway">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Chậu đất nung */}
          <path d="M32 68 L38 90 H62 L68 68 Z" fill="#d77a44" stroke="#4f3516" strokeWidth="2.5" />
          <rect x="27" y="60" width="46" height="8" rx="2" fill="#bd6431" stroke="#4f3516" strokeWidth="2.5" />
          {/* Đất */}
          <ellipse cx="50" cy="60" rx="19" ry="3" fill="#6a4c33" />
          {/* Thân cây */}
          <path d="M50 60 V30" stroke="#63982e" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M50 45 Q38 42 42 36" stroke="#63982e" strokeWidth="3" strokeLinecap="round" />
          <path d="M50 38 Q62 36 58 30" stroke="#63982e" strokeWidth="3" strokeLinecap="round" />
          {/* Lá xanh */}
          <path d="M42 36 Q30 30 38 24 Q44 28 42 36 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2" strokeLinejoin="round" />
          <path d="M58 30 Q70 24 62 18 Q56 22 58 30 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2" strokeLinejoin="round" />
          {/* Nụ hoa hồng nở */}
          <circle cx="50" cy="22" r="11" fill="#f58fb1" stroke="#4f3516" strokeWidth="2.5" />
          <path d="M44 22 C44 14 56 14 56 22 C56 30 44 30 44 22 Z" fill="#e27a9d" stroke="#4f3516" strokeWidth="1.5" />
          <path d="M47 22 C47 18 53 18 53 22" stroke="#4f3516" strokeWidth="1.5" fill="none" />
          {/* Hạt bụi sáng */}
          <circle cx="20" cy="25" r="3" fill="#ffcb45" />
          <circle cx="80" cy="35" r="2" fill="#ffcb45" />
        </svg>
      </div>
    )
  } else if (amount <= 1000) {
    // Gói lớn: Hoa hướng dương nở rộ vàng rực
    return (
      <div className="w-24 h-24 flex items-center justify-center animate-bloom-float">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
          {/* Chậu cỏ xanh ở đáy */}
          <path d="M20 75 C35 70 65 70 80 75 L75 92 H25 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2.5" />
          <path d="M22 75 Q50 64 78 75" stroke="#4f3516" strokeWidth="2.5" fill="none" />
          {/* Thân cây hoa */}
          <path d="M50 72 V25" stroke="#63982e" strokeWidth="5" strokeLinecap="round" />
          <path d="M50 50 Q36 44 40 38" stroke="#63982e" strokeWidth="3" strokeLinecap="round" />
          {/* Lá to */}
          <path d="M40 38 Q25 32 35 24 Q43 28 40 38 Z" fill="#82bf47" stroke="#4f3516" strokeWidth="2" strokeLinejoin="round" />
          {/* Bông hoa hướng dương to */}
          {/* Cánh hoa vàng xung quanh */}
          <g fill="#ffcb45" stroke="#4f3516" strokeWidth="2">
            <path d="M50 25 C45 10 55 10 50 25 Z" />
            <path d="M50 25 C65 20 65 30 50 25 Z" />
            <path d="M50 25 C55 40 45 40 50 25 Z" />
            <path d="M50 25 C35 30 35 20 50 25 Z" />
            <path d="M50 25 C39 14 49 7 50 25 Z" />
            <path d="M50 25 C61 14 51 7 50 25 Z" />
            <path d="M50 25 C61 36 51 43 50 25 Z" />
            <path d="M50 25 C39 36 49 43 50 25 Z" />
          </g>
          {/* Nhụy hoa nâu ở giữa */}
          <circle cx="50" cy="25" r="9" fill="#4f3516" stroke="#4f3516" strokeWidth="2" />
          <circle cx="48" cy="23" r="1.5" fill="#e3a11d" />
          <circle cx="52" cy="27" r="1.5" fill="#e3a11d" />
          {/* Bụi lấp lánh */}
          <polygon points="15,40 18,43 15,46 12,43" fill="#ffcb45" />
          <polygon points="85,20 87,22 85,24 83,22" fill="#ffcb45" />
        </svg>
      </div>
    )
  } else {
    // Gói cực đại: Một khu vườn nhỏ sinh động (Bento Box thu nhỏ)
    return (
      <div className="w-28 h-28 flex items-center justify-center animate-bloom-bounce-glow">
        <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
          {/* Khối nền đất 3D */}
          <path d="M15 80 L60 60 L105 80 L60 100 Z" fill="#6a4c33" stroke="#4f3516" strokeWidth="2.5" />
          <path d="M15 80 V92 L60 112 V100 Z" fill="#4e3521" stroke="#4f3516" strokeWidth="2.5" />
          <path d="M60 100 V112 L105 92 V80 Z" fill="#3c2818" stroke="#4f3516" strokeWidth="2.5" />
          {/* Thảm cỏ xanh ở trên mặt đất */}
          <path d="M15 80 L60 60 L105 80 L60 100 Z" fill="#82bf47" />
          <path d="M15 80 L60 60 L105 80" stroke="#4f3516" strokeWidth="1.5" />
          {/* Cây hoa 1 (đỏ hồng) ở bên trái */}
          <path d="M42 70 V42" stroke="#63982e" strokeWidth="3" />
          <path d="M42 55 Q32 50 36 45 M42 62 Q50 58 48 53" stroke="#63982e" strokeWidth="2" />
          <circle cx="42" cy="38" r="7" fill="#f58fb1" stroke="#4f3516" strokeWidth="2" />
          <circle cx="42" cy="38" r="3" fill="#ffcb45" />
          {/* Cây hoa 2 (vàng hướng dương) ở giữa nhô cao */}
          <path d="M60 65 V28" stroke="#63982e" strokeWidth="4.5" />
          <path d="M60 48 Q48 42 52 35" stroke="#63982e" strokeWidth="2" />
          <circle cx="60" cy="22" r="10" fill="#ffcb45" stroke="#4f3516" strokeWidth="2" />
          <circle cx="60" cy="22" r="4.5" fill="#4f3516" />
          {/* Cây hoa 3 (mầm cây xanh) ở bên phải */}
          <path d="M78 72 V50" stroke="#82bf47" strokeWidth="3.5" />
          <path d="M78 58 Q88 52 83 46 Q78 52 78 58 Z" fill="#9bd65d" stroke="#4f3516" strokeWidth="2" />
          {/* Một chú bướm nhỏ bay phía trên */}
          <path d="M85 30 Q92 20 88 15 Q82 22 85 30 Z" fill="#f58fb1" stroke="#4f3516" strokeWidth="1.5" />
          <path d="M91 30 Q84 20 88 15 Q94 22 91 30 Z" fill="#f58fb1" stroke="#4f3516" strokeWidth="1.5" />
          {/* Điểm lấp lánh */}
          <circle cx="25" cy="30" r="3.5" fill="#ffcb45" className="animate-pulse" />
          <circle cx="95" cy="50" r="2" fill="#ffcb45" />
        </svg>
      </div>
    )
  }
}

export default function TopupPage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const token = useAppSelector(selectAuthToken)

  const [authOpen, setAuthOpen] = useState(false)
  const [packages, setPackages] = useState<CoinPackage[]>([])
  const [profile, setProfile] = useState<UserProfile | null>(null)
  
  const [loadingPackages, setLoadingPackages] = useState(true)
  const [loadingProfile, setLoadingProfile] = useState(false)
  const [submittingId, setSubmittingId] = useState<string | null>(null)

  // Fetch danh sách gói coin
  useEffect(() => {
    async function loadPackages() {
      try {
        setLoadingPackages(true)
        const data = await fetchTopup.getPackages()
        setPackages(data)
      } catch (error: any) {
        toast.error(error.message || 'Không thể tải danh sách gói nạp. Vui lòng thử lại.')
      } finally {
        setLoadingPackages(false)
      }
    }
    loadPackages()
  }, [])

  // Fetch thông tin profile khi token / auth thay đổi
  useEffect(() => {
    async function loadProfile() {
      if (!isAuthenticated || !token) {
        setProfile(null)
        return
      }
      try {
        setLoadingProfile(true)
        const res = await fetchAuth.getProfile()
        if (res.isSuccess && res.data) {
          setProfile(res.data)
        }
      } catch (error: any) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoadingProfile(false)
      }
    }
    loadProfile()
  }, [isAuthenticated, token])

  // Xử lý tạo đơn nạp coin
  const handleTopup = async (packageId: string) => {
    if (!isAuthenticated) {
      setAuthOpen(true)
      toast.info('Vui lòng đăng nhập để tiến hành nạp coin.')
      return
    }

    try {
      setSubmittingId(packageId)
      const data = await fetchTopup.createOrder(packageId)
      toast.success('Đang chuyển hướng tới trang thanh toán PayOS...')
      // Chuyển hướng người dùng sang trang thanh toán của PayOS
      window.location.assign(data.checkoutUrl)
    } catch (error: any) {
      toast.error(error.message || 'Tạo đơn hàng thất bại. Vui lòng thử lại.')
      setSubmittingId(null)
    }
  }

  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page min-h-screen bg-bloom-cream text-bloom-green-deep font-sans pb-20 overflow-x-hidden">
        
        {/* Header Tối Giản Chuyên Dụng Cho Topup */}
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
            
            <div className="flex items-center gap-4">
              <Link 
                href="/" 
                className="hidden sm:inline-flex bloom-btn-3d bloom-btn-3d-outline px-5 py-2 text-xs"
              >
                Quay lại trang chủ
              </Link>
              
              {isAuthenticated && profile ? (
                <div className="flex items-center gap-3">
                  <div className="bg-[#fffdf8] border-[2px] border-bloom-green-deep rounded-full px-4 py-1.5 flex items-center gap-2 shadow-[2px_2px_0px_#4f3516]">
                    <CoinIcon className="w-5 h-5 shrink-0" />
                    <span className="font-bold text-xs tabular-nums text-bloom-green-deep">
                      {profile.currency.toLocaleString()}
                    </span>
                  </div>
                  <span className="font-bold text-xs text-bloom-green-deep/80 hidden md:inline">
                    Chào, {profile.username}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAuthOpen(true)}
                  className="bloom-btn-3d bloom-btn-3d-petal px-5 py-2 text-xs text-white"
                >
                  Đăng nhập
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 mt-10">
          
          {/* Màn Banner Giới thiệu Nạp Coin */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-bloom-green-deep mt-2 mb-4 bloom-text-shadow">
                Nạp Coin Vào Game <span className="bloom-headline-accent font-black">CHẠM Flora</span>
              </h1>
              <p className="max-w-2xl mx-auto text-sm sm:text-base text-bloom-green-deep/75 font-medium leading-relaxed text-wrap-balance">
                Quy đổi tiền thật (VNĐ) sang Coin ảo để trồng thêm nhiều loại hoa quý hiếm, mua sắm đồ trang trí sân vườn và nâng cấp khu vườn sinh thái ảo của riêng bạn.
              </p>
            </motion.div>
          </div>

          {/* Khối Trạng thái tài khoản người chơi */}
          <div className="mb-12">
            {!isAuthenticated ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bloom-card-3d bg-[#fffdf8] p-6 text-center max-w-xl mx-auto"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-bloom-petal-soft p-3 rounded-full border-[2px] border-bloom-green-deep">
                    <svg className="w-8 h-8 text-bloom-petal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <h3 className="font-display font-extrabold text-lg mb-2 text-bloom-green-deep">Bạn Chưa Đăng Nhập</h3>
                <p className="text-xs sm:text-sm text-bloom-green-deep/70 mb-5 max-w-md mx-auto">
                  Hãy đăng nhập bằng tài khoản game CHẠM Flora hiện có để xem số dư coin hiện tại và liên kết đơn hàng nạp coin vào đúng tài khoản của bạn.
                </p>
                <button
                  onClick={() => setAuthOpen(true)}
                  className="bloom-btn-3d bloom-btn-3d-primary px-8 py-3 text-xs w-full sm:w-auto"
                >
                  Đăng nhập ngay
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bloom-card-3d bg-[#fffdf8] p-6 max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6"
              >
                <div className="flex items-center gap-4 text-center sm:text-left">
                  <div className="w-14 h-14 bg-bloom-green-mid/10 border-[2px] border-bloom-green-deep rounded-full flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#4f3516]">
                    <span className="font-display font-black text-lg text-bloom-green-mid uppercase">
                      {profile?.username ? profile.username[0] : 'U'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-black text-lg text-bloom-green-deep">
                      {profile?.firstName && profile?.lastName 
                        ? `${profile.firstName} ${profile.lastName}` 
                        : profile?.username || 'Người chơi'}
                    </h3>
                    <p className="text-xs text-bloom-green-deep/60 mt-0.5">
                      Email: {profile?.email || 'Chưa cập nhật'} | Cấp độ: <span className="font-bold">{profile?.level ?? 1}</span>
                    </p>
                  </div>
                </div>
                
                <div className="bg-bloom-green-light border-[2.5px] border-bloom-green-deep rounded-2xl px-6 py-4 flex items-center gap-4 shadow-[4px_4px_0px_#4f3516] w-full sm:w-auto justify-center sm:justify-start">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-bloom-green-deep/50 tracking-wider">Số Coin Hiện Có</div>
                    <div className="font-display font-black text-2xl text-bloom-green-deep flex items-center gap-2 tabular-nums">
                      {loadingProfile ? (
                        <span className="h-6 w-20 bg-bloom-green-deep/10 animate-pulse rounded"></span>
                      ) : (
                        profile?.currency.toLocaleString() ?? '0'
                      )}
                      <CoinIcon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Phần Chọn gói Coin */}
          <h2 className="font-display font-black text-2xl text-center mb-8 bloom-text-shadow">
            Chọn Gói Coin Bạn Muốn Nạp
          </h2>

          {loadingPackages ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bloom-card-3d bg-[#fffdf8] p-6 h-80 flex flex-col justify-between animate-pulse">
                  <div className="h-6 bg-bloom-green-deep/10 rounded w-2/3"></div>
                  <div className="h-28 bg-bloom-green-deep/5 rounded-full w-28 mx-auto my-4"></div>
                  <div className="h-5 bg-bloom-green-deep/10 rounded w-1/2 mx-auto"></div>
                  <div className="h-10 bg-bloom-green-deep/10 rounded-full w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {packages.map((pkg) => {
                const isSubmitting = submittingId === pkg.id
                return (
                  <motion.div
                    key={pkg.id}
                    className="bloom-card-3d bloom-card-3d-interactive bg-[#fffdf8] p-6 flex flex-col justify-between items-center text-center relative overflow-hidden h-[360px]"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    {/* Bối cảnh hạt nhạt màu xung quanh */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bloom-green-light/10 pointer-events-none" />

                    <div>
                      {/* Tiêu đề gói coin */}
                      <h3 className="font-display font-black text-2xl text-bloom-green-deep flex items-center justify-center gap-1.5">
                        <span className="tabular-nums">{pkg.coinAmount.toLocaleString()}</span>
                        <span className="text-sm font-extrabold uppercase text-bloom-green-deep/60">Coin</span>
                      </h3>
                      
                      {/* Huy hiệu/Tag phụ */}
                      <span className="bloom-tag-chip mt-2.5 inline-block text-[10px] font-bold py-0.5 px-2 bg-bloom-green-light border-bloom-green-mid/20">
                        {pkg.coinAmount >= 2000 ? 'Siêu Hời 🔥' : pkg.coinAmount >= 1000 ? 'Phổ biến ⭐' : 'Khởi đầu'}
                      </span>
                    </div>

                    {/* Ảnh minh họa SVG động */}
                    <div className="my-3 flex items-center justify-center h-32 w-full">
                      <PackageVisual amount={pkg.coinAmount} />
                    </div>

                    <div className="w-full">
                      {/* Giá tiền Việt Nam */}
                      <div className="font-display font-black text-lg text-bloom-green-deep/90 mb-4 tabular-nums">
                        {pkg.priceVnd.toLocaleString('vi-VN')} VNĐ
                      </div>

                      {/* Nút nạp */}
                      <button
                        onClick={() => handleTopup(pkg.id)}
                        disabled={submittingId !== null}
                        className="bloom-btn-3d bloom-btn-3d-primary w-full py-2.5 text-xs text-bloom-green-deep disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4 stroke-bloom-green-deep fill-none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            Đang kết nối...
                          </span>
                        ) : (
                          'Nạp Ngay'
                        )}
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}

          {/* Hướng dẫn & Lưu ý nạp coin (Bento Card Layout) */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bloom-card-3d bg-[#fffdf8] p-6 md:col-span-2">
              <h3 className="font-display font-black text-lg mb-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-bloom-accent-mint text-white text-xs font-bold">!</span>
                Hướng Dẫn Các Bước Nạp Coin
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-bloom-green-deep/80">
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-green-mid/20 text-xs font-bold text-bloom-green-deep">1</span>
                  <p><strong>Đăng nhập tài khoản game:</strong> Đăng nhập đúng tài khoản mà bạn chơi trên điện thoại / máy tính để Coin được đồng bộ ngay lập tức.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-green-mid/20 text-xs font-bold text-bloom-green-deep">2</span>
                  <p><strong>Chọn gói nạp và xác nhận đơn:</strong> Nhấp vào nút &quot;Nạp Ngay&quot; ở gói coin mong muốn. Hệ thống sẽ tạo hóa đơn và tự động chuyển hướng bạn tới cổng thanh toán an toàn PayOS.</p>
                </div>
                <div className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-bloom-green-mid/20 text-xs font-bold text-bloom-green-deep">3</span>
                  <p><strong>Thực hiện chuyển khoản:</strong> Sử dụng ứng dụng ngân hàng quét mã QR hiển thị trên cổng PayOS hoặc chuyển khoản đúng số tiền và nội dung. Hệ thống sẽ tự động cộng coin vào tài khoản game của bạn ngay khi giao dịch thành công.</p>
                </div>
              </div>
            </div>

            <div className="bloom-card-3d bg-bloom-petal-soft border-bloom-petal/30 p-6">
              <h3 className="font-display font-black text-lg mb-4 text-bloom-green-deep flex items-center gap-2">
                <svg className="w-5 h-5 text-bloom-petal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Lưu Ý Quan Trọng
              </h3>
              <ul className="list-disc list-inside space-y-3 text-xs text-bloom-green-deep/80 font-medium">
                <li>
                  Link thanh toán PayOS chỉ có hiệu lực trong vòng <strong>15 phút</strong>. Quá 15 phút, đơn nạp sẽ tự hết hạn.
                </li>
                <li>
                  Mỗi link thanh toán chỉ được sử dụng <strong>đúng 1 lần</strong>. Tuyệt đối không chuyển khoản lại vào thông tin cũ.
                </li>
                <li>
                  Coin sẽ được cộng tự động vào game thông qua cơ chế Webhook an toàn từ PayOS đến máy chủ game.
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Modal đăng nhập */}
        <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      </main>
    </ChamBloomMotionProvider>
  )
}
