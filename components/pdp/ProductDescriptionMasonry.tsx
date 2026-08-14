'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import { Product } from '@/types/product';

/**
 * Extracts all image URLs directly embedded inside Shopify descriptionHtml
 */
function extractDescriptionImages(descriptionHtml?: string): string[] {
  if (!descriptionHtml) return [];

  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  const urls: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = imgRegex.exec(descriptionHtml)) !== null) {
    const src = match[1];
    if (
      src &&
      !src.includes('pixel') &&
      !src.includes('tracking') &&
      !src.includes('1x1') &&
      !urls.includes(src)
    ) {
      urls.push(src);
    }
  }

  return urls;
}

export function ProductDescriptionMasonry({ product }: { product: Product }) {
  const descriptionImages = useMemo(() => {
    return extractDescriptionImages(product?.descriptionHtml);
  }, [product?.descriptionHtml]);

  const [activeModalImage, setActiveModalImage] = useState<string | null>(null);

  // If there are NO images directly inside Shopify's descriptionHtml, do NOT render masonry grid at all!
  if (!descriptionImages || descriptionImages.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#FAF9F5] py-14 sm:py-20 border-b border-[#E8E6DF] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Auto-Adjustable CSS Column Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 sm:gap-6 space-y-4 sm:space-y-6">
          {descriptionImages.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              onClick={() => setActiveModalImage(src)}
              className="break-inside-avoid relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white border border-[#E8E6DF] shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group"
            >
              {/* Natural aspect ratio image with zero artificial container box */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${product.title || 'Product'} description image ${idx + 1}`}
                loading="lazy"
                className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Minimal Zoom Hover Overlay */}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white pointer-events-none">
                <span className="h-10 w-10 rounded-full bg-white/40 backdrop-blur-md border border-white/50 flex items-center justify-center text-white shadow-lg">
                  <ZoomIn className="h-5 w-5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Full View */}
      <AnimatePresence>
        {activeModalImage && (
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-8"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl h-[85vh] rounded-3xl overflow-hidden bg-black border border-white/20 shadow-2xl flex flex-col justify-between p-4"
            >
              {/* Close Button */}
              <button
                suppressHydrationWarning
                onClick={() => setActiveModalImage(null)}
                aria-label="Close Lightbox"
                className="absolute top-4 right-4 z-20 h-10 w-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors flex items-center justify-center border border-white/30"
              >
                <X className="h-5 w-5" />
              </button>

              {/* Enlarged Image */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalImage}
                  alt="Enlarged description view"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
