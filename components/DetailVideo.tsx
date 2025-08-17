"use client";

import { useState, useEffect } from "react";
import { Badge } from "./ui/badge";
import List from "@/components/List"; 
import { ChevronLeft, ChevronRight } from "lucide-react";

type DetailVideoProps = {
  dataVideo: {
    id: string;
    title: string;
    deskripsi: string;
    linkVideo: string | null;
    duration: string;
    episode: number;
    type : string;
    createdAt: Date;
    updatedAt: Date;
    postId: string;
    officialLinks: {
      id: string;
      url: string;
      access: string;
      platform: {
        id: string;
        name: string;
      };
    }[];
  }[];
};

const DetailVideo = ({ dataVideo }: DetailVideoProps) => {
  const [currentList, setCurrentList] = useState<"link resmi" | "nonton disini">("link resmi");
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [currentTabs, setCurrentTabs] = useState<"episodes" | "description">("episodes");

  const selected = dataVideo[selectedVideo];

  const transformedList = selected.officialLinks.map((link) => ({
    title: link.platform.name,
    status: link.access,
    rating: 0,
    subtitle: "",
    url: link.url,
  }));

  useEffect(() => {
  if (!selected.linkVideo && currentList === "nonton disini") {
    setCurrentList("link resmi");
  }
}, [selected.linkVideo, currentList]);

  const handleSelectVideo = (index: number) => {
    setSelectedVideo(index);
    if (!dataVideo[index].linkVideo) {
      setCurrentList("link resmi");
    }
  };

  // Konstanta jumlah episode per halaman
const EPISODES_PER_PAGE = 30;

// State baru
const [currentPage, setCurrentPage] = useState(0);

const totalPages = Math.ceil(dataVideo.length / EPISODES_PER_PAGE);

// Hitung episode yang sedang ditampilkan
const paginatedEpisodes = [...dataVideo]
  .sort((a, b) => {
    const aIsText = isNaN(Number(a.episode));
    const bIsText = isNaN(Number(b.episode));
    if (aIsText && !bIsText) return -1;
    if (!aIsText && bIsText) return 1;
    return Number(a.episode) - Number(b.episode);
  })
  .slice(currentPage * EPISODES_PER_PAGE, (currentPage + 1) * EPISODES_PER_PAGE);

  return (
    <>
    <div className="grid grid-cols-6 mt-10">
      {/* Video Panel */}
      <div className={`${currentList === "link resmi" ? "py-0" : "py-16"} relative bg-black border-2 border-[#4C6E49] col-span-3 h-[811px] sm:col-span-4 rounded-2xl mt-10 mb-10`}>
        <div className="absolute top-[-43] left-5">
          <div className="flex flex-row space-x-3">
            <button
              onClick={() => setCurrentList("link resmi")}
              className={`${currentList === "link resmi" ? "bg-[#4c6e49]" : "bg-black"} w-[180px] rounded-t-lg py-2`}
            >
              <p className="text-white text-center font-bold font-space-mono pr-2 ml-2">Link Resmi</p>
            </button>

            {selected.linkVideo && (
              <button
                onClick={() => setCurrentList("nonton disini")}
                className={`${currentList === "nonton disini" ? "bg-[#4c6e49]" : "bg-black"} w-[180px] rounded-t-lg py-2`}
              >
                <p className="text-white text-center font-bold font-space-mono pr-2 ml-2">Nonton Disini</p>
              </button>
            )}
          </div>
        </div>

        {currentList === "link resmi" ? (
          <div className="flex h-full justify-center relative overflow-hidden p-8">
            {transformedList.length > 0 ? (
              <List items={transformedList} />
            ) : (
              <p className="text-white text-sm">Belum ada link resmi untuk video ini.</p>
            )}
          </div>
        ) : selected.linkVideo ? (
          <div className="flex h-full items-center justify-center relative overflow-hidden">
            <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${selected.linkVideo}`} allowFullScreen />
          </div>
        ) : null}
      </div>

      {/* Tab Panel */}
      <div className="col-span-3 sm:col-span-2 mt-5 sm:mt-0">
        <div className="flex flex-col w-full sm:w-[80%] h-[854px] mx-auto bg-black rounded-2xl">
          <div className="flex flex-row mb-3">
            <button
              onClick={() => setCurrentTabs("episodes")}
              className={`${currentTabs === "episodes" ? "bg-[#4c6e49]" : "bg-black"} w-1/2 text-white font-bold font-space-mono cursor-pointer py-3 rounded-tl-lg`}
            >
              Episodes
            </button>
            <button
              onClick={() => setCurrentTabs("description")}
              className={`${currentTabs === "description" ? "bg-[#4c6e49]" : "bg-black"} w-1/2 text-white font-bold font-space-mono cursor-pointer py-3 rounded-tr-lg`}
            >
              Details
            </button>
          </div>

          {currentTabs === "episodes" ? (
        <div className="grid grid-cols-6 gap-3 p-5 bg-black text-white">
           <div className="col-span-6 flex items-center mb-3">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className=" bg-[#4C6E49] text-white disabled:opacity-50 rounded-4xl cursor-pointer px-2 py-2"
            >
              <ChevronLeft/>
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
              className="bg-[#4C6E49] text-white disabled:opacity-50 rounded-4xl cursor-pointer px-2 py-2 ml-auto"
            >
              <ChevronRight />
            </button>
          </div>
          {paginatedEpisodes.map((item) => {
            const videoIndex = dataVideo.findIndex((v) => v.id === item.id);
            const isSelected = selectedVideo === videoIndex;

            // Warna berdasarkan type
            let baseColor = "bg-[#1C2029]";
            if (item.type === "FILLER") baseColor = "bg-[#4e5972]";
            else if (item.type === "PV" || item.type === "MV") baseColor = "bg-[#355c55]";

            return (
              <div
                key={item.id}
                className={`p-2 rounded-md text-center cursor-pointer hover:bg-[#4c6e49] ${isSelected ? "bg-[#4c6e49]" : baseColor}`}
                onClick={() => handleSelectVideo(videoIndex)}
              >
                {item.episode}
              </div>
            );
          })}
        </div>

          ) : (
            <div className="p-6">
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dd className="text-white text-lg font-bold col-span-3">{selected.title}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-slate-400">Episode:</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <Badge className="bg-[#4c6e49] px-4 text-base">{selected.episode}</Badge>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-slate-400">Keterangan:</dt>
                <dd className="text-white text-justify sm:col-span-3">
                  {selected.deskripsi}
                </dd>
              </div>
            </div>
          )}
        </div>
      </div>
        </div>
    </>
  );
};

export default DetailVideo;
