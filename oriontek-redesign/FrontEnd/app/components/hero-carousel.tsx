
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const BACKGROUND_IMAGES = [
  {
    src: '/assets/bg-software.png',
    alt: 'Software Development & Coding',
    title: 'Software Development'
  },
  {
    src: '/assets/bg-infrastructure.png', 
    alt: 'IT Infrastructure & Servers',
    title: 'IT Infrastructure'
  },
  {
    src: '/assets/bg-analytics.png',
    alt: 'Business Technology & Analytics',
    title: 'Business Analytics'
  },
  {
    src: '/assets/bg-cloud.png',
    alt: 'Digital Transformation & Cloud',
    title: 'Cloud Solutions'
  },
  {
    src: '/assets/bg-team.png',
    alt: 'Team Collaboration & Productivity',
    title: 'Team Collaboration'
  }
];

interface HeroCarouselProps {
  children: React.ReactNode;
}

export default function HeroCarousel({ children }: HeroCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlay(true), 10000);
  };

  const handleMouseEnter = () => setIsAutoPlay(false);
  const handleMouseLeave = () => setIsAutoPlay(true);

  return (
    <section className="relative min-h-[70vh] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ 
              duration: 1.5,
              ease: [0.25, 0.25, 0.25, 1]
            }}
            className="absolute inset-0"
          >
            <Image
              src={BACKGROUND_IMAGES[currentIndex]?.src || '/assets/bg-software.png'}
              alt={BACKGROUND_IMAGES[currentIndex]?.alt || 'Background'}
              fill
              priority={currentIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-gray-900/70"></div>
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div 
        className="relative z-10 flex items-center justify-center min-h-[70vh] px-4 sm:px-6 lg:px-8"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {BACKGROUND_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-white shadow-lg scale-110'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}: ${BACKGROUND_IMAGES[index]?.title || ''}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
