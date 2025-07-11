'use client'

import { useTransition, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import { Trash2, Loader2 } from 'lucide-react'

type Props = {
  ids: string[]
  onDeleted?: () => void
}

export function BulkDeleteVideoButton({ ids, onDeleted }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/post-video/bulk-delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids }),
        })

        if (!res.ok) throw new Error()

        toast.success(`${ids.length} episode berhasil dihapus`)
        setOpen(false)
        onDeleted?.()
      } catch {
        toast.error('Gagal melakukan bulk delete')
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm" className="mb-4">
          <Trash2 className="w-4 h-4 mr-2" />
          Hapus yang Dipilih ({ids.length})
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Semua Episode Terpilih?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Ini akan menghapus <b>{ids.length}</b> episode secara permanen dari database.
            Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Ya, Hapus Semua'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
