'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface MegaMenuProps {
  onClose: () => void;
}

export function MegaMenu({ onClose }: MegaMenuProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-[65px] left-0 right-0 w-screen bg-[#141C15] border-b border-[#304031] shadow-[0_35px_70px_rgba(0,0,0,0.85)] z-50 text-[#FAF9F5]"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1440px] mx-auto px-8 sm:px-12 lg:px-16 py-12">
        <div className="grid grid-cols-12 gap-10 items-stretch">
          
          {/* Columns 1-4: Flagship Products */}
          <div className="col-span-4 space-y-5 text-left border-r border-[#304031] pr-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-4 bg-[#C2CE94]" />
              <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
                FLAGSHIP BOTANICAL PRODUCTS
              </h4>
            </div>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/products/rootherb-hair-growth-oil"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    RootHerb Hair Growth Oil
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    18 Pure Ayurvedic Cold-Pressed Herbs • 100ml
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/products/neem-wood-comb"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    Handcrafted Neem Wood Comb
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    Medicinal Neem Wood • Anti-Static & Scalp Stimulating
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/products/advanced-de-tan-sunscreen-gel"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    Advanced De-Tan Sunscreen Gel
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    SPF 50+ PA++++ • Ultra-Lightweight & Zero White Cast
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columns 5-8: Shop By Scalp & Skin Concern */}
          <div className="col-span-4 space-y-5 text-left border-r border-[#304031] pr-8">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-4 bg-[#C2CE94]" />
              <h4 className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
                SHOP BY CONCERN
              </h4>
            </div>

            <ul className="space-y-4">
              <li>
                <Link
                  href="/collections/all?concern=hair-fall"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    Hair Thinning & Regrowth
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    RootFollicle Therapy & Density Revival
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/all?concern=dandruff"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    Dandruff & Scalp Relief
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    Scalp Clarifying Treatments & Flake Control
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  href="/collections/all?concern=tanning"
                  onClick={onClose}
                  className="group block p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C2CE94]/50 transition-all"
                >
                  <span className="font-serif text-lg text-white font-normal group-hover:text-[#C2CE94] transition-colors block">
                    Sun Tan & Hyperpigmentation
                  </span>
                  <span className="text-xs font-sans text-[#EAE3D2]/70 font-light block pt-0.5">
                    Solar Protection & Melanin Balance
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Columns 9-12: Featured Botanical Spotlight */}
          <div className="col-span-4 flex flex-col justify-between text-left p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 text-[11px] font-sans font-semibold uppercase tracking-[0.2em] text-[#C2CE94]">
                <Sparkles className="h-3.5 w-3.5 text-[#C2CE94]" />
                <span>Featured Botanical Formula</span>
              </div>
              <h3 className="font-serif text-2xl lg:text-3xl text-white font-normal leading-snug">
                RootHerb Botanical Hair Oil
              </h3>
              <p className="text-xs sm:text-sm text-[#EAE3D2]/80 font-sans leading-relaxed font-light">
                Clinically formulated with 18 pure herbs for accelerated hair growth, scalp nourishment, and natural shine.
              </p>
            </div>

            <div className="pt-6 flex items-center justify-between gap-3 border-t border-white/10">
              <span className="inline-flex items-center gap-1.5 text-xs font-sans text-[#C2CE94] font-medium">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Ayurvedic Cold-Pressed</span>
              </span>

              <Link
                href="/products/rootherb-hair-growth-oil"
                onClick={onClose}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF9F5] bg-[#4B644C] hover:bg-[#3D523E] px-5 py-2.5 rounded-full transition-all shadow-md"
              >
                <span>Shop Formula</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
