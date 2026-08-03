/**
 * Common Shopify Storefront API Data Types
 */

export interface ShopifyMoney {
  amount: string;
  currencyCode: string;
}

export interface ShopifyImage {
  id?: string;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
}

export interface ShopifySEO {
  title?: string | null;
  description?: string | null;
}

export interface ShopifyPageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export interface ShopifyEdge<T> {
  cursor: string;
  node: T;
}

export interface ShopifyConnection<T> {
  edges: ShopifyEdge<T>[];
  pageInfo: ShopifyPageInfo;
  nodes?: T[];
}

export interface ShopifyMetafield {
  id: string;
  namespace: string;
  key: string;
  value: string;
  type: string;
  description?: string | null;
}

export type ShopifyUserError = {
  field?: string[] | null;
  message: string;
  code?: string | null;
};
