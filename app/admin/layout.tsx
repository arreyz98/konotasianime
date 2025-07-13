"use client"
import Sidebar from './_components/Sidebar'
import AdminFooter from './_components/AdminFooter'
import { SidebarMobile } from '@/components/admin/sidebar-mobile'
import PageTransitionLoader from '@/components/admin/PageTransitionLoader'
import { Suspense,ReactNode } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row items-stretch">

      {/* Sidebar mobile (atas) */}
      <SidebarMobile />

      {/* Sidebar desktop (kiri) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <main className="min-h-screen flex flex-col pb-0 pt-6 w-full">
        <Suspense fallback={<PageTransitionLoader/>}>
          {children}  
          <AdminFooter/>
        </Suspense>
        </main>
    </div>
  )
}
