'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function StoryPhilosophy() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="philosophy" className="relative w-full bg-[#FFFFFF] py-20 sm:py-32 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Magazine Spread Grid: Left Image (5 Cols) / Right Editorial Text (7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left">
          
          {/* Left: Lifestyle Photo */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-xl bg-[#F5F4EF]">
              <Image
                src="/images/story/our_story_lifestyle.png"
                alt="Woman applying FLOIS botanical hair oil beside a warm sunlit window"
                fill
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover object-center"
              />
            </div>
          </motion.div>

          {/* Right: Editorial Storytelling */}
          <div className="lg:col-span-7 space-y-8">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
              THE FOUNDER'S PHILOSOPHY
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
              Why We Started FLOIS
            </h2>

            {/* Editorial Pull Quote */}
            <motion.blockquote
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.1 }}
              className="pl-6 border-l-2 border-[#4B644C] py-1"
            >
              <p className="font-serif text-2xl sm:text-3xl font-normal italic text-[#121412] leading-snug">
                “We created FLOIS because we couldn't find truly clean, effective hair care products we trusted ourselves.”
              </p>
            </motion.blockquote>

            {/* Main Narrative Paragraphs */}
            <div className="space-y-5 text-base sm:text-lg font-sans text-[#4A4E4A] font-light leading-relaxed">
              <p>
                In a market flooded with synthetic fillers, mineral oils disguised as natural treatments, and artificial fragrances designed to mask cheap formulations, we saw a profound disconnect between promises and genuine wellness.
              </p>
              <p>
                Rooted in authentic Indian heritage, FLOIS was born out of a relentless commitment to raw botanical integrity. We returned to time-tested Ayurvedic preparations — slow-steeping raw herbs in pure sesame and coconut oils, pressing whole roots, and verifying every formula under modern dermatological standards.
              </p>
              <p>
                Our philosophy is simple: no shortcuts, no compromise. Just pure, powerful plant science crafted to restore your hair's natural vitality.
              </p>
            </div>

            {/* Signature Touch */}
            <div className="pt-6 border-t border-[#E8E6DF] flex items-center justify-between flex-wrap gap-4 text-xs font-sans text-[#787E78]">
              <span>Formulated with Care in Greater Noida, UP</span>
              <span className="font-serif text-lg italic text-[#121412]">The FLOIS Team</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
