'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';

export function StoryHero() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FAF9F5] py-16 sm:py-24 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      
      {/* Subtle Botanical Sunlight & Radial Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none bg-[radial-gradient(#4B644C_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center text-left">
          
          {/* Left Column: Editorial Heading & Paragraph (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: cubicEase }}
              className="inline-flex items-center gap-2.5"
            >
              <span className="h-[1px] w-6 bg-[#4B644C]" />
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C]">
                OUR STORY &amp; HERITAGE
              </span>
              <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
            </motion.div>

            {/* Main Serif Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.1 }}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-[1.06] tracking-tight text-[#121412]"
            >
              Rooted in Nature.<br />
              <em className="italic text-[#4B644C]">Refined by Science.</em>
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.2 }}
              className="text-base sm:text-xl font-sans text-[#4A4E4A] font-light leading-relaxed max-w-xl"
            >
              FLOIS was created to bring people back to honest, plant-powered personal care inspired by centuries of Indian Ayurvedic wisdom and backed by modern clinical science.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#philosophy"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#141C15] text-white text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#4B644C] transition-colors duration-300 shadow-xl"
              >
                <span>Our Philosophy</span>
                <ArrowDown className="h-3.5 w-3.5" />
              </a>

              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-[#D8D5CE] text-xs font-sans uppercase tracking-[0.2em] font-semibold text-[#121412] hover:border-[#4B644C] hover:text-[#4B644C] transition-colors duration-300"
              >
                Explore Products
              </Link>
            </motion.div>

          </div>

          {/* Right Column: Hero Still Life Image (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: cubicEase, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-2xl bg-[#F3F1EA] group">
              <Image
                src="/images/story/our_story_hero.png"
                alt="FLOIS RootHerb Hair Growth Oil and Neem Wood Comb still life"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-3xl" />
            </div>

            {/* Floating Glass Accent Badge */}
            <div className="absolute -bottom-5 -left-5 sm:-left-8 bg-white/90 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-[#E8E6DF] shadow-xl text-left hidden sm:block">
              <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#4B644C] block">
                PURE BOTANICAL FORMULATION
              </span>
              <span className="text-xs font-serif text-[#121412]">
                100% Cold-Pressed Extractions
              </span>
            </div>
          </motion.div>

        </div>
      </div>

    </section>
  );
}
