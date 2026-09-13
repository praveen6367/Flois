import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/Footer';
import { TrackOrderView } from '@/components/track-order/TrackOrderView';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Track Your Order | FLOIS Luxury Botanical Care',
  description: 'Track your FLOIS botanical hair and skincare delivery in real time across 19,000+ Indian PIN codes. Enter your Order ID or Courier AWB number.',
  openGraph: {
    title: 'Track Your Order | FLOIS Luxury Botanical Care',
    description: 'Track your FLOIS botanical hair and skincare delivery in real time. Fast dispatch and secure logistics.',
    url: 'https://flois.in/pages/track-order',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Track Your Order | FLOIS Luxury Botanical Care',
    description: 'Real-time courier dispatch and delivery updates for your FLOIS order.',
  }
};

export default async function TrackOrderPage() {
  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');

  const trackJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Track Order | FLOIS Luxury Botanical Care',
    description: 'Track your FLOIS order delivery status and dispatch information in real time.',
    publisher: {
      '@type': 'Organization',
      name: 'FLOIS',
      legalName: 'VRAJA NATURALS',
      url: 'https://flois.in',
      logo: shopBrand?.logo?.url || 'https://flois.in/logo.png',
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white flex flex-col justify-between">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(trackJsonLd) }}
      />

      {/* Navigation Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Main Order Tracking Body */}
      <main className="flex-1">
        <TrackOrderView />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
