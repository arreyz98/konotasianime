'use client'

import { Menu} from 'lucide-react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'

export function SidebarMobile() {
  return (
    <div className="md:hidden p-4 border-b border-zinc-800 bg-zinc-900 flex justify-between items-center">
      <span className="font-bold text-lg">Admin Panel</span>

      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6" />
        </SheetTrigger>
        <SheetContent side="left" className="bg-zinc-900 text-white">
          <nav className="flex flex-col gap-4 mt-8">
            <Link href="/admin/dashboard">Dashboard</Link>
            <Link href="/admin/posts">Postingan</Link>
            <Link href="/admin/users">Pengguna</Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-red-400 text-left"
            >
              Logout
            </button>
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  )
}
