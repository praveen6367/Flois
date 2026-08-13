'use client';

import React, { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { RetailPartnerMetaobject } from '@/types/metaobject';
import { RetailPartnerCard } from './RetailPartnerCard';
import { ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

interface RetailPartnersSectionProps {
  partners?: RetailPartnerMetaobject[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

export function RetailPartnersSection({
  partners = [],
  eyebrow = 'AUTHORIZED RETAIL PARTNERS',
  title = 'Available On Leading Platforms',
  subtitle = 'Experience authentic FLOIS Ayurvedic formulations on your preferred verified shopping destinations.'
}: RetailPartnersSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Filter out official website block as requested by user
  const rawPartners = partners && partners.length > 0 ? partners : [];
  const displayPartners = rawPartners.filter((p) => !p.isOfficial);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const index = Math.round(scrollLeft / (clientWidth * 0.75));
    setActiveIndex(Math.min(Math.max(0, index), displayPartners.length - 1));
  };

  const scrollMobile = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E8E6DF] py-16 sm:py-20 relative overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[640px] mx-auto text-center space-y-3 mb-10 sm:mb-14">
          {/* Editorial Eyebrow */}
          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#6A9739]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#6A9739]">
              {eyebrow}
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-[1.1] tracking-tight text-[#111111]">
            {title}
          </h2>

          {/* Supporting Copy */}
          <p className="text-sm sm:text-base font-sans text-[#4A4E4A] leading-relaxed font-light max-w-lg mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Desktop Grid / Mobile Snap Carousel */}
        <div className="relative">
          <motion.div
            ref={scrollRef}
            onScroll={handleScroll}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="flex sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory no-scrollbar -mx-6 px-6 sm:mx-0 sm:px-0 py-2"
          >
            {displayPartners.map((partner) => (
              <motion.div 
                key={partner.id} 
                variants={itemVariants}
                className="w-[82vw] max-w-[320px] sm:w-auto shrink-0 sm:shrink snap-center"
              >
                <RetailPartnerCard partner={partner} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Navigation Controls: Left Arrow, Indicator Dots, Right Arrow */}
          {displayPartners.length > 1 && (
            <div className="flex sm:hidden items-center justify-between pt-5 px-2 max-w-[280px] mx-auto">
              <button
                onClick={() => scrollMobile('left')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-sm active:scale-95 hover:border-[#6A9739] hover:text-[#6A9739] transition-all"
                aria-label="Previous Retail Partner"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {displayPartners.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'w-6 bg-[#6A9739]'
                        : 'w-1.5 bg-[#E8E6DF]'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => scrollMobile('right')}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-sm active:scale-95 hover:border-[#6A9739] hover:text-[#6A9739] transition-all"
                aria-label="Next Retail Partner"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
