'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  searchQuery: string
  setSearchQuery: (val: string) => void
  forceShow?: boolean
}

const SearchBar = ({ searchQuery, setSearchQuery, forceShow = false }: Props) => {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchQuery.trim()) return
    router.push(`/anime/search?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full max-w-[600px] ${forceShow ? '' : 'hidden lg:flex'} `}
    >
      <div className="relative flex-1">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
          className="bg-[#121212] text-white w-full pl-4 py-2 pr-12 rounded-l-2xl border border-[#121212] focus:outline-none"
          autoFocus={forceShow}
        />
      </div>
      <button
        type="submit"
        className="px-5 py-2.5 bg-[#4c6e49] hover:bg-[#588054] border border-[#121212] border-l-0 rounded-r-2xl"
      >
        <SearchIcon className="text-white size-5" />
      </button>
    </form>
  )
}


export default SearchBar