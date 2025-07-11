"use client"
import Sidebar from './_components/Sidebar'
import { SidebarMobile } from '@/components/admin/sidebar-mobile'
import PageTransitionLoader from '@/components/admin/PageTransitionLoader'
import { Suspense } from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row items-stretch">

      {/* Sidebar mobile (atas) */}
      <SidebarMobile />

      {/* Sidebar desktop (kiri) */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Konten utama */}
      <main className="flex-1 p-6">
        <PageTransitionLoader />
        <Suspense fallback={<PageTransitionLoader/>}>
          {children}  
        </Suspense>
        </main>
    </div>
  )
}
