import React from "react";
import Link from "next/link";
import { Play, BadgeCheck, BadgeDollarSign , BadgeInfo, Projector } from "lucide-react";
import clsx from "clsx";

interface ListItem {
  title: string;
  status: string;
  rating: number;
  subtitle?: string;
  url: string; // ⬅️ Tambahan
}

interface ListProps {
  items: ListItem[];
}

const List: React.FC<ListProps> = ({ items }) => {
  return (
  <div className="w-full overflow-x-auto px-2 sm:px-0">
    <h1 className="text-xl sm:text-2xl text-white text-center font-poppins font-bold mb-5">Daftar penyedia platform resmi:</h1>
    {/* ✅ Wrapper */}
<div className="w-full">
  {/* ✅ Tabel versi desktop */}
  <table className="hidden sm:table w-full border-collapse rounded-2xl overflow-hidden divide-y divide-zinc-800">
    <thead>
      <tr className="bg-[#4C6E49] text-white uppercase text-xs sm:text-sm font-semibold rounded-3xl">
        <th className="py-3 px-4 font-poppins">Channel Resmi</th>
        <th className="py-3 px-4 font-poppins">Akses</th>
        <th className="py-3 px-4 font-poppins">Link</th>
      </tr>
    </thead>
    <tbody className="divide-y divide-zinc-800">
      {items.map((item, index) => (
        <tr
          key={index}
          className={`hover:bg-zinc-800/50 transition text-center ${
            index % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900"
          }`}
        >
          <td className="py-3 px-4 font-medium text-white">{item.title}</td>
          <td className="py-3 px-4 w-28">
            <span
              className={clsx(
                "flex items-center justify-center gap-1 px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white text-center",
                {
                  "bg-[#109D59]": item.status === "Gratis",
                  "bg-[#4485F6]": item.status === "Premium",
                  "bg-[#DA4436]": item.status === "Berbayar",
                  "bg-[#F5B400]": item.status === "Bioskop",
                }
              )}
            >
              {item.status === "Gratis" && <BadgeCheck className="w-4 h-4" />}
              {item.status === "Berbayar" && <BadgeDollarSign className="w-4 h-4" />}
              {item.status === "Premium" && <BadgeInfo className="w-4 h-4" />}
              {item.status === "Bioskop" && <Projector className="w-4 h-4" />}
              <span className="truncate">{item.status}</span>
            </span>
          </td>

          <td className="py-3 px-4">
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              <button className="bg-[#27272A] text-white hover:bg-[#444449] w-[60px] py-2 rounded-lg">
                <Play className="mx-auto" />
              </button>
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  {/* ✅ Versi mobile: card style */}
  <div className="space-y-3 sm:hidden">
    {items.map((item, index) => (
      <div
        key={index}
        className="bg-zinc-900 p-4 rounded-xl shadow-md divide-y divide-zinc-800"
      >
        {/* Channel Resmi */}
        <div className="mb-2">
          <p className="text-xs text-zinc-400">Channel Resmi</p>
          <p className="text-white font-medium">{item.title}</p>
        </div>

        {/* Akses */}
        <div className="mb-2 pt-2">
          <p className="text-xs text-zinc-400">Akses</p>
          <span
            className={clsx(
              "inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold text-white",
              {
                "bg-[#109D59]": item.status === "Gratis",
                "bg-[#4485F6]": item.status === "Premium",
                "bg-[#DA4436]": item.status === "Berbayar",
                "bg-[#F5B400]": item.status === "Bioskop",
              }
            )}
          >
            {item.status === "Gratis" && <BadgeCheck className="w-4 h-4" />}
            {item.status === "Berbayar" && (
              <BadgeDollarSign className="w-4 h-4" />
            )}
            {item.status === "Premium" && <BadgeInfo className="w-4 h-4" />}
            {item.status === "Bioskop" && <Projector className="w-4 h-4" />}
            {item.status}
          </span>
        </div>

        {/* Link */}
        <div className="pt-2">
          <p className="text-xs text-zinc-400">Link</p>
          <Link href={item.url} target="_blank" rel="noopener noreferrer">
            <button className="bg-[#27272A] text-white hover:bg-[#444449] w-[44px] py-2 rounded-lg mt-1">
              <Play className="mx-auto" />
            </button>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>


    <div className="flex flex-col gap-2 bg-zinc-900 mt-3 rounded-lg p-5 sm:p-5 mb-5">
      {/* Penjelasan status */}
      <div className="flex flex-col sm:flex-row pb-2 sm:pb-3 items-start sm:items-center">
        <div>
          <button className='flex flex-row px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#109D59]'>
            <span className="mr-1">
              <BadgeCheck className="size-4 sm:size-5" />
            </span>
            Gratis
          </button>
        </div>
        <div className="sm:ml-5 mt-2 sm:mt-0">
          <p className="text-white text-xs sm:text-base">Dapat diakses gratis</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row py-1 items-start sm:items-center">
        <div>
        <button className="flex flex-row items-center px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#4485F6] ">
          <span className="mr-1 flex items-center">
            <BadgeCheck className="size-4 sm:size-5" />
          </span>
          Premium
        </button>
      </div>
        <div className="sm:ml-5 mt-2 sm:mt-0">
          <p className="text-white text-xs sm:text-base">Dapat diakses gratis tapi terbatas di resolusi rendah</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row py-2 items-start sm:items-center">
        <div>
          <button className='flex flex-row px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#F5B400]'>
            <span className="mr-1">
              <BadgeCheck className="size-4 sm:size-5" />
            </span>
            Bioskop
          </button>
        </div>
        <div className="sm:ml-5 mt-2 sm:mt-0">
          <p className="text-white text-xs sm:text-base">Tersedia saat tayang di Bioskop resmi indonesia</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row py-1 items-start sm:items-center">
        <div>
          <button className='flex flex-row px-2 py-1 rounded-md text-xs sm:text-sm font-semibold text-white bg-[#DA4436]'>
            <span className="mr-1">
              <BadgeCheck className="size-4 sm:size-5" />
            </span>
            Berbayar
          </button>
        </div>
        <div className="sm:ml-5 mt-2 sm:mt-0">
          <p className="text-white text-xs sm:text-base">Wajib berlangganan untuk mengakses video</p>
        </div>
      </div>
    </div>
  </div>
);
};

export default List;