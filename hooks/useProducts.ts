'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types/product';

const WISHLIST_STORAGE_KEY = 'flois_wishlist_handles';

export function useWishlist() {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        setWishlist(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('[useWishlist] Failed to load wishlist from localStorage', e);
    }
  }, []);

  const toggleWishlist = (handle: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(handle);
      const next = exists ? prev.filter((h) => h !== handle) : [...prev, handle];
      try {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.warn('[useWishlist] Failed to save wishlist', e);
      }
      return next;
    });
  };

  const isWishlisted = (handle: string) => wishlist.includes(handle);

  return { wishlist, toggleWishlist, isWishlisted };
}
