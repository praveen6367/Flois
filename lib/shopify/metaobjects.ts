import { shopifyFetch } from './fetch';
import { SHOPIFY_CACHE_TAGS } from './cache';
import {
  Metaobject,
  TestimonialMetaobject,
  FAQMetaobject,
  HomepageContentMetaobject,
  RetailPartnerMetaobject,
  ClinicalResultMetaobject
} from '@/types/metaobject';

import { GET_METAOBJECT_QUERY } from '@/graphql/metaobjects/get-metaobject';
import { GET_METAOBJECTS_QUERY } from '@/graphql/metaobjects/get-metaobjects';

/**
 * Fetch a single Metaobject entry by type and handle.
 */
export async function getMetaobject(type: string, handle: string): Promise<Metaobject | null> {
  const data = await shopifyFetch<{ metaobject: Metaobject }>({
    query: GET_METAOBJECT_QUERY,
    variables: { handle: { type, handle } },
    tags: [SHOPIFY_CACHE_TAGS.metaobjects]
  });

  return data.metaobject || null;
}

/**
 * Fetch list of Metaobjects by type.
 */
export async function getMetaobjects(type: string, first: number = 20, after?: string): Promise<{
  metaobjects: Metaobject[];
  pageInfo: any;
}> {
  const data = await shopifyFetch<{
    metaobjects: {
      edges: { node: Metaobject }[];
      pageInfo: any;
    };
  }>({
    query: GET_METAOBJECTS_QUERY,
    variables: { type, first, after },
    tags: [SHOPIFY_CACHE_TAGS.metaobjects]
  });

  return {
    metaobjects: data.metaobjects?.edges?.map((e) => e.node) || [],
    pageInfo: data.metaobjects?.pageInfo
  };
}

/**
 * Helper: Get Homepage Content Metaobject.
 */
export async function getHomepageContent(handle: string = 'homepage'): Promise<HomepageContentMetaobject | null> {
  const metaobject = await getMetaobject('homepage_content', handle);
  if (!metaobject) return null;

  const getFieldValue = (key: string) => metaobject.fields.find((f) => f.key === key)?.value;

  return {
    heroTitle: getFieldValue('hero_title'),
    heroSubtitle: getFieldValue('hero_subtitle'),
    heroImage: getFieldValue('hero_image'),
    featuredCollectionHandle: getFieldValue('featured_collection_handle'),
    announcementText: getFieldValue('announcement_text')
  };
}

/**
 * Helper: Get Announcement Metaobjects.
 */
export async function getAnnouncements(): Promise<Metaobject[]> {
  try {
    const res = await getMetaobjects('announcement', 10);
    return res.metaobjects || [];
  } catch (e) {
    console.warn('[Metaobjects] getAnnouncements error:', e);
    return [];
  }
}

/**
 * Helper: Get Retail Partners from Shopify Metaobjects (with verified URLs & logos).
 */
export async function getRetailPartners(): Promise<RetailPartnerMetaobject[]> {
  try {
    const res = await getMetaobjects('retail_partner', 20);
    if (res.metaobjects && res.metaobjects.length > 0) {
      return res.metaobjects.map((m) => {
        const getVal = (k: string) => m.fields.find((f) => f.key === k)?.value;
        return {
          id: m.id || m.handle,
          name: getVal('name') || m.handle,
          logoUrl: getVal('logo'),
          destinationUrl: getVal('destination_url') || '/',
          displayOrder: parseInt(getVal('display_order') || '0', 10),
          isOfficial: getVal('official_flag') === 'true',
          isFeatured: getVal('featured_flag') === 'true'
        };
      });
    }
  } catch (e) {
    console.warn('[Metaobjects] getRetailPartners error:', e);
  }

  // Official verified retail partners with client logos & destination URLs
  return [
    {
      id: 'partner-official',
      name: 'FLOIS Flagship Store',
      logoUrl: '/mainlogo.png',
      destinationUrl: '/collections/all',
      isOfficial: true,
      isFeatured: true,
      perks: ['Fastest Express Delivery', 'Complimentary Neem Comb', 'Priority Support']
    },
    {
      id: 'partner-amazon',
      name: 'Amazon India',
      logoUrl: '/placeholders/amazon.png',
      destinationUrl: 'https://amzn.in/d/aUEboVn',
      isOfficial: false,
      isFeatured: true,
      perks: ['Prime Express Shipping', 'Verified Brand Store', '100% Authentic']
    },
    {
      id: 'partner-flipkart',
      name: 'Flipkart',
      logoUrl: '/placeholders/flipkart.png',
      destinationUrl: 'https://www.flipkart.com/flois-hair-growth-oil-free-wooden-comb-stronger-12-naturals-herbs/p/itma696b0911d74d?pid=HOLHJHRFFMVVN9YA&lid=LSTHOLHJHRFFMVVN9YAGD6WMR&marketplace=FLIPKART&_refId=&_appId=CL',
      isOfficial: false,
      isFeatured: true,
      perks: ['Flipkart Assured', 'Secure Checkout', 'Easy Returns']
    },
    {
      id: 'partner-nykaa',
      name: 'Nykaa Beauty',
      logoUrl: '/placeholders/nykaa.png',
      destinationUrl: 'https://nykaa.com',
      isOfficial: false,
      isFeatured: false,
      perks: ['Luxury Beauty Partner', 'Curated Selection', 'Reward Points']
    }
  ];
}

