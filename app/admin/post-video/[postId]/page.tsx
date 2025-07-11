'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Pencil } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { SearchInput } from '@/components/admin/SearchInput'
import { PaginationControls } from '@/components/admin/PaginationControls'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { DeleteVideoButton } from '@/components/admin/DeleteVideoButton'
import { BulkDeleteVideoButton } from '@/components/admin/BulkDeleteVideoButton'

type PostVideo = {
  id: string
  title: string
  episode: number
  duration: string
  createdAt: string
}

export default function PostVideoListPage() {
  const { postId } = useParams() as { postId: string }


  const [videos, setVideos] = useState<PostVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [postTitle, setPostTitle] = useState('')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const limit = 10

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
    )
  }

  const isSelected = (id: string) => selectedIds.includes(id)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(
          `/api/admin/post-video?postId=${postId}&search=${search}&page=${page}&limit=${limit}`
        )
        if (!res.ok) throw new Error('Gagal mengambil data video')
        const { data, total, postTitle } = await res.json()
        setVideos(data)
        setPostTitle(postTitle || '')
        setTotalPages(Math.ceil(total / limit))
      } catch {
        toast.error('Gagal mengambil data video')
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchData, 500)
    return () => clearTimeout(debounceTimer)
  }, [postId, search, page])

  console.log(postTitle)
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-white">Daftar Episode</h1>
        <p className="text-sm text-zinc-400">
          <span className="font-bold text-lg text-[#4C6E49]">{postTitle}</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <SearchInput
          value={search}
          onChangeAction={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Cari episode..."
        />
        <Link href={`/admin/post-video/${postId}/create`}>
          <Button className="bg-[#4C6E49] hover:bg-[#3a5a37]">
            + Tambah Episode
          </Button>
        </Link>
      </div>

      {selectedIds.length > 0 && (
        <BulkDeleteVideoButton
          ids={selectedIds}
          onDeleted={() => {
            setVideos(videos.filter((v) => !selectedIds.includes(v.id)))
            setSelectedIds([])
          }}
        />
      )}

      <div className="overflow-x-auto border border-zinc-800 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-800 bg-zinc-900">
          <thead className="bg-[#4C6E49]">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Pilih</th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Judul</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Episode</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Durasi</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Tanggal</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : videos.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-zinc-400">
                  {search ? 'Hasil pencarian tidak ditemukan' : 'Belum ada episode.'}
                </td>
              </tr>
            ) : (
              videos.map((video) => (
                <tr key={video.id} className="hover:bg-zinc-800/50 transition">
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      key={video.id}
                      checked={isSelected(video.id)}
                      onChange={() => toggleSelect(video.id)}
                      className="accent-[#4C6E49] w-4 h-4"
                    />
                  </td>
                  <td className="px-6 py-4">{video.title}</td>
                  <td className="px-4 py-4 text-center">{video.episode}</td>
                  <td className="px-4 py-4 text-center">{video.duration}</td>
                  <td className="px-4 py-4 text-center">
                    {new Date(video.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-4 space-x-2 flex justify-center">
                    <Link href={`/admin/post-video/${postId}/edit/${video.id}`}>
                      <Button size="sm" className="bg-[#4C6E49]">
                        <Pencil className="text-white" size={16} />
                      </Button>
                    </Link>
                    <DeleteVideoButton
                      id={video.id}
                      onDeleted={() =>
                        setVideos(videos.filter((v) => v.id !== video.id))
                      }
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {!loading && totalPages > 1 && (
        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          onPageChangeAction={setPage}
        />
      )}
    </div>
  )
}
