import LatestPost from "@/components/LatestPost";
import Slideshow from "@/components/Slideshow";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
         {/* Slideshow */}
          <Slideshow/>
        <LatestPost />
    </div>
  );
}
