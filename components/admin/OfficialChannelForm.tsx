'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

type Props = {
  onSubmitAction: (data: { name: string; logoUrl: string }) => Promise<void>
  loading: boolean
  initialData?: {
    name: string
    logoUrl: string
  }
}

export function OfficialChannelForm({ initialData, loading, onSubmitAction }: Props) {
  const [name, setName] = useState(initialData?.name || '')
  const [logoUrl, setLogoUrl] = useState(initialData?.logoUrl || '')

  const isEdit = !!initialData

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmitAction({ name, logoUrl })
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="w-full space-y-2">
        <Label className="text-white">Nama Channel Resmi</Label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: BS Station"
          required
          className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-[#4C6E49]"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-white">Logo URL</Label>
        <Input
          value={logoUrl}
          onChange={(e) => setLogoUrl(e.target.value)}
          placeholder="https://example.com/logo.png"
          required
          className="bg-zinc-800 text-white border-zinc-700 focus-visible:ring-[#4C6E49]"
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4C6E49] hover:bg-[#3a5a37] text-white"
      >
        {loading
          ? 'Menyimpan...'
          : isEdit
          ? 'Update Channel Resmi'
          : 'Simpan Channel Resmi'}
      </Button>
    </form>
  )
}
