'use client';

import React from 'react';

interface ProductBadgeProps {
  tags?: string[];
  productTitle?: string;
  className?: string;
}

export function ProductBadge({ tags = [], productTitle = '', className = '' }: ProductBadgeProps) {
  // Extract primary badge text from Shopify tags
  let badgeText: string | null = null;
  const tagLowerList = tags.map((t) => t.toLowerCase());

  if (tagLowerList.some((t) => t.includes('best seller') || t.includes('bestseller'))) {
    badgeText = 'BEST SELLER';
  } else if (tagLowerList.some((t) => t.includes('new') || t.includes('latest'))) {
    badgeText = 'NEW FORMULA';
  } else if (tagLowerList.some((t) => t.includes('award') || t.includes('winner'))) {
    badgeText = 'AWARD WINNER';
  } else if (tagLowerList.some((t) => t.includes('clinical') || t.includes('tested'))) {
    badgeText = 'CLINICALLY TESTED';
  } else if (tagLowerList.some((t) => t.includes('natural') || t.includes('organic'))) {
    badgeText = '100% BOTANICAL';
  } else if (productTitle.toLowerCase().includes('oil')) {
    badgeText = 'FLAGSHIP ESSENTIAL';
  } else if (productTitle.toLowerCase().includes('sunscreen') || productTitle.toLowerCase().includes('gel')) {
    badgeText = 'CLINICALLY TESTED';
  } else if (productTitle.toLowerCase().includes('comb')) {
    badgeText = 'COMPLIMENTARY TOOL';
  } else {
    badgeText = 'SIGNATURE FORMULA';
  }

  if (!badgeText) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded bg-[#141C15] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#FAF9F5] shadow-sm backdrop-blur-md ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-[#C2CE94]" />
      <span>{badgeText}</span>
    </div>
  );
}
