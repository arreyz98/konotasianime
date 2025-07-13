'use client'

import Image from 'next/image'
import Link from 'next/link'
import { EllipsisVertical } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
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
  }
}

export default function VideoCard({
  title,
  deskripsi,
  episode,
  linkVideo,
  createdAt,
  post,
}: Props) {



    
  return (
    <Link
      href={`/anime/${post.slug}`}
      className="bg-[#0E1015] w-full max-w-[480px] rounded-2xl shadow-lg hover:shadow-xl transition"
    >
      <div className="relative">
  <Image
    src={`https://img.youtube.com/vi/${linkVideo}/hqdefault.jpg`}
    alt={title}
    width={480}
    height={270}
    loading="lazy"
    placeholder="empty" // gunakan 'blur' kalau ada blurDataURL
    className="object-cover w-full h-[260px] sm:h-[300px] rounded-t-2xl"
  />

  <div className="absolute top-2 right-2 bg-white/90 text-black font-bold px-3 py-1 rounded-md text-sm">
    #{String(episode).padStart(2, '0')}
  </div>

  <div className="absolute bottom-2 left-2">
    <Image
      src="/images/anilist-ico.svg"
      alt="logo"
      width={70}
      height={70}
      className="opacity-80"
    />
  </div>

  <div className="absolute bottom-2 right-2 bg-white/90 text-black text-xs px-2 py-1 rounded">
    {new Date(createdAt).toLocaleDateString('id-ID', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })}
  </div>
</div>

      <div className="p-5">
        <div className="flex items-start gap-2">
          <h4 className="text-md sm:text-lg font-semibold text-white leading-snug truncate max-w-[85%]">
            {post.title}
          </h4>
          <Button className="ml-auto bg-transparent hover:bg-transparent p-0 h-auto">
            <EllipsisVertical className="text-white size-5" />
          </Button>
        </div>
        <p className="text-sm text-gray-400 mt-2 leading-relaxed line-clamp-2">
          {deskripsi}
        </p>
        <div className="mt-2 text-xs text-[#4C6E49] font-medium">
          Norinime - Nonton Resmi Anime 
        </div>
      </div>
    </Link>
  )
}
