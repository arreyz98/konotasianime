'use client'

import Link from 'next/link'
import Image from 'next/image'
import { X } from 'lucide-react'
import { Button } from './ui/button'

type Props = {
  onClose: () => void
}

const SidebarMenu = ({ onClose }: Props) => {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900 opacity-60"></div>
      <section className="absolute inset-y-0 left-0 pr-10 max-w-full flex">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-black shadow-xl">
            <div className="flex items-center ml-3 flex-shrink-0">
              <Button onClick={onClose} className="bg-black text-white cursor-pointer">
                <X className="size-6" />
              </Button>
              <Link href="/" className="ml-5">
                <Image src="/images/logo.svg" alt="logo" width={100} height={100} />
              </Link>
            </div>
            {/* Tambahkan menu navigasi di sini */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default SidebarMenu
