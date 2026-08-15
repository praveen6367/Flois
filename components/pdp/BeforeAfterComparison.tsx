'use client';

import React, { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShieldCheck, MoveHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
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

interface ComparisonPair {
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  customerName: string;
  customerAge: string;
}

interface ProductComparisonData {
  eyebrow: string;
  headline: string;
  sub: string;
  pairs: ComparisonPair[];
  reviews: CustomerReview[];
}

/* ─── Per-product data — multiple image pairs, 3 real customer reviews ─── */
function getComparisonData(handle: string): ProductComparisonData {
  const h = handle.toLowerCase();

  if (h.includes('neem') || h.includes('comb')) {
    return {
      eyebrow: 'Verified Customer Results',
      headline: 'Scalp Before & After',
      sub: 'Real results from customers using the Handcrafted Neem Wood Comb for 3–6 weeks.',
      pairs: [
        {
          beforeImg: '/placeholders/3a.png',
          afterImg: '/placeholders/3b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 3 — After',
          customerName: 'Pawan Tiwari',
          customerAge: '43',
        },
        {
          beforeImg: '/placeholders/4a.png',
          afterImg: '/placeholders/4b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 4 — After',
          customerName: 'Amrita Gupta',
          customerAge: '37',
        },
        {
          beforeImg: '/placeholders/5a.png',
          afterImg: '/placeholders/5b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 6 — After',
          customerName: 'Rakesh Mishra',
          customerAge: '43',
        },
        {
          beforeImg: '/placeholders/6a.png',
          afterImg: '/placeholders/6b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 6 — After',
          customerName: 'Urvashi Patel',
          customerAge: '21',
        },
        {
          beforeImg: '/placeholders/7a.png',
          afterImg: '/placeholders/7b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 3 — After',
          customerName: 'Urvashi Patel',
          customerAge: '21',
        },
        {
          beforeImg: '/placeholders/8a.png',
          afterImg: '/placeholders/8b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 4 — After',
          customerName: 'Madhvi Sharma',
          customerAge: '29',
        },
      ],
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
      pairs: [
        {
          beforeImg: '/placeholders/1a.png',
          afterImg: '/placeholders/1b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 6 — After',
          customerName: 'Deepti Shukla',
          customerAge: '32',
        },
        {
          beforeImg: '/placeholders/2a.png',
          afterImg: '/placeholders/2b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 6 — After',
          customerName: 'Akash Gaur',
          customerAge: '29',
        },
        {
          beforeImg: '/placeholders/9a.png',
          afterImg: '/placeholders/9b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 8 — After',
          customerName: 'Neelam Jadav',
          customerAge: '31',
        },
        {
          beforeImg: '/placeholders/10a.png',
          afterImg: '/placeholders/10b.png',
          beforeLabel: 'Day 1 — Before',
          afterLabel: 'Week 8 — After',
          customerName: 'Khushbu Soni',
          customerAge: '28',
        },
      ],
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
          name: 'Neelam Jadav',
          age: '31',
          duration: '8 Weeks Daily Use',
          concern: 'Hyperpigmentation & Dark Spots',
          rating: 5,
          review:
            'Uneven skin tone and pigmentation corrected noticeably. My skin looks bright and healthy.',
        },
        {
          name: 'Khushbu Soni',
          age: '28',
          duration: '45 Days Consistent Use',
          concern: 'De-Tan & Skin Radiance',
          rating: 5,
          review:
            'Tan and dullness removed in under 2 months. Skin feels softer and looks radiant every day.',
        },
      ],
    };
  }

  // RootHerb Hair Oil (default)
  return {
    eyebrow: 'Verified Customer Results',
    headline: 'Hair Density Before & After',
    sub: 'Real results from customers using RootHerb Hair Growth Oil for 4–10 weeks.',
    pairs: [
      {
        beforeImg: '/placeholders/3a.png',
        afterImg: '/placeholders/3b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 8 — After',
        customerName: 'Pawan Tiwari',
        customerAge: '43',
      },
      {
        beforeImg: '/placeholders/4a.png',
        afterImg: '/placeholders/4b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 8 — After',
        customerName: 'Amrita Gupta',
        customerAge: '37',
      },
      {
        beforeImg: '/placeholders/5a.png',
        afterImg: '/placeholders/5b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 6 — After',
        customerName: 'Rakesh Mishra',
        customerAge: '43',
      },
      {
        beforeImg: '/placeholders/6a.png',
        afterImg: '/placeholders/6b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 6 — After',
        customerName: 'Urvashi Patel',
        customerAge: '21',
      },
      {
        beforeImg: '/placeholders/7a.png',
        afterImg: '/placeholders/7b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 8 — After',
        customerName: 'Urvashi Patel',
        customerAge: '21',
      },
      {
        beforeImg: '/placeholders/8a.png',
        afterImg: '/placeholders/8b.png',
        beforeLabel: 'Day 1 — Before',
        afterLabel: 'Week 6 — After',
        customerName: 'Madhvi Sharma',
        customerAge: '29',
      },
    ],
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
        name: 'Madhvi Sharma',
        age: '29',
        duration: '6 Weeks Daily Massage',
        concern: 'Hair Density & Partition',
        rating: 5,
        review:
          'My hair partition is now barely visible. The density improvement is something I can see and feel.',
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
  const [activePair, setActivePair] = useState(0);

  const prevPair = () => setActivePair((p) => (p - 1 + data.pairs.length) % data.pairs.length);
  const nextPair = () => setActivePair((p) => (p + 1) % data.pairs.length);

  const currentPair = data.pairs[activePair];

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

          {/* LEFT — Before/After Slider with carousel navigation */}
          <div className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePair}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BeforeAfterSlider
                  beforeImg={currentPair.beforeImg}
                  afterImg={currentPair.afterImg}
                  beforeLabel={currentPair.beforeLabel}
                  afterLabel={currentPair.afterLabel}
                />
              </motion.div>
            </AnimatePresence>

            {/* Customer name tag */}
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-sans text-[#555] font-medium">
                {currentPair.customerName}, Age-{currentPair.customerAge}
              </p>
              <p className="text-[10px] text-center text-[#9A9E9A] font-sans flex items-center gap-1">
                <MoveHorizontal className="h-3 w-3" />
                Drag to compare
              </p>
            </div>

            {/* Pair navigation controls */}
            {data.pairs.length > 1 && (
              <div className="flex items-center justify-center gap-4 pt-1">
                <button
                  suppressHydrationWarning
                  onClick={prevPair}
                  aria-label="Previous comparison"
                  className="h-9 w-9 rounded-full border border-[#E8E6DF] bg-white shadow-sm hover:bg-[#F2F4E6] hover:border-[#4B644C]/40 transition-all flex items-center justify-center text-[#4B644C]"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5">
                  {data.pairs.map((_, i) => (
                    <button
                      suppressHydrationWarning
                      key={i}
                      onClick={() => setActivePair(i)}
                      aria-label={`Go to comparison ${i + 1}`}
                      className={`rounded-full transition-all duration-300 ${
                        i === activePair
                          ? 'w-5 h-2 bg-[#4B644C]'
                          : 'w-2 h-2 bg-[#D1D9D1] hover:bg-[#A3B4A3]'
                      }`}
                    />
                  ))}
                </div>

                <button
                  suppressHydrationWarning
                  onClick={nextPair}
                  aria-label="Next comparison"
                  className="h-9 w-9 rounded-full border border-[#E8E6DF] bg-white shadow-sm hover:bg-[#F2F4E6] hover:border-[#4B644C]/40 transition-all flex items-center justify-center text-[#4B644C]"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
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
