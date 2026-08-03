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

  const displaySlides = slides && slides.length > 0 ? slides : HERO_SLIDES;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displaySlides.length);
  }, [displaySlides.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displaySlides.length) % displaySlides.length);
  }, [displaySlides.length]);

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
      {/* Slide Transition Viewport — aspect-[9/16] on mobile (exact portrait ratio), fixed height on desktop */}
      <div className="relative w-full aspect-[9/16] sm:aspect-auto sm:h-[560px] lg:h-[622px] overflow-hidden">
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
      </div>

      {/* Navigation Arrows — desktop only */}
      <div className="absolute inset-y-0 left-2 sm:left-4 lg:left-6 right-2 sm:right-4 lg:right-6 z-30 hidden sm:flex items-center justify-between pointer-events-none">
        <button
          suppressHydrationWarning
          onClick={prevSlide}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border shadow-xl transition-all hover:scale-110 opacity-70 sm:opacity-0 group-hover/slider:opacity-100 focus:opacity-100 focus:outline-none ${
            isLight
              ? 'bg-white/80 border-[#E8E6DF] text-[#121412] hover:bg-[#141C15] hover:text-white'
              : 'bg-[#141C15]/60 border-white/20 text-white hover:bg-[#4B644C] hover:border-[#4B644C]'
          }`}
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          suppressHydrationWarning
          onClick={nextSlide}
          className={`pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md border shadow-lg transition-all hover:scale-110 opacity-70 sm:opacity-0 group-hover/slider:opacity-100 focus:opacity-100 focus:outline-none ${
            isLight
              ? 'bg-white/80 border-[#E8E6DF] text-[#121412] hover:bg-[#141C15] hover:text-white'
              : 'bg-[#141C15]/60 border-white/20 text-white hover:bg-[#4B644C] hover:border-[#4B644C]'
          }`}
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Bottom Pagination Bar */}
      <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-between max-w-[1440px] mx-auto px-6 sm:px-12 pointer-events-none">
        {/* Slide Counter */}
        <div
          className={`pointer-events-auto flex items-center gap-2 text-xs font-mono tracking-widest backdrop-blur-sm px-2.5 py-1 rounded ${
            isLight
              ? 'bg-white/80 text-[#121412] border border-[#E8E6DF]'
              : 'bg-[#141C15]/40 text-[#EAE3D2]'
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
          className={`pointer-events-auto flex items-center gap-2 backdrop-blur-sm px-3 py-1.5 rounded-full ${
            isLight ? 'bg-white/80 border border-[#E8E6DF]' : 'bg-[#141C15]/40'
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
              style={{ width: idx === currentIndex ? '28px' : '8px' }}
              aria-label={`Go to slide ${idx + 1}`}
            >
              <span
                className={`absolute inset-0 rounded-full ${
                  idx === currentIndex
                    ? isLight ? 'bg-[#141C15]' : 'bg-[#4B644C]'
                    : isLight ? 'bg-[#121412]/30 hover:bg-[#121412]/60' : 'bg-white/40 hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
