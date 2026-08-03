'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const PILLARS = [
  {
    title: 'Cold-Pressed Oils',
    subtitle: 'Zero Heat Damage',
    desc: 'Unrefined cold-pressed sesame and virgin coconut oils retain 100% of their natural vitamins, fatty acids, and antioxidants.'
  },
  {
    title: 'Whole Raw Herbs',
    subtitle: '14-Day Ayurvedic Infusion',
    desc: 'Sun-dried Bhringraj, Amla, Rosemary, and Neem are slow-steeped to gently release active botanical phytonutrients.'
  },
  {
    title: '100% Plant-Based',
    subtitle: 'Zero Mineral Oils or Silicones',
    desc: 'Pure vegan formulas free from liquid paraffin, synthetic dyes, parabens, sulfates, and artificial fragrances.'
  },
  {
    title: 'Clinically Validated',
    subtitle: 'Modern Dermatological Testing',
    desc: 'Traditional remedies rigorously evaluated for safety, scalp compatibility, and verified hair fall reduction.'
  },
];

export function StoryIngredients() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Header */}
        <div className="max-w-[720px] mb-16 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            THE BOTANICAL STANDARD
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] tracking-tight">
            Our Ingredient Philosophy
          </h2>
        </div>

        {/* Grid: Left Macro Photo (5 Cols) / Right 4 Pillars (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Macro Botanical Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xl bg-[#FAF9F5]">
              <Image
                src="/images/story/our_story_botanicals.png"
                alt="Macro photography of fresh rosemary, neem, bhringraj and golden botanical oils"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Right Column: 4 Pure Typography Pillars */}
          <div className="lg:col-span-7 space-y-10">
            {PILLARS.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.1 }}
                className="pb-8 border-b border-[#E8E6DF] space-y-2 last:border-0 last:pb-0"
              >
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                  {pillar.subtitle}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121412]">
                  {pillar.title}
                </h3>
                <p className="text-sm sm:text-base font-sans text-[#4A4E4A] font-light leading-relaxed max-w-xl">
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
