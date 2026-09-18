'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Play, Pause, X,
  Sparkles, Volume2, VolumeX, ShoppingCart, Check, Loader2
} from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

/* ─── Types ───────────────────────────────────────────────────── */
export interface ProductBadgeInfo {
  name: string;
  price: string;
  compareAtPrice?: string;
  href: string;
  /** Product image from public/products */
  image: string;
  /** Shopify product handle – used to resolve variant ID on add-to-cart */
  handle: string;
}

export interface ReelStory {
  id: string;
  instagramPostUrl: string;
  thumbnailUrl: string;
  videoUrl: string;
  product: ProductBadgeInfo;
}

/* ─── Reel Data – all 8 real reels from public/reels/ ─────────── */
export const GETFLOIS_REELS_DATA: ReelStory[] = [
  {
    id: 'DblH9bqzJqS',
    instagramPostUrl: 'https://www.instagram.com/p/DblH9bqzJqS/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/d7d8e4aad201423fa2567756ca61011f.thumbnail.0000000000.jpg?v=1785968750',
    videoUrl: '/reels/reel1_sunscreen.mp4',
    product: {
      name: 'Advanced De-Tan Sunscreen Gel',
      price: '₹369',
      compareAtPrice: '₹699',
      href: '/products/advanced-de-tan-sunscreen-gel',
      image: '/products/sunscreen_product.png',
      handle: 'advanced-de-tan-sunscreen-gel'
    }
  },
  {
    id: 'Dba2I21tVNV',
    instagramPostUrl: 'https://www.instagram.com/p/Dba2I21tVNV/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/2d86176c7fa246dcab2d58a9dec57970.thumbnail.0000000000.jpg?v=1785968756',
    videoUrl: '/hairoil-reel.mp4',
    product: {
      name: 'RootHerb Botanical Hair & Scalp Oil',
      price: '₹699',
      compareAtPrice: '₹899',
      href: '/products/rootherb-hair-growth-oil',
      image: '/products/rootherb_product.png',
      handle: 'rootherb-hair-growth-oil'
    }
  },
  {
    id: 'DbX7f1avKva',
    instagramPostUrl: 'https://www.instagram.com/p/DbX7f1avKva/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/8aec48cb7e284311b5f96ae09a1f7fb0.thumbnail.0000000000.jpg?v=1785968745',
    videoUrl: '/reels/reel3_sunscreen.mp4',
    product: {
      name: 'Advanced De-Tan Sunscreen Gel',
      price: '₹369',
      compareAtPrice: '₹699',
      href: '/products/advanced-de-tan-sunscreen-gel',
      image: '/products/sunscreen_product.png',
      handle: 'advanced-de-tan-sunscreen-gel'
    }
  },
  {
    id: 'DbVjbv_TyiF',
    instagramPostUrl: 'https://www.instagram.com/p/DbVjbv_TyiF/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/7c9a2561f258438eac57ac5ee424ac7b.thumbnail.0000000000.jpg?v=1785968751',
    videoUrl: '/reels/reel4_sunscreen.mp4',
    product: {
      name: 'Advanced De-Tan Sunscreen Gel',
      price: '₹369',
      compareAtPrice: '₹699',
      href: '/products/advanced-de-tan-sunscreen-gel',
      image: '/products/sunscreen_product.png',
      handle: 'advanced-de-tan-sunscreen-gel'
    }
  },
  {
    id: 'DbN3KlepFQP',
    instagramPostUrl: 'https://www.instagram.com/p/DbN3KlepFQP/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/af3026e37bb642faa0b7b50152970040.thumbnail.0000000000.jpg?v=1785968747',
    videoUrl: '/reels/reel5_hairoil.mp4',
    product: {
      name: 'RootHerb Botanical Hair & Scalp Oil',
      price: '₹699',
      compareAtPrice: '₹899',
      href: '/products/rootherb-hair-growth-oil',
      image: '/products/rootherb_product.png',
      handle: 'rootherb-hair-growth-oil'
    }
  },
  {
    id: 'DbN1jTTzW_Q',
    instagramPostUrl: 'https://www.instagram.com/p/DbN1jTTzW_Q/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/e709f3c91f1f4f7c9fdee3be4d17990e.thumbnail.0000000000.jpg?v=1785968740',
    videoUrl: '/reels/reel6_sunscreen.mp4',
    product: {
      name: 'Advanced De-Tan Sunscreen Gel',
      price: '₹369',
      compareAtPrice: '₹699',
      href: '/products/advanced-de-tan-sunscreen-gel',
      image: '/products/sunscreen_product.png',
      handle: 'advanced-de-tan-sunscreen-gel'
    }
  },
  {
    id: 'DbDrMeLO_fC',
    instagramPostUrl: 'https://www.instagram.com/p/DbDrMeLO_fC/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/5d822e92f47f43aa806db808ee384902.thumbnail.0000000000.jpg?v=1785968755',
    videoUrl: '/reels/reel7_hairoil.mp4',
    product: {
      name: 'RootHerb Botanical Hair & Scalp Oil',
      price: '₹699',
      compareAtPrice: '₹899',
      href: '/products/rootherb-hair-growth-oil',
      image: '/products/rootherb_product.png',
      handle: 'rootherb-hair-growth-oil'
    }
  },
  {
    id: 'DbA814kJFSi',
    instagramPostUrl: 'https://www.instagram.com/p/DbA814kJFSi/',
    thumbnailUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/ee9627b4a46b4d1da31edc4323f25117.thumbnail.0000000000.jpg?v=1785968746',
    videoUrl: '/reels/reel8_hairoil.mp4',
    product: {
      name: 'RootHerb Botanical Hair & Scalp Oil',
      price: '₹699',
      compareAtPrice: '₹899',
      href: '/products/rootherb-hair-growth-oil',
      image: '/products/rootherb_product.png',
      handle: 'rootherb-hair-growth-oil'
    }
  }
];

