import { shopifyConfig } from './config';
import { getShopifyHeaders, HeaderOptions } from './headers';
import {
  ShopifyGraphQLError,
  ShopifyNetworkError,
  ShopifyAuthError,
  ShopifyRateLimitError,
  ShopifyTimeoutError
} from './errors';

export interface ShopifyFetchOptions<V = Record<string, unknown>> {
  query: string;
  variables?: V;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
  headersOptions?: HeaderOptions;
  timeoutMs?: number;
  maxRetries?: number;
  queryName?: string;
}

export interface ShopifyGraphQLResponse<T> {
  data: T;
  errors?: any[];
}

function extractQueryName(query: string): string {
  const match = query.match(/(?:query|mutation)\s+([A-Za-z0-9_]+)/);
  return match ? match[1] : 'AnonymousQuery';
}

export async function shopifyFetch<T, V = Record<string, unknown>>({
  query,
  variables,
  cache = 'force-cache',
  revalidate = 3600,
  tags = [],
  headersOptions,
  timeoutMs = 10000,
  maxRetries = 3,
  queryName
}: ShopifyFetchOptions<V>): Promise<T> {
  const name = queryName || extractQueryName(query);
  const startTime = Date.now();

  let attempt = 0;
  let delay = 300;

  while (attempt <= maxRetries) {
    attempt++;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const headers = getShopifyHeaders(headersOptions);

      const fetchOptions: RequestInit & { next?: { revalidate?: number | false; tags?: string[] } } = {
        method: 'POST',
        headers,
        body: JSON.stringify({ query, variables }),
        cache: cache === 'no-store' ? 'no-store' : cache,
        signal: controller.signal
      };

      if (cache !== 'no-store') {
        fetchOptions.next = {
          revalidate,
          tags
        };
      }

      const response = await fetch(shopifyConfig.endpoint, fetchOptions);
      clearTimeout(timeoutId);

      const duration = Date.now() - startTime;

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[Shopify API] ${name} | ${response.status} | ${duration}ms | Attempt ${attempt}/${maxRetries + 1}`
        );
      }

      if (response.status === 429) {
        if (attempt <= maxRetries) {
          await new Promise((res) => setTimeout(res, delay));
          delay *= 2;
          continue;
        }
        throw new ShopifyRateLimitError();
      }

      if (response.status === 401 || response.status === 403) {
        throw new ShopifyAuthError(`Unauthorized request to Shopify Storefront API (${response.status})`);
      }

      if (!response.ok) {
        if (response.status >= 500 && attempt <= maxRetries) {
          await new Promise((res) => setTimeout(res, delay));
          delay *= 2;
          continue;
        }
        throw new ShopifyNetworkError(response.status, response.statusText);
      }

      const result: ShopifyGraphQLResponse<T> = await response.json();

      if (result.errors && result.errors.length > 0) {
        throw new ShopifyGraphQLError(result.errors, name);
      }

      return result.data;
    } catch (error: any) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        if (attempt <= maxRetries) {
          await new Promise((res) => setTimeout(res, delay));
          delay *= 2;
          continue;
        }
        throw new ShopifyTimeoutError(timeoutMs);
      }

      if (
        (error instanceof ShopifyGraphQLError || error instanceof ShopifyAuthError) ||
        attempt > maxRetries
      ) {
        throw error;
      }

      await new Promise((res) => setTimeout(res, delay));
      delay *= 2;
    }
  }

  throw new Error(`[Shopify Client]: Operation ${name} failed after ${maxRetries} retries.`);
}
