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

// ─── Hair Growth Oil Ingredients ──────────────────────────────────────────────
const HAIR_OIL_INGREDIENTS: Ingredient[] = [
  {
    id: 'bhringraj',
    name: 'Bhringraj (False Daisy)',
    sanskritName: 'Keshraj — King of Hair',
    category: 'Botanical Hair & Scalp Care',
    summary: 'Traditionally Used for Hair & Scalp Care',
    editorialQuote: 'Bhringraj has a long history of use in Ayurvedic hair-care practices and is valued for scalp and hair nourishment.',
    ayurvedicWisdom: 'Balances Kapha-Vata doshas and cools scalp heat, redirecting natural nourishment directly to roots and follicles.',
    clinicalScience: 'Rich in wedelolactone and botanical nutrients. Role in RootHerb: Botanical scalp and hair conditioning.',
    origin: 'Keralan Organic Farms',
    extraction: 'Cold Pressed Virgin',
    richIn: 'Wedelolactone',
    role: 'Botanical Scalp & Hair Conditioning',
    imageSrc: '/products/herb_bhringraj.png'
  },
  {
    id: 'rosemary',
    name: 'Wild Rosemary Essential Oil',
    sanskritName: 'Rusmari — Scalp Revitalizer',
    category: 'Micro-Circulation',
    summary: 'Invigorating Scalp Oil',
    editorialQuote: 'Distilled from wild Himalayan rosemary, this concentrated botanical oil invigorates micro-vascular blood flow to the papilla matrix without heavy greasy residue.',
    ayurvedicWisdom: 'Invigorates sluggish scalp tissue, clears excess sebum, and restores hair shaft elasticity.',
    clinicalScience: 'Rich in carnosic and rosmarinic acid, supporting healthy scalp vitality and hair strength.',
    origin: 'Himalayan Foothills',
    extraction: 'Steam Distilled Essence',
    richIn: 'Carnosic Acid',
    role: 'Scalp Vitality',
    imageSrc: '/products/herb_rosemary.png'
  },
  {
    id: 'amla',
    name: 'Organic Indian Gooseberry',
    sanskritName: 'Amritphal — Fruit of Immortality',
    category: 'Vitamin C & Melanin',
    summary: 'Rich in Natural Vitamin C',
    editorialQuote: "The world's most potent botanical source of Vitamin C, Amla shields scalp collagen from environmental oxidative stress while preserving natural hair shaft melanin.",
    ayurvedicWisdom: 'A revered Rasayana tonic that pacifies Pitta heat, nourishing scalp tissue and supporting natural hair pigmentation.',
    clinicalScience: 'Packed with gallic acid and ellagitannins that neutralize free radicals and fortify hair shaft integrity.',
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
    summary: 'Natural Scalp Purifier',
    editorialQuote: 'Sourced from South Indian botanical gardens, pure Neem leaf extract clears impurities, soothes dry scalp discomfort, and maintains epidermal balance.',
    ayurvedicWisdom: 'Celebrated in Ayurvedic tradition as the ultimate bitter botanical that clears scalp impurities and restores equilibrium.',
    clinicalScience: 'Natural nimbidin bioactives maintain optimal scalp cleanliness and soothing barrier relief.',
    origin: 'South Indian Gardens',
    extraction: 'Cold Filtered Juice',
    richIn: 'Nimbidin Bioactives',
    role: 'Scalp Clarifier',
    imageSrc: '/products/herb_neem.png'
  }
];

