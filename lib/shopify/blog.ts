import { shopifyFetch } from './fetch';
import { BlogArticle, Blog, BlogQueryOptions } from '@/types/blog';
import {
  GET_BLOG_ARTICLES_QUERY,
  GET_ARTICLE_BY_HANDLE_QUERY,
  GET_ALL_BLOGS_QUERY
} from '@/graphql/blog/get-blog-articles';

const BLOG_CACHE_TAG = 'shopify-blog';

function reshapeArticle(raw: any): BlogArticle {
  if (!raw) return null as any;
  return {
    ...raw,
    // contentHtml aliased as content in GQL — normalize both
    content: raw.contentHtml || raw.content || '',
    contentHtml: raw.contentHtml || '',
    excerpt: raw.excerpt || null,
    excerptHtml: raw.excerptHtml || null,
    author: raw.author || { name: 'FLOIS Editorial Team' },
    image: raw.image || null,
    seo: raw.seo || null,
    tags: raw.tags || [],
    blog: raw.blog || { handle: 'news', title: 'FLOIS Journal' }
  };
}

/**
 * Fetch all articles from a Shopify blog.
 * Tries multiple blog handles: "journal", "news", "blog" — returns whichever has articles.
 */
export async function getBlogArticles(options?: BlogQueryOptions): Promise<{
  articles: BlogArticle[];
  pageInfo: any;
  blog: { id: string; handle: string; title: string } | null;
}> {
  const handles = options?.blogHandle
    ? [options.blogHandle]
    : ['journal', 'news', 'blog', 'articles', 'the-flois-journal'];

  for (const handle of handles) {
    try {
      const data = await shopifyFetch<{ blog: any }>({
        query: GET_BLOG_ARTICLES_QUERY,
        variables: {
          blogHandle: handle,
          first: options?.first || 50,
          after: options?.after,
          sortKey: options?.sortKey || 'PUBLISHED_AT',
          reverse: options?.reverse !== undefined ? options.reverse : true
        },
        revalidate: 300,
        tags: [BLOG_CACHE_TAG]
      });

      if (data?.blog?.articles?.edges?.length > 0) {
        return {
          articles: data.blog.articles.edges.map((e: any) => reshapeArticle(e.node)),
          pageInfo: data.blog.articles.pageInfo,
          blog: {
            id: data.blog.id,
            handle: data.blog.handle,
            title: data.blog.title
          }
        };
      }
    } catch {
      // try next handle
    }
  }

  return { articles: [], pageInfo: null, blog: null };
}

/**
 * Fetch a single article by its handle.
 */
export async function getArticleByHandle(
  blogHandle: string,
  articleHandle: string
): Promise<BlogArticle | null> {
  try {
    const data = await shopifyFetch<{ blog: any }>({
      query: GET_ARTICLE_BY_HANDLE_QUERY,
      variables: { blogHandle, articleHandle },
      revalidate: 300,
      tags: [BLOG_CACHE_TAG, `blog-article-${articleHandle}`]
    });

    return data?.blog?.articleByHandle
      ? reshapeArticle(data.blog.articleByHandle)
      : null;
  } catch {
    return null;
  }
}

/**
 * Fetch all blogs and merge their articles — useful for stores with multiple blogs.
 */
export async function getAllBlogArticles(): Promise<BlogArticle[]> {
  try {
    const data = await shopifyFetch<{ blogs: { edges: { node: any }[] } }>({
      query: GET_ALL_BLOGS_QUERY,
      variables: { first: 10 },
      revalidate: 300,
      tags: [BLOG_CACHE_TAG]
    });

    const articles: BlogArticle[] = [];
    for (const edge of data?.blogs?.edges || []) {
      const blog = edge.node;
      for (const articleEdge of blog.articles?.edges || []) {
        articles.push(reshapeArticle({ ...articleEdge.node, blog: { handle: blog.handle, title: blog.title } }));
      }
    }

    // Sort by publishedAt descending
    return articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Calculate approximate reading time from HTML content.
 */
export function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = text.split(' ').filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

/**
 * Extract unique tags from articles.
 */
export function extractArticleTags(articles: BlogArticle[]): string[] {
  const tagSet = new Set<string>();
  for (const article of articles) {
    for (const tag of article.tags) {
      if (tag.trim()) tagSet.add(tag.trim());
    }
  }
  return Array.from(tagSet).sort();
}

/**
 * Find related articles by shared tags.
 */
export function findRelatedArticles(
  current: BlogArticle,
  all: BlogArticle[],
  limit = 3
): BlogArticle[] {
  const currentTags = new Set(current.tags.map((t) => t.toLowerCase()));
  return all
    .filter((a) => a.handle !== current.handle)
    .map((a) => ({
      article: a,
      score: a.tags.filter((t) => currentTags.has(t.toLowerCase())).length
    }))
    .sort((a, b) => b.score - a.score || new Date(b.article.publishedAt).getTime() - new Date(a.article.publishedAt).getTime())
    .slice(0, limit)
    .map((r) => r.article);
}
