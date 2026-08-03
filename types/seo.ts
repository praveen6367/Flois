export interface SEOData {
  title: string;
  description: string;
  canonicalUrl?: string;
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    type?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    image?: string;
  };
}
