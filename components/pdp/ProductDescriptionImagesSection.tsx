'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Product } from '@/types/product';

interface DescriptionImageItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  highlights: string[];
}

interface ProductDescriptionData {
  eyebrow: string;
  heading: string;
  subheading: string;
  items: DescriptionImageItem[];
}

function getProductDescriptionData(handle: string, title: string): ProductDescriptionData {
  const str = `${handle || ''} ${title || ''}`.toLowerCase();

  // ── Sunscreen Gel ──────────────────────────────────────────────────────────
  if (str.includes('sunscreen') || str.includes('de-tan') || str.includes('spf')) {
    return {
      eyebrow: 'PRODUCT FORMULATION & DETAILS',
      heading: 'Advanced De-Tan Solar Protection',
      subheading: 'Discover the science behind our non-comedogenic SPF 50+ PA++++ gel formulation.',
      items: [
        {
          title: 'SPF 50+ PA++++ Broad Spectrum Shield',
          subtitle: 'Active De-Tan & Melanin Control',
          description: 'Formulated with Fermented Rice Water, Sea Buckthorn Berry, Kojic Acid, and 5% Niacinamide to shield skin from UVA/UVB blue light while actively fading existing sun tan.',
          image: '/products/desc_sunscreen_slide.png',
          alt: 'FLOIS De-Tan Sunscreen Gel official formulation & solar protection banner',
          highlights: ['SPF 50+ PA++++ Certified', 'Niacinamide & Kojic Acid De-Tan', 'Blocks 98% UV Free Radicals'],
        },
        {
          title: 'Weightless Water-Gel Texture',
          subtitle: 'Zero White Cast · Zero Greasiness',
          description: 'Absorbs in under 5 seconds with zero white cast or shiny residue. The breathable gel texture prevents pore-clogging and works seamlessly under makeup.',
          image: '/products/editorial_sunscreen.jpg',
          alt: 'FLOIS Sunscreen Gel texture & application photo',
          highlights: ['Zero White Cast on Indian Skin', 'Non-Comedogenic & Oil-Free', 'Sweat & Water Resistant'],
        },
      ],
    };
  }

  // ── Neem Wood Comb ─────────────────────────────────────────────────────────
  if (str.includes('neem') || str.includes('comb') || str.includes('wood')) {
    return {
      eyebrow: 'ARTISAN CRAFT & SCALP HEALTH',
      heading: 'Handcrafted Medicinal Neem Wood Tool',
      subheading: 'Rooted in traditional Vedic scalp rituals to eliminate static and reduce hair breakage.',
      items: [
        {
          title: 'Seasoned Medicinal Margosa Wood',
          subtitle: '45-Day Herbal Infused Artisanal Wood',
          description: 'Hand-carved from mature medicinal neem trees and soaked for 45 days in 17 scalp herbs including Bhringraj and Amla. Transfers anti-bacterial nimbidin bioactives to your scalp.',
          image: '/products/desc_neem_comb.jpg',
          alt: 'FLOIS Handcrafted Neem Wood Comb official description banner',
          highlights: ['Pure Medicinal Neem Wood', '45-Day Herbal Infused', 'Naturally Anti-Dandruff'],
        },
        {
          title: 'Anti-Static Hand-Polished Teeth',
          subtitle: 'Zero Breakage & Scalp Massage',
          description: 'Unlike plastic combs that create static electricity and tear hair cuticles, hand-rounded neem teeth gently glide through knots, stimulating scalp papilla micro-circulation.',
          image: '/products/editorial_neem_comb.jpg',
          alt: 'FLOIS Neem Wood Comb smooth teeth detail',
          highlights: ['100% Anti-Static Friction', 'Prevents Hair Cuticle Tearing', 'Smooth Rounded Massage Teeth'],
        },
      ],
    };
  }

  // ── Body / Skin Care ───────────────────────────────────────────────────────
  if (str.includes('body') || str.includes('skin') || str.includes('lotion') || str.includes('care')) {
    return {
      eyebrow: 'BOTANICAL BODY & SKINCARE',
      heading: 'Ayurvedic Botanical Skin Nourishment',
      subheading: 'Pure plant bioactives and cold-pressed oils formulated for 24-hour hydration.',
      items: [
        {
          title: '100% Cold-Pressed Plant Bioactives',
          subtitle: 'Pure Botanical Elixir',
          description: 'Sourced from organic South Indian botanical gardens, our cold-pressed formula delivers concentrated vitamins, essential fatty acids, and antioxidants directly to skin cells.',
          image: '/products/botanical_ingredients.jpg',
          alt: 'FLOIS Botanical Skin Care ingredients breakdown',
          highlights: ['100% Cold-Pressed Herbs', '24-Hour Deep Hydration', 'Zero Mineral Oils or Silicones'],
        },
        {
          title: 'Silk-Touch Fast Absorption',
          subtitle: 'Soothing Barrier Fortification',
          description: 'Lightweight, non-greasy formula absorbs rapidly to soothe redness, restore epidermal lipids, and leave a velvety luminous finish.',
          image: '/products/texture_macro.jpg',
          alt: 'FLOIS Skin Care sensory texture',
          highlights: ['Calms Skin Inflammation', 'Restores Moisture Barrier', 'Silk-Touch Luminous Finish'],
        },
      ],
    };
  }

  // ── Default: RootHerb Hair Growth Oil ──────────────────────────────────────
  return {
    eyebrow: 'BOTANICAL FORMULATION & DETAILS',
    heading: 'Oleokare 5-In-1 Hair Care Infusion',
    subheading: 'Discover the 100% cold-pressed formulation behind 96% hair fall reduction.',
    items: [
      {
        title: 'Oleokare 5-In-1 Active Anti-Hair Loss Infusion',
        subtitle: 'Clinically Proven Hair Care Actives',
        description: 'Cold-pressed virgin sesame and coconut oil slow-cooked with Bhringraj, Wild Rosemary, Amla, Neem, and Oleokare 5-in-1 bioactives. Clinically shown to extend hair growth by 51% and increase hair thickness by 81%.',
        image: '/products/desc_flois_marketplace.png',
        alt: 'FLOIS Hair Growth Oil Oleokare 5-In-1 description infographic banner',
        highlights: ['51% Increased Hair Growth', '81% Hair Thickness Boost', '57% Hair Fall Reduction'],
      },
      {
        title: '18 Active Herbs Infusion Map',
        subtitle: 'Traditional Ayurvedic Rasayana Formula',
        description: 'Deeply nourishes scalp tissue 3 layers deep without greasy residue. Carnosic acid from wild Himalayan rosemary invigorates blood flow directly to dormant papilla hair cells.',
        image: '/products/rootherb_ingredients_map.png',
        alt: 'FLOIS RootHerb 18 Botanical Herbs Formulation Map',
        highlights: ['18 Pure Ayurvedic Botanicals', 'Copper-Vessel Slow Cooked', 'DHT-Blocker Wedelolactone'],
      },
    ],
  };
}

