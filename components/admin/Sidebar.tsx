'use client';
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { BookAudio,Home , Settings , UsersRound } from "lucide-react";
import { Avatar , AvatarFallback , AvatarImage } from "../ui/avatar";

const adminSideBarLinks = [
  {
    icon: <Home/>,
    route: "/admin",
    text: "Home",
  },
  {
    icon: <BookAudio />,
    route: "/admin/posts",
    text: "Post",
  },
  {
    icon: <UsersRound />,
    route: "/admin/books",
    text: "List Admin",
  },
  {
    icon: <Settings />,
    route: "/admin/book-requests",
    text: "Settings",
  },
];

export default function Sidebar() {

  const pathname = usePathname();
   
  
  return (
    <div className="sticky left-0 top-0 flex h-dvh flex-col  bg-white px-5 pb-5 pt-5 " >

      <div className="flex flex-row items-center gap-2 border-b border-dashed  pb-10 max-md:justify-center">
        <Image src="/images/logo-admin.jpg" alt="logo" height={48} width={48} />
        <h1 className=" text-2xl font-semibold text-[#25388C] max-md:hidden">Admin Dashboard</h1>
      </div>

      <div className="flex flex-col gap-5  ">
        {adminSideBarLinks.map((link) =>{
          const isSelected = (link.route != "/admin" && pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
          return(
            <Link className={`${isSelected ? "bg-[#25388C]" : ""} flex flex-row items-center w-full gap-2 rounded-lg px-5 py-3.5 max-md:justify-center`}  href={link.route} key={link.route}>
              {/* <div className={cn("link",isSelected && "bg-[#25388C] shadow-sm flex flex-row")}> */}
              <div className={`${isSelected ? "bg-[#25388C]" : ""} shadow-sm flex flex-row" `}>
                  <div className={`relative size-6 ${isSelected ? "text-white" : ""}`}>
                {link.icon}
                </div>
                  <p className={cn(isSelected ? " text-white text-base font-medium max-md:hidden ml-4 " : "text-base ml-4  font-medium max-md:hidden")}>
                  {link.text}
                </p>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-auto mb-8 flex w-full flex-row gap-2 rounded-full border border-[#EDF1F1] px-6 py-2 shadow-sm max-md:px-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback className="bg-amber-100">
            Arreyz
          </AvatarFallback>
        </Avatar>
         <div className="flex flex-col max-md:hidden ml-2">
          <p className="font-semibold text-[#3A354E]">Arreyz</p>
          <p className="text-xs text-[#8D8D8D]">@arreyz98@gmail.com</p>
        </div>
      </div>

    </div>
  );
}
