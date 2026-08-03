'use client';

import React, { useState } from 'react';
import { Eye, Share2, Check } from 'lucide-react';
import { WishlistButton } from './WishlistButton';

interface ProductActionsProps {
  productHandle: string;
  productTitle: string;
  isWishlisted: boolean;
  onToggleWishlist: (handle: string) => void;
  onOpenQuickView: () => void;
  className?: string;
}

export function ProductActions({
  productHandle,
  productTitle,
  isWishlisted,
  onToggleWishlist,
  onOpenQuickView,
  className = ''
}: ProductActionsProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/products/${productHandle}` : '';

    if (navigator.share) {
      try {
        await navigator.share({
          title: productTitle,
          text: `Discover ${productTitle} at FLOIS`,
          url: shareUrl
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.warn('[Share] Failed to copy URL', e);
    }
  };

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {/* Wishlist Button */}
      <WishlistButton
        productHandle={productHandle}
        isWishlisted={isWishlisted}
        onToggle={onToggleWishlist}
      />

      {/* Quick View Button */}
      <button
        suppressHydrationWarning
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpenQuickView();
        }}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] text-[#121412] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[#4B644C] hover:text-[#4B644C] focus:outline-none"
        aria-label={`Quick View ${productTitle}`}
        title="Quick View"
      >
        <Eye className="h-4 w-4 stroke-[1.75]" />
      </button>

      {/* Share Button */}
      <button
        suppressHydrationWarning
        type="button"
        onClick={handleShare}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-md border border-[#E8E6DF] text-[#121412] shadow-sm transition-all duration-300 hover:scale-110 hover:border-[#4B644C] hover:text-[#4B644C] focus:outline-none"
        aria-label={`Share ${productTitle}`}
        title={isCopied ? 'Link Copied!' : 'Share Product'}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-[#2D5A2E] stroke-[2]" />
        ) : (
          <Share2 className="h-4 w-4 stroke-[1.75]" />
        )}
      </button>
    </div>
  );
}
