'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Star, ShoppingBag, Zap, Heart, Share2, ShieldCheck, Truck,
  RotateCcw, Check, Plus, Minus, CheckCircle2, Package, Lock
} from 'lucide-react';
import { Product, ProductVariant } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface PurchasePanelProps {
  product: Product;
}

const TRUST_SIGNALS = [
  { icon: Lock, label: 'Secure Checkout' },
  { icon: Truck, label: 'Free Ship ₹999+' },
  { icon: RotateCcw, label: '30-Day Returns' },
  { icon: ShieldCheck, label: '100% Authentic' },
];

export function PurchasePanel({ product }: PurchasePanelProps) {
  const { addItem, openCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const variants = product.variants?.nodes || [];
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    variants[0] || { id: product.id, title: 'Default', price: product.priceRange?.minVariantPrice || { amount: '699', currencyCode: 'INR' }, availableForSale: true }
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(isInWishlist(product.handle));
  const [copiedShare, setCopiedShare] = useState(false);

  const price = selectedVariant.price?.amount || product.priceRange?.minVariantPrice?.amount || '699';
  const comparePrice = selectedVariant.compareAtPrice?.amount || product.compareAtPriceRange?.maxVariantPrice?.amount;
  const savingAmount = comparePrice && Number(comparePrice) > Number(price)
    ? Number(comparePrice) - Number(price) : 0;
  const savingPercent = comparePrice && Number(comparePrice) > Number(price)
    ? Math.round((savingAmount / Number(comparePrice)) * 100) : 0;

  const handleAddToCart = async () => {
    setIsAdding(true);
    await addItem(selectedVariant.id || product.id, quantity);
    setIsAdding(false);
    setAddedSuccess(true);
    openCart();
    setTimeout(() => setAddedSuccess(false), 2500);
  };

  const handleWishlist = () => {
    toggleWishlist(product.handle);
    setIsWishlisted(!isWishlisted);
  };

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title: product.title, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-6 text-left" itemScope itemType="https://schema.org/Product">
      
      {/* ── 1. Header & Pricing Block ─────────────────────────────────── */}
      <div className="space-y-4">
        {/* Category Badge & Rating */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.24em] text-[#4B644C]">
            BOTANICAL AYURVEDIC FORMULA
          </span>
          <a
            href="#reviews"
            className="inline-flex items-center gap-1.5 group focus:outline-none"
            aria-label="See 128 reviews, rated 4.9 stars"
          >
            <div className="flex text-[#C8A96E]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-[#C8A96E]" />
              ))}
            </div>
            <span className="text-xs font-sans font-medium text-[#787E78] group-hover:text-[#4B644C] transition-colors">
              4.9 (128)
            </span>
          </a>
        </div>

        {/* Product Title */}
        <h1
          itemProp="name"
          className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] text-[#0F1410] font-normal leading-[1.12] tracking-[-0.015em]"
        >
          {product.title}
        </h1>

        {/* Highlight Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {['100% Cold-Pressed', '0% Mineral Oil', 'Dermatologist Tested'].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 text-[10px] font-sans font-semibold text-[#2D5A2E] bg-[#F2F6F2] px-3 py-1 rounded-full border border-[#D5E2D5]"
            >
              <CheckCircle2 className="h-3 w-3 shrink-0 text-[#4B644C]" />
              {label}
            </span>
          ))}
        </div>

        {/* Pricing & Stock Bar */}
        <div className="pt-2 flex items-baseline justify-between gap-4 flex-wrap">
          <div className="flex items-baseline gap-3">
            <span itemProp="price" className="font-serif text-4xl sm:text-5xl font-normal text-[#0F1410] leading-none">
              ₹{Number(price).toLocaleString('en-IN')}
            </span>
            {comparePrice && Number(comparePrice) > Number(price) && (
              <span className="text-base font-sans text-[#9A9E9A] line-through leading-none font-light">
                ₹{Number(comparePrice).toLocaleString('en-IN')}
              </span>
            )}
            {savingPercent > 0 && (
              <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-white bg-[#2D5A2E] px-2.5 py-0.5 rounded-full shadow-xs">
                SAVE {savingPercent}%
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-sans font-semibold text-[#2D5A2E] bg-[#F2F6F2] px-3 py-1.5 rounded-full border border-[#D5E2D5]">
            <span className="h-2 w-2 rounded-full bg-[#2D5A2E] animate-pulse" />
            <span>In Stock · Ships Today</span>
          </div>
        </div>
      </div>

      <hr className="border-[#E8E6DF]" />

      {/* ── 2. Selection & Actions Block ─────────────────────────────── */}
      <div className="space-y-5">
        {/* Variant Selector (If Multiple) */}
        {variants.length > 1 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs font-sans">
              <span className="font-semibold uppercase tracking-wider text-[#4A4E4A]">
                Select Size / Pack
              </span>
              <span className="text-[#787E78]">
                Selected: <strong className="text-[#121412] font-semibold">{selectedVariant.title}</strong>
              </span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {variants.map((v) => (
                <button
                  suppressHydrationWarning
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  aria-pressed={v.id === selectedVariant.id}
                  className={`px-4 py-2.5 rounded-xl text-xs font-sans font-semibold transition-all border focus:outline-none ${
                    v.id === selectedVariant.id
                      ? 'bg-[#141C15] text-white border-[#141C15] shadow-md'
                      : 'bg-[#FAF9F5] text-[#121412] border-[#E8E6DF] hover:border-[#4B644C] hover:bg-white'
                  }`}
                >
                  {v.title}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector + Secondary Actions Bar */}
        <div className="flex items-center justify-between gap-4 pt-1">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-sans font-semibold uppercase tracking-wider text-[#4A4E4A]">
              Qty
            </span>
            <div className="flex items-center rounded-full bg-[#FAF9F5] border border-[#E8E6DF] px-2 py-1 shadow-xs">
              <button
                suppressHydrationWarning
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
                className="h-7 w-7 rounded-full flex items-center justify-center text-[#787E78] hover:text-[#121412] hover:bg-white transition-all focus:outline-none"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-8 text-center text-sm font-sans font-semibold text-[#121412] select-none">
                {quantity}
              </span>
              <button
                suppressHydrationWarning
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
                className="h-7 w-7 rounded-full flex items-center justify-center text-[#787E78] hover:text-[#121412] hover:bg-white transition-all focus:outline-none"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Wishlist & Share Quick Icons */}
          <div className="flex items-center gap-2">
            <button
              suppressHydrationWarning
              onClick={handleWishlist}
              aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-sans font-medium border transition-all focus:outline-none ${
                isWishlisted
                  ? 'bg-[#FEF2F2] border-[#FCA5A5] text-[#DC2626]'
                  : 'bg-[#FAF9F5] border-[#E8E6DF] text-[#4A4E4A] hover:border-[#4B644C] hover:text-[#4B644C] hover:bg-white'
              }`}
            >
              <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-[#DC2626]' : ''}`} />
              <span className="hidden sm:inline">{isWishlisted ? 'Wishlisted' : 'Wishlist'}</span>
            </button>

            <button
              suppressHydrationWarning
              onClick={handleShare}
              aria-label="Share this product"
              className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#FAF9F5] border border-[#E8E6DF] text-xs font-sans font-medium text-[#4A4E4A] hover:border-[#4B644C] hover:text-[#4B644C] hover:bg-white transition-all focus:outline-none"
            >
              {copiedShare ? <Check className="h-4 w-4 text-[#2D5A2E]" /> : <Share2 className="h-4 w-4" />}
              <span className="hidden sm:inline">{copiedShare ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Primary CTA Buttons Stack */}
        <div className="space-y-2.5 pt-2">
          <motion.button
            suppressHydrationWarning
            onClick={handleAddToCart}
            disabled={isAdding}
            whileTap={{ scale: 0.985 }}
            className={`w-full flex items-center justify-center gap-2.5 rounded-full py-4 px-6 text-xs font-sans font-semibold tracking-[0.08em] uppercase transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B644C] disabled:opacity-60 ${
              addedSuccess
                ? 'bg-[#2D5A2E] text-white'
                : 'bg-[#4B644C] hover:bg-[#394F3A] text-white'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="h-4 w-4" />
                <span>{isAdding ? 'Adding to Bag…' : 'Add to Bag'}</span>
              </>
            )}
          </motion.button>

          <motion.button
            suppressHydrationWarning
            onClick={handleAddToCart}
            whileTap={{ scale: 0.985 }}
            className="w-full flex items-center justify-center gap-2.5 rounded-full bg-[#141C15] hover:bg-[#202C21] text-white py-4 px-6 text-xs font-sans font-semibold tracking-[0.08em] uppercase transition-all duration-300 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#141C15]"
          >
            <Zap className="h-4 w-4 text-[#C2CE94] shrink-0" />
            <span>Buy Now — Express Checkout</span>
          </motion.button>
        </div>

        {/* Estimated Delivery Note */}
        <div className="flex items-center justify-center gap-2 text-xs font-sans text-[#787E78] pt-1">
          <Package className="h-3.5 w-3.5 text-[#4B644C] shrink-0" />
          <span>Estimated delivery within <strong className="text-[#121412] font-semibold">3–5 business days</strong></span>
        </div>
      </div>

      {/* ── 3. Integrated Luxury Assurance & Trust Card ──────────────── */}
      <div className="rounded-2xl bg-[#FAF9F5] border border-[#E8E6DF] p-5 space-y-4 shadow-xs">
        {/* Satisfaction Guarantee Header */}
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-full bg-[#4B644C]/10 flex items-center justify-center shrink-0 mt-0.5">
            <ShieldCheck className="h-5 w-5 text-[#4B644C]" />
          </div>
          <div>
            <h4 className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider">
              30-Day Satisfaction Guarantee
            </h4>
            <p className="text-[11px] font-sans text-[#787E78] mt-0.5 leading-relaxed">
              Not satisfied? Return within 30 days for a full refund — no questions asked.
            </p>
          </div>
        </div>

        {/* Minimalist 4-Pillar Trust Grid */}
        <div className="pt-3.5 border-t border-[#E8E6DF] grid grid-cols-4 gap-2 text-center">
          {TRUST_SIGNALS.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <Icon className="h-4 w-4 text-[#4B644C] stroke-[1.75]" />
              <span className="text-[10px] font-sans font-medium text-[#4A4E4A] leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* Integrated Payment Methods */}
        <div className="pt-3.5 border-t border-[#E8E6DF] text-center space-y-2">
          <span className="block text-[9px] font-sans font-semibold uppercase tracking-[0.18em] text-[#787E78]">
            100% Secure Express Checkout
          </span>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'GPay', 'NetBanking'].map((method) => (
              <span
                key={method}
                className="text-[10px] font-sans font-semibold text-[#4A4E4A] bg-white border border-[#E8E6DF] px-2.5 py-1 rounded-md shadow-xs"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
