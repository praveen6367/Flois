import { z } from 'zod';

const shopifyEnvSchema = z.object({
  SHOPIFY_STORE_DOMAIN: z
    .string({ required_error: 'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN is required' })
    .min(1, 'NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN cannot be empty'),
  SHOPIFY_STOREFRONT_ACCESS_TOKEN: z
    .string({ required_error: 'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN is required' })
    .min(1, 'NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN cannot be empty'),
  SHOPIFY_API_VERSION: z
    .string()
    .default('2024-07'),
  SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID: z.string().optional().default(''),
  SHOPIFY_CUSTOMER_ACCOUNT_URL: z.string().optional().default('')
});

function getShopifyConfig() {
  const env = {
    SHOPIFY_STORE_DOMAIN: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
    SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    SHOPIFY_API_VERSION: process.env.NEXT_PUBLIC_SHOPIFY_API_VERSION || '2024-07',
    SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID: process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
    SHOPIFY_CUSTOMER_ACCOUNT_URL: process.env.SHOPIFY_CUSTOMER_ACCOUNT_URL
  };

  const parsed = shopifyEnvSchema.safeParse(env);

  if (!parsed.success) {
    const formattedErrors = parsed.error.issues
      .map((issue) => ` - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`[Shopify Integration Error] Invalid Environment Variables Configuration:\n${formattedErrors}`);
  }

  const domain = parsed.data.SHOPIFY_STORE_DOMAIN.replace(/^https?:\/\//, '').replace(/\/$/, '');
  const endpoint = `https://${domain}/api/${parsed.data.SHOPIFY_API_VERSION}/graphql.json`;

  return {
    domain,
    storefrontAccessToken: parsed.data.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    apiVersion: parsed.data.SHOPIFY_API_VERSION,
    endpoint,
    customerAccountId: parsed.data.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID,
    customerAccountUrl: parsed.data.SHOPIFY_CUSTOMER_ACCOUNT_URL
  };
}

export const shopifyConfig = getShopifyConfig();
