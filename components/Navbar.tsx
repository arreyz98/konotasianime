'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { AlignJustify } from 'lucide-react'
import { Button } from './ui/button'
import SearchBar from './Searchbar'
import SidebarMenu from './SidebarMenu'
import MobileSearch from './MobileSearch'

export const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchMobile, setSearchMobile] = useState(false)
  const [sidebarShow, setSidebarShow] = useState(false)

  return (
    <>
      <nav className="h-18 bg-[#272727] flex items-center px-2 pr-5 z-50">
        <div className="flex items-center gap-4 w-full">
          {/* Sidebar Trigger & Logo */}
          <div className="flex items-center flex-shrink-0">
            <Button
              aria-label="Open sidebar"
              onClick={() => setSidebarShow(true)}
              className="bg-[#1212] text-white"
            >
              <AlignJustify className="size-6" />
            </Button>
            <Link href="/" className="ml-5">
              <Image src="/images/logo.svg" alt="logo" width={180} height={180} />
            </Link>
          </div>

          {/* Desktop + Mobile Search */}
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSearchMobile={setSearchMobile}
            searchMobile={searchMobile}
          />
        </div>
      </nav>

      {searchMobile && (
        <MobileSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={() => setSearchMobile(false)}
        />
      )}

      {sidebarShow && <SidebarMenu onClose={() => setSidebarShow(false)} />}
    </>
  )
}

export default Navbar
