'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWishlist: (handle: string) => void;
  isInWishlist: (handle: string) => boolean;
  wishlistCount: number;
  isOpen: boolean;
  openWishlist: () => void;
  closeWishlist: () => void;
}

const WISHLIST_STORAGE_KEY = 'flois_wishlist';

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.error('[WishlistContext] Read error:', e);
    }
  }, []);

  const saveWishlist = (items: string[]) => {
    setWishlist(items);
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('[WishlistContext] Save error:', e);
    }
  };

  const toggleWishlist = (handle: string) => {
    if (wishlist.includes(handle)) {
      saveWishlist(wishlist.filter((item) => item !== handle));
    } else {
      saveWishlist([...wishlist, handle]);
    }
  };

  const isInWishlist = (handle: string) => wishlist.includes(handle);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
        isOpen,
        openWishlist: () => setIsOpen(true),
        closeWishlist: () => setIsOpen(false)
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
