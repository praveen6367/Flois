'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { Price } from './Price';
import { ProductBadge } from './ProductBadge';
import { X, ShoppingBag, ArrowRight, Loader2, Check, ShieldCheck } from 'lucide-react';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addItem, openCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const images = product.images?.nodes || [];
  const variants = product.variants?.nodes || [];
  const currentVariant = selectedVariant || variants[0];
  const isAvailable = product.availableForSale && (currentVariant ? currentVariant.availableForSale : true);

  const handleAddToCart = async () => {
    if (!currentVariant?.id || !isAvailable) return;

    setIsAdding(true);
    try {
      await addItem(currentVariant.id, 1);
      setIsAdded(true);
      openCart();
      onClose();
      setTimeout(() => setIsAdded(false), 2000);
    } catch (e) {
      console.error('[QuickViewModal] Add to cart error:', e);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#121412]/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden z-10 border border-[#E8E6DF] my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAF9F5] border border-[#E8E6DF] text-[#121412] hover:bg-[#141C15] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          {/* Product Gallery Column */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-xl bg-[#FAF9F5] overflow-hidden p-6 flex items-center justify-center border border-[#E8E6DF]">
              <Image
                src={images[activeImageIndex]?.url || product.featuredImage?.url || '/placeholders/botanical-placeholder.svg'}
                alt={images[activeImageIndex]?.altText || product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain object-center p-4"
              />
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
                {images.slice(0, 5).map((img, idx) => (
                  <button
                    key={img.url + idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-16 rounded-lg overflow-hidden border transition-all shrink-0 bg-[#FAF9F5] ${
                      activeImageIndex === idx ? 'border-[#4B644C] ring-2 ring-[#4B644C]/30' : 'border-[#E8E6DF] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image src={img.url} alt={img.altText || `Thumbnail ${idx}`} fill sizes="64px" className="object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Column */}
          <div className="flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <ProductBadge tags={product.tags} productTitle={product.title} />
                <span className="text-xs uppercase tracking-widest text-[#4B644C] font-semibold">
                  {product.productType || 'Botanical Formula'}
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#121412] font-normal leading-tight">
                {product.title}
              </h2>

              <Price
                amount={currentVariant?.price?.amount || product.priceRange.minVariantPrice.amount}
                currencyCode={currentVariant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode}
                compareAtAmount={currentVariant?.compareAtPrice?.amount || product.compareAtPriceRange?.minVariantPrice?.amount}
                size="lg"
              />

              <p className="text-xs sm:text-sm text-[#4A4E4A] font-sans leading-relaxed line-clamp-3">
                {product.description || 'Cold-pressed Ayurvedic botanical formulation handcrafted in small batches for clinical scalp and skin longevity.'}
              </p>

              {/* Variant Selector */}
              {variants.length > 1 && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#121412]">
                    Select Variant:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant)}
                        className={`rounded border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
                          currentVariant?.id === variant.id
                            ? 'border-[#4B644C] bg-[#4B644C] text-white shadow-sm'
                            : 'border-[#E8E6DF] bg-white text-[#121412] hover:border-[#4B644C]'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Callout */}
              <div className="flex items-center gap-2 text-xs text-[#4B644C] bg-[#F4F6F4] p-3 rounded-lg border border-[#E3E8E3]">
                <ShieldCheck className="h-4 w-4 shrink-0 stroke-[2]" />
                <span className="font-medium">100% Authentic Botanical Science • Complimentary Shipping &gt; ₹999</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="space-y-3 pt-4 border-t border-[#E8E6DF]">
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !isAvailable}
                className="w-full flex items-center justify-center gap-2.5 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white px-8 py-4 text-xs font-semibold uppercase tracking-widest transition-all shadow-md hover:shadow-lg disabled:opacity-50"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Adding to Bag...</span>
                  </>
                ) : isAdded ? (
                  <>
                    <Check className="h-4 w-4 stroke-[2.5]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              <Link
                href={`/products/${product.handle}`}
                onClick={onClose}
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4B644C] hover:text-[#304031] py-1 transition-colors"
              >
                <span>View Full Product Details</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
