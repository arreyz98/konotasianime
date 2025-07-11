'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export function PostCreationToast() {
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('created')) {
      toast.success('Postingan berhasil dibuat!')
    }
    if (searchParams.get('updated')) {
      toast.success('Postingan berhasil diperbarui!')
    }
    if (searchParams.get('deleted')) {
    toast.success('Postingan berhasil dihapus!')
  }
  }, [searchParams])

  return null
}
