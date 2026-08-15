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

// ─── Sunscreen Ingredients ────────────────────────────────────────────────────
const SUNSCREEN_INGREDIENTS: Ingredient[] = [
  {
    id: 'rice-water',
    name: 'Fermented Rice Water',
    sanskritName: 'Tandulodaka — Ancient Brightener',
    category: 'Brightening & Hydration',
    summary: 'Skin Tone Brightener',
    editorialQuote: 'Used for centuries in East Asian beauty rituals, fermented rice water is rich in inositol and ferulic acid that visibly brighten skin and fortify the moisture barrier.',
    ayurvedicWisdom: 'A classical Panchakarma ingredient prized for its ability to soften skin, reduce inflammation, and restore natural luminosity to dull complexion.',
    clinicalScience: 'Inositol penetrates the skin epidermis, reducing trans-epidermal water loss by 23% while visibly brightening sun-pigmented areas.',
    origin: 'South Indian Rice Farms',
    extraction: 'Fermented Cold Extract',
    richIn: 'Inositol & Ferulic Acid',
    role: 'Skin Brightening',
    imageSrc: '/products/herb_rice_water.png'
  },
  {
    id: 'sea-buckthorn',
    name: 'Sea Buckthorn Berry',
    sanskritName: 'Amla-Saar — Antioxidant Shield',
    category: 'UV & Free Radical Defense',
    summary: 'Powerful Antioxidant Barrier',
    editorialQuote: "One of nature's richest sources of Omega-7 fatty acids and carotenoids, sea buckthorn creates a protective antioxidant shield that neutralizes UV-induced free radicals on contact.",
    ayurvedicWisdom: 'Traditionally used to heal burns and sun-damaged skin, sea buckthorn replenishes skin lipids destroyed by UV radiation.',
    clinicalScience: 'Clinical studies show carotenoid concentration reduces UV-induced erythema by 36% and significantly decreases post-sun inflammation markers.',
    origin: 'Himalayan High Altitude',
    extraction: 'Cold Pressed CO2 Extract',
    richIn: 'Omega-7 & Carotenoids',
    role: 'UV Defense',
    imageSrc: '/products/herb_sea_buckthorn.png'
  },
  {
    id: 'kojic-acid',
    name: 'Kojic Acid (Natural)',
    sanskritName: 'Tamra-Har — Pigment Corrector',
    category: 'De-Pigmentation',
    summary: 'Clinically Proven De-Tanning',
    editorialQuote: 'Derived from Japanese fermented mushrooms, natural kojic acid inhibits melanin production at the enzyme level — delivering visibly even skin tone without harsh bleaching agents.',
    ayurvedicWisdom: 'Acts on excess pitta-driven melanin production, clearing accumulated sun damage and restoring natural skin clarity gently over time.',
    clinicalScience: 'Inhibits tyrosinase activity by up to 67%, reducing melanin synthesis in UV-exposed zones while being safe for daily use on sensitive skin.',
    origin: 'Japanese Koji Fermentation',
    extraction: 'Biotechnology Fermentation',
    richIn: 'Kojic Acid 2%',
    role: 'De-Pigmentation',
    imageSrc: '/products/herb_kojic_acid.png'
  },
  {
    id: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    sanskritName: 'Nikotinamide — Skin Fortifier',
    category: 'Barrier Repair & Pore Control',
    summary: 'Pore Minimizer & Tone Evener',
    editorialQuote: 'The gold-standard vitamin for visible pore reduction, niacinamide restores the skin barrier, controls excess sebum, and fades dark spots left by sun exposure.',
    ayurvedicWisdom: 'Functions as a potent Vata-balancer — rehydrating and strengthening the epidermal barrier at a cellular level.',
    clinicalScience: 'Reduces transepidermal water loss by 24%, minimizes pore appearance by 16%, and reduces post-inflammatory hyperpigmentation in 8 weeks.',
    origin: 'Bio-Fermentation Grade',
    extraction: 'Pharmaceutical Grade B3',
    richIn: 'Niacinamide 5%',
    role: 'Barrier Fortifier',
    imageSrc: '/products/herb_niacinamide.png'
  }
];

