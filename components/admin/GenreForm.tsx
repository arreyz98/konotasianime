'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Trash2 } from 'lucide-react'

type GenreFormProps = {
  initialValues?: { id: string; name: string }
  isEdit?: boolean
}

export function GenreForm({ initialValues, isEdit = false }: GenreFormProps) {
  const [genres, setGenres] = useState<string[]>(initialValues ? [initialValues.name] : [''])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isEdit && initialValues) {
      setGenres([initialValues.name])
    }
  }, [initialValues, isEdit])

  const handleChange = (index: number, value: string) => {
    const updated = [...genres]
    updated[index] = value
    setGenres(updated)
  }

  const handleRemove = (index: number) => {
    if (genres.length === 1) return
    const updated = genres.filter((_, i) => i !== index)
    setGenres(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const payload = isEdit
        ? { name: genres[0] }
        : { names: genres }

      const res = await fetch(
        isEdit ? `/api/admin/genres/${initialValues?.id}` : '/api/admin/genres',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) throw new Error()

      toast.success(isEdit ? 'Berhasil mengedit genre' : 'Genre berhasil ditambahkan')
      router.push('/admin/genres')
    } catch {
      toast.error('Terjadi kesalahan')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {genres.map((genre, index) => (
        <div key={index} className="flex gap-2 items-end">
          <div className="flex-1 space-y-2">
            <Label className="text-white">Nama Genre {isEdit ? '' : index + 1}</Label>
            <Input
              value={genre}
              onChange={(e) => handleChange(index, e.target.value)}
              placeholder="Contoh: Action"
              required
              className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-[#4C6E49]"
            />
          </div>
          {!isEdit && genres.length > 1 && (
            <Button
              type="button"
              variant="destructive"
              onClick={() => handleRemove(index)}
              className="h-[38px]"
            >
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      ))}

      {!isEdit && (
        <Button
          type="button"
          onClick={() => setGenres([...genres, ''])}
          className="bg-[#4C6E49] hover:bg-[#3a5a37] text-white"
        >
          + Tambah Genre
        </Button>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4C6E49] hover:bg-[#3a5a37] text-white"
      >
        {loading ? 'Menyimpan...' : isEdit ? 'Update Genre' : 'Simpan Genre'}
      </Button>
    </form>
  )
}
