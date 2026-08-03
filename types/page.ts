import { ShopifySEO, ShopifyMetafield } from './shopify';

export interface Page {
  id: string;
  handle: string;
  title: string;
  body: string;
  bodySummary: string;
  createdAt: string;
  updatedAt: string;
  seo?: ShopifySEO | null;
  metafields?: (ShopifyMetafield | null)[];
}
