'use client';

import React from 'react';
import { motion } from 'framer-motion';

const VALUES = [
  {
    num: '01',
    name: 'Purity',
    desc: 'Unfiltered, unadulterated botanical formulas crafted without synthetic fillers or chemical additives.'
  },
  {
    num: '02',
    name: 'Transparency',
    desc: 'Complete disclosure of every raw ingredient, extraction method, and sourcing origin.'
  },
  {
    num: '03',
    name: 'Science',
    desc: 'Rigorously evaluating Ayurvedic wisdom through modern dermatological testing and clinical safety.'
  },
  {
    num: '04',
    name: 'Tradition',
    desc: 'Honoring centuries-old Indian herbal preparation rituals and copper vessel slow infusions.'
  },
  {
    num: '05',
    name: 'Sustainability',
    desc: 'Sourcing renewable botanicals, handcrafted neem wood, and eco-friendly recyclable glass packaging.'
  },
];

export function StoryValues() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        {/* Header */}
        <div className="max-w-[700px] mb-16 space-y-3">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            CORE FOUNDATIONS
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] tracking-tight">
            Our Guiding Values
          </h2>
        </div>

        {/* Large Typography Grid (5 Columns / 2 Rows Desktop, 1 Col Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((val, idx) => (
            <motion.div
              key={val.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: cubicEase, delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] space-y-4 shadow-2xs hover:border-[#4B644C]/40 transition-colors"
            >
              <span className="font-serif text-3xl font-normal text-[#4B644C] block">
                {val.num}
              </span>
              <h3 className="font-serif text-3xl font-normal text-[#121412]">
                {val.name}
              </h3>
              <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed">
                {val.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
