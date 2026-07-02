'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'
import apiService, { getApiUrl } from '@/lib/api/core'
import { 
  Download, 
  Monitor, 
  CheckCircle2, 
  ArrowRight, 
  Info,
  ChevronRight,
  ChevronLeft,
  X,
  Share2
} from 'lucide-react'
import { 
  ChamBloomMotionProvider, 
  Navbar, 
  SectionShell, 
  SectionHeader 
} from '@/app/(landing)/_components/layout'

const GALLERY_ITEMS = [
  { src: '/assets/game/thumnail.png', alt: 'CHẠM Flora - Trồng Vườn Ảo, Kiến Tạo Vườn Thật', isPortrait: false },
  { src: '/assets/game/ingame/1.png', alt: 'Khu Vườn Sinh Thái CHẠM Flora', isPortrait: true },
  { src: '/assets/game/ingame/2.png', alt: 'Hệ thống hoa và cây trồng thực tế', isPortrait: true },
  { src: '/assets/game/ingame/3.png', alt: 'Hành động xanh đổi phần quà thực tế ngoài đời thực', isPortrait: true },
  { src: '/assets/game/ingame/4.png', alt: 'Thành tựu và Bảng xếp hạng thi đua', isPortrait: true },
  { src: '/assets/game/ingame/5.png', alt: 'Cửa hàng hạt giống, vật phẩm và trang trí sinh thái', isPortrait: true }
]

