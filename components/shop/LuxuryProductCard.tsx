'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye, Heart, Check, ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

import { useWishlist } from '@/context/WishlistContext';

interface LuxuryProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function LuxuryProductCard({ product, onQuickView }: LuxuryProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const isWishlisted = isInWishlist(product.handle);

  const images = product.images?.nodes || product.images?.edges?.map((e) => e.node) || [];
  const primaryImage = images[0]?.url || '/products/rootherb_product.png';
  const secondaryImage = images[1]?.url || primaryImage;

  const price = product.priceRange?.minVariantPrice?.amount
    ? `₹${parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('en-IN')}`
    : '₹999';

  const firstVariantId = product.variants?.nodes?.[0]?.id || product.variants?.edges?.[0]?.node?.id || '';

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariantId || isAdding) return;

    setIsAdding(true);
    try {
      await addItem(firstVariantId, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      console.error('Failed to add to cart:', err);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white border border-[#E8E6DF] hover:shadow-2xl hover:border-[#8C9B3E]/40 transition-all duration-300 text-left"
    >
      <div className="space-y-4">
        
        {/* Product Image Stage */}
        <div className="relative aspect-square sm:aspect-[4/4.5] w-full rounded-xl overflow-hidden bg-[#F8F6F3] group/img">
          
          {/* Wishlist Button */}
          <button
            suppressHydrationWarning
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.handle);
            }}
            aria-label="Add to Wishlist"
            className="absolute top-3 right-3 z-10 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#111111] shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`h-4 w-4 transition-colors ${
                isWishlisted ? 'fill-[#991B1B] text-[#991B1B]' : 'text-[#666666] hover:text-[#111111]'
              }`}
            />
          </button>

          {/* Quick View Floating Trigger */}
          {onQuickView && (
            <button
              suppressHydrationWarning
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover/img:opacity-100 transition-all duration-300 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-xs font-sans font-semibold uppercase tracking-wider text-[#111111] hover:bg-[#8C9B3E] hover:text-white shadow-lg flex items-center gap-1.5"
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Quick View</span>
            </button>
          )}

          {/* Primary & Secondary Images */}
          <Link href={`/products/${product.handle}`} className="block w-full h-full">
            <Image
              src={primaryImage}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover object-center transition-opacity duration-500 group-hover/img:opacity-0"
            />
            <Image
              src={secondaryImage}
              alt={`${product.title} view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover object-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-500 group-hover/img:scale-105"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-[#8C9B3E] block">
            AYURVEDIC FORMULATION
          </span>

          <Link href={`/products/${product.handle}`} className="block group-hover:text-[#8C9B3E] transition-colors">
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#111111] leading-snug line-clamp-1">
              {product.title}
            </h3>
          </Link>

          <p className="text-xs font-sans text-[#666666] font-light line-clamp-2 leading-relaxed">
            {product.description || '100% pure cold-pressed Ayurvedic formula for scalp and hair vitality.'}
          </p>
        </div>

      </div>

      {/* Footer: Rating, Price & Action Buttons */}
      <div className="pt-4 border-t border-[#E8E6DF] mt-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-[#C8A96E] text-[#C8A96E]" />
            <span className="text-xs font-sans font-semibold text-[#111111]">4.9</span>
          </div>

          <span className="font-serif text-lg font-normal text-[#111111]">
            {price}
          </span>
        </div>

        {/* Dual Actions: Primary Add to Cart + Secondary View Details */}
        <div className="grid grid-cols-2 gap-2">
          <button
            suppressHydrationWarning
            onClick={handleAddToCart}
            disabled={isAdding || !product.availableForSale}
            className={`py-3 rounded-xl text-[11px] font-sans uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1.5 shadow-sm ${
              added
                ? 'bg-[#2D5A2E] text-white'
                : 'bg-[#8C9B3E] text-white hover:bg-[#7A8834]'
            }`}
          >
            {added ? (
              <>
                <Check className="h-3.5 w-3.5 text-white" />
                <span>Added</span>
              </>
            ) : isAdding ? (
              <span>Adding...</span>
            ) : (
              <>
                <ShoppingBag className="h-3.5 w-3.5 text-white" />
                <span>Add to Cart</span>
              </>
            )}
          </button>

          <Link
            href={`/products/${product.handle}`}
            className="py-3 rounded-xl border border-[#D8D5CE] text-[11px] font-sans uppercase tracking-wider font-semibold text-[#111111] hover:border-[#8C9B3E] hover:text-[#8C9B3E] transition-colors flex items-center justify-center gap-1"
          >
            <span>View Details</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

    </motion.article>
  );
}
