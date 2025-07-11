// DeleteStudioButton.tsx
'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
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

type Props = {
  studioId: string
  onDeleted?: () => Promise<void> // optional callback
}

export function DeleteStudioButton({ studioId, onDeleted }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/studios/${studioId}`, {
          method: 'DELETE',
        })

        if (!res.ok) throw new Error('Gagal menghapus studio')

        if (onDeleted) await onDeleted()
        setOpen(false)
      } catch (err) {
        console.error(err)
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
          <AlertDialogTitle>Hapus Studio?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Studio akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 text-white hover:bg-zinc-700 hover:text-white">
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
