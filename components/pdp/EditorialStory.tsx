'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Product } from '@/types/product';

// ─── Per-product editorial data ───────────────────────────────────────────────

interface StoryData {
  eyebrow: string;
  headline: React.ReactNode;
  pullQuote: string;
  paragraphs: string[];
  caption: string;
  signature: string;
  metrics: { value: string; label: string }[];
  image: string;
  imageAlt: string;
}

function getStoryData(handle: string, title: string): StoryData {
  const h = handle.toLowerCase();

  // ── Neem Wood Comb ──────────────────────────────────────────────────────────
  if (h.includes('neem') || h.includes('comb')) {
    return {
      eyebrow: 'ANCIENT ARTISAN CRAFT',
      headline: (
        <>
          Carved for{' '}
          <span className="font-serif italic text-[#4B644C]">Scalp Renewal</span>
        </>
      ),
      pullQuote:
        '"Ancient Vedic texts prescribed medicinal neem wood for its antibacterial properties — not a trend, but a time-tested tool for scalp health."',
      paragraphs: [
        `${title} is hand-carved in small batches by trained artisans from seasoned medicinal neem (Azadirachta indica) trees — a wood that has been prescribed in Ayurvedic medicine for millennia.`,
        'Each comb is soaked for 45 days in a proprietary blend of 17 scalp herbs — including Bhringraj, Amla, and Jatamansi — before hand-polishing, infusing every tooth with active medicinal oils.',
        'Unlike synthetic combs that generate static electricity and cause cuticle damage, neem wood naturally distributes scalp oils without friction, breakage, or bacterial contamination.',
      ],
      caption: 'Hand-Carved Medicinal Neem Wood',
      signature: 'Rooted in Vedic Craft. Proven by Dermatology.',
      metrics: [
        { value: '45', label: 'Days Herbal Soak' },
        { value: '0%', label: 'Synthetic Materials' },
        { value: '17', label: 'Active Herbs' },
        { value: '100%', label: 'Anti-Static' },
      ],
      image: '/products/editorial_neem_comb.jpg',
      imageAlt: 'FLOIS Handcrafted Neem Wood Comb — artisan carved from medicinal neem tree',
    };
  }

  // ── De-Tan Sunscreen ────────────────────────────────────────────────────────
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      eyebrow: 'ADVANCED SOLAR SCIENCE',
      headline: (
        <>
          Protect,{' '}
          <span className="font-serif italic text-[#4B644C]">Brighten & Defend</span>
        </>
      ),
      pullQuote:
        '"Indian skin faces aggressive UV-A radiation year-round. We formulated specifically for tropical climates — not repurposed European sunscreens."',
      paragraphs: [
        `${title} is formulated specifically for Indian skin tones and humid tropical climates — lightweight enough to wear daily under makeup, powerful enough for outdoor exposure.`,
        'The formula combines SPF 50+ broad-spectrum UV filters with an active Niacinamide complex and Aloe Vera base that simultaneously fades existing tan while preventing new UV damage.',
        'Zero white cast, zero greasy finish, zero clogged pores. A clinically tested formula that works with your skin — not against it.',
      ],
      caption: 'Clinically Formulated for Indian Skin',
      signature: 'Science-First. Skin-Safe. Sweat-Resistant.',
      metrics: [
        { value: 'SPF 50+', label: 'Protection' },
        { value: 'PA++++', label: 'UVA Defense' },
        { value: '0%', label: 'White Cast' },
        { value: '24h', label: 'Hydration' },
      ],
      image: '/products/editorial_sunscreen.jpg',
      imageAlt: 'FLOIS Advanced De-Tan Sunscreen Gel SPF 50+ — editorial product photography',
    };
  }

  // ── RootHerb Hair Growth Oil (default) ──────────────────────────────────────
  return {
    eyebrow: 'OUR PHILOSOPHY',
    headline: (
      <>
        Crafted for{' '}
        <span className="font-serif italic text-[#4B644C]">Transformation</span>
      </>
    ),
    pullQuote:
      '"True hair transformation begins at the roots — not with harsh synthetic chemicals, but with carefully selected cold-pressed botanicals."',
    paragraphs: [
      `${title} is handcrafted in micro-batches using authentic Ayurvedic copper vessel slow-infusion — a time-tested extraction method unchanged for over five centuries.`,
      'By avoiding high-heat processing and mineral oils, our cold-pressed extractions preserve 100% of the active phytochemicals, wedelolactone, and essential fatty acids required to stimulate dormant hair papilla.',
      'Every formulation bridges ancient Vedic scriptural wisdom with modern dermatological science, offering proven root renewal without compromise.',
    ],
    caption: 'Traditional Ayurvedic Preparation',
    signature: 'Rooted in Ayurveda. Refined by Science.',
    metrics: [
      { value: '18', label: 'Ayurvedic Herbs' },
      { value: '0%', label: 'Mineral Oil' },
      { value: '4 Wks', label: 'Visible Results' },
      { value: '100%', label: 'Cold Pressed' },
    ],
    image: '/products/editorial_rootherb.jpg',
    imageAlt: 'FLOIS RootHerb botanical hair oil ritual — natural sunlight lifestyle photography',
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EditorialStory({ product }: { product: Product }) {
  const cubicEase = [0.16, 1, 0.3, 1] as const;
  const story = getStoryData(product.handle || '', product.title || '');

  return (
    <section
      className="relative w-full bg-[#FAF9F5] py-24 sm:py-32 lg:py-36 overflow-hidden border-b border-[#E8E6DF]"
      aria-label="FLOIS Editorial Philosophy and Craftsmanship Story"
    >
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none select-none bg-[radial-gradient(#4B644C_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* LEFT: Product editorial image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: cubicEase }}
            className="lg:col-span-5 relative"
          >
            <div className="absolute -inset-4 rounded-[20px] bg-[#4B644C]/5 blur-2xl pointer-events-none" />
            <div className="relative aspect-[3/4] rounded-[12px] overflow-hidden shadow-2xl group border border-[#E8E6DF] lg:-my-4">
              <Image
                src={story.image}
                alt={story.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141C15]/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-white/85 backdrop-blur-md px-4 py-2 border border-white/60 shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4B644C]" />
                <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#121412]">
                  {story.caption}
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Editorial storytelling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: cubicEase, delay: 0.12 }}
            className="lg:col-span-7 space-y-8 text-left"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5">
                <span className="h-[1px] w-6 bg-[#4B644C]" />
                <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
                  {story.eyebrow}
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
                {story.headline}
              </h2>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: cubicEase, delay: 0.2 }}
              className="pl-6 border-l-2 border-[#4B644C] py-1"
            >
              <p className="font-serif text-xl sm:text-2xl font-normal italic text-[#4A4E4A] leading-relaxed">
                {story.pullQuote}
              </p>
            </motion.div>

            <div className="space-y-4 font-sans text-base sm:text-lg font-light text-[#4A4E4A] leading-relaxed max-w-2xl">
              {story.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <div className="relative pt-4 pb-2 flex items-center justify-center">
              <div className="w-full h-[1px] bg-[#E8E6DF]" />
              <div className="absolute bg-[#FAF9F5] px-4 text-[#4B644C]">
                <Sparkles className="h-3.5 w-3.5 text-[#4B644C]" />
              </div>
            </div>

            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
                {story.metrics.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: cubicEase, delay: 0.3 + idx * 0.06 }}
                    className={`space-y-1 ${idx > 0 ? 'sm:border-l sm:border-[#E8E6DF] sm:pl-6' : ''}`}
                  >
                    <span className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#121412] font-normal block leading-none">
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#787E78] block pt-1">
                      {stat.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="pt-4 text-left">
              <span className="font-serif italic text-sm sm:text-base text-[#4B644C] tracking-wide opacity-80">
                {story.signature}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
