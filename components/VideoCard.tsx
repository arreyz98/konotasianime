'use client'

import Image from 'next/image'
import Link from 'next/link'
import { EllipsisVertical } from 'lucide-react'
import { Button } from './ui/button'
import clsx from 'clsx'

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
    rating : string
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
        {linkVideo === null ? (
           <Image
              src={post.imageBanner}
              alt={title}
              width={480}
              height={270}
              loading="lazy"
              placeholder="empty" // gunakan 'blur' kalau ada blurDataURL
              className="object-cover w-full h-[260px] sm:h-[300px] rounded-t-2xl"
            />
      ):
        (<Image
          src={`https://img.youtube.com/vi/${linkVideo}/hqdefault.jpg`}
          alt={title}
          width={480}
          height={270}
          loading="lazy"
          placeholder="empty" // gunakan 'blur' kalau ada blurDataURL
          className="object-cover w-full h-[260px] sm:h-[300px] rounded-t-2xl"
        />)
    }

  <div className="absolute top-2 right-2 bg-white/90 text-black font-bold px-3 py-1 rounded-md text-sm">
    #{String(episode).padStart(2, '0')}
  </div>

  <div className="absolute top-5 left-2">
    <div className="relative">
      <div className={clsx(`p-2  text-white rounded-lg font-bold font-poppins text-xs uppercase`,{
        'bg-[#FFC107]' : post.rating === "Remaja",
        'bg-[#4CAF50]' : post.rating === "Anak & Bimbingan",
        'bg-[#C62828]' : post.rating === "Dewasa Berat",
        'bg-[#FF7043]' : post.rating === "Dewasa Ringan"
      })}>{post.rating}</div>
      <div className='absolute top-[-18]'>
        <span className={clsx(`font-bold font-poppins text-xs`,{
          'text-[#FFC107]' : post.rating === "Remaja",
          'text-[#4CAF50]' : post.rating === "Anak & Bimbingan",
          'text-[#C62828]' : post.rating === "Dewasa Berat",
          'text-[#FF7043]' : post.rating === "Dewasa Ringan"
        }
        )}>UNTUK:</span>
      </div>
    </div>
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
            {title}
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
