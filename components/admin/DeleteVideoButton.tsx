'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  id: string
  onDeleted?: () => void // Callback setelah berhasil dihapus
}

export function DeleteVideoButton({ id, onDeleted }: Props) {
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    const confirmed = window.confirm('Yakin ingin menghapus video ini?')

    if (!confirmed) return

    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/post-video/${id}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error()

        toast.success('Episode berhasil dihapus.')
        onDeleted?.()
      } catch {
        toast.error('Gagal menghapus episode.')
      }
    })
  }

  return (
    <Button
      onClick={handleDelete}
      size="sm"
      variant="destructive"
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </Button>
  )
}
