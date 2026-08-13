import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { CollectionNav } from '@/components/shop/CollectionNav';
import { SmartProductGrid } from '@/components/shop/SmartProductGrid';
import { CollectionNavigation } from '@/components/collections/CollectionNavigation';
import { ShopEditorialStory } from '@/components/shop/ShopEditorialStory';
import { ShopBenefits } from '@/components/shop/ShopBenefits';
import { ProductFAQs } from '@/components/pdp/ProductFAQs';
import { Footer } from '@/components/Footer';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { getCollectionByHandle, getCollectionProducts, getCollections } from '@/lib/shopify/collections';
import { getProducts } from '@/lib/shopify/products';
import { Collection } from '@/types/collection';

interface CollectionPageProps {
  params: Promise<{ handle: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { handle } = await params;
  const collection = await getCollectionByHandle(handle);

  if (!collection) {
    return { title: 'Collection Not Found | FLOIS' };
  }

  return {
    title: `${collection.title} Collection | FLOIS Luxury Botanical Care`,
    description: collection.description || `Explore FLOIS ${collection.title} formulations crafted with 100% cold-pressed Ayurvedic extractions.`,
  };
}

export default async function DynamicCollectionPage({ params }: CollectionPageProps) {
  const { handle } = await params;
  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');
  const collection = await getCollectionByHandle(handle);

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
    console.warn('[DynamicCollectionPage] Failed to fetch Shopify collections:', err);
  }

  if (!collection) {
    // Fallback to all products if collection not found in Shopify
    const { products } = await getProducts({ first: 20 });
    return (
      <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans">
        <Header menu={menuItems} logoImage={shopBrand?.logo} />
        <CollectionNav activeHandle={handle} totalProductCount={products.length} />
        <SmartProductGrid products={products} />
        <CollectionNavigation collections={collections} activeHandle={handle} />
        <Footer />
      </div>
    );
  }

  const collectionProducts = getCollectionProducts(collection);

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans">
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Collection Hero */}
      <section className="relative w-full bg-[#FAF9F5] py-16 sm:py-24 border-b border-[#E8E6DF] text-center">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 space-y-4">
          <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
            BOTANICAL COLLECTION
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#121412] tracking-tight">
            {collection.title}
          </h1>
          <p className="text-base sm:text-lg font-sans text-[#4A4E4A] font-light max-w-2xl mx-auto leading-relaxed">
            {collection.description || `Targeted Ayurvedic formulations crafted to restore vital energy to your ${collection.title.toLowerCase()}.`}
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <CollectionNav activeHandle={handle} totalProductCount={collectionProducts.length} />

      {/* Filtered Product Grid */}
      <SmartProductGrid products={collectionProducts.length > 0 ? collectionProducts : (await getProducts()).products} />

      {/* Collection Navigation Scroller */}
      <CollectionNavigation collections={collections} activeHandle={handle} />

      {/* Editorial Collection Story */}
      <ShopEditorialStory />

      {/* Product Benefits */}
      <ShopBenefits />

      {/* Collection FAQs */}
      <ProductFAQs />

      {/* Footer */}
      <Footer />
    </div>
  );
}
