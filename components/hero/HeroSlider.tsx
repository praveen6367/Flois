'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { HeroSlide, SlideData } from './HeroSlide';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES: SlideData[] = [
  {
    id: 'slide-1',
    categoryTitle: 'RootHerb Hair Growth Oil',
    headlineHighlight1: '51% Proven Hair Growth',
    headlineMiddle: 'in',
    headlineHighlight2: '90 Days',
    headlineEnd: 'Clinical Therapy',
    description: '7 certified Ayurvedic oils. No mineral oil. No parabens. Just pure botanical science.',
    bgImage: '/placeholders/banner1background.png',
    mobileBgImage: '/placeholders/mobilebackground1.png',
    isLightTheme: true,
    giftTitle: 'Neem Wood Comb',
    shopLink: '/products/rootherb-hair-growth-oil',
    ctaText: 'SHOP NOW',
    trustFeatures: [
      { iconName: 'leaf', label: 'Lightweight' },
      { iconName: 'toxins', label: 'No Toxins' },
      { iconName: 'oil', label: 'No Mineral Oil' },
      { iconName: 'chemicals', label: 'No Chemicals' }
    ]
  },
  {
    id: 'slide-2',
    categoryTitle: 'De-Tan Sunscreen Gel',
    headlineHighlight1: 'Advanced Protection,',
    headlineMiddle: 'Visible',
    headlineHighlight2: 'Brightness',
    headlineEnd: '& Defense',
    description: 'SPF 50+ PA++++. No white cast. Sweat resistant. Formulated for Indian skin.',
    bgImage: '/placeholders/banner2background.png',
    mobileBgImage: '/placeholders/mobilebackground2.png',
    isLightTheme: true,
    giftTitle: 'Botanical Sun Pouch',
    shopLink: '/products/advanced-de-tan-sunscreen-gel',
    ctaText: 'SHOP SUN CARE',
    trustFeatures: [
      { iconName: 'sun', label: 'No White Cast' },
      { iconName: 'uv', label: 'UVA, UVB Protection' },
      { iconName: 'water', label: 'Sweat Resistant' },
      { iconName: 'skin', label: 'All Skin Types' }
    ]
  }
];

const slideVariants: Variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  })
};

export function HeroSlider({ slides = HERO_SLIDES }: { slides?: SlideData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const displaySlides = slides && slides.length > 0 ? slides : HERO_SLIDES;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    // Swipe left -> next slide; Swipe right -> prev slide (threshold 40px)
    if (diff > 40) {
      nextSlide();
    } else if (diff < -40) {
      prevSlide();
    }
    setTouchStart(null);
  };

  useEffect(() => {
    if (isPaused || displaySlides.length <= 1) return;
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, displaySlides.length]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  };

  const currentSlide = displaySlides[currentIndex];
  const isLight = Boolean(currentSlide.isLightTheme);

  return (
    <section
      className={`relative w-full max-w-[1600px] mx-auto overflow-hidden group/slider focus:outline-none transition-colors duration-500 ${
        isLight ? 'bg-[#FAF9F5]' : 'bg-[#141C15]'
      }`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="FLOIS Hero Banner Carousel"
    >
      {/* Slide Transition Viewport with Touch Swipe Gestures for Mobile */}
      <div 
        className="relative w-full aspect-[9/16] sm:aspect-auto sm:h-[560px] lg:h-[622px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <HeroSlide
              slide={currentSlide}
              isActive={true}
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows — Enabled for both Mobile & Desktop */}
        <div className="absolute inset-y-0 left-2.5 sm:left-4 lg:left-6 right-2.5 sm:right-4 lg:right-6 z-30 flex items-center justify-between pointer-events-none">
          <button
            suppressHydrationWarning
            onClick={prevSlide}
            className={`pointer-events-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full backdrop-blur-md border shadow-lg transition-all active:scale-95 hover:scale-105 opacity-90 sm:opacity-0 group-hover/slider:opacity-100 focus:opacity-100 focus:outline-none ${
              isLight
                ? 'bg-white/85 border-[#E8E6DF] text-[#121412] hover:bg-[#141C15] hover:text-white'
                : 'bg-[#141C15]/75 border-white/20 text-white hover:bg-[#8C9B3E] hover:border-[#8C9B3E]'
            }`}
            aria-label="Previous Slide"
          >
            <ChevronLeft className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>

          <button
            suppressHydrationWarning
            onClick={nextSlide}
            className={`pointer-events-auto flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full backdrop-blur-md border shadow-lg transition-all active:scale-95 hover:scale-105 opacity-90 sm:opacity-0 group-hover/slider:opacity-100 focus:opacity-100 focus:outline-none ${
              isLight
                ? 'bg-white/85 border-[#E8E6DF] text-[#121412] hover:bg-[#141C15] hover:text-white'
                : 'bg-[#141C15]/75 border-white/20 text-white hover:bg-[#8C9B3E] hover:border-[#8C9B3E]'
            }`}
            aria-label="Next Slide"
          >
            <ChevronRight className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Bottom Pagination Bar */}
      <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-30 flex items-center justify-between max-w-[1440px] mx-auto px-4 sm:px-12 pointer-events-none">
        {/* Slide Counter */}
        <div
          className={`pointer-events-auto flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono tracking-widest backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm ${
            isLight
              ? 'bg-white/85 text-[#121412] border border-[#E8E6DF]'
              : 'bg-[#141C15]/60 text-[#EAE3D2] border border-white/10'
          }`}
        >
          <span className={`font-semibold ${isLight ? 'text-[#121412]' : 'text-white'}`}>
            0{currentIndex + 1}
          </span>
          <span>/</span>
          <span>0{displaySlides.length}</span>
        </div>

        {/* Indicator Progress Dots */}
        <div
          className={`pointer-events-auto flex items-center gap-1.5 sm:gap-2 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full shadow-sm ${
            isLight ? 'bg-white/85 border border-[#E8E6DF]' : 'bg-[#141C15]/60 border border-white/10'
          }`}
        >
          {displaySlides.map((slide, idx) => (
            <button
              suppressHydrationWarning
              key={slide.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className="relative h-1.5 rounded-full transition-all duration-300 focus:outline-none"
              style={{ width: idx === currentIndex ? '24px' : '7px' }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span
                className={`absolute inset-0 rounded-full ${
                  idx === currentIndex
                    ? isLight ? 'bg-[#8C9B3E]' : 'bg-[#CBD285]'
                    : isLight ? 'bg-[#121412]/25 hover:bg-[#121412]/50' : 'bg-white/35 hover:bg-white/65'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
