import { ShopifyImage, ShopifySEO } from './shopify';

export interface BlogAuthor {
  name: string;
  email?: string | null;
  bio?: string | null;
}

export interface BlogArticle {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  excerptHtml: string | null;
  contentHtml: string;
  content: string;
  publishedAt: string;
  tags: string[];
  image: ShopifyImage | null;
  author: BlogAuthor;
  blog: {
    handle: string;
    title: string;
  };
  seo?: ShopifySEO | null;
  onlineStoreUrl?: string | null;
}

export interface BlogArticleEdge {
  cursor: string;
  node: BlogArticle;
}

export interface BlogArticlesConnection {
  edges: BlogArticleEdge[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor?: string | null;
    endCursor?: string | null;
  };
}

export interface Blog {
  id: string;
  handle: string;
  title: string;
  articles: BlogArticlesConnection;
}

export interface BlogQueryOptions {
  first?: number;
  after?: string;
  blogHandle?: string;
  sortKey?: 'PUBLISHED_AT' | 'TITLE' | 'AUTHOR' | 'UPDATED_AT';
  reverse?: boolean;
}
