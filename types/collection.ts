import { ShopifyImage, ShopifySEO, ShopifyConnection, ShopifyMetafield } from './shopify';
import { Product } from './product';

export interface CollectionFilterValue {
  id: string;
  label: string;
  count: number;
  input: string;
}

export interface CollectionFilter {
  id: string;
  label: string;
  type: string;
  values: CollectionFilterValue[];
}

export interface Collection {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  updatedAt: string;
  image?: ShopifyImage | null;
  seo?: ShopifySEO | null;
  products: ShopifyConnection<Product>;
  metafields?: (ShopifyMetafield | null)[];
}

export interface CollectionQueryOptions {
  first?: number;
  after?: string;
  sortKey?: 'TITLE' | 'PRICE' | 'BEST_SELLING' | 'CREATED' | 'COLLECTION_DEFAULT' | 'RELEVANCE';
  reverse?: boolean;
  filters?: Record<string, unknown>[];
}
