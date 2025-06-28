"use client";

import { SearchIcon , X } from "lucide-react"
import { useState } from "react";
export const SearchPost = () => {
    const [searchMobile , setSearchMobile ] = useState(false);
    return(
        <form className="flex w-full max-w-[600px]">
            <div className="relative w-full hidden sm:block ">
                <input type="text" placeholder="Search" className="text-white w-full pl-4 py-2 pr-12 rounded-l-2xl border border-slate-700 focus:outline-none" />
            </div>
            <button className="hidden sm:block px-5 py-2.5 bg-gray-900 border border-slate-700 border-l-0 rounded-r-2xl  disabled:opacity-50 disabled:cursor-not-allowed">
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
    )
}