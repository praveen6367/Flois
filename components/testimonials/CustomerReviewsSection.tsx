'use client';

import React from 'react';
import { CustomerReviewsGridSlider } from './CustomerReviewsGridSlider';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export function CustomerReviewsSection() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      {/* Soft Ambient Radial Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-[#F8F6F3] rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
        
        {/* Standardized FLOIS Design System Section Header */}
        <div className="max-w-[800px] mx-auto text-center space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#8C9B3E]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#8C9B3E]">
              VERIFIED BOTANICAL RITUALS
            </span>
            <Heart className="h-3.5 w-3.5 text-[#6A9739] fill-[#6A9739]" />
            <span className="h-[1px] w-6 bg-[#8C9B3E]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#111111]">
            Beauty Felt Alive, Truly & Naturally!
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#333333] leading-relaxed max-w-xl mx-auto font-light">
            Read authentic experiences from verified FLOIS customers sharing their hair regrowth & skincare journeys.
          </p>

          {/* Rating Summary Pill Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#111111] font-medium font-sans">
            <div className="flex items-center gap-1.5 bg-[#F8F6F3] border border-[#E8E6DF] px-3.5 py-1.5 rounded-full shadow-xs">
              <div className="flex items-center gap-0.5 text-[#FBBF24]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24]" />
                ))}
              </div>
              <span className="font-semibold text-sm">4.9 / 5.0 Rating</span>
            </div>

            <span className="inline-flex items-center gap-1.5 bg-[#F8F6F3] border border-[#E8E6DF] px-3.5 py-1.5 rounded-full shadow-xs text-[#8C9B3E] font-semibold">
              <ShieldCheck className="h-4 w-4 stroke-[2]" />
              <span>20,000+ Verified Buyers</span>
            </span>
          </div>
        </div>

        {/* Premium Multi-Card Customer Review Carousel Grid */}
        <CustomerReviewsGridSlider />

      </div>
    </section>
  );
}
