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

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const galleryImages = images && images.length > 0 ? images : [
    { url: '/products/rootherb_product.png', altText: title },
    { url: '/products/rootherb_ingredients_map.png', altText: `${title} Ingredients` },
    { url: '/products/editorial_story.jpg', altText: `${title} Lifestyle` },
  ];

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
              aria-label={`View image ${idx + 1} of ${galleryImages.length}`}
              className={`relative h-[72px] w-[72px] lg:h-20 lg:w-20 rounded-xl overflow-hidden bg-[#F5F4EF] border-2 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B644C] focus-visible:ring-offset-1 ${
                idx === selectedIndex
                  ? 'border-[#4B644C] shadow-sm'
                  : 'border-transparent hover:border-[#4B644C]/40 opacity-70 hover:opacity-100'
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${title} view ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover object-center"
              />
              {idx === selectedIndex && (
                <div className="absolute inset-0 ring-2 ring-inset ring-[#4B644C]/30 rounded-xl" />
              )}
            </button>
          ))}
        </div>

        {/* Main Image Stage */}
        <div
          className="relative flex-1 aspect-square sm:aspect-[4/4.5] rounded-2xl overflow-hidden bg-[#F5F4EF] group cursor-zoom-in"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={() => setIsFullscreen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={currentImage.url}
                alt={currentImage.altText || title}
                fill
                priority={selectedIndex === 0}
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 55vw, 680px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </motion.div>
          </AnimatePresence>

          {/* Zoom hint — top right */}
          <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1.5 rounded-full bg-white/80 backdrop-blur-sm px-2.5 py-1 text-[10px] font-medium text-[#4A4E4A] opacity-0 group-hover:opacity-100 transition-opacity shadow-sm pointer-events-none">
            <ZoomIn className="h-3 w-3" />
            <span>Zoom</span>
          </div>

          {/* Nav arrows — desktop hover */}
          {galleryImages.length > 1 && (
            <>
              <button
                suppressHydrationWarning
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm text-[#121412] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-md focus:outline-none focus-visible:opacity-100"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                suppressHydrationWarning
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/90 backdrop-blur-sm text-[#121412] flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-white transition-all shadow-md focus:outline-none focus-visible:opacity-100"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile: dot pagination */}
      {galleryImages.length > 1 && (
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {galleryImages.map((_, idx) => (
            <button
              suppressHydrationWarning
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              className={`rounded-full transition-all duration-300 ${
                idx === selectedIndex
                  ? 'w-5 h-2 bg-[#4B644C]'
                  : 'w-2 h-2 bg-[#4B644C]/30 hover:bg-[#4B644C]/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/96 backdrop-blur-xl flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close */}
            <button
              suppressHydrationWarning
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
              className="absolute top-5 right-5 z-10 h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-5 z-10 text-xs font-sans text-white/60 tracking-widest">
              {selectedIndex + 1} / {galleryImages.length}
            </span>

            {/* Main image */}
            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl max-h-[85vh] aspect-square sm:aspect-[4/3]"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={currentImage.url}
                alt={currentImage.altText || title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>

            {/* Lightbox arrows */}
            {galleryImages.length > 1 && (
              <>
                <button
                  suppressHydrationWarning
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  aria-label="Previous image"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  suppressHydrationWarning
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  aria-label="Next image"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus:outline-none"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            {/* Dot nav in lightbox */}
            <div className="absolute bottom-6 flex items-center gap-2">
              {galleryImages.map((_, idx) => (
                <button
                  suppressHydrationWarning
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setSelectedIndex(idx); }}
                  aria-label={`Image ${idx + 1}`}
                  className={`rounded-full transition-all ${
                    idx === selectedIndex ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
