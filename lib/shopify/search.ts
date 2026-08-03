import { shopifyFetch } from './fetch';
import { SearchResults, PredictiveSearchResult } from '@/types/search';
import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { Page } from '@/types/page';

import { SEARCH_QUERY } from '@/graphql/search/search';
import { PREDICTIVE_SEARCH_QUERY } from '@/graphql/search/predict-search';
import { SEARCH_PRODUCTS_QUERY } from '@/graphql/products/search-products';

/**
 * Execute unified Storefront API search across Products, Collections, and Pages.
 */
export async function searchAll(query: string, first: number = 20): Promise<SearchResults> {
  if (!query || query.trim() === '') {
    return { products: [], collections: [], pages: [], totalResults: 0 };
  }

  const data = await shopifyFetch<{
    search: {
      totalCount: number;
      edges: { node: any }[];
    };
  }>({
    query: SEARCH_QUERY,
    variables: { query, first },
    cache: 'no-store'
  });

  const products: Product[] = [];
  const collections: Collection[] = [];
  const pages: Page[] = [];

  data.search?.edges?.forEach((edge) => {
    const node = edge.node;
    if (node.__typename === 'Product' || node.handle && node.variants) {
      products.push(node);
    } else if (node.__typename === 'Collection' || node.products) {
      collections.push(node);
    } else if (node.__typename === 'Page' || node.body) {
      pages.push(node);
    }
  });

  return {
    products,
    collections,
    pages,
    totalResults: data.search?.totalCount || 0
  };
}

/**
 * Predictive search for autocomplete search bars.
 */
export async function getSearchSuggestions(query: string, limit: number = 5): Promise<PredictiveSearchResult> {
  if (!query || query.trim() === '') {
    return { products: [], collections: [], pages: [], queries: [] };
  }

  const data = await shopifyFetch<{
    predictiveSearch: PredictiveSearchResult;
  }>({
    query: PREDICTIVE_SEARCH_QUERY,
    variables: { query, limit },
    cache: 'no-store'
  });

  return {
    products: data.predictiveSearch?.products || [],
    collections: data.predictiveSearch?.collections || [],
    pages: data.predictiveSearch?.pages || [],
    queries: data.predictiveSearch?.queries || []
  };
}

/**
 * Dedicated Product Search wrapper.
 */
export async function searchProducts(query: string, first: number = 20): Promise<Product[]> {
  const data = await shopifyFetch<{
    search: { edges: { node: Product }[] };
  }>({
    query: SEARCH_PRODUCTS_QUERY,
    variables: { query, first },
    cache: 'no-store'
  });

  return data.search?.edges?.map((e) => e.node) || [];
}
