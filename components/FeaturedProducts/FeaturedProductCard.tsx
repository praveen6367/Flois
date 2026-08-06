'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types/product';
import { ProductImage } from './ProductImage';
import { ProductBadge } from './ProductBadge';
import { ProductActions } from './ProductActions';
import { Price } from './Price';
import { QuickAdd } from './QuickAdd';

interface FeaturedProductCardProps {
  product: Product;
  index: number;
  isWishlisted: boolean;
  onToggleWishlist: (handle: string) => void;
  onOpenQuickView: (product: Product) => void;
}

export function FeaturedProductCard({
  product,
  index,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView
}: FeaturedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const images = product.images?.nodes || [];
  const primaryImage = product.featuredImage || images[0] || null;
  const secondaryImage = images[1] || null;

  const minPrice = product.priceRange?.minVariantPrice;
  const compareAtPrice = product.compareAtPriceRange?.minVariantPrice;

  // Visual Rhythm variations for the 3 flagship cards
  const rhythmStyles = [
    // Card 1: Standard warm white canvas
    'bg-white border-[#E8E6DF]',
    // Card 2: Subtle warm cream tint background
    'bg-[#F8F6F3] border-[#E8E6DF]',
    // Card 3: Soft subtle gradient glow background
    'bg-gradient-to-b from-[#F8F6F3] to-white border-[#E8E6DF]'
  ];

  const cardStyle = rhythmStyles[index % rhythmStyles.length];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex flex-col justify-between rounded-2xl border p-4 sm:p-5 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_4px_20px_rgba(18,20,18,0.03)] hover:shadow-[0_16px_40px_rgba(18,20,18,0.08)] hover:-translate-y-1.5 overflow-hidden ${cardStyle}`}
    >
      {/* Top Image Frame with Overlaid Badge & Floating Actions */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden">
        {/* Overlaid Product Badge (Top Left) */}
        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <ProductBadge tags={product.tags} productTitle={product.title} />
        </div>

        {/* Overlaid Quick Actions (Top Right) */}
        <div className="absolute top-3 right-3 z-20">
          <ProductActions
            productHandle={product.handle}
            productTitle={product.title}
            isWishlisted={isWishlisted}
            onToggleWishlist={onToggleWishlist}
            onOpenQuickView={() => onOpenQuickView(product)}
          />
        </div>

        {/* Main Clickable Product Image */}
        <Link
          href={`/products/${product.handle}`}
          className="block w-full h-full focus:outline-none"
          aria-label={`View ${product.title} details`}
        >
          <ProductImage
            primaryImage={primaryImage}
            secondaryImage={secondaryImage}
            altText={product.title}
            isHovered={isHovered}
          />
        </Link>
      </div>

      {/* Product Information */}
      <Link
        href={`/products/${product.handle}`}
        className="block space-y-2 pt-3 text-left focus:outline-none"
      >
        {/* Category Label */}
        <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#ACB041] block">
          {product.productType || 'Botanical Formula'}
        </span>

        {/* Product Title */}
        <h3 className="font-serif text-xl sm:text-2xl text-[#111111] font-normal leading-snug truncate group-hover:text-[#ACB041] transition-colors duration-300">
          {product.title}
        </h3>

        {/* Short Description */}
        <p className="text-xs text-[#333333] font-sans leading-relaxed line-clamp-1 min-h-[1.25rem]">
          {product.description || 'Clinical Ayurvedic formulation handcrafted in small batches.'}
        </p>

        {/* Price */}
        <div className="pt-1">
          <Price
            amount={minPrice?.amount || '0'}
            currencyCode={minPrice?.currencyCode || 'INR'}
            compareAtAmount={compareAtPrice?.amount}
            size="md"
          />
        </div>
      </Link>

      {/* Bottom Primary CTA */}
      <div className="pt-4 z-20">
        <QuickAdd
          product={product}
          onOpenVariants={() => onOpenQuickView(product)}
        />
      </div>
    </div>
  );
}