/* ─── Add To Cart Button ──────────────────────────────────────── */
function AddToCartButton({ product }: { product: ProductBadgeInfo }) {
  const { addItem, openCart } = useCart();
  const [state, setState] = useState<'idle' | 'loading' | 'added'>('idle');

  const handleAdd = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (state !== 'idle') return;

    setState('loading');
    try {
      // Fetch variant ID via Shopify Storefront API (server action)
      const res = await fetch(`/api/product-variant?handle=${product.handle}`);
      const json = await res.json();
      const variantId: string | undefined = json?.variantId;

      if (variantId) {
        await addItem(variantId, 1);
        setState('added');
        openCart();
        setTimeout(() => setState('idle'), 2500);
      } else {
        // Fallback: open product page
        window.location.href = product.href;
      }
    } catch {
      window.location.href = product.href;
    }
  };

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={handleAdd}
      disabled={state !== 'idle'}
      className={`w-full py-2.5 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300
        ${state === 'added'
          ? 'bg-[#4CAF50] border border-[#4CAF50] text-white'
          : 'bg-[#111111] hover:bg-[#8C9B3E] border border-[#111111] hover:border-[#8C9B3E] text-white hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md'
        }`}
    >
      {state === 'loading' ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          <span>Adding…</span>
        </>
      ) : state === 'added' ? (
        <>
          <Check className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Added to Cart</span>
        </>
      ) : (
        <>
          <ShoppingCart className="h-3.5 w-3.5" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}

interface ReelStoriesSectionProps {
  productType?: 'hair-oil' | 'sunscreen' | 'comb';
}

