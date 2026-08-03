'use client';

import React from 'react';
import { ClinicalResultMetaobject } from '@/types/metaobject';
import { ComparisonSlider } from './ComparisonSlider';
import { VerifiedBadge } from './VerifiedBadge';
import { Star } from 'lucide-react';

interface TestimonialCardProps {
  result: ClinicalResultMetaobject;
  index?: number;
  isFeatured?: boolean;
}

export function TestimonialCard({ result, index = 0, isFeatured = false }: TestimonialCardProps) {
  // Curated Luxury Botanical Tint Colors for visual rhythm
  const cardColorStyles = [
    'bg-[#F6F4ED] border-[#E2DDD0]', // Warm Alabaster
    'bg-[#F0F5F0] border-[#D5E0D5]', // Mint Sage Tint
    'bg-[#F4F1EA] border-[#E3DEC3]', // Linen Warm Stone
    'bg-[#F7F3E9] border-[#E5DEC9]', // Soft Sand Beige
    'bg-[#F3F6F3] border-[#D8E2D8]'  // Soft Olive Tint
  ];

  const cardStyle = cardColorStyles[index % cardColorStyles.length];

  return (
    <div
      className={`group flex flex-col justify-between rounded-xl border p-6 sm:p-7 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 overflow-hidden shadow-sm ${cardStyle} ${
        isFeatured ? 'lg:p-8' : ''
      }`}
    >
      {/* Top Interactive Comparison Slider */}
      <div className="w-full mb-5">
        <ComparisonSlider
          beforeImage={result.beforeImage}
          afterImage={result.afterImage}
          altText={`Transformation for ${result.customerName}`}
          aspectRatio={isFeatured ? 'wide' : 'square'}
        />
      </div>

      {/* Internal Content Info */}
      <div className="space-y-3 text-left">
        {/* Category & Verified Badge Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#4B644C]">
            {result.category}
          </span>
          {result.isVerified && <VerifiedBadge />}
        </div>

        {/* Customer Name & Age */}
        <div className="space-y-0.5">
          <h3 className="font-serif text-xl sm:text-2xl text-[#121412] font-normal leading-snug">
            {result.customerName}
          </h3>
          <p className="text-xs font-sans text-[#787E78] font-normal">
            Age {result.age} • {result.durationMonths ? `${result.durationMonths} Months Consistent Use` : 'Verified Transformation'}
          </p>
        </div>

        {/* 5-Star Rating */}
        <div className="flex items-center gap-1 text-[#C8A96E] pt-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-[#C8A96E] text-[#C8A96E]" />
          ))}
          <span className="text-xs font-sans font-medium text-[#121412] ml-1.5">
            5.0 / 5.0 Rating
          </span>
        </div>

        {/* Short Testimonial Quote */}
        <p className="text-xs sm:text-sm text-[#4A4E4A] font-sans leading-relaxed italic line-clamp-2 pt-1 font-light">
          "{result.testimonial}"
        </p>
      </div>
    </div>
  );
}
