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
    <div className="grid grid-cols-1 xl:grid-cols-6 gap-4 mt-6 sm:mt-10 px-3 sm:px-6 lg:px-8">
      {/* Video Panel */}
      <div className={`
        ${currentList === "link resmi" ? "py-0" : "py-6 sm:py-16"} 
          relative
          col-span-1 px-2 xl:col-span-4
          bg-[#1C2029] border-2 border-[#4C6E49]
          h-auto sm:h-[700px]
          rounded-2xl
          mt-10 mb-5 w-full
          pt-8 sm:pt-3
        `}
      >
        {/* Tab Switcher */}
      <div className="absolute -top-8 sm:-top-11 left-4 z-10 flex flex-row space-x-3">
        <button
          onClick={() => setCurrentList("link resmi")}
          className={`
            px-4 sm:px-8 py-2
            text-white text-sm sm:text-base font-bold font-space-mono
            transition-all
            ${currentList === "link resmi"
              ? "bg-[#1C2029] border-l-2 border-t-2 border-r-2 border-[#4C6E49] rounded-tl-lg rounded-tr-lg -mb-0.5"
              : "bg-[#252b36] border-b-2 border-[#4C6E49] opacity-70 hover:opacity-100 border-l-2 border-t-2 border-r-2 rounded-tl-lg rounded-tr-lg mb-1"
            }
            ${!selected.linkVideo ? "rounded-tr-lg" : ""}
          `}
          style={{ zIndex: currentList === "link resmi" ? 20 : 10 }}
        >
          Link Resmi
        </button>
        {selected.linkVideo && (
          <button
            onClick={() => setCurrentList("nonton disini")}
            className={`
              px-4 sm:px-8 py-2
              text-white text-sm sm:text-base font-bold font-space-mono
              transition-all
              ${currentList === "nonton disini"
                ? "bg-[#1C2029] border-l-2 border-t-2 border-r-2 border-[#4C6E49] rounded-tl-lg rounded-tr-lg -mb-0.5"
                : "bg-[#252b36] border-b-2 border-[#4C6E49] opacity-70 hover:opacity-100 border-l-2 border-t-2 border-r-2  rounded-tl-lg rounded-tr-lg mb-1"
              }
              rounded-tr-lg
            `}
            style={{ zIndex: currentList === "nonton disini" ? 20 : 10 }}
          >
            Nonton Disini
          </button>
        )}
      </div>

         {currentList === "link resmi" ? (
    <div className="flex h-full justify-center relative overflow-hidden p-4 sm:p-8">
      {transformedList.length > 0 ? (
        <List items={transformedList} />
      ) : (
        <p className="text-white text-xs sm:text-sm">Belum ada link resmi untuk video ini.</p>
      )}
    </div>
  ) : selected.linkVideo ? (
    <div className="aspect-video w-full rounded-lg overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${selected.linkVideo}`}
        allowFullScreen
        title="Video Youtube"
      />
    </div>
  ) : null}
      </div>

      {/* Tab Panel */}
      <div className="col-span-1 xl:col-span-2 mt-0 sm:mt-0">
        <div className="flex flex-col w-full sm:w-[80%] h-auto sm:h-[740px] mx-auto bg-black rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="flex flex-row mb-2 sm:mb-3">
            <button
              onClick={() => setCurrentTabs("episodes")}
              className={`${currentTabs === "episodes" ? "bg-[#4c6e49]" : "bg-black"} w-1/2 text-white font-bold font-space-mono cursor-pointer py-2 sm:py-3 rounded-tl-lg text-sm sm:text-base`}
            >
              Episodes
            </button>
            <button
              onClick={() => setCurrentTabs("description")}
              className={`${currentTabs === "description" ? "bg-[#4c6e49]" : "bg-black"} w-1/2 text-white font-bold font-space-mono cursor-pointer py-2 sm:py-3 rounded-tr-lg text-sm sm:text-base`}
            >
              Details
            </button>
          </div>

          {currentTabs === "episodes" ? (
            <div className="grid grid-cols-6 gap-2 sm:gap-3 p-3 sm:p-5 bg-black text-white">
              <div className="col-span-6 flex items-center mb-2 sm:mb-3">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                  disabled={currentPage === 0}
                  className="bg-[#4C6E49] text-white disabled:opacity-50 rounded-4xl cursor-pointer px-2 py-2"
                >
                  <ChevronLeft />
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
                    className={`p-1 sm:p-2 rounded-md text-center cursor-pointer hover:bg-[#4c6e49] ${isSelected ? "bg-[#4c6e49]" : baseColor} text-xs sm:text-base`}
                    onClick={() => handleSelectVideo(videoIndex)}
                  >
                    {item.episode}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-3 sm:p-6">
              <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4">
                <dd className="text-white text-base sm:text-lg font-bold col-span-3">{selected.title}</dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-slate-400">Episode:</dt>
                <dd className="text-gray-700 sm:col-span-2">
                  <Badge className="bg-[#4c6e49] px-3 sm:px-4 text-sm sm:text-base">{selected.episode}</Badge>
                </dd>
              </div>
              <div className="grid grid-cols-1 gap-1 py-2 sm:grid-cols-3 sm:gap-4">
                <dt className="font-medium text-slate-400">Keterangan:</dt>
                <dd className="text-white text-justify sm:col-span-3 text-sm sm:text-base">
                  {selected.deskripsi}
                </dd>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </>
)
};

export default DetailVideo;
