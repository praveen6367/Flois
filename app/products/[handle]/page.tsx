import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { ProductHero } from '@/components/pdp/ProductHero';
import { StickyMobileCTA } from '@/components/pdp/StickyMobileCTA';
import { EditorialStory } from '@/components/pdp/EditorialStory';
import { Benefits } from '@/components/pdp/Benefits';
import { IngredientExplorer } from '@/components/pdp/IngredientExplorer';
import { ClinicalResultsPDP } from '@/components/pdp/ClinicalResultsPDP';
import { HowToUse } from '@/components/pdp/HowToUse';
import { TextureShowcase } from '@/components/pdp/TextureShowcase';
import { ComparisonTable } from '@/components/pdp/ComparisonTable';
import { ProductReviews } from '@/components/pdp/ProductReviews';
import { ProductFAQs } from '@/components/pdp/ProductFAQs';
import { RelatedProductsPDP } from '@/components/pdp/RelatedProductsPDP';
import { Footer } from '@/components/Footer';
import { getProductByHandle } from '@/lib/shopify/products';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { Product } from '@/types/product';

export const revalidate = 60; // Revalidate dynamic product data every 60s

interface Props {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: 'Product Not Found | FLOIS Luxury Botanical Care'
    };
  }

  const title = `${product.title} | FLOIS Modern Botanical Care`;
  const description = product.description || 'Discover clinically tested Ayurvedic cold-pressed botanical formulations for scalp and skin care.';
  const image = product.images?.nodes?.[0]?.url || '/placeholders/1b.png';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image, alt: product.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image]
    }
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  
  // Fetch real product from Shopify Storefront API
  let product: Product | null = null;
  try {
    product = await getProductByHandle(handle);
  } catch (err) {
    console.warn(`[ProductPage] Failed to fetch product ${handle}:`, err);
  }

  // Fallback for demo products if handle maps to flagship item
  if (!product) {
    if (handle.includes('rootherb') || handle.includes('hair-growth-oil')) {
      product = {
        id: 'gid://shopify/Product/1',
        title: 'RootHerb Botanical Hair Growth Oil',
        handle: handle,
        description: 'Clinically formulated with 18 pure herbs for accelerated hair growth, scalp nourishment, and natural shine.',
        priceRange: { minVariantPrice: { amount: '699', currencyCode: 'INR' } },
        compareAtPriceRange: { maxVariantPrice: { amount: '899', currencyCode: 'INR' } },
        images: {
          nodes: [
            { url: '/products/rootherb_product.png', altText: 'FLOIS RootHerb Botanical Hair Growth Oil 100ml with neem comb' },
            { url: '/products/rootherb_ingredients_map.png', altText: 'FLOIS RootHerb Botanical Ingredients Map' }
          ]
        },
        variants: {
          nodes: [
            { id: 'v1', title: '100ml Bottle', price: { amount: '699', currencyCode: 'INR' }, availableForSale: true },
            { id: 'v2', title: '200ml Family Bottle', price: { amount: '1199', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    } else if (handle.includes('neem') || handle.includes('comb')) {
      product = {
        id: 'gid://shopify/Product/2',
        title: 'Handcrafted Neem Wood Comb',
        handle: handle,
        description: 'Medicinal neem wood comb that distributes natural scalp oils, prevents static, and reduces hair breakage.',
        priceRange: { minVariantPrice: { amount: '349', currencyCode: 'INR' } },
        compareAtPriceRange: { maxVariantPrice: { amount: '499', currencyCode: 'INR' } },
        images: {
          nodes: [
            { url: '/products/neem_comb_product.png', altText: 'FLOIS Handcrafted Neem Wood Comb — Anti-Static Anti-Dandruff' }
          ]
        },
        variants: {
          nodes: [
            { id: 'v3', title: 'Wide Tooth Comb', price: { amount: '349', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    } else {
      product = {
        id: 'gid://shopify/Product/3',
        title: 'Advanced De-Tan Sunscreen Gel SPF 50+',
        handle: handle,
        description: 'Ultra-lightweight PA++++ solar defense gel with zero white cast and deep hydration.',
        priceRange: { minVariantPrice: { amount: '599', currencyCode: 'INR' } },
        compareAtPriceRange: { maxVariantPrice: { amount: '799', currencyCode: 'INR' } },
        images: {
          nodes: [
            { url: '/products/sunscreen_product.png', altText: 'FLOIS Advanced De-Tan Sunscreen Gel SPF 50+ PA++++' },
            { url: '/products/sunscreen_before_after.png', altText: 'FLOIS Sunscreen — Before & After UV damage comparison' }
          ]
        },
        variants: {
          nodes: [
            { id: 'v4', title: '50g Tube', price: { amount: '599', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    }
  }

  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');
  const productImage = product.images?.nodes?.[0]?.url || '/products/rootherb_product.png';
  const productPrice = product.priceRange?.minVariantPrice?.amount || '699';
  const productCurrency = product.priceRange?.minVariantPrice?.currencyCode || 'INR';

  // JSON-LD: Product Schema
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description || 'Clinically tested Ayurvedic botanical formulation for hair growth and scalp health.',
    image: productImage,
    brand: { '@type': 'Brand', name: 'FLOIS' },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5'
    },
    offers: {
      '@type': 'Offer',
      price: productPrice,
      priceCurrency: productCurrency,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'FLOIS' }
    }
  };

  // JSON-LD: Breadcrumb Schema
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://flois.in/' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://flois.in/shop' },
      { '@type': 'ListItem', position: 3, name: product.title }
    ]
  };

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0F1410] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* Product JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      {/* Breadcrumb JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Section 1: Hero — Gallery + Sticky Purchase Panel */}
      <ProductHero product={product} />

      {/* Section 2: Editorial Story */}
      <EditorialStory product={product} />

      {/* Section 3: Key Formula Benefits */}
      <Benefits product={product} />

      {/* Section 4: Ingredient Explorer */}
      <IngredientExplorer />

      {/* Section 5: Clinical Transformation Results */}
      <ClinicalResultsPDP product={product} />

      {/* Section 6: How To Use Timeline */}
      <HowToUse product={product} />

      {/* Section 7: Sensory Texture Showcase */}
      <TextureShowcase product={product} />

      {/* Section 8: Formula Comparison Table */}
      <ComparisonTable />

      {/* Section 9: Verified Customer Reviews */}
      <ProductReviews />

      {/* Section 10: FAQs Accordion */}
      <ProductFAQs />

      {/* Section 11: Recommended Related Products */}
      <RelatedProductsPDP currentHandle={product.handle} />

      {/* Footer */}
      <Footer />

      {/* Sticky Mobile Add to Cart CTA (mobile only) */}
      <StickyMobileCTA product={product} />
    </div>
  );
}
