import { shopifyConfig } from './config';

export interface HeaderOptions {
  buyerIp?: string;
  customerAccessToken?: string;
  customHeaders?: Record<string, string>;
}

export function getShopifyHeaders(options?: HeaderOptions): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Shopify-Storefront-Access-Token': shopifyConfig.storefrontAccessToken,
    ...options?.customHeaders
  };

  if (options?.buyerIp) {
    headers['Shopify-Storefront-Buyer-IP'] = options.buyerIp;
  }

  if (options?.customerAccessToken) {
    headers['X-Shopify-Customer-Access-Token'] = options.customerAccessToken;
  }

  return headers;
}
