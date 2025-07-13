'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PreloadImages from './skeleton/PreloadImages';

interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

interface SlideshowProps {
  slides: SlideData[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Slideshow: React.FC<SlideshowProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 8000,
  showDots = true,
  showArrows = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, slides.length]);

  const goToSlide = (index: number) => {
    if (index !== currentSlide) setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return <div className="h-[32.25vw] bg-gray-900 flex items-center justify-center text-white">No slides available</div>;
  }

  return (
    <div className="relative h-[32.25vw] overflow-hidden bg-black">
      {/* Preload semua gambar */}
      <PreloadImages images={slides.map(s => s.imageUrl)} />

      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`
              absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out
              ${index === currentSlide ? 'opacity-100 scale-100 z-20' : 'opacity-0 scale-95 z-10 pointer-events-none'}
              bg-black
            `}
          >
            <div className="relative w-full h-full text-white flex flex-col md:flex-row items-start md:items-stretch">
              {/* Text */}
              <div className="md:w-[70%] ml-5 p-6 md:p-12 flex flex-col justify-center mb-2 z-10">
                <h1 className="max-w-[1000px] text-4xl md:text-6xl font-bold leading-tight font-space-mono mb-6">
                  {slide.title}
                </h1>
                <p className="max-w-[1000px] text-sm md:text-base text-gray-300 leading-relaxed font-poppins text-justify mb-6">
                  {slide.description}
                </p>
              </div>

              {/* Image */}
              <div className="relative w-full md:w-[30%] h-[300px] md:h-[620px] bg-black overflow-hidden">
                <Image
                  src={slide.imageUrl}
                  alt={slide.imageAlt}
                  width={600}
                  height={900}
                  priority={index === currentSlide}
                  className="object-cover w-full h-full ml-auto scale-110"
                  style={{ backgroundColor: '#000' }}
                />

                {/* Gradient kiri */}
                <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/90 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      {showArrows && slides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-30"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-all duration-200 z-30"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Thumbnails */}
      {showDots && slides.length > 1 && (
        <div className="hidden sm:flex absolute space-x-4 bottom-8 ml-4 md:ml-20 z-30 transition-all duration-500 ease-in-out">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`h-[120px] w-[80px] rounded-lg overflow-hidden transform transition-all duration-500 ease-in-out ${
                index === currentSlide
                  ? 'scale-105 brightness-100'
                  : 'brightness-50 hover:brightness-75 hover:scale-100'
              }`}
              aria-label={`Go to slide ${index + 1}: ${slide.title}`}
            >
              <Image
                src={slide.imageUrl}
                width={120}
                height={45}
                alt={slide.imageAlt}
                className="w-full h-full object-cover bg-black"
              />
            </button>
          ))}
        </div>
      )}

      {/* Slide Counter */}
      <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm z-30">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Slideshow;
