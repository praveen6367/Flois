import { shopifyFetch } from './fetch';
import { GET_SHOP_BRAND_QUERY } from '@/graphql/shop/get-shop';
import { ShopifyImage } from '@/types/shopify';

export interface ShopBrandData {
  name: string;
  description?: string | null;
  logo?: ShopifyImage | null;
  squareLogo?: ShopifyImage | null;
}

/**
 * Fetch official shop brand metadata & logo from Shopify Storefront API.
 */
export async function getShopBrand(): Promise<ShopBrandData | null> {
  try {
    const data = await shopifyFetch<{ shop: any }>({
      query: GET_SHOP_BRAND_QUERY,
      cache: 'force-cache',
      revalidate: 3600
    });

    if (!data.shop) return null;

    return {
      name: data.shop.name,
      description: data.shop.description,
      logo: data.shop.brand?.logo?.image || null,
      squareLogo: data.shop.brand?.squareLogo?.image || null
    };
  } catch (err) {
    console.warn('[Shopify SDK] Failed to fetch shop brand logo:', err);
    return null;
  }
}
