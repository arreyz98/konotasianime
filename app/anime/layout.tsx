import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ReactNode } from 'react'

export default function AnimeLayout({ children }: { children: ReactNode }) {
  return (
    <div>
        {/* Tidak ada Navbar */}
        <main>
              <Navbar />
              {children}
            <Footer />
        </main>
    </div>
  )
}