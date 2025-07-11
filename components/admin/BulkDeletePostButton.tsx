'use client'

import { useState, useTransition } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
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

type Props = {
  ids: string[]
  onDeletedAction: () => void
}

export function BulkDeletePostButton({ ids, onDeletedAction }: Props) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      setLoading(true)
      try {
        const res = await fetch('/api/admin/posts/bulk-delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids }),
        })

        if (!res.ok) throw new Error('Gagal menghapus postingan')

        toast.success('Berhasil menghapus postingan terpilih')
        onDeletedAction()
        setOpen(false)
      } catch {
        toast.error('Terjadi kesalahan saat menghapus')
      } finally {
        setLoading(false)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={isPending || loading || ids.length === 0}
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
          {loading ? 'Menghapus...' : `Hapus Terpilih (${ids.length})`}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Postingan Terpilih?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Anda akan menghapus <b>{ids.length}</b> postingan sekaligus. Tindakan ini tidak dapat dibatalkan.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending || loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : null}
            {loading ? 'Menghapus...' : 'Ya, Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
