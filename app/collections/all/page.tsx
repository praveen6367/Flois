import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header/Header';
import { ShopHero } from '@/components/shop/ShopHero';
import { SmartProductGrid } from '@/components/shop/SmartProductGrid';
import { CollectionNavigation } from '@/components/collections/CollectionNavigation';
import { ShopEditorialStory } from '@/components/shop/ShopEditorialStory';
import { ShopBenefits } from '@/components/shop/ShopBenefits';
import { Footer } from '@/components/Footer';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { getProducts } from '@/lib/shopify/products';
import { getCollections } from '@/lib/shopify/collections';
import { Collection } from '@/types/collection';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Shop All Botanical Rituals | FLOIS Luxury Apothecary',
  description: 'Browse clean, 100% plant-powered Ayurvedic hair care, handcrafted neem wood combs, and skin protection. Formulated with zero mineral oil fillers in Greater Noida.',
  openGraph: {
    title: 'Shop All Botanical Rituals | FLOIS Luxury Care',
    description: 'Explore clean, clinically inspired Ayurvedic formulations crafted to become part of your daily wellness routine.',
    url: 'https://flois.in/collections/all',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop All Botanical Rituals | FLOIS Luxury Care',
    description: 'Explore clean Ayurvedic hair care and neem accessories.',
  }
};

export default async function ShopAllPage() {
  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');
  const { products } = await getProducts({ first: 20 });

  let collections: Collection[] = [];
  try {
    const res = await getCollections(25);
    const rawCollections = res.collections || [];
    const EXCLUDED_HANDLES = ['frontpage', 'home-page', 'uncategorized'];
    const EXCLUDED_TITLES = ['home page', 'uncategorized'];

    collections = rawCollections.filter((c) => {
      const handleLower = c.handle.toLowerCase();
      const titleLower = c.title.toLowerCase();
      return !EXCLUDED_HANDLES.includes(handleLower) && !EXCLUDED_TITLES.includes(titleLower);
    });
  } catch (err) {
    console.warn('[ShopAllPage] Failed to fetch Shopify collections:', err);
  }

  // ItemList JSON-LD Schema
  const shopJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'FLOIS Botanical Products',
    description: '100% plant-based Ayurvedic hair care and wellness rituals.',
    numberOfItems: products.length,
    itemListElement: products.map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: prod.title,
      url: `https://flois.in/products/${prod.handle}`,
      image: prod.images?.nodes?.[0]?.url || 'https://flois.in/logo.png',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: prod.priceRange?.minVariantPrice?.amount || '999',
        availability: prod.availableForSale ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
      }
    }))
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(shopJsonLd) }}
      />

      {/* Navigation Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Shop Hero */}
      <ShopHero />

      {/* Smart Product Grid */}
      <SmartProductGrid products={products} />

      {/* Dynamic Collection Navigation Scroller */}
      <CollectionNavigation collections={collections} />

      {/* Editorial Collection Story */}
      <ShopEditorialStory />

      {/* Product Benefits & Guarantees */}
      <ShopBenefits />

      {/* Footer */}
      <Footer />
    </div>
  );
}
