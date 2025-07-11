"use client"

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";

type DataVideoProps = {
  dataVideo: {
    id: string;
    title: string;
    deskripsi: string;
    linkVideo: string;
    duration: string;
    episode: number;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
  }[];
};

const DetailVideo = ({dataVideo} : DataVideoProps) => {
  const data = dataVideo
  const [selectedVideo,SetSelectedVideo] = useState(0);
  const handleSelectVideo = (linkVideo : number) => {
    SetSelectedVideo(linkVideo)
  }
  const [currentTabs, setCurrentTabs] = useState("episodes");
  return (
    <>
     <div className="relative bg-black  col-span-3 h-[811px] sm:col-span-2 rounded-2xl py-16 mt-10 ">
      <div className="absolute top-[-40] left-5 ">
        <div className="flex flex-row  space-x-3">
            <div className="bg-[#4c6e49] w-[180px] rounded-t-lg py-2">
              <p className="text-white text-center font=bold ml-2">Server 1</p>
            </div>
            <div className="bg-[#4c6e49] w-[180px]  rounded-t-lg py-2">
              <p className="text-white text-center font=bold ml-2">Server 2</p>
            </div>
        </div>
      </div>
          <div className="flex h-full items-center justify-center relative  overflow-hidden">
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${data[selectedVideo].linkVideo}`} allowFullScreen />
              </div>
        </div>
    <div className="col-span-3 sm:col-span-1 mt-5 sm:mt-0">
    <div className="flex flex-col w-full sm:w-[80%] h-full mx-auto bg-black rounded-2xl">
      <div className="flex flex-row mb-3">
        <button onClick={() => setCurrentTabs("episodes")} className={`${currentTabs == "episodes" ? "bg-[#4c6e49]" : "bg-black"} w-1/2 text-white font-bold cursor-pointer py-3 rounded-tl-lg`}>Episodes</button>
        <button onClick={() => setCurrentTabs("description")} className={`${currentTabs == "description" ? "bg-[#4c6e49]" : "bg-black"} w-1/2  text-white font-bold cursor-pointer py-3 rounded-tr-lg`}>Details</button>
      </div>
      {currentTabs == "episodes" ? (
        <div className="flex flex-row space-x-1.5 p-5 h-[200px]">
          {data.map((item,index) => (

          <Button onClick={() => handleSelectVideo(index)} key={item.id} className={`${selectedVideo == index ? "bg-[#4c6e49] hover:bg-[#4c6e49]" : "bg-[#1C2029]"} cursor-pointer`}>{item.episode}</Button>
          ))}
          {/* <Button className="cursor-pointer hover:bg-[#1C2029]">2</Button> */}
        </div>
      ) :
        (<div className="p-6">
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dd className="text-white text-lg font-bold col-span-3 ">{data[selectedVideo].title}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-slate-400">Episodes</dt>
            <dd className="text-gray-700 sm:col-span-2">
              <Badge className="bg-[#4c6e49]  px-4 text-base">{data[selectedVideo].episode}</Badge>
            </dd>
          </div>
          <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
            <dt className="font-medium text-slate-400">Description</dt>
            <dd className="text-white text-justify sm:col-span-3">
              {data[selectedVideo].deskripsi}
            </dd>
          </div>
        </div>
        )}
    </div>
    </div>
  </>
  );
}

export default DetailVideo ;