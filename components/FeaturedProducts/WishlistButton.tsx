'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface WishlistButtonProps {
  productHandle: string;
  isWishlisted: boolean;
  onToggle: (handle: string) => void;
  className?: string;
}

export function WishlistButton({
  productHandle,
  isWishlisted,
  onToggle,
  className = ''
}: WishlistButtonProps) {
  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle(productHandle);
      }}
      className={`relative z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] text-[#121412] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[#4B644C] focus:outline-none ${className}`}
      aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
    >
      <Heart
        className={`h-4 w-4 transition-colors duration-300 stroke-[1.75] ${
          isWishlisted
            ? 'fill-[#991B1B] text-[#991B1B]'
            : 'text-[#121412] group-hover:text-[#4B644C]'
        }`}
      />
    </button>
  );
}
