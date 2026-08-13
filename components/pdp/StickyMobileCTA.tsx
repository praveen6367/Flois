'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Zap, Plus, Minus, Check, Loader2 } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface StickyMobileCTAProps {
  product: Product;
}

export function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { cart, addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const variants = product.variants?.nodes || [];
  const selectedVariant: ProductVariant = variants[0] || {
    id: product.id || 'gid://shopify/ProductVariant/1',
    title: 'Default',
    price: product.priceRange?.minVariantPrice || { amount: '699', currencyCode: 'INR' },
    availableForSale: true,
  };

  const handleQuantityDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleQuantityIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    if (isAdding || isBuyingNow) return;
    setIsAdding(true);
    try {
      await addItem(selectedVariant.id || product.id, quantity);
      setIsAdded(true);
      openCart();
      setTimeout(() => setIsAdded(false), 2500);
    } catch (e) {
      console.error('[StickyMobileCTA] Add to cart error:', e);
    } finally {
      setIsAdding(false);
    }
  };

  const handleBuyNow = async () => {
    if (isAdding || isBuyingNow) return;
    setIsBuyingNow(true);
    try {
      await addItem(selectedVariant.id || product.id, quantity);
      if (cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      } else {
        openCart();
      }
    } catch (e) {
      openCart();
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white/95 backdrop-blur-xl border-t border-[#E8E6DF] shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-3 py-2.5 sm:px-4 sm:py-3 pb-[calc(0.65rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center gap-2 max-w-lg mx-auto">

            {/* ── 1. Quantity Selector ── */}
            <div className="flex items-center justify-between bg-[#F8F6F3] border border-[#E8E6DF] rounded-xl px-2 py-1.5 h-11 shrink-0">
              <button
                suppressHydrationWarning
                type="button"
                onClick={handleQuantityDecrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[#111111] hover:bg-[#E8E6DF] disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>

              <span className="w-6 text-center font-sans font-bold text-xs text-[#111111]">
                {quantity}
              </span>

              <button
                suppressHydrationWarning
                type="button"
                onClick={handleQuantityIncrease}
                aria-label="Increase quantity"
                className="h-7 w-7 rounded-lg flex items-center justify-center text-[#111111] hover:bg-[#E8E6DF] transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* ── 2. Add to Cart Button ── */}
            <button
              suppressHydrationWarning
              type="button"
              onClick={handleAddToCart}
              disabled={isAdding || isBuyingNow}
              className={`flex-1 h-11 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 ${
                isAdded
                  ? 'bg-[#4CAF50] text-white border border-[#4CAF50]'
                  : 'bg-white border border-[#8C9B3E] text-[#8C9B3E] hover:bg-[#F2F4E6] active:scale-[0.98]'
              }`}
            >
              {isAdding ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#8C9B3E]" />
              ) : isAdded ? (
                <>
                  <Check className="h-4 w-4 stroke-[2.5]" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  <span>Add To Cart</span>
                </>
              )}
            </button>

            {/* ── 3. Buy Now Button ── */}
            <button
              suppressHydrationWarning
              type="button"
              onClick={handleBuyNow}
              disabled={isAdding || isBuyingNow}
              className="flex-1 h-11 rounded-xl font-sans font-bold text-xs flex items-center justify-center gap-1.5 bg-[#8C9B3E] hover:bg-[#7A8A34] active:scale-[0.98] text-white shadow-md transition-all duration-300"
            >
              {isBuyingNow ? (
                <Loader2 className="h-4 w-4 animate-spin text-white" />
              ) : (
                <>
                  <Zap className="h-4 w-4 fill-white" />
                  <span>Buy Now</span>
                </>
              )}
            </button>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
