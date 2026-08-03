import { Cart } from '@/types/cart';
import { getCart } from './cart';

/**
 * Generate secure Shopify checkout URL from cart.
 */
export async function getCheckoutUrl(cartId: string): Promise<string> {
  const cart = await getCart(cartId);
  if (!cart || !cart.checkoutUrl) {
    throw new Error(`[Checkout Error]: Failed to retrieve valid checkout URL for cart ${cartId}`);
  }
  return cart.checkoutUrl;
}

/**
 * Construct secure Shopify checkout redirect URL.
 */
export function buildSecureCheckoutUrl(checkoutUrl: string): string {
  const url = new URL(checkoutUrl);
  // Ensure HTTPS protocol for secure redirection
  url.protocol = 'https:';
  return url.toString();
}
