import LatestPost from "@/components/LatestPost";
import Slideshow from "@/components/Slideshow";
import Navbar from "@/components/Navbar";
const slidesData = [
  {
    id: 1,
    title: "Mobile Suit Gundam: The Witch from Mercury",
    description: "Suletta Mercury, gadis dari luar angkasa, masuk sekolah elit Asticassia dengan Gundam terlarang. Ia terlibat dalam konflik korporasi, duel antar pilot, dan rahasia kelam di balik teknologi Gundam. Sebuah kisah tentang keberanian, identitas, dan harga yang harus dibayar untuk bertarung.",
    imageUrl: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx97731-gYxm0WorfNPM.png",
    imageAlt: "Gundam Visual"
  },
  {
    id: 2,
    title: "Attack on Titan: The Final Season",
    description: "Eren Yeager dan teman-temannya menghadapi musuh terbesar mereka dalam pertempuran terakhir melawan Titan. Rahasia dunia terbongkar, dan pilihan sulit harus dibuat untuk masa depan umat manusia. Sebuah klimaks epik dari serie yang telah mengubah dunia anime.",
    imageUrl: "https://static1.animekai.to/3d/i/4/5f/67f1573933166@300.jpg",
    imageAlt: "Attack on Titan Visual"
  },
  {
    id: 3,
    title: "Demon Slayer: Kimetsu no Yaiba",
    description: "Tanjiro Kamado berjuang melawan demon untuk menyelamatkan adiknya yang telah berubah menjadi demon. Dengan pedang dan teknik pernapasan khusus, ia bergabung dengan Demon Slayer Corps dalam misi berbahaya untuk melindungi manusia.",
    imageUrl: "https://static1.animekai.to/3b/i/4/5e/6869553da3c66.jpg",
    imageAlt: "Demon Slayer Visual"
  },
  {
    id: 4,
    title: "Jujutsu Kaisen",
    description: "Yuji Itadori bergabung dengan sekolah jujutsu untuk mengendalikan kekuatan kutukan yang ada dalam dirinya. Bersama teman-temannya, ia menghadapi kutukan-kutukan berbahaya yang mengancam dunia. Pertarungan supernatural yang penuh aksi dan emosi.",
    imageUrl: "https://static1.animekai.to/63/i/6/27/6869576240de1.jpg",
    imageAlt: "Jujutsu Kaisen Visual"
  }
];

export default function Home() {
  return (
    <div>
      <Navbar />
         {/* Slideshow */}
          <Slideshow
            slides={slidesData}
            autoPlay={true}
            autoPlayInterval={5000}
            showDots={true}
            showArrows={true}
          />
        <LatestPost />
    </div>
  );
}
