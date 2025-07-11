'use client'

import { useState, useTransition } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  postId: string
  onDeleted?: () => void
}

export function DeletePostButton({ postId, onDeleted }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/posts/${postId}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error()

        toast.success('Post berhasil dihapus')
        setOpen(false)

        if (onDeleted) onDeleted()
      } catch {
        toast.error('Terjadi kesalahan saat menghapus post')
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          className="flex items-center gap-2"
        >
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Postingan?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Tindakan ini tidak bisa dibatalkan. Postingan akan dihapus permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700"
          >
            {isPending && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {isPending ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
