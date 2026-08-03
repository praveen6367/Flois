'use client';

import React from 'react';
import { Check, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Row {
  metric: string;
  flois: string;
  ordinary: string;
}

const ROWS: Row[] = [
  { metric: 'Base Oil', flois: '100% Cold-Pressed Sesame & Coconut', ordinary: 'Mineral Oil (Paraffinum Liquidum)' },
  { metric: 'Active Herbs', flois: '18 Ayurvedic Botanicals', ordinary: '1–2% Synthetic Extracts' },
  { metric: 'Fragrance', flois: '0% Artificial Fragrance or Dyes', ordinary: 'Heavy Synthetic Parfum & Dyes' },
  { metric: 'Silicones', flois: 'Zero Silicones — Clean Formula', ordinary: 'Dimethicone & Petroleum Derivatives' },
  { metric: 'Paraben Free', flois: 'Completely Paraben-Free', ordinary: 'Often Contains Parabens' },
  { metric: 'Cruelty Free', flois: 'Certified Cruelty-Free & Vegan', ordinary: 'Not Certified' },
];

export function ComparisonTable() {
  return (
    <section className="relative w-full bg-[#FAFAF8] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
            Formula Transparency
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#0F1410]">
            FLOIS vs Ordinary Hair Oils
          </h2>
          <p className="text-sm font-sans text-[#787E78] font-light">
            We believe in complete transparency. Here is exactly how our formula compares.
          </p>
        </div>

        {/* Table */}
        <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-[#E8E6DF] shadow-xl bg-white">
          <table className="w-full text-left border-collapse min-w-[560px]" role="table">
            <thead>
              <tr className="border-b border-[#E8E6DF]">
                <th className="py-4 px-5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#9A9E9A] w-[30%]">
                  What Matters
                </th>
                <th className="py-4 px-5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#4B644C] bg-[#EAF3EA]/60 w-[35%]">
                  FLOIS Formula ✓
                </th>
                <th className="py-4 px-5 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#9A9E9A] w-[35%]">
                  Ordinary Oils ✗
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, idx) => (
                <motion.tr
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.06 }}
                  className="border-b border-[#F0EDE6] hover:bg-[#FAFAF8] transition-colors group"
                >
                  <td className="py-4 px-5 text-[12px] font-sans font-semibold text-[#4A4E4A]">
                    {row.metric}
                  </td>
                  <td className="py-4 px-5 bg-[#EAF3EA]/40 group-hover:bg-[#EAF3EA]/70 transition-colors">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-[#2D5A2E] shrink-0 mt-0.5" />
                      <span className="text-[12px] font-sans text-[#2D5A2E] font-medium leading-snug">
                        {row.flois}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-start gap-2">
                      <X className="h-4 w-4 text-[#9A9E9A] shrink-0 mt-0.5" />
                      <span className="text-[12px] font-sans text-[#9A9E9A] leading-snug">
                        {row.ordinary}
                      </span>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm font-sans text-[#787E78] mb-4">
            The choice is clear. Make the switch to pure botanical care.
          </p>
        </div>

      </div>
    </section>
  );
}
