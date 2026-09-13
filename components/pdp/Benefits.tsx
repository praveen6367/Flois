'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Product } from '@/types/product';

interface BenefitItem {
  iconType: 'hair-oil-leaf' | 'wooden-comb' | 'pure-botanicals' | 'non-comedogenic' | 'derm-approved' | 'cruelty-free' | 'ayurvedic-formula' | 'sun-screen';
  stat: string;
  statLabel: string;
  title: string;
  desc: string;
}

function IconBadge({ type }: { type: BenefitItem['iconType'] }) {
  return (
    <div className="relative shrink-0 h-16 w-16 sm:h-18 sm:w-18 rounded-full bg-[#F5F3EC] border border-[#E8E6DF] flex items-center justify-center shadow-2xs group-hover:bg-[#EAF3EA] group-hover:border-[#4B644C]/40 transition-all duration-300">
      {type === 'hair-oil-leaf' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M18 5C11 12 10 21 18 31C26 21 25 12 18 5Z" fill="#4B644C" />
          <path d="M18 8V28M18 14L13 19M18 19L23 24" stroke="#FAF9F5" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="23" cy="11" r="3.5" fill="#C8A96E" />
        </svg>
      )}
      {type === 'wooden-comb' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <rect x="8" y="13" width="20" height="6" rx="2" fill="#D8D3C5" stroke="#4B644C" strokeWidth="1.5" />
          <path d="M11 19V27M14.5 19V27M18 19V27M21.5 19V27M25 19V27" stroke="#4B644C" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 6C18 6 13 11 18 13C23 11 18 6 18 6Z" fill="#4B644C" />
        </svg>
      )}
      {type === 'pure-botanicals' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M13 27C13 27 8 18 14 12C20 6 26 10 26 10C26 10 27 18 21 23C15 28 13 27 13 27Z" fill="#748B76" />
          <path d="M13 27L21 15" stroke="#FAF9F5" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="10" cy="13" r="3" fill="#C8A96E" />
        </svg>
      )}
      {type === 'non-comedogenic' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M11 25C11 25 17 25 23 17C26 13 25 8 25 8C25 8 20 8.5 16 11.5C10.5 16 11 25 11 25Z" fill="#4B644C" />
          <path d="M12 24L21 13" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="24" cy="24" r="2.5" fill="#C8A96E" />
        </svg>
      )}
      {type === 'derm-approved' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M18 7L26 10.5V18C26 24 21 28.5 18 29.5C15 28.5 10 24 10 18V10.5L18 7Z" fill="#D8D3C5" stroke="#4B644C" strokeWidth="1.5" />
          <path d="M14 18L17 21L22 15" stroke="#4B644C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {type === 'cruelty-free' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M18 27C18 27 9 21 9 14.5C9 11.2 11.5 9 14.5 9C16.3 9 18 10 18 10C18 10 19.7 9 21.5 9C24.5 9 27 11.2 27 14.5C27 21 18 27 18 27Z" fill="#4B644C" />
          <path d="M18 13V22" stroke="#FAF9F5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )}
      {type === 'ayurvedic-formula' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <path d="M12 16C12 16 10 25 18 27C26 25 24 16 24 16H12Z" fill="#C8A96E" stroke="#4B644C" strokeWidth="1.5" />
          <path d="M11 13H25V16H11V13Z" fill="#4B644C" />
          <path d="M18 7C18 7 15 10.5 18 12.5C21 10.5 18 7 18 7Z" fill="#748B76" />
        </svg>
      )}
      {type === 'sun-screen' && (
        <svg className="w-10 h-10 sm:w-11 sm:h-11" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="6" fill="#C8A96E" stroke="#4B644C" strokeWidth="1.5" />
          <path d="M18 6V8.5M18 27.5V30M6 18H8.5M27.5 18H30M9.5 9.5L11.3 11.3M24.7 24.7L26.5 26.5M9.5 26.5L11.3 24.7M24.7 11.3L26.5 9.5" stroke="#4B644C" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18 14C18 14 15.5 17 18 19C20 17 18 14 18 14Z" fill="#4B644C" />
        </svg>
      )}
    </div>
  );
}

const HAIR_OIL_BENEFITS: BenefitItem[] = [
  { iconType: 'hair-oil-leaf', stat: '2.5%', statLabel: 'OleoKare® Active', title: 'OleoKare® Powered', desc: 'RootHerb contains OleoKare®, a botanical active clinically studied at a 2.5% concentration.' },
  { iconType: 'pure-botanicals', stat: '5', statLabel: 'Cold-Pressed Oils', title: 'Pure Botanicals', desc: 'Cold-pressed botanical oils selected to retain natural plant characteristics.' },
  { iconType: 'non-comedogenic', stat: '0%', statLabel: 'Mineral Oil', title: 'Lightweight Scalp Feel', desc: 'Designed to nourish without leaving a heavy, sticky residue.' },
  { iconType: 'derm-approved', stat: '✓', statLabel: 'Everyday Care', title: 'Made for Everyday Hair Care', desc: 'Suitable for regular scalp and hair-care routines.' },
  { iconType: 'cruelty-free', stat: '✓', statLabel: 'Cruelty Free', title: 'Ethically Crafted', desc: '100% vegan. Ethically sourced. Never tested on animals.' },
  { iconType: 'ayurvedic-formula', stat: '12', statLabel: 'Herbs Infused', title: 'Ayurvedic Formula', desc: 'Slow traditional infusion of 12 Ayurvedic herbs and botanical actives.' },
];

