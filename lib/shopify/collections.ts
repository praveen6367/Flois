import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS } from './cache';
import { Collection, CollectionQueryOptions } from '@/types/collection';
import { Product } from '@/types/product';

import { GET_COLLECTIONS_QUERY } from '@/graphql/collections/get-collections';
import { GET_COLLECTION_BY_HANDLE_QUERY } from '@/graphql/collections/get-collection';
import { GET_FEATURED_COLLECTIONS_QUERY } from '@/graphql/collections/get-featured-collections';

function reshapeCollection(collection: any): Collection {
  if (!collection) return null as any;

  return {
    ...collection,
    products: {
      edges: collection.products?.edges || [],
      nodes: collection.products?.edges?.map((e: any) => e.node) || [],
      pageInfo: collection.products?.pageInfo || { hasNextPage: false, hasPreviousPage: false }
    }
  };
}

/**
 * Fetch all collections with pagination.
 */
export async function getCollections(first: number = 20, after?: string): Promise<{
  collections: Collection[];
  pageInfo: any;
}> {
  const data = await shopifyFetch<{
    collections: {
      edges: { node: any }[];
      pageInfo: any;
    };
  }>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first, after },
    tags: [SHOPIFY_CACHE_TAGS.collections]
  });

  return {
    collections: data.collections?.edges?.map((e) => reshapeCollection(e.node)) || [],
    pageInfo: data.collections?.pageInfo
  };
}

/**
 * Fetch a single collection by handle including products, filtering, and sorting.
 */
export async function getCollectionByHandle(
  handle: string,
  options?: CollectionQueryOptions
): Promise<Collection | null> {
  const data = await shopifyFetch<{ collection: any }>({
    query: GET_COLLECTION_BY_HANDLE_QUERY,
    variables: {
      handle,
      first: options?.first || 20,
      after: options?.after,
      sortKey: options?.sortKey || 'RELEVANCE',
      reverse: options?.reverse || false,
      filters: options?.filters
    },
    tags: [SHOPIFY_CACHE_TAGS.collection(handle), SHOPIFY_CACHE_TAGS.collections]
  });

  return data.collection ? reshapeCollection(data.collection) : null;
}

/**
 * Fetch featured collections.
 */
export async function getFeaturedCollections(first: number = 6): Promise<Collection[]> {
  const data = await shopifyFetch<{
    collections: { edges: { node: any }[] };
  }>({
    query: GET_FEATURED_COLLECTIONS_QUERY,
    variables: { first },
    tags: [SHOPIFY_CACHE_TAGS.collections]
  });

  return data.collections?.edges?.map((e) => reshapeCollection(e.node)) || [];
}

/**
 * Extract products from collection.
 */
export function getCollectionProducts(collection: Collection): Product[] {
  return collection.products?.nodes || collection.products?.edges?.map((e) => e.node) || [];
}

/**
 * Extract collection metadata/filters.
 */
export function getCollectionFilters(collection: any) {
  return collection.products?.filters || [];
}
