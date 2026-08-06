'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function ShopEditorialStory() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xl bg-[#F8F6F3]">
              <Image
                src="/images/story/our_story_botanicals.png"
                alt="FLOIS raw botanical ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#ACB041] block">
              COLLECTION PHILOSOPHY
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111111] leading-[1.08] tracking-tight">
              Pure Extractions.<br />
              <em className="italic text-[#ACB041]">Zero Compromise.</em>
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-sans text-[#333333] font-light leading-relaxed max-w-xl">
              <p>
                Every FLOIS formulation begins with whole, raw botanicals harvested at peak potency. We slow-infuse whole roots, leaves, and seeds into unrefined cold-pressed oils inside traditional copper vessels.
              </p>
              <p>
                We never use mineral oil fillers, liquid paraffin, synthetic fragrances, or silicones. Just authentic plant-powered science formulated to transform your daily ritual.
              </p>
            </div>

            <div className="pt-6 border-t border-[#E8E6DF] flex items-center gap-8 text-xs font-sans text-[#666666]">
              <div>
                <strong className="text-[#111111] block">100% Vegan</strong>
                <span>Plant-based extractions</span>
              </div>
              <div>
                <strong className="text-[#111111] block">Dermatologist Tested</strong>
                <span>Clinically verified safety</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
