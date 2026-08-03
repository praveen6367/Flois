'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function StoryFuture() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Vision Narrative (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
              THE HORIZON
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] leading-[1.08] tracking-tight">
              Beyond Hair Care
            </h2>

            <div className="space-y-4 text-base sm:text-lg font-sans text-[#4A4E4A] font-light leading-relaxed max-w-xl">
              <p>
                Hair care is only our first step. We are expanding the FLOIS botanical ethos into holistic skin wellness, restorative body treatments, and daily mindful rituals.
              </p>
              <p>
                Every new formula will strictly adhere to the same unyielding standard: cold-pressed botanicals, 0% mineral oil fillers, full ingredient transparency, and clinically tested efficacy.
              </p>
            </div>

            {/* Ending Quote */}
            <div className="pt-6 border-t border-[#E8E6DF]">
              <p className="font-serif text-2xl italic text-[#121412]">
                “This is only the beginning.”
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#141C15] text-white text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#4B644C] transition-colors duration-300 shadow-xl"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

          {/* Right Column: Serene Editorial Photo (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/3] sm:aspect-[16/10] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-2xl bg-[#FAF9F5]">
              <Image
                src="/products/editorial_story.jpg"
                alt="FLOIS serene botanical wellness setup"
                fill
                sizes="(max-width: 1024px) 100vw, 680px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
