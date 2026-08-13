'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Star, ShieldCheck, ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  allReviews?: CustomerPhotoReview[];
  reviewIndex?: number;
  onLightboxOpen?: (index: number) => void;
}

/* ─── Lightbox Component ─────────────────────────────────── */
interface LightboxProps {
  reviews: CustomerPhotoReview[];
  startIndex: number;
  onClose: () => void;
}

export function ReviewLightbox({ reviews, startIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + reviews.length) % reviews.length), [reviews.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), [reviews.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const r = reviews[current];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

        {/* Content */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col lg:flex-row max-w-4xl w-full mx-4 rounded-[28px] overflow-hidden shadow-2xl bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left: Large Product Image */}
          <div className="relative w-full lg:w-[50%] h-64 sm:h-80 lg:h-auto min-h-[300px] bg-[#F8F6F3] flex-shrink-0">
            {r.photoUrl ? (
              <img
                src={r.photoUrl}
                alt={`Product photo — ${r.productName || r.author}`}
                className="w-full h-full object-contain p-6"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-sans text-sm text-[#AAAAAA]">No photo</span>
              </div>
            )}
            {r.productName && (
              <div className="absolute top-4 left-4">
                <span className="inline-block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#8C9B3E] bg-white/95 px-3 py-1 rounded-full border border-[#E0E4B3] shadow-sm backdrop-blur-sm">
                  {r.productName}
                </span>
              </div>
            )}
          </div>

          {/* Right: Review Details */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              {/* Stars + Date */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FBBF24] text-[#FBBF24] stroke-[1]" />
                  ))}
                </div>
                {r.date && (
                  <span className="text-[11px] font-sans text-[#888888]">{r.date}</span>
                )}
              </div>
              <blockquote className="font-sans text-base sm:text-[17px] text-[#222222] leading-relaxed italic">
                &ldquo;{r.body}&rdquo;
              </blockquote>
            </div>

            {/* Author */}
            <div className="pt-5 mt-4 border-t border-[#E8E6DF] flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[#8C9B3E] text-white flex items-center justify-center text-sm font-bold font-sans shrink-0">
                {r.author.split(' ').map((n) => n[0]).join('').toUpperCase()}
              </div>
              <div>
                <p className="font-sans font-bold text-sm text-[#111111]">{r.author}</p>
                {r.location && (
                  <p className="text-[11px] font-sans text-[#777777]">Verified Buyer · {r.location}</p>
                )}
              </div>
              <div className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#F0F7F0] px-2.5 py-1 text-[10px] font-bold text-[#2D5A2E] border border-[#C5D1C5]">
                <ShieldCheck className="h-3 w-3" />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 h-9 w-9 rounded-full bg-white/90 border border-[#E8E6DF] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors shadow-md backdrop-blur-sm"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>

        {/* Prev / Next */}
        {reviews.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 sm:left-8 z-20 h-11 w-11 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 sm:right-8 z-20 h-11 w-11 rounded-full bg-white/20 border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20">
          <span className="text-white/70 text-xs font-mono">{current + 1} / {reviews.length}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─── Review Card ────────────────────────────────────────── */
export function CustomerPhotoReviewCard({ review, allReviews, reviewIndex = 0, onLightboxOpen }: CustomerPhotoReviewCardProps) {
  const [imgError, setImgError] = useState(false);

  const hasPhoto = !!review.photoUrl && !imgError;

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLightboxOpen) onLightboxOpen(reviewIndex);
  };

  return (
    <article className="group relative flex flex-col bg-white border border-[#E8E6DF] rounded-[22px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgba(140,155,62,0.14)] hover:border-[#8C9B3E] hover:-translate-y-1 transition-all duration-500 overflow-hidden h-full p-5 sm:p-6">

      {/* ── Top Row: Product name pill + date ── */}
      <div className="flex items-center justify-between gap-2 mb-4">
        {review.productName ? (
          <span className="inline-block text-[9px] font-sans font-semibold uppercase tracking-wider text-[#8C9B3E] bg-[#F2F4E6] px-2.5 py-1 rounded-full border border-[#E0E4B3] truncate max-w-[65%]">
            {review.productName}
          </span>
        ) : (
          <span />
        )}
        {review.date && (
          <span className="text-[10px] font-sans text-[#AAAAAA] shrink-0">{review.date}</span>
        )}
      </div>

      {/* ── Stars ── */}
      <div className="flex items-center gap-0.5 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-[#FBBF24] text-[#FBBF24] stroke-[1]" />
        ))}
      </div>

      {/* ── Review Body + optional small product thumbnail ── */}
      <div className="flex gap-3 flex-1 mb-4">
        {/* Quote text */}
        <p className="font-sans text-[13px] sm:text-sm text-[#333333] leading-relaxed flex-1">
          &ldquo;{review.body}&rdquo;
        </p>

        {/* Small product thumbnail — only shown when photoUrl is available */}
        {hasPhoto && (
          <button
            onClick={handleImageClick}
            title="View product photo"
            className="flex-shrink-0 w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-xl overflow-hidden border border-[#E8E6DF] bg-[#F8F6F3] hover:border-[#8C9B3E] hover:shadow-md transition-all duration-300 relative group/img"
          >
            <img
              src={review.photoUrl!}
              alt={`${review.productName || 'Product'} photo`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover/img:scale-110"
            />
            {/* Zoom overlay hint */}
            <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors duration-300 flex items-center justify-center rounded-xl">
              <ZoomIn className="h-4 w-4 text-white opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 drop-shadow" />
            </div>
          </button>
        )}
      </div>

      {/* ── Author footer ── */}
      <div className="flex items-center justify-between pt-3 border-t border-[#F0EDE8] gap-2 mt-auto">
        <div>
          <p className="font-sans font-bold text-[13px] text-[#111111] leading-tight">{review.author}</p>
          {review.location && (
            <p className="text-[10px] font-sans text-[#888888] mt-0.5">Verified Buyer · {review.location}</p>
          )}
        </div>
        <div className="inline-flex items-center gap-1 rounded-full bg-[#F0F7F0] px-2 py-0.5 text-[9px] font-bold text-[#2D5A2E] border border-[#C5D1C5] shrink-0">
          <ShieldCheck className="h-2.5 w-2.5" />
          <span>Verified</span>
        </div>
      </div>
    </article>
  );
}
