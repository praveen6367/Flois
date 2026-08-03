import { shopifyFetch, ShopifyFetchOptions } from './fetch';
import { shopifyConfig } from './config';

export function createShopifyClient() {
  return {
    config: shopifyConfig,
    fetch: shopifyFetch
  };
}

export const shopifyClient = createShopifyClient();
export { shopifyFetch };