// ─── Neem Wood Comb Ingredients ───────────────────────────────────────────────
const NEEM_COMB_INGREDIENTS: Ingredient[] = [
  {
    id: 'neem-wood',
    name: 'Pure Medicinal Neem Wood',
    sanskritName: 'Nimba Kashtha — Sacred Healer',
    category: 'Anti-Microbial Wood',
    summary: 'Naturally Anti-Fungal',
    editorialQuote: 'Sourced from mature medicinal neem trees, this handcrafted wood naturally carries nimbidin and azadirachtin bioactives that eliminate scalp fungus every time you comb.',
    ayurvedicWisdom: 'Vedic texts prescribe daily combing with neem wood as a Dinacharya ritual to purify scalp energy, balance doshas, and maintain lustrous hair.',
    clinicalScience: 'Natural neem bioactives in the wood are antimicrobial at contact, reducing Malassezia furfur (dandruff fungus) colonies with each use.',
    origin: 'South Indian Neem Groves',
    extraction: 'Hand-Carved & Kiln Dried',
    richIn: 'Nimbidin Bioactives',
    role: 'Scalp Anti-Fungal',
    imageSrc: '/products/herb_neem.png'
  },
  {
    id: 'bhringraj-comb',
    name: 'Bhringraj — Keshraj Herb',
    sanskritName: 'Keshraj — King of Hair Herbs',
    category: 'Root Circulation Boost',
    summary: 'Stimulates Follicle Blood Flow',
    editorialQuote: "When the neem comb's wide teeth massage the scalp, the oil absorbed between sessions gets activated through increased micro-circulation to each follicle.",
    ayurvedicWisdom: "Bhringraj is the classic Ayurvedic companion to neem — together they fortify the scalp against both inflammation and fungal overgrowth.",
    clinicalScience: 'Scalp massage increases follicle nutrient delivery by up to 38%, amplifying the effect of Bhringraj wedelolactone compounds.',
    origin: 'Keralan Organic Farms',
    extraction: 'Cold Pressed & Infused',
    richIn: 'Wedelolactone',
    role: 'Follicle Activation',
    imageSrc: '/products/herb_bhringraj.png'
  },
  {
    id: 'amla-comb',
    name: 'Amla — Vitamin C Fortifier',
    sanskritName: 'Amritphal — Hair Melanin Guard',
    category: 'Anti-Grey & Strengthening',
    summary: 'Preserves Natural Hair Color',
    editorialQuote: 'The natural ionic exchange between neem wood teeth and amla-conditioned hair creates an anti-static, melanin-protective effect that keeps hair smooth and dark.',
    ayurvedicWisdom: 'Daily combing with neem while hair is treated with amla creates a Rasayana cycle that prevents premature greying at the root.',
    clinicalScience: "Amla's gallic acid inhibits scalp oxidative stress by 77%, the primary driver of melanocyte damage leading to premature grey hair.",
    origin: 'Central Organic Groves',
    extraction: 'Cold Pressed Elixir',
    richIn: 'Gallic Acid & Vit-C',
    role: 'Melanin Protection',
    imageSrc: '/products/herb_amla.png'
  },
  {
    id: 'rosemary-comb',
    name: 'Rosemary — Circulation Activator',
    sanskritName: 'Rusmari — Scalp Energizer',
    category: 'Micro-Circulation',
    summary: 'Scalp Blood Flow Booster',
    editorialQuote: 'Combing with neem activates carnosic acid in rosemary-treated scalp zones through mechanical stimulation, dramatically improving micro-vascular circulation.',
    ayurvedicWisdom: "Rosemary's warming quality amplifies the neem comb's scalp stimulation, generating beneficial heat that opens follicular pores.",
    clinicalScience: "Scalp massage tools increase rosemary oil absorption depth by 2.4× compared to topical application alone, enhancing its clinical circulation benefits.",
    origin: 'Himalayan Foothills',
    extraction: 'Steam Distilled',
    richIn: 'Carnosic Acid',
    role: 'Micro-Circulation',
    imageSrc: '/products/herb_rosemary.png'
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
