'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, Loader2, Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { getProductByHandle } from '@/lib/shopify/products';
import { Product } from '@/types/product';

export function WishlistDrawer() {
  const { wishlist, isOpen, closeWishlist, toggleWishlist } = useWishlist();
  const { addItem, openCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addingHandle, setAddingHandle] = useState<string | null>(null);

  // Fetch product data for handles in wishlist
  useEffect(() => {
    if (!isOpen) return;

    async function loadWishlistProducts() {
      setIsLoading(true);
      try {
        const fetched = await Promise.all(
          wishlist.map(async (handle) => {
            try {
              return await getProductByHandle(handle);
            } catch {
              return null;
            }
          })
        );
        setProducts(fetched.filter(Boolean) as Product[]);
      } catch (e) {
        console.error('[WishlistDrawer] Error loading products:', e);
      } finally {
        setIsLoading(false);
      }
    }

    loadWishlistProducts();
  }, [wishlist, isOpen]);

  const handleAddToCart = async (product: Product) => {
    const variantId = product.variants?.nodes?.[0]?.id;
    if (!variantId) {
      window.location.href = `/products/${product.handle}`;
      return;
    }

    setAddingHandle(product.handle);
    try {
      await addItem(variantId, 1);
      closeWishlist();
      openCart();
    } catch (e) {
      console.error('[WishlistDrawer] Add to cart error:', e);
    } finally {
      setAddingHandle(null);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="absolute inset-0 bg-[#121412]/50 backdrop-blur-sm"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="w-screen max-w-md bg-white border-l border-[#E8E6DF] shadow-2xl flex flex-col justify-between"
            >
              {/* Header */}
              <div className="p-6 border-b border-[#E8E6DF] flex items-center justify-between bg-[#FAF9F5]">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-[#F2F4E6] flex items-center justify-center text-[#4B644C]">
                    <Heart className="h-4 w-4 fill-[#4B644C]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg text-[#0F1410]">Your Wishlist</h2>
                    <p className="text-[11px] font-sans text-[#787E78]">
                      {wishlist.length} saved item{wishlist.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>

                <button
                  suppressHydrationWarning
                  onClick={closeWishlist}
                  className="h-9 w-9 rounded-full bg-white border border-[#E8E6DF] text-[#0F1410] flex items-center justify-center hover:bg-[#141C15] hover:text-white transition-colors"
                  aria-label="Close Wishlist"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-20 space-y-3">
                    <Loader2 className="h-8 w-8 text-[#4B644C] animate-spin" />
                    <p className="text-xs text-[#787E78] font-sans">Loading wishlist items…</p>
                  </div>
                ) : wishlist.length === 0 ? (
                  <div className="text-center py-20 flex flex-col items-center gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-[#F2F4E6] flex items-center justify-center text-[#4B644C]">
                      <Heart className="h-8 w-8" />
                    </div>
                    <div>
                      <p className="font-serif text-lg text-[#0F1410]">Your wishlist is empty</p>
                      <p className="text-xs text-[#787E78] mt-1 max-w-xs">
                        Save your favourite botanical care items to quickly access or purchase later.
                      </p>
                    </div>
                    <Link
                      href="/shop"
                      onClick={closeWishlist}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#141C15] text-white text-xs font-semibold hover:bg-[#2C3B2E] transition-colors mt-2"
                    >
                      Explore Collection
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                ) : (
                  products.map((product) => {
                    const price = product.priceRange?.minVariantPrice?.amount || '699';
                    const currency = product.priceRange?.minVariantPrice?.currencyCode || 'INR';
                    const imgUrl = product.images?.nodes?.[0]?.url || '/products/rootherb_product.png';
                    const isAdding = addingHandle === product.handle;

                    return (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-4 p-4 rounded-2xl border border-[#E8E6DF] bg-[#FAF9F5] group hover:border-[#4B644C]/40 transition-colors"
                      >
                        {/* Image */}
                        <Link
                          href={`/products/${product.handle}`}
                          onClick={closeWishlist}
                          className="relative h-16 w-16 rounded-xl bg-white border border-[#E8E6DF] p-1 flex-shrink-0 overflow-hidden"
                        >
                          <img
                            src={imgUrl}
                            alt={product.title}
                            className="w-full h-full object-contain"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${product.handle}`}
                            onClick={closeWishlist}
                            className="font-serif text-sm font-normal text-[#0F1410] line-clamp-1 hover:text-[#4B644C] transition-colors"
                          >
                            {product.title}
                          </Link>
                          <p className="text-xs font-sans font-bold text-[#4B644C] mt-0.5">
                            {currency === 'INR' ? '₹' : currency} {price}
                          </p>

                          {/* Quick add */}
                          <button
                            suppressHydrationWarning
                            type="button"
                            onClick={() => handleAddToCart(product)}
                            disabled={isAdding}
                            className="mt-2 text-[11px] font-sans font-bold text-[#141C15] hover:text-[#4B644C] flex items-center gap-1 transition-colors"
                          >
                            {isAdding ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin text-[#4B644C]" />
                                <span>Adding…</span>
                              </>
                            ) : (
                              <>
                                <ShoppingBag className="h-3 w-3" />
                                <span>Move to Bag</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          suppressHydrationWarning
                          type="button"
                          onClick={() => toggleWishlist(product.handle)}
                          aria-label="Remove item"
                          className="h-8 w-8 rounded-full flex items-center justify-center text-[#9A9E9A] hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </motion.div>
                    );
                  })
                )}
              </div>

              {/* Footer */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-[#E8E6DF] bg-[#FAF9F5] space-y-3">
                  <Link
                    href="/shop"
                    onClick={closeWishlist}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#141C15] hover:bg-[#2C3B2E] text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
