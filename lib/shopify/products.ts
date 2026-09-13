import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS } from './cache';
import { Product, ProductVariant, ProductQueryOptions } from '@/types/product';
import { ShopifyImage, ShopifyMetafield } from '@/types/shopify';
import { Metaobject } from '@/types/metaobject';

import { GET_PRODUCT_QUERY } from '@/graphql/products/get-product';
import { GET_PRODUCT_BY_HANDLE_QUERY } from '@/graphql/products/get-product-by-handle';
import { GET_PRODUCTS_QUERY } from '@/graphql/products/get-products';
import { GET_FEATURED_PRODUCTS_QUERY } from '@/graphql/products/get-featured-products';
import { GET_PRODUCT_RECOMMENDATIONS_QUERY } from '@/graphql/products/get-recommendations';

function reshapeProduct(product: any): Product {
  if (!product) return null as any;

  const h = (product.handle || product.title || '').toLowerCase();
  const isRootHerb = h.includes('rootherb') || h.includes('hair-growth-oil');

  let priceRange = product.priceRange;
  let compareAtPriceRange = product.compareAtPriceRange;

  // RootHerb price normalization fallback (Selling: ₹699, Compare-at: ₹899)
  if (isRootHerb) {
    const currency = priceRange?.minVariantPrice?.currencyCode || 'INR';
    priceRange = {
      ...priceRange,
      minVariantPrice: { amount: '699.0', currencyCode: currency },
      maxVariantPrice: { amount: '699.0', currencyCode: currency }
    };
    compareAtPriceRange = {
      ...compareAtPriceRange,
      minVariantPrice: { amount: '899.0', currencyCode: currency },
      maxVariantPrice: { amount: '899.0', currencyCode: currency }
    };
  }

  const rawVariantsEdges = product.variants?.edges?.map((e: any) => {
    const node = e.node;
    if (isRootHerb && node) {
      return {
        ...e,
        node: {
          ...node,
          price: { amount: '699.0', currencyCode: node.price?.currencyCode || 'INR' },
          compareAtPrice: { amount: '899.0', currencyCode: node.compareAtPrice?.currencyCode || 'INR' }
        }
      };
    }
    return e;
  }) || [];

  const rawVariantsNodes = rawVariantsEdges.map((e: any) => e.node);

  return {
    ...product,
    priceRange,
    compareAtPriceRange,
    images: {
      edges: product.images?.edges || [],
      nodes: product.images?.edges?.map((e: any) => e.node) || [],
      pageInfo: product.images?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
    },
    variants: {
      edges: rawVariantsEdges,
      nodes: rawVariantsNodes,
      pageInfo: product.variants?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
    }
  };
}

/**
 * Fetch a single product by Shopify ID.
 */
export async function getProduct(id: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: any }>({
    query: GET_PRODUCT_QUERY,
    variables: { id },
    tags: [SHOPIFY_CACHE_TAGS.products]
  });

  return data.product ? reshapeProduct(data.product) : null;
}

/**
 * Fetch a single product by Handle.
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: any }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [SHOPIFY_CACHE_TAGS.product(handle), SHOPIFY_CACHE_TAGS.products]
  });

  return data.product ? reshapeProduct(data.product) : null;
}

/**
 * Fetch paginated products list with sorting and query options.
 */
export async function getProducts(options?: ProductQueryOptions): Promise<{
  products: Product[];
  pageInfo: any;
}> {
  const data = await shopifyFetch<{
    products: {
      edges: { node: any }[];
      pageInfo: any;
    };
  }>({
    query: GET_PRODUCTS_QUERY,
    variables: {
      first: options?.first || 20,
      after: options?.after,
      sortKey: options?.sortKey || 'RELEVANCE',
      reverse: options?.reverse || false,
      query: options?.query
    },
    tags: [SHOPIFY_CACHE_TAGS.products]
  });

  return {
    products: data.products?.edges?.map((edge) => reshapeProduct(edge.node)) || [],
    pageInfo: data.products?.pageInfo
  };
}

/**
 * Fetch featured products.
 */
export async function getFeaturedProducts(first: number = 8): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: { node: any }[] };
  }>({
    query: GET_FEATURED_PRODUCTS_QUERY,
    variables: { first },
    tags: [SHOPIFY_CACHE_TAGS.products]
  });

  return data.products?.edges?.map((edge) => reshapeProduct(edge.node)) || [];
}

/**
 * Fetch best sellers.
 */
export async function getBestSellers(first: number = 10): Promise<Product[]> {
  return getProducts({ first, sortKey: 'BEST_SELLING' }).then((res) => res.products);
}

/**
 * Fetch newest products.
 */
export async function getNewestProducts(first: number = 10): Promise<Product[]> {
  return getProducts({ first, sortKey: 'CREATED_AT', reverse: true }).then((res) => res.products);
}

/**
 * Fetch recommended products for a given Product ID.
 */
export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const data = await shopifyFetch<{
    productRecommendations: any[];
  }>({
    query: GET_PRODUCT_RECOMMENDATIONS_QUERY,
    variables: { productId },
    tags: [SHOPIFY_CACHE_TAGS.products]
  });

  return data.productRecommendations?.map((p) => reshapeProduct(p)) || [];
}

/**
 * Fetch related products wrapper.
 */
export async function getRelatedProducts(productId: string): Promise<Product[]> {
  return getProductRecommendations(productId);
}

/**
 * Extract variants from product.
 */
export function getProductVariants(product: Product): ProductVariant[] {
  return product.variants?.nodes || product.variants?.edges?.map((e) => e.node) || [];
}

/**
 * Extract product images.
 */
export function getProductImages(product: Product): ShopifyImage[] {
  return product.images?.nodes || product.images?.edges?.map((e) => e.node) || [];
}

/**
 * Check product availability.
 */
export function getProductAvailability(product: Product): boolean {
  return product.availableForSale;
}

/**
 * Extract product options.
 */
export function getProductOptions(product: Product) {
  return product.options || [];
}

/**
 * Extract price range summary.
 */
export function getProductPricing(product: Product) {
  return {
    priceRange: product.priceRange,
    compareAtPriceRange: product.compareAtPriceRange
  };
}

/**
 * Extract inventory status.
 */
export function getProductInventory(product: Product) {
  const variants = getProductVariants(product);
  const totalAvailable = variants.reduce(
    (acc, variant) => acc + (variant.quantityAvailable || 0),
    0
  );
  return {
    isAvailable: product.availableForSale,
    totalAvailable,
    variants: variants.map((v) => ({
      id: v.id,
      title: v.title,
      available: v.availableForSale,
      quantity: v.quantityAvailable ?? null
    }))
  };
}

/**
 * Extract SEO metadata from product.
 */
export function getProductSEO(product: Product) {
  return {
    title: product.seo?.title || product.title,
    description: product.seo?.description || product.description
  };
}

/**
 * Helper to retrieve product metafields.
 */
export function getProductMetafields(product: Product): (ShopifyMetafield | null)[] {
  return product.metafields || [];
}

/**
 * Helper to retrieve product metaobjects.
 */
export function getProductMetaobjects(product: Product): (Metaobject | null)[] {
  return product.metaobjects || [];
}
