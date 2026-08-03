import { Product } from '@/types/product';
import { Collection } from '@/types/collection';
import { shopifyConfig } from '@/lib/shopify/config';

export interface MetadataInput {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
}

/**
 * Generate Next.js 15 metadata object.
 */
export function generateSEOPageMetadata({ title, description, url, image }: MetadataInput) {
  const siteName = 'Shopify Headless Store';
  const finalTitle = title ? `${title} | ${siteName}` : siteName;
  const finalDesc = description || 'Premium ecommerce store built with Next.js and Shopify Storefront API.';
  const canonical = url || `https://${shopifyConfig.domain}`;

  return {
    title: finalTitle,
    description: finalDesc,
    alternates: {
      canonical
    },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: canonical,
      siteName,
      images: image ? [{ url: image }] : [],
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      images: image ? [image] : []
    }
  };
}

/**
 * Generate Product JSON-LD Schema.
 */
export function generateProductJsonLd(product: Product) {
  const variant = product.variants?.nodes?.[0] || product.variants?.edges?.[0]?.node;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage?.url || [],
    offers: {
      '@type': 'Offer',
      price: variant?.price?.amount || product.priceRange.minVariantPrice.amount,
      priceCurrency: variant?.price?.currencyCode || product.priceRange.minVariantPrice.currencyCode,
      availability: product.availableForSale
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://${shopifyConfig.domain}/products/${product.handle}`
    }
  };
}

/**
 * Generate Collection JSON-LD Schema.
 */
export function generateCollectionJsonLd(collection: Collection) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collection.title,
    description: collection.description,
    url: `https://${shopifyConfig.domain}/collections/${collection.handle}`
  };
}

/**
 * Generate Organization JSON-LD Schema.
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Shopify Headless Store',
    url: `https://${shopifyConfig.domain}`
  };
}

/**
 * Generate Breadcrumb JSON-LD Schema.
 */
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
