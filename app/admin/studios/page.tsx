'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { TableSkeleton } from '@/components/admin/TableSkeleton'
import { toast } from 'sonner'
import { SearchInput } from '@/components/admin/SearchInput'
import { PaginationControls } from '@/components/admin/PaginationControls'
import { DeleteStudioButton } from '@/components/admin/DeleteStudioButton'
import { BulkDeleteStudioButton } from '@/components/admin/BulkDeleteStudioButton'

interface Studio {
  id: string
  name: string
  createdAt: string
}

export default function AdminStudioPage() {
  const [studios, setStudios] = useState<Studio[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [selectedStudioIds, setSelectedStudioIds] = useState<string[]>([])
  const limit = 10

  const fetchStudios = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`/api/admin/studios?search=${search}&page=${page}&limit=${limit}`)
      if (!res.ok) throw new Error('Gagal mengambil data studio')
      const { data, total } = await res.json()
      setStudios(data)
      setTotalPages(Math.ceil(total / limit))
    } catch {
      toast.error('Gagal mengambil data studio')
    } finally {
      setLoading(false)
    }
  }, [search, page])

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchStudios()
    }, 400)
    return () => clearTimeout(debounce)
  }, [fetchStudios])

  const toggleStudioId = (id: string) => {
    setSelectedStudioIds(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    )
  }

  const isAllSelected = studios.length > 0 && selectedStudioIds.length === studios.length

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedStudioIds([])
    } else {
      setSelectedStudioIds(studios.map(studio => studio.id))
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Daftar Studio</h1>
        <Link href="/admin/studios/create">
          <Button className="bg-[#4C6E49] hover:bg-[#3a5a37] text-white">
            + Tambah Studio
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <SearchInput 
          value={search}
          onChangeAction={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Cari studio..."
        />


      {selectedStudioIds.length > 0 && (    
        <BulkDeleteStudioButton 
          selectedIds={selectedStudioIds} 
          onDeletedAction={() => {
            setSelectedStudioIds([])
            fetchStudios()
          }}
        />
      )}

      </div>

      <div className="overflow-x-auto border border-zinc-800 rounded-lg">
        <table className="min-w-full divide-y divide-zinc-800 bg-zinc-900">
          <thead className="bg-[#4C6E49]">
            <tr>
              <th className="px-4 py-3 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleSelectAll}
                  className="accent-green-600"
                />
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-white">Nama</th>
              <th className="px-6 py-3 text-center text-sm font-medium text-white">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {loading ? (
              <TableSkeleton rows={3}  />
            ) : studios.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-zinc-400">
                  {search ? 'Studio tidak ditemukan.' : 'Belum ada studio.'}
                </td>
              </tr>
            ) : (
              studios.map((studio) => (
                <tr key={studio.id} className="hover:bg-zinc-800/50 transition">
                  <td className="px-4 py-4 text-center">
                    <input
                      type="checkbox"
                      checked={selectedStudioIds.includes(studio.id)}
                      onChange={() => toggleStudioId(studio.id)}
                      className="accent-green-600"
                    />
                  </td>
                  <td className="px-6 py-4 text-white">{studio.name}</td>
                  <td className="flex  px-6 py-4 text-center space-x-2">
                    <Link href={`/admin/studios/${studio.id}`}>
                      <Button size="sm" className="bg-[#4C6E49] text-white">
                        <Pencil size={16} />
                      </Button>
                    </Link>
                    <DeleteStudioButton studioId={studio.id} onDeleted={fetchStudios} />
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
