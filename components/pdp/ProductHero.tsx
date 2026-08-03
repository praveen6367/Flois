'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImageGallery } from './ImageGallery';
import { PurchasePanel } from './PurchasePanel';
import { Product } from '@/types/product';
import { ChevronRight } from 'lucide-react';

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  const images = product.images?.nodes || [];
  const purchaseRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full bg-[#FAFAF8] pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-10 lg:pb-20">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 mb-6 sm:mb-8 text-[11px] font-sans text-[#9A9E9A]"
        >
          <Link href="/" className="hover:text-[#4B644C] transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3 text-[#C4C0B8]" />
          <Link href="/shop" className="hover:text-[#4B644C] transition-colors">Shop</Link>
          <ChevronRight className="h-3 w-3 text-[#C4C0B8]" />
          <span className="text-[#4A4E4A] font-medium truncate max-w-[180px] sm:max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-start">
          
          {/* Left: Gallery — 7 cols */}
          <div className="lg:col-span-7">
            <ImageGallery images={images} title={product.title} />
          </div>

          {/* Right: Purchase Panel — 5 cols, sticky */}
          <div
            ref={purchaseRef}
            id="purchase-panel"
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <PurchasePanel product={product} />
          </div>

        </div>
      </div>
    </section>
  );
}
