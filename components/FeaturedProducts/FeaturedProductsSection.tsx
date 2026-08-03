'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { FeaturedProductCard } from './FeaturedProductCard';
import { QuickViewModal } from './QuickViewModal';
import { ProductPlaceholder } from './ProductPlaceholder';
import { useWishlist } from '@/hooks/useProducts';

interface FeaturedProductsSectionProps {
  products?: Product[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
}

export function FeaturedProductsSection({
  products = [],
  eyebrow = 'Flagship Collection',
  title = 'Discover Our Signature Essentials',
  subtitle = 'Clinically crafted botanical essentials designed for healthier hair and skin.'
}: FeaturedProductsSectionProps) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section className="relative w-full bg-[#FFFFFF] border-b border-[#E8E6DF] py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Subtle Botanical Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FAF9F5] rounded-full blur-3xl opacity-60 pointer-events-none -z-10" />

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <div className="max-w-[700px] mx-auto text-center space-y-4 mb-16 sm:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5">
            <span className="h-[1px] w-6 bg-[#4B644C]" />
            <span className="text-xs font-sans font-semibold uppercase tracking-widest text-[#4B644C]">
              {eyebrow}
            </span>
            <span className="text-[#4B644C] text-xs">❦</span>
            <span className="h-[1px] w-6 bg-[#4B644C]" />
          </div>

          {/* Heading */}
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {title}
          </h2>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-sans text-[#4A4E4A] leading-relaxed max-w-xl mx-auto font-light">
            {subtitle}
          </p>
        </div>

        {/* Product Showcase Presentation */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {displayProducts.map((product, idx) => (
              <FeaturedProductCard
                key={product.id || product.handle}
                product={product}
                index={idx}
                isWishlisted={isWishlisted(product.handle)}
                onToggleWishlist={toggleWishlist}
                onOpenQuickView={(prod) => setSelectedQuickViewProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <ProductPlaceholder />
        )}
      </div>

      {/* Interactive Quick View Modal */}
      <QuickViewModal
        product={selectedQuickViewProduct}
        isOpen={Boolean(selectedQuickViewProduct)}
        onClose={() => setSelectedQuickViewProduct(null)}
      />
    </section>
  );
}
