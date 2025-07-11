'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

type Props = {
  currentPage: number
  totalPages: number
  onPageChangeAction: (page: number) => void
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChangeAction,
}: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPage])

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  const handlePrev = () => {
    if (currentPage > 1) onPageChangeAction(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChangeAction(currentPage + 1)
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
      <Button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="bg-zinc-800 text-white border border-zinc-700 hover:bg-[#4C6E49] hover:text-white disabled:opacity-50"
      >
        « Prev
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          onClick={() => onPageChangeAction(page)}
          className={`px-4 py-2 text-sm rounded-md transition
            ${page === currentPage
              ? 'bg-[#4C6E49] text-white hover:bg-[#3a5a37]'
              : 'bg-zinc-800 text-white border border-zinc-700 hover:bg-[#4C6E49]'}
          `}
        >
          {page}
        </Button>
      ))}

      <Button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="bg-zinc-800 text-white border border-zinc-700 hover:bg-[#4C6E49] hover:text-white disabled:opacity-50"
      >
        Next »
      </Button>
    </div>
  )
}
