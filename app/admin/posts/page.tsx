'use client'

import { useEffect, useState , useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Switch } from "@/components/ui/switch"
import { DeletePostButton } from '@/components/admin/DeletePostButton'
import { BulkDeletePostButton } from '@/components/admin/BulkDeletePostButton'
import { Pencil, VideoIcon } from 'lucide-react'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { toast } from 'sonner' 
import { SearchInput } from '@/components/admin/SearchInput'
import { PaginationControls } from '@/components/admin/PaginationControls'

type Post = {
  id: string
  title: string
  slug: string
  createdAt: string
  isFeatured : boolean
  _count: {
    postVideos: number
  }
}

export default function AdminPostPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortByFeatured, setSortByFeatured] = useState(false)
  const maxFeatured = 5 //jumlah max slide show
  const featuredCount = posts.filter((p) => p.isFeatured).length // jumlah post yg aktif di slideshow
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const limit = 10

const [selectedIds, setSelectedIds] = useState<string[]>([])
const toggleSelect = (id: string) => {
  setSelectedIds((prev) =>
    prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]
  )
}
const isSelected = (id: string) => selectedIds.includes(id)


const fetchPosts = useCallback(async () => {
  try {
    setLoading(true)
    const res = await fetch(
      `/api/admin/posts?search=${search}&page=${page}&limit=${limit}&sort=${sortByFeatured ? 'featured' : ''}`
    )

    if (!res.ok) throw new Error('Gagal mengambil data')

    const { data, total } = await res.json()
    setPosts(data)
    setTotalPages(Math.ceil(total / limit))
  } catch {
    toast.error('Gagal mengambil data post', {
      style: { backgroundColor: '#ef4444', color: 'white', border: 'none' },
      position: 'top-right'
    })
  } finally {
    setLoading(false)
  }
}, [search, page, sortByFeatured])

const toggleFeatured = async (postId: string, isFeatured: boolean) => {
  const res = await fetch(`/api/admin/posts/${postId}/featured`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isFeatured }),
  })
  if (!res.ok) {
    toast.error("Gagal memperbarui status slideshow")
    return
  }
  toast.success(
    `Post berhasil ${isFeatured ? "ditampilkan" : "disembunyikan"} dari slideshow`
  )
  fetchPosts()
}

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchPosts()
    }, 500)

    return () => clearTimeout(debounceTimer)
  }, [fetchPosts])

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Daftar Postingan</h1>
        <Link href="/admin/posts/create">
          <Button className="bg-[#4C6E49] hover:bg-[#3a5a37]">
            + Tambah Postingan
          </Button>
        </Link>
      </div>



      {selectedIds.length > 0 && (
        <BulkDeletePostButton
          ids={selectedIds}
          onDeletedAction={() => {
            setPosts(posts.filter((p) => !selectedIds.includes(p.id)))
            setSelectedIds([])
          }}
        />
      )}

      <div className="flex flex-row md:flex-row gap-4">
        <SearchInput 
          value={search}
          onChangeAction={(e) => {
            setSearch(e.target.value)
            setPage(1) // Reset ke halaman pertama saat search
          }}
          placeholder="Cari postingan..."
        />

        <Button
          variant="default"
          className={sortByFeatured ? "bg-[#4C6E49]" : "bg-[#27272A]"}
          onClick={() => {
            setSortByFeatured(!sortByFeatured)
            setPage(1) // reset ke page pertama
          }}
        >
          {sortByFeatured ? "Urutkan: Featured ↑" : "Urutkan: Default"}
        </Button>

      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-800 bg-zinc-900">
          <thead className="bg-[#4C6E49]">
            <tr>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Pilih</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">
                Slideshow
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Judul</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Jumlah Video</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Tanggal</th>
              <th className="px-4 py-3 text-center text-sm font-medium text-white">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : posts.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-zinc-400">
                  {search ? 'Hasil pencarian tidak ditemukan' : 'Belum ada postingan.'}
                </td>
              </tr>
            ) : (
              posts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/50 transition">
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      className="accent-[#4C6E49] w-4 h-4"
                      checked={isSelected(post.id)}
                      onChange={() => toggleSelect(post.id)}
                    />
                  </td>
                  <td className="px-4 py-4 text-center">
                    <Switch
                      checked={post.isFeatured}
                      onCheckedChange={(checked) => toggleFeatured(post.id, checked)}
                      disabled={!post.isFeatured && featuredCount >= maxFeatured}
                      className="data-[state=checked]:bg-[#4C6E49] data-[state=unchecked]:bg-zinc-700 ring-1 ring-zinc-700"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/anime/${post.slug}`} 
                      className="hover:underline hover:text-[#4C6E49]"
                      target="_blank"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center">{post._count.postVideos}</td>
                  <td className="px-4 py-4 text-center">
                    {new Date(post.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td className="px-4 py-4 space-x-2 flex justify-center">
                    <Link href={`/admin/posts/${post.id}/`}>
                      <Button size="sm" variant="secondary" className='bg-[#4C6E49]'>
                        <Pencil className='text-white'/>
                      </Button>
                    </Link>
                    <Link href={`/admin/post-video/${post.id}/`}>
                      <Button size="sm" variant="secondary" className='bg-[#4C6E49]'>
                        <VideoIcon className='text-white'/>
                      </Button>
                    </Link>
                    <DeletePostButton
                      postId={post.id}
                      onDeleted={fetchPosts}
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