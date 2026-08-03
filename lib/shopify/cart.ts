import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS, revalidateShopifyTag } from './cache';
import { Cart, CartLineInput, CartLineUpdateInput, CartBuyerIdentity } from '@/types/cart';

import { GET_CART_QUERY } from '@/graphql/cart/get-cart';
import { CREATE_CART_MUTATION } from '@/graphql/cart/create-cart';
import { ADD_CART_LINES_MUTATION } from '@/graphql/cart/add-lines';
import { UPDATE_CART_LINES_MUTATION } from '@/graphql/cart/update-lines';
import { REMOVE_CART_LINES_MUTATION } from '@/graphql/cart/remove-lines';
import { UPDATE_CART_DISCOUNT_CODES_MUTATION } from '@/graphql/cart/update-discount';
import { UPDATE_CART_BUYER_IDENTITY_MUTATION } from '@/graphql/cart/update-buyer';
import { UPDATE_CART_NOTE_MUTATION } from '@/graphql/cart/update-note';

function reshapeCart(cart: any): Cart {
  if (!cart) return null as any;

  return {
    ...cart,
    lines: cart.lines?.edges?.map((edge: any) => edge.node) || [],
    cost: {
      ...cart.cost,
      checkoutUrl: cart.checkoutUrl
    }
  };
}

/**
 * Fetch a cart by cartId.
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  const data = await shopifyFetch<{ cart: any }>({
    query: GET_CART_QUERY,
    variables: { cartId },
    cache: 'no-store',
    tags: [SHOPIFY_CACHE_TAGS.cart(cartId)]
  });

  return data.cart ? reshapeCart(data.cart) : null;
}

/**
 * Create a new Shopify cart.
 */
export async function createCart(lines?: CartLineInput[], buyerIdentity?: CartBuyerIdentity): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: { cart: any; userErrors: any[] };
  }>({
    query: CREATE_CART_MUTATION,
    variables: {
      input: {
        lines: lines || [],
        buyerIdentity
      }
    },
    cache: 'no-store'
  });

  if (data.cartCreate.userErrors && data.cartCreate.userErrors.length > 0) {
    throw new Error(`[Cart Create Error]: ${data.cartCreate.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartCreate.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cart.id));
  return cart;
}

/**
 * Add items to cart.
 */
export async function addToCart(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: { cart: any; userErrors: any[] };
  }>({
    query: ADD_CART_LINES_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  if (data.cartLinesAdd.userErrors && data.cartLinesAdd.userErrors.length > 0) {
    throw new Error(`[Add To Cart Error]: ${data.cartLinesAdd.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartLinesAdd.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}

/**
 * Update cart line items.
 */
export async function updateCartLine(cartId: string, lines: CartLineUpdateInput[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: { cart: any; userErrors: any[] };
  }>({
    query: UPDATE_CART_LINES_MUTATION,
    variables: { cartId, lines },
    cache: 'no-store'
  });

  if (data.cartLinesUpdate.userErrors && data.cartLinesUpdate.userErrors.length > 0) {
    throw new Error(`[Update Cart Line Error]: ${data.cartLinesUpdate.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartLinesUpdate.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}

/**
 * Remove items from cart.
 */
export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: { cart: any; userErrors: any[] };
  }>({
    query: REMOVE_CART_LINES_MUTATION,
    variables: { cartId, lineIds },
    cache: 'no-store'
  });

  if (data.cartLinesRemove.userErrors && data.cartLinesRemove.userErrors.length > 0) {
    throw new Error(`[Remove From Cart Error]: ${data.cartLinesRemove.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartLinesRemove.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}

/**
 * Apply discount codes to cart.
 */
export async function applyDiscountCode(cartId: string, discountCodes: string[]): Promise<Cart> {
  const data = await shopifyFetch<{
    cartDiscountCodesUpdate: { cart: any; userErrors: any[] };
  }>({
    query: UPDATE_CART_DISCOUNT_CODES_MUTATION,
    variables: { cartId, discountCodes },
    cache: 'no-store'
  });

  if (data.cartDiscountCodesUpdate.userErrors && data.cartDiscountCodesUpdate.userErrors.length > 0) {
    throw new Error(`[Apply Discount Error]: ${data.cartDiscountCodesUpdate.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartDiscountCodesUpdate.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}

/**
 * Apply gift card code wrapper.
 */
export async function applyGiftCard(cartId: string, giftCardCode: string): Promise<Cart> {
  return applyDiscountCode(cartId, [giftCardCode]);
}

/**
 * Update cart buyer identity.
 */
export async function updateCartBuyerIdentity(cartId: string, buyerIdentity: CartBuyerIdentity): Promise<Cart> {
  const data = await shopifyFetch<{
    cartBuyerIdentityUpdate: { cart: any; userErrors: any[] };
  }>({
    query: UPDATE_CART_BUYER_IDENTITY_MUTATION,
    variables: { cartId, buyerIdentity },
    cache: 'no-store'
  });

  if (data.cartBuyerIdentityUpdate.userErrors && data.cartBuyerIdentityUpdate.userErrors.length > 0) {
    throw new Error(`[Update Buyer Identity Error]: ${data.cartBuyerIdentityUpdate.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartBuyerIdentityUpdate.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}

/**
 * Update cart note.
 */
export async function updateCartNote(cartId: string, note: string): Promise<Cart> {
  const data = await shopifyFetch<{
    cartNoteUpdate: { cart: any; userErrors: any[] };
  }>({
    query: UPDATE_CART_NOTE_MUTATION,
    variables: { cartId, note },
    cache: 'no-store'
  });

  if (data.cartNoteUpdate.userErrors && data.cartNoteUpdate.userErrors.length > 0) {
    throw new Error(`[Update Cart Note Error]: ${data.cartNoteUpdate.userErrors[0].message}`);
  }

  const cart = reshapeCart(data.cartNoteUpdate.cart);
  revalidateShopifyTag(SHOPIFY_CACHE_TAGS.cart(cartId));
  return cart;
}
