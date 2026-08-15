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
  { iconType: 'hair-oil-leaf', stat: '96%', statLabel: 'Hair Fall Reduction', title: 'Clinically Tested', desc: 'Proven efficacy in independent dermatology trial over 28 days.' },
  { iconType: 'pure-botanicals', stat: '100%', statLabel: 'Plant-Based', title: 'Pure Botanicals', desc: 'Cold-pressed herbs with zero synthetic fillers, silicones, or parabens.' },
  { iconType: 'non-comedogenic', stat: '0%', statLabel: 'Mineral Oil', title: 'Non-Comedogenic', desc: 'Lightweight formula absorbs fully without blocking scalp pores.' },
  { iconType: 'derm-approved', stat: '✓', statLabel: 'Derm Approved', title: 'Dermatologist Tested', desc: 'Hypoallergenic and safe for all hair types including sensitive scalps.' },
  { iconType: 'cruelty-free', stat: '✓', statLabel: 'Cruelty Free', title: 'Ethically Crafted', desc: '100% vegan. Ethically sourced. Never tested on animals.' },
  { iconType: 'ayurvedic-formula', stat: '18', statLabel: 'Active Herbs', title: 'Ayurvedic Formula', desc: 'Slow copper-vessel infusion of 18 botanical actives per batch.' },
];

const NEEM_COMB_BENEFITS: BenefitItem[] = [
  { iconType: 'wooden-comb', stat: '100%', statLabel: 'Anti-Static', title: 'Frizz & Breakage Control', desc: 'Pure medicinal wood teeth eliminate static friction & hair breakage.' },
  { iconType: 'ayurvedic-formula', stat: '100%', statLabel: 'Neem Wood', title: 'Pure Margosa Wood', desc: 'Hand-carved from seasoned medicinal neem trees rich in nimbidin.' },
  { iconType: 'derm-approved', stat: '92%', statLabel: 'Flake Relief', title: 'Anti-Dandruff Action', desc: 'Natural antibacterial wood inhibits fungal growth on contact.' },
  { iconType: 'hair-oil-leaf', stat: '✓', statLabel: 'Derm Approved', title: 'Scalp Safe', desc: 'Smooth hand-polished teeth massage scalp papilla gently.' },
  { iconType: 'cruelty-free', stat: '✓', statLabel: 'Handmade', title: 'Artisan Crafted', desc: 'Hand-carved and polished without harsh varnishes or lacquers.' },
  { iconType: 'pure-botanicals', stat: '17', statLabel: 'Herbs Soaked', title: 'Herbal Infused', desc: 'Traditional 45-day herbal oil soaking for continuous scalp nourishment.' },
];

const SUNSCREEN_BENEFITS: BenefitItem[] = [
  { iconType: 'sun-screen', stat: 'SPF 50+', statLabel: 'PA++++', title: 'Broad Spectrum Defense', desc: 'Maximum protection against UVA & UVB rays without synthetic filters.' },
  { iconType: 'non-comedogenic', stat: '100%', statLabel: 'No White Cast', title: 'Invisible Gel Texture', desc: 'Ultra-lightweight gel absorbs instantly with a luminous natural finish.' },
  { iconType: 'pure-botanicals', stat: '0%', statLabel: 'Pore Clogging', title: 'Non-Comedogenic', desc: 'Water-light formula ideal for humid climates and acne-prone skin.' },
  { iconType: 'derm-approved', stat: '✓', statLabel: 'Derm Approved', title: 'Dermatologist Tested', desc: 'Hypoallergenic, sweat-resistant, and safe for sensitive skin.' },
  { iconType: 'cruelty-free', stat: '✓', statLabel: 'De-Tan Active', title: 'Niacinamide Boost', desc: 'Fades sun spots and hyperpigmentation with clinical botanicals.' },
  { iconType: 'ayurvedic-formula', stat: '24h', statLabel: 'Hydration', title: 'Aloe Vera Base', desc: 'Infused with cooling organic aloe vera gel to calm UV heat stress.' },
];

export function Benefits({ product }: { product?: Product }) {
  const handle = product?.handle?.toLowerCase() || '';
  
  let benefits = HAIR_OIL_BENEFITS;
  if (handle.includes('neem') || handle.includes('comb')) {
    benefits = NEEM_COMB_BENEFITS;
  } else if (handle.includes('sunscreen') || handle.includes('tan') || handle.includes('skin')) {
    benefits = SUNSCREEN_BENEFITS;
  }

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Two-column layout: title left, 6 cards right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left: Section Header Column — 4 cols */}
          <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 text-left">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C] block">
              WHY FLOIS STANDS APART
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
