'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, ShieldCheck, MoveHorizontal, Quote } from 'lucide-react';
import { Product } from '@/types/product';

/* ─── Types ─────────────────────────────────────────────────────── */
interface CustomerReview {
  name: string;
  age: string;
  duration: string;
  concern: string;
  rating: number;
  review: string;
}

interface ProductComparisonData {
  eyebrow: string;
  headline: string;
  sub: string;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  reviews: CustomerReview[];
}

/* ─── Per-product data — 1 image pair, 3 real customer reviews ─── */
function getComparisonData(handle: string): ProductComparisonData {
  const h = handle.toLowerCase();

  if (h.includes('neem') || h.includes('comb')) {
    return {
      eyebrow: 'Verified Customer Results',
      headline: 'Scalp Before & After',
      sub: 'Real results from customers using the Handcrafted Neem Wood Comb for 3–6 weeks.',
      beforeImg: '/products/clinical_before_comb.jpg',
      afterImg: '/products/clinical_after_comb.jpg',
      beforeLabel: 'Day 1 — Before',
      afterLabel: 'Week 3 — After',
      reviews: [
        {
          name: 'Rajan Mehta',
          age: '34',
          duration: '3 Weeks Daily Use',
          concern: 'Dandruff & Scalp Flaking',
          rating: 5,
          review:
            'The dandruff completely disappeared in 3 weeks. No chemical shampoo worked this well before.',
        },
        {
          name: 'Priya Nair',
          age: '28',
          duration: '4 Weeks Daily Use',
          concern: 'Static & Hair Breakage',
          rating: 5,
          review:
            'My hair breakage reduced dramatically. The comb feels so gentle and the neem is very soothing.',
        },
        {
          name: 'Arnav Kapoor',
          age: '41',
          duration: '6 Weeks Daily Use',
          concern: 'Oily Scalp & Itchiness',
          rating: 5,
          review:
            'Itching stopped in the first week itself. Switched from plastic comb permanently.',
        },
      ],
    };
  }

  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf')) {
    return {
      eyebrow: 'Verified Customer Results',
      headline: 'Skin Tone Before & After',
      sub: 'Real results from customers using Advanced De-Tan Sunscreen Gel SPF 50+ consistently.',
      beforeImg: '/products/clinical_before_sunscreen.jpg',
      afterImg: '/products/clinical_after_sunscreen.jpg',
      beforeLabel: 'Day 1 — Before',
      afterLabel: 'Week 6 — After',
      reviews: [
        {
          name: 'Akash Gaur',
          age: '29',
          duration: '2 Months Consistent Use',
          concern: 'Skin Tone & Tan Removal',
          rating: 5,
          review:
            'The De-Tan gel removed years of sun pigmentation. My skin tone is visibly brighter and more even now.',
        },
        {
          name: 'Shreya Bose',
          age: '25',
          duration: '6 Weeks Daily Use',
          concern: 'Hyperpigmentation & Dark Spots',
          rating: 5,
          review:
            'Zero white cast, zero breakouts. My dark spots have faded so much. This is now my everyday SPF.',
        },
        {
          name: 'Karan Verma',
          age: '32',
          duration: '45 Days Consistent Use',
          concern: 'UV Damage & Dullness',
          rating: 5,
          review:
            'Used it daily for 45 days and my overall complexion looks much healthier. Lightweight and no greasy feel.',
        },
      ],
    };
  }

  // RootHerb Hair Oil (default)
  return {
    eyebrow: 'Verified Customer Results',
    headline: 'Hair Density Before & After',
    sub: 'Real results from customers using RootHerb Hair Growth Oil for 4–10 weeks.',
    beforeImg: '/products/clinical_before.jpg',
    afterImg: '/products/clinical_after.jpg',
    beforeLabel: 'Day 1 — Before',
    afterLabel: 'Week 8 — After',
    reviews: [
      {
        name: 'Anita Sharma',
        age: '33',
        duration: '8 Weeks Consistent Use',
        concern: 'Hair Fall & Thinning',
        rating: 5,
        review:
          'I was losing 200+ strands daily. After 8 weeks, hair fall reduced by 90%. Baby hair is growing back!',
      },
      {
        name: 'Deepak Joshi',
        age: '38',
        duration: '6 Weeks Daily Massage',
        concern: 'Crown Thinning & Bald Patches',
        rating: 5,
        review:
          'The crown area which was thinning badly has new hair growth in 6 weeks. Highly recommend!',
      },
      {
        name: 'Meera Reddy',
        age: '27',
        duration: '10 Weeks of Use',
        concern: 'Dry Scalp & Itchiness',
        rating: 5,
        review:
          'My dry, itchy scalp is completely healed. Hair shine and volume is incredible now.',
      },
    ],
  };
}

