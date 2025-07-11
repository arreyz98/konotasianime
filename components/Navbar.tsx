"use client";
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { AlignJustify, X , SearchIcon } from "lucide-react"
import { useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation'

export const Navbar = () => {

    // Fitur Search  ---------------------------
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSearch = searchParams.get('search') || ''
  const [search, setSearch] = useState(currentSearch)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams(searchParams.toString())
    if (search) {
      params.set('search', search)
      params.set('page', '1') // Reset ke halaman 1 saat search
    } else {
      params.delete('search')
    }
    router.push(`/search?${params.toString()}`)
  }
//  -----------------------------------------------
    const [searchMobile , setSearchMobile ] = useState(false);
    const [sidebarShow , setSidebarShow] = useState(false)


    return (
        <>
           <nav className="h-18 bg-[#272727] flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
            {/* Menu & Logo */}
            <div className="flex items-center flex-shrink-0">
                {/* <SidebarTrigger className="text-white text-2xl"/> */}
                <Button onClick={() => setSidebarShow(true)} className="bg-[#1212] text-white cursor-pointer"><AlignJustify className="size-6"/></Button>
                <Link href="/" className="ml-5">
                    <Image src="/images/logo.svg" alt='logo' width={180} height={180}/>
                </Link>
            </div>

            {/* Search Bar */}
                <div className="flex-1 flex max-w-[720px] ml-24">
                     <form onSubmit={handleSubmit} className="flex w-full max-w-[600px]">
            <div className="relative w-full hidden sm:block ">
                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search" className="bg-[#121212] text-white w-full pl-4 py-2 pr-12 rounded-l-2xl border border-[#121212] focus:outline-none" />
            </div>
            <button className="hidden sm:block px-5 py-2.5 bg-[#4c6e49] border border-[#121212] border-l-0 rounded-r-2xl  disabled:opacity-50 disabled:cursor-not-allowed">
             <SearchIcon className="text-gray-400 size-5"/>
            </button>
            <button type="button" onClick={() => setSearchMobile(!searchMobile)} className="block sm:hidden ml-auto p-3 bg-gray-900 border border-slate-700 rounded-full cursor-pointer">
                {searchMobile ? (<X className="text-gray-400 size-5"/> ) : (<SearchIcon className="text-gray-400 size-5" />)}
            </button>

            {/* Mobile Search */}
            {searchMobile && (
                <div className="sm:hidden absolute z-50 inset-x-0 inset-y-18 h-[140px]">
                    <div className="absolute inset-0 bg-black opacity-80   transition-opacity"></div>
                    <section className="absolute inset-y-6 max-w-full flex">
                        <div className="w-screen max-w-full">
                            <div className="h-full flex flex-col shadow-xl">
                                <div className="flex items-center ml-3 flex-shrink-0 ">
                                    <input type="text" placeholder="Search" className="bg-black text-white w-sm pl-4 py-4 rounded-l-2xl focus:outline-none" />
                                    <button className="px-5 py-4 bg-gray-900 border border-slate-700 border-l-0 rounded-r-2xl cursor-pointer  disabled:opacity-50 disabled:cursor-not-allowed">
                                        <SearchIcon className="text-gray-400 size-5"/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            )}

        </form>
                </div>

                {/* Auth Button */}
                {/* <div className="flex-shrink-0 flex items-center gap-4 ml-auto ">
                    <AuthButton/>
                </div> */}
            </div>
           </nav>
           {sidebarShow && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <div className="absolute inset-0 bg-slate-900 opacity-60"></div>
                    <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex">
                        <div className="w-screen max-w-md">
                            <div className="h-full flex flex-col bg-black shadow-xl">
                            {/* <!-- Sidebar Header --> */}
                                <div className="flex items-center ml-3 flex-shrink-0">
                                    {/* <SidebarTrigger className="text-white text-2xl"/> */}
                                    <Button onClick={() => setSidebarShow(false)} className="bg-black text-white cursor-pointer"><X className="size-6" /></Button>
                                    <Link href="/" className="ml-5">
                                        <Image src="/images/logo.svg" alt='logo' width={100} height={100}/>
                                    </Link>
                                </div>
                            </div>
                            </div>
                    </section>
                </div>
           )}
        </>
    )
}