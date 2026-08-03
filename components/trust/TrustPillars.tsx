'use client';

import React from 'react';
import { Leaf, ShieldCheck, Droplets, Sparkles } from 'lucide-react';

const TRUST_PILLARS = [
  {
    icon: Leaf,
    title: '100% Plant-Based',
    description: 'Sustainably harvested 18 cold-pressed botanical extracts'
  },
  {
    icon: ShieldCheck,
    title: 'Dermatologist Tested',
    description: 'Clinically verified hair & scalp efficacy trials'
  },
  {
    icon: Droplets,
    title: 'Cold-Pressed Oils',
    description: 'Zero chemical heat extraction for nutrient preservation'
  },
  {
    icon: Sparkles,
    title: 'Cruelty-Free & Pure',
    description: 'Ethically handcrafted in small fresh batches'
  }
];

export function TrustPillars() {
  return (
    <section className="w-full bg-[#FAF9F5] border-b border-[#E8E6DF] py-10 sm:py-14 relative z-10">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {TRUST_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E6DF] shadow-[0_4px_20px_rgba(18,20,18,0.03)] hover:shadow-[0_10px_30px_rgba(18,20,18,0.08)] hover:border-[#4B644C] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Icon Badge */}
                <div className="w-11 h-11 rounded-full bg-[#FAF9F5] border border-[#EAE3D2] flex items-center justify-center shrink-0 text-[#4B644C] group-hover:bg-[#4B644C] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <Icon className="h-5 w-5 stroke-[1.75]" />
                </div>

                {/* Text Content */}
                <div className="space-y-1">
                  <h4 className="font-serif text-base sm:text-lg font-normal text-[#121412] leading-snug group-hover:text-[#4B644C] transition-colors">
                    {pillar.title}
                  </h4>
                  <p className="text-xs text-[#4A4E4A] font-sans leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
