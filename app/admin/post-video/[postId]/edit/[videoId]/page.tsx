'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { PostVideoForm } from '@/components/admin/PostVideoForm'
import { VideoType } from '@prisma/client'

type PostVideo = {
  id: string
  title: string
  deskripsi: string
  duration: string
  episode: number
  linkVideo: string // hanya id youtube, misal: abc123xyz78
  type : VideoType
}

export default function EditPostVideoPage() {
  const params = useParams()
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId
  const videoId = Array.isArray(params.videoId) ? params.videoId[0] : params.videoId

  const [video, setVideo] = useState<PostVideo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!videoId) return

    const fetchVideo = async () => {
      try {
        const res = await fetch(`/api/admin/post-video/${videoId}`)
        if (!res.ok) throw new Error()

        const data = await res.json()
        setVideo(data)
      } catch {
        // Optional: tampilkan error jika perlu
      } finally {
        setLoading(false)
      }
    }

    fetchVideo()
  }, [videoId])

  if (!postId || !videoId) {
    return <div className="p-6 text-red-500">Parameter tidak valid.</div>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Memuat data...</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-10 md:px-8 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href={`/admin/post-video/${postId}`}>
            <Button variant="ghost" className="text-sm text-zinc-400 hover:bg-[#4C6E49] hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke list episode
            </Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-[#4C6E49]">
            Edit Episode
          </h1>
          <p className="text-zinc-400 text-sm">
            Perbarui data episode berikut jika ada kesalahan atau perubahan.
          </p>
        </div>

        {/* Form */}
        {video ? (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
            <PostVideoForm postId={postId} initialData={video} />
          </div>
        ) : (
          <div className="text-red-500">Gagal memuat data episode.</div>
        )}

      </div>
    </div>
  )
}
