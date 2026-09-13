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
        '"Crafted from naturally durable neem wood, designed for gentle detangling and a mindful daily scalp ritual."',
      paragraphs: [
        `${title} is hand-carved in small batches by trained artisans from seasoned neem (Azadirachta indica) wood — a material traditionally valued in Indian wellness practices.`,
        'Each comb is soaked for 45 days in a traditional blend of 17 botanical herbs — including Bhringraj, Amla, and Jatamansi — before meticulous hand-polishing for smooth, rounded contact.',
        'Unlike synthetic plastic combs that generate static electricity and cause friction, smooth neem wood naturally glides without snagging, hair breakage, or static flyaways.',
      ],
      caption: 'Artisan Carved Natural Neem Wood',
      signature: 'Rooted in Ayurvedic Tradition. Crafted for Modern Hair Care.',
      metrics: [
        { value: '45', label: 'Days Herbal Infusion' },
        { value: '0%', label: 'Synthetic Plastic' },
        { value: '17', label: 'Botanical Herbs' },
        { value: 'Low', label: 'Static Friction' },
      ],
      image: '/products/editorial_neem_comb.jpg',
      imageAlt: 'FLOIS Handcrafted Neem Wood Comb — artisan carved from natural neem tree',
    };
  }

  // ── De-Tan Sunscreen ────────────────────────────────────────────────────────
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      eyebrow: "WHY YOU'LL LOVE IT",
      headline: (
        <>
          Daily Solar Defense,{' '}
          <span className="font-serif italic text-[#4B644C]">Zero Compromises</span>
        </>
      ),
      pullQuote:
        '"Formulated specifically for everyday wear in Indian climates — high broad-spectrum protection, weightless gel feel, and zero visible white cast."',
      paragraphs: [
        '☀️ SPF 50+ PA++++: Broad-spectrum daily UV protection shielding skin from intense solar exposure.',
        '✨ Helps Fade Visible Tan: Supports more even-looking skin with natural Kojic Acid, Fermented Rice Water, and Niacinamide.',
        '💧 Lightweight Gel: Breathable water-gel matrix comfortable for everyday wear under makeup or active outdoor days.',
        '🤍 Zero Visible White Cast: Specially designed to blend invisibly across Indian skin tones without chalky residue.',
      ],
      caption: 'Formulated for Indian Skin Tones',
      signature: 'Science-First. Skin-Safe. Water & Sweat Resistant.',
      metrics: [
        { value: 'SPF 50+', label: 'PA++++ Shield' },
        { value: '0%', label: 'Visible White Cast' },
        { value: 'Gel', label: 'Lightweight Texture' },
        { value: 'Active', label: 'Tan Defense' },
      ],
      image: '/products/editorial_sunscreen.jpg',
      imageAlt: 'FLOIS Advanced De-Tan Sunscreen Gel SPF 50+ — editorial product photography',
    };
  }

  // ── RootHerb Hair Growth Oil (default) ──────────────────────────────────────
  return {
    eyebrow: 'ROOTED IN AYURVEDA. REFINED BY SCIENCE.',
    headline: (
      <>
        Crafted for{' '}
        <span className="font-serif italic text-[#4B644C]">Transformation</span>
      </>
    ),
    pullQuote:
      '"Traditional botanical wisdom meets modern formulation science — in one daily hair ritual."',
    paragraphs: [
      'RootHerb™ brings together 18 Ayurvedic botanicals, cold-pressed oils and OleoKare® in a modern hair-care formula designed for consistent scalp and hair nourishment.',
      'At the heart of the formula is OleoKare® — a botanical active clinically studied at a 2.5% concentration for hair-growth and hair-care performance.',
      'Inspired by traditional Ayurvedic preparation methods and adapted for modern formulation standards, our cold-pressed oil base is selected to retain the natural characteristics of the botanical oils used in the formula.',
    ],
    caption: 'Powered by Clinically Studied OleoKare®',
    signature: 'Rooted in Ayurveda. Refined by Science.',
    metrics: [
      { value: '18', label: 'Ayurvedic Botanicals' },
      { value: '0%', label: 'Mineral Oil' },
      { value: 'OleoKare®', label: 'Clinically Studied Active' },
      { value: '5', label: 'Cold-Pressed Oils' },
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
