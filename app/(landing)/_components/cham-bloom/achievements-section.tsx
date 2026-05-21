'use client'

import { useState } from 'react'
import Image from 'next/image'
import { MotionWrapper } from '../layout/motion-wrapper'
import { SectionShell } from '../layout/section-shell'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const SLIDES = [
  {
    id: 1,
    value: 'Top 5',
    label: 'Đại sứ Gen G 2025',
    description: 'E.C.O/C.H.A.M lọt vào Top 5 nhóm dự án được tài trợ bởi Panasonic Việt Nam thông qua chương trình Đại sứ Gen G 2025.',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    value: 'Á quân',
    label: 'FIP – Youth Startup',
    description: 'Dự án đạt danh hiệu Á quân tại cuộc thi FIP – Youth Startup, ghi nhận tiềm năng của mô hình game hóa hành động xanh và tác động cộng đồng.',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1000&q=80',
  },
] as const

export function AchievementsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : SLIDES.length - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev < SLIDES.length - 1 ? prev + 1 : 0))
  }

  const activeSlide = SLIDES[activeIndex]

  return (
    <SectionShell id="achievements" bg="cream" ambient>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-2 md:py-4">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Cột trái: Nút điều hướng & Thông tin thành tích đang Active */}
          <div className="col-span-12 md:col-span-5 lg:col-span-4 flex flex-col justify-center min-h-[340px] md:pr-4">
            <MotionWrapper>
              {/* Nút điều khiển slide tròn mảnh dẻ */}
              <div className="flex items-center gap-3 mb-8">
                <button
                  onClick={handlePrev}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-bloom-green-deep/30 text-bloom-green-deep hover:bg-bloom-green-deep hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Slide trước"
                >
                  <ArrowLeft className="w-5 h-5 stroke-[1.5]" />
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center justify-center w-12 h-12 rounded-full border border-bloom-green-deep/30 text-bloom-green-deep hover:bg-bloom-green-deep hover:text-white transition-all duration-300 cursor-pointer"
                  aria-label="Slide tiếp theo"
                >
                  <ArrowRight className="w-5 h-5 stroke-[1.5]" />
                </button>
              </div>

              {/* Phần text đồng bộ hóa thay đổi mượt mà theo activeIndex */}
              <div key={activeIndex} className="animate-fade-in-up flex flex-col items-start">
                {/* Badge danh vị lớn hơn và tinh tế */}
                <span className="inline-flex items-center rounded-full bg-bloom-accent-mint/15 border border-bloom-accent-mint/25 px-4.5 py-1.5 text-xs font-bold uppercase tracking-wider text-bloom-accent-mint backdrop-blur-sm shadow-sm">
                  {activeSlide.value}
                </span>

                {/* Tiêu đề thành tích */}
                <h2 className="mt-5 font-display text-3xl sm:text-4xl lg:text-4xl.5 font-extrabold tracking-tight text-bloom-green-deep leading-[1.2] max-w-md">
                  {activeSlide.label}
                </h2>

                {/* Mô tả chi tiết lấy từ PDF */}
                <p className="mt-5 text-sm sm:text-base font-light text-bloom-green-deep/75 leading-relaxed max-w-md min-h-[80px]">
                  {activeSlide.description}
                </p>
              </div>

              {/* Nút hành động */}
              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-bloom-dark text-white text-xs font-semibold uppercase tracking-wider rounded-full hover:bg-bloom-green-mid transition-all duration-300 shadow-md shadow-bloom-green-deep/15"
                >
                  Đồng hành ngay
                </a>
              </div>
            </MotionWrapper>
          </div>

          {/* Cột phải: Hình ảnh mẫu dạng NẰM NGANG và to hơn hẳn nhờ CSS Grid 8/12 */}
          <div className="col-span-12 md:col-span-7 lg:col-span-8 relative z-20 mr-2 md:mr-0">
            <MotionWrapper delay={0.2}>
              {/* Sử dụng CSS Grid để 2 hình tự động co giãn to nhất có thể và tránh lỗi ép co lề chữ */}
              {/* Bổ sung px-3 sm:px-5 để tạo khoảng đệm an toàn 2 bên rìa giúp card khi active scale và ring không bị cắt viền */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 py-4 px-3 sm:px-5 w-full">
                {SLIDES.map((slide, index) => {
                  const isActive = activeIndex === index
                  return (
                    <div
                      key={slide.id}
                      onClick={() => setActiveIndex(index)}
                      className={`relative aspect-[16/10] w-full overflow-hidden rounded-[2.2rem] bg-white/40 border cursor-pointer transition-all duration-500 ease-out shadow-lg 
                        ${isActive
                          ? 'ring-4 ring-bloom-green-mid ring-offset-2 scale-[1.02] opacity-100 z-10 border-bloom-green-mid/20 shadow-bloom-green-deep/20'
                          : 'scale-95 opacity-40 hover:opacity-75 border-white/30 hover:scale-[97%]'
                        }
                      `}
                    >
                      {/* Hình ảnh mẫu ngang chất lượng cao */}
                      <Image
                        src={slide.image}
                        alt={slide.label}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 500px"
                      />

                      {/* Lớp phủ mờ che phủ nhẹ trên ảnh */}
                      <div className={`absolute inset-0 bg-gradient-to-t from-bloom-dark/60 via-bloom-dark/10 to-transparent transition-opacity duration-300 
                        ${isActive ? 'opacity-80' : 'opacity-40'}
                      `} />

                      {/* Badge nhỏ ở góc ảnh để báo trạng thái đang active */}
                      {isActive && (
                        <div className="absolute top-4 right-4 bg-bloom-green-deep/80 text-bloom-accent-mint px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-sm shadow-sm border border-bloom-accent-mint/30 animate-fade-in-overlay">
                          Đang xem
                        </div>
                      )}

                      {/* Tên ngắn góc dưới card ảnh */}
                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <p className="text-xs font-semibold uppercase tracking-wider text-bloom-accent-mint">
                          {slide.value}
                        </p>
                        <h4 className="font-display text-sm sm:text-base font-bold truncate mt-0.5">
                          {slide.label}
                        </h4>
                      </div>
                    </div>
                  )
                })}
              </div>
            </MotionWrapper>
          </div>

        </div>
      </div>
    </SectionShell>
  )
}
