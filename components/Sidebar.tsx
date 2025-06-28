"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
export default function Sidebar() {
    const [sidebarShow, setSidebarShow] = useState(false);

  return (
    <>
    {sidebarShow && (
    <div className="flex min-h-screen">
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900 opacity-80  transition-opacity"></div>
           <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-black shadow-xl">
                  {/* <!-- Sidebar Header --> */}
                    <div className="flex items-center ml-3 flex-shrink-0">
                        {/* <SidebarTrigger className="text-white text-2xl"/> */}
                        <Button onClick={() => setSidebarShow} className="bg-black text-white cursor-pointer"><X className="size-6" /></Button>
                        <Link href="/" className="ml-5">
                            <Image src="/images/logo.svg" alt='logo' width={100} height={100}/>
                        </Link>
                    </div>
                  </div>
                </div>
           </section>
      </div>
    </div>
    )}
    </>
  );
}
