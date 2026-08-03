'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const MILESTONES = [
  {
    num: '01',
    year: '2023',
    headline: 'The Question',
    desc: 'We questioned why conventional hair oils rely heavily on mineral oil fillers and synthetic perfumes instead of whole botanical actives.'
  },
  {
    num: '02',
    year: '2024',
    headline: 'Research & Testing',
    desc: 'Collaborating with Ayurvedic vaidyas and dermatologists in UP, we tested over 40 raw herbs including Bhringraj, Amla, and Neem.'
  },
  {
    num: '03',
    year: '2025',
    headline: 'Slow Extraction Process',
    desc: 'We perfected our traditional copper vessel infusion technique, slow-steeping raw herbs for 14 days without heat damage.'
  },
  {
    num: '04',
    year: '2026',
    headline: 'The Launch of FLOIS',
    desc: 'FLOIS launched with our flagship RootHerb Hair Growth Oil and Neem Wood Comb, setting a new benchmark for clean luxury.'
  },
];

export function StoryJourney() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Section Header */}
        <div className="max-w-[700px] mb-16 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            OUR CHRONICLE
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] tracking-tight">
            The Journey to Purity
          </h2>
        </div>

        {/* Grid: Left Milestones (7 Cols) / Right Laboratory Photo (5 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: 4 Editorial Milestones connected by hairline indicator */}
          <div className="lg:col-span-7 relative pl-8 border-l border-[#4B644C]/30 space-y-12 my-auto">
            {MILESTONES.map((item, idx) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.12 }}
                className="relative group space-y-2"
              >
                {/* Olive Dot Indicator on Timeline */}
                <div className="absolute -left-[37px] top-1.5 h-4 w-4 rounded-full bg-[#FAF9F5] border-2 border-[#4B644C] group-hover:bg-[#4B644C] transition-colors" />

                <div className="flex items-center gap-3">
                  <span className="font-serif text-3xl font-normal text-[#4B644C]">
                    {item.num}
                  </span>
                  <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#787E78] px-2 py-0.5 rounded-full bg-white border border-[#E8E6DF]">
                    {item.year}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121412]">
                  {item.headline}
                </h3>

                <p className="text-sm sm:text-base font-sans text-[#4A4E4A] font-light leading-relaxed max-w-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Laboratory Craft Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xl bg-[#F5F4EF]">
              <Image
                src="/images/story/our_story_laboratory.png"
                alt="Handcrafted Ayurvedic laboratory with herbs and copper vessels"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
