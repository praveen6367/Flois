import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { ProductHero } from '@/components/pdp/ProductHero';

import { StickyMobileCTA } from '@/components/pdp/StickyMobileCTA';
import { EditorialStory } from '@/components/pdp/EditorialStory';
import { Benefits } from '@/components/pdp/Benefits';
import { IngredientExplorer } from '@/components/pdp/IngredientExplorer';
import { OleoKareScienceSection } from '@/components/pdp/OleoKareScienceSection';
import { ClinicalResultsSection } from '@/components/ClinicalResults';
import { HowToUse } from '@/components/pdp/HowToUse';
import { TextureShowcase } from '@/components/pdp/TextureShowcase';
import { ComparisonTable } from '@/components/pdp/ComparisonTable';
import { ProductReviews } from '@/components/pdp/ProductReviews';
import { ProductFAQs } from '@/components/pdp/ProductFAQs';
import { RelatedProductsPDP } from '@/components/pdp/RelatedProductsPDP';
import { VideoStoriesSection } from '@/components/VideoStories';
import { ReelStoriesSection } from '@/components/video/ReelStoriesSection';
import { InstagramFeedSection } from '@/components/social/InstagramFeedSection';
import { ProductStoryFloatingWidget } from '@/components/pdp/ProductStoryFloatingWidget';
import { Footer } from '@/components/Footer';
import { getProductByHandle } from '@/lib/shopify/products';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { getVideoStories } from '@/lib/shopify/videoMetaobjects';
import { ClinicalResultMetaobject, VideoStoryMetaobject } from '@/types/metaobject';
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

  const productType = getProductType(product || handle);
  const title = `${product.title} | FLOIS Modern Botanical Care`;
  const description = productType === 'sunscreen'
    ? 'Advanced De-Tan Sunscreen Gel SPF 50+ PA++++ with Rice Water & Niacinamide. Zero white cast, lightweight and water resistant daily protection.'
    : productType === 'comb'
    ? 'Handcrafted Neem Wood Comb soaked in 17 botanical herbs & sesame oil. Naturally anti-static, reduces hair fall and detangles gently.'
    : 'RootHerb Botanical Hair & Scalp Oil powered by 2.5% OleoKare®, 5 cold-pressed oils, and 12 Ayurvedic herbs. Free handcrafted neem comb included.';
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

