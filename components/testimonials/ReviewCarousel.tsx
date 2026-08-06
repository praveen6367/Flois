'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Quote } from 'lucide-react';
import { CustomerReview } from './ReviewCard';

const REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Mohammed Mukhtar',
    date: '21 January 2025',
    rating: 5,
    isVerified: true,
    productName: 'RootHerb Botanical Hair Growth Oil',
    title: 'Unbelievable Quality & Natural Jasmine Aroma',
    body: 'First of all, its packing is wonderful and the natural jasmine botanical fragrance gives a different kind of calm feeling. I have been using it for 3 weeks and hair fall has dropped significantly. First class product!',
    helpfulCount: 14,
    photoUrl: '/placeholders/1b.png'
  },
  {
    id: 'rev-2',
    author: 'Pooja Deshmukh',
    date: '15 April 2025',
    rating: 5,
    isVerified: true,
    productName: 'Advanced De-Tan Sunscreen Gel SPF 50+',
    title: 'No White Cast, Leaves Skin Hydrated & Glowing',
    body: 'I am so glad to receive this sunscreen gel! Curiously, I opened it and was surprised to see how lightweight and non-greasy it is. Leaves my skin feeling hydrated, soft, and protected all day under the sun without breakouts.',
    helpfulCount: 10,
    photoUrl: '/placeholders/2b.png'
  },
  {
    id: 'rev-3',
    author: 'Ananya Roy',
    date: '27 June 2025',
    rating: 5,
    isVerified: true,
    productName: 'RootHerb Oil & Neem Comb Set',
    title: 'Excellent Product! Go For It Without Thinking',
    body: 'Very happy with the product! Makes hair smooth, gives a lovely natural shine, and covers greys naturally. Combating bald patches was frustrating until FLOIS. Great convenient and effective botanical product.',
    helpfulCount: 19,
    photoUrl: '/placeholders/3b.png'
  },
  {
    id: 'rev-4',
    author: 'Rohan Malhotra',
    date: '26 December 2024',
    rating: 5,
    isVerified: true,
    productName: 'Handcrafted Neem Wood Comb',
    title: 'Accelerated Hair Growth & Reduced Hair Fall',
    body: 'Helps me accelerate my hair growth and reduced my hair fall to an extent. I have dry scalp so after applying the RootHerb oil with this neem comb, it really moisturizes my scalp and reduces itchiness.',
    helpfulCount: 7,
    photoUrl: '/placeholders/4b.png'
  }
];

export function ReviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = REVIEWS[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full max-w-[1280px] mx-auto rounded-3xl bg-[#F8F6F3] border border-[#E8E6DF] p-6 sm:p-10 lg:p-14 shadow-xl overflow-hidden"
    >
      {/* Background Decorative Quote Mark */}
      <Quote className="absolute -top-6 -right-6 h-64 w-64 text-[#ACB041]/10 pointer-events-none" />

      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left"
        >
          {/* Left Column: Transformation Spotlight Photo (5 Cols) */}
          <div className="lg:col-span-5 relative w-full aspect-[4/4.5] sm:aspect-[4/4] rounded-2xl overflow-hidden shadow-2xl border border-[#E8E6DF] bg-[#FFFFFF]">
            {current.photoUrl && (
              <Image
                src={current.photoUrl}
                alt={`Transformation story by ${current.author}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 450px"
                className="object-cover object-center"
              />
            )}

            {/* Overlaid Verified Tag */}
            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-[#111111]/85 backdrop-blur-md px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FFFFFF] shadow-lg border border-white/10">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#ACB041]" />
              <span>Verified Customer Transformation</span>
            </div>
          </div>

          {/* Right Column: Editorial Quote & Product Connection (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Stars & Product Tag */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-1 text-[#C8A96E]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C8A96E] text-[#C8A96E]" />
                ))}
                <span className="text-xs font-sans font-semibold text-[#111111] ml-1.5">
                  5.0 / 5.0 Rating
                </span>
              </div>

              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#6A9739] bg-[#F7F8EE] px-3 py-1 rounded-full border border-[#E0E4B3]">
                {current.productName}
              </span>
            </div>

            {/* Big Editorial Quote Headline */}
            <div className="space-y-3">
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#111111] font-normal leading-[1.2]">
                "{current.title}"
              </h3>
              <p className="font-sans text-base sm:text-lg text-[#333333] font-light leading-relaxed">
                {current.body}
              </p>
            </div>

            {/* Author Attribution */}
            <div className="pt-2">
              <h4 className="font-serif text-xl text-[#111111] font-normal">
                {current.author}
              </h4>
              <p className="text-xs font-sans text-[#666666]">
                Reviewed in India on {current.date}
              </p>
            </div>

            {/* Bottom Controls Bar: Pagination Dots & Navigation */}
            <div className="pt-6 border-t border-[#E8E6DF] flex items-center justify-between gap-4">
              
              {/* Slide Counter & Dots */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-semibold text-[#111111]">
                  0{currentIndex + 1} / 0{REVIEWS.length}
                </span>

                <div className="flex items-center gap-1.5">
                  {REVIEWS.map((_, idx) => (
                    <button
                      suppressHydrationWarning
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? 'w-8 bg-[#ACB041]' : 'w-2 bg-[#D4D0C5] hover:bg-[#666666]'
                      }`}
                      aria-label={`Go to review slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Next & Previous Buttons */}
              <div className="flex items-center gap-2">
                <button
                  suppressHydrationWarning
                  onClick={handlePrev}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] hover:bg-[#ACB041] hover:text-[#111111] transition-all shadow-sm focus:outline-none"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  suppressHydrationWarning
                  onClick={handleNext}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] hover:bg-[#ACB041] hover:text-[#111111] transition-all shadow-sm focus:outline-none"
                  aria-label="Next Review"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>

          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
