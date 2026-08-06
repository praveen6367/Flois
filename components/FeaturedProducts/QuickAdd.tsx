'use client';

import React, { useState } from 'react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, ArrowRight, Loader2, Check } from 'lucide-react';

interface QuickAddProps {
  product: Product;
  onOpenVariants: () => void;
  className?: string;
}

export function QuickAdd({ product, onOpenVariants, className = '' }: QuickAddProps) {
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const variants = product.variants?.nodes || [];
  const defaultVariant = variants[0];
  const hasMultipleVariants = variants.length > 1;
  const isAvailable = product.availableForSale && (defaultVariant ? defaultVariant.availableForSale : true);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAvailable) return;

    if (hasMultipleVariants) {
      onOpenVariants();
      return;
    }

    if (!defaultVariant?.id) return;

    setIsAdding(true);
    try {
      await addItem(defaultVariant.id, 1);
      setIsAdded(true);
      openCart();
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error('[QuickAdd] Add to cart error:', err);
    } finally {
      setIsAdding(false);
    }
  };

  if (!isAvailable) {
    return (
      <button
        suppressHydrationWarning
        disabled
        className={`w-full flex items-center justify-center gap-2 rounded bg-[#F8F6F3] border border-[#E8E6DF] px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#666666] cursor-not-allowed ${className}`}
      >
        <span>Sold Out</span>
      </button>
    );
  }

  return (
    <button
      suppressHydrationWarning
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`w-full flex items-center justify-center gap-2.5 rounded bg-[#8C9B3E] hover:bg-[#7A8834] text-white px-6 py-3.5 text-xs font-semibold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] focus:outline-none ${className}`}
    >
      {isAdding ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin text-white" />
          <span>Adding...</span>
        </>
      ) : isAdded ? (
        <>
          <Check className="h-4 w-4 text-white stroke-[2.5]" />
          <span>Added to Bag</span>
        </>
      ) : hasMultipleVariants ? (
        <>
          <span>Select Options</span>
          <ArrowRight className="h-4 w-4 text-white" />
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4 text-white" />
          <span>Add to Cart</span>
        </>
      )}
    </button>
  );
}