// ─── Sunscreen Ingredients ────────────────────────────────────────────────────
const SUNSCREEN_INGREDIENTS: Ingredient[] = [
  {
    id: 'uv-filters',
    name: 'Broad-Spectrum UV Filters',
    sanskritName: 'Surya-Kavach — Solar Shield',
    category: 'UV Filters: Hybrid Solar Defense',
    summary: 'SPF 50+ PA++++ Certified',
    editorialQuote: 'Modern hybrid solar filters (Zinc Oxide, Titanium Dioxide, Octocrylene, Avobenzone) deliver broad-spectrum UVA & UVB defense without a heavy white cast.',
    ayurvedicWisdom: 'Protects the skin against Pitta-aggravating solar thermal stress and harsh outdoor environmental radiation.',
    clinicalScience: 'Tested broad-spectrum defense blocking over 98% of damaging UV rays while maintaining a clear, weightless finish on Indian skin.',
    origin: 'Certified Solar Science Lab',
    extraction: 'Micro-Dispersed Hybrid Filters',
    richIn: 'INCI-Approved Solar Defense',
    role: 'UVA / UVB Daily Protection',
    imageSrc: '/products/herb_sea_buckthorn.png'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3) 5%',
    sanskritName: 'Nikotinamide — Skin Fortifier',
    category: 'Actives: Barrier Repair & Tone',
    summary: 'Active Tone Clarifier',
    editorialQuote: 'A gold-standard dermatological active, 5% Niacinamide strengthens the skin moisture barrier, regulates excess oil, and helps fade sun-induced pigmentation.',
    ayurvedicWisdom: 'Rehydrates and balances the skin surface, promoting smoother texture and natural clarity.',
    clinicalScience: 'Clinically shown to reduce transepidermal water loss and support visibly more even skin tone over regular daily use.',
    origin: 'Bio-Fermentation Grade',
    extraction: 'Pharmaceutical Grade B3',
    richIn: '5% Pure Niacinamide',
    role: 'Barrier Fortifier',
    imageSrc: '/products/herb_niacinamide.png'
  },
  {
    id: 'kojic-acid',
    name: 'Natural Kojic Acid 2%',
    sanskritName: 'Tamra-Har — Pigment Corrector',
    category: 'Actives: De-Pigmentation',
    summary: 'Active De-Tanning',
    editorialQuote: 'Derived from natural koji fermentation, 2% Kojic Acid helps inhibit excess melanin transfer to visibly reduce persistent tanning and uneven patches.',
    ayurvedicWisdom: 'Gently clears accumulated sun darkness and promotes luminous skin radiance without harsh bleaching agents.',
    clinicalScience: 'Acts on tyrosinase activity to help reduce sun-induced hyperpigmentation when used alongside SPF daily.',
    origin: 'Natural Koji Fermentation',
    extraction: 'Biotechnology Fermentation',
    richIn: '2% Natural Kojic Acid',
    role: 'Visible Tan Reduction',
    imageSrc: '/products/herb_kojic_acid.png'
  },
  {
    id: 'rice-water',
    name: 'Fermented Rice Water',
    sanskritName: 'Tandulodaka — Ancient Brightener',
    category: 'Botanical Ingredients: Brightening',
    summary: 'Skin Tone Brightener',
    editorialQuote: 'Rich in inositol and amino acids, fermented rice water provides weightless hydration, softens the epidermis, and supports natural radiance.',
    ayurvedicWisdom: 'A classical cooling preparation prized for its ability to calm heated skin and restore moisture balance.',
    clinicalScience: 'Rich in ferulic acid and inositol, improving skin moisture retention and enhancing smooth luminosity.',
    origin: 'South Indian Rice Groves',
    extraction: 'Fermented Botanical Extract',
    richIn: 'Inositol & Amino Acids',
    role: 'Botanical Hydration',
    imageSrc: '/products/herb_rice_water.png'
  },
  {
    id: 'sea-buckthorn',
    name: 'Sea Buckthorn Berry',
    sanskritName: 'Amla-Saar — Antioxidant Shield',
    category: 'Botanical Ingredients: Antioxidant',
    summary: 'Antioxidant Defense',
    editorialQuote: "One of nature's richest sources of Omega-7 fatty acids and carotenoids, sea buckthorn helps shield the skin against environmental free radicals.",
    ayurvedicWisdom: 'Traditionally used to soothe outdoor-exposed skin and restore vital moisture lipids.',
    clinicalScience: 'Abundant carotenoids neutralize oxidative stress caused by daily sun exposure and urban pollution.',
    origin: 'Himalayan High Altitude',
    extraction: 'Cold Pressed CO2 Extract',
    richIn: 'Omega-7 & Carotenoids',
    role: 'Free Radical Defense',
    imageSrc: '/products/herb_sea_buckthorn.png'
  }
];

// ─── Neem Wood Comb Ingredients ───────────────────────────────────────────────
const NEEM_COMB_INGREDIENTS: Ingredient[] = [
  {
    id: 'neem-wood',
    name: 'Pure Natural Neem Wood',
    sanskritName: 'Nimba Kashtha — Sacred Healer',
    category: 'Natural Neem Wood',
    summary: 'Naturally Durable & Low-Static',
    editorialQuote: 'A naturally durable wood traditionally valued in Indian wellness practices for its cooling, grounding touch.',
    ayurvedicWisdom: 'Ayurvedic tradition values natural neem wood combing as a daily mindful ritual to support healthy scalp circulation.',
    clinicalScience: 'Wood teeth naturally minimise static electricity compared with plastic combs, protecting hair cuticles from friction damage.',
    origin: 'South Indian Neem Groves',
    extraction: 'Hand-Carved & Air Seasoned',
    richIn: 'Natural Neem Characteristics',
    role: 'Gentle Detangling',
    imageSrc: '/products/herb_neem.png'
  },
  {
    id: 'herbal-infusion',
    name: '17 Botanical Herbal Infusion',
    sanskritName: 'Saptadasha Kashaya — 17 Herbs',
    category: '17 Botanical Infusion',
    summary: '45-Day Herbal Soak',
    editorialQuote: 'Traditionally soaked in a botanical oil blend of 17 herbs for 45 days, conditioning the wood with rich plant nutrients.',
    ayurvedicWisdom: 'Infused with Bhringraj, Amla, and Jatamansi to gently transfer botanical conditioning during everyday combing.',
    clinicalScience: 'Conditioned wood teeth glide smoothly across strands without absorbing natural moisture from hair cuticles.',
    origin: 'Ayurvedic Artisan Workshop',
    extraction: '45-Day Botanical Slow Soak',
    richIn: 'Botanical Herbal Oils',
    role: 'Conditioned Wood Glide',
    imageSrc: '/products/herb_bhringraj.png'
  },
  {
    id: 'rounded-teeth',
    name: 'Smooth Rounded Massage Teeth',
    sanskritName: 'Danta Shodhana — Gentle Teeth',
    category: 'Smooth Rounded Teeth',
    summary: 'Gentle Scalp Massage',
    editorialQuote: 'Designed for gentle detangling and comfortable scalp contact, perfect for a relaxing daily scalp-combing ritual.',
    ayurvedicWisdom: 'Stimulates vital Marma pressure points along the crown line, promoting peaceful relaxation and mental clarity.',
    clinicalScience: 'Rounded tips distribute natural sebum evenly along the hair shaft without scratching sensitive scalp skin.',
    origin: 'Artisan Wood Craft',
    extraction: 'Hand-Polished Finish',
    richIn: 'Seamless Wooden Finish',
    role: 'Gentle Scalp Massage',
    imageSrc: '/products/desc_neem_comb.jpg'
  }
];