export function ProductDescriptionImagesSection({ product }: { product: Product }) {
  const data = getProductDescriptionData(product?.handle || '', product?.title || '');

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[780px] mx-auto text-center space-y-3 mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF9F5] border border-[#E8E6DF] text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8C9B3E]">
            <Sparkles className="h-3 w-3 text-[#8C9B3E]" />
            <span>{data.eyebrow}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-[1.08] tracking-tight text-[#111111]">
            {data.heading}
          </h2>

          <p className="text-base font-sans text-[#555555] font-light max-w-xl mx-auto leading-relaxed">
            {data.subheading}
          </p>
        </motion.div>

        {/* Feature Blocks Stack (Images + Product Descriptions) */}
        <div className="space-y-20 sm:space-y-28">
          {data.items.map((item, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center text-left ${
                  !isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-6 ${!isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E6DF] bg-[#FAF9F5] group">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 1024px) 100vw, 650px"
                      className="object-contain p-2 group-hover:scale-103 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>

                {/* Content Column */}
                <div className={`lg:col-span-6 space-y-5 ${!isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="space-y-2">
                    <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#8C9B3E]">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111] leading-tight">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-base font-sans text-[#4A4E4A] font-light leading-relaxed">
                    {item.description}
                  </p>

                  {/* Highlights List */}
                  <div className="pt-3 space-y-2.5 border-t border-[#E8E6DF]">
                    {item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-[#8C9B3E] shrink-0" />
                        <span className="text-xs sm:text-sm font-sans font-semibold text-[#111111]">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