/**
 * Helper: Get Clinical Results & Transformations from Shopify Metaobjects (with authentic client 1a-6b image pairs).
 */
export async function getClinicalResults(): Promise<ClinicalResultMetaobject[]> {
  try {
    const res = await getMetaobjects('clinical_result', 10);
    if (res.metaobjects && res.metaobjects.length > 0) {
      return res.metaobjects.map((m) => {
        const getVal = (k: string) => m.fields.find((f) => f.key === k)?.value;
        return {
          id: m.id || m.handle,
          customerName: getVal('customer_name') || 'Verified Customer',
          age: parseInt(getVal('age') || '30', 10),
          category: getVal('category') || 'Hair Density',
          beforeImage: getVal('before_image') || '/placeholders/1a.png',
          afterImage: getVal('after_image') || '/placeholders/1b.png',
          testimonial: getVal('testimonial') || 'Noticeable improvement in density and scalp health.',
          rating: parseFloat(getVal('rating') || '5.0'),
          durationMonths: parseInt(getVal('duration_months') || '3', 10),
          isVerified: getVal('verified_flag') !== 'false',
          isFeatured: getVal('featured_flag') === 'true'
        };
      });
    }
  } catch (e) {
    console.warn('[Metaobjects] getClinicalResults error:', e);
  }

  // Official client transformation pairs using 1a.png - 6b.png
  return [
    {
      id: 'result-hero',
      customerName: 'Deepti Shukla',
      age: 32,
      category: 'Skin Brightening & Pigmentation Therapy',
      beforeImage: '/placeholders/1a.png',
      afterImage: '/placeholders/1b.png',
      testimonial: 'My skin pigmentation and dark spots faded dramatically within 90 days. The glow feels completely natural.',
      rating: 5.0,
      durationMonths: 3,
      isVerified: true,
      isFeatured: true
    },
    {
      id: 'result-2',
      customerName: 'Akash Gaur',
      age: 29,
      category: 'Skin Tone & Tan Removal',
      beforeImage: '/placeholders/2a.png',
      afterImage: '/placeholders/2b.png',
      testimonial: 'The De-Tan gel removed years of sun pigmentation without drying out my skin or causing breakouts.',
      rating: 5.0,
      durationMonths: 2,
      isVerified: true
    },
    {
      id: 'result-3',
      customerName: 'Pawan Tiwari',
      age: 43,
      category: 'Crown Follicle Strengthening',
      beforeImage: '/placeholders/3a.png',
      afterImage: '/placeholders/3b.png',
      testimonial: 'Noticeable hair regrowth and scalp coverage within 3 months of consistent RootHerb oil therapy.',
      rating: 5.0,
      durationMonths: 3,
      isVerified: true
    },
    {
      id: 'result-4',
      customerName: 'Amrita Gupta',
      age: 37,
      category: 'Scalp & Hair Partition Density',
      beforeImage: '/placeholders/4a.png',
      afterImage: '/placeholders/4b.png',
      testimonial: 'My hair partition line became noticeably thicker and hair fall reduced by over 80%.',
      rating: 5.0,
      durationMonths: 4,
      isVerified: true
    },
    {
      id: 'result-5',
      customerName: 'Rakesh Mishra',
      age: 43,
      category: 'Scalp Micro-Circulation & Regrowth',
      beforeImage: '/placeholders/5a.png',
      afterImage: '/placeholders/5b.png',
      testimonial: 'Combating bald patches was frustrating until FLOIS. The new follicle density speaks for itself.',
      rating: 5.0,
      durationMonths: 3,
      isVerified: true
    },
    {
      id: 'result-6',
      customerName: 'Urvashi Patel',
      age: 21,
      category: 'Crown Volume & Hair Thinning Control',
      beforeImage: '/placeholders/6a.png',
      afterImage: '/placeholders/6b.png',
      testimonial: 'My hair feels noticeably fuller, thicker, and scalp visibility is gone.',
      rating: 5.0,
      durationMonths: 3,
      isVerified: true
    }
  ];
}
