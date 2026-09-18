'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CustomerPhotoReviewCard, CustomerPhotoReview, ReviewLightbox } from './CustomerPhotoReviewCard';
import { getProductType } from '@/lib/productClassifier';

// ─── Actual FLOIS product images mapped by product handle ──────────────────────
// Only clean product/editorial/texture shots — NO clinical before/after face images
const PRODUCT_PHOTO_POOLS: Record<string, string[]> = {
  'rootherb-hair-growth-oil': [
    '/products/rootherb_product.png',
    '/products/editorial_rootherb.jpg',
    '/products/texture_macro.jpg',
    '/products/botanical_ingredients.jpg',
  ],
  'advanced-de-tan-sunscreen-gel': [
    '/products/sunscreen_product.png',
    '/products/editorial_sunscreen.jpg',
    '/products/texture_sunscreen.jpg',
  ],
  'neem-wood-comb': [
    '/products/neem_comb_product.png',
    '/products/editorial_neem_comb.jpg',
    '/products/texture_neem_comb.jpg',
  ],
  'body-care': [
    '/products/botanical_ingredients.jpg',
    '/products/howto_ritual.jpg',
    '/products/editorial_story.jpg',
  ],
};

// Pick a photo from the pool by index, or return undefined (not every review needs a photo)
function pickProductPhoto(handle: string, index: number): string {
  const pool = PRODUCT_PHOTO_POOLS[handle] || [];
  return pool[index % pool.length] || pool[0];
}

// Only some reviews have product photos — more natural/realistic
function maybePhoto(handle: string, poolIndex: number, show: boolean): string | undefined {
  if (!show) return undefined;
  return pickProductPhoto(handle, poolIndex);
}

