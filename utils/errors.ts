import { ShopifyBaseError } from '@/lib/shopify/errors';

export function formatErrorMessage(error: unknown): string {
  if (error instanceof ShopifyBaseError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred while communicating with Shopify.';
}
