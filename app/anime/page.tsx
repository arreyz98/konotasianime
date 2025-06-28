
import ModalInfoPost from "@/components/mobile/ModalInfoPost"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
import DetailTabs from "@/components/DetailTabs"
// import DisqusComment from "@/components/DisqusComment"
export default function Page() {

  const truncate = (input: string) => {
        return input.length > 300 ? `${input.substring(0,400)}...` : input;
    }
  return (
    <div>
      
      <div className="relative mx-auto px-4 py-8 sm:px-6 lg:px-8 h-[500px] sm:h-[600px]">
          <Image src={"https://static1.animekai.to/77/i/4/06/67eea38e0d3a9.jpg"} fill alt="test" className="object-cover brightness-[50%]" />
          <div className="absolute top-10 sm:top-30 w-[400px] sm:w-[1000px]">
            <h1 className="font-bold text-white text-4xl tracking-wide">The Brilliant Healers New Life in the Shadows</h1>
             <div className="flex flex-row space-x-1.5 mt-3">
                    <Badge className="bg-blue-500">Action</Badge>
                    <Badge className="bg-blue-500">Drama</Badge>
                    <Badge className="bg-blue-500">Mystery</Badge>
            </div>
            <p className="text-white text-justify mt-4">{truncate("Banished as “useless,” Zenos, a self-taught healer from the slums, turns despair into defiance and opens a secret clinic in the city’s shadows. With unlicensed, unmatched magic, he cures, comforts, and rights wrongs, quietly becoming a legend. But as his power grows, even the royal palace takes notice. Can he buck the odds and heal a world that cast him aside?")}</p>
                {/* Studios */}
                 <div className="hidden sm:flex flex-col space-y-2 mt-4">
                  <h1 className="text-slate-300 font-bold text-lg">Studios</h1>
                  <div className="flex flex-row space-x-1.5">
                    <Badge className="bg-blue-500">Toei Animations</Badge>
                    <Badge className="bg-blue-500">Geno Studio</Badge>
                  </div>
                </div>
            {/* Source */}
            <div className="hidden sm:flex flex-col mb-5 mt-5">
                  <h1 className="text-slate-300 font-bold text-lg">Source</h1>
                  <div className="flex flex-row space-x-3">
                    <div className="flex items-center flex-wrap">
                        <a href="https://anilist.co/" target="_blank">
                          <Image className="h-14 w-full" src={"/images/anilist-logo.png"} alt="anilist" width={400} height={400}/>
                        </a>
                    </div>
                    <div className="flex items-center flex-wrap">
                        <a href="https://myanimelist.net/anime.php" target="_blank">
                          <Image className="h-14 w-full" src={"/images/myanimelist.png"} alt="anilist" width={400} height={400}/>
                        </a>
                    </div>
                    <div className="flex items-center flex-wrap">
                        <a href="https://anidb.net/" target="_blank">
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
        <div className="bg-black col-span-3 sm:col-span-2 rounded-2xl py-3">
          <div className="relative h-[400px] sm:h-[800px] overflow-hidden py-6">
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/6DZetvV2rDA`} allowFullScreen />
              </div>
        </div>

        <div className="col-span-3 sm:col-span-1 mt-5 sm:mt-0">
         <DetailTabs />
        </div>
      </div>

    <div className="bg-red-500">
  
    </div>

    </div>
  )
}
