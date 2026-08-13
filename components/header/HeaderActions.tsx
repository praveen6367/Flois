'use client';

import React from 'react';
import { Search, Heart, ShoppingBag, User } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';

interface HeaderActionsProps {
  onOpenSearch: () => void;
  onOpenAccount: () => void;
}

export function HeaderActions({ onOpenSearch, onOpenAccount }: HeaderActionsProps) {
  const { totalQuantity, openCart } = useCart();
  const { wishlistCount, openWishlist } = useWishlist();
  const { customer, accessToken } = useAuth();

  const isLoggedIn = Boolean(accessToken && customer);

  return (
    <div className="flex items-center gap-1 sm:gap-3 md:gap-5 text-[#111111]">
      {/* Search Trigger */}
      <button
        suppressHydrationWarning
        onClick={onOpenSearch}
        className="group relative p-1.5 sm:p-2 text-[#111111] hover:text-[#8C9B3E] transition-colors focus:outline-none"
        aria-label="Open Search Drawer"
        title="Search Products & Collections"
      >
        <Search className="h-[19px] w-[19px] sm:h-5 sm:w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
      </button>

      {/* Wishlist Trigger */}
      <button
        suppressHydrationWarning
        onClick={openWishlist}
        className="group relative p-1.5 sm:p-2 text-[#111111] hover:text-[#8C9B3E] transition-colors focus:outline-none"
        aria-label="Open Wishlist"
        title="Wishlist"
      >
        <Heart className="h-[19px] w-[19px] sm:h-5 sm:w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
        {wishlistCount > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8C9B3E] text-[10px] font-bold text-white shadow-sm">
            {wishlistCount}
          </span>
        )}
      </button>

      {/* Cart Trigger */}
      <button
        suppressHydrationWarning
        onClick={openCart}
        className="group relative p-1.5 sm:p-2 text-[#111111] hover:text-[#8C9B3E] transition-colors focus:outline-none"
        aria-label="Open Cart Drawer"
        title="Cart Drawer"
      >
        <ShoppingBag className="h-[19px] w-[19px] sm:h-5 sm:w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
        {totalQuantity > 0 && (
          <span className="absolute top-0.5 right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#8C9B3E] text-[10px] font-bold text-white shadow-sm">
            {totalQuantity}
          </span>
        )}
      </button>

      {/* Account Trigger */}
      <button
        suppressHydrationWarning
        onClick={onOpenAccount}
        className="group relative p-1.5 sm:p-2 text-[#111111] hover:text-[#8C9B3E] transition-colors focus:outline-none"
        aria-label="Account Menu"
        title={isLoggedIn ? `Account (${customer?.firstName || customer?.email})` : 'Customer Account'}
      >
        <User className="h-[19px] w-[19px] sm:h-5 sm:w-5 stroke-[1.5] transition-transform duration-300 group-hover:scale-105" />
        {isLoggedIn && (
          <span className="absolute top-0.5 right-0.5 flex h-2 w-2 rounded-full bg-[#8C9B3E] shadow-[0_0_8px_#8C9B3E]" />
        )}
      </button>
    </div>
  );
}
