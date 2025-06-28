"use client"

import { Button } from "./ui/button";
import { Columns2, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";

const ShortPost = () => {
   const data= [
      {
         id : 0,
         urlVideo : 'https://www.tiktok.com/player/v1/7502381449455078674?&music_info=0&description=1&controls=1&progress_bar=0&timestamp=0&closed_caption=0'
      },
      {
         id : 1,
         urlVideo : 'https://www.tiktok.com/player/v1/7517645078865677576?&music_info=0&description=1&controls=1&progress_bar=0&timestamp=0&closed_caption=0'
      },
      {
         id : 2,
         urlVideo : 'https://www.tiktok.com/player/v1/7514998947048377656?&music_info=0&description=1&controls=1&progress_bar=0&timestamp=0&closed_caption=0'
      },
      {
         id : 3,
         urlVideo :'https://www.tiktok.com/player/v1/7477872790918450450?&music_info=0&description=1&controls=1&progress_bar=0&timestamp=0&closed_caption=0'
      }

   ]
   const [currentShort,setCurrentShort] = useState(0)
   // const [dataShort,setDataShort] = useState()   
    return (
       <section className=" bg-[#1C2029] pb-10">
         <div className="flex flex-row ">
            <div className="flex flex-row ml-5 sm:ml-16 ">
               <Columns2 className=" text-white size-7 sm:size-10 mr-2"/>
               <h1 className="text-2xl sm:text-4xl font-bold text-white mb-5">Short</h1>
            </div>
            <div className="hidden sm:flex flex-row ml-auto mr-5 sm:mr-16">
               <Button className="bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]"><ChevronLeft className="size-6"/></Button>
               <Button className="bg-blue-400 rounded-full cursor-pointer w-[40px]"><ChevronRight className="size-6"/></Button>
            </div>
         </div>
            <div className="hidden sm:flex px-0 sm:px-6 lg:px-2 flex-nowrap mx-0 sm:mx-10">
               {data.map(data => (
               <div key={data.id} className="p-4 px-2 xl:w-1/6 md:w-1/2 w-1/2">
                 <iframe className="w-full h-[400px] sm:h-[600px] rounded-2xl" src={data.urlVideo} allow="fullscreen" title="test"></iframe>
               </div>
               ))}
            </div>
            {/* Mobile */}
            <div className="flex sm:hidden px-0 sm:px-6 lg:px-2 flex-nowrap mx-0 sm:mx-10">
               {data.slice(currentShort,4).filter((item , index) => index < 2 ).map( data  => (
               <div key={data.id} className="px-2 w-1/2">
                 <iframe className="w-full h-[400px] rounded-2xl" src={data.urlVideo} allow="fullscreen" title="test"></iframe>
               </div>
               ))}
            </div>
             <div className="flex sm:hidden flex-row justify-center mt-5">
               <Button onClick={() => setCurrentShort(currentShort - 2)} disabled={currentShort == 0} className={`bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]`}><ChevronLeft className="size-6"/></Button>
               <Button onClick={() => setCurrentShort(currentShort + 2)} disabled={currentShort == 2} className="bg-blue-400 rounded-full cursor-pointer w-[40px]"><ChevronRight className="size-6"/></Button>
            </div>
       </section>

    )
}

export default ShortPost ;