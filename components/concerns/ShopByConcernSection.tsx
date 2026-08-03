'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ConcernItem {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  handle: string;
}

const CONCERNS: ConcernItem[] = [
  {
    id: 'hair-fall',
    title: 'Hair Fall',
    subtitle: 'RootFollicle Therapy & Regrowth',
    imageSrc: '/placeholders/concern_hair_fall.png',
    handle: '/collections/all?concern=hair-fall'
  },
  {
    id: 'tanning',
    title: 'Tanning',
    subtitle: 'De-Tan Solar Protection',
    imageSrc: '/placeholders/concern_tanning.png',
    handle: '/collections/all?concern=tanning'
  },
  {
    id: 'dandruff',
    title: 'Dandruff',
    subtitle: 'Scalp Clarifying Care',
    imageSrc: '/placeholders/concern_dandruff.png',
    handle: '/collections/all?concern=dandruff'
  }
];

export function ShopByConcernSection() {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      <div className="max-w-[1240px] mx-auto px-6 sm:px-12 lg:px-16 text-center">
        
        {/* Standardized FLOIS Design System Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              TARGETED BOTANICAL CARE
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
            <span className="h-[1px] w-6 bg-[#4B644C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            Shop By Concern
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A4E4A] leading-relaxed max-w-xl mx-auto font-light">
            Select your primary scalp or skin goal to discover targeted Ayurvedic cold-pressed formulations.
          </p>
        </div>

        {/* 3 Flagship Concern Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 items-stretch">
          {CONCERNS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
            >
              <Link href={item.handle} className="group block text-center space-y-4">
                {/* Image Container with Olive Accent Border */}
                <div className="relative w-full aspect-[4/3.5] rounded-2xl overflow-hidden bg-[#FAF9F5] border-2 border-[#859844]/60 group-hover:border-[#4B644C] group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={item.imageSrc}
                    alt={`Shop FLOIS products for ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  {/* Subtle Hover Action Overlay */}
                  <div className="absolute top-3.5 right-3.5 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-[#121412] opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="h-4 w-4 text-[#4B644C]" />
                  </div>
                </div>

                {/* Concern Title & Subtitle */}
                <div className="space-y-1 pt-1">
                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121412] group-hover:text-[#4B644C] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-[#787E78] font-normal tracking-wide">
                    {item.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
