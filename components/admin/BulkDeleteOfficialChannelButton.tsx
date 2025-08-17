'use client'

import { useTransition, useState } from 'react'
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
  selectedIds: string[]
  onDeletedAction: () => void
}

export function BulkDeleteOfficialChannelButton({
  selectedIds,
  onDeletedAction,
}: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/official-channels/bulk-delete', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ids: selectedIds }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.message || 'Gagal menghapus official channel.')
        }

        toast.success('Official channel berhasil dihapus.')
        onDeletedAction()
        setOpen(false)
      } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || 'Gagal menghapus official channel.')
      } else {
        toast.error('Gagal menghapus official channel.')
      }
    }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          disabled={selectedIds.length === 0}
          className="gap-2"
        >
          <Trash2 size={16} />
          Hapus Terpilih
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-700">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Official Channel?</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            Channel yang dipilih akan dihapus secara permanen.
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
            {isPending ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
