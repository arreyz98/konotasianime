import Image from "next/image";
// import { Badge } from "@/components/ui/badge";
import FilterPost from "@/components/FilterPost";
const Page = () => {
    const data = [
        {
            id : 1,
            title : 'Kusuriya no Hitorigoto 2nd Season',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176301-TIGmldLffQGX.jpg",
        },
        {
            id : 2,
            title : 'WIND BREAKER Season 2',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx178680-nIAhCizY46ZU.jpg",
        },
        {
            id : 3,
            title : 'Lazarus',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx167336-KpGIIBie71OX.png",
        },
        {
            id : 4,
            title : 'Katainaka no Ossan, Kensei ni Naru',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx179955-e4UPTow92B1O.jpg",
        },
        {
            id : 5,
            title : 'Kaoru Hana wa Rin to Saku',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx181444-vmtWANHhtVaB.jpg",
        },
        {
            id : 6,
            title : 'Saikyou no Ousama, Nidome no Jinsei wa Nani wo Suru?',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx183161-5M054tuPmZJX.jpg",
        },
        {
            id : 7,
            title : 'Kimetsu no Yaiba',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx101922-WBsBl0ClmgYL.jpg",
        },
        {
            id : 8,
            title : 'Ore dake Level Up na Ken: Season 2 - Arise from the Shadow',
            image : "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx176496-9BDMjAZGEbq4.png",
        },

    ]
    return (
        <div className="p-6 bg-[#1C2029]">
            <h1 className="font-bold text-white text-lg lg:text-3xl mb-5">List Anime</h1>
              
            <div className="flex flex-row mb-3">
              <FilterPost/>
            </div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-6 lg:gap-x-8 lg:gap-y-2">
                {data.map((data) => (
                 <div key={data.id} className="flex flex-col h-[20rem] lg:h-[30rem] rounded-2xl transition-all cursor-pointer">
                    <div className="relative h-[14rem] lg:h-[26rem]">
                        <Image src={data.image} alt="test" fill className="object-cover rounded-2xl w-1/2 " />
                    </div>
                        <h1 className="font-bold text-sm lg:text-base px-1 mt-3 text-white group-hover:text-blue-400">{data.title}</h1>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Page ;