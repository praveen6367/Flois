export interface MetaobjectField {
  key: string;
  value: string;
  type: string;
  reference?: Record<string, unknown> | null;
}

export interface Metaobject {
  id: string;
  handle: string;
  type: string;
  fields: MetaobjectField[];
  updatedAt?: string;
}

export interface HomepageContentMetaobject {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: string;
  featuredCollectionHandle?: string;
  announcementText?: string;
}

export interface TestimonialMetaobject {
  id: string;
  author: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
}

export interface FAQMetaobject {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface RetailPartnerMetaobject {
  id: string;
  name: string;
  logoUrl?: string;
  destinationUrl: string;
  displayOrder?: number;
  isOfficial?: boolean;
  isFeatured?: boolean;
  perks?: string[];
}

export interface ClinicalResultMetaobject {
  id: string;
  customerName: string;
  age: number;
  category: string;
  beforeImage: string;
  afterImage: string;
  testimonial: string;
  rating: number;
  durationMonths: number;
  isVerified: boolean;
  isFeatured?: boolean;
  productHandle?: string;
  productTitle?: string;
}

export interface VideoStoryMetaobject {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  posterImage: string;
  duration?: string;
  description?: string;
  productHandle?: string;
  productTitle?: string;
  productPrice?: string;
  productImage?: string;
  isFeatured?: boolean;
}
