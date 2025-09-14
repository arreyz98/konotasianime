'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import PreloadImages from './skeleton/PreloadImages'
import SlideshowSkeleton from './skeleton/SkeletonSlideShow'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  deskripsi: string
  imageBanner: string
}

interface SlideData {
  id: string
  title: string
  slug: string
  description: string
  imageUrl: string
  imageAlt: string
}

const Slideshow = ({
  autoPlay = true,
  autoPlayInterval = 8000,
  showDots = true,
}) => {
  const [slides, setSlides] = useState<SlideData[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [loading, setLoading] = useState(true)
  const textFadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.5, ease: 'easeOut' as const },
  }
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch('/api/user/posts/featured-posts')
        const data = await res.json()
        const formatted = data.map((post: Post) => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          description: post.deskripsi,
          imageUrl: post.imageBanner,
          imageAlt: post.title,
        }))
        setSlides(formatted)
      } catch (err) {
        console.error('Failed to load slides:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSlides()
  }, [])

  useEffect(() => {
    if (!autoPlay || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, autoPlayInterval + 200)

    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, slides.length])

  const goToSlide = (index: number) => {
    if (index !== currentSlide) {
      setCurrentSlide(index)
      setResetKey(prev => prev + 1)
    }
  }

  if (loading) {
    return <SlideshowSkeleton />
  }

  if (slides.length === 0) {
    return (
      <div className="h-[32.25vw] bg-gray-900 flex items-center justify-center text-white">
        No slides available
      </div>
    )
  }

  return (
     <div className="relative min-h-[280px] sm:min-h-0 sm:h-[32.25vw] bg-black overflow-hidden">
      <PreloadImages images={slides.map((s) => s.imageUrl)} />
        <AnimatePresence mode="wait" initial={false}>
         <motion.div
                key={slides[currentSlide].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.5,           // durasi fade in
                  ease: 'easeInOut',
                  delay: 0.1,              // ⏱️ delay antar fade masuk (fade-in delay)
                }}
                className="absolute top-0 left-0 w-full h-full"
                drag="x" // Aktifkan drag horizontal
                dragConstraints={{ left: 0, right: 0 }} // Supaya tidak benar-benar geser konten
                onDragEnd={(event, info) => {
                  const swipe = info.offset.x;
                  if (swipe < -50) {
                    // Swipe ke kiri, next slide
                    setCurrentSlide((prev) => (prev + 1) % slides.length);
                    setResetKey((k) => k + 1);
                  } else if (swipe > 50) {
                    // Swipe ke kanan, prev slide
                    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
                    setResetKey((k) => k + 1);
                  }
                }}
                style={{ touchAction: 'pan-y' }} // biar scroll vertical tetap bisa
              >
      {/* Background image on mobile */}
      <div className="absolute inset-0 w-full h-full block md:hidden z-0">
        <Image
          src={slides[currentSlide].imageUrl}
          alt={slides[currentSlide].imageAlt}
          fill
          className="w-full h-full object-cover"
          priority
        />
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <Link href={`/anime/${slides[currentSlide].slug}`}  className="relative w-full h-full z-10 flex flex-col md:flex-row items-center md:items-stretch">
        {/* TEXT */}
        <div
          className="
            flex flex-col justify-center items-center sm:items-baseline 
            w-full md:w-[70%]
            h-full
            min-h-[220px] sm:min-h-0
            px-4 py-10 md:p-12
            z-10
          "
        >
          <motion.h1
            variants={textFadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={textFadeUp.transition}
            className="text-white text-3xl xs:text-3xl sm:text-4xl md:text-6xl font-bold leading-tight font-space-mono mb-4 sm:mb-6 drop-shadow-lg"
          >
            {slides[currentSlide].title}
          </motion.h1>
          {/* DESKRIPSI HIDDEN DI MOBILE */}
          <motion.p
            variants={textFadeUp}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ ...textFadeUp.transition, delay: 0.1 }}
            className="hidden sm:block text-sm md:text-base text-gray-300 leading-relaxed font-poppins text-justify mb-4 sm:mb-6"
          >
            {slides[currentSlide].description}
          </motion.p>
        </div>

        {/* GAMBAR DI SAMPING -- HANYA DI DESKTOP */}
        <div className="hidden md:block relative w-full md:w-[30%] h-[620px] bg-black overflow-hidden">
          <Image
            src={slides[currentSlide].imageUrl}
            alt={slides[currentSlide].imageAlt}
            width={900}
            height={900}
            priority
            className="object-cover w-full h-full ml-auto scale-110"
            style={{ backgroundColor: '#000' }}
          />
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />
        </div>
      </Link>
      </motion.div>
      </AnimatePresence>

      {/* Thumbnails (hidden on mobile, show from sm up) */}
      {showDots && slides.length > 1 && (
        <div className="hidden sm:flex absolute space-x-4 bottom-8 ml-4 md:ml-20 z-30 transition-all duration-500 ease-in-out">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`h-[70px] sm:h-[120px] w-[50px] sm:w-[80px] rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'scale-105 brightness-100 ring-2 ring-white'
                  : 'brightness-50 hover:brightness-75 hover:scale-100'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            >
              <Image
                src={slide.imageUrl}
                width={200}
                height={200}
                alt={slide.imageAlt}
                className="w-full h-full object-cover bg-black"
              />
            </button>
          ))}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-white/10 z-30 overflow-hidden">
        <motion.div
          key={`${currentSlide}-${resetKey}`}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{
            duration: autoPlayInterval / 1000,
            ease: 'linear',
          }}
          className="h-full bg-[#4C6E49]"
        />
      </div>
    </div>
  )
}

export default Slideshow