'use client'

import { useState , useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Loader2 ,Plus, Trash2 } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { VideoType } from '@prisma/client'

type PostVideoFormProps = {
  postId: string
  initialData?: {
    id: string
    title: string
    episode: number
    duration: string
    deskripsi: string
    linkVideo: string
    type: VideoType
    officialLinks?: { platformId: string; url: string; access: string }[]
  }
  onSuccess?: () => void
}

const VIDEO_TYPES: VideoType[] = ['EPISODE', 'TRAILER', 'PV', 'MV', 'RECAP','FILLER', 'OTHER']

export function PostVideoForm({ postId, initialData, onSuccess }: PostVideoFormProps) {
  const [title, setTitle] = useState(initialData?.title || '')
  const [deskripsi, setDeskripsi] = useState(initialData?.deskripsi || '')
  const [linkVideo, setLinkVideo] = useState(initialData?.linkVideo || '')
  const [duration, setDuration] = useState(initialData?.duration || '')
  const [episode, setEpisode] = useState<number>(initialData?.episode || 1)
  const [type, setType] = useState<VideoType>(initialData?.type || 'EPISODE')
  const [platforms, setPlatforms] = useState<{ id: string; name: string }[]>([]);
  const [officialLinks, setOfficialLinks] = useState<{ platformId: string; url: string; access: string }[]>(
  initialData?.officialLinks?.length
    ? initialData.officialLinks.map((link) => ({ ...link, access: link.access || 'Gratis' }))
    : [{ platformId: '', url: '', access: 'Gratis' }]
)

  const [loading, setLoading] = useState(false)

  const isEdit = !!initialData
  const router = useRouter()

useEffect(() => {
  const fetchPlatforms = async () => {
    try {
      const res = await fetch('/api/admin/link-platforms');
      const json = await res.json();
      if (json.success) {
        setPlatforms(json.data);
      }
    } catch (error) {
      console.error('Failed to fetch platforms:', error);
    }
  };

  fetchPlatforms();
}, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

     // ✅ Validasi linkVideo hanya jika tidak kosong
  if (linkVideo && !/^[\w-]{11}$/.test(linkVideo)) {
    toast.error('ID YouTube tidak valid')
    return
  }

    setLoading(true)

  const payload = {
  title,
  deskripsi,
  linkVideo: linkVideo || null,
  duration,
  episode : Number(episode),
  type,
  postId,
  officialLinks: officialLinks.filter((link) => link.platformId && link.url).map((link) => ({
  platformId: link.platformId,
  url: link.url,
  access: link.access || 'Gratis',
})),
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

    const handleOfficialLinkChange = (
    index: number,
    field: 'platformId' | 'url' | 'access',
    value: string
  ) => {
    setOfficialLinks((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };


  const addOfficialLink = () => {
    setOfficialLinks([...officialLinks, { platformId: "", url: "" , access : ""}]);
  };

  const removeOfficialLink = (index: number) => {
    setOfficialLinks(officialLinks.filter((_, i) => i !== index));
  };

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

  const inputStyle =
    'bg-zinc-800/60 border border-zinc-700 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#4C6E49] focus:border-[#4C6E49] transition'

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
        />
      </div>

      {/* Durasi, Episode, Tipe */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          <label className="text-sm font-medium text-zinc-300">Episode</label>
          <Input
            type="number"
            value={episode}
            onChange={(e) => setEpisode(Number(e.target.value))}
            placeholder="Contoh: 1 / 10 / 100"
            className={inputStyle}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-300">Tipe Video</label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as VideoType)}
          >
            <SelectTrigger className={inputStyle + 'px-6 w-full'}>
              <SelectValue placeholder="Pilih tipe video" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 text-white border-zinc-700">
              {VIDEO_TYPES.map((v) => (
                <SelectItem key={v} value={v}>
                  {v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

{/* Platform Resmi */}
<div className="space-y-2">
  <label className="text-sm font-medium text-zinc-300">Link Platform Resmi</label>

  {officialLinks.map((link, index) => (
    <div key={index} className="flex gap-2 items-end mt-2">
      {/* Dropdown Platform */}
      <div className="flex-1 space-y-1.5 ">
        <Select
          value={link.platformId}
          onValueChange={(value) => handleOfficialLinkChange(index, "platformId", value)}
        >
          <SelectTrigger className={inputStyle + " px-3 my-auto w-full"}>
            <SelectValue placeholder="Pilih platform" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-white border-zinc-700">
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Select
        value={link.access}
        onValueChange={(value) =>
          handleOfficialLinkChange(index, 'access', value)
        }
      >
        <SelectTrigger className={inputStyle + ' px-3'}>
          <SelectValue placeholder="Pilih akses" />
        </SelectTrigger>
        <SelectContent className="bg-zinc-900 text-white border-zinc-700">
          <SelectItem value="Gratis">Gratis</SelectItem>
          <SelectItem value="Berbayar">Berbayar</SelectItem>
          <SelectItem value="Premium">Premium</SelectItem>
          <SelectItem value="Bioskop">Bioskop</SelectItem>
        </SelectContent>
      </Select>

      {/* Input URL */}
      <div className="flex-[2] space-y-1.5">
        <Input
          placeholder="https://example.com"
          value={link.url}
          onChange={(e) => handleOfficialLinkChange(index, "url", e.target.value)}
          className={inputStyle}
        />
      </div>

      {/* Tombol Hapus */}
      <div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => removeOfficialLink(index)}
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    </div>
  ))}

  {/* Tombol Tambah */}
  <Button
    type="button"
    variant="secondary"
    className="mt-2"
    onClick={addOfficialLink}
  >
    <Plus className="w-4 h-4 mr-2" />
    Tambah Platform
  </Button>
</div>


      {/* Submit */}
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
