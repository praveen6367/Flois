import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header/Header';
import { ContactHero } from '@/components/contact/ContactHero';
import { ContactOptions } from '@/components/contact/ContactOptions';
import { ContactFormSection } from '@/components/contact/ContactFormSection';
import { BusinessInfoSection } from '@/components/contact/BusinessInfoSection';
import { InteractiveMapSection } from '@/components/contact/InteractiveMapSection';
import { ContactFAQsSection } from '@/components/contact/ContactFAQsSection';
import { Footer } from '@/components/Footer';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Contact Us & Botanical Consultation | FLOIS Luxury Care',
  description: 'Reach out to the FLOIS formulation team in Greater Noida. Contact us for product consultations, ingredient details, order tracking, and business partnerships.',
  openGraph: {
    title: 'Contact Us | FLOIS Luxury Botanical Care',
    description: 'We are here to assist your wellness journey. Reach out for consultations, order assistance, or wholesale partnerships.',
    url: 'https://flois.in/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | FLOIS Luxury Botanical Care',
    description: 'Reach out to the FLOIS formulation team in Greater Noida.',
  }
};

export default async function ContactPage() {
  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');

  // ContactPoint JSON-LD Schema
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FLOIS',
    legalName: 'VRAJA NATURALS',
    url: 'https://flois.in',
    logo: shopBrand?.logo?.url || 'https://flois.in/logo.png',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+91-8076219724',
        contactType: 'customer service',
        email: 'support@getflois.com',
        areaServed: 'IN',
        availableLanguage: ['English', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00'
        }
      }
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ground Floor, UGF03, Suite No 16, Rise Shoplex, Techzone IV',
      addressLocality: 'Greater Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201306',
      addressCountry: 'IN'
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      {/* Navigation Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Section 1: Hero */}
      <ContactHero />

      {/* Section 2: Contact Options Cards */}
      <ContactOptions />

      {/* Section 3: Luxury Form & Editorial Content */}
      <ContactFormSection />

      {/* Section 4: Registered Business & Legal Entity Info */}
      <BusinessInfoSection />

      {/* Section 5: Interactive Google Map */}
      <InteractiveMapSection />

      {/* Section 6: Customer Service FAQs */}
      <ContactFAQsSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
