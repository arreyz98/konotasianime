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
    <div className="w-full overflow-x-auto ">
        <h1 className="text-2xl text-white text-center font-poppins font-bold mb-5">Daftar penyedia platform resmi:</h1>
      <table className="w-full table-fixed border-collapse rounded-2xl overflow-hidden divide-y divide-zinc-800">
        <thead>
          <tr className="bg-[#4C6E49] text-white uppercase text-sm font-semibold rounded-3xl">
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
              <td className="py-3 px-4 font-medium text-white">
                {item.title}
              </td>
              <td className="py-3 px-4 flex items-center gap-2">
                <span
                  className={clsx
                    ('flex flex-row mx-auto px-2 py-1 rounded-md text-md font-semibold text-white',
                      {'bg-[#109D59]' : item.status === "Gratis", 
                       'bg-[#4485F6]' : item.status === "Premium", 
                       'bg-[#DA4436]' : item.status === "Berbayar",
                       'bg-[#F5B400]' : item.status === "Bioskop",
                      })}
                >
                  <span className="mr-1">
                  {item.status == "Gratis" && <BadgeCheck/> }
                  {item.status == "Berbayar" && <BadgeDollarSign />}
                  {item.status == "Premium" && <BadgeInfo />}
                  {item.status == "Bioskop" && <Projector />}
                  </span>
                  {item.status}
                </span>
              </td>
              <td className="py-3 px-4">
                <Link href={item.url} target="_blank" rel="noopener noreferrer">
                <button  className="bg-[#27272A] text-white hover:bg-[#444449] w-[60px] py-2 rounded-lg">
                    <Play className="mx-auto"/>
                </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col bg-zinc-900 mt-3 rounded-lg p-5">
        <div className="flex flex-row pb-3"> 
          <div className="w-1/10">
            <button className='flex flex-row  px-2 py-1 rounded-md text-sm font-semibold text-white bg-[#109D59]' >
                      <span className="mr-1">
                      <BadgeCheck className="size-5"/> 
                      </span>
                      Gratis
            </button>
          </div>
          <div className="w-full">
          <p className="text-white text-md ml-5">Dapat diakses gratis</p>
          </div>
        </div>
        <div className="flex flex-row py-1"> 
          <div className="w-1/10">
            <button className='flex flex-row  px-2 py-1 rounded-md text-sm font-semibold text-white bg-[#4485F6]' >
                      <span className="mr-1">
                      <BadgeCheck className="size-5"/> 
                      </span>
                      Premium
            </button>
          </div>
          <div className="w-full">
            <p className="text-white text-md ml-5">Dapat diakses gratis tapi terbatas di resolusi rendah</p>
          </div>
        </div>
        <div className="flex flex-row py-3"> 
          <div className="w-1/10">
            <button className='flex flex-row  px-2 py-1 rounded-md text-sm font-semibold text-white bg-[#F5B400]' >
                      <span className="mr-1">
                      <BadgeCheck className="size-5"/> 
                      </span>
                      Bioskop
            </button>
          </div>
          <div className="w-full">
              <p className="text-white text-md ml-5">Tersedia saat tayang di Bioskop resmi indonesia</p>
          </div>
        </div>
        <div className="flex flex-row py-1"> 
          <div className="w-1/10">
            <button className='flex flex-row  px-2 py-1 rounded-md text-sm font-semibold text-white bg-[#DA4436]' >
                      <span className="mr-1">
                      <BadgeCheck className="size-5"/> 
                      </span>
                      Berbayar
            </button>
          </div>
          <div className="w-full">
            <p className="text-white text-md ml-5">Wajib berlangganan untuk mengakses video</p>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default List;