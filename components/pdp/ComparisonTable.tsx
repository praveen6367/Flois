'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Row {
  metric: string;
  icon: string;
  flois: string;
  ordinary: string;
}

const HAIR_OIL_ROWS: Row[] = [
  { metric: 'Base Oil',     icon: '🌿', flois: '100% Cold-Pressed Sesame & Coconut',  ordinary: 'Mineral Oil (Paraffinum Liquidum)' },
  { metric: 'Active Herbs', icon: '🌱', flois: '18 Ayurvedic Botanicals',              ordinary: '1–2% Synthetic Extracts' },
  { metric: 'Fragrance',    icon: '🌸', flois: '0% Artificial Fragrance or Dyes',      ordinary: 'Heavy Synthetic Parfum & Dyes' },
  { metric: 'Silicones',    icon: '✨', flois: 'Zero Silicones — Clean Formula',        ordinary: 'Dimethicone & Petroleum Derivatives' },
  { metric: 'Paraben Free', icon: '🛡️', flois: 'Completely Paraben-Free',              ordinary: 'Often Contains Parabens' },
  { metric: 'Cruelty Free', icon: '🐰', flois: 'Certified Cruelty-Free & Vegan',       ordinary: 'Not Certified' },
];

const SUNSCREEN_ROWS: Row[] = [
  { metric: 'SPF Rating',      icon: '☀️', flois: 'SPF 50+ PA++++ Full Spectrum',        ordinary: 'SPF 30 or Below, PA++' },
  { metric: 'White Cast',      icon: '🎨', flois: 'Zero White Cast — Invisible Finish',  ordinary: 'Visible White Cast on Skin' },
  { metric: 'Texture',         icon: '💧', flois: 'Ultra-Lightweight Gel Formula',        ordinary: 'Heavy Cream / Greasy Finish' },
  { metric: 'Active Agents',   icon: '🌿', flois: 'Rice Water, Sea Buckthorn, Kojic Acid', ordinary: 'Chemical UV Filters Only' },
  { metric: 'De-Tanning',      icon: '✨', flois: 'Active De-Tan & Brightening Formula', ordinary: 'Sun Protection Only — No De-Tan' },
  { metric: 'Sweat Resistant', icon: '🏃', flois: 'Water & Sweat Resistant',             ordinary: 'Washes Off Easily' },
];

const NEEM_COMB_ROWS: Row[] = [
  { metric: 'Material',        icon: '🌿', flois: 'Natural Seasoned Neem Wood',           ordinary: 'Plastic / Mixed Synthetic' },
  { metric: 'Anti-Static',     icon: '⚡', flois: 'Naturally Low-Static Wood',            ordinary: 'Generates Harmful Static' },
  { metric: 'Scalp Contact',   icon: '🌱', flois: 'Smooth Hand-Polished Rounded Teeth',   ordinary: 'Sharp Plastic Mold Seams' },
  { metric: 'Hair Breakage',   icon: '💪', flois: 'Seamless Glide — Minimal Snagging',    ordinary: 'Sharp Edges Cause Breakage' },
  { metric: 'Herbal Infusion', icon: '✨', flois: '45-Day 17-Herb Botanical Conditioning', ordinary: 'Untreated Synthetic Material' },
  { metric: 'Eco-Friendly',    icon: '♻️', flois: 'Naturally Biodegradable Natural Wood',  ordinary: 'Non-Biodegradable Plastic' },
];

function getRows(handle: string): { rows: Row[]; title: string; floisLabel: string; ordinaryLabel: string } {
  const h = handle.toLowerCase();
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf') || h.includes('de-tan')) {
    return { rows: SUNSCREEN_ROWS, title: 'FLOIS vs Ordinary Sunscreens', floisLabel: 'FLOIS De-Tan Gel', ordinaryLabel: 'Ordinary Sunscreens' };
  }
  if (h.includes('neem') || h.includes('comb')) {
    return { rows: NEEM_COMB_ROWS, title: 'FLOIS Neem Comb vs Plastic Combs', floisLabel: 'FLOIS Neem Comb', ordinaryLabel: 'Plastic Combs' };
  }
  return { rows: HAIR_OIL_ROWS, title: 'FLOIS vs Ordinary Hair Oils', floisLabel: 'FLOIS Formula', ordinaryLabel: 'Ordinary Oils' };
}

interface ComparisonTableProps {
  productHandle?: string;
}

