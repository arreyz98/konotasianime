'use client'

import { SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  searchQuery: string
  setSearchQuery: (val: string) => void
  searchMobile: boolean
  setSearchMobile: (val: boolean) => void
}

const SearchBar = ({ searchQuery, setSearchQuery, searchMobile, setSearchMobile }: Props) => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/anime/search?q=${encodeURIComponent(searchQuery)}`)
    setSearchMobile(false)
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-[600px] ml-24">
      <div className="relative w-full hidden sm:block">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="bg-[#121212] text-white w-full pl-4 py-2 pr-12 rounded-l-2xl border border-[#121212] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="hidden sm:block px-5 py-2.5 bg-[#4c6e49] border border-[#121212] border-l-0 rounded-r-2xl"
      >
        <SearchIcon className="text-gray-400 size-5" />
      </button>
      <button
        type="button"
        onClick={() => setSearchMobile(!searchMobile)}
        className="block sm:hidden ml-auto p-3 bg-gray-900 border border-slate-700 rounded-full"
      >
        {searchMobile ? <X className="text-gray-400 size-5" /> : <SearchIcon className="text-gray-400 size-5" />}
      </button>
    </form>
  )
}

export default SearchBar
