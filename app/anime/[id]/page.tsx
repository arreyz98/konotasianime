
import ModalInfoPost from "@/components/mobile/ModalInfoPost"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import DetailTabs from "@/components/DetailTabs"
import { getPostVideoByPostId, getVideoByPostId } from "@/lib/data"
// import DisqusComment from "@/components/DisqusComment"
export default async function Page({params} : {params : Promise<{id : string}>}) {
  const id = (await params).id

  const data = await getPostVideoByPostId(id)
  const dataVideo = await getVideoByPostId(id)
  const truncate = (input: string) => {
        return input.length > 300 ? `${input.substring(0,400)}...` : input;
    }
  
  return (
    <div>
      <div className="relative mx-auto px-4 py-8 sm:px-6 lg:px-8 h-[500px] sm:h-[600px]">
          <Image src={`${data?.post.imageBanner}`} fill alt="test" className="object-cover brightness-[50%]" />
          <div className="absolute top-10 sm:top-30 w-[400px] sm:w-[1000px]">
            <h1 className="font-bold text-white text-4xl tracking-wide">{data?.post.title}</h1>
             <div className="flex flex-row space-x-1.5 mt-3">
              {data?.post.genre.map((item, index) =>(
                    <Badge key={index} className="bg-blue-500">{item}</Badge>
              ))}
                  
            </div>
            <p className="text-white text-justify mt-4">{truncate("Banished as “useless,” Zenos, a self-taught healer from the slums, turns despair into defiance and opens a secret clinic in the city’s shadows. With unlicensed, unmatched magic, he cures, comforts, and rights wrongs, quietly becoming a legend. But as his power grows, even the royal palace takes notice. Can he buck the odds and heal a world that cast him aside?")}</p>
                {/* Studios */}
                 <div className="hidden sm:flex flex-col space-y-2 mt-4">
                  <h1 className="text-slate-300 font-bold text-lg">Studios</h1>
                  <div className="flex flex-row space-x-1.5">
                    {data?.post.studio.map((item , index) => (
                         <Badge key={index} className="bg-blue-500">{item}</Badge>
                    ))}
                  </div>
                </div>
            {/* Source */}
            <div className="hidden sm:flex flex-col mb-5 mt-5">
                  <h1 className="text-slate-300 font-bold text-lg">Source</h1>
                  <div className="flex flex-row space-x-3">
                    <div className="flex items-center flex-wrap">
                        <a href={data?.post.source[0]} target="_blank">
                          <Image className="h-14 w-full" src={"/images/anilist-logo.png"} alt="anilist" width={400} height={400}/>
                        </a>
                    </div>
                    <div className="flex items-center flex-wrap">
                        <a href={data?.post.source[1]} target="_blank">
                          <Image className="h-14 w-full" src={"/images/myanimelist.png"} alt="anilist" width={400} height={400}/>
                        </a>
                    </div>
                    <div className="flex items-center flex-wrap">
                        <a href={data?.post.source[2]} target="_blank">
                          <Image className="h-14 w-full" src={"/images/anidb.png"} alt="anilist" width={400} height={400}/>
                        </a>
                    </div>
                  </div>
                </div>
                 {/* modal info mobile */}
                <ModalInfoPost/>
          </div>
      </div>

      <div className="grid grid-cols-3 gap-1 pt-10 px-0 sm:px-5 mb-10">
          {dataVideo && (
         <DetailTabs dataVideo={dataVideo} />
          )}
      </div>

    <div className="bg-red-500">
  
    </div>

    </div>
  )
}
