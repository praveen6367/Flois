'use client';

import React from 'react';
import { motion } from 'framer-motion';

const PROBLEMS = [
  {
    title: 'Artificial Fragrances',
    desc: 'Synthetic perfumes mask low-grade oil quality while causing scalp sensitivity and long-term irritation.'
  },
  {
    title: 'Mineral Oil Base',
    desc: 'Petroleum-derived liquid paraffin coats hair shafts in plastic without delivering nutrient nourishment.'
  },
  {
    title: 'Cheap Bulk Fillers',
    desc: 'Watered-down extracts and chemical preservatives dilute active herb potency to cut production costs.'
  },
  {
    title: 'Compromised Formulations',
    desc: 'Mass-produced formulas prioritize 2-year shelf stability over fresh botanical efficacy.'
  },
];

export function StoryProblem() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#141C15] text-[#FAF9F5] py-20 sm:py-32 overflow-hidden border-b border-[#2C382D]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left relative z-10">
        
        {/* Split Layout: Left Editorial Quote (5 Cols) / Right Typography Points (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2CE94] block">
              THE INDUSTRY PARADOX
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight">
              The Problem We Refused to Accept
            </h2>

            <p className="text-base sm:text-lg font-sans text-[#EAE3D2]/80 font-light leading-relaxed">
              Most conventional hair products create an illusion of softness through silicone coating while starving the scalp of genuine nutrition.
            </p>

            <div className="pt-6 border-t border-[#2C382D]">
              <p className="font-serif text-xl italic text-[#C2CE94]">
                “Purity isn't an ingredient on the label — it's the foundation of everything we formulate.”
              </p>
            </div>
          </div>

          {/* Right Column: Pure Typography Points */}
          <div className="lg:col-span-7 space-y-8">
            {PROBLEMS.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.1 }}
                className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-[#2C382D] space-y-2 hover:border-[#C2CE94]/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#C2CE94]" />
                  <h3 className="font-serif text-2xl font-normal text-white">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm sm:text-base font-sans text-[#EAE3D2]/70 font-light leading-relaxed pl-5">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
