'use client'

import Image from 'next/image'
import Link from 'next/link'
import clsx from 'clsx'
import { useState, useEffect, useCallback } from 'react'
import { Search, X, ChevronLeft, ChevronRight} from 'lucide-react'
import FilterDropdown from './dropdown/FilterDropdown'

interface Post {
  id: string
  slug: string
  title: string
  rating : string
  imagePoster: string
  postVideos: { id: string }[]
}

interface Genre {
  id: string
  name: string
}

interface Studio {
  id: string
  name: string
}


const optionsSortBy = [
  {name : "Most Relevance"},
  {name : "Newest"},
  {name : "Oldest"},
  {name : "A-Z"},
  {name : "Z-A"},
]

const SkeletonCard = () => (
  <div className="relative rounded-xl overflow-hidden bg-[#1a1a1d] animate-pulse">
    <div className="aspect-[2/3] bg-gray-800 rounded-xl" />
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1C2029] via-[#1C2029]/70 to-transparent p-2">
      <div className="h-3 bg-gray-700 rounded w-3/4 mb-1"></div>
      <div className="h-3 bg-gray-700 rounded w-1/2"></div>
    </div>
  </div>
)

export default function AnimeGrid({ initialQuery = '' }: { initialQuery?: string }) {
  const [posts, setPosts] = useState<Post[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [studios, setStudios] = useState<Studio[]>([])
  const [searchInput, setSearchInput] = useState(initialQuery)
  const [genreFilter, setGenreFilter] = useState("")
  const [studioFilter, setStudioFilter] = useState("")
  const [sortOrder, setSortOrder] = useState("Most relevance")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchInput) params.append('q', searchInput);
      if (genreFilter) params.append('genre', genreFilter);
      if (studioFilter) params.append('studio', studioFilter);

      switch (sortOrder) {
        case 'Newest':
          params.append('sort', 'desc');
          break;
        case 'Oldest':
          params.append('sort', 'asc');
          break;
        case 'A-Z':
          params.append('sort', 'az');
          break;
        case 'Z-A':
          params.append('sort', 'za');
          break;
      }

      params.append('page', currentPage.toString());

      const res = await fetch(`/api/user/posts/search-post?${params.toString()}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Gagal memuat data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchInput, genreFilter, studioFilter, sortOrder, currentPage])

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchPosts();
    }, 500);

    return () => clearTimeout(timeout);
  }, [fetchPosts])

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [genreRes, studioRes] = await Promise.all([
          fetch('/api/admin/genres/all'),
          fetch('/api/admin/studios/all')
        ])
        const [genreData, studioData] = await Promise.all([
          genreRes.json(),
          studioRes.json()
        ])
        setGenres(genreData)
        setStudios(studioData)
      } catch (error) {
        console.error('Error fetching filter options:', error)
      }
    }
    fetchFilters()
  }, [])

  const handleResetFilters = () => {
    setSearchInput('')
    setSortOrder('Most relevance')
    setGenreFilter('')
    setStudioFilter('')
    setCurrentPage(1)
  }

  const hasFilter = searchInput || genreFilter || studioFilter || sortOrder !== 'Most relevance';

  

  return (
    <div className="space-y-8 bg-[#1C2029] px-4 py-10 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        <h1 className="text-white text-3xl font-bold tracking-tight">Temukan Anime Favoritmu</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 flex-wrap relative">
          <div className="relative w-full md:max-w-[210px]">
            <input
              type="text"
              placeholder="Cari anime..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-[#09090B] font-space-mono text-sm text-white px-4 py-3.5 pr-10 rounded-xl shadow-sm w-full focus:outline-none"
            />
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>


          <FilterDropdown
           label="Genre"
          value={genreFilter}
          onChange={setGenreFilter}
          options={genres.map((g) => ({ value: g.name, label: g.name }))}
           />
           
          <FilterDropdown
           label="Studio"
          value={studioFilter}
          onChange={setStudioFilter}
          options={studios.map((g) => ({ value: g.name, label: g.name }))}
           />

          <FilterDropdown
           label="Sort By"
          value={sortOrder}
          onChange={setSortOrder}
          options={optionsSortBy.map((g) => ({ value: g.name, label: g.name }))}
           />

          {hasFilter && (
            <button
              onClick={handleResetFilters}
              className="flex items-center justify-center gap-1 bg-[#272727] text-white px-4 h-[48px] rounded-xl hover:bg-[#3a3a3a] transition w-[120px]"
            >
              <X className="h-4 w-4" /> Reset
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
        {isLoading
          ? Array.from({ length: 24 }).map((_, idx) => <SkeletonCard key={idx} />)
          : posts.map(post => (
              <Link href={`/anime/${post.slug}`} key={post.id} className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition duration-300 bg-[#1a1a1d] animate-fade-in">
                <div className="aspect-[2/3] w-full relative">
                  <Image
                    src={post.imagePoster}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1024px) 120px, (min-width: 640px) 100px, 100vw"
                    className="object-cover w-full h-full group-hover:opacity-90 transition rounded-xl"
                    priority
                  />
                </div>
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                  {post.postVideos.length > 0 && (
                    <span className="bg-[#4C6E49] text-white text-[10px] font-semibold px-2 py-[1px] rounded-full shadow w-[40px]">
                      {post.postVideos.length} ep
                    </span>
                  )}
                  <span className={clsx(`text-white text-[10px] font-semibold uppercase px-2 py-[1px] rounded-full shadow`,{
                    'bg-[#FFC107]' : post.rating === "Remaja",
                    'bg-[#4CAF50]' : post.rating === "Anak & Bimbingan",
                    'bg-[#C62828]' : post.rating === "Dewasa Berat",
                    'bg-[#FF7043]' : post.rating === "Dewasa Ringan"
                  })}>
                      {post.rating}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1C2029] via-[#1C2029]/70 to-transparent p-2">
                  <h3 className="text-white text-xs font-medium line-clamp-2">{post.title}</h3>
                </div>
              </Link>
            ))}
      </div>

      {!isLoading && totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-10">
          <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="bg-[#4C6E49] text-white px-3 py-2 rounded disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <span className="text-white text-sm">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="bg-[#4C6E49] text-white px-3 py-2 rounded disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      {!isLoading && posts.length === 0 && (
        <div className="text-white text-center mt-10 text-lg font-semibold">Tidak ada anime ditemukan.</div>
      )}
    </div>
  )
}
