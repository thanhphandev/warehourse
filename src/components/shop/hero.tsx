'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const heroSlides = [
  {
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
  },
  {
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  }
];

const HeroSection = () => {
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentHeroSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const slide = heroSlides[currentHeroSlide];

  return (
    <section className="relative h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] w-full overflow-hidden">
      <Image
        src={slide.image}
        alt="Hero Background"
        fill
        priority
        className="object-cover z-0 transition-opacity duration-1000"
      />

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white text-black rounded-full p-2 backdrop-blur-md transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/60 hover:bg-white text-black rounded-full p-2 backdrop-blur-md transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentHeroSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              index === currentHeroSlide
                ? 'bg-white'
                : 'bg-white opacity-40 hover:opacity-80'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
