'use client';

import React from 'react';
import { Product } from '@/types/product';
import { LuxuryProductCard } from './LuxuryProductCard';

interface RecentlyViewedProps {
  fallbackProducts: Product[];
}

export function RecentlyViewed({ fallbackProducts }: RecentlyViewedProps) {
  return (
    <section className="relative w-full bg-[#FFFFFF] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 text-left space-y-8">
        
        <div className="space-y-1">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#ACB041] block">
            RECOMMENDED FOR YOU
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#111111]">
            Complete Your Daily Ritual
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {fallbackProducts.slice(0, 3).map((product) => (
            <LuxuryProductCard key={product.id} product={product} />
          ))}
        </div>

      </div>
    </section>
  );
}
