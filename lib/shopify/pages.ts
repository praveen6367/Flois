import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS } from './cache';
import { Page } from '@/types/page';

import { GET_PAGE_BY_HANDLE_QUERY } from '@/graphql/pages/get-page';
import { GET_PAGES_QUERY } from '@/graphql/pages/get-pages';

/**
 * Fetch a single page by handle.
 */
export async function getPage(handle: string): Promise<Page | null> {
  const data = await shopifyFetch<{ page: Page }>({
    query: GET_PAGE_BY_HANDLE_QUERY,
    variables: { handle },
    tags: [SHOPIFY_CACHE_TAGS.page(handle), SHOPIFY_CACHE_TAGS.pages]
  });

  return data.page || null;
}

/**
 * Fetch paginated static pages.
 */
export async function getPages(first: number = 20, after?: string): Promise<{
  pages: Page[];
  pageInfo: any;
}> {
  const data = await shopifyFetch<{
    pages: {
      edges: { node: Page }[];
      pageInfo: any;
    };
  }>({
    query: GET_PAGES_QUERY,
    variables: { first, after },
    tags: [SHOPIFY_CACHE_TAGS.pages]
  });

  return {
    pages: data.pages?.edges?.map((e) => e.node) || [],
    pageInfo: data.pages?.pageInfo
  };
}
