'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, ThumbsUp } from 'lucide-react';

export interface CustomerPhotoReview {
  id: string;
  author: string;
  body: string;
  photoUrl?: string;
  avatarUrl?: string;
  rating: number;
  productName?: string;
  productHandle?: string;
  date?: string;
  helpfulCount?: number;
  location?: string;
}

interface CustomerPhotoReviewCardProps {
  review: CustomerPhotoReview;
}

export function CustomerPhotoReviewCard({ review }: CustomerPhotoReviewCardProps) {
  const [helpfuls, setHelpfuls] = useState(review.helpfulCount || 14);
  const [hasVoted, setHasVoted] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Helper for author initials fallback
  const initials = review.author
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleHelpful = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasVoted) {
      setHelpfuls(helpfuls + 1);
      setHasVoted(true);
    }
  };

  const avatar = review.avatarUrl || review.photoUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`;

  return (
    <article className="group relative flex flex-col justify-between items-center text-center p-6 sm:p-7 rounded-[28px] bg-white border border-[#E8E6DF] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(140,155,62,0.15)] hover:border-[#8C9B3E] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden h-full">
      <div className="w-full space-y-4 flex flex-col items-center">
        
        {/* Top Product Category Pill */}
        {review.productName && (
          <div className="w-full flex items-center justify-between gap-2">
            <span className="inline-block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8C9B3E] bg-[#F2F4E6] px-3 py-1 rounded-full border border-[#E0E4B3] truncate max-w-[240px]">
              {review.productName}
            </span>
            {review.date && (
              <span className="text-[11px] font-sans text-[#888888] shrink-0">
                {review.date}
              </span>
            )}
          </div>
        )}

        {/* Circular Indian Human Avatar Portrait Badge */}
        <div className="relative my-2 flex items-center justify-center">
          <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#8C9B3E] shadow-md bg-[#F8F6F3] group-hover:scale-108 transition-all duration-500">
            {!imgError ? (
              <img
                src={avatar}
                alt={`Customer portrait of ${review.author}`}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full bg-[#8C9B3E] text-white flex items-center justify-center text-lg font-bold font-sans">
                {initials}
              </div>
            )}
          </div>
          
          {/* Subtle Verified Buyer Pill */}
          <div className="absolute -bottom-2.5 z-10 inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-0.5 text-[9px] font-bold text-[#2D5A2E] shadow-sm border border-[#C5D1C5] whitespace-nowrap">
            <ShieldCheck className="h-3 w-3 text-[#2D5A2E]" />
            <span>Verified</span>
          </div>
        </div>

        {/* Quote Body Text */}
        <div className="relative w-full px-1 py-1">
          <p className="font-sans text-sm sm:text-[15px] text-[#222222] font-normal leading-relaxed text-center">
            "{review.body}"
          </p>
        </div>

      </div>

      {/* Author Footer Row */}
      <div className="pt-4 mt-3 w-full flex flex-col items-center border-t border-[#E8E6DF]/80 space-y-2">
        {/* Author Name & Location */}
        <div className="flex flex-col items-center space-y-0.5">
          <h4 className="font-sans font-bold text-base text-[#111111] tracking-tight leading-tight">
            {review.author}
          </h4>
          {review.location && (
            <span className="text-[11px] font-sans text-[#777777]">
              Verified Buyer · {review.location}
            </span>
          )}
        </div>

        {/* 5 Amber/Gold Stars & Helpful Button */}
        <div className="w-full flex items-center justify-between pt-1">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24] stroke-[1]"
              />
            ))}
          </div>

          <button
            suppressHydrationWarning
            onClick={handleHelpful}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all border ${
              hasVoted
                ? 'bg-[#8C9B3E] text-white border-[#8C9B3E]'
                : 'bg-[#F8F6F3] text-[#555555] border-[#E8E6DF] hover:bg-[#8C9B3E] hover:text-white hover:border-[#8C9B3E]'
            }`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{helpfuls}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
