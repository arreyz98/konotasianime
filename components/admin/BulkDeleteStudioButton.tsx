'use client'

import { useTransition, useState } from 'react'
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
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

type Props = {
  selectedIds: string[]
  onDeletedAction: () => void
}

export function BulkDeleteStudioButton({ selectedIds, onDeletedAction }: Props) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const res = await fetch('/api/admin/studios', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ids: selectedIds }),
        })

        if (!res.ok) throw new Error()

        toast.success('Studio berhasil dihapus')
        setOpen(false)
        onDeletedAction()
      } catch {
        toast.error('Gagal menghapus studio')
      }
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="destructive"
          disabled={selectedIds.length === 0}
          className="flex gap-2"
        >
          <Trash2 size={16} />
          Hapus Terpilih
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-zinc-900 text-white border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle>Hapus Studio?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Kamu akan menghapus ${selectedIds.length} studio. Tindakan ini tidak bisa dibatalkan.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 text-white">
            Batal
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? 'Menghapus...' : 'Hapus'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
