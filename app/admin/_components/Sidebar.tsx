
'use client'

import { Home, PauseCircle, MessageCircle, Sliders} from 'lucide-react'
import { LogoutButton } from '@/components/admin/LogoutButton'
import Link from 'next/link'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
// import { cn } from '@/lib/utils'

const navItems = [
  { icon: Home, href: '/admin/dashboard', label: 'Dashboard' },
  { icon: PauseCircle, href: '/admin/posts', label: 'Postingan' },
  { icon: MessageCircle, href: '/admin/genres', label: 'Genre' },
  { icon: Sliders, href: '/admin/studios', label: 'Studio' }
]

export default function Sidebar() {
  return (
    <TooltipProvider>
      <aside className="h-screen w-16 bg-black text-white flex flex-col items-center py-4 rounded-r-xl">
        {/* Logo */}
        <div className="w-10 h-10 bg-[#4C6E49] rounded-full flex items-center justify-center">
          <span className="text-sm font-bold">K</span>
        </div>

        {/* Nav Icons */}
        <nav className="flex flex-col space-y-8 mt-10">
          {navItems.map(({ icon: Icon, href, label }, i) => (
            <Tooltip key={i}>
              <TooltipTrigger asChild>
                <Link href={href}>
                  <Icon className="w-5 h-5 hover:text-[#4C6E49] transition-colors" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="text-xs">
                {label}
              </TooltipContent>
            </Tooltip>
          ))}
        </nav>
        {/* Logout */}
        <div className="mt-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <LogoutButton/>
            </TooltipTrigger>
            <TooltipContent side="right" className="text-xs">
              Keluar
            </TooltipContent>
          </Tooltip>
        </div>
      </aside>
    </TooltipProvider>
  )
}
