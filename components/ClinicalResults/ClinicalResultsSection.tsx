'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ClinicalResultMetaobject } from '@/types/metaobject';
import { TestimonialCard } from './TestimonialCard';
import { StatisticCard } from './StatisticCard';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

interface ClinicalResultsSectionProps {
  results?: ClinicalResultMetaobject[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 }
  }
};

export function ClinicalResultsSection({
  results = [],
  eyebrow = 'CLINICAL RESULTS',
  title = 'Real Transformations. Backed by Botanical Science.',
  subtitle = 'Every transformation shared here comes from real customers following consistent product usage.'
}: ClinicalResultsSectionProps) {
  const displayResults = results && results.length > 0 ? results : [];

  const heroResult = displayResults[0];
  const supportingResults = displayResults.slice(1);

  return (
    <section className="relative w-full bg-[#FFFFFF] text-[#121412] py-20 sm:py-28 lg:py-32 overflow-hidden border-b border-[#E8E6DF]">
      {/* Soft Ambient Radial Atmosphere Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#FAF9F5] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              {eyebrow}
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
            <span className="h-[1px] w-6 bg-[#4B644C]" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {title}
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#4A4E4A] leading-relaxed max-w-xl mx-auto font-light">
            {subtitle}
          </p>

          {/* Clinical Highlights Bar */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#4B644C] font-medium font-sans">
            <span className="inline-flex items-center gap-1.5 bg-[#F4F6F4] border border-[#C5D1C5] px-3 py-1 rounded-full">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>100% Natural Botanicals</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#F4F6F4] border border-[#C5D1C5] px-3 py-1 rounded-full">
              <ShieldCheck className="h-3.5 w-3.5 stroke-[2]" />
              <span>90-Day Clinical Trial</span>
            </span>
            <span className="inline-flex items-center gap-1.5 bg-[#F4F6F4] border border-[#C5D1C5] px-3 py-1 rounded-full">
              <Check className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Dermatologist Approved</span>
            </span>
          </div>
        </div>

        {/* Editorial Masonry Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="space-y-8 sm:space-y-10"
        >
          {/* Top Hero Spotlight Row */}
          {heroResult && (
            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7">
                <TestimonialCard result={heroResult} index={0} isFeatured={true} />
              </div>

              <div className="lg:col-span-5">
                <StatisticCard />
              </div>
            </motion.div>
          )}

          {/* All Supporting Transformation Cards Grid — 4 cols, wraps across rows */}
          {supportingResults.length > 0 && (
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {supportingResults.map((res, idx) => (
                <TestimonialCard key={res.id} result={res} index={idx + 1} />
              ))}
            </motion.div>
          )}
        </motion.div>

      </div>
    </section>
  );
}