export function ComparisonTable({ productHandle = 'rootherb-hair-growth-oil' }: ComparisonTableProps) {
  const { rows, title, floisLabel, ordinaryLabel } = getRows(productHandle);

  return (
    <section className="w-full bg-white py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center space-y-3 mb-12 sm:mb-14"
        >
          <span className="inline-block text-[10px] font-sans font-bold uppercase tracking-[0.28em] text-[#8C9B3E]">
            Formula Transparency
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-[3.2rem] font-normal tracking-tight text-[#111111] leading-[1.07]">
            {title}
          </h2>
          <p className="text-[15px] font-sans text-[#555555] font-light max-w-md mx-auto leading-relaxed">
            We believe in complete transparency. Here is exactly how our formula compares.
          </p>
        </motion.div>

        {/* ── Table ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="overflow-x-auto"
        >
          <div className="min-w-[580px]">

            {/* Column Headers */}
            <div className="grid grid-cols-[1.2fr_1.7fr_1.7fr] mb-3">
              <div className="px-4 pb-2" />

              {/* FLOIS header pill */}
              <div className="px-3 pb-2 flex justify-center">
                <div className="flex items-center gap-2 bg-[#8C9B3E] text-white px-5 py-2.5 rounded-full shadow-[0_4px_20px_rgba(140,155,62,0.35)]">
                  <Check className="h-4 w-4 stroke-[3] shrink-0" />
                  <div>
                    <p className="text-[11px] font-sans font-bold uppercase tracking-widest leading-none">{floisLabel}</p>
                    <p className="text-[9px] font-sans font-light opacity-80 mt-0.5">Pure · Botanical · Verified</p>
                  </div>
                </div>
              </div>

              {/* Ordinary header pill */}
              <div className="px-3 pb-2 flex justify-center">
                <div className="flex items-center gap-2 bg-[#F2F2F2] border border-[#E0E0E0] text-[#888888] px-5 py-2.5 rounded-full">
                  <X className="h-4 w-4 stroke-[3] shrink-0" />
                  <div>
                    <p className="text-[11px] font-sans font-bold uppercase tracking-widest leading-none">{ordinaryLabel}</p>
                    <p className="text-[9px] font-sans font-light opacity-70 mt-0.5">Synthetic · Chemical</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Rows */}
            <div className="rounded-[20px] overflow-hidden border border-[#E8E6DF] shadow-[0_8px_40px_rgba(0,0,0,0.07)]">
              {rows.map((row, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.07 }}
                  className={`grid grid-cols-[1.2fr_1.7fr_1.7fr] group transition-colors duration-200 hover:bg-[#FAFAF7] ${
                    idx !== rows.length - 1 ? 'border-b border-[#EEECEA]' : ''
                  }`}
                >
                  {/* Metric label */}
                  <div className="flex items-center gap-2.5 px-5 py-4 sm:py-5">
                    <span className="text-xl leading-none">{row.icon}</span>
                    <span className="text-[13px] font-sans font-semibold text-[#333333]">
                      {row.metric}
                    </span>
                  </div>

                  {/* FLOIS value */}
                  <div className="px-5 py-4 sm:py-5 bg-[#F7FAF0] group-hover:bg-[#F2F7E6] transition-colors border-l border-r border-[#E4EAC8]">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#8C9B3E]">
                        <Check className="h-3 w-3 text-white stroke-[3]" />
                      </span>
                      <span className="text-[13px] sm:text-[14px] font-sans font-semibold text-[#3A5C1A] leading-snug">
                        {row.flois}
                      </span>
                    </div>
                  </div>

                  {/* Ordinary value */}
                  <div className="px-5 py-4 sm:py-5">
                    <div className="flex items-start gap-2.5">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F5F0F0] border border-[#E8DEDE]">
                        <X className="h-3 w-3 text-[#C0A0A0] stroke-[3]" />
                      </span>
                      <span className="text-[13px] sm:text-[14px] font-sans text-[#AAAAAA] leading-snug">
                        {row.ordinary}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom verdict */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-5 grid grid-cols-[1.2fr_1.7fr_1.7fr]"
            >
              <div />
              <div className="px-3 flex justify-center">
                <div className="inline-flex items-center gap-2 bg-[#EDF3D6] border border-[#C8D88A] px-5 py-2 rounded-full">
                  <span className="text-[11px] font-sans font-bold text-[#4B7A1A] uppercase tracking-wider">
                    ✅ The Clear Choice — Pure Botanicals
                  </span>
                </div>
              </div>
              <div />
            </motion.div>

          </div>
        </motion.div>

        {/* Footnote */}
        <p className="mt-8 text-center text-[11px] font-sans text-[#BBBBBB]">
          * Comparisons based on publicly available ingredient lists. FLOIS formulations independently verified.
        </p>

      </div>
    </section>
  );
}
