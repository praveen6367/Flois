'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function ContactHero() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 overflow-hidden border-b border-[#E8E6DF]">
      {/* Faded Background Watermark Illustration */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none bg-[radial-gradient(#4B644C_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10 text-center">
        
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: cubicEase }}
          className="inline-flex items-center gap-2.5 mb-4"
        >
          <span className="h-[1px] w-6 bg-[#4B644C]" />
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C]">
            GET IN TOUCH
          </span>
          <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
          <span className="h-[1px] w-6 bg-[#4B644C]" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: cubicEase, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] tracking-tight text-[#121412] max-w-3xl mx-auto mb-6"
        >
          We're Here to Help
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: cubicEase, delay: 0.2 }}
          className="text-base sm:text-xl font-sans text-[#4A4E4A] font-light leading-relaxed max-w-[720px] mx-auto"
        >
          Whether you have questions about our products, ingredients, orders or your wellness journey, our team is always happy to assist.
        </motion.p>

        {/* Subtle Botanical Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: cubicEase, delay: 0.3 }}
          className="relative mt-12 flex items-center justify-center max-w-xs mx-auto"
        >
          <div className="w-full h-[1px] bg-[#E8E6DF]" />
          <div className="absolute bg-[#FAF9F5] px-3 text-[#4B644C]">
            <span className="text-xs">❀</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