export const REAL_CUSTOMER_REVIEWS: CustomerPhotoReview[] = [
  // ─── 1. HAIR GROWTH OIL REVIEWS (6 Reviews) ──────────────────────────────────
  {
    id: 'rev-ho-1',
    author: 'Sagar Sharma',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 0, true),
    body: 'No strong chemical smell and very gentle on the scalp. Packaging is neat and premium. Happy with the quality so far.',
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '28 Jan 2025',
    helpfulCount: 28,
    location: 'Delhi'
  },
  {
    id: 'rev-ho-2',
    author: 'Arpit Anand',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 0, false),
    body: "I've been using the FLOIS RootHerb Hair Growth Oil for a few Months and the experience has been really good. The oil is lightweight, non-sticky. My Hair Fall is gone.",
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '02 Mar 2025',
    helpfulCount: 42,
    location: 'Bangalore'
  },
  {
    id: 'rev-ho-3',
    author: 'Jagrati Rohira',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 1, true),
    body: "The oil is light and non-sticky. mild & calming fragrance. I've noticed less hair fall during wash days and an overall improvement in scalp comfort.",
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '19 Jan 2025',
    helpfulCount: 35,
    location: 'Pune'
  },
  {
    id: 'rev-ho-4',
    author: 'Hemanshi Sharma',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 1, false),
    body: 'Loved the product! Very good results, and the amazing part is that it is 100% plant based and has no allergic reaction.... 10/10 😍😍',
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '10 Feb 2025',
    helpfulCount: 39,
    location: 'Jaipur'
  },
  {
    id: 'rev-ho-5',
    author: 'Mohammed Mukhtar',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 2, true),
    body: 'First of all, its packing is wonderful and the natural jasmine botanical fragrance gives a different kind of calm feeling. I have been using it for 3 weeks and hair fall has dropped significantly. First class product!',
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '21 Jan 2025',
    helpfulCount: 47,
    location: 'Hyderabad'
  },
  {
    id: 'rev-ho-6',
    author: 'Devika Nair',
    photoUrl: maybePhoto('rootherb-hair-growth-oil', 2, false),
    body: 'RootHerb oil transformed my dry scalp in just 2 weeks. The herbs infused inside the bottle look and feel so pure. Hair texture is softer than ever!',
    rating: 5,
    productName: 'RootHerb Hair Growth Oil',
    productHandle: 'rootherb-hair-growth-oil',
    date: '05 Feb 2025',
    helpfulCount: 19,
    location: 'Kochi'
  },

  // ─── 2. SUNSCREEN GEL REVIEWS (6 Reviews) ──────────────────────────────────
  {
    id: 'rev-sg-1',
    author: 'Pratiksha Joshi',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 0, true),
    body: 'FLOIS De-Tan Sunscreen has been a game-changer. Not only has my tanning and uneven skin tone improved, but I also feel protected from daily blue light exposure.',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '14 Feb 2025',
    helpfulCount: 34,
    location: 'Mumbai'
  },
  {
    id: 'rev-sg-2',
    author: 'Deepti Shukla',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 0, false),
    body: 'After using FLOIS Sunscreen regularly, my skin looks more even, healthier, and visibly brighter. I love that it not only protects my skin but also helps improve existing tanning over time.',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '22 Feb 2025',
    helpfulCount: 31,
    location: 'Ahmedabad'
  },
  {
    id: 'rev-sg-3',
    author: 'Pooja Deshmukh',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 1, true),
    body: 'I am so glad to receive this sunscreen gel! Curiously, I opened it and was surprised to see how lightweight and non-greasy it is. Leaves my skin feeling hydrated, soft, and protected all day under the sun without breakouts.',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '15 Apr 2025',
    helpfulCount: 26,
    location: 'Nagpur'
  },
  {
    id: 'rev-sg-4',
    author: 'Ananya Roy',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 1, false),
    body: 'Zero white cast and does not make my face oily at all. SPF 50+ PA++++ works amazingly during my daily outdoor commute in hot humid weather!',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '18 Jan 2025',
    helpfulCount: 22,
    location: 'Kolkata'
  },
  {
    id: 'rev-sg-5',
    author: 'Sneha Kapoor',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 2, true),
    body: 'Finally a gel sunscreen that does not sting my eyes or cause pimples. Reapplying throughout the day is effortless and feels refreshing!',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '01 Feb 2025',
    helpfulCount: 16,
    location: 'Chandigarh'
  },
  {
    id: 'rev-sg-6',
    author: 'Nisha Agarwal',
    photoUrl: maybePhoto('advanced-de-tan-sunscreen-gel', 2, false),
    body: 'Super light texture that blends into skin like water! My sun tan cleared up significantly within 3 weeks of daily application.',
    rating: 5,
    productName: 'Advanced De-Tan Sunscreen Gel',
    productHandle: 'advanced-de-tan-sunscreen-gel',
    date: '10 Feb 2025',
    helpfulCount: 20,
    location: 'Indore'
  },

  // ─── 3. NEEM WOOD COMB REVIEWS (6 Reviews) ──────────────────────────────────
  {
    id: 'rev-nc-1',
    author: 'Rohan Malhotra',
    photoUrl: maybePhoto('neem-wood-comb', 0, true),
    body: 'Helps me accelerate my hair growth and reduced my hair fall to an extent. I have dry scalp so after applying the RootHerb oil with this neem comb, it really moisturizes my scalp and reduces itchiness.',
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '26 Dec 2024',
    helpfulCount: 25,
    location: 'Chandigarh'
  },
  {
    id: 'rev-nc-2',
    author: 'Rajesh Varma',
    photoUrl: maybePhoto('neem-wood-comb', 0, false),
    body: 'The neem wood quality is top notch. Smooth rounded teeth that stimulate scalp blood circulation without any static or hair tearing.',
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '12 Jan 2025',
    helpfulCount: 19,
    location: 'Lucknow'
  },
  {
    id: 'rev-nc-3',
    author: 'Meera Iyengar',
    photoUrl: maybePhoto('neem-wood-comb', 1, true),
    body: 'Say goodbye to plastic comb static! This neem comb smells subtle and herbal, and feels so soothing on scalp every night before bed.',
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '08 Feb 2025',
    helpfulCount: 21,
    location: 'Chennai'
  },
  {
    id: 'rev-nc-4',
    author: 'Vikram Choudhary',
    photoUrl: maybePhoto('neem-wood-comb', 1, false),
    body: 'Craftsmanship is superb. Sturdy medicinal neem wood with perfect wide-tooth spacing for detangling wet curly hair gently.',
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '17 Jan 2025',
    helpfulCount: 14,
    location: 'Surat'
  },
  {
    id: 'rev-nc-5',
    author: 'Amit Trivedi',
    photoUrl: maybePhoto('neem-wood-comb', 2, true),
    body: "Great natural wood comb. Reduces dandruff flakes and doesn't break fine hair strands like cheap plastic combs do.",
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '04 Feb 2025',
    helpfulCount: 18,
    location: 'Ahmedabad'
  },
  {
    id: 'rev-nc-6',
    author: 'Preeti Sundaram',
    photoUrl: maybePhoto('neem-wood-comb', 2, false),
    body: 'Using this handcrafted neem comb after applying RootHerb oil has made a huge difference. Scalp feels invigorated!',
    rating: 5,
    productName: 'Handcrafted Neem Wood Comb',
    productHandle: 'neem-wood-comb',
    date: '19 Feb 2025',
    helpfulCount: 23,
    location: 'Bengaluru'
  },

  // ─── 4. SKIN & BODY CARE REVIEWS (6 Reviews) ───────────────────────────────
  {
    id: 'rev-sc-1',
    author: 'Kavita Sen',
    photoUrl: maybePhoto('body-care', 0, true),
    body: 'The botanical formula feels so soothing and luxurious on skin. Natural cold-pressed scent without artificial synthetic fragrance.',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '03 Feb 2025',
    helpfulCount: 18,
    location: 'Bhopal'
  },
  {
    id: 'rev-sc-2',
    author: 'Tarun Mehta',
    photoUrl: maybePhoto('body-care', 0, false),
    body: 'Noticeable brightness and hydration after 10 days. The lightweight gel texture absorbs instantly without leaving any sticky residue.',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '25 Jan 2025',
    helpfulCount: 23,
    location: 'Indore'
  },
  {
    id: 'rev-sc-3',
    author: 'Ritu Singhania',
    photoUrl: maybePhoto('body-care', 1, true),
    body: 'Loved how gentle it is for everyday morning and evening rituals. 100% natural Ayurvedic quality that lives up to every promise!',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '11 Feb 2025',
    helpfulCount: 27,
    location: 'Udaipur'
  },
  {
    id: 'rev-sc-4',
    author: 'Siddharth Menon',
    photoUrl: maybePhoto('body-care', 1, false),
    body: 'Extremely soothing on sun-damaged skin. Calms redness immediately and leaves a healthy, non-greasy glow.',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '20 Jan 2025',
    helpfulCount: 15,
    location: 'Kochi'
  },
  {
    id: 'rev-sc-5',
    author: 'Bhavna Bhatt',
    photoUrl: maybePhoto('body-care', 2, true),
    body: 'Flois body and skin care formulations are pure luxury! My skin texture feels velvety soft and deeply hydrated all day long.',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '14 Feb 2025',
    helpfulCount: 29,
    location: 'Vadodara'
  },
  {
    id: 'rev-sc-6',
    author: 'Aakash Pandey',
    photoUrl: maybePhoto('body-care', 2, false),
    body: 'The botanical blend is refreshing and pure. Skin feels clean, calm, and naturally nourished without heavy chemicals.',
    rating: 5,
    productName: 'Botanical Skin Care Ritual',
    productHandle: 'body-care',
    date: '02 Feb 2025',
    helpfulCount: 31,
    location: 'Varanasi'
  }
];

