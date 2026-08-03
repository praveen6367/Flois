'use client';

import React from 'react';
import { ShieldCheck, Check, Sparkles } from 'lucide-react';

export function StatisticCard() {
  return (
    <div className="relative flex flex-col justify-between rounded-xl bg-[#F6F4ED] border border-[#E2DDD0] p-6 sm:p-7 lg:p-8 shadow-sm overflow-hidden h-full">
      {/* Subtle Botanical Accent Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#4B644C]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="space-y-2 z-10">
        <div className="inline-flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
          <Sparkles className="h-4 w-4 text-[#4B644C]" />
          <span>Clinical Efficacy Metric</span>
        </div>
        <h4 className="font-serif text-2xl text-[#121412] font-normal leading-snug">
          Independently Tested Botanical Efficacy
        </h4>
      </div>

      {/* Main Stat Number & Description */}
      <div className="my-6 space-y-1 text-left z-10">
        <div className="font-serif text-6xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-none">
          <span className="bg-gradient-to-r from-[#121412] via-[#4B644C] to-[#859844] bg-clip-text text-transparent animate-brand-gradient">
            51%
          </span>
        </div>
        <p className="font-serif text-lg sm:text-xl text-[#4B644C] font-normal italic pt-1">
          Hair Density & Growth Improvement
        </p>
        <p className="text-xs font-sans text-[#787E78] uppercase tracking-widest pt-1">
          Measured in 90-Day Clinical Trial
        </p>
      </div>

      {/* Proof Statements */}
      <div className="space-y-2.5 pt-5 border-t border-[#E2DDD0] z-10">
        <div className="flex items-center gap-2.5 text-xs text-[#121412] font-sans font-medium">
          <Check className="h-4 w-4 text-[#4B644C] shrink-0 stroke-[2.5]" />
          <span>100% Ayurvedic Cold-Pressed Extraction</span>
        </div>
        <div className="flex items-center gap-2.5 text-xs text-[#121412] font-sans font-medium">
          <ShieldCheck className="h-4 w-4 text-[#4B644C] shrink-0 stroke-[2]" />
          <span>Dermatologist Formulated & Tested</span>
        </div>
      </div>
    </div>
  );
}
