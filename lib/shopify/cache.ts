export const SHOPIFY_CACHE_TAGS = {
  products: 'shopify-products',
  product: (handle: string) => `shopify-product-${handle}`,
  collections: 'shopify-collections',
  collection: (handle: string) => `shopify-collection-${handle}`,
  cart: (cartId: string) => `shopify-cart-${cartId}`,
  menu: (handle: string) => `shopify-menu-${handle}`,
  pages: 'shopify-pages',
  page: (handle: string) => `shopify-page-${handle}`,
  metaobjects: 'shopify-metaobjects'
} as const;

export function revalidateShopifyTag(tag: string): void {
  try {
    // Lazy require to prevent bundling next/cache in client components
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { revalidateTag } = require('next/cache');
    revalidateTag(tag);
  } catch (error) {
    console.warn(`[Shopify Cache] Revalidate tag "${tag}" skipped outside Next.js request context:`, error);
  }
}
