'use client'

import { useParams } from 'next/navigation'
import { PostVideoForm } from '@/components/admin/PostVideoForm'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function CreatePostVideoPage() {
  const params = useParams()
  const postId = Array.isArray(params.postId) ? params.postId[0] : params.postId

  if (!postId) {
    return <div className="p-6 text-red-500">Post ID tidak ditemukan.</div>
  }

  return (
    <div className="min-h-screen px-4 py-10 md:px-8 bg-zinc-950 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <Link href={`/admin/post-video/${postId}`}>
            <Button variant="ghost" className="text-sm text-zinc-400 hover:bg-[#4C6E49] hover:text-white mb-2">
              <ArrowLeft className="h-4 w-4 mr-2 transition-colors group-hover:text-white" />
              Kembali ke list episode
            </Button>
          </Link>
         <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#4C6E49] to-lime-500 text-transparent bg-clip-text">
          Tambah Episode Baru
        </h1>
          <p className="text-zinc-400 text-sm">
            Isi data episode untuk anime terkait. Pastikan semua data valid sebelum menyimpan.
          </p>
        </div>

        {/* Form */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
          <PostVideoForm postId={postId} />
        </div>
      </div>
    </div>
  )
}
