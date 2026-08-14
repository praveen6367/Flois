'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';
import { Product } from '@/types/product';

interface BannerContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  mainBannerImage: string;
  mainBannerAlt: string;
  featurePills: string[];
}

function getBannerContent(handle: string, title: string): BannerContent {
  const str = `${handle || ''} ${title || ''}`.toLowerCase();

  if (str.includes('sunscreen') || str.includes('tan') || str.includes('spf') || str.includes('sun')) {
    return {
      eyebrow: 'SOLAR FORMULATION HIGHLIGHTS',
      title: 'Advanced De-Tan & UV Defense Formula',
      subtitle: 'Formulated with Rice Water, Sea Buckthorn, Kojic Acid & Niacinamide to protect against sun damage while actively reversing tanning.',
      mainBannerImage: '/products/editorial_sunscreen.jpg',
      mainBannerAlt: 'FLOIS Advanced De-Tan Sunscreen Gel formulation breakdown',
      featurePills: ['SPF 50+ PA++++', 'Zero White Cast', 'Niacinamide De-Tan', 'Water & Sweat Resistant'],
    };
  }

  if (str.includes('neem') || str.includes('comb') || str.includes('wood')) {
    return {
      eyebrow: 'ARTISAN MEDICINAL WOOD CRAFT',
      title: 'Handcrafted Neem Wood Scalp Tool',
      subtitle: 'Crafted from seasoned medicinal margosa wood, infused with 17 scalp herbs to eliminate static, soothe itchiness, and prevent hair breakage.',
      mainBannerImage: '/products/editorial_neem_comb.jpg',
      mainBannerAlt: 'FLOIS Handcrafted Neem Wood Comb artisan craftsmanship banner',
      featurePills: ['100% Anti-Static', 'Medicinal Neem Wood', '45-Day Herbal Infused', 'Anti-Dandruff Action'],
    };
  }

  if (str.includes('body') || str.includes('skin') || str.includes('lotion') || str.includes('care')) {
    return {
      eyebrow: 'PURE BOTANICAL SKINCARE',
      title: 'Ayurvedic Botanical Nourishment',
      subtitle: 'Cold-pressed botanical oils, active plant essences, and skin-replenishing bioactives formulated for 24-hour hydration and barrier defense.',
      mainBannerImage: '/products/botanical_ingredients.jpg',
      mainBannerAlt: 'FLOIS Botanical Skin & Body Care formulation breakdown',
      featurePills: ['Cold-Pressed Botanicals', '24h Deep Hydration', '0% Mineral Oil', '100% Ayurvedic'],
    };
  }

  // Default: RootHerb Hair Oil
  return {
    eyebrow: 'BOTANICAL FORMULATION MAP',
    title: '18 Active Herbs Infused In 1 Bottle',
    subtitle: 'Cold-pressed virgin sesame and coconut oil infused with Bhringraj, Rosemary, Amla, and 15 botanical herbs for 96% hair fall reduction.',
    mainBannerImage: '/products/rootherb_ingredients_map.png',
    mainBannerAlt: 'FLOIS RootHerb Botanical Ingredients & Formulation Map',
    featurePills: ['100% Cold-Pressed', '18 Active Herbs', '0% Mineral Oil', 'Dermatologist Verified'],
  };
}

export function ProductDescriptionBanner({ product }: { product: Product }) {
  const content = getBannerContent(product?.handle || '', product?.title || '');

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[800px] mx-auto text-center space-y-3 mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F2F4E6] border border-[#E0E4B3] text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8C9B3E]">
            <Sparkles className="h-3 w-3 text-[#8C9B3E]" />
            <span>{content.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] tracking-tight text-[#111111]">
            {content.title}
          </h2>

          <p className="text-base font-sans text-[#555555] font-light max-w-xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
            {content.featurePills.map((pill) => (
              <span
                key={pill}
                className="inline-flex items-center gap-1.5 bg-white border border-[#E8E6DF] px-3.5 py-1.5 rounded-full text-xs font-sans font-semibold text-[#2D5A2E] shadow-2xs"
              >
                <Check className="h-3.5 w-3.5 text-[#8C9B3E] stroke-[3]" />
                {pill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* High-Fashion Description Banner Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-[1200px] mx-auto aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E6DF] bg-white group"
        >
          <Image
            src={content.mainBannerImage}
            alt={content.mainBannerAlt}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
          />

          {/* Gradient overlay badge */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8 p-4 sm:p-6 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#8C9B3E]">
                AUTHENTIC AYURVEDIC FORMULATION
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-white">
                {product?.title || 'FLOIS Botanical Product'}
              </h3>
            </div>

            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shrink-0">
              <ShieldCheck className="h-4 w-4 text-[#8C9B3E] fill-[#8C9B3E]" />
              <span className="text-xs font-sans font-bold text-white uppercase tracking-wider">
                100% Quality Guaranteed
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
