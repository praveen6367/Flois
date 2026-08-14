'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Maximize2, ZoomIn } from 'lucide-react';
import { ShopifyImage } from '@/types/shopify';

interface ImageGalleryProps {
  images: ShopifyImage[];
  title: string;
}

function getDefaultImages(title: string): { url: string; altText: string }[] {
  const t = title.toLowerCase();

  if (t.includes('sunscreen') || t.includes('tan') || t.includes('spf')) {
    return [
      { url: '/products/sunscreen_product.png', altText: `${title} Product Tube` },
      { url: '/products/editorial_sunscreen.jpg', altText: `${title} Formulation` },
      { url: '/products/texture_sunscreen.jpg', altText: `${title} Texture` },
    ];
  }

  if (t.includes('neem') || t.includes('comb')) {
    return [
      { url: '/products/neem_comb_product.png', altText: `${title} Product` },
      { url: '/products/editorial_neem_comb.jpg', altText: `${title} Artisan Craft` },
      { url: '/products/texture_neem_comb.jpg', altText: `${title} Wood Texture` },
    ];
  }

  if (t.includes('body') || t.includes('skin') || t.includes('care')) {
    return [
      { url: '/products/botanical_ingredients.jpg', altText: `${title} Botanical Ingredients` },
      { url: '/products/editorial_story.jpg', altText: `${title} Lifestyle` },
      { url: '/products/texture_macro.jpg', altText: `${title} Texture` },
    ];
  }

  // Default: Hair Growth Oil
  return [
    { url: '/products/rootherb_product.png', altText: `${title} Product Bottle` },
    { url: '/products/rootherb_ingredients_map.png', altText: `${title} Formulation Map` },
    { url: '/products/editorial_rootherb.jpg', altText: `${title} Lifestyle` },
  ];
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const fallbackImages = getDefaultImages(title);
  const galleryImages = images && images.length > 0 ? images : fallbackImages;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const currentImage = galleryImages[selectedIndex] || galleryImages[0];

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isFullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen, handleNext, handlePrev]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? handleNext() : handlePrev();
    }
    touchStartX.current = null;
  };

  return (
    <div className="w-full">
      {/* Desktop: side-by-side thumbnails + main image */}
      <div className="flex flex-col md:flex-row gap-3 sm:gap-4">

        {/* Thumbnail Column — desktop only */}
        <div className="hidden md:flex md:flex-col gap-2.5 shrink-0">
          {galleryImages.map((img, idx) => (
            <button
              suppressHydrationWarning
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-20 w-20 sm:h-22 sm:w-22 rounded-2xl overflow-hidden bg-[#FAF9F5] border-2 transition-all duration-300 ${
                selectedIndex === idx
                  ? 'border-[#8C9B3E] shadow-md scale-105'
                  : 'border-[#E8E6DF] opacity-70 hover:opacity-100 hover:border-[#8C9B3E]/50'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || title}
                fill
                sizes="88px"
                className="object-contain p-1.5"
              />
            </button>
          ))}
        </div>

        {/* Main Display Image */}
        <div
          className="relative flex-1 aspect-[4/5] sm:aspect-[1/1] rounded-3xl overflow-hidden bg-[#FAF9F5] border border-[#E8E6DF] shadow-md group cursor-zoom-in"
          onClick={() => setIsFullscreen(true)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={currentImage.url}
            alt={currentImage.altText || title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
            className={`object-contain p-4 sm:p-6 transition-transform duration-700 ${
              isZoomed ? 'scale-150' : 'group-hover:scale-105'
            }`}
          />

          {/* Top-Right Action Controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
            <button
              suppressHydrationWarning
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              aria-label={isZoomed ? 'Zoom Out' : 'Zoom In'}
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E6DF] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
            >
              <ZoomIn className="h-4 w-4" />
            </button>
            <button
              suppressHydrationWarning
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              aria-label="Expand Fullscreen Gallery"
              className="h-10 w-10 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E6DF] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>

          {/* Bottom-Left Image Counter */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="inline-block text-[10px] font-sans font-semibold tracking-widest text-[#111111] bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-[#E8E6DF] shadow-xs">
              {selectedIndex + 1} / {galleryImages.length}
            </span>
          </div>

          {/* Mobile Arrows Overlay */}
          {galleryImages.length > 1 && (
            <div className="md:hidden">
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                aria-label="Previous Image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E6DF] flex items-center justify-center text-[#111111] shadow-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                aria-label="Next Image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/80 backdrop-blur-md border border-[#E8E6DF] flex items-center justify-center text-[#111111] shadow-md"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Horizontal Thumbnail Row */}
      <div className="flex md:hidden items-center justify-center gap-2 mt-3 overflow-x-auto pb-1">
        {galleryImages.map((img, idx) => (
          <button
            suppressHydrationWarning
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative h-16 w-16 rounded-xl overflow-hidden bg-[#FAF9F5] border-2 transition-all shrink-0 ${
              selectedIndex === idx ? 'border-[#8C9B3E] shadow-sm' : 'border-[#E8E6DF] opacity-60'
            }`}
          >
            <Image
              src={img.url}
              alt={img.altText || title}
              fill
              sizes="64px"
              className="object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Overlay */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              suppressHydrationWarning
              onClick={() => setIsFullscreen(false)}
              aria-label="Close Lightbox"
              className="absolute top-6 right-6 z-20 h-11 w-11 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center border border-white/30"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Lightbox Image Container */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl h-[75vh] sm:h-[85vh] flex items-center justify-center"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.altText || title}
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Lightbox Controls */}
            {galleryImages.length > 1 && (
              <>
                <button
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center border border-white/30"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  suppressHydrationWarning
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-all flex items-center justify-center border border-white/30"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 font-mono text-xs">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
