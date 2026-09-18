'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Volume2, VolumeX, X, ShoppingCart, Check, Loader2, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export interface FloatingReel {
  id: string;
  videoUrl: string;
  posterUrl: string;
  title: string;
  author: string;
  handle: string;
  productName: string;
  productPrice: string;
  productImage: string;
}

const REELS_BY_HANDLE: Record<string, FloatingReel[]> = {
  'rootherb-hair-growth-oil': [
    {
      id: 'ho-1',
      videoUrl: '/hairoil-reel.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/2d86176c7fa246dcab2d58a9dec57970.thumbnail.0000000000.jpg?v=1785968756',
      title: 'Botanical Scalp Nourishment Routine',
      author: '@ananya_haircare',
      handle: 'rootherb-hair-growth-oil',
      productName: 'RootHerb™ Botanical Hair & Scalp Oil',
      productPrice: '₹699',
      productImage: '/products/rootherb_product.png',
    },
    {
      id: 'ho-2',
      videoUrl: '/reels/reel5_hairoil.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/af3026e37bb642faa0b7b50152970040.thumbnail.0000000000.jpg?v=1785968747',
      title: 'OleoKare® Powered Scalp Ritual',
      author: '@ayurvedic_wellness',
      handle: 'rootherb-hair-growth-oil',
      productName: 'RootHerb™ Botanical Hair & Scalp Oil',
      productPrice: '₹699',
      productImage: '/products/rootherb_product.png',
    },
    {
      id: 'ho-3',
      videoUrl: '/reels/reel7_hairoil.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/5d822e92f47f43aa806db808ee384902.thumbnail.0000000000.jpg?v=1785968755',
      title: 'Consistency With RootHerb Hair Oil',
      author: '@rohan_grooming',
      handle: 'rootherb-hair-growth-oil',
      productName: 'RootHerb™ Botanical Hair & Scalp Oil',
      productPrice: '₹699',
      productImage: '/products/rootherb_product.png',
    },
  ],
  'advanced-de-tan-sunscreen-gel': [
    {
      id: 'sg-1',
      videoUrl: '/reels/reel1_sunscreen.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/d7d8e4aad201423fa2567756ca61011f.thumbnail.0000000000.jpg?v=1785968750',
      title: 'Zero White Cast SPF 50+ Wear Test',
      author: '@shreya_skincare',
      handle: 'advanced-de-tan-sunscreen-gel',
      productName: 'Advanced De-Tan Sunscreen Gel SPF 50+',
      productPrice: '₹369',
      productImage: '/products/sunscreen_product.png',
    },
    {
      id: 'sg-2',
      videoUrl: '/reels/reel3_sunscreen.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/8aec48cb7e284311b5f96ae09a1f7fb0.thumbnail.0000000000.jpg?v=1785968745',
      title: 'De-Tanning UV Shield Texture Review',
      author: '@pratiksha_glow',
      handle: 'advanced-de-tan-sunscreen-gel',
      productName: 'Advanced De-Tan Sunscreen Gel SPF 50+',
      productPrice: '₹369',
      productImage: '/products/sunscreen_product.png',
    },
    {
      id: 'sg-3',
      videoUrl: '/reels/reel4_sunscreen.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/7c9a2561f258438eac57ac5ee424ac7b.thumbnail.0000000000.jpg?v=1785968751',
      title: 'My Daily Outdoor Sunscreen Routine',
      author: '@pooja_derma',
      handle: 'advanced-de-tan-sunscreen-gel',
      productName: 'Advanced De-Tan Sunscreen Gel SPF 50+',
      productPrice: '₹369',
      productImage: '/products/sunscreen_product.png',
    },
  ],
  'neem-wood-comb': [
    {
      id: 'nc-1',
      videoUrl: '/reels/reel8_hairoil.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/ee9627b4a46b4d1da31edc4323f25117.thumbnail.0000000000.jpg?v=1785968746',
      title: 'Handcrafted Neem Comb Detangling Demo',
      author: '@natural_hair_care',
      handle: 'neem-wood-comb',
      productName: 'Handcrafted Neem Wood Comb',
      productPrice: '₹119',
      productImage: '/products/neem_comb_product.png',
    },
    {
      id: 'nc-2',
      videoUrl: '/reels/reel2_hairoil.mp4',
      posterUrl: 'https://cdn.shopify.com/s/files/1/0675/1502/3447/files/preview_images/2d86176c7fa246dcab2d58a9dec57970.thumbnail.0000000000.jpg?v=1785968756',
      title: 'Low-Static Scalp Massage Ritual',
      author: '@ayurvedic_rituals',
      handle: 'neem-wood-comb',
      productName: 'Handcrafted Neem Wood Comb',
      productPrice: '₹119',
      productImage: '/products/neem_comb_product.png',
    },
  ],
};

