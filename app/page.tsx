import LatestPost from "@/components/LatestPost";
import Slideshow from "@/components/Slideshow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
         {/* Slideshow */}
          <Slideshow/>
        <LatestPost />
      <Footer />
    </div>
  );
}
