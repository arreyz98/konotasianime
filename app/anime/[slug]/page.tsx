
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import DetailVideo from "@/components/DetailVideo"
import AgeRatingModalClient from "@/components/modal/AgeRatingModalClient"
import DeskripsiMobile from "@/components/DeskripsiMobile"

export default async function DetailAnimePage({ params }: {params : Promise<{slug : string}>}) {
  const slug = (await params).slug
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      genres: { include: { genre: true } },
      studios: { include: { studio: true } },
      postVideos: {
        orderBy: { episode: 'asc' }, // optional: urutkan video
        include : {
          officialLinks :{
            include :{
              platform : true
            }
          }
        }
      },
    },
  })

  if (!post) return notFound()

  return (
    <>
    <div className="min-h-screen w-full bg-[#1C2029]">
       <AgeRatingModalClient rating={post.rating} description={"Pastikan Anda sudah cukup umur untuk mengakses anime ini"} />
    <div className="relative px-0 py-8 sm:px-6 lg:px-8 h-[500px] sm:h-[480px] w-full">
  <Image
    src={post.imageBanner}
    fill
    alt={post.title}
    className="object-cover brightness-[10%]"
  />

  {/* Konten overlay */}
  <div className="absolute top-10 left-0 right-0 max-w-screen-md px-4 sm:px-6">
    {/* Title */}
    <h1 className="font-bold font-space-mono text-white 
                   text-3xl sm:text-4xl md:text-5xl tracking-wide mb-2">
      {post.title}
    </h1>

    {/* Genres */}
    <div className="flex flex-row flex-wrap gap-1.5 w-full">
      {post.genres.map(({ genre }) => (
        <Badge
          key={genre.id}
          className="bg-[#4c6e49] font-poppins font-bold uppercase mt-2 sm:mt-3"
        >
          {genre.name}
        </Badge>
      ))}
    </div>

    {/* Description */}
    <div className="mt-4">
      <div className="block xl:hidden">
        <DeskripsiMobile deskripsi={post.deskripsi} />
      </div>
      <div className="hidden xl:block w-full xl:w-[1300px]">
        <p className="text-white font-poppins text-justify text-sm sm:text-base md:text-lg">
          {post.deskripsi}
        </p>
      </div>
    </div>

    {/* Studios */}
    <div className="flex flex-col space-y-2 mt-4">
      <h1 className="text-white font-space-mono font-bold text-sm sm:text-lg">
        Studio:
      </h1>
      <div className="flex flex-row flex-wrap gap-1.5">
        {post.studios.map(({ studio }) => (
          <Badge key={studio.id} className="bg-[#4c6e49]">
            {studio.name}
          </Badge>
        ))}
      </div>
    </div>

    {/* Source */}
    <div className="flex flex-col mt-5 mb-5">
      <h1 className="text-white font-space-mono font-bold text-sm sm:text-lg mb-2">
        Source:
      </h1>
      <div className="flex flex-row gap-3">
        <a href={post.source[0]} target="_blank">
          <Image
            className="h-6 sm:h-9 w-20 sm:w-24 md:w-28 bg-[#181f29] rounded-2xl"
            src="/images/anilist-ico.svg"
            alt="Anilist"
            width={200}
            height={400}
          />
        </a>
        <a href={post.source[1]} target="_blank">
          <Image
            className="h-6 sm:h-9 w-20 sm:w-24 md:w-28 bg-[#2c51a2] rounded-2xl"
            src="/images/mal-ico.svg"
            alt="MyAnimeList"
            width={200}
            height={400}
          />
        </a>
        <a href={post.source[2]} target="_blank">
          <Image
            className="h-6 sm:h-9 w-20 sm:w-24 md:w-28 bg-[#2a3147] rounded-2xl"
            src="/images/anidb-ico.svg"
            alt="AniDB"
            width={200}
            height={400}
          />
        </a>
      </div>
    </div>
  </div>
</div>

 {post.postVideos.length === 0 ? (
     <div className="flex flex-col items-center justify-center py-20 text-center text-white">
      {/* Text */}
      <h2 className="text-2xl font-semibold text-gray-300 mb-2">Belum ada video</h2>
      <p className="text-lg text-gray-400 max-w-xs">
        Video untuk anime ini belum tersedia. Silakan kembali lagi nanti.
      </p>
    </div>
) : (
    <DetailVideo dataVideo={post.postVideos} />
)}
</div>
</>
  )
}
