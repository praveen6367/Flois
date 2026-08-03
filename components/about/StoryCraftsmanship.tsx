'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const METRICS = [
  { value: '18', label: 'Ayurvedic Herbs' },
  { value: '0%', label: 'Mineral Oil' },
  { value: '100%', label: 'Plant Based' },
  { value: 'Clinically', label: 'Dermatologist Tested' },
];

export function StoryCraftsmanship() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Editorial Asymmetrical Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          
          {/* Left Column: Craft Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
              SLOW BOTANICAL ARTISANRY
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] leading-[1.08] tracking-tight">
              Crafted With Uncompromising Care
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-sans text-[#4A4E4A] font-light leading-relaxed max-w-xl">
              <p>
                Every batch of FLOIS RootHerb oil is prepared in small, controlled quantities in Greater Noida. We hand-select premium grade herbs, sun-dry them to preserve active oils, and steep them in traditional copper vessels.
              </p>
              <p>
                This slow, heat-free infusion process ensures zero degradation of sensitive plant enzymes, producing a deeply nourishing elixir with an authentic herbal scent.
              </p>
            </div>
          </div>

          {/* Right Column: Workshop Image (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xl bg-[#F5F4EF]">
              <Image
                src="/images/story/our_story_workshop.png"
                alt="Luxury Ayurvedic workshop with copper vessels and botanicals"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

        </div>

        {/* Editorial Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-[#E8E6DF] text-center">
          {METRICS.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="space-y-1"
            >
              <span className="font-serif text-4xl sm:text-6xl font-normal text-[#121412] block">
                {item.value}
              </span>
              <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4B644C] block">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