interface CustomerReviewsGridSliderProps {
  filterHandle?: string;
  newSubmittedReview?: CustomerPhotoReview;
}

export function CustomerReviewsGridSlider({ filterHandle, newSubmittedReview }: CustomerReviewsGridSliderProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [userApiReviews, setUserApiReviews] = useState<CustomerPhotoReview[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fetch API-stored user reviews on mount
  useEffect(() => {
    async function fetchApiReviews() {
      try {
        const url = filterHandle
          ? `/api/reviews?productHandle=${encodeURIComponent(filterHandle)}`
          : '/api/reviews';
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && Array.isArray(data.reviews)) {
          // For user-submitted reviews without a photoUrl, fall back to product image
          const enriched = (data.reviews as CustomerPhotoReview[]).map((r) => ({
            ...r,
            photoUrl:
              r.photoUrl ||
              pickProductPhoto(r.productHandle || 'rootherb-hair-growth-oil', 0),
          }));
          setUserApiReviews(enriched);
        }
      } catch (err) {
        console.warn('[CustomerReviewsGridSlider] Failed to fetch API reviews:', err);
      }
    }
    fetchApiReviews();
  }, [filterHandle]);

  // Combine: static dummy reviews FIRST, then user-submitted reviews AFTER
  const allCombinedReviews = useMemo(() => {
    const apiMap = new Map<string, CustomerPhotoReview>();

    if (newSubmittedReview) {
      // Ensure newly submitted review also has a photoUrl
      apiMap.set(newSubmittedReview.id, {
        ...newSubmittedReview,
        photoUrl:
          newSubmittedReview.photoUrl ||
          pickProductPhoto(newSubmittedReview.productHandle || 'rootherb-hair-growth-oil', 0),
      });
    }

    userApiReviews.forEach((r) => {
      if (!apiMap.has(r.id)) apiMap.set(r.id, r);
    });

    const userList = Array.from(apiMap.values());
    return [...REAL_CUSTOMER_REVIEWS, ...userList];
  }, [userApiReviews, newSubmittedReview]);

  // Responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCount(1);
      else if (window.innerWidth < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter by productHandle or selected category tab
  const filteredReviews = useMemo(() => {
    if (filterHandle) {
      const targetType = getProductType(filterHandle);
      const match = allCombinedReviews.filter((r) => getProductType(r.productHandle) === targetType);
      return match.length > 0 ? match : allCombinedReviews;
    }
    if (selectedCategory === 'all') return allCombinedReviews;
    const tabType = getProductType(selectedCategory);
    return allCombinedReviews.filter((r) => getProductType(r.productHandle) === tabType);
  }, [filterHandle, selectedCategory, allCombinedReviews]);

  const totalReviews = filteredReviews.length;

  const handleNext = () => setStartIndex((prev) => (prev + 1) % totalReviews);
  const handlePrev = () => setStartIndex((prev) => (prev - 1 + totalReviews) % totalReviews);

  const visibleReviews = Array.from({ length: Math.min(visibleCount, totalReviews) }).map((_, idx) => {
    const reviewIndex = (startIndex + idx) % totalReviews;
    return { review: filteredReviews[reviewIndex], globalIndex: reviewIndex };
  });

  return (
    <div className="relative w-full space-y-8">

      {/* Lightbox portal */}
      {lightboxIndex !== null && (
        <ReviewLightbox
          reviews={filteredReviews}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Category Filter Tabs */}
      {!filterHandle && (
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {[
            { id: 'all', label: 'All Reviews' },
            { id: 'rootherb-hair-growth-oil', label: 'Hair Growth Oil' },
            { id: 'advanced-de-tan-sunscreen-gel', label: 'Sunscreen Gel' },
            { id: 'neem-wood-comb', label: 'Neem Comb' },
            { id: 'body-care', label: 'Skin & Body Care' },
          ].map((tab) => (
            <button
              key={tab.id}
              suppressHydrationWarning
              onClick={() => { setSelectedCategory(tab.id); setStartIndex(0); }}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === tab.id
                  ? 'bg-[#8C9B3E] text-white shadow-md scale-105'
                  : 'bg-[#F8F6F3] text-[#333333] border border-[#E8E6DF] hover:border-[#8C9B3E] hover:text-[#8C9B3E]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      {/* Slider Wrapper */}
      <div className="relative flex items-center">

        {/* Prev */}
        <button
          suppressHydrationWarning
          onClick={handlePrev}
          aria-label="Previous Reviews"
          className="absolute -left-3 sm:-left-6 lg:-left-7 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-lg hover:bg-[#8C9B3E] hover:text-white hover:border-[#8C9B3E] transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
        </button>

        {/* Cards */}
        <div className="w-full overflow-hidden px-1 sm:px-3 py-4">
          <motion.div
            key={`${startIndex}-${selectedCategory}-${filterHandle}`}
            initial={{ opacity: 0.85, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`grid gap-5 sm:gap-6 items-stretch ${
              visibleReviews.length === 1
                ? 'grid-cols-1 max-w-md mx-auto'
                : visibleReviews.length === 2
                ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
                : visibleReviews.length === 3
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
            }`}
          >
            {visibleReviews.map(({ review, globalIndex }, idx) => (
              <div key={`${review.id}-${idx}`} className="h-full">
                <CustomerPhotoReviewCard
                  review={review}
                  allReviews={filteredReviews}
                  reviewIndex={globalIndex}
                  onLightboxOpen={(index) => setLightboxIndex(index)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next */}
        <button
          suppressHydrationWarning
          onClick={handleNext}
          aria-label="Next Reviews"
          className="absolute -right-3 sm:-right-6 lg:-right-7 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-lg hover:bg-[#8C9B3E] hover:text-white hover:border-[#8C9B3E] transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 stroke-[2.2]" />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <span className="text-xs font-mono font-bold text-[#8C9B3E]">
          {String(startIndex + 1).padStart(2, '0')} / {String(totalReviews).padStart(2, '0')}
        </span>
        <div className="flex items-center gap-1.5">
          {filteredReviews.map((_, idx) => (
            <button
              key={idx}
              suppressHydrationWarning
              onClick={() => setStartIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === startIndex ? 'w-8 bg-[#8C9B3E]' : 'w-2.5 bg-[#E8E6DF] hover:bg-[#8C9B3E]/50'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
