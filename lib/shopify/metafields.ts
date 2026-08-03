import { ShopifyMetafield } from '@/types/shopify';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { Customer } from '@/types/customer';
import { Page } from '@/types/page';

/**
 * Extract a specific metafield value by namespace and key.
 */
export function getMetafieldValue(
  metafields: (ShopifyMetafield | null)[] | undefined,
  namespace: string,
  key: string
): string | null {
  if (!metafields) return null;
  const match = metafields.find((m) => m && m.namespace === namespace && m.key === key);
  return match ? match.value : null;
}

/**
 * Read Product Metafields helper.
 */
export function readProductMetafields(product: Product, namespace: string, key?: string) {
  if (key) {
    return getMetafieldValue(product.metafields, namespace, key);
  }
  return product.metafields?.filter((m) => m && m.namespace === namespace) || [];
}

/**
 * Read Collection Metafields helper.
 */
export function readCollectionMetafields(collection: Collection, namespace: string, key?: string) {
  if (key) {
    return getMetafieldValue(collection.metafields, namespace, key);
  }
  return collection.metafields?.filter((m) => m && m.namespace === namespace) || [];
}

/**
 * Read Customer Metafields helper.
 */
export function readCustomerMetafields(customer: Customer & { metafields?: ShopifyMetafield[] }, namespace: string, key?: string) {
  if (key) {
    return getMetafieldValue(customer.metafields, namespace, key);
  }
  return customer.metafields?.filter((m) => m && m.namespace === namespace) || [];
}

/**
 * Read Page Metafields helper.
 */
export function readPageMetafields(page: Page, namespace: string, key?: string) {
  if (key) {
    return getMetafieldValue(page.metafields, namespace, key);
  }
  return page.metafields?.filter((m) => m && m.namespace === namespace) || [];
}
