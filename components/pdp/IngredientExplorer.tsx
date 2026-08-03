'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  sanskritName: string;
  category: string;
  summary: string;
  editorialQuote: string;
  ayurvedicWisdom: string;
  clinicalScience: string;
  origin: string;
  extraction: string;
  richIn: string;
  role: string;
  imageSrc: string;
}

const INGREDIENTS: Ingredient[] = [
  {
    id: 'bhringraj',
    name: 'Bhringraj (False Daisy)',
    sanskritName: 'Keshraj — King of Hair',
    category: 'Root Strengthening',
    summary: 'Supports Hair Density',
    editorialQuote: 'Renowned in classical Ayurveda as the supreme herb for hair longevity, Bhringraj stimulates dormant papilla cells and halts premature thinning at the cellular root.',
    ayurvedicWisdom: 'Balances Kapha-Vata doshas and cools scalp inflammation, redirecting vital prana blood flow directly into dormant hair follicles.',
    clinicalScience: 'High concentrations of wedelolactone and ecliptine extend the anagen growth phase by 51% while inhibiting DHT-induced hair loss.',
    origin: 'Keralan Organic Farms',
    extraction: 'Cold Pressed Virgin',
    richIn: 'Wedelolactone',
    role: 'Root Strengthening',
    imageSrc: '/products/herb_bhringraj.png'
  },
  {
    id: 'rosemary',
    name: 'Wild Rosemary Essential Oil',
    sanskritName: 'Rusmari — Scalp Revitalizer',
    category: 'Micro-Circulation',
    summary: 'Clinically Studied Circulation',
    editorialQuote: 'Distilled from wild Himalayan rosemary, this concentrated botanical oil invigorates micro-vascular blood flow to the papilla matrix without heavy greasy residue.',
    ayurvedicWisdom: 'Invigorates sluggish scalp tissue, clears blocked pores caused by excess sebum, and restores hair shaft elasticity.',
    clinicalScience: 'Rich in carnosic acid, demonstrating clinical growth efficacy comparable to 2% minoxidil in controlled 6-month human trials.',
    origin: 'Himalayan Foothills',
    extraction: 'Steam Distilled Essence',
    richIn: 'Carnosic Acid',
    role: 'Micro-Circulation',
    imageSrc: '/products/herb_rosemary.png'
  },
  {
    id: 'amla',
    name: 'Organic Indian Gooseberry',
    sanskritName: 'Amritphal — Fruit of Immortality',
    category: 'Vitamin C & Melanin',
    summary: 'Rich in Natural Vitamin C',
    editorialQuote: "The world's most potent botanical source of Vitamin C, Amla shields scalp collagen from environmental oxidative stress while preserving natural hair shaft melanin.",
    ayurvedicWisdom: 'A revered Rasayana tonic that pacifies Pitta heat, nourishing scalp tissue and preventing premature greying of hair strands.',
    clinicalScience: 'Packed with gallic acid and ellagitannins that neutralize 99% of free radicals and inhibit 5-alpha reductase enzyme miniaturization.',
    origin: 'Central Organic Groves',
    extraction: 'Cold Pressed Elixir',
    richIn: 'Gallic Acid & Vit-C',
    role: 'Melanin Protection',
    imageSrc: '/products/herb_amla.png'
  },
  {
    id: 'neem',
    name: 'Pure Neem Leaf Extract',
    sanskritName: 'Nimba — Sacred Scalp Purifier',
    category: 'Scalp Clarifier',
    summary: 'Natural Anti-Dandruff Purifier',
    editorialQuote: 'Sourced from wild South Indian botanical gardens, pure Neem leaf extract clears fungal micro-flora, eliminates scalp itching, and restores pristine epidermal balance.',
    ayurvedicWisdom: 'Celebrated in Vedic texts as the ultimate bitter purifier that clears skin toxins and restores natural scalp flora balance.',
    clinicalScience: 'Bioactive nimbidin and azadirachtin selectively eliminate Malassezia yeast growth while soothing epidermal scaling.',
    origin: 'South Indian Gardens',
    extraction: 'Cold Filtered Juice',
    richIn: 'Nimbidin Bioactives',
    role: 'Scalp Purifier',
    imageSrc: '/products/herb_neem.png'
  }
];