const NEEM_COMB_BENEFITS: BenefitItem[] = [
  { iconType: 'wooden-comb', stat: '🌿', statLabel: 'Durable Wood', title: 'Natural Neem Wood', desc: 'A naturally durable wood traditionally valued in Indian wellness practices.' },
  { iconType: 'ayurvedic-formula', stat: '⚡', statLabel: 'Zero Frizz', title: 'Low Static', desc: 'Helps minimise static compared with many plastic combs.' },
  { iconType: 'hair-oil-leaf', stat: '🪮', statLabel: 'Gentle Glide', title: 'Smooth Rounded Teeth', desc: 'Designed for gentle detangling and comfortable scalp contact.' },
  { iconType: 'derm-approved', stat: '💆', statLabel: 'Daily Ritual', title: 'Gentle Scalp Massage', desc: 'Use the rounded teeth for a relaxing scalp-combing ritual.' },
  { iconType: 'pure-botanicals', stat: '🌱', statLabel: '45-Day Soak', title: '17 Botanical Infusion', desc: 'Traditionally soaked in a botanical oil blend for 45 days.' },
  { iconType: 'cruelty-free', stat: '♻️', statLabel: 'Eco Friendly', title: 'Naturally Biodegradable', desc: 'A wood-based alternative to disposable plastic combs.' },
];

const SUNSCREEN_BENEFITS: BenefitItem[] = [
  { iconType: 'sun-screen', stat: 'SPF 50+', statLabel: 'PA++++', title: 'Broad Spectrum Defense', desc: 'High daily protection against UVA & UVB rays for tropical climates.' },
  { iconType: 'non-comedogenic', stat: '0%', statLabel: 'White Cast', title: 'Zero Visible White Cast', desc: 'Designed to blend invisibly across Indian skin tones without chalky residue.' },
  { iconType: 'pure-botanicals', stat: '💧', statLabel: 'Water Gel', title: 'Lightweight Texture', desc: 'Weightless, fast-absorbing gel finish comfortable for all skin types.' },
  { iconType: 'derm-approved', stat: '✓', statLabel: 'Skin Safe', title: 'Dermatologically Tested', desc: 'Water & sweat resistant, gentle formula designed for everyday sun protection.' },
  { iconType: 'cruelty-free', stat: '✨', statLabel: 'Even Tone', title: 'Helps Fade Visible Tan', desc: 'Formulated with Kojic Acid, Fermented Rice Water, and Niacinamide.' },
  { iconType: 'ayurvedic-formula', stat: '🌿', statLabel: 'Botanicals', title: 'Hydrating Botanical Base', desc: 'Enriched with Organic Aloe Vera leaf juice and Sea Buckthorn Berry.' },
];

export function Benefits({ product }: { product?: Product }) {
  const handle = product?.handle?.toLowerCase() || '';
  
  let benefits = HAIR_OIL_BENEFITS;
  let sectionEyebrow = 'WHY FLOIS STANDS APART';
  if (handle.includes('neem') || handle.includes('comb')) {
    benefits = NEEM_COMB_BENEFITS;
    sectionEyebrow = 'THE NEEM ADVANTAGE';
  } else if (handle.includes('sunscreen') || handle.includes('tan') || handle.includes('skin')) {
    benefits = SUNSCREEN_BENEFITS;
    sectionEyebrow = 'SOLAR SCIENCE & BOTANICAL DEFENSE';
  }

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Two-column layout: title left, 6 cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Section Header Column — 4 cols */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 text-left">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C] block">
              {sectionEyebrow}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3rem] font-normal leading-[1.1] tracking-tight text-[#121412]">
              The Formula That<br />
              <em className="italic text-[#4B644C]">Makes the Difference</em>
            </h2>
            <p className="text-sm font-sans text-[#787E78] font-light leading-relaxed">
              Every ingredient has a purpose. Every process is intentional. No compromises in our botanical formulation philosophy.
            </p>
          </div>

          {/* Right: 2×3 Cards Grid — 8 cols */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 text-left">
            {benefits.map((item, idx) => {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  className="group flex items-center gap-5 sm:gap-6 p-6 sm:p-7 rounded-2xl bg-white border border-[#E8E6DF] shadow-2xs hover:border-[#4B644C]/50 hover:shadow-md transition-all duration-300"
                >
                  {/* Left: Icon only */}
                  <div className="shrink-0">
                    <IconBadge type={item.iconType} />
                  </div>

                  {/* Right: Title heading + Description */}
                  <div className="space-y-1.5 pt-0.5 min-w-0 flex-1">
                    <h3 className="font-sans text-base sm:text-lg font-semibold text-[#121412] group-hover:text-[#4B644C] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-sans text-[#787E78] font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
