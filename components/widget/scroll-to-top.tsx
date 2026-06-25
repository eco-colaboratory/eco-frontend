'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Theo dõi vị trí cuộn để ẩn/hiện nút
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  // Cuộn mượt lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          type="button"
          aria-label="Cuộn lên đầu trang"
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border-[2.5px] border-bloom-green-deep bg-bloom-gold text-bloom-green-deep cursor-pointer transition-all duration-150 select-none shadow-[0_4px_0_#4f3516] hover:translate-y-[1.5px] hover:shadow-[0_2.5px_0_#4f3516] active:translate-y-[4px] active:shadow-[0_0px_0_#4f3516] focus-visible:outline-3 focus-visible:outline-dashed focus-visible:outline-bloom-green-deep focus-visible:outline-offset-4"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.5px] animate-pulse" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