export default function DownloadPageClient() {
  const [downloadCount, setDownloadCount] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0)

  const openLightbox = (index: number) => {
    setLightboxImageIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
  }

  const prevLightboxImage = () => {
    setLightboxImageIndex(prev => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1))
  }

  const nextLightboxImage = () => {
    setLightboxImageIndex(prev => (prev === GALLERY_ITEMS.length - 1 ? 0 : prev + 1))
  }

  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const children = Array.from(container.children) as HTMLElement[]
      if (children.length === 0) return

      const containerScrollLeft = container.scrollLeft
      
      // Tìm index của phần tử đang hiển thị chính (gần góc trái container nhất)
      let activeIndex = 0
      let minDiff = Infinity
      children.forEach((child, idx) => {
        const diff = Math.abs(child.offsetLeft - containerScrollLeft)
        if (diff < minDiff) {
          minDiff = diff
          activeIndex = idx
        }
      })

      // Xác định index tiếp theo
      let targetIndex = activeIndex
      if (direction === 'left') {
        targetIndex = Math.max(0, activeIndex - 1)
      } else {
        targetIndex = Math.min(children.length - 1, activeIndex + 1)
      }

      // Cuộn đến phần tử mục tiêu
      const targetChild = children[targetIndex]
      if (targetChild) {
        container.scrollTo({
          left: targetChild.offsetLeft - 4, // trừ đi chút gap/padding
          behavior: 'smooth'
        })
      }
    }
  }

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (isDownloading) return

    setIsDownloading(true)
    try {
      const response = await apiService.get<{
        isSuccess: boolean;
        downloadUrl: string;
        expiresAt: string;
        fileName: string;
        fileSizeMb: number;
      }>('/api/v1/game/download')

      if (response.data && response.data.isSuccess && response.data.downloadUrl) {
        let finalUrl = response.data.downloadUrl
        
        // Chuẩn hóa link tương đối từ backend sang tuyệt đối nếu cần
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
          const cleanPath = finalUrl.startsWith('/') ? finalUrl.slice(1) : finalUrl
          finalUrl = getApiUrl(cleanPath)
        }

        // Chuyển hướng trình duyệt đến link tải để tự động follow redirect 302 về file thật
        window.location.assign(finalUrl)

        setDownloadCount(prev => prev + 1)
        toast.success('Bắt đầu tải game! Vui lòng kiểm tra mục tải xuống trên trình duyệt của bạn.', {
          duration: 5000,
        })
      } else {
        throw new Error('Response format is invalid')
      }
    } catch (err) {
      console.error('Download error:', err)
      const error = err as { code?: number; message?: string; data?: { error?: string; retryAfterSeconds?: number } }
      
      // apiService ném ra đối tượng ApiError (chứa code, message, data)
      if (error.code === 429 || error.data?.error === 'Rate limit exceeded') {
        const retryAfterSeconds = error.data?.retryAfterSeconds || 3600
        const minutes = Math.ceil(retryAfterSeconds / 60)
        toast.error(`Bạn đã vượt quá giới hạn tải xuống (Tối đa 5 lượt/giờ). Vui lòng thử lại sau ${minutes} phút.`, {
          duration: 6000,
        })
      } else {
        toast.error(error.message || 'Không thể lấy liên kết tải game. Vui lòng thử lại sau.', {
          duration: 5000,
        })
      }
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <ChamBloomMotionProvider>
      <main className="cham-bloom-page min-h-screen bg-bloom-cream text-bloom-green-deep font-sans pb-20 overflow-x-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Hero Section */}
        <section id="download-hero" className="relative pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden bg-[#120c08] text-white">
          {/* Crisp background thumbnail covering the right side */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
            <Image
              src="/assets/game/thumnail.png"
              alt="Background Artwork"
              fill
              priority
              className="object-cover object-center md:object-right opacity-50 lg:opacity-75"
            />
            {/* Dark gradient overlay to ensure text contrast on the left */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#120c08] via-[#120c08]/85 to-[#120c08]/60 lg:bg-gradient-to-r lg:from-[#120c08] lg:via-[#120c08]/90 lg:to-transparent" />
          </div>

          <div className="max-w-6xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: App Title, Icon, Specs, Buttons */}
              <div className="lg:col-span-7 space-y-5 relative z-10">
                
                {/* Title and brand */}
                <div className="space-y-1.5">
                  <h1 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl leading-[1.15] tracking-tight text-white text-balance bloom-text-shadow-heavy animate-fade-in">
                    Trồng Vườn Ảo, Kiến Tạo Vườn Thật
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold">
                    <span className="text-bloom-accent-mint font-bold">CHẠM Flora Team</span>
                    <span className="text-white/30 hidden sm:inline">•</span>
                    <span className="text-white/60">Trò chơi sinh thái & Giáo dục bảo vệ môi trường</span>
                  </div>
                </div>

                {/* App Icon + Technical Specs Row */}
                <div className="flex items-center gap-6 pt-1">
                  {/* App Icon */}
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-[2px] border-bloom-green-deep shadow-[2px_2px_0px_#4f3516] bg-white shrink-0">
                    <Image
                      src="/assets/logo/icon.png"
                      alt="CHẠM Flora Icon"
                      fill
                      className="object-cover p-1.5"
                    />
                  </div>

                  {/* Vertical Divider */}
                  <div className="w-px h-10 bg-white/15" />

                  {/* Specs Columns */}
                  <div className="flex items-center gap-6 sm:gap-10 font-sans text-left">
                    <div>
                      <span className="block text-sm sm:text-base font-black text-white">Windows</span>
                      <span className="block text-[10px] text-white/50 font-bold uppercase tracking-wider mt-0.5">10/11 (64-bit)</span>
                    </div>
                    <div className="w-px h-6 bg-white/15" />
                    <div>
                      <span className="block text-sm sm:text-base font-black text-white">148 MB</span>
                      <span className="block text-[10px] text-white/50 font-bold uppercase tracking-wider mt-0.5">Dung lượng</span>
                    </div>
                    <div className="w-px h-6 bg-white/15" />
                    <div>
                      <span className="block text-sm sm:text-base font-black text-white">.exe</span>
                      <span className="block text-[10px] text-white/50 font-bold uppercase tracking-wider mt-0.5">Định dạng</span>
                    </div>
                  </div>
                </div>

                {/* Subtitle intro */}
                <p className="text-sm text-white/80 leading-relaxed max-w-2xl font-medium">
                  Tải ngay phiên bản CHẠM Flora dành cho máy tính để gieo những hạt giống xanh và kiến tạo khu vườn sinh thái ngọt ngào của riêng bạn.
                </p>

                {/* Download and Share Action buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-1">
                  <a
                    href="#"
                    onClick={handleDownloadClick}
                    className={`bloom-btn-3d bg-bloom-accent-mint border-[2.5px] border-bloom-green-deep shadow-[0_5px_0_#4f3516] hover:translate-y-[2px] hover:shadow-[0_3px_0_#4f3516] active:translate-y-[5px] active:shadow-none text-white px-8 py-3 text-sm sm:text-base font-bold rounded-full transition-all flex items-center justify-center gap-3 shrink-0 ${isDownloading ? 'opacity-60 pointer-events-none' : ''}`}
                  >
                    <Download className="w-5 h-5 animate-pulse" />
                    {isDownloading ? 'Đang chuẩn bị tải...' : 'Tải Bản Windows (.exe)'}
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success("Đã sao chép liên kết chia sẻ trang tải game!")
                    }}
                    className="bloom-btn-3d px-6 py-3 text-sm sm:text-base text-white border-[2px] border-white/20 bg-white/5 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/40 active:scale-95 transition-all"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                    <span>Chia sẻ</span>
                  </button>
                </div>

                {/* Direct download assurance */}
                <div className="text-[11px] text-white/50 font-bold flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-4 h-4 text-bloom-accent-mint" />
                  <span>Tải xuống trực tiếp an toàn 100% từ nhà phát hành</span>
                </div>

                {/* Download counter mock */}
                {downloadCount > 0 && (
                  <div className="text-[10px] text-white/50 font-bold bg-white/5 px-3 py-1 rounded-full border border-white/10 inline-block">
                    Cảm ơn bạn đã tải về! Hãy cài đặt và gieo hạt ngay nhé.
                  </div>
                )}
              </div>

              {/* Right Column: Spacer to let the background artwork show through */}
              <div className="lg:col-span-5 hidden lg:block" />
            </div>

          </div>
        </section>

        {/* Screenshots and Content Rating Section */}
        <SectionShell id="download-media" bg="cream" className="py-12 border-t border-bloom-green-deep/10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Visual Carousel (only vertical in-game screenshots) */}
              <div className="lg:col-span-8 flex flex-col w-full">
                {/* Heading */}
                <div className="flex justify-between items-center mb-4 px-1">
                  <span className="text-[10px] font-bold text-bloom-green-deep/50 uppercase tracking-widest">
                    Hình ảnh trải nghiệm ingame
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleScroll('left')}
                      className="bloom-btn-3d bloom-btn-3d-outline p-1.5 rounded-full text-bloom-green-deep bg-[#fffdf8] shadow-sm hover:scale-105 transition-transform"
                      aria-label="Cuộn sang trái"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleScroll('right')}
                      className="bloom-btn-3d bloom-btn-3d-outline p-1.5 rounded-full text-bloom-green-deep bg-[#fffdf8] shadow-sm hover:scale-105 transition-transform"
                      aria-label="Cuộn sang phải"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Container trượt ngang các ảnh */}
                <div 
                  ref={scrollContainerRef}
                  className="flex gap-4 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory scrollbar-none w-full px-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {GALLERY_ITEMS.slice(1).map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(idx + 1)}
                      className={`flex-shrink-0 relative rounded-2xl overflow-hidden border-[2.5px] border-bloom-green-deep shadow-[4px_4px_0px_#4f3516] cursor-zoom-in group snap-start transition-transform duration-300 hover:scale-[1.02] bg-bloom-green-light/10 ${
                        item.isPortrait 
                          ? 'h-[300px] sm:h-[350px] aspect-[9/16]' 
                          : 'h-[300px] sm:h-[350px] aspect-[16/9]'
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes={item.isPortrait ? "250px" : "600px"}
                        className="object-cover"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-bloom-green-deep/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="text-white text-left">
                          <p className="text-[9px] font-bold text-bloom-gold uppercase tracking-wider mb-1">Click để phóng to</p>
                          <h4 className="font-display font-bold text-xs leading-snug">{item.alt}</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Content Rating advisory card */}
              <div className="lg:col-span-4 w-full lg:sticky lg:top-28">
                <div className="bloom-card-3d bg-[#fffdf8] p-6 border-bloom-green-deep/15">
                  <div className="flex items-center gap-4 pb-4 border-b border-bloom-green-deep/10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bloom-accent-mint border-[2.5px] border-bloom-green-deep text-base font-black text-white shadow-[2.5px_2.5px_0px_#4f3516] shrink-0">
                      3+
                    </div>
                    <div>
                      <h4 className="font-display font-black text-base text-bloom-green-deep">Phù hợp mọi lứa tuổi</h4>
                      <p className="text-[10px] text-bloom-green-deep/50 font-bold uppercase tracking-wider mt-0.5">Giáo dục & Giải trí</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 text-xs font-semibold text-bloom-green-deep/80">
                    <div className="flex items-start gap-3">
                      <span className="flex h-2 w-2 rounded-full bg-bloom-petal mt-1.5 shrink-0" />
                      <span>Trải nghiệm thế giới sinh thái, gieo hạt trồng hoa thực tế ảo để đổi quà thật.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-2 w-2 rounded-full bg-bloom-petal mt-1.5 shrink-0" />
                      <span>Nội dung mang tính giáo dục sâu sắc về bảo vệ môi trường và sinh thái bền vững.</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="flex h-2 w-2 rounded-full bg-bloom-accent-mint mt-1.5 shrink-0" />
                      <span>An toàn tuyệt đối cho trẻ em, không chứa các yếu tố quảng cáo độc hại.</span>
                    </div>
                  </div>

                  <div className="pt-5 border-t border-bloom-green-deep/10 mt-5 w-full text-center">
                    <Link
                      href="/#contact"
                      className="text-xs font-bold text-bloom-accent-mint hover:underline inline-flex items-center gap-1"
                    >
                      Tìm hiểu thêm về cam kết xanh
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </SectionShell>

        {/* Installation Guide Section */}
        <SectionShell id="installation-guide" bg="cream">
          <div className="max-w-6xl mx-auto px-6">
            
            <SectionHeader
              label="Cài đặt game"
              title="Hướng dẫn cài đặt"
              accent="3 bước đơn giản"
              align="center"
              description="Chỉ mất 2 phút để hoàn tất cài đặt và bước vào thế giới CHẠM Flora ngọt ngào."
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Step 1 */}
              <div className="bloom-card-3d bg-[#fffdf8] p-6 flex flex-col justify-between items-start text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-bloom-gold/5 rounded-full pointer-events-none" />
                <div>
                  {/* Step Badge */}
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bloom-gold border-[2px] border-bloom-green-deep text-sm font-black text-bloom-green-deep shadow-[2px_2px_0px_#4f3516] mb-5">
                    1
                  </div>
                  <h3 className="font-display font-black text-lg mb-2">Tải Tệp Cài Đặt</h3>
                  <p className="text-xs sm:text-sm text-bloom-green-deep/70 leading-relaxed font-medium">
                    Nhấp vào nút <strong>Tải Bản Windows</strong> phía trên. Lưu tệp tin cài đặt <code>ChamFlora_Setup.exe</code> vào máy tính của bạn (thư mục Downloads hoặc Desktop).
                  </p>
                </div>
                
                {/* Visual indicator */}
                <div className="w-full flex justify-end pt-6">
                  <ArrowRight className="w-5 h-5 text-bloom-green-deep/40" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="bloom-card-3d bg-[#fffdf8] p-6 flex flex-col justify-between items-start text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-bloom-petal-soft/10 rounded-full pointer-events-none" />
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bloom-petal border-[2px] border-bloom-green-deep text-sm font-black text-bloom-green-deep shadow-[2px_2px_0px_#4f3516] mb-5">
                    2
                  </div>
                  <h3 className="font-display font-black text-lg mb-2">Khởi Chạy Setup</h3>
                  <p className="text-xs sm:text-sm text-bloom-green-deep/70 leading-relaxed font-medium">
                    Nhấp đúp chuột vào tệp tin <code>ChamFlora_Setup.exe</code> vừa tải về. Nếu có thông báo xác nhận từ hệ thống, hãy chọn <strong>Yes</strong> hoặc <strong>Run anyway</strong> để tiến hành cài đặt.
                  </p>
                </div>
                
                {/* Visual indicator */}
                <div className="w-full flex justify-end pt-6">
                  <ArrowRight className="w-5 h-5 text-bloom-green-deep/40" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="bloom-card-3d bg-[#fffdf8] p-6 flex flex-col justify-between items-start text-left relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-bloom-accent-mint/10 rounded-full pointer-events-none" />
                <div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-bloom-accent-mint border-[2px] border-bloom-green-deep text-sm font-black text-white shadow-[2px_2px_0px_#4f3516] mb-5">
                    3
                  </div>
                  <h3 className="font-display font-black text-lg mb-2">Bắt Đầu Trải Nghiệm</h3>
                  <p className="text-xs sm:text-sm text-bloom-green-deep/70 leading-relaxed font-medium">
                    Mở game từ biểu tượng CHẠM Flora trên màn hình Desktop. Đăng nhập vào tài khoản của bạn và bắt đầu hành trình gieo hạt, kiến tạo khu vườn sinh sinh thái của bạn!
                  </p>
                </div>
                
                {/* Final status tick */}
                <div className="w-full flex justify-end pt-6">
                  <CheckCircle2 className="w-5 h-5 text-bloom-accent-mint" />
                </div>
              </div>

            </div>

          </div>
        </SectionShell>

        {/* Footer info/banner */}
        <div className="max-w-4xl mx-auto px-6 mt-12 text-center">
          <div className="bloom-card-3d bg-[#fffdf8] p-6 flex flex-col sm:flex-row items-center justify-between gap-6 border-bloom-green-deep/15">
            <div className="flex items-center gap-3 text-left">
              <div className="p-2.5 bg-bloom-green-light rounded-full border border-bloom-green-mid/10">
                <Info className="w-5 h-5 text-bloom-green-deep" />
              </div>
              <div>
                <h4 className="font-bold text-sm">Gặp lỗi trong quá trình cài đặt?</h4>
                <p className="text-xs text-bloom-green-deep/60">Đội ngũ kỹ thuật hỗ trợ 24/7. Vui lòng liên hệ Fanpage hoặc bộ phận hỗ trợ.</p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="bloom-btn-3d bloom-btn-3d-outline px-6 py-2.5 text-xs text-bloom-green-deep shrink-0 w-full sm:w-auto"
            >
              Liên Hệ Hỗ Trợ
            </Link>
          </div>
        </div>


      {/* Lightbox Modal phóng to */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bloom-green-deep/95 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
          {/* Nút đóng (overlay) */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />
          
          <div className={`relative w-full px-4 z-10 flex flex-col items-center transition-all duration-300 ${
            GALLERY_ITEMS[lightboxImageIndex].isPortrait ? 'max-w-sm' : 'max-w-4xl'
          }`}>
            {/* Nút đóng góc trên */}
            <button 
              onClick={closeLightbox}
              className="absolute -top-12 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors border border-white/10 z-20"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Ảnh phóng to chính */}
            <div className={`relative w-full rounded-2xl overflow-hidden border-[3px] border-white/20 shadow-2xl bg-black/45 transition-all duration-300 ${
              GALLERY_ITEMS[lightboxImageIndex].isPortrait ? 'aspect-[9/16] max-h-[75vh]' : 'aspect-[16/9]'
            }`}>
              <Image
                src={GALLERY_ITEMS[lightboxImageIndex].src}
                alt={GALLERY_ITEMS[lightboxImageIndex].alt}
                fill
                sizes={GALLERY_ITEMS[lightboxImageIndex].isPortrait ? "(max-w-768px) 100vw, 400px" : "1200px"}
                className="object-contain"
              />
            </div>

            {/* Điều hướng Trái/Phải */}
            <button
              onClick={prevLightboxImage}
              className="absolute left-6 sm:-left-16 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 sm:p-3 rounded-full transition-colors border border-white/10 shadow-lg z-20"
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={nextLightboxImage}
              className="absolute right-6 sm:-right-16 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 sm:p-3 rounded-full transition-colors border border-white/10 shadow-lg z-20"
              aria-label="Ảnh sau"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Caption thông tin phía dưới */}
            <div className="mt-4 text-center text-white/90 w-full px-2">
              <span className="text-[10px] font-bold text-bloom-gold uppercase tracking-widest">
                Ảnh {lightboxImageIndex + 1} / {GALLERY_ITEMS.length}
              </span>
              <p className="text-xs sm:text-sm font-semibold mt-1 drop-shadow-md">
                {GALLERY_ITEMS[lightboxImageIndex].alt}
              </p>
            </div>
          </div>
        </div>
      )}

      </main>
    </ChamBloomMotionProvider>
  )
}
