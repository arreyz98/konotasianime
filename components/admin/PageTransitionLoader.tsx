'use client'

import { useEffect, useState} from 'react'
import { usePathname } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function PageTransitionLoader() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 800) // durasi loading

    return () => clearTimeout(timeout)
  }, [pathname])

  if (!loading) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/60 z-40">
      <Loader2 className="w-6 h-6 text-white animate-spin" />
    </div>
  )
}