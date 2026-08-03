'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function CartDrawer() {
  const {
    cart,
    isOpen,
    closeCart,
    updateItem,
    removeItem,
    totalQuantity,
    subtotalAmount,
    freeShippingThreshold,
    freeShippingProgress,
    amountUntilFreeShipping
  } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-[#121412]/40 backdrop-blur-sm"
          />

          {/* Right Slide-over Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            {/* Header Bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#E8E6DF]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#4B644C]" />
                <h3 className="font-serif text-xl text-[#121412]">
                  Your Bag ({totalQuantity})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-1.5 text-[#121412] hover:text-[#4B644C] transition-colors focus:outline-none"
                aria-label="Close Cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#FAF9F5] px-6 py-4 border-b border-[#E8E6DF]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="flex items-center gap-1.5 font-medium text-[#121412]">
                  <Truck className="h-4 w-4 text-[#4B644C]" />
                  {amountUntilFreeShipping > 0 ? (
                    <>Add <strong className="text-[#4B644C]">₹{amountUntilFreeShipping.toFixed(0)}</strong> more for Free Express Shipping</>
                  ) : (
                    <span className="text-[#2D5A2E] font-semibold">🎉 You unlocked Complimentary Express Shipping!</span>
                  )}
                </span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-[#E2E8E2] overflow-hidden">
                <div
                  className="h-full bg-[#4B644C] transition-all duration-500 ease-out"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart && cart.lines && cart.lines.length > 0 ? (
                cart.lines.map((line) => (
                  <div key={line.id} className="flex gap-4 border-b border-[#E8E6DF] pb-6 last:border-0">
                    {/* Item Image */}
                    {line.merchandise.image?.url && (
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-[#FAF9F5] border border-[#E8E6DF]">
                        <Image
                          src={line.merchandise.image.url}
                          alt={line.merchandise.title}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Info & Quantity Control */}
                    <div className="flex flex-1 flexDirection flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-base text-[#121412] leading-snug">
                            {line.merchandise.product.title}
                          </h4>
                          <button
                            onClick={() => removeItem(line.id)}
                            className="text-[#787E78] hover:text-[#991B1B] transition-colors p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        {line.merchandise.title !== 'Default Title' && (
                          <p className="text-xs text-[#787E78] mt-0.5">{line.merchandise.title}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Pill Controls */}
                        <div className="flex items-center rounded-full border border-[#E8E6DF] bg-[#FAF9F5] px-2 py-1">
                          <button
                            onClick={() => updateItem(line.id, line.quantity - 1)}
                            className="p-1 text-[#121412] hover:text-[#4B644C] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-3 text-xs font-semibold text-[#121412]">{line.quantity}</span>
                          <button
                            onClick={() => updateItem(line.id, line.quantity + 1)}
                            className="p-1 text-[#121412] hover:text-[#4B644C] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold text-[#121412]">
                          {line.cost.totalAmount.currencyCode} {line.cost.totalAmount.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <ShoppingBag className="h-12 w-12 text-[#9DAF9E] stroke-[1] mb-3" />
                  <h4 className="font-serif text-xl text-[#121412] mb-1">Your Shopping Bag is Empty</h4>
                  <p className="text-xs text-[#787E78] max-w-xs mb-6">
                    Discover our clinically formulated botanical hair and skin care collections.
                  </p>
                  <Link
                    href="/collections/all"
                    onClick={closeCart}
                    className="inline-flex items-center gap-2 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    <span>Start Shopping</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>

            {/* Footer Checkout Bar */}
            {cart && cart.lines && cart.lines.length > 0 && (
              <div className="border-t border-[#E8E6DF] bg-[#FAF9F5] p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#4A4E4A]">Subtotal</span>
                  <span className="font-semibold text-[#121412]">
                    {cart.cost?.subtotalAmount?.currencyCode} {cart.cost?.subtotalAmount?.amount}
                  </span>
                </div>
                <p className="text-[11px] text-[#787E78]">Taxes & shipping calculated at checkout.</p>
                <a
                  href={cart.checkoutUrl}
                  className="w-full flex items-center justify-center gap-2 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white py-3.5 text-xs font-semibold uppercase tracking-widest transition-colors shadow-md"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
