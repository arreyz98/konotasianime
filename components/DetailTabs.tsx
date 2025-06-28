"use client"

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useState } from "react";
const DetailTabs = () => {
    const [currentTabs, setCurrentTabs] = useState("episodes")
    return (
              <div className="flex flex-col w-full sm:w-[80%] h-full mx-auto bg-black rounded-2xl">
            <div className="flex flex-row mb-3">
              <button onClick={() => setCurrentTabs("episodes")} className={`${currentTabs == "episodes" ? "bg-blue-500" : "bg-black"} w-1/2 text-white font-bold cursor-pointer py-3 rounded-tl-lg`}>Episodes</button>
              <button onClick={() => setCurrentTabs("description")} className={`${currentTabs == "description" ? "bg-blue-500" : "bg-black"} w-1/2  text-white font-bold cursor-pointer py-3 rounded-tr-lg`}>Details</button>
            </div>
            {currentTabs == "episodes" ? (
            <div className="flex flex-row space-x-1.5 p-5 h-[200px]">
              <Button className="bg-blue-500 cursor-pointer hover:bg-[#1C2029]">1</Button>
              <Button className="cursor-pointer hover:bg-[#1C2029]">2</Button>
              <Button className="cursor-pointer hover:bg-[#1C2029]">3</Button>
              <Button className="cursor-pointer hover:bg-[#1C2029]">4</Button>
              <Button className="cursor-pointer hover:bg-[#1C2029]">5</Button>
            </div>
            ):
            (<div className="p-6">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dd className="text-white text-lg font-bold col-span-3 ">Revival Of The Commandment</dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                        <dt className="font-medium text-slate-400">Episodes</dt>
                        <dd className="text-gray-700 sm:col-span-2">
                            <Badge className="bg-blue-500  px-4 text-base">2</Badge>
                        </dd>
                    </div>
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium text-slate-400">Description</dt>
                    <dd className="text-white text-justify sm:col-span-3">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et facilis debitis explicabo
                        doloremque impedit nesciunt dolorem facere, dolor quasi veritatis quia fugit aperiam
                        aspernatur neque molestiae labore aliquam soluta architecto?
                    </dd>
                    </div>
                </div>
                )}
          </div>
    )
}

export default DetailTabs ;