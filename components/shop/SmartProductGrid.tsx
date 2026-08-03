'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, SlidersHorizontal, X, Star, ShoppingBag, Check } from 'lucide-react';
import { Product } from '@/types/product';
import { LuxuryProductCard } from './LuxuryProductCard';
import { useCart } from '@/context/CartContext';

interface SmartProductGridProps {
  products: Product[];
}

export function SmartProductGrid({ products }: SmartProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState('FEATURED');
  const { addItem } = useCart();
  const [modalAdding, setModalAdding] = useState(false);
  const [modalAdded, setModalAdded] = useState(false);

  const totalCount = products.length;

  // Intelligent filter thresholds
  const showSort = totalCount > 8;
  const showCollectionFilter = totalCount > 12;
  const showIngredientFilter = totalCount > 20;
  const showPriceFilter = totalCount > 30;

  const handleModalAddToCart = async () => {
    if (!selectedProduct || modalAdding) return;
    const variantId = selectedProduct.variants?.nodes?.[0]?.id || selectedProduct.variants?.edges?.[0]?.node?.id;
    if (!variantId) return;

    setModalAdding(true);
    try {
      await addItem(variantId, 1);
      setModalAdded(true);
      setTimeout(() => setModalAdded(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setModalAdding(false);
    }
  };

  return (
    <section id="products" className="relative w-full bg-[#FAF9F5] py-16 sm:py-24 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* Header Bar with Intelligent Filter Controls */}
        <div className="flex items-center justify-between flex-wrap gap-4 pb-8 mb-10 border-b border-[#E8E6DF] text-left">
          
          <div className="space-y-0.5">
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
              APOTHECARY SELECTION
            </span>
            <p className="text-sm font-sans text-[#121412] font-medium">
              Showing all {totalCount} botanical rituals
            </p>
          </div>

          {/* Dynamic Sorting — Only exposed when > 8 products */}
          {showSort && (
            <div className="flex items-center gap-3">
              <span className="text-xs font-sans text-[#787E78]">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white border border-[#E8E6DF] text-xs font-sans text-[#121412] focus:outline-none focus:border-[#4B644C]"
              >
                <option value="FEATURED">Featured</option>
                <option value="NEWEST">Newest Arrivals</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
                <option value="BEST_SELLING">Best Selling</option>
              </select>
            </div>
          )}

        </div>

        {/* Product Grid — Responsive 1 Row for <= 4 products, Responsive Grid for > 4 products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <LuxuryProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden border border-[#E8E6DF] shadow-2xl p-6 sm:p-10 text-left grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {/* Close Button */}
                <button
                  suppressHydrationWarning
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-10 h-9 w-9 rounded-full bg-[#FAF9F5] flex items-center justify-center text-[#121412] hover:bg-[#4B644C] hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Product Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#FAF9F5]">
                  <img
                    src={selectedProduct.images?.nodes?.[0]?.url || '/products/rootherb_product.png'}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C]">
                      FLOIS BOTANICAL CARE
                    </span>
                    <h3 className="font-serif text-3xl font-normal text-[#121412]">
                      {selectedProduct.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-[#C8A96E] text-[#C8A96E]" />
                        ))}
                      </div>
                      <span className="text-xs font-sans font-semibold text-[#121412]">4.9</span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-[#4A4E4A] font-light leading-relaxed pt-2">
                      {selectedProduct.description || '100% pure cold-pressed Ayurvedic formula crafted for scalp nourishment and hair vitality.'}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-[#E8E6DF]">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-sans text-[#787E78]">Price:</span>
                      <span className="font-serif text-2xl font-normal text-[#121412]">
                        ₹{parseFloat(selectedProduct.priceRange?.minVariantPrice?.amount || '999').toLocaleString('en-IN')}
                      </span>
                    </div>

                    <button
                      suppressHydrationWarning
                      onClick={handleModalAddToCart}
                      disabled={modalAdding}
                      className={`w-full py-4 rounded-xl text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                        modalAdded
                          ? 'bg-[#2D5A2E] text-white'
                          : 'bg-[#141C15] text-white hover:bg-[#4B644C]'
                      }`}
                    >
                      {modalAdded ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : modalAdding ? (
                        <span>Adding...</span>
                      ) : (
                        <>
                          <ShoppingBag className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
