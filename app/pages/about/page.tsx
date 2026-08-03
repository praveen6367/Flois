import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header/Header';
import { StoryHero } from '@/components/about/StoryHero';
import { StoryPhilosophy } from '@/components/about/StoryPhilosophy';
import { StoryJourney } from '@/components/about/StoryJourney';
import { StoryProblem } from '@/components/about/StoryProblem';
import { StoryIngredients } from '@/components/about/StoryIngredients';
import { StoryCraftsmanship } from '@/components/about/StoryCraftsmanship';
import { StoryValues } from '@/components/about/StoryValues';
import { StoryTrust } from '@/components/about/StoryTrust';
import { StoryFuture } from '@/components/about/StoryFuture';
import { Footer } from '@/components/Footer';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Our Story & Heritage | FLOIS Luxury Botanical Care',
  description: 'Discover the story behind FLOIS. Rooted in authentic Ayurvedic wisdom and refined by modern clinical science, we craft 100% cold-pressed botanical hair treatments in Greater Noida.',
  openGraph: {
    title: 'Our Story & Heritage | FLOIS Luxury Botanical Care',
    description: 'Rooted in nature, refined by science. Explore why FLOIS was created and how we formulate clean botanical care without mineral oil fillers.',
    url: 'https://flois.in/pages/about',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story & Heritage | FLOIS Luxury Botanical Care',
    description: 'Rooted in nature, refined by science. Discover the FLOIS formulation story.',
  }
};

export default async function AboutPage() {
  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');

  // AboutPage JSON-LD Schema
  const aboutJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Our Story | FLOIS Luxury Botanical Care',
    description: 'The story and formulation philosophy of FLOIS, an authentic Indian botanical wellness brand.',
    publisher: {
      '@type': 'Organization',
      name: 'FLOIS',
      legalName: 'VRAJA NATURALS',
      url: 'https://flois.in',
      logo: shopBrand?.logo?.url || 'https://flois.in/logo.png',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ground Floor, UGF03, Suite No 16, Rise Shoplex, Techzone IV',
        addressLocality: 'Greater Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201306',
        addressCountry: 'IN'
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      {/* Navigation Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Section 1: Hero */}
      <StoryHero />

      {/* Section 2: Founder's Philosophy */}
      <StoryPhilosophy />

      {/* Section 3: Our Journey */}
      <StoryJourney />

      {/* Section 4: The Problem We Solved (Dark Cinematic) */}
      <StoryProblem />

      {/* Section 5: The Ingredient Philosophy */}
      <StoryIngredients />

      {/* Section 6: Crafted With Care */}
      <StoryCraftsmanship />

      {/* Section 7: Our Values */}
      <StoryValues />

      {/* Section 8: Why People Trust FLOIS */}
      <StoryTrust />

      {/* Section 9: Our Future */}
      <StoryFuture />

      {/* Footer */}
      <Footer />
    </div>
  );
}