function getIngredients(productHandle: string): Ingredient[] {
  const h = productHandle.toLowerCase();
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf') || h.includes('de-tan')) {
    return SUNSCREEN_INGREDIENTS;
  }
  if (h.includes('neem') || h.includes('comb')) {
    return NEEM_COMB_INGREDIENTS;
  }
  return HAIR_OIL_INGREDIENTS;
}

function getSectionTitle(productHandle: string): string {
  const h = productHandle.toLowerCase();
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) return 'Key Active Ingredients';
  if (h.includes('neem') || h.includes('comb')) return 'The Neem Advantage';
  return 'Key Botanical Ingredients';
}

interface IngredientExplorerProps {
  productHandle?: string;
}

export function IngredientExplorer({ productHandle = 'rootherb-hair-growth-oil' }: IngredientExplorerProps) {
  const INGREDIENTS = getIngredients(productHandle);
  const [selectedId, setSelectedId] = useState(INGREDIENTS[0].id);

  const activeIngredient = INGREDIENTS.find((item) => item.id === selectedId) || INGREDIENTS[0];

  return (
    <section
      className="relative w-full bg-[#FAF9F5] py-14 sm:py-20 overflow-hidden border-b border-[#E8E6DF]"
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
        <div className="max-w-[1440px] mb-10 sm:mb-12 text-left space-y-2">
          <div className="inline-flex items-center gap-2">
            <span className="h-[1px] w-5 bg-[#4B644C]" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              BOTANICAL CONSCIOUSNESS
            </span>
            <Sparkles className="h-3 w-3 text-[#4B644C]" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {getSectionTitle(productHandle)}
          </h2>
        </div>

        {/* ── Main Editorial Composition Grid: 35% Navigation | 65% Showcase ───── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 text-left items-start">
          
          {/* ── LEFT NAVIGATION: Pure Photography & Typography (No Cards) ──────── */}
          <div
            role="tablist"
            aria-label="Botanical Ingredients"
            className="lg:col-span-4 space-y-5"
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
                  {/* Botanical Circular Photograph */}
                  <div
                    className={`relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden shrink-0 transition-all duration-500 ${
                      isSelected
                        ? 'scale-105 shadow-lg ring-2 ring-[#4B644C]/40 border-2 border-white'
                        : 'scale-95 grayscale-[20%]'
                    }`}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.name}
                      fill
                      sizes="56px"
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
                      className={`font-serif text-base sm:text-lg font-normal leading-snug transition-colors ${
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

          {/* ── RIGHT SHOWCASE: High-Fashion Botanical Story ──── */}
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
                <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px] max-w-[780px] rounded-2xl overflow-hidden shadow-xl group/hero">
                  <Image
                    src={activeIngredient.imageSrc}
                    alt={`${activeIngredient.name} luxury botanical photography`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 780px"
                    className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/hero:scale-105"
                  />
                </div>

                {/* 2. SERIF TYPOGRAPHY & EDITORIAL ESSAY */}
                <div className="space-y-4 max-w-3xl">
                  <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                    {activeIngredient.sanskritName}
                  </span>

                  <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#121412] leading-[1.08] tracking-tight">
                    {activeIngredient.name}
                  </h3>

                  <p className="font-sans text-sm text-[#4A4E4A] font-light leading-relaxed max-w-2xl pt-1">
                    {activeIngredient.editorialQuote}
                  </p>
                </div>

                {/* 3. TWO CLEAN COLUMNS (AYURVEDIC WISDOM vs CLINICAL SCIENCE) */}
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

                  {/* Column 2: Clinical Science */}
                  <div className="space-y-2 md:border-l md:border-[#E8E6DF] md:pl-8">
                    <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C] block">
                      Clinical Science
                    </span>
                    <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed">
                      {activeIngredient.clinicalScience}
                    </p>
                  </div>

                </div>

                {/* 4. SPECIFICATION ROW */}
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
