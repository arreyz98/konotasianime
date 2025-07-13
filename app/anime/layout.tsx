import { Navbar } from "@/components/Navbar";
import { ReactNode } from 'react'

export default function AnimeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
        {/* Tidak ada Navbar */}
        <main>
              <Navbar />
              {children}
        </main>
    </div>
  )
}