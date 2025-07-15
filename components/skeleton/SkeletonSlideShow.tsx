'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils' // opsional util Tailwind class merge

function ShimmerBox({ className }: { className: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded bg-zinc-800', className)}>
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  )
}

export default function SlideshowSkeleton() {
  return (
    <div className="relative h-[32.25vw] w-full bg-black overflow-hidden">
      <div className="flex flex-col md:flex-row h-full">
        {/* Text Area */}
        <div className="md:w-[70%] p-6 md:p-12 flex flex-col justify-center space-y-4">
          <ShimmerBox className="h-10 md:h-16 w-3/4" />
          <ShimmerBox className="h-4 w-full" />
          <ShimmerBox className="h-4 w-5/6" />
          <ShimmerBox className="h-4 w-2/3" />
        </div>

        {/* Image Area */}
        <div className="relative w-full md:w-[30%] h-[300px] md:h-[620px] bg-zinc-900">
          <ShimmerBox className="w-full h-full" />
        </div>
      </div>

      {/* Thumbnail dots */}
      <div className="hidden sm:flex absolute space-x-4 bottom-8 ml-4 md:ml-20 z-30">
        {Array.from({ length: 4 }).map((_, idx) => (
          <ShimmerBox key={idx} className="h-[120px] w-[80px]" />
        ))}
      </div>

      {/* Counter Placeholder */}
      <ShimmerBox className="absolute top-4 right-4 px-4 py-2 w-16 rounded-full z-30" />
    </div>
  )
}
