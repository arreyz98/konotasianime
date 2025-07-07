import MainBanner from "@/components/MainBanner";
import LatestPost from "@/components/LatestPost";
import Footer from "@/components/Footer";
import ShortPost from "@/components/ShortPost";
import { Navbar } from "@/components/Navbar";

// app/produk/page.tsx
export const revalidate = 60; // halaman akan otomatis di-revalidate setiap 60 detik

export default function Home() {
  
  return (
    <div className="">
        <Navbar />
      <div className="relative">
          <MainBanner />
      </div>
      <div className="">
          <LatestPost />
          <ShortPost />
      </div>
      <Footer/>
    </div>
  );
}
