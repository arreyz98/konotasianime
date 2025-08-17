'use client'
import { useEffect, useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { AnimatePresence, motion } from 'framer-motion'
import SkeletonCard from './skeleton/SkeletonCard'
import VideoCard from './VideoCard' // pastikan path ini sesuai

type Video = {
  id: string
  title: string
  deskripsi: string
  episode: number
  linkVideo: string
  createdAt: string
  post: {
    slug: string
    title: string
    imageBanner: string
    rating : string
  }
}

export default function LatestPost() {
  const [videos, setVideos] = useState<Video[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const limit = 6

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true)
      const res = await fetch(`/api/videos?page=${page}&limit=${limit}`)
      const data = await res.json()
      setVideos(data.data)
      setTotal(data.total)
      setIsLoading(false)
    }

    fetchVideos()
  }, [page])

  const totalPages = Math.ceil(total / limit)

    // 💡 Hitung tinggi minimum berdasarkan jumlah video
  const minHeight = useMemo(() => {
  const rowHeight = 400 // tinggi per baris
  const count = videos?.length || 0 // 🛡️ proteksi
  const rows = Math.ceil(count / 3) || 1
  return rowHeight * rows
}, [videos])

  return (
    <section className="py-10 pb-5 bg-[#1C2029]">
      <div className="px-4 sm:px-6 lg:px-2">
        <div className="flex flex-row w-[80%] mx-auto mb-7 ">
          <h2 className="text-2xl text-center sm:text-4xl font-bold space-mono text-white font-space-mono">
            Baru Ditambahkan
          </h2>
          <div className="hidden sm:flex flex-row ml-auto mr-0">
            <Button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-[#4C6E49] rounded-full mr-2 w-[38px]"
            >
              <ChevronLeft className="size-6" />
            </Button>
            <Button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-[#4C6E49] rounded-full w-[38px]"
            >
              <ChevronRight className="size-6" />
            </Button>
          </div>
        </div>

                <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              className="flex justify-center mb-14 flex-wrap gap-6 px-4 sm:px-6 lg:px-2 min-h-[1200px]"
            >
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`videos-page-${page}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight }}
              className="flex justify-center mb-14 gap-y-8 flex-wrap lg:gap-x-8"
            >
             {Array.isArray(videos) &&
              videos.map((video) => (
                video?.post ? <VideoCard key={video.id} {...video} /> : null
            ))}

            </motion.div>
          )}
        </AnimatePresence>


        {/* Mobile Pagination */}
        <div className="flex sm:hidden flex-row justify-center mt-6">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="bg-blue-400 rounded-full mr-2 w-[40px]"
          >
            <ChevronLeft className="size-6" />
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="bg-blue-400 rounded-full w-[40px]"
          >
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