/* ─── Main Section ────────────────────────────────────────────── */
export function ReelStoriesSection({ productType }: ReelStoriesSectionProps = {}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedReel, setSelectedReel] = useState<ReelStory | null>(null);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isMuted, setIsMuted] = useState(true);

  const displayReels = React.useMemo(() => {
    if (!productType) return GETFLOIS_REELS_DATA;
    if (productType === 'sunscreen') {
      return GETFLOIS_REELS_DATA.filter((r) => r.product.handle.includes('sunscreen'));
    }
    if (productType === 'comb') {
      return GETFLOIS_REELS_DATA.filter((r) => r.product.handle.includes('comb'));
    }
    return GETFLOIS_REELS_DATA.filter((r) => r.product.handle.includes('rootherb') || r.product.handle.includes('hair'));
  }, [productType]);

  const totalReels = displayReels.length;

  // Responsive visible cards count
  useEffect(() => {
    if (totalReels === 0) return;
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1.2);
      else if (window.innerWidth < 1024) setVisibleCards(2.4);
      else setVisibleCards(Math.min(4, totalReels));
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [totalReels]);

  const handleNext = useCallback(() => {
    if (totalReels === 0) return;
    setCurrentIndex((prev) => (prev + 1) % totalReels);
  }, [totalReels]);

  const handlePrev = useCallback(() => {
    if (totalReels === 0) return;
    setCurrentIndex((prev) => (prev - 1 + totalReels) % totalReels);
  }, [totalReels]);

  // Autoplay every 4 s — pauses when modal is open
  useEffect(() => {
    if (!isPlaying || selectedReel !== null || totalReels === 0) return;
    const interval = setInterval(handleNext, 4000);
    return () => clearInterval(interval);
  }, [isPlaying, selectedReel, handleNext, totalReels]);

  if (totalReels === 0) {
    return null;
  }

  const getVisibleReels = () => {
    const numCards = Math.ceil(visibleCards);
    return Array.from({ length: numCards }).map((_, i) => {
      const idx = (currentIndex + i) % totalReels;
      return { reel: displayReels[idx], idx };
    });
  };

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 overflow-hidden border-b border-[#E8E6DF]">

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[550px] bg-[#F2F4E6]/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14">

        {/* Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F4E6] border border-[#E0E4B3] text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C9B3E]">
            <Sparkles className="h-3 w-3 text-[#8C9B3E]" />
            <span>Real Customer Reels</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#111111]">
            FLOIS In Real Life — Customer Reels
          </h2>

          <p className="text-base font-sans text-[#333333] font-light max-w-xl mx-auto leading-relaxed">
            Real results, real people. Watch authentic customer reels and shop the products they love.
          </p>
        </div>

        {/* Carousel */}
        <div
          className="relative px-2 sm:px-6"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Left arrow */}
          <button
            suppressHydrationWarning
            onClick={handlePrev}
            aria-label="Previous Reel"
            className="absolute -left-2 sm:left-1 top-[40%] -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-lg hover:bg-[#8C9B3E] hover:text-white hover:border-[#8C9B3E] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
          </button>

          {/* Cards Track */}
          <div className="w-full overflow-hidden py-4">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0.9, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 items-stretch"
            >
              {getVisibleReels().map(({ reel, idx }) => (
                <div
                  key={`${reel.id}-${idx}`}
                  className="group relative rounded-[24px] sm:rounded-[28px] overflow-hidden bg-white border border-[#E8E6DF] shadow-[0_10px_35px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(140,155,62,0.18)] hover:border-[#8C9B3E] hover:-translate-y-1.5 transition-all duration-500 flex flex-col"
                >
                  {/* ── Reel Video Area ── */}
                  <div
                    onClick={() => setSelectedReel(reel)}
                    className="relative cursor-pointer aspect-[9/14] w-full overflow-hidden bg-[#111111]"
                  >
                    {/* Autoplay video */}
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={reel.thumbnailUrl}
                      className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    >
                      <source src={reel.videoUrl} type="video/mp4" />
                    </video>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/25 pointer-events-none" />

                    {/* Live pill */}
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-black/55 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-sans font-semibold text-white border border-white/20">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8C9B3E] animate-pulse" />
                        FLOIS Reels
                      </span>
                    </div>

                    {/* Center play button */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-xl opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                      <Play className="h-5 w-5 fill-white text-white translate-x-0.5" />
                    </div>

                    {/* Bottom caption */}
                    <div className="absolute bottom-3 left-3 right-3 z-10">
                      <p className="text-white font-sans text-[11px] font-semibold line-clamp-2 leading-snug drop-shadow-md">
                        {reel.product.name}
                      </p>
                    </div>
                  </div>

                  {/* ── Product Card Below Reel ── */}
                  <div className="p-3 sm:p-3.5 bg-white flex flex-col gap-3 flex-1">

                    {/* Product info row */}
                    <div className="flex items-center gap-2.5">
                      {/* Product image */}
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] overflow-hidden flex-shrink-0 p-1">
                        <img
                          src={reel.product.image}
                          alt={reel.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-sans text-xs sm:text-[13px] font-semibold text-[#111111] line-clamp-2 leading-snug">
                          {reel.product.name}
                        </h4>
                        <div className="flex items-center gap-1.5 pt-1">
                          <span className="font-sans text-sm font-bold text-[#8C9B3E]">
                            {reel.product.price}
                          </span>
                          {reel.product.compareAtPrice && (
                            <span className="font-sans text-[11px] text-[#999999] line-through">
                              {reel.product.compareAtPrice}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Add to Cart button */}
                    <AddToCartButton product={reel.product} />

                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right arrow */}
          <button
            suppressHydrationWarning
            onClick={handleNext}
            aria-label="Next Reel"
            className="absolute -right-2 sm:right-1 top-[40%] -translate-y-1/2 z-20 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white border border-[#E8E6DF] text-[#111111] shadow-lg hover:bg-[#8C9B3E] hover:text-white hover:border-[#8C9B3E] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Progress dots + play/pause */}
        <div className="flex items-center justify-center gap-4 pt-6">
          <button
            suppressHydrationWarning
            onClick={() => setIsPlaying(!isPlaying)}
            aria-label={isPlaying ? 'Pause Autoplay' : 'Play Autoplay'}
            className="h-8 w-8 rounded-full bg-white border border-[#E8E6DF] text-[#111111] flex items-center justify-center hover:bg-[#8C9B3E] hover:text-white transition-colors"
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 fill-current" />}
          </button>

          <span className="text-xs font-mono font-bold text-[#8C9B3E]">
            {String(currentIndex + 1).padStart(2, '0')} / {String(totalReels).padStart(2, '0')}
          </span>

          <div className="flex items-center gap-1.5">
            {GETFLOIS_REELS_DATA.map((_, i) => (
              <button
                key={i}
                suppressHydrationWarning
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to reel ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-7 bg-[#8C9B3E]' : 'w-2 bg-[#E8E6DF] hover:bg-[#8C9B3E]/50'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedReel && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm aspect-[9/16] rounded-[28px] overflow-hidden bg-black shadow-2xl border border-white/20 flex flex-col justify-between p-5"
            >
              {/* Modal video */}
              <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                controls
                poster={selectedReel.thumbnailUrl}
                className="absolute inset-0 w-full h-full object-cover object-center"
              >
                <source src={selectedReel.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

              {/* Top controls */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#8C9B3E] flex items-center justify-center text-white font-bold text-xs font-serif shadow-md">
                    F
                  </div>
                  <span className="text-xs font-sans font-bold text-white tracking-wider">FLOIS Official Reel</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setSelectedReel(null)}
                    className="h-9 w-9 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Bottom product card */}
              <div className="relative z-10 space-y-3">
                <div className="p-3 rounded-2xl bg-black/65 backdrop-blur-md border border-white/20 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white p-1 overflow-hidden flex-shrink-0">
                    <img
                      src={selectedReel.product.image}
                      alt={selectedReel.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-bold text-white leading-tight line-clamp-1">
                      {selectedReel.product.name}
                    </p>
                    <p className="text-[11px] font-sans text-[#8C9B3E] font-semibold pt-0.5">
                      {selectedReel.product.price}
                    </p>
                  </div>
                  <AddToCartButton product={selectedReel.product} />
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
