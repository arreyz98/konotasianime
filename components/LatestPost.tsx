// "use client" ;
// import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { getPostVideo } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { ChevronRight, ChevronLeft, EllipsisVertical } from "lucide-react";
const LatestPost = async() => {
    const truncate = (input: string) => {
        return input.length > 100 ? `${input.substring(0,200)}...` : input;
    }
    const data = await getPostVideo();
    return(
      <section className="py-10 pb-5 bg-[#1C2029]">
        <div className="px-4 sm:px-6 lg:px-2">
          <div className="flex flex-row items-center mb-7">
            <div className="font-manrope text-2xl sm:text-4xl font-bold text-white ml-0 sm:ml-12">Latest Update</div>
             <div className="hidden sm:flex flex-row ml-auto mr-0 sm:mr-12">
               <Button className="bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]"><ChevronLeft className="size-6"/></Button>
               <Button className="bg-blue-400 rounded-full cursor-pointer w-[40px]"><ChevronRight className="size-6"/></Button>
            </div>
          </div>
          <div className="flex justify-center mb-14 gap-y-8 flex-wrap  lg:gap-x-8 ">
            {data?.map((item) => (
                <Link key={item.id} href={`/anime/${item.post.id}`} className="bg-black w-full max-lg:max-w-xl lg:w-xl rounded-2xl shadow-2xl">
              <div className="relative flex  mb-6 h-[200px] sm:h-[360px]">
                  <Image src={`https://img.youtube.com/vi/${item.linkVideo}/maxresdefault.jpg`} alt="test"fill className="object-cover rounded-t-lg hover:brightness-[70%] transition-all" />
              </div>
              <div className="block p-5">
                <div className="flex">
                  <h4 className="text-white font-bold leading-8 mb-5">{item.title}</h4>
                    <Button className="ml-auto bg-black cursor-pointer">
                        <EllipsisVertical className="text-white size-5"/>
                    </Button>
                </div>
                <p className="text-sm sm:text-base text-gray-500 mb-5">{truncate(item.deskripsi)}</p>
                  <div className="flex items-center justify-between  font-medium">
                      <h6 className="text-sm text-blue-400 font-bold">Episode {item.episode}</h6>
                      <span className="text-sm text-white">{formatDate(item.createdAt.toString())}</span>
                  </div>
              </div>
             </Link>
            ))}
               
           <div className="flex sm:hidden flex-row justify-center mr-0 sm:mr-12">
               <Button className="bg-blue-400 rounded-full mr-2 cursor-pointer w-[40px]"><ChevronLeft className="size-6"/></Button>
               <Button className="bg-blue-400 rounded-full cursor-pointer w-[40px]"><ChevronRight className="size-6"/></Button>
            </div>
          </div>
        </div>
    </section>
                                            
    )
}

export default LatestPost ;