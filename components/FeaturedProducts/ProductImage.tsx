'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ShopifyImage } from '@/types/shopify';

interface ProductImageProps {
  primaryImage?: ShopifyImage | null;
  secondaryImage?: ShopifyImage | null;
  altText: string;
  className?: string;
  isHovered?: boolean;
}

export function ProductImage({
  primaryImage,
  secondaryImage,
  altText,
  className = '',
  isHovered = false
}: ProductImageProps) {
  const primarySrc = primaryImage?.url || '/placeholders/botanical-placeholder.svg';
  const secondarySrc = secondaryImage?.url || null;

  const [imgError, setImgError] = useState(false);
  const displayPrimary = imgError ? '/placeholders/botanical-placeholder.svg' : primarySrc;

  return (
    <div className={`relative w-full aspect-square rounded-xl overflow-hidden bg-[#FAF9F5] flex items-center justify-center border border-[#E8E6DF]/60 ${className}`}>
      {/* Primary Image (Filling Frame Richly) */}
      <Image
        src={displayPrimary}
        alt={primaryImage?.altText || altText}
        fill
        priority
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onError={() => setImgError(true)}
        className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          secondarySrc && isHovered ? 'opacity-0 scale-95' : 'opacity-100 group-hover:scale-105'
        }`}
      />

      {/* Secondary Image Crossfade on Hover */}
      {secondarySrc && (
        <Image
          src={secondarySrc}
          alt={secondaryImage?.altText || `${altText} Secondary View`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-95'
          }`}
        />
      )}
    </div>
  );
}
