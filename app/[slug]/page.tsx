
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { prisma } from "@/lib/prisma"
import DetailVideo from "@/components/DetailVideo"
// import { Navbar } from "@/components/Navbar"


export default async function DetailAnimePage({ params }: {params : Promise<{slug : string}>}) {
  const slug = (await params).slug
  const post = await prisma.post.findUnique({
    where: { slug: slug },
    include: {
      genres: { include: { genre: true } },
      studios: { include: { studio: true } },
      postVideos: {
        orderBy: { episode: 'asc' }, // optional: urutkan video
      },
    },
  })

  if (!post) return notFound()

  return (
    <>
    {/* <Navbar/> */}
    <div className="relative mx-auto px-4 py-8 sm:px-6 lg:px-8 h-[500px] sm:h-[480px] ">
      <Image
        src={post.imageBanner}
        fill
        alt={post.title}
        className="object-cover brightness-[10%]"
      />
      <div className="absolute top-10 sm:top-10 w-[400px] sm:w-[1000px]">
        <h1 className="font-bold font-space-mono text-white text-5xl tracking-wide">{post.title}</h1>

        <div className="flex flex-row flex-wrap space-x-1.5 mt-3">
          {post.genres.map(({ genre }) => (
            <Badge key={genre.id} className="bg-[#4c6e49] font-poppins font-bold uppercase">
              {genre.name}
            </Badge>
          ))}
        </div>

        <p className="text-white font-poppins text-justify mt-4">
          {post.deskripsi}
        </p>

        {/* Studios */}
        <div className="hidden sm:flex flex-col space-y-2 mt-4">
          <h1 className="text-white font-space-mono font-bold text-lg">Studio:</h1>
          <div className="flex flex-row space-x-1.5">
            {post.studios.map(({ studio }) => (
              <Badge key={studio.id} className="bg-[#4c6e49]">
                {studio.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Source */}
        <div className="hidden sm:flex flex-col mb-5 mt-5">
          <h1 className="text-white font-space-mono font-bold text-lg mb-2">Source:</h1>
          <div className="flex flex-row space-x-3">
              <a href={post.source[0]} target="_blank">
                <Image className="h-9 w-[100px] bg-[#181f29] rounded-2xl" src="/images/anilist-ico.svg" alt="Anilist" width={200} height={400} />
              </a>
              <a href={post.source[1]} target="_blank">
                <Image className="h-9 w-[100px] bg-[#2c51a2] rounded-2xl" src="/images/mal-ico.svg" alt="MyAnimeList" width={200} height={400} />
              </a>
              <a href={post.source[2]} target="_blank">
                <Image className="h-9 w-[100px] bg-[#2a3147] rounded-2xl" src="/images/anidb-ico.svg" alt="AniDB" width={200} height={400} />
              </a>
          </div>
        </div>
      </div>
    </div>
     <div className="grid grid-cols-3 gap-1 pt-10 px-0 sm:px-5 mb-10 bg-[#1C2029]">
      <DetailVideo dataVideo={post.postVideos} />
    </div>
</>
  )
}