/* ─── Before/After Slider ─────────────────────────────────────── */
function BeforeAfterSlider({
  beforeImg,
  afterImg,
  beforeLabel,
  afterLabel,
}: {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={(e) => {
        isDragging.current = true;
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
        updateSlider(e.clientX);
      }}
      onPointerMove={(e) => { if (isDragging.current) updateSlider(e.clientX); }}
      onPointerUp={() => { isDragging.current = false; }}
      onPointerLeave={() => { isDragging.current = false; }}
      className="relative w-full aspect-square rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none bg-[#F5F4EF] border border-[#E8E6DF] shadow-lg"
      aria-label="Before and after comparison slider"
      role="img"
    >
      {/* AFTER (base) */}
      <Image
        src={afterImg}
        alt="After treatment"
        fill
        unoptimized
        sizes="(max-width: 768px) 90vw, 350px"
        className="object-cover object-top pointer-events-none"
      />
      <span className="absolute top-3 right-3 z-10 rounded-full bg-[#0F1410]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white tracking-widest uppercase shadow-md">
        AFTER
      </span>

      {/* BEFORE (clipped overlay) */}
      <div
        style={{ width: `${sliderPos}%` }}
        className="absolute inset-y-0 left-0 overflow-hidden z-10"
      >
        <div
          className="relative h-full"
          style={{ width: containerRef.current?.offsetWidth ?? 350 }}
        >
          <Image
            src={beforeImg}
            alt="Before treatment"
            fill
            unoptimized
            sizes="(max-width: 768px) 90vw, 350px"
            className="object-cover object-top pointer-events-none"
          />
          <span className="absolute top-3 left-3 z-10 rounded-full bg-[#0F1410]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold text-white tracking-widest uppercase shadow-md">
            BEFORE
          </span>
        </div>
      </div>

      {/* Divider + Handle */}
      <div
        style={{ left: `${sliderPos}%` }}
        className="absolute inset-y-0 z-20 flex items-center justify-center"
      >
        <div className="absolute inset-y-0 w-[2px] bg-white/90 -translate-x-1/2 shadow-lg" />
        <div className="h-10 w-10 rounded-full bg-white shadow-2xl border border-[#E8E6DF] flex items-center justify-center -translate-x-1/2 z-10">
          <MoveHorizontal className="h-4 w-4 text-[#4B644C]" />
        </div>
      </div>

      {/* Bottom labels */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex justify-between pointer-events-none">
        <span className="text-[10px] font-sans font-semibold text-white/80">{beforeLabel}</span>
        <span className="text-[10px] font-sans font-semibold text-white/80">{afterLabel}</span>
      </div>
    </div>
  );
}

/* ─── Review Card ─────────────────────────────────────────────── */
function ReviewCard({ review, active }: { review: CustomerReview; active: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl border p-5 transition-all duration-300 space-y-3 ${
        active
          ? 'bg-white border-[#4B644C]/40 shadow-md'
          : 'bg-[#FAFAF8] border-[#E8E6DF]'
      }`}
    >
      {/* Concern */}
      <span className="inline-block text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-[#4B644C]">
        {review.concern}
      </span>

      {/* Verified */}
      <div className="flex items-center gap-1.5">
        <ShieldCheck className="h-3 w-3 text-[#4B644C]" />
        <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
          Verified Customer
        </span>
      </div>

      {/* Name + age/duration */}
      <div>
        <p className="font-serif text-base font-normal text-[#0F1410]">{review.name}</p>
        <p className="text-[10px] font-sans text-[#787E78] mt-0.5">
          Age {review.age} &bull; {review.duration}
        </p>
      </div>

      {/* Stars */}
      <div className="flex items-center gap-1">
        {[...Array(review.rating)].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
        ))}
        <span className="text-[10px] font-sans text-[#555] font-semibold ml-1">
          {review.rating}.0 / 5.0 Rating
        </span>
      </div>

      {/* Review */}
      <p className="text-[11px] font-sans text-[#555555] italic leading-relaxed line-clamp-3">
        &ldquo;{review.review}&rdquo;
      </p>
    </motion.div>
  );
}

/* ─── Main Section ────────────────────────────────────────────── */
export function BeforeAfterComparison({ product }: { product?: Product }) {
  const data = getComparisonData(product?.handle || '');
  const [activeReview, setActiveReview] = useState(0);

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 border-b border-[#E8E6DF] overflow-hidden">

      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 relative">

        {/* Header */}
        <div className="max-w-[600px] mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F4E6] border border-[#E0E4B3] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
            <ShieldCheck className="h-3 w-3" />
            {data.eyebrow}
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#0F1410]">
            {data.headline}
          </h2>
          <p className="text-sm font-sans text-[#555555] font-light max-w-lg mx-auto leading-relaxed">
            {data.sub}
          </p>
        </div>

        {/* Main layout: Slider LEFT | Reviews RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start max-w-5xl mx-auto">

          {/* LEFT — Before/After Slider */}
          <div className="space-y-3">
            <BeforeAfterSlider
              beforeImg={data.beforeImg}
              afterImg={data.afterImg}
              beforeLabel={data.beforeLabel}
              afterLabel={data.afterLabel}
            />
            <p className="text-[10px] text-center text-[#9A9E9A] font-sans flex items-center justify-center gap-1">
              <MoveHorizontal className="h-3 w-3" />
              Drag to compare Before &amp; After
            </p>
          </div>

          {/* RIGHT — Customer Reviews stacked */}
          <div className="space-y-3">
            <p className="text-[11px] font-sans font-semibold text-[#0F1410] mb-1">
              What our customers say
            </p>
            {data.reviews.map((review, i) => (
              <button
                key={i}
                suppressHydrationWarning
                className="w-full text-left"
                onClick={() => setActiveReview(i)}
              >
                <ReviewCard review={review} active={i === activeReview} />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
