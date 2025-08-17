'use client'

import { useState, useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'

type Props = {
  channelId: string
  onDeleted?: () => void
}

export function DeleteOfficialChannelButton({ channelId, onDeleted }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/official-channels/${channelId}`, {
          method: 'DELETE',
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data?.message || 'Gagal menghapus channel')
        }

        toast.success('Official channel berhasil dihapus')
        onDeleted?.()
        setOpen(false)
      } catch (error: unknown) {
        const message =
          error instanceof Error
            ? error.message
            : 'Gagal menghapus official channel'
        toast.error(message)
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="destructive">
          <Trash2 size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Official Channel?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Channel ini akan dihapus secara permanen.
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
            {isPending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              'Hapus'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
