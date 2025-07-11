'use client'

import { useEffect, useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { toast } from 'sonner'
import { DeleteGenreButton } from '@/components/admin/DeleteGenreButton'
import { BulkDeleteGenreButton } from '@/components/admin/BulkDeleteGenreButton'
import { SearchInput } from '@/components/admin/SearchInput'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { PaginationControls } from '@/components/admin/PaginationControls'

type Genre = {
  id: string
  name: string
}

export default function AdminGenrePage() {
  const [genres, setGenres] = useState<Genre[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([])
  const limit = 10

  const fetchGenres = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/genres?search=${search}&page=${page}&limit=${limit}`)
      const { data, total } = await res.json()
      setGenres(data)
      setTotalPages(Math.ceil(total / limit))
    } catch {
      toast.error('Gagal mengambil data genre')
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchGenres()
    }, 300)

    return () => clearTimeout(debounce)
  }, [fetchGenres])

  const handleCheckboxChange = (id: string) => {
    setSelectedGenreIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const isAllSelected = genres.length > 0 && selectedGenreIds.length === genres.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedGenreIds([])
    } else {
      setSelectedGenreIds(genres.map((g) => g.id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Daftar Genre</h1>
         <Link href="/admin/genres/create">
          <Button className="bg-[#4C6E49] hover:bg-[#3a5a37]">
            + Tambah Genre
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <SearchInput
          value={search}
          onChangeAction={(e) => {
            setSearch(e.target.value)
            setPage(1) // reset ke halaman pertama
          }}
          placeholder="Cari genre..."
        />


      {selectedGenreIds.length > 0 && (
        <BulkDeleteGenreButton
          selectedIds={selectedGenreIds}
          onDeletedAction={() => {
            fetchGenres()
            setSelectedGenreIds([])
          }}
        />
      )}

     
      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-800 bg-zinc-900">
          <thead className="bg-[#4C6E49] text-white">
            <tr>
              <th className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  onChange={toggleSelectAll}
                  checked={isAllSelected}
                  className="accent-green-600"
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium">Nama Genre</th>
              <th className="px-4 py-3 text-center text-sm font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <TableSkeleton rows={5} />
            ) : genres.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-6 text-zinc-400">
                  {search ? 'Genre tidak ditemukan' : 'Belum ada genre.'}
                </td>
              </tr>
            ) : (
              genres.map((genre) => (
                <tr key={genre.id} className="hover:bg-zinc-800/50 transition">
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedGenreIds.includes(genre.id)}
                      onChange={() => handleCheckboxChange(genre.id)}
                      className="accent-green-600"
                    />
                  </td>
                  <td className="px-4 py-4">{genre.name}</td>
                  <td className="px-4 py-4 text-center">
                    <DeleteGenreButton genreId={genre.id} onDeleted={fetchGenres} />
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
