'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ShieldCheck } from 'lucide-react';
import { CustomerReviewsGridSlider, REAL_CUSTOMER_REVIEWS } from '@/components/testimonials/CustomerReviewsGridSlider';
import { WriteReviewForm } from '@/components/pdp/WriteReviewForm';
import { CustomerPhotoReview } from '@/components/testimonials/CustomerPhotoReviewCard';
import { Product } from '@/types/product';

const RATING_BREAKDOWN = [
  { stars: 5, percent: 85 },
  { stars: 4, percent: 10 },
  { stars: 3, percent: 3 },
  { stars: 2, percent: 1 },
  { stars: 1, percent: 1 },
];

interface ProductReviewsProps {
  product?: Product;
  productHandle?: string;
}

export function ProductReviews({ product, productHandle }: ProductReviewsProps) {
  const avgRating = 4.9;
  const currentHandle = product?.handle || productHandle || 'rootherb-hair-growth-oil';
  const titleName = product?.title || 'This Product';

  const verifiedReviewsCount = REAL_CUSTOMER_REVIEWS.filter((r) => {
    const h = (r.productHandle || '').toLowerCase();
    const target = currentHandle.toLowerCase();
    if (target.includes('rootherb') || target.includes('hair-growth-oil') || target.includes('oil')) {
      return h.includes('rootherb') || h.includes('hair') || h.includes('oil');
    }
    if (target.includes('sunscreen') || target.includes('de-tan') || target.includes('spf')) {
      return h.includes('sunscreen') || h.includes('de-tan') || h.includes('spf');
    }
    if (target.includes('comb') || target.includes('neem')) {
      return h.includes('comb') || h.includes('neem');
    }
    return h === target;
  }).length;

  const [newSubmittedReview, setNewSubmittedReview] = useState<CustomerPhotoReview | undefined>(undefined);

  const handleReviewSubmitted = (review: CustomerPhotoReview) => {
    setNewSubmittedReview(review);
  };

  return (
    <section
      id="reviews"
      className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Schema: AggregateRating */}
      <div
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
        className="hidden"
      >
        <meta itemProp="ratingValue" content="4.9" />
        <meta itemProp="reviewCount" content={String(verifiedReviewsCount || 6)} />
        <meta itemProp="bestRating" content="5" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#8C9B3E]">
            Verified Customer Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#111111]">
            Real Results For {titleName}
          </h2>
          <p className="text-base font-sans text-[#333333] font-light max-w-lg mx-auto">
            Discover real experiences and unedited photo reviews from customers using {titleName}.
          </p>
        </div>

        {/* Rating Overview */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 mb-10 pb-10 border-b border-[#E8E6DF]">
          {/* Left: Big Score */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center space-y-2 text-center">
            <span className="font-serif text-[5rem] leading-none text-[#111111] font-normal">
              {avgRating}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#FBBF24] text-[#FBBF24]" />
              ))}
            </div>
            <div className="flex items-center gap-1.5 pt-1 text-xs font-sans text-[#666666]">
              <ShieldCheck className="h-4 w-4 text-[#8C9B3E]" />
              <span>Based on Verified Customer Reviews</span>
            </div>
          </div>

          {/* Right: Breakdown bars */}
          <div className="sm:col-span-8 space-y-2.5 justify-center flex flex-col">
            {RATING_BREAKDOWN.map(({ stars, percent }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-[11px] font-sans text-[#333333] w-6 text-right shrink-0">{stars}</span>
                <Star className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24] shrink-0" />
                <div className="flex-1 h-2 bg-[#F8F6F3] rounded-full overflow-hidden border border-[#E8E6DF]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (5 - stars) * 0.07 }}
                    className="h-full bg-[#8C9B3E] rounded-full"
                  />
                </div>
                <span className="text-[11px] font-sans text-[#666666] w-8 shrink-0">{percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Review Submission Form */}
        <WriteReviewForm
          productName={titleName}
          productHandle={currentHandle}
          onReviewSubmitted={handleReviewSubmitted}
        />

        {/* Customer Photo Review Cards Slider Filtered for this Product */}
        <div className="pt-6">
          <CustomerReviewsGridSlider
            filterHandle={currentHandle}
            newSubmittedReview={newSubmittedReview}
          />
        </div>

      </div>
    </section>
  );
}
