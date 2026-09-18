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

import { getProductType, resolveShopifyHandle } from '@/lib/productClassifier';

function reshapeProduct(product: any): Product {
  if (!product) return null as any;

  const productType = getProductType({ handle: product.handle, title: product.title });
  const isRootHerb = productType === 'hair-oil';
  const isComb = productType === 'comb';
  const isSunscreen = productType === 'sunscreen';

  let priceRange = product.priceRange;
  let compareAtPriceRange = product.compareAtPriceRange;

  const currency = priceRange?.minVariantPrice?.currencyCode || 'INR';

  // Strict price normalization per client brief
  if (isRootHerb) {
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
  } else if (isComb) {
    priceRange = {
      ...priceRange,
      minVariantPrice: { amount: '119.0', currencyCode: currency },
      maxVariantPrice: { amount: '119.0', currencyCode: currency }
    };
    compareAtPriceRange = {
      ...compareAtPriceRange,
      minVariantPrice: { amount: '229.0', currencyCode: currency },
      maxVariantPrice: { amount: '229.0', currencyCode: currency }
    };
  } else if (isSunscreen) {
    priceRange = {
      ...priceRange,
      minVariantPrice: { amount: '369.0', currencyCode: currency },
      maxVariantPrice: { amount: '369.0', currencyCode: currency }
    };
    compareAtPriceRange = {
      ...compareAtPriceRange,
      minVariantPrice: { amount: '699.0', currencyCode: currency },
      maxVariantPrice: { amount: '699.0', currencyCode: currency }
    };
  }

  const targetPrice = isRootHerb ? '699.0' : isComb ? '119.0' : '369.0';
  const targetComparePrice = isRootHerb ? '899.0' : isComb ? '229.0' : '699.0';

  const rawVariantsEdges = product.variants?.edges?.map((e: any) => {
    const node = e.node;
    if (node) {
      return {
        ...e,
        node: {
          ...node,
          price: { amount: targetPrice, currencyCode: node.price?.currencyCode || currency },
          compareAtPrice: { amount: targetComparePrice, currencyCode: node.compareAtPrice?.currencyCode || currency }
        }
      };
    }
    return e;
  }) || [];

  const rawVariantsNodes = rawVariantsEdges.map((e: any) => e.node);

  let description = product.description || '';
  let descriptionHtml = product.descriptionHtml || '';

  if (isComb) {
    // Strip accidental hair-oil copy if product was cloned in Shopify
    const cutoffKeywords = ["What's inside the Bottle", "What&#39;s inside the Bottle", "The 120-Day Growth Journey", "Your Free Scalp Stimulating Neem Comb", "TESTIN", "OLEOKARE", "Hair Growth Oil"];
    for (const kw of cutoffKeywords) {
      if (description.includes(kw)) {
        description = description.split(kw)[0].trim();
      }
      if (descriptionHtml.includes(kw)) {
        descriptionHtml = descriptionHtml.split(kw)[0].trim();
      }
    }
  } else if (isSunscreen) {
    // Ensure no hair oil or comb references exist in sunscreen description
    const cutoffKeywords = ["What's inside the Bottle", "What&#39;s inside the Bottle", "The 120-Day Growth Journey", "Neem Comb", "OleoKare", "hair fall", "Hair Growth Oil"];
    for (const kw of cutoffKeywords) {
      if (description.includes(kw)) {
        description = description.split(kw)[0].trim();
      }
      if (descriptionHtml.includes(kw)) {
        descriptionHtml = descriptionHtml.split(kw)[0].trim();
      }
    }
  }

  return {
    ...product,
    description,
    descriptionHtml,
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
 * Fetch a single product by Handle (with fallback to canonical handle).
 */
export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{ product: any }>({
    query: GET_PRODUCT_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [SHOPIFY_CACHE_TAGS.product(handle), SHOPIFY_CACHE_TAGS.products]
  });

  if (data.product) {
    return reshapeProduct(data.product);
  }

  // If not found with input handle, try canonical handle
  const canonicalHandle = resolveShopifyHandle(handle);
  if (canonicalHandle !== handle) {
    const data2 = await shopifyFetch<{ product: any }>({
      query: GET_PRODUCT_BY_HANDLE_QUERY,
      variables: { handle: canonicalHandle },
      tags: [SHOPIFY_CACHE_TAGS.product(canonicalHandle), SHOPIFY_CACHE_TAGS.products]
    });
    if (data2.product) {
      return reshapeProduct(data2.product);
    }
  }

  return null;
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
