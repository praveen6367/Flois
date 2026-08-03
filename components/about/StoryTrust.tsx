'use client';

import React from 'react';
import { motion } from 'framer-motion';

const TRUST_COLUMNS = [
  {
    title: 'Clinically Inspired',
    subtitle: 'Tested for Scalp Safety',
    desc: 'Formulated under strict dermatological evaluation. Every batch undergoes rigorous quality testing to ensure non-irritating, non-greasy, and scalp-compatible application.'
  },
  {
    title: '100% Plant Powered',
    subtitle: 'Pure Herbal Potency',
    desc: 'Zero mineral oil, liquid paraffin, synthetic dyes, or harsh chemical additives. Only pure cold-pressed botanical oils and authentic Ayurvedic root extractions.'
  },
  {
    title: 'Authentically Made in India',
    subtitle: 'Handcrafted in UP',
    desc: 'Deeply rooted in Indian wellness heritage. Prepared in small artisanal batches in Greater Noida, Uttar Pradesh, supporting sustainable local botanical farming.'
  },
];

export function StoryTrust() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Header */}
        <div className="max-w-[700px] mb-16 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            UNWAVERING COMMITMENT
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] tracking-tight">
            Why People Trust FLOIS
          </h2>
        </div>

        {/* 3 Columns Separated by Hairline Dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {TRUST_COLUMNS.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.1 }}
              className="space-y-4 pr-0 md:pr-8 md:border-r border-[#E8E6DF] last:border-r-0 last:pr-0"
            >
              <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                {col.subtitle}
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#121412]">
                {col.title}
              </h3>
              <p className="text-sm sm:text-base font-sans text-[#4A4E4A] font-light leading-relaxed">
                {col.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
