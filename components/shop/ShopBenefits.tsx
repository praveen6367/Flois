'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Sparkles, Feather } from 'lucide-react';

const BENEFITS = [
  {
    icon: ShieldCheck,
    title: 'Clinically Tested',
    desc: 'Dermatologically evaluated for scalp compatibility and hair fall reduction.'
  },
  {
    icon: Leaf,
    title: '100% Plant-Based',
    desc: 'Formulated with raw herbs, cold-pressed oils, and zero mineral oil fillers.'
  },
  {
    icon: Sparkles,
    title: 'Slow Cold-Pressed',
    desc: '14-day heat-free copper vessel slow infusion to preserve botanical enzymes.'
  },
  {
    icon: Feather,
    title: 'Handcrafted Neem Wood',
    desc: 'Statistically anti-static, antimicrobial combs soaked in 17 Ayurvedic herbs.'
  },
];

export function ShopBenefits() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section className="relative w-full bg-[#F8F6F3] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: cubicEase, delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-white border border-[#E8E6DF] space-y-4 shadow-2xs hover:shadow-md transition-shadow"
              >
                {/* Single Clean Circular Icon Badge */}
                <div className="h-14 w-14 rounded-full bg-[#F8F6F3] border border-[#E8E6DF] flex items-center justify-center text-[#ACB041]">
                  <Icon className="h-6 w-6 stroke-[1.5]" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-2xl font-normal text-[#111111]">
                    {item.title}
                  </h3>
                  <p className="text-xs font-sans text-[#666666] font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
