"use client";
import {AnimatePresence, motion} from "motion/react";
import Link from "next/link"
import Image from "next/image"
// import { SidebarTrigger } from "@/components/ui/sidebar" 
import { SearchPost } from "./SearchPost"
// import { AuthButton } from "@/modules/auth/ui/components/auth-button"
import { Button } from "./ui/button"
import { AlignJustify, X } from "lucide-react"
import { useState } from "react";
export const Navbar = () => {
    const [sidebarShow , setSidebarShow] = useState(false)
    return (
        <>
           <nav className="h-18 bg-black flex items-center px-2 pr-5 z-50">
            <div className="flex items-center gap-4 w-full">
            {/* Menu & Logo */}
            <div className="flex items-center flex-shrink-0">
                {/* <SidebarTrigger className="text-white text-2xl"/> */}
                <Button onClick={() => setSidebarShow(true)} className="bg-black text-white cursor-pointer"><AlignJustify className="size-6"/></Button>
                <Link href="/" className="ml-5">
                    <Image src="/images/logo.svg" alt='logo' width={100} height={100}/>
                </Link>
            </div>

            {/* Search Bar */}
                <div className="flex-1 flex max-w-[720px] ml-24">
                    <SearchPost />
                </div>

                {/* Auth Button */}
                {/* <div className="flex-shrink-0 flex items-center gap-4 ml-auto ">
                    <AuthButton/>
                </div> */}
            </div>
           </nav>

<AnimatePresence initial={false}>
           {sidebarShow && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    <motion.div transition={{ease:"easeOut"}} exit={{opacity:0}} className="absolute inset-0 bg-slate-900 opacity-60"></motion.div>
                    <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex">
                        <div className="w-screen max-w-md">
                            <motion.div initial={{ opacity: 0 , x :-100}} transition={{ ease: "easeInOut", duration: 0.5, }}animate={{opacity: 1, x:0}} exit={{opacity : 0 , x:-100}}  className="h-full flex flex-col bg-black shadow-xl">
                            {/* <!-- Sidebar Header --> */}
                                <div className="flex items-center ml-3 flex-shrink-0">
                                    {/* <SidebarTrigger className="text-white text-2xl"/> */}
                                    <Button onClick={() => setSidebarShow(false)} className="bg-black text-white cursor-pointer"><X className="size-6" /></Button>
                                    <Link href="/" className="ml-5">
                                        <Image src="/images/logo.svg" alt='logo' width={100} height={100}/>
                                    </Link>
                                </div>
                            </motion.div>
                            </div>
                    </section>
                </div>
            
                )}
</AnimatePresence>
        </>
    )
}