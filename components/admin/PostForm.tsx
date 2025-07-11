'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '../MultiSelect'
import { Input } from '@/components/ui/input'

type PostFormProps = {
  post?: {
    id: string
    title: string
    slug: string
    deskripsi: string
    release: string
    imagePoster: string
    imageBanner: string
    source: string[]
    genres: { id: string }[]
    studios: { id: string }[]
  }
  userId: string
}

type Option = {
  label: string
  value: string
}

type Genre = {
  id: string
  name: string
}

type Studio = {
  id: string
  name: string
}

export function PostForm({ post, userId }: PostFormProps) {
  const router = useRouter()

  const [title, setTitle] = useState(post?.title || '')
  const [deskripsi, setDeskripsi] = useState(post?.deskripsi || '')
  const [release, setRelease] = useState(post?.release || '')
  const [imagePoster, setImagePoster] = useState(post?.imagePoster || '')
  const [imageBanner, setImageBanner] = useState(post?.imageBanner || '')
  const [source1, setSource1] = useState(post?.source?.[0] || '')
  const [source2, setSource2] = useState(post?.source?.[1] || '')
  const [source3, setSource3] = useState(post?.source?.[2] || '')
  const [genres, setGenres] = useState<string[]>(post?.genres.map((g) => g.id) || [])
  const [studios, setStudios] = useState<string[]>(post?.studios.map((s) => s.id) || [])
  const [allGenres, setAllGenres] = useState<Option[]>([])
  const [allStudios, setAllStudios] = useState<Option[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [gRes, sRes] = await Promise.all([
          fetch('/api/admin/genres/all'),
          fetch('/api/admin/studios/all'),
        ])
      const genresData: Genre[] = await gRes.json()
      const studiosData: Studio[] = await sRes.json()

      setAllGenres(genresData.map((g) => ({ label: g.name, value: g.id })))
      setAllStudios(studiosData.map((s) => ({ label: s.name, value: s.id })))

      } catch {
        toast.error('Gagal mengambil data genre/studio')
      }
    }

    fetchOptions()
  }, [])

  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      title,
      slug: slugify(title),
      deskripsi,
      release,
      imagePoster,
      imageBanner,
      source: [source1, source2, source3],
      genres,
      studios,
      userId,
    }

    try {
      const res = await fetch(post ? `/api/admin/posts/${post.id}` : '/api/admin/posts', {
        method: post ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error('Gagal menyimpan post')

      toast.success(post ? 'Berhasil update post' : 'Berhasil menambahkan post')
      router.push('/admin/posts')
    } catch {
      toast.error('Terjadi kesalahan saat menyimpan')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle =
    'bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 h-[50px] rounded-md w-full focus:outline-none focus:ring-0 focus:border-[#4C6E49] transition'

  const textAreaStyle =
    'bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 rounded-md w-full p-3 min-h-[120px] focus:outline-none focus:ring-0 focus:border-[#4C6E49] transition resize-none'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title" className="text-white mb-1 block">Judul</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          placeholder="Judul anime"
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="release" className="text-white mb-1 block">Tanggal Rilis</Label>
        <input
            id="release"
            type="date"
            value={release}
            onChange={(e) => setRelease(e.target.value)}
            required
            className="bg-zinc-800 border border-zinc-700 text-white placeholder:text-zinc-400 h-[50px] rounded-md w-full px-3 focus:outline-none focus:ring-0 focus:border-[#4C6E49] transition"
          />
      </div>

      <div>
        <Label htmlFor="imagePoster" className="text-white mb-1 block">Link Poster</Label>
        <Input
          id="imagePoster"
          value={imagePoster}
          onChange={(e) => setImagePoster(e.target.value)}
          required
          placeholder="https://image-poster.jpg"
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="imageBanner" className="text-white mb-1 block">Link Banner</Label>
        <Input
          id="imageBanner"
          value={imageBanner}
          onChange={(e) => setImageBanner(e.target.value)}
          required
          placeholder="https://image-banner.jpg"
          className={inputStyle}
        />
      </div>

      <div>
        <Label htmlFor="deskripsi" className="text-white mb-1 block">Deskripsi</Label>
        <textarea
          id="deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
          placeholder="Deskripsi lengkap anime"
          className={textAreaStyle}
        />
      </div>

      <div>
        <Label className="text-white mb-1 block">Anilist</Label>
        <Input
          value={source1}
          onChange={(e) => setSource1(e.target.value)}
          placeholder="https://anilist.co/..."
          className={inputStyle}
        />
      </div>

      <div>
        <Label className="text-white mb-1 block">MyAnimeList</Label>
        <Input
          value={source2}
          onChange={(e) => setSource2(e.target.value)}
          placeholder="https://myanimelist.net/..."
          className={inputStyle}
        />
      </div>

      <div>
        <Label className="text-white mb-1 block">AniDB</Label>
        <Input
          value={source3}
          onChange={(e) => setSource3(e.target.value)}
          placeholder="https://anidb.net/..."
          className={inputStyle}
        />
      </div>

      <MultiSelect
        label="Genre"
        options={allGenres}
        value={genres}
        onChangeAction={setGenres}
        placeholder="Pilih genre"
      />

      <MultiSelect
        label="Studio"
        options={allStudios}
        value={studios}
        onChangeAction={setStudios}
        placeholder="Pilih studio"
      />

      <Button
        type="submit"
        disabled={loading}
        className="bg-[#4C6E49] hover:bg-[#3a5a37] h-[50px] text-white w-full"
      >
        {loading ? 'Menyimpan...' : post ? 'Update Post' : 'Tambah Post'}
      </Button>
    </form>
  )
}
