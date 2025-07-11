import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import LatestPost from "@/components/LatestPost";

export default function Home() {
  return (
    <div>
      <Navbar/>
       <div className={`relative h-[32.25vw]`}>
             <div className="relative w-full bg-black text-white flex flex-col md:flex-row items-start md:items-stretch">
                  {/* Left: Text Content */}
                  <div className="md:w-[70%] ml-5 p-6 md:p-12">
                    <h1 className="w-[1000px] text-4xl md:text-6xl font-space-mono font-extrabold leading-tight mb-6">
                      Mobile Suit Gundam: 
                      The Witch from Mercury
                    </h1>
                    <p className="w-[1000px] text-sm md:text-base text-gray-300 font-poppins leading-relaxed text-justify">
                      Suletta Mercury, gadis dari luar angkasa, masuk sekolah elit Asticassia dengan Gundam terlarang.
                      Ia terlibat dalam konflik korporasi, duel antar pilot, dan rahasia kelam di balik teknologi Gundam.
                      Sebuah kisah tentang keberanian, identitas, dan harga yang harus dibayar untuk bertarung.
                    </p>
                  </div>
            
                  {/* Right: Image */}
                  <div className="overflow-hidden w-[30%] h-[620px] relative">
                    <Image
                      src="https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png"
                      alt="Gundam Visual" width={600} height={900}
                      className="object-cover w-full h-full ml-auto scale-110"
                    />
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent pointer-events-none" /> </div>
                    <div className="hidden sm:flex absolute space-x-7 bottom-30  ml-4 md:ml-16 z-10 ">
                        <div className="h-[45px] w-[80px]">
                        <Image src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png"} width={200} height={200} alt="" className="rounded-lg" />
                        </div>
                        <div className="h-[45px] w-[80px]">
                        <Image src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png"} width={200} height={200} alt="" className="rounded-lg" />
                        </div>
                        <div className="h-[45px] w-[80px]">
                        <Image src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png"} width={200} height={200} alt="" className="rounded-lg" />
                        </div>
                        <div className="h-[45px] w-[80px]">
                        <Image src={"https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png"} width={200} height={200} alt="" className="rounded-lg" />
                        </div>
                </div>
                </div>
        </div>
        <LatestPost />
    </div>
  );
}
