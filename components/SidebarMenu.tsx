'use client'

import { useState } from 'react'
import {
  X,
  Smile,
  Gamepad2,
  MessageCircle,
  Cpu,
  Star,
  Clapperboard,
  ChevronDown,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './ui/button'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  onClose: () => void
}

const SidebarMenu = ({ onClose }: Props) => {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label))
  }

  const topics = [
    {
      icon: <Smile className="size-5" />,
      label: 'Internet Culture (Viral)',
      subItems: ['Memes', 'Trends', 'Communities','Communities1','Communities2','Communities3','Communities4','Communities5','Communities6'],
    },
    {
      icon: <Gamepad2 className="size-5" />,
      label: 'Games',
      subItems: ['PC Games', 'Console', 'Mobile'],
    },
    {
      icon: <MessageCircle className="size-5" />,
      label: 'Q&As',
      subItems: ['AMA', 'Discussions'],
    },
    {
      icon: <Cpu className="size-5" />,
      label: 'Technology',
      subItems: ['AI', 'Programming', 'Gadgets'],
    },
    {
      icon: <Star className="size-5" />,
      label: 'Pop Culture',
      subItems: ['Music', 'Celebrities'],
    },
    {
      icon: <Clapperboard className="size-5" />,
      label: 'Movies & TV',
      subItems: ['Anime', 'Series', 'Hollywood'],
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Sidebar */}
      <aside className="relative z-50 w-80 h-screen bg-[#1C1C1C] border-r border-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-800">
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-300 hover:text-white"
          >
            <X className="size-6" />
          </Button>
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.svg" alt="logo" width={120} height={32} />
          </Link>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 py-4">
          {/* Recent */}
          <div className="mb-6">
            <button className="w-full flex items-center justify-between text-base font-semibold text-gray-200 hover:bg-gray-800 px-2 py-2 rounded-md">
              <span>RECENT</span>
              <ChevronDown className="size-5 text-gray-400" />
            </button>
          </div>

          {/* Topics */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-2 px-2">TOPICS</p>
            <nav className="space-y-1">
              {topics.map((item) => (
                <div key={item.label}>
                  <button
                    onClick={() => toggleMenu(item.label)}
                    className="w-full flex items-center justify-between px-2 py-3 text-base text-gray-200 rounded-md hover:bg-white/10 transition"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <ChevronDown
                      className={`size-5 text-gray-400 transition-transform duration-300 ${
                        openMenu === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Submenu with animation */}
                  <AnimatePresence initial={false}>
                    {openMenu === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="ml-10 mt-1 space-y-1">
                          {item.subItems.map((sub) => (
                            <Link
                            key={sub}
                            href="#"
                            className="block px-2 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md"
                          >
                            {sub}
                          </Link>

                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default SidebarMenu
