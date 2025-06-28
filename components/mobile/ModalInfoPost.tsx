"use client";

import { Info, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";

const ModalInfoPost = () => {
    const [isModalInfoMobile,setIsModalInfoMobile] = useState(false)

    return(
        <div>
            <Button onClick={() => setIsModalInfoMobile(true)} className="block sm:hidden bg-blue-500 cursor-pointer mt-2"><Info className="text-white size-5" /></Button>
        {isModalInfoMobile && (
        <div className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
        <div className="w-full max-w-md rounded-lg bg-black p-6 shadow-lg dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <h2 id="modalTitle" className="font-bold text-2xl text-white">
              Info
            </h2>
            <button onClick={() => setIsModalInfoMobile(false)} type="button" className="-me-4 -mt-4 rounded-full p-2 text-gray-400 cursor-pointer" aria-label="Close">
             <X className="text-white size-5" />
            </button>
          </div>
          <div className="flow-root mt-4">
    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dd className="text-white font-bold sm:col-span-2">The Brilliant Healers New Life in the Shadows</dd>
    </div>

     <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-white">Description</dt>
      <dd className="text-white text-sm text-justify sm:col-span-2">
        Banished as “useless,” Zenos, a self-taught healer from the slums, turns despair into defiance and opens a secret clinic in the city’s shadows. With unlicensed, unmatched magic, he cures, comforts, and rights wrongs, quietly becoming a legend. But as his power grows, even the royal palace takes notice. Can he buck the odds and heal a world that cast him aside?
      </dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-white">Genres</dt>
      <dd className="text-white sm:col-span-2">
         <div className="flex flex-row space-x-1.5">
                    <Badge className="bg-blue-500">Action</Badge>
                    <Badge className="bg-blue-500">Drama</Badge>
                    <Badge className="bg-blue-500">Mystery</Badge>
            </div>
      </dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-white">Studios</dt>
      <dd className="text-white sm:col-span-2">
                  <div className="flex flex-row space-x-1.5">
                    <Badge className="bg-blue-500">Toei Animations</Badge>
                    <Badge className="bg-blue-500">Geno Studio</Badge>
                  </div>
      </dd>
    </div>

    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
      <dt className="font-medium text-white">Source</dt>
      <dd className="text-white sm:col-span-2">
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
      </dd>
    </div>
</div>  
        </div>
      </div>
        )}
      </div>
    )
}

export default ModalInfoPost;