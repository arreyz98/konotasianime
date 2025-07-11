'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, ChevronLeft, EllipsisVertical } from 'lucide-react'
import { Button } from './ui/button'

type Video = {
  id: string
  title: string
  deskripsi: string
  episode: number
  createdAt: string
  post: {
    slug: string
    title: string
    imageBanner: string
  }
}

export default function LatestPost() {
  const [videos, setVideos] = useState<Video[]>([])

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await fetch('/api/videos')
      const data = await res.json()
      setVideos(data)
    }

    fetchVideos()
  }, [])

  return (
    <section className="py-10 pb-5 bg-[#1C2029]">
      <div className="px-4 sm:px-6 lg:px-2">
        <div className="flex flex-row items-center mb-7">
          <div className="font-manrope text-2xl sm:text-4xl font-bold text-white ml-0 sm:ml-12">
            Latest Update
          </div>
          <div className="hidden sm:flex flex-row ml-auto mr-0 sm:mr-12">
            <Button className="bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]">
              <ChevronLeft className="size-6" />
            </Button>
            <Button className="bg-blue-400 rounded-full cursor-pointer w-[40px]">
              <ChevronRight className="size-6" />
            </Button>
          </div>
        </div>

        <div className="flex justify-center mb-14 gap-y-8 flex-wrap lg:gap-x-8">
          {videos.map((video) => (
            <Link
              key={video.id}
              href={`/${video.post.slug}`}
              className="bg-black w-full max-lg:max-w-xl lg:w-xl rounded-2xl shadow-2xl"
            >
              <div className="relative flex mb-6 h-[200px] sm:h-[360px]">
                <Image
                  src={video.post.imageBanner}
                  alt={video.post.title}
                  fill
                  className="object-cover rounded-t-lg hover:brightness-[70%] transition-all"
                />
              </div>
              <div className="block p-5">
                <div className="flex">
                  <h4 className="text-white font-bold leading-8 mb-5">{video.title}</h4>
                  <Button className="ml-auto bg-black cursor-pointer">
                    <EllipsisVertical className="text-white size-5" />
                  </Button>
                </div>
                <p className="text-sm sm:text-base text-gray-500 mb-5">
                  {video.deskripsi.slice(0, 120)}...
                </p>
                <div className="flex items-center justify-between font-medium">
                  <h6 className="text-sm text-blue-400 font-bold">Episode {video.episode}</h6>
                  <span className="text-sm text-white">
                    {new Date(video.createdAt).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex sm:hidden flex-row justify-center mr-0 sm:mr-12">
          <Button className="bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]">
            <ChevronLeft className="size-6" />
          </Button>
          <Button className="bg-blue-400 rounded-full cursor-pointer w-[40px]">
            <ChevronRight className="size-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
