'use client'

import { SearchIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  searchQuery: string
  setSearchQuery: (val: string) => void
  onClose: () => void
}

const MobileSearch = ({ searchQuery, setSearchQuery, onClose }: Props) => {
  const router = useRouter()

  const handleSearch = () => {
    if (!searchQuery.trim()) return
    router.push(`/anime/search?q=${encodeURIComponent(searchQuery)}`)
    onClose()
  }

  return (
    <div className="sm:hidden absolute z-50 inset-x-0 top-[72px] h-[100px]">
      <div className="absolute inset-0 bg-black opacity-80 transition-opacity"></div>
      <section className="absolute inset-y-6 max-w-full flex">
        <div className="w-screen max-w-full">
          <div className="h-full flex flex-col shadow-xl">
            <div className="flex items-center ml-3 flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="bg-black text-white pl-4 py-4 rounded-l-2xl focus:outline-none"
              />
              <button
                onClick={handleSearch}
                className="px-5 py-4 bg-gray-900 border border-slate-700 border-l-0 rounded-r-2xl cursor-pointer"
              >
                <SearchIcon className="text-gray-400 size-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MobileSearch
