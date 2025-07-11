'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Video,
  Users,
  LogOut,
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import clsx from 'clsx'
import Image from 'next/image'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/posts', label: 'Postingan', icon: Video },
  { href: '/admin/users', label: 'Pengguna', icon: Users },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 h-screen sticky top-0 flex flex-col justify-between bg-zinc-900 border-r border-zinc-800 shadow-lg">
      {/* 🔷 Header */}
      <div className="px-6 py-6">
        <Link href="/" className="flex items-center justify-center">
          <Image src="/images/logo.svg" alt="Logo" width={140} height={140} />
        </Link>

        {/* 🔗 Navigation */}
        <nav className="mt-10">

            <div className="flex flex-col gap-3 mt-5">
                {navItems.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href

                return (
                    <Link
                    key={href}
                    href={href}
                    className={clsx(
                        'flex items-center gap-4 px-5 py-3 rounded-lg transition-all duration-200 group',
                        isActive
                        ? 'bg-[#4C6E49] text-white shadow  pl-[calc(1.25rem-1px)]'
                        : 'text-zinc-300 hover:bg-zinc-800'
                    )}
                    >
                    <Icon
                        className={clsx(
                        'w-6 h-6',
                        isActive ? 'text-white' : 'text-zinc-400 group-hover:text-white group-hover:scale-110'
                        )}
                    />
                    <span className="text-base font-semibold">{label}</span>
                    </Link>
                )
                })}
            </div>
            </nav>

      </div>

      {/* 🔻 Footer - Logout */}
      <div className="px-6 py-4">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-red-400 hover:text-red-500 hover:bg-zinc-800 transition"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