import { getProductType } from '@/lib/productClassifier';

function getReelsForHandle(handle: string): FloatingReel[] {
  const type = getProductType(handle);
  if (type === 'sunscreen') {
    return REELS_BY_HANDLE['advanced-de-tan-sunscreen-gel'];
  }
  if (type === 'comb') {
    return REELS_BY_HANDLE['neem-wood-comb'];
  }
  return REELS_BY_HANDLE['rootherb-hair-growth-oil'];
}

interface Props {
  productHandle: string;
}

export function ProductStoryFloatingWidget({ productHandle }: Props) {
  const reels = getReelsForHandle(productHandle);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { addItem, openCart } = useCart();
  const [cartState, setCartState] = useState<'idle' | 'loading' | 'added'>('idle');

  const currentReel = reels[activeReelIndex] || reels[0];

  // Scroll detection to transform between Circle (top) & 9:16 Vertical Card (scrolled)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 220) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartState !== 'idle') return;
    setCartState('loading');
    try {
      const res = await fetch(`/api/product-variant?handle=${currentReel.handle}`);
      const data = await res.json();
      if (data?.variantId) {
        await addItem(data.variantId, 1);
        setCartState('added');
        openCart();
        setTimeout(() => setCartState('idle'), 2500);
      } else {
        window.location.href = `/products/${currentReel.handle}`;
      }
    } catch {
      window.location.href = `/products/${currentReel.handle}`;
    }
  };

  if (isDismissed) return null;

  return (
    <>
      {/* ── FLOATING CORNER WIDGET (Circle when top, 9:16 Vertical when scrolled) ── */}
      <AnimatePresence>
        {!isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-20 left-4 sm:bottom-7 sm:left-7 z-40 select-none cursor-pointer group"
          >
            {/* Close button on widget */}
            <button
              suppressHydrationWarning
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              aria-label="Dismiss Story Widget"
              className="absolute -top-2 -right-2 z-30 h-6 w-6 rounded-full bg-[#111111] text-white flex items-center justify-center border border-white/40 shadow-md hover:scale-110 transition-transform"
            >
              <X className="h-3 w-3" />
            </button>

            {/* CIRCLE INSTA STORY WIDGET (when near top of page) */}
            {!isScrolled ? (
              <motion.div
                key="circle-widget"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                onClick={() => setIsLightboxOpen(true)}
                className="relative flex items-center gap-3 p-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:shadow-[0_16px_50px_rgba(140,155,62,0.3)] transition-all duration-300 hover:scale-105"
              >
                {/* Pulsing Gradient Story Ring */}
                <div className="relative p-[2.5px] rounded-full bg-gradient-to-tr from-[#F09433] via-[#DC2743] to-[#BC1888] animate-pulse">
                  <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-full overflow-hidden bg-black border-2 border-white">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      poster={currentReel.posterUrl}
                      className="w-full h-full object-cover"
                    >
                      <source src={currentReel.videoUrl} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <Play className="h-4 w-4 fill-white text-white drop-shadow" />
                    </div>
                  </div>
                </div>

                {/* Text Label */}
                <div className="pr-3 text-left hidden sm:block">
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#8C9B3E] animate-ping" />
                    <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8C9B3E]">
                      WATCH REEL
                    </span>
                  </div>
                  <p className="font-sans font-bold text-xs text-[#111111] leading-tight line-clamp-1 max-w-[120px]">
                    {currentReel.title}
                  </p>
                </div>
              </motion.div>
            ) : (
              /* 9:16 VERTICAL CARD WIDGET (when scrolled down) */
              <motion.div
                key="vertical-widget"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                onClick={() => setIsLightboxOpen(true)}
                className="relative w-[100px] sm:w-[115px] aspect-[9/15] rounded-2xl overflow-hidden bg-black border-2 border-white shadow-[0_16px_50px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform duration-300"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={currentReel.posterUrl}
                  className="w-full h-full object-cover"
                >
                  <source src={currentReel.videoUrl} type="video/mp4" />
                </video>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

                {/* Live Badge */}
                <div className="absolute top-2 left-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/60 backdrop-blur-md px-1.5 py-0.5 text-[8px] font-sans font-bold text-white uppercase tracking-wider">
                    <Sparkles className="h-2 w-2 text-[#8C9B3E]" />
                    REEL
                  </span>
                </div>

                {/* Play Button Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="h-3.5 w-3.5 fill-white translate-x-0.5" />
                </div>

                {/* Bottom title */}
                <div className="absolute bottom-2 left-2 right-2 text-left">
                  <p className="text-[9px] font-sans font-bold text-white leading-tight line-clamp-2 drop-shadow-md">
                    {currentReel.title}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FULL-SCREEN RESPONSIVE LIGHTBOX MODAL ── */}
      <AnimatePresence>
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[380px] aspect-[9/16] max-h-[85vh] rounded-[28px] overflow-hidden bg-black shadow-2xl border border-white/20 flex flex-col justify-between p-5"
            >
              {/* Fullscreen Video */}
              <video
                autoPlay
                loop
                muted={isMuted}
                playsInline
                poster={currentReel.posterUrl}
                className="absolute inset-0 w-full h-full object-cover object-center"
              >
                <source src={currentReel.videoUrl} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none" />

              {/* Top Controls Bar */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  <div className="h-5 w-5 rounded-full bg-[#8C9B3E] text-white flex items-center justify-center text-[10px] font-bold">
                    F
                  </div>
                  <span className="text-[11px] font-sans font-bold text-white tracking-wider">
                    {currentReel.author}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    suppressHydrationWarning
                    onClick={() => setIsMuted(!isMuted)}
                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4 text-[#8C9B3E]" />}
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setIsLightboxOpen(false)}
                    className="h-9 w-9 rounded-full bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Next/Prev Navigation */}
              {reels.length > 1 && (
                <div className="relative z-10 flex items-center justify-between pointer-events-none px-1">
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveReelIndex((prev) => (prev - 1 + reels.length) % reels.length)}
                    className="pointer-events-auto h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveReelIndex((prev) => (prev + 1) % reels.length)}
                    className="pointer-events-auto h-9 w-9 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}

              {/* Bottom Product Info + Add To Cart */}
              <div className="relative z-10 space-y-3">
                <p className="text-white font-sans text-xs font-semibold drop-shadow-md">
                  {currentReel.title}
                </p>

                <div className="p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-white p-1 overflow-hidden flex-shrink-0">
                    <img
                      src={currentReel.productImage}
                      alt={currentReel.productName}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-sans font-bold text-white leading-tight line-clamp-1">
                      {currentReel.productName}
                    </p>
                    <p className="text-[11px] font-sans font-semibold text-[#8C9B3E] pt-0.5">
                      {currentReel.productPrice}
                    </p>
                  </div>

                  <button
                    suppressHydrationWarning
                    onClick={handleAddToCart}
                    disabled={cartState !== 'idle'}
                    className={`px-3 py-2 rounded-xl font-sans font-bold text-[11px] flex items-center gap-1.5 transition-all ${
                      cartState === 'added'
                        ? 'bg-[#4CAF50] text-white'
                        : 'bg-[#8C9B3E] hover:bg-[#7A8A34] text-white shadow-md'
                    }`}
                  >
                    {cartState === 'loading' ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : cartState === 'added' ? (
                      <Check className="h-3 w-3 stroke-[3]" />
                    ) : (
                      <ShoppingCart className="h-3 w-3" />
                    )}
                    <span>{cartState === 'added' ? 'Added' : 'Add'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
