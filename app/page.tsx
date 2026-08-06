import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/header/Header';
import { AnnouncementItem } from '@/components/header/AnnouncementBar';
import { CollectionNavigation } from '@/components/collections/CollectionNavigation';
import { HeroSlider } from '@/components/hero/HeroSlider';
import { TrustPillars } from '@/components/trust/TrustPillars';
import { FeaturedProductsSection } from '@/components/FeaturedProducts';
import { PromoBannerSection } from '@/components/banner/PromoBannerSection';
import { RetailPartnersSection } from '@/components/RetailPartners';
import { ClinicalResultsSection } from '@/components/ClinicalResults';
import { CinematicFullVideoSection } from '@/components/video/CinematicFullVideoSection';
import { VideoStoriesSection } from '@/components/VideoStories';
import { ReelStoriesSection } from '@/components/video/ReelStoriesSection';
import { ShopByConcernSection } from '@/components/concerns/ShopByConcernSection';
import { CustomerReviewsSection } from '@/components/testimonials/CustomerReviewsSection';
import { Footer } from '@/components/Footer';
import { MenuItem } from '@/types/menu';
import { Collection } from '@/types/collection';
import { Product } from '@/types/product';
import { RetailPartnerMetaobject, ClinicalResultMetaobject, VideoStoryMetaobject } from '@/types/metaobject';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getAnnouncements, getRetailPartners, getClinicalResults } from '@/lib/shopify/metaobjects';
import { getVideoStories } from '@/lib/shopify/videoMetaobjects';
import { getFeaturedProducts } from '@/lib/shopify/products';
import { getCollections } from '@/lib/shopify/collections';
import { getShopBrand } from '@/lib/shopify/shop';

export const revalidate = 60; // Revalidate dynamic Shopify menu, product & metaobject data every 60s

export default async function HomePage() {
  // Fetch official shop brand metadata & logo
  const shopBrand = await getShopBrand();

  // Fetch real navigation menu from Shopify Storefront API
  let menuItems: MenuItem[] = [];
  try {
    menuItems = await getHeaderMenu('main-menu');
  } catch (err) {
    console.warn('[HomePage] Failed to fetch Shopify menu:', err);
  }

  // Fetch real collections from Shopify Storefront API
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
    console.warn('[HomePage] Failed to fetch Shopify collections:', err);
  }

  // Fetch real announcements from Shopify Metaobjects (with fallback)
  let announcements: AnnouncementItem[] = [];
  try {
    const metaobjects = await getAnnouncements();
    if (metaobjects && metaobjects.length > 0) {
      announcements = metaobjects.map((m, idx) => ({
        id: m.id || String(idx),
        text: m.fields.find((f) => f.key === 'text')?.value || 'Complimentary Express Shipping above ₹999',
        code: m.fields.find((f) => f.key === 'code')?.value
      }));
    }
  } catch (e) {
    // Fallback if no metaobjects in Shopify store
  }

  // Fetch live featured flagship products dynamically from Shopify Storefront API
  let featuredProducts: Product[] = [];
  try {
    featuredProducts = await getFeaturedProducts(3);
  } catch (e) {
    console.warn('[HomePage] Failed to fetch products:', e);
  }

  // Fetch Retail Partners dynamically from Shopify Metaobjects (with fallback)
  let retailPartners: RetailPartnerMetaobject[] = [];
  try {
    retailPartners = await getRetailPartners();
  } catch (e) {
    console.warn('[HomePage] Failed to fetch retail partners:', e);
  }

  // Fetch Clinical Results & Transformations dynamically from Shopify Metaobjects (with fallback)
  let clinicalResults: ClinicalResultMetaobject[] = [];
  try {
    clinicalResults = await getClinicalResults();
  } catch (e) {
    console.warn('[HomePage] Failed to fetch clinical results:', e);
  }

  // Fetch Video Stories dynamically from Shopify Metaobjects (with fallback)
  let videoStories: VideoStoryMetaobject[] = [];
  try {
    videoStories = await getVideoStories();
  } catch (e) {
    console.warn('[HomePage] Failed to fetch video stories:', e);
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* Section 1: Dynamic Luxury Header & Announcement Bar */}
      <Header menu={menuItems} announcements={announcements.length > 0 ? announcements : undefined} logoImage={shopBrand?.logo} />

      {/* Section 2: Dynamic Luxury Collection Navigation Scroller */}
      <CollectionNavigation collections={collections} />

      {/* Section 3: Luxury Hero Banner Slider */}
      <HeroSlider />

      {/* Section 4: Botanical Trust Pillars */}
      <TrustPillars />

      {/* Section 5: Flagship Featured Products Showcase */}
      <FeaturedProductsSection products={featuredProducts} />

      {/* Promo Banner Section 1 (bannerpromo1.png) */}
      <PromoBannerSection imageSrc="/placeholders/bannerpromo1.png" altText="FLOIS Botanical Luxury Promo Banner 1" />

      {/* Section 6: Trusted Retail Partners Showcase */}
      <RetailPartnersSection partners={retailPartners} />

      {/* Promo Banner Section 2 (bannerpromo2.png) */}
      <PromoBannerSection imageSrc="/placeholders/bannerpromo2.png" altText="FLOIS Botanical Luxury Promo Banner 2" />

      {/* Section 7: Clinical Results & Transformations Masonry */}
      <ClinicalResultsSection results={clinicalResults} />

      {/* Full-Width Edge-to-Edge Cinematic Video Banner */}
      <CinematicFullVideoSection videoId="ZKB1zXCEPoE" />

      {/* Section 8: Doctor & Expert Video Reviews Showcase */}
      <VideoStoriesSection stories={videoStories} />

      {/* Section 9: Shop By Concern Showcase */}
      <ShopByConcernSection />

      {/* Section 10: Autoplay Community Video Reels Carousel */}
      <ReelStoriesSection />

      {/* Section 11: Customer Reviews Showcase */}
      <CustomerReviewsSection />

      {/* Section 12: Final Luxury Editorial Footer */}
      <Footer />
    </div>
  );
}
