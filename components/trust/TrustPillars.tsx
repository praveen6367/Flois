'use client';

import React from 'react';
import { 
  Leaf, 
  ShieldCheck, 
  Sparkles, 
  Sprout, 
  CheckCircle2, 
  Droplets, 
  Wind, 
  Award 
} from 'lucide-react';

const TRUST_ITEMS = [
  { icon: Leaf, title: '100% Plant-Based' },
  { icon: ShieldCheck, title: 'Dermatologist Tested' },
  { icon: Sparkles, title: 'Cruelty-Free' },
  { icon: Sprout, title: '100% Vegan' },
  { icon: CheckCircle2, title: 'Chemical-Free' },
  { icon: Droplets, title: 'Mineral Oil Free' },
  { icon: Wind, title: 'Perfume-Free' },
  { icon: Award, title: 'Cold-Pressed Extractions' },
];

export function TrustPillars() {
  // Duplicate list 4 times to ensure seamless infinite looping track
  const marqueeItems = [
    ...TRUST_ITEMS, 
    ...TRUST_ITEMS, 
    ...TRUST_ITEMS, 
    ...TRUST_ITEMS
  ];

  return (
    <section 
      className="w-full bg-[#FAF9F5] border-y border-[#E8E6DF] py-3.5 sm:py-4 overflow-hidden relative z-10 select-none cursor-default"
      aria-label="FLOIS Brand Trust Guarantee"
    >
      {/* Subtle Gradient Fade Overlays for Left & Right Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF9F5] to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF9F5] to-transparent z-20 pointer-events-none" />

      {/* Infinite Scrolling Marquee Track — Light Luxury Botanical Ticker */}
      <div className="flex w-max items-center animate-[marquee_36s_linear_infinite] pointer-events-none">
        {marqueeItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6 shrink-0">
              {/* Icon & Refined Title */}
              <div className="flex items-center gap-3 sm:gap-3.5">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#EFF1D9] border border-[#CBD285]/60 flex items-center justify-center text-[#6A9739] shrink-0 shadow-sm">
                  <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5 stroke-[2]" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-[#111111] tracking-wide whitespace-nowrap">
                  {item.title}
                </span>
              </div>

              {/* Luxury Botanical Separator */}
              <span className="text-[#C8A96E] text-xs select-none">✦</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
