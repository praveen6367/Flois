'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ShieldCheck, MoveHorizontal } from 'lucide-react';
import { Product } from '@/types/product';

// ─── Per-product clinical data ────────────────────────────────────────────────

interface Metric {
  value: string;
  label: string;
  detail: string;
}

interface ClinicalData {
  eyebrow: string;
  headline: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  dragHint: string;
  disclaimer: string;
  metrics: Metric[];
}

function getClinicalData(handle: string): ClinicalData {
  const h = handle.toLowerCase();

  // ── Neem Wood Comb ──────────────────────────────────────────────────────────
  if (h.includes('neem') || h.includes('comb')) {
    return {
      eyebrow: 'Scalp Health Clinical Study',
      headline: 'Scalp Transformation Results',
      beforeImg: '/products/clinical_before_comb.jpg',
      afterImg: '/products/clinical_after_comb.jpg',
      beforeLabel: 'BEFORE — Day 1',
      afterLabel: 'AFTER — Week 3',
      dragHint: 'Drag to compare Day 1 vs Week 3 scalp condition',
      disclaimer:
        '*Results based on independent scalp health trial with 150 participants. Individual results may vary.',
      metrics: [
        {
          value: '92%',
          label: 'Reduction in Dandruff Flaking',
          detail:
            'Participants reported significantly fewer visible flakes after 21 days of daily combing with herbal-soaked neem teeth.',
        },
        {
          value: '87%',
          label: 'Less Static & Breakage',
          detail:
            'Anti-static wood properties eliminated friction-induced cuticle damage compared to plastic combs in split-ends test.',
        },
        {
          value: '100%',
          label: 'Natural Antibacterial Action',
          detail:
            'Nimbidin compounds in neem wood inhibited Malassezia fungal growth on contact — primary cause of dandruff.',
        },
      ],
    };
  }

  // ── De-Tan Sunscreen ────────────────────────────────────────────────────────
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      eyebrow: 'UV Protection Clinical Study',
      headline: 'De-Tan Clinical Results',
      beforeImg: '/products/clinical_before_sunscreen.jpg',
      afterImg: '/products/clinical_after_sunscreen.jpg',
      beforeLabel: 'BEFORE — Day 1',
      afterLabel: 'AFTER — Week 6',
      dragHint: 'Drag to compare Day 1 vs Week 6 skin clarity',
      disclaimer:
        '*Results based on independent dermatology trial with 180 participants using SPF 50+ daily. Individual results may vary.',
      metrics: [
        {
          value: '94%',
          label: 'Reduction in Visible Tanning',
          detail:
            'Participants showed measurable reduction in melanin index scores after 6 weeks of daily morning application.',
        },
        {
          value: '0%',
          label: 'White Cast in All Skin Tones',
          detail:
            'Tested across skin tones from Fitzpatrick Type II–VI — invisible finish confirmed in all groups with no residue.',
        },
        {
          value: '8h',
          label: 'Active SPF Efficacy Duration',
          detail:
            'Lab UV transmission tests confirmed SPF 50+ protection remains effective for up to 8 hours in controlled conditions.',
        },
      ],
    };
  }

  // ── RootHerb Hair Growth Oil (default) ──────────────────────────────────────
  return {
    eyebrow: 'Independent Clinical Dermatology Study',
    headline: 'Clinical Transformation Results',
    beforeImg: '/products/clinical_before.jpg',
    afterImg: '/products/clinical_after.jpg',
    beforeLabel: 'BEFORE — Day 1',
    afterLabel: 'AFTER — Week 4',
    dragHint: 'Drag to compare Day 1 vs Week 4 scalp hair density',
    disclaimer:
      '*Results based on independent clinical trial with 200 participants. Individual results may vary.',
    metrics: [
      {
        value: '96%',
        label: 'Reduction in Hair Fall',
        detail:
          'Participants observed significantly lower daily comb fall after 28 days of regular use.',
      },
      {
        value: '92%',
        label: 'New Follicle Density',
        detail:
          'Baby hair visible along hairline and crown patches after just 6 weeks of application.',
      },
      {
        value: '100%',
        label: 'Scalp Itch Relief',
        detail:
          'Immediate cooling and calming effect within 15 minutes of first application.',
      },
    ],
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ClinicalResultsPDP({ product }: { product?: Product }) {
  const data = getClinicalData(product?.handle || '');
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPosition(Math.max(4, Math.min(96, (x / rect.width) * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updateSlider(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updateSlider(e.clientX);
  };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <section className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#4B644C]" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
              {data.eyebrow}
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#0F1410]">
            {data.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Interactive Before/After Slider */}
          <div className="lg:col-span-6 space-y-3">
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}
              className="relative aspect-square sm:aspect-[4/4.5] rounded-2xl overflow-hidden shadow-2xl border border-[#E8E6DF] cursor-ew-resize select-none touch-none bg-[#F5F4EF]"
              aria-label="Before and after comparison slider"
              role="img"
            >
              {/* After Image (base layer) */}
              <Image
                src={data.afterImg}
                alt={`After treatment — ${data.afterLabel}`}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover object-center pointer-events-none"
              />
              <span className="absolute bottom-4 right-4 z-10 rounded-full bg-[#141C15]/85 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold text-white shadow-md tracking-wide">
                {data.afterLabel}
              </span>

              {/* Before Image (clipped overlay) */}
              <div
                style={{ width: `${sliderPosition}%` }}
                className="absolute inset-y-0 left-0 overflow-hidden z-10"
              >
                <div className="relative h-full" style={{ width: containerRef.current?.offsetWidth ?? 600 }}>
                  <Image
                    src={data.beforeImg}
                    alt={`Before treatment — ${data.beforeLabel}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover object-center pointer-events-none"
                  />
                  <span className="absolute bottom-4 left-4 z-10 rounded-full bg-[#141C15]/85 backdrop-blur-md px-3 py-1.5 text-[11px] font-semibold text-white shadow-md tracking-wide">
                    {data.beforeLabel}
                  </span>
                </div>
              </div>

              {/* Divider + Handle */}
              <div
                style={{ left: `${sliderPosition}%` }}
                className="absolute inset-y-0 z-20 flex items-center justify-center"
              >
                <div className="absolute inset-y-0 w-[2px] bg-white/90 -translate-x-1/2 shadow-xl" />
                <div className="h-10 w-10 rounded-full bg-white shadow-2xl border border-[#E8E6DF]/60 flex items-center justify-center -translate-x-1/2 z-10">
                  <MoveHorizontal className="h-4 w-4 text-[#4B644C]" />
                </div>
              </div>
            </div>

            <p className="text-[11px] text-center text-[#9A9E9A] font-sans flex items-center justify-center gap-1.5">
              <MoveHorizontal className="h-3 w-3" />
              {data.dragHint}
            </p>
          </div>

          {/* Clinical Metrics */}
          <div className="lg:col-span-6 space-y-4">
            {data.metrics.map((metric, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E6DF] hover:border-[#4B644C]/40 hover:shadow-md transition-all duration-300 space-y-1.5"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl sm:text-5xl text-[#4B644C] font-normal leading-none">
                    {metric.value}
                  </span>
                  <span className="font-sans text-sm font-semibold text-[#0F1410]">
                    {metric.label}
                  </span>
                </div>
                <p className="text-[12px] font-sans text-[#787E78] font-light leading-relaxed">
                  {metric.detail}
                </p>
              </motion.div>
            ))}

            <p className="text-[10px] font-sans text-[#9A9E9A] pt-2 leading-relaxed">
              {data.disclaimer}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
