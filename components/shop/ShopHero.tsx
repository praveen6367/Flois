'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function ShopHero() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#F8F6F3] py-16 sm:py-20 overflow-hidden border-b border-[#E8E6DF]">
      {/* Soft Botanical Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none bg-[radial-gradient(#ACB041_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 text-center">
        
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: cubicEase }}
          className="text-[11px] font-sans font-semibold uppercase tracking-[0.25em] text-[#ACB041] block mb-3"
        >
          CURATED APOTHECARY SELECTION
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicEase, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl font-normal leading-[1.08] tracking-tight text-[#111111] max-w-2xl mx-auto mb-4"
        >
          Shop Our Botanical Rituals
        </motion.h1>

        {/* Supporting Copy (Max 2 lines) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicEase, delay: 0.2 }}
          className="text-sm sm:text-base font-sans text-[#333333] font-light leading-relaxed max-w-xl mx-auto mb-8"
        >
          Explore clean, clinically inspired Ayurvedic formulations crafted to become part of your daily wellness routine.
        </motion.p>

        {/* One Subtle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicEase, delay: 0.3 }}
          className="inline-flex items-center justify-center"
        >
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#ACB041] text-[#111111] text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#939735] transition-colors duration-300 shadow-md"
          >
            <span>Explore Formulations</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
