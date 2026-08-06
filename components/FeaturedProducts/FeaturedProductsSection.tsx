'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { FeaturedProductCard } from './FeaturedProductCard';
import { QuickViewModal } from './QuickViewModal';
import { ProductPlaceholder } from './ProductPlaceholder';
import { useWishlist } from '@/context/WishlistContext';

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
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);

  const displayProducts = products && products.length > 0 ? products : [];

  return (
    <section className="relative w-full bg-[#FFFFFF] border-b border-[#E8E6DF] py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Subtle Botanical Atmosphere Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#FAF9F5] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="max-w-[700px] mx-auto text-center space-y-3.5 mb-16 sm:mb-20">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-[#4B644C]">
            {eyebrow}
          </span>
          
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
            {title}
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#525852] font-light leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {displayProducts.length > 0 ? (
            displayProducts.map((product, idx) => (
              <FeaturedProductCard
                key={product.id || product.handle}
                product={product}
                index={idx}
                isWishlisted={isInWishlist(product.handle)}
                onToggleWishlist={toggleWishlist}
                onOpenQuickView={(prod) => setSelectedQuickViewProduct(prod)}
              />
            ))
          ) : (
            <ProductPlaceholder />
          )}
        </div>
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
