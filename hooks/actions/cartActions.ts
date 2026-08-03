'use server';

import { createCart, addToCart, updateCartLine, removeFromCart, applyDiscountCode } from '@/lib/shopify/cart';
import { CartLineInput, CartLineUpdateInput } from '@/types/cart';

export async function createCartAction(lines?: CartLineInput[]) {
  try {
    const cart = await createCart(lines);
    return { success: true, cart };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function addToCartAction(cartId: string, lines: CartLineInput[]) {
  try {
    const cart = await addToCart(cartId, lines);
    return { success: true, cart };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCartLineAction(cartId: string, lines: CartLineUpdateInput[]) {
  try {
    const cart = await updateCartLine(cartId, lines);
    return { success: true, cart };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function removeFromCartAction(cartId: string, lineIds: string[]) {
  try {
    const cart = await removeFromCart(cartId, lineIds);
    return { success: true, cart };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function applyDiscountAction(cartId: string, discountCodes: string[]) {
  try {
    const cart = await applyDiscountCode(cartId, discountCodes);
    return { success: true, cart };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
