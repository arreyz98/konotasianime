'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { AlignJustify, Search , X } from 'lucide-react'
import { Button } from './ui/button'
import SearchBar from './Searchbar'
import SidebarMenu from './SidebarMenu'

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [sidebarShow, setSidebarShow] = useState(false)
  const [searchModalShow, setSearchModalShow] = useState(false)

  // input modal search pada mobile dan tablet tidak bisa scroll
  useEffect(() => {
    if (searchModalShow) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }

    return () => {
      document.body.classList.remove("overflow-hidden")
    }
  }, [searchModalShow])

  return (
    <>
  <nav className="h-[72px] bg-[#272727] flex items-center px-2 md:px-4 z-50 relative">
    <div className="flex items-center justify-between w-full">
      {/* Sidebar Trigger */}
      <div className="flex items-center flex-shrink-0">
        <Button
          aria-label="Open sidebar"
          onClick={() => setSidebarShow(true)}
          className="bg-[#272727] text-white p-2 rounded-lg"
        >
          <AlignJustify className="size-6" />
        </Button>
      </div>

      {/* ✅ Logo + SearchBar (desktop mulai lg) */}
      <div className="hidden lg:flex items-center gap-4 flex-1">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={150}
            height={40}
            className="block"
          />
        </Link>
        {/* Search bar */}
        <div className="flex-1 max-w-lg ml-10">
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        </div>
      </div>

      {/* Mobile & Tablet logo */}
    <Link href="/" className="lg:hidden block">
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={120} // default mobile
        height={30}
        className="block md:hidden" // ❌ hanya tampil di mobile
      />
      <Image
        src="/images/logo.svg"
        alt="logo"
        width={160} // ✅ lebih besar untuk tablet
        height={40}
        className="hidden md:block lg:hidden" // tampil di tablet, hilang di desktop
      />
    </Link>

      {/* Mobile & Tablet Search Button */}
      <button
        type="button"
        className="p-2 rounded-full bg-[#4c6e49] text-white lg:hidden"
        aria-label="Open search"
        onClick={() => setSearchModalShow(true)}
      >
        <Search className="size-6" />
      </button>
    </div>
  </nav>

  {/* Sidebar Menu */}
  {sidebarShow && <SidebarMenu onClose={() => setSidebarShow(false)} />}

  {/* Modal Search on Mobile & Tablet */}
  {searchModalShow && (
    <div
      className="fixed inset-0 z-[100] bg-black/80 flex items-start lg:hidden pointer-events-auto"
      onClick={() => setSearchModalShow(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full bg-[#222] p-4 shadow-xl animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            forceShow
          />
          <button
            onClick={() => setSearchModalShow(false)}
            aria-label="Close search"
            className="p-2 rounded-full bg-[#333] text-white hover:bg-[#444]"
          >
            <X className="size-5" />
          </button>
        </div>
      </div>
    </div>
  )}

</>

  )
}

export default Navbar