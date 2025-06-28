"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { motion} from "motion/react";
import { useState, useEffect} from "react";
const MainBanner = () => {
    const dataBanner = [
        {
            id : 1,
            title : 'Hyouka',
            description : 'Hyouka bercerita tentang Oreki Houtarou, seorang siswa SMA yang menjalani hidup dengan prinsip hemat energi, tapi hidupnya mulai berubah saat ia bergabung dengan Klub Sastra Klasik atas permintaan kakaknya. Di sana, ia bertemu Chitanda Eru, gadis penuh rasa ingin tahu yang sering menyeretnya ke berbagai misteri kecil sehari-hari. Bersama dua teman lainnya, mereka menyelidiki teka-teki yang tampak sepele namun sering menyimpan makna mendalam, termasuk misteri masa lalu klub mereka sendiri. Dengan nuansa yang tenang, penuh dialog cerdas, dan visual yang indah, Hyouka mengeksplorasi cara pandang seseorang terhadap hal-hal sederhana dalam hidup.',
            imageUrl : "https://img.youtube.com/vi/9skVRRk5SmA/maxresdefault.jpg"
        },
        {
            id : 2,
            title : 'Shangri La Frontier',
            description : "When was the last time I played a game that wasnt crap? This is a world in the near future where games that use display screens are classified as retro. Anything that cant keep up with state-of-the-art VR technology is called a crap game, and you see a large number of crap games coming out. Those who devote their lives to clearing these games are called crap-game hunters, and Rakuro Hizutome is one of them. The game he s chosen to tackle next is Shangri-La Frontier, a god-tier game that has a total of thirty million players. Online friends... An expansive world... Encounters with rivals... These are changing Rakuro and all the other players fates! The best game adventure tale by the strongest crap game player begins now! ",
            imageUrl : "https://img.youtube.com/vi/_lcTgc6HOQc/maxresdefault.jpg"
        },
        {
            id : 3,
            title : 'Seven Deadly Sins',
            description : "When they were accused of trying to overthrow the monarchy, the feared warriors the Seven Deadly Sins were sent into exile. Princess Elizabeth discovers the truth - the Sins were framed by the king s guard, the Holy Knights - too late to prevent them from assassinating her father and seizing the throne! Now the princess is on the run, seeking the Sins to help her reclaim the kingdom. But the first Sin she meets, Meliodas, is a little innkeeper with a talking pig. He doesnt even have a real sword! Have the legends of the Sins strength been exaggerated? ",
             imageUrl : "https://img.youtube.com/vi/fkaKiVTd_ns/maxresdefault.jpg"
        },
        {
            id : 4,
            title : 'Wind Breaker',
            description : "Where the average scores are the lowest, but the fights are the strongest. Furin High School is renowned as a super school of delinquents. Haruka Sakura, a first-year student, came from outside the city to fight to the top. However, Furin High School has become a group that protects the town called the “Chime of the Wind Breaker” – Bofurin. The heroic legend of high school delinquent Sakura begins here!",
             imageUrl : "https://img.youtube.com/vi/Xg3Qz2b4UHs/maxresdefault.jpg"
        },

    ]
const [currentBanner, setCurrentBanner] = useState(0);


const banner = {
    id : dataBanner[currentBanner].id,
    title : dataBanner[currentBanner].title,
    description : dataBanner[currentBanner].description,
    imageUrl : dataBanner[currentBanner].imageUrl,

}

const changeBanner = (index : number) => {
    setCurrentBanner(index)
}

    
useEffect(() => {
    const interval = setInterval(() => {
        if(currentBanner == 3){
            changeBanner(0)
        }else{
            changeBanner(currentBanner + 1)
        }
    }, 5000);
    return () => clearInterval(interval)
  },[currentBanner]);

  

    return (
        <>
        <div className={`relative h-[32.25vw]`}>
     
            <Image src={banner.imageUrl} fill alt="" className={`object-cover brightness-[50%] transition ease-in-out`}/>
            <motion.div key={currentBanner} initial={{ opacity: 0 }} transition={{ ease: "easeIn", duration: 0.5, }}animate={{opacity: 1}}exit={{ opacity: 0 }} className="absolute top-[10%] md:top-[20%] ml-4 md:ml-16">
                <p className="text-white font-bold text-xl md:text-5xl h-full w-full sm:w-[70%] drop-shadow-2xl my-4 sm:my-0">{banner.title}</p>
                <p className="hidden sm:block text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-2xl">{banner.description}</p>
                <Button asChild size="sm" className="bg-blue-400 mt-0 sm:mt-5">
                    <Link href={""}>Watch Now</Link>
                </Button>
                {/* <h1 className="text-white">{currentBanner}</h1> */}
            </motion.div>
            <div className="hidden sm:flex absolute space-x-7 top-[70%] md:top-[80%] ml-4 md:ml-16">
                {dataBanner.map((data , index) => (
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => changeBanner(index)} className={`w-28 h-20 ${currentBanner == index ? "brightness-100" : "brightness-50"}` }key={index}>
                     <Image src={data.imageUrl} fill alt="" className="rounded-lg" />
                 </motion.button>
                //  className="w-28 h-20 brightness-50"
                
                ))}
                 
            </div>
        </div>
        </>
    )
}

export default MainBanner;