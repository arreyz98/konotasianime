'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

type StudioFormProps = {
  initialValues?: {
    id: string
    name: string
  }
  isEdit?: boolean
}

export default function StudioForm({ initialValues, isEdit = false }: StudioFormProps) {
  const [studioInputs, setStudioInputs] = useState<string[]>(
    isEdit && initialValues ? [initialValues.name] : ['']
  )
  const [loading, startTransition] = useTransition()
  const router = useRouter()

  const handleAddField = () => {
    setStudioInputs([...studioInputs, ''])
  }

  const handleRemoveField = (index: number) => {
    const newInputs = [...studioInputs]
    newInputs.splice(index, 1)
    setStudioInputs(newInputs)
  }

  const handleInputChange = (index: number, value: string) => {
    const updated = [...studioInputs]
    updated[index] = value
    setStudioInputs(updated)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (studioInputs.some((name) => !name.trim())) {
      toast.error('Nama studio tidak boleh kosong')
      return
    }

    startTransition(async () => {
      try {
        const res = await fetch(
          isEdit
            ? `/api/admin/studios/${initialValues?.id}`
            : '/api/admin/studios',
          {
            method: isEdit ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              isEdit ? { name: studioInputs[0] } : { studios: studioInputs }
            ),
          }
        )

        if (!res.ok) throw new Error()

        toast.success(isEdit ? 'Berhasil update studio' : 'Berhasil tambah studio')
        router.push('/admin/studios')
      } catch {
        toast.error('Gagal menyimpan studio')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {studioInputs.map((studio, index) => (
        <div key={index} className="flex  items-end gap-2">
          <div className="flex-1 space-y-2">
            <Label className="text-white">Nama Studio {studioInputs.length > 1 && index + 1}</Label>
            <Input
              type="text"
              value={studio}
              onChange={(e) => handleInputChange(index, e.target.value)}
              placeholder="Masukkan nama studio"
              className="bg-zinc-800 text-white border-zinc-700"
              required
            />
          </div>
          {studioInputs.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemoveField(index)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      ))}

      {!isEdit && (
        <Button
          type="button"
          onClick={handleAddField}
          variant="secondary"
          className="bg-zinc-700 text-white hover:bg-zinc-600"
        >
          + Tambah Studio
        </Button>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4C6E49] text-white hover:bg-[#3a5a37]"
      >
        {loading ? 'Menyimpan...' : isEdit ? 'Update Studio' : 'Simpan Studio'}
      </Button>
    </form>
  )
}