export function IngredientExplorer() {
  const [selectedId, setSelectedId] = useState(INGREDIENTS[0].id);

  const activeIngredient = INGREDIENTS.find((item) => item.id === selectedId) || INGREDIENTS[0];

  return (
    <section
      className="relative w-full bg-[#FAF9F5] py-24 sm:py-32 lg:py-36 overflow-hidden border-b border-[#E8E6DF]"
      aria-label="Editorial Botanical Ingredient Story"
    >
      {/* Faded Background Watermark Illustration at 3.5% Opacity */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-[700px] h-[700px] opacity-[0.035] pointer-events-none select-none">
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#4B644C]">
          <path
            d="M250 50C250 50 150 150 150 275C150 350 200 425 250 450C300 425 350 350 350 275C350 150 250 50 250 50Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeMiterlimit="10"
          />
          <path d="M250 50V450" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M250 150C200 180 170 220 170 270" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M250 220C300 250 330 290 330 340" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
          <path d="M250 300C210 330 190 360 190 400" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="max-w-[1440px] mb-16 sm:mb-20 text-left space-y-3">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              BOTANICAL CONSCIOUSNESS
            </span>
            <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            Key Botanical Ingredients
          </h2>
        </div>

        {/* ── Main Editorial Composition Grid: 35% Navigation | 65% Showcase ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 text-left items-start">
          
          {/* ── LEFT NAVIGATION: Pure Photography & Typography (No Cards) ──────── */}
          <div
            role="tablist"
            aria-label="Botanical Ingredients"
            className="lg:col-span-4 space-y-8 sm:space-y-10"
          >
            {INGREDIENTS.map((item) => {
              const isSelected = item.id === selectedId;
              return (
                <button
                  suppressHydrationWarning
                  key={item.id}
                  id={`tab-${item.id}`}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`panel-${item.id}`}
                  onClick={() => setSelectedId(item.id)}
                  className={`w-full text-left flex items-center gap-6 group transition-all duration-500 cursor-pointer outline-none ${
                    isSelected ? 'translate-x-3' : 'hover:translate-x-1 opacity-70 hover:opacity-100'
                  }`}
                >
                  {/* 96px Large Botanical Circular Photograph */}
                  <div
                    className={`relative h-20 w-20 sm:h-24 sm:w-24 rounded-full overflow-hidden shrink-0 transition-all duration-500 ${
                      isSelected
                        ? 'scale-105 shadow-xl ring-2 ring-[#4B644C]/40 border-2 border-white'
                        : 'scale-95 grayscale-[20%]'
                    }`}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Editorial Typography & Olive Indicator Line */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      {isSelected && (
                        <span className="w-5 h-[1.5px] bg-[#4B644C] shrink-0" />
                      )}
                      <span
                        className={`text-[10px] font-sans font-semibold uppercase tracking-[0.2em] block truncate transition-colors ${
                          isSelected ? 'text-[#4B644C]' : 'text-[#787E78]'
                        }`}
                      >
                        {item.category}
                      </span>
                    </div>

                    <h3
                      className={`font-serif text-2xl sm:text-3xl font-normal leading-snug transition-colors ${
                        isSelected ? 'text-[#121412]' : 'text-[#4A4E4A]'
                      }`}
                    >
                      {item.name}
                    </h3>

                    <p className="text-xs font-sans text-[#787E78] font-light truncate">
                      {item.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── RIGHT SHOWCASE: High-Fashion Botanical Story (No Cards, Pure Editorial) ──── */}
          <div
            id={`panel-${activeIngredient.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeIngredient.id}`}
            className="lg:col-span-8 flex flex-col"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIngredient.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-10"
              >
                
                {/* 1. LARGE EDITORIAL PHOTOGRAPH (Hero Showcase) */}
                <div className="relative w-full h-[360px] sm:h-[460px] lg:h-[500px] max-w-[780px] rounded-3xl overflow-hidden shadow-2xl group/hero">
                  <Image
                    src={activeIngredient.imageSrc}
                    alt={`${activeIngredient.name} luxury botanical photography`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 780px"
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:scale-105"
                  />
                </div>

                {/* 2. HUGE INSTRUMENT SERIF TYPOGRAPHY & EDITORIAL ESSAY */}
                <div className="space-y-4 max-w-3xl">
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                    {activeIngredient.sanskritName}
                  </span>

                  <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] leading-[1.08] tracking-tight">
                    {activeIngredient.name}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-[#4A4E4A] font-light leading-relaxed max-w-2xl pt-1">
                    {activeIngredient.editorialQuote}
                  </p>
                </div>

                {/* 3. TWO CLEAN COLUMNS (AYURVEDIC WISDOM vs CLINICAL SCIENCE) — NO CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 pt-2 pb-2">
                  
                  {/* Column 1: Ayurvedic Wisdom */}
                  <div className="space-y-2">
                    <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                      Ayurvedic Wisdom
                    </span>
                    <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed">
                      {activeIngredient.ayurvedicWisdom}
                    </p>
                  </div>

                  {/* Column 2: Clinical Science (Subtle Vertical Hairline Divider) */}
                  <div className="space-y-2 md:border-l md:border-[#E8E6DF] md:pl-8">
                    <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                      Clinical Science
                    </span>
                    <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed">
                      {activeIngredient.clinicalScience}
                    </p>
                  </div>

                </div>

                {/* 4. PREMIUM HORIZONTAL SPECIFICATION ROW (Separated by Hairlines, No Boxes) */}
                <div className="pt-8 border-t border-[#E8E6DF] grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                      Origin
                    </span>
                    <span className="text-sm font-sans font-medium text-[#121412]">
                      {activeIngredient.origin}
                    </span>
                  </div>

                  <div className="space-y-1 sm:border-l sm:border-[#E8E6DF] sm:pl-6">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                      Extraction
                    </span>
                    <span className="text-sm font-sans font-medium text-[#121412]">
                      {activeIngredient.extraction}
                    </span>
                  </div>

                  <div className="space-y-1 sm:border-l sm:border-[#E8E6DF] sm:pl-6">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                      Rich In
                    </span>
                    <span className="text-sm font-sans font-medium text-[#121412]">
                      {activeIngredient.richIn}
                    </span>
                  </div>

                  <div className="space-y-1 sm:border-l sm:border-[#E8E6DF] sm:pl-6">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block">
                      Role
                    </span>
                    <span className="text-sm font-sans font-medium text-[#121412]">
                      {activeIngredient.role}
                    </span>
                  </div>

                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
