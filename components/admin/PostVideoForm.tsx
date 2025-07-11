'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

type PostVideoFormProps = {
  postId: string
  initialData?: {
    id: string
    title: string
    episode: number
    duration: string
    deskripsi: string
    linkVideo: string
  }
  onSuccess?: () => void
}

export function PostVideoForm({ postId, initialData, onSuccess }: PostVideoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || '')
  const [linkVideo, setLinkVideo] = useState(initialData?.linkVideo || '')
  const [duration, setDuration] = useState(initialData?.duration || '')
  const [episode, setEpisode] = useState(initialData?.episode || 1)
  const [loading, setLoading] = useState(false)

  const isEdit = !!initialData
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

      if (!/^[\w-]{11}$/.test(linkVideo)) {
      toast.error('ID YouTube tidak valid')
      setLoading(false)
      return
    }
    
    setLoading(true)

    const payload = {
      title,
      deskripsi,
      linkVideo,
      duration,
      episode,
      postId,
    }

    try {
      const res = await fetch(
        isEdit ? `/api/admin/post-video/${initialData!.id}` : '/api/admin/post-video',
        {
          method: isEdit ? 'PUT' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      if (!res.ok) throw new Error()

      toast.success(isEdit ? 'Berhasil mengedit video' : 'Berhasil menambahkan video')
      onSuccess?.()
      router.push(`/admin/post-video/${postId}`)
    } catch {
      toast.error(isEdit ? 'Gagal mengedit video' : 'Gagal menambahkan video')
    } finally {
      setLoading(false)
    }
  }

    const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const raw = e.target.value.trim()
  let videoId = raw

  if (raw.includes('youtube.com/watch?v=')) {
    videoId = raw.split('v=')[1]?.split('&')[0] || ''
  } else if (raw.includes('youtu.be/')) {
    videoId = raw.split('youtu.be/')[1]?.split('?')[0] || ''
  } else if (/^[\w-]{11}$/.test(raw)) {
    videoId = raw
  } else {
    videoId = ''
  }

  setLinkVideo(videoId)
}

 const inputStyle = 'bg-zinc-800/60 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#4C6E49] focus:border-[#4C6E49] transition'
  
 return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {linkVideo.length === 11 && (
        <div className="mt-4 aspect-video rounded-xl overflow-hidden border border-zinc-800">
          <iframe
            src={`https://www.youtube.com/embed/${linkVideo}`}
            title="YouTube Preview"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}

      {/* Judul */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Judul Episode</label>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Contoh: Pertarungan Terakhir"
          className={inputStyle}
          required
        />
      </div>

      {/* Deskripsi */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Deskripsi</label>
        <Textarea
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          placeholder="Ringkasan singkat episode ini..."
          rows={4}
          className={inputStyle}
          required
        />
      </div>

      {/* Link Video */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-zinc-300">Link Video</label>
        <Input
          value={linkVideo}
          onChange={handleLinkChange}
          placeholder="Masukkan link YouTube atau ID videonya"
          className={inputStyle}
          required
        />
      </div>

      {/* Durasi & Episode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Durasi</label>
          <Input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="Contoh: 24:13"
            className={inputStyle}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Episode Ke-</label>
          <Input
            type="number"
            min={1}
            value={episode}
            onChange={(e) => setEpisode(parseInt(e.target.value))}
            placeholder="1"
            className={inputStyle}
            required
          />
        </div>
      </div>

      {/* Tombol Submit */}
      <Button
        type="submit"
        disabled={loading}
        className="bg-[#4C6E49] hover:bg-[#3a5a37] w-full h-[50px] font-semibold rounded-xl"
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEdit ? 'Simpan Perubahan' : 'Tambah Episode'}
      </Button>
    </form>
  )
}
