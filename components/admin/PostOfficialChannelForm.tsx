'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { MultiSelect } from '../MultiSelect'
import { useRouter } from 'next/navigation'

export interface ChannelItem {
  id?: string
  url: string
  isPaid: boolean
  officialChannelId: string
}

type Option = { label: string; value: string }

type Props = {
  isEdit?: boolean
  postId: string
  initialData?: ChannelItem[]
}

export function PostOfficialChannelForm({ isEdit, postId, initialData = [] }: Props) {
  const [channels, setChannels] = useState<ChannelItem[]>(
    initialData.length > 0
      ? initialData
      : [{ url: '', isPaid: false, officialChannelId: '' }]
  )
  const [officialOptions, setOfficialOptions] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch('/api/admin/official-channels?limit=100')
        const { data } = await res.json()
        setOfficialOptions(
          data.map((item: { name: string; id: string }) => ({
            label: item.name,
            value: item.id,
          }))
        )
      } catch {
        toast.error('Gagal memuat daftar official channel')
      }
    }

    fetchOptions()
  }, [])

  const handleChange = (
    index: number,
    field: keyof ChannelItem,
    value: string | boolean
  ) => {
    const updated = [...channels]
    updated[index][field] = value as never
    setChannels(updated)
  }

  const handleAdd = () => {
    setChannels([...channels, { url: '', isPaid: false, officialChannelId: '' }])
  }

  const handleRemove = (index: number) => {
    setChannels(channels.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch('/api/admin/post-official-channels', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, channels }),
      })

      if (!res.ok) throw new Error()

      toast.success(isEdit ? 'Channel diperbarui' : 'Channel berhasil ditambahkan')
      router.push('/admin/posts')
    } catch {
      toast.error('Gagal menyimpan data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {channels.map((channel, index) => (
        <div key={index} className="border border-zinc-700 p-4 rounded-md space-y-4 relative">
          <div className="space-y-2">
            <Label className="text-white">URL Channel</Label>
            <Input
              value={channel.url}
              onChange={(e) => handleChange(index, 'url', e.target.value)}
              required
              placeholder="https://example.com"
              className="bg-zinc-800 text-white border-zinc-700"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Official Channel</Label>
            <MultiSelect
              value={channel.officialChannelId ? [channel.officialChannelId] : []}
              onChangeAction={(val: string[]) =>
                handleChange(index, 'officialChannelId', val[0] || '')
              }
              options={officialOptions}
              placeholder="Pilih channel"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={channel.isPaid}
              onChange={(e) => handleChange(index, 'isPaid', e.target.checked)}
              className="accent-green-600"
            />
            <Label className="text-white">Channel Berbayar</Label>
          </div>

          {channels.length > 1 && (
            <Button
              type="button"
              onClick={() => handleRemove(index)}
              variant="destructive"
              size="sm"
            >
              Hapus
            </Button>
          )}
        </div>
      ))}

      <Button
        type="button"
        onClick={handleAdd}
        className="bg-[#4C6E49] hover:bg-[#3a5a37] text-white"
      >
        + Tambah Channel
      </Button>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4C6E49] hover:bg-[#3a5a37] text-white"
      >
        {loading ? 'Menyimpan...' : isEdit ? 'Update Channel' : 'Simpan Channel'}
      </Button>
    </form>
  )
}
