import { ShopifyMoney, ShopifyImage, ShopifySEO, ShopifyConnection, ShopifyMetafield } from './shopify';
import { Metaobject } from './metaobject';

export interface SelectedOption {
  name: string;
  value: string;
}

export interface ProductOption {
  id: string;
  name: string;
  values: string[];
}

export interface ProductVariant {
  id: string;
  title: string;
  sku?: string | null;
  availableForSale: boolean;
  requiresShipping: boolean;
  selectedOptions: SelectedOption[];
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney | null;
  image?: ShopifyImage | null;
  quantityAvailable?: number | null;
}

export interface Product {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  availableForSale: boolean;
  vendor: string;
  productType: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  } | null;
  featuredImage?: ShopifyImage | null;
  images: ShopifyConnection<ShopifyImage>;
  options: ProductOption[];
  variants: ShopifyConnection<ProductVariant>;
  metafields?: (ShopifyMetafield | null)[];
  metaobjects?: (Metaobject | null)[];
  seo?: ShopifySEO | null;
}

export interface ProductSortKeys {
  sortKey?: 'TITLE' | 'PRODUCT_TYPE' | 'VENDOR' | 'CREATED_AT' | 'BEST_SELLING' | 'PRICE' | 'RELEVANCE';
  reverse?: boolean;
}

export interface ProductQueryOptions extends ProductSortKeys {
  first?: number;
  after?: string;
  query?: string;
}
