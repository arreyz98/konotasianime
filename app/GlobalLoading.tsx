'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

export default function GlobalLoading() {
  const pathname = usePathname()
  const [show, setShow] = useState(false)

  useEffect(() => {
    let mounted = true

    // Tampilkan loading langsung
    setShow(true)

    // Minimal delay 200ms
    const minDelay = setTimeout(() => {
      if (mounted) setShow(false)
    }, 400) // 200ms + 200ms animasi kira-kira

    return () => {
      mounted = false
      clearTimeout(minDelay)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="global-loading"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3 text-white"
          >
            <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent animate-spin" />
            <p className="text-sm animate-pulse">Loading...</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