import { getProductType } from '@/lib/productClassifier';

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  
  // Fetch real product from Shopify Storefront API
  let product: Product | null = null;
  try {
    product = await getProductByHandle(handle);
  } catch (err) {
    console.warn(`[ProductPage] Failed to fetch product ${handle}:`, err);
  }

  // Accurately determine product type ('hair-oil' | 'sunscreen' | 'comb')
  const productType = getProductType(product || handle);

  // Fallback for demo products if handle maps to flagship item
  if (!product) {
    if (productType === 'hair-oil') {
      product = {
        id: 'gid://shopify/Product/1',
        title: 'RootHerb™ Botanical Hair & Scalp Oil',
        handle: handle,
        description: 'Clinically formulated with 12 Ayurvedic herbs and OleoKare® for accelerated hair growth, scalp nourishment, and natural shine.',
        descriptionHtml: `
          <p>RootHerb™ brings together 12 Ayurvedic botanicals, cold-pressed oils and OleoKare® in a modern hair-care formula designed for consistent scalp and hair nourishment.</p>
          <p><img src="/products/desc_flois_marketplace.png" alt="FLOIS Hair Care Infographic Banner" /></p>
          <p><img src="/products/rootherb_ingredients_map.png" alt="FLOIS Botanical Ingredients Map" /></p>
        `,
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
            { id: 'v1', title: '100ml Bottle + Free Comb', price: { amount: '699', currencyCode: 'INR' }, availableForSale: true },
            { id: 'v2', title: '200ml Family Bottle + Free Comb', price: { amount: '1199', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    } else if (productType === 'comb') {
      product = {
        id: 'gid://shopify/Product/2',
        title: 'Neem Wood Comb for Dandruff & Hair Fall Control',
        handle: handle,
        description: 'Hand-carved seasoned neem wood comb that distributes natural scalp oils, prevents static, and reduces hair breakage.',
        descriptionHtml: `
          <p>Handcrafted seasoned neem wood comb that distributes natural scalp oils, prevents static, and reduces hair breakage.</p>
          <p><img src="/products/desc_neem_comb.jpg" alt="FLOIS Neem Wood Comb Infographic Banner" /></p>
        `,
        priceRange: { minVariantPrice: { amount: '119', currencyCode: 'INR' } },
        compareAtPriceRange: { maxVariantPrice: { amount: '229', currencyCode: 'INR' } },
        images: {
          nodes: [
            { url: '/products/neem_comb_product.png', altText: 'FLOIS Handcrafted Neem Wood Comb — Low-Static Detangling' }
          ]
        },
        variants: {
          nodes: [
            { id: 'v3', title: 'Standard Comb', price: { amount: '119', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    } else {
      product = {
        id: 'gid://shopify/Product/3',
        title: 'Advanced De-Tan Sunscreen Gel SPF 50+',
        handle: handle,
        description: 'Ultra-lightweight PA++++ solar defense gel with zero white cast and deep hydration.',
        descriptionHtml: `
          <p>Ultra-lightweight PA++++ solar defense gel with zero white cast and deep hydration.</p>
          <p><img src="/products/desc_sunscreen_slide.png" alt="FLOIS Sunscreen Infographic Banner" /></p>
        `,
        priceRange: { minVariantPrice: { amount: '369', currencyCode: 'INR' } },
        compareAtPriceRange: { maxVariantPrice: { amount: '699', currencyCode: 'INR' } },
        images: {
          nodes: [
            { url: '/products/sunscreen_product.png', altText: 'FLOIS Advanced De-Tan Sunscreen Gel SPF 50+ PA++++' },
            { url: '/products/sunscreen_before_after.png', altText: 'FLOIS Sunscreen — Before & After UV damage comparison' }
          ]
        },
        variants: {
          nodes: [
            { id: 'v4', title: '50g Tube', price: { amount: '369', currencyCode: 'INR' }, availableForSale: true }
          ]
        }
      } as unknown as Product;
    }
  }

  // Ensure product.images.nodes has a rich 3-image gallery strictly matching the product type
  let defaultImages: { url: string; altText: string }[] = [];
  if (productType === 'sunscreen') {
    defaultImages = [
      { url: '/products/sunscreen_product.png', altText: `${product.title} Packaging` },
      { url: '/products/editorial_sunscreen.jpg', altText: `${product.title} Formulation Breakdown` },
      { url: '/products/texture_sunscreen.jpg', altText: `${product.title} Gel Texture` }
    ];
  } else if (productType === 'comb') {
    defaultImages = [
      { url: '/products/neem_comb_product.png', altText: `${product.title} Packaging` },
      { url: '/products/editorial_neem_comb.jpg', altText: `${product.title} Artisan Craftsmanship` },
      { url: '/products/texture_neem_comb.jpg', altText: `${product.title} Wood Texture` }
    ];
  } else {
    defaultImages = [
      { url: '/products/rootherb_product.png', altText: `${product.title} Packaging` },
      { url: '/products/rootherb_ingredients_map.png', altText: `${product.title} Formulation Map` },
      { url: '/products/editorial_rootherb.jpg', altText: `${product.title} Lifestyle` }
    ];
  }

  const existingNodes = product.images?.nodes || [];
  if (existingNodes.length < 3) {
    product = {
      ...product,
      images: {
        ...product.images,
        nodes: [...existingNodes, ...defaultImages.slice(existingNodes.length)]
      }
    };
  }

  const shopBrand = await getShopBrand();
  const menuItems = await getHeaderMenu('main-menu');
  const productImage = product.images?.nodes?.[0]?.url || defaultImages[0].url;

  // Fetch Doctor & Expert video reviews dynamically
  let videoStories: VideoStoryMetaobject[] = [];
  try {
    videoStories = await getVideoStories();
  } catch (e) {
    console.warn('[ProductPage] Failed to fetch video stories:', e);
  }

  // Filter video stories strictly for this product type
  const relevantVideoStories = videoStories.filter((s) => {
    const sType = getProductType({ handle: s.productHandle, title: s.productTitle || s.category });
    return sType === productType;
  });
  const defaultStory: VideoStoryMetaobject = productType === 'sunscreen'
    ? {
        id: 'doctor-video-3',
        title: 'Cosmetic & Solar Science Review',
        category: 'Solar Defense Study',
        videoUrl: '/placeholders/video3.mp4',
        posterImage: '/placeholders/2b.png',
        duration: '0:30',
        description: 'Assessment of FLOIS SPF 50+ De-Tan Gel for zero white-cast UV defense on Indian skin tones.',
        productHandle: 'advanced-de-tan-sunscreen-gel',
        productTitle: 'Advanced De-Tan Sunscreen Gel SPF 50+',
        productPrice: '₹369',
        productImage: '/products/sunscreen_product.png',
        isFeatured: true
      }
    : productType === 'comb'
    ? {
        id: 'doctor-video-4',
        title: 'Artisan Wellness Research Desk',
        category: 'Neem Wood Combing Study',
        videoUrl: '/placeholders/video4.mp4',
        posterImage: '/placeholders/4b.png',
        duration: '0:40',
        description: 'Examination of handcrafted seasoned neem wood combing for gentle detangling and low-static hair care.',
        productHandle: 'flois-kacchi-neem-wood-comb-5-5-inch-handmade-herbal-comb-soaked-in-17-herbs-sesame-oil-anti-static-hair-comb-for-unisex-reduces-hair-fall-dandruff-frizz-control',
        productTitle: 'Handcrafted Neem Wood Comb',
        productPrice: '₹119',
        productImage: '/products/neem_comb_product.png',
        isFeatured: true
      }
    : {
        id: 'doctor-video-1',
        title: 'Clinical Dermatology Advisory Panel',
        category: 'Dermatological Evaluation',
        videoUrl: '/placeholders/video1.mp4',
        posterImage: '/placeholders/3b.png',
        duration: '0:45',
        description: 'Dermatological review of 2.5% OleoKare® active and cold-pressed botanical carrier oils for scalp vitality.',
        productHandle: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml',
        productTitle: 'RootHerb™ Botanical Hair & Scalp Oil',
        productPrice: '₹699',
        productImage: '/products/rootherb_product.png',
        isFeatured: true
      };
  const displayVideoStories = relevantVideoStories.length > 0 ? relevantVideoStories : [defaultStory];

  // Build product-specific before/after comparison data for ClinicalResultsSection
  const productClinicalResults: ClinicalResultMetaobject[] = productType === 'sunscreen'
    ? [
        { id: 'sun-1', customerName: 'Deepti Shukla', age: 32, category: 'Skin Brightening & Pigmentation', beforeImage: '/placeholders/1a.png', afterImage: '/placeholders/1b.png', testimonial: 'My sun tanning and dark patches faded noticeably with daily morning application. Skin looks healthy and even.', rating: 5, durationMonths: 3, isVerified: true, isFeatured: true, productHandle: 'advanced-de-tan-sunscreen-gel' },
        { id: 'sun-2', customerName: 'Akash Gaur', age: 29, category: 'Skin Tone & Tan Removal', beforeImage: '/placeholders/2a.png', afterImage: '/placeholders/2b.png', testimonial: 'The De-Tan gel removed months of outdoor sun dullness without drying out my skin or causing breakouts.', rating: 5, durationMonths: 2, isVerified: true, productHandle: 'advanced-de-tan-sunscreen-gel' },
        { id: 'sun-3', customerName: 'Neelam Jadav', age: 31, category: 'Skin Tone & Pigmentation Correction', beforeImage: '/placeholders/9a.png', afterImage: '/placeholders/9b.png', testimonial: 'Uneven skin tone and pigmentation corrected noticeably. My skin looks bright and healthy.', rating: 5, durationMonths: 2, isVerified: true, productHandle: 'advanced-de-tan-sunscreen-gel' },
        { id: 'sun-4', customerName: 'Khushbu Soni', age: 28, category: 'De-Tan & Skin Radiance Restoration', beforeImage: '/placeholders/10a.png', afterImage: '/placeholders/10b.png', testimonial: 'Tan and dullness removed in under 2 months. Skin feels softer and looks radiant every day.', rating: 5, durationMonths: 2, isVerified: true, productHandle: 'advanced-de-tan-sunscreen-gel' },
      ]
    : productType === 'comb'
    ? [
        { id: 'comb-1', customerName: 'Pawan Tiwari', age: 43, category: 'Crown Follicle Strengthening', beforeImage: '/placeholders/3a.png', afterImage: '/placeholders/3b.png', testimonial: 'Noticeable reduction in hair breakage and improved scalp comfort within 3 months of consistent neem wood combing.', rating: 5, durationMonths: 3, isVerified: true, isFeatured: true, productHandle: 'flois-kacchi-neem-wood-comb-5-5-inch-handmade-herbal-comb-soaked-in-17-herbs-sesame-oil-anti-static-hair-comb-for-unisex-reduces-hair-fall-dandruff-frizz-control' },
        { id: 'comb-2', customerName: 'Vinay Sehgal', age: 41, category: 'Scalp Gentle Combing & Follicle Care', beforeImage: '/placeholders/7a.png', afterImage: '/placeholders/7b.png', testimonial: 'The rounded neem teeth give a very soothing scalp massage. Hair feels much less stressed after washing.', rating: 5, durationMonths: 3, isVerified: true, productHandle: 'flois-kacchi-neem-wood-comb-5-5-inch-handmade-herbal-comb-soaked-in-17-herbs-sesame-oil-anti-static-hair-comb-for-unisex-reduces-hair-fall-dandruff-frizz-control' },
        { id: 'comb-3', customerName: 'Sunita Verma', age: 34, category: 'Crown Volume & Low-Friction Detangling', beforeImage: '/placeholders/6a.png', afterImage: '/placeholders/6b.png', testimonial: 'Switched from plastic combs to this handcrafted neem comb. Hair breakage and flyaways reduced drastically.', rating: 5, durationMonths: 2, isVerified: true, productHandle: 'flois-kacchi-neem-wood-comb-5-5-inch-handmade-herbal-comb-soaked-in-17-herbs-sesame-oil-anti-static-hair-comb-for-unisex-reduces-hair-fall-dandruff-frizz-control' },
      ]
    : [
        { id: 'hair-1', customerName: 'Amrita Gupta', age: 37, category: 'Scalp & Hair Partition Density', beforeImage: '/placeholders/4a.png', afterImage: '/placeholders/4b.png', testimonial: 'My hair partition line became noticeably thicker and hair fall reduced by over 80%.', rating: 5, durationMonths: 4, isVerified: true, isFeatured: true, productHandle: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml' },
        { id: 'hair-2', customerName: 'Rakesh Mishra', age: 43, category: 'Scalp Micro-Circulation & Regrowth', beforeImage: '/placeholders/5a.png', afterImage: '/placeholders/5b.png', testimonial: 'Combating bald patches was frustrating until FLOIS. The new follicle density speaks for itself.', rating: 5, durationMonths: 3, isVerified: true, productHandle: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml' },
        { id: 'hair-3', customerName: 'Urvashi Patel', age: 21, category: 'Crown Volume & Hair Thinning Control', beforeImage: '/placeholders/6a.png', afterImage: '/placeholders/6b.png', testimonial: 'My hair feels noticeably fuller, thicker, and scalp visibility is gone.', rating: 5, durationMonths: 3, isVerified: true, productHandle: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml' },
        { id: 'hair-4', customerName: 'Madhvi Sharma', age: 29, category: 'Hair Density & Partition Thickness', beforeImage: '/placeholders/8a.png', afterImage: '/placeholders/8b.png', testimonial: 'My hair partition is now barely visible. The density improvement is something I can see and feel.', rating: 5, durationMonths: 3, isVerified: true, productHandle: 'flois-rootherb-hair-growth-oil-plant-based-ayurvedic-herbal-hair-oil-for-hair-fall-control-5-cold-pressed-oils-12-herbs-no-chemicals-no-mineral-lightweight-unisex-free-wooden-comb-100ml' },
      ];
  const productPrice = product.priceRange?.minVariantPrice?.amount || (productType === 'hair-oil' ? '699' : productType === 'comb' ? '119' : '369');
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
      reviewCount: '24',
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

      {/* Creative Section: The Science Behind FLOIS RootHerb (Powered by OleoKare®) - ONLY for Hair Oil */}
      {productType === 'hair-oil' && (
        <OleoKareScienceSection />
      )}

      {/* Section 4: Ingredient Explorer */}
      <IngredientExplorer productHandle={productType} />

      {/* Section 5: Doctor & Dermatologist Recommendations */}
      <VideoStoriesSection
        stories={displayVideoStories}
        eyebrow="DOCTOR & DERMATOLOGIST REVIEWS"
        title="Recommended by Doctors & Experts"
        subtitle="Watch leading dermatologists and specialists review the clinical efficacy of FLOIS formulations."
      />

      {/* Section 6: Real Customer Before & After */}
      <ClinicalResultsSection
        results={productClinicalResults}
        productType={productType === 'hair-oil' ? 'hair' : productType}
        eyebrow="Real Customer Transformations"
        title="See The Difference For Yourself"
        subtitle="Real before & after results from verified customers using this product consistently."
      />

      {/* Section 7: Vertical Customer Video Reels Carousel */}
      <ReelStoriesSection productType={productType} />

      {/* Section 8: How To Use Timeline */}
      <HowToUse product={product} />

      {/* Section 9: Sensory Texture Showcase */}
      <TextureShowcase product={product} />

      {/* Section 10: Formula Comparison Table */}
      <ComparisonTable productHandle={productType} />

      {/* Section 11: Verified Customer Reviews Filtered for This Product */}
      <ProductReviews product={product} />

      {/* Section 12: FAQs Accordion */}
      <ProductFAQs productHandle={productType} />

      {/* Section 13: Recommended Related Products (exclusively the OTHER 2 products) */}
      <RelatedProductsPDP currentHandle={product.handle || handle} />

      {/* Section 14: Official Instagram Community Feed Showcase */}
      <InstagramFeedSection />

      {/* Section 15: Final Luxury Editorial Footer */}
      <Footer />

      {/* Floating Instagram Story / 9:16 Video Player Widget (Bottom-Left Corner) */}
      <ProductStoryFloatingWidget productHandle={productType} />

      {/* Sticky Mobile Add to Cart CTA (mobile only) */}
      <StickyMobileCTA product={product} />
    </div>
  );
}
