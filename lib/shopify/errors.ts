import { ShopifyUserError } from '@/types/shopify';

export class ShopifyBaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ShopifyBaseError';
  }
}

export class ShopifyGraphQLError extends ShopifyBaseError {
  public errors: ShopifyUserError[] | any[];
  public queryName?: string;

  constructor(errors: ShopifyUserError[] | any[], queryName?: string) {
    const formattedMsg = errors.map((e) => e.message || JSON.stringify(e)).join('; ');
    super(`[Shopify GraphQL Error${queryName ? ` in ${queryName}` : ''}]: ${formattedMsg}`);
    this.name = 'ShopifyGraphQLError';
    this.errors = errors;
    this.queryName = queryName;
  }
}

export class ShopifyNetworkError extends ShopifyBaseError {
  public status: number;
  constructor(status: number, message: string) {
    super(`[Shopify Network Error ${status}]: ${message}`);
    this.name = 'ShopifyNetworkError';
    this.status = status;
  }
}

export class ShopifyAuthError extends ShopifyBaseError {
  constructor(message: string = 'Invalid or expired Shopify access token') {
    super(`[Shopify Auth Error]: ${message}`);
    this.name = 'ShopifyAuthError';
  }
}

export class ShopifyRateLimitError extends ShopifyBaseError {
  constructor(message: string = 'Shopify Storefront API rate limit exceeded') {
    super(`[Shopify Rate Limit Error]: ${message}`);
    this.name = 'ShopifyRateLimitError';
  }
}

export class ShopifyTimeoutError extends ShopifyBaseError {
  constructor(timeoutMs: number) {
    super(`[Shopify Timeout Error]: Request timed out after ${timeoutMs}ms`);
    this.name = 'ShopifyTimeoutError';
  }
}
