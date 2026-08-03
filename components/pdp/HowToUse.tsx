'use client';

import React from 'react';
import Image from 'next/image';
import { Clock, Sun, Moon, Calendar, Droplets } from 'lucide-react';
import { Product } from '@/types/product';

// ─── Per-product steps ────────────────────────────────────────────────────────

interface StepData {
  step: string;
  title: string;
  desc: string;
}

interface HowToData {
  eyebrow: string;
  headline: string;
  bannerImage: string;
  bannerAlt: string;
  bannerLabel: string;
  bannerSubhead: string;
  steps: StepData[];
  routine: { icon: React.ReactNode; label: string }[];
}

function getHowToData(handle: string): HowToData {
  const h = handle.toLowerCase();

  if (h.includes('neem') || h.includes('comb')) {
    return {
      eyebrow: 'DAILY SCALP RITUAL',
      headline: 'How To Use For Best Results',
      bannerImage: '/products/editorial_neem_comb.jpg',
      bannerAlt: 'FLOIS Neem Wood Comb scalp massage ritual',
      bannerLabel: 'NEEM WOOD SCALP RITUAL',
      bannerSubhead: 'Comb. Stimulate. Nourish.',
      steps: [
        {
          step: '01',
          title: 'Detangle Gently',
          desc: 'Starting from the tips, work upward in slow strokes to detangle without pulling or breakage. Use wide teeth for thick/curly hair.',
        },
        {
          step: '02',
          title: 'Scalp Massage',
          desc: 'Once detangled, make 5-minute passes from nape to crown applying light pressure. This stimulates scalp papilla micro-circulation.',
        },
        {
          step: '03',
          title: 'Oil Distribution',
          desc: 'Apply 2-3 drops of RootHerb Oil to roots, then comb through to evenly distribute natural scalp oils to every strand.',
        },
      ],
      routine: [
        { icon: <Sun className="h-4 w-4 text-[#4B644C]" />, label: 'Morning: Scalp Stimulation' },
        { icon: <Moon className="h-4 w-4 text-[#4B644C]" />, label: 'Night: Oil Distribution' },
        { icon: <Calendar className="h-4 w-4 text-[#4B644C]" />, label: 'Recommended: Daily' },
      ],
    };
  }

  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      eyebrow: 'DAILY SUN PROTECTION RITUAL',
      headline: 'How To Apply For Full Protection',
      bannerImage: '/products/editorial_sunscreen.jpg',
      bannerAlt: 'FLOIS Sunscreen gel application ritual',
      bannerLabel: 'SPF 50+ APPLICATION RITUAL',
      bannerSubhead: 'Apply. Absorb. Protect.',
      steps: [
        {
          step: '01',
          title: 'Cleanse & Tone',
          desc: 'Apply on clean, dry skin after your regular morning cleanser and toner. The gel bonds better to clean skin for maximum SPF efficacy.',
        },
        {
          step: '02',
          title: 'Apply Generously',
          desc: 'Pump a pea-sized amount (about 1/4 tsp for face) and spread evenly across face and neck using upward strokes. Do not rub — pat gently.',
        },
        {
          step: '03',
          title: 'Reapply Every 2 Hours',
          desc: 'For outdoor exposure, reapply every 2 hours. The lightweight gel formula reapplies cleanly even over makeup without pilling.',
        },
      ],
      routine: [
        { icon: <Sun className="h-4 w-4 text-[#4B644C]" />, label: 'Morning: 15 mins before sun' },
        { icon: <Droplets className="h-4 w-4 text-[#4B644C]" />, label: 'Reapply: Every 2 hours outdoors' },
        { icon: <Calendar className="h-4 w-4 text-[#4B644C]" />, label: 'Recommended: Daily use' },
      ],
    };
  }

  // RootHerb Hair Oil (default)
  return {
    eyebrow: 'SIMPLE DAILY RITUAL',
    headline: 'How To Use For Best Results',
    bannerImage: '/products/editorial_rootherb.jpg',
    bannerAlt: 'FLOIS RootHerb botanical hair oil application ritual',
    bannerLabel: 'AYURVEDIC SCALP RITUAL',
    bannerSubhead: 'Apply. Massage. Transform.',
    steps: [
      {
        step: '01',
        title: 'Dispense & Warm',
        desc: 'Pump 4-6 drops of oil onto palms. Gently rub palms together to warm the botanical actives and release the herb aroma.',
      },
      {
        step: '02',
        title: 'Root Scalp Massage',
        desc: 'Using fingertips or Handcrafted Neem Wood Comb, massage gently into scalp roots in circular motions for 5-7 minutes.',
      },
      {
        step: '03',
        title: 'Botanical Absorption',
        desc: 'Leave on for a minimum of 45 minutes or overnight before rinsing with mild sulfate-free cleanser for best penetration.',
      },
    ],
    routine: [
      { icon: <Sun className="h-4 w-4 text-[#4B644C]" />, label: 'Morning: Scalp Protection' },
      { icon: <Moon className="h-4 w-4 text-[#4B644C]" />, label: 'Night: Deep Hair Repair' },
      { icon: <Calendar className="h-4 w-4 text-[#4B644C]" />, label: 'Recommended: 3-4 Times Weekly' },
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function HowToUse({ product }: { product: Product }) {
  const data = getHowToData(product?.handle || '');

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 overflow-hidden border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">

        {/* Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
              {data.eyebrow}
            </span>
            <Clock className="h-4 w-4 text-[#4B644C]" />
            <span className="h-[1px] w-6 bg-[#4B644C]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {data.headline}
          </h2>
        </div>

        {/* Banner Image */}
        <div className="relative w-full aspect-[16/6] rounded-3xl overflow-hidden shadow-2xl border border-[#E8E6DF] mb-12">
          <Image
            src={data.bannerImage}
            alt={data.bannerAlt}
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#141C15]/60 to-transparent flex items-center px-10 sm:px-16">
            <div className="space-y-2">
              <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
                {data.bannerLabel}
              </span>
              <p className="font-serif text-3xl sm:text-5xl text-white font-normal leading-tight max-w-[400px]">
                {data.bannerSubhead}
              </p>
            </div>
          </div>
        </div>

        {/* 3-Step Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {data.steps.map((item) => (
            <div key={item.step} className="p-8 rounded-3xl bg-white border border-[#E8E6DF] space-y-4 relative shadow-md">
              <span className="font-serif text-5xl text-[#C2CE94] font-normal block">{item.step}</span>
              <h3 className="font-serif text-2xl text-[#121412] font-normal">{item.title}</h3>
              <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Routine Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-[#E8E6DF] flex flex-wrap items-center justify-around gap-6 text-center text-xs font-sans">
          {data.routine.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-[#121412]">
              {r.icon}
              <span>{r.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
