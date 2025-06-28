import MainBanner from "@/components/MainBanner";
import LatestPost from "@/components/LatestPost";
import Footer from "@/components/Footer";
import ShortPost from "@/components/ShortPost";

export default function Home() {
  return (
    <div className="">
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
