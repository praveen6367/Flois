'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface StickyMobileCTAProps {
  product: Product;
}

export function StickyMobileCTA({ product }: StickyMobileCTAProps) {
  const { addItem, openCart } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const variants = product.variants?.nodes || [];
  const selectedVariant: ProductVariant = variants[0] || {
    id: product.id,
    title: 'Default',
    price: product.priceRange?.minVariantPrice || { amount: '699', currencyCode: 'INR' },
    availableForSale: true,
  };
  const price = selectedVariant.price?.amount || product.priceRange?.minVariantPrice?.amount || '699';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky CTA once purchase panel is not visible
        setIsVisible(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    const panel = document.getElementById('purchase-panel');
    if (panel) observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  const handleAdd = async () => {
    setIsAdding(true);
    await addItem(selectedVariant.id || product.id, 1);
    setIsAdding(false);
    openCart();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden safe-area-inset-bottom"
        >
          <div className="bg-[#FAFAF8]/95 backdrop-blur-xl border-t border-[#E8E6DF] px-4 py-3 flex items-center gap-3 shadow-2xl">
            {/* Price */}
            <div className="shrink-0">
              <span className="font-serif text-xl text-[#0F1410] font-normal block leading-none">
                ₹{Number(price).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] font-sans text-[#787E78]">incl. all taxes</span>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              disabled={isAdding}
              className="flex-1 flex items-center justify-center gap-2 rounded-full bg-[#4B644C] hover:bg-[#3A5039] text-white py-3 px-5 text-sm font-sans font-semibold tracking-wide transition-all focus:outline-none disabled:opacity-60 shadow-lg"
            >
              <ShoppingBag className="h-4 w-4 shrink-0" />
              <span>{isAdding ? 'Adding…' : 'Add to Bag'}</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
