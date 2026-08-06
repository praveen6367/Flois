'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Heart, Sun, Feather, Check } from 'lucide-react';

interface CollectionNavProps {
  activeHandle?: string;
  totalProductCount?: number;
}

const CATEGORIES = [
  {
    id: 'all',
    title: 'All Rituals',
    handle: 'all',
    icon: Sparkles,
    color: '#ACB041',
  },
  {
    id: 'hair-growth',
    title: 'Hair Growth Oils',
    handle: 'hair-growth-oils',
    icon: Shield,
    color: '#6A9739',
  },
  {
    id: 'sun-protection',
    title: 'Sun Protection',
    handle: 'sun-protection',
    icon: Sun,
    color: '#C8A96E',
  },
  {
    id: 'accessories',
    title: 'Neem Accessories',
    handle: 'accessories',
    icon: Feather,
    color: '#ACB041',
  },
];

export function CollectionNav({ activeHandle = 'all', totalProductCount = 3 }: CollectionNavProps) {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="concerns" className="relative w-full bg-[#FFFFFF] py-12 sm:py-16 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-center space-y-8">
        
        <div className="space-y-1">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#ACB041] block">
            SHOP BY RITUAL &amp; CONCERN
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#111111]">
            Targeted Botanical Care
          </h2>
        </div>

        {/* Circular Botanical Icon Navigation */}
        <div className="flex items-center justify-center flex-wrap gap-6 sm:gap-10">
          {CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = activeHandle === cat.handle || (activeHandle === '' && cat.handle === 'all');

            return (
              <Link
                key={cat.id}
                href={cat.handle === 'all' ? '/collections/all' : `/collections/${cat.handle}`}
                className="group flex flex-col items-center gap-3 transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Clean Circular Badge Container */}
                <div
                  className={`h-16 w-16 sm:h-20 sm:w-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-[#ACB041] text-[#111111] shadow-lg ring-4 ring-[#ACB041]/20 font-semibold'
                      : 'bg-[#F8F6F3] text-[#ACB041] border border-[#E8E6DF] group-hover:bg-[#ACB041] group-hover:text-[#111111] group-hover:shadow-md'
                  }`}
                >
                  <Icon className="h-7 w-7 sm:h-8 sm:w-8 stroke-[1.5]" />
                </div>

                <div className="text-center space-y-0.5">
                  <span
                    className={`text-xs sm:text-sm font-sans font-medium transition-colors ${
                      isActive ? 'text-[#ACB041] font-semibold' : 'text-[#111111] group-hover:text-[#ACB041]'
                    }`}
                  >
                    {cat.title}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="h-[1.5px] w-6 bg-[#ACB041] mx-auto rounded-full"
                    />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
