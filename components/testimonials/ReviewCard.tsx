'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, CheckCircle2, ThumbsUp, Share2, Sparkles } from 'lucide-react';

export interface CustomerReview {
  id: string;
  author: string;
  date: string;
  rating: number;
  isVerified: boolean;
  productName: string;
  title: string;
  body: string;
  helpfulCount: number;
  photoUrl?: string;
}

interface ReviewCardProps {
  review: CustomerReview;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount);
  const [hasVoted, setHasVoted] = useState(false);

  const handleHelpful = () => {
    if (!hasVoted) {
      setHelpfulCount(helpfulCount + 1);
      setHasVoted(true);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#4B644C]/50 transition-all duration-500 overflow-hidden h-full">
      {/* Top Header: Author info & Verified Buyer Badge */}
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap pb-1 border-b border-[#E8E6DF]/60">
          <div className="space-y-0.5 text-left">
            <h4 className="font-serif text-lg font-normal text-[#121412]">
              {review.author}
            </h4>
            <span className="text-[10px] font-sans text-[#787E78]">
              {review.date}
            </span>
          </div>

          {review.isVerified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-[#F0F7F0] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#2D5A2E] border border-[#C5D1C5]">
              <CheckCircle2 className="h-3 w-3 text-[#2D5A2E]" />
              <span>Verified Buyer</span>
            </span>
          )}
        </div>

        {/* 5-Star Rating & Product Tag */}
        <div className="space-y-1.5 text-left">
          <div className="flex items-center gap-1 text-[#C8A96E]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#C8A96E] text-[#C8A96E]" />
            ))}
            <span className="text-xs font-sans font-semibold text-[#121412] ml-1">
              5.0
            </span>
          </div>

          <span className="inline-block text-[11px] font-sans font-medium text-[#4B644C] bg-[#F4F6F4] px-2.5 py-0.5 rounded border border-[#C5D1C5]">
            {review.productName}
          </span>
        </div>

        {/* Review Title & Body */}
        <div className="space-y-2 text-left pt-1">
          <h5 className="font-serif text-base sm:text-lg font-normal text-[#121412] leading-snug">
            {review.title}
          </h5>
          <p className="text-xs sm:text-sm text-[#4A4E4A] font-sans leading-relaxed font-light">
            {review.body}
          </p>
        </div>

        {/* Optional Reviewer Photo Attachment */}
        {review.photoUrl && (
          <div className="relative h-24 w-24 rounded-xl overflow-hidden border border-[#E8E6DF] mt-3">
            <Image
              src={review.photoUrl}
              alt={`Customer photo review by ${review.author}`}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        )}
      </div>

      {/* Bottom Footer: Helpful count & Action buttons */}
      <div className="pt-5 mt-4 border-t border-[#E8E6DF]/60 flex items-center justify-between gap-2 text-xs font-sans text-[#787E78]">
        <span>{helpfulCount} people found this helpful</span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleHelpful}
            className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold border transition-all ${
              hasVoted
                ? 'bg-[#4B644C] text-white border-[#4B644C]'
                : 'bg-white text-[#121412] border-[#E8E6DF] hover:border-[#4B644C] hover:text-[#4B644C]'
            }`}
          >
            <ThumbsUp className="h-3 w-3" />
            <span>{hasVoted ? 'Helpful' : 'Helpful'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
