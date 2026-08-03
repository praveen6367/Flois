'use client';

import React from 'react';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface HeaderActionsProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export function HeaderActions({ onOpenSearch, onOpenAccount }: HeaderActionsProps) {
  const { totalQuantity, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();

  return (
    <div className="flex items-center gap-4 sm:gap-6 text-[#FAF9F5]">
      {/* Search Trigger */}
      <button
        suppressHydrationWarning
        onClick={onOpenSearch}
        className="group relative p-2 text-[#FAF9F5] hover:text-[#9DAF9E] transition-colors focus:outline-none"
        aria-label="Open Search Drawer"
        title="Search Products & Collections"
      >
        <Search className="h-5 w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
      </button>

      {/* Wishlist Trigger */}
      <button
        suppressHydrationWarning
        onClick={openWishlist}
        className="group relative p-2 text-[#FAF9F5] hover:text-[#9DAF9E] transition-colors focus:outline-none"
        aria-label="Open Wishlist"
        title="Wishlist"
      >
        <Heart className="h-5 w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
        {wishlistCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4B644C] text-[10px] font-semibold text-white">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart Trigger */}
      <button
        suppressHydrationWarning
        onClick={openCart}
        className="group relative p-2 text-[#FAF9F5] hover:text-[#9DAF9E] transition-colors focus:outline-none"
        aria-label="Open Cart Drawer"
        title="Cart Drawer"
      >
        <ShoppingBag className="h-5 w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
        {totalQuantity > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#4B644C] text-[10px] font-semibold text-white">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Account Trigger */}
      <button
        suppressHydrationWarning
        onClick={onOpenAccount}
        className="group relative p-2 text-[#FAF9F5] hover:text-[#9DAF9E] transition-colors focus:outline-none"
        aria-label="Account Menu"
        title="Customer Account"
      >
        <User className="h-5 w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
      </button>
    </div>
  );
}
