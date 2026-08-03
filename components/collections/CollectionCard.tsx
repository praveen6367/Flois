'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Collection } from '@/types/collection';

interface CollectionCardProps {
  collection: Collection;
  isActive?: boolean;
  overrideHref?: string; // direct link override (e.g. to a product page)
}

export function getCategoryPlaceholder(handle: string = '', title: string = ''): string {
  const h = handle.toLowerCase();
  const t = title.toLowerCase();

  if (h.includes('comb') || t.includes('comb')) return '/placeholders/comb.svg';
  if (h.includes('shampoo') || t.includes('shampoo')) return '/placeholders/shampoo.svg';
  if (h.includes('sun') || h.includes('tan') || t.includes('sun') || t.includes('tan')) return '/placeholders/sunscreen.svg';
  if (h.includes('oil') || t.includes('oil') || h.includes('hair') || t.includes('hair')) return '/placeholders/hair-oil.svg';
  if (h.includes('body') || t.includes('body')) return '/placeholders/body-care.svg';
  if (h.includes('skin') || t.includes('skin') || h.includes('face') || t.includes('face')) return '/placeholders/skin-care.svg';

  return '/placeholders/botanical-placeholder.svg';
}

export function CollectionCard({ collection, isActive = false, overrideHref }: CollectionCardProps) {
  const categoryFallback = getCategoryPlaceholder(collection.handle, collection.title);
  const initialSrc = collection.image?.url || categoryFallback;
  const [imgSrc, setImgSrc] = useState<string>(initialSrc);
  const href = overrideHref || `/collections/${collection.handle}`;

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 focus:outline-none snap-center shrink-0"
      aria-label={`Explore ${collection.title} Collection`}
    >
      {/* Circular Image Frame - Premium White Canvas Styling */}
      <div
        className={`relative flex items-center justify-center rounded-full p-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isActive
            ? 'border-2 border-[#4B644C] shadow-[0_0_12px_rgba(75,100,76,0.25)]'
            : 'border border-[#E8E6DF] bg-white group-hover:border-[#4B644C] group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(18,20,18,0.08)]'
        }`}
      >
        {/* Inner Circle Image Container */}
        <div className="relative overflow-hidden rounded-full bg-[#FAF9F5] w-[58px] h-[58px] sm:w-[64px] sm:h-[64px] lg:w-[72px] lg:h-[72px]">
          <Image
            src={imgSrc}
            alt={collection.image?.altText || collection.title}
            fill
            sizes="(max-width: 640px) 58px, (max-width: 1024px) 64px, 72px"
            onError={() => setImgSrc(categoryFallback)}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </div>
      </div>

      {/* Collection Title */}
      <div className="flex flex-col items-center">
        <span
          className={`text-[11px] sm:text-xs font-sans tracking-tight text-center truncate max-w-[85px] sm:max-w-[100px] transition-colors duration-300 ${
            isActive
              ? 'font-semibold text-[#4B644C]'
              : 'font-medium text-[#121412] group-hover:text-[#4B644C]'
          }`}
          title={collection.title}
        >
          {collection.title}
        </span>

        {/* Active Indicator Dot */}
        {isActive && (
          <span className="mt-0.5 h-1 w-1 rounded-full bg-[#4B644C]" />
        )}
      </div>
    </Link>
  );
}
