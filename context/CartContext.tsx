'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Cart, CartLine } from '@/types/cart';
import { createCartAction, addToCartAction, updateCartLineAction, removeFromCartAction, applyDiscountAction } from '@/hooks/actions/cartActions';

interface CartContextType {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>;
  updateItem: (lineId: string, quantity: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
  applyDiscount: (code: string) => Promise<void>;
  totalQuantity: number;
  subtotalAmount: number;
  freeShippingThreshold: number;
  freeShippingProgress: number;
  amountUntilFreeShipping: number;
}

const CART_LOCAL_STORAGE_KEY = 'flois_cart_id';
const FREE_SHIPPING_THRESHOLD = 999;

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Initialize or fetch Cart from localStorage & Shopify Cart SDK
  useEffect(() => {
    async function initCart() {
      setIsLoading(true);
      try {
        const storedCartId = typeof window !== 'undefined' ? localStorage.getItem(CART_LOCAL_STORAGE_KEY) : null;
        if (storedCartId) {
          // Verify & fetch existing cart
          const res = await createCartAction();
          if (res.success && res.cart) {
            setCart(res.cart);
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, res.cart.id);
          }
        } else {
          const res = await createCartAction();
          if (res.success && res.cart) {
            setCart(res.cart);
            localStorage.setItem(CART_LOCAL_STORAGE_KEY, res.cart.id);
          }
        }
      } catch (e) {
        console.error('[CartContext] Initialization error:', e);
      } finally {
        setIsLoading(false);
      }
    }
    initCart();
  }, []);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const toggleCart = () => setIsOpen((prev) => !prev);

  const addItem = async (merchandiseId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      let currentCartId = cart?.id;
      if (!currentCartId) {
        const res = await createCartAction([{ merchandiseId, quantity }]);
        if (res.success && res.cart) {
          setCart(res.cart);
          localStorage.setItem(CART_LOCAL_STORAGE_KEY, res.cart.id);
        }
      } else {
        const res = await addToCartAction(currentCartId, [{ merchandiseId, quantity }]);
        if (res.success && res.cart) {
          setCart(res.cart);
        }
      }
      setIsOpen(true);
    } catch (err) {
      console.error('[CartContext] Add item error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateItem = async (lineId: string, quantity: number) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      if (quantity <= 0) {
        await removeItem(lineId);
      } else {
        const res = await updateCartLineAction(cart.id, [{ id: lineId, quantity }]);
        if (res.success && res.cart) {
          setCart(res.cart);
        }
      }
    } catch (err) {
      console.error('[CartContext] Update line error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const removeItem = async (lineId: string) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const res = await removeFromCartAction(cart.id, [lineId]);
      if (res.success && res.cart) {
        setCart(res.cart);
      }
    } catch (err) {
      console.error('[CartContext] Remove line error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyDiscount = async (code: string) => {
    if (!cart?.id) return;
    setIsLoading(true);
    try {
      const res = await applyDiscountAction(cart.id, [code]);
      if (res.success && res.cart) {
        setCart(res.cart);
      }
    } catch (err) {
      console.error('[CartContext] Apply discount error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const totalQuantity = cart?.totalQuantity || 0;
  const subtotalAmount = parseFloat(cart?.cost?.subtotalAmount?.amount || '0');
  const amountUntilFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotalAmount);
  const freeShippingProgress = Math.min(100, (subtotalAmount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        isLoading,
        openCart,
        closeCart,
        toggleCart,
        addItem,
        updateItem,
        removeItem,
        applyDiscount,
        totalQuantity,
        subtotalAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingProgress,
        amountUntilFreeShipping
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
