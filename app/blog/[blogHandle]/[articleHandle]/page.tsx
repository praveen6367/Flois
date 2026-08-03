import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/Footer';
import { ArticleHero } from '@/components/blog/ArticleHero';
import { ArticleBody } from '@/components/blog/ArticleBody';
import { RelatedArticles } from '@/components/blog/RelatedArticles';
import { ArticleRelatedProducts } from '@/components/blog/ArticleRelatedProducts';
import { JournalNewsletter } from '@/components/blog/JournalNewsletter';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { getArticleByHandle, getBlogArticles, findRelatedArticles, calculateReadingTime } from '@/lib/shopify/blog';
import { getFeaturedProducts } from '@/lib/shopify/products';

export const revalidate = 300;

interface ArticlePageProps {
  params: Promise<{ blogHandle: string; articleHandle: string }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { blogHandle, articleHandle } = await params;
  const article = await getArticleByHandle(blogHandle, articleHandle);

  if (!article) {
    return {
      title: 'Article Not Found | FLOIS Journal',
      description: 'The article you are looking for could not be found.'
    };
  }

  const readTime = calculateReadingTime(article.contentHtml);

  return {
    title: `${article.seo?.title || article.title} | The FLOIS Journal`,
    description: article.seo?.description || article.excerpt || `${article.title} — ${readTime} min read`,
    openGraph: {
      title: article.seo?.title || article.title,
      description: article.seo?.description || article.excerpt || '',
      url: `https://flois.in/blog/${blogHandle}/${articleHandle}`,
      type: 'article',
      publishedTime: article.publishedAt,
      authors: [article.author?.name || 'FLOIS Editorial Team'],
      images: article.image?.url ? [{ url: article.image.url, alt: article.image.altText || article.title }] : []
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt || ''
    },
    alternates: {
      canonical: `https://flois.in/blog/${blogHandle}/${articleHandle}`
    }
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { blogHandle, articleHandle } = await params;

  const [shopBrand, menuItems, article, { articles: allArticles }, products] = await Promise.all([
    getShopBrand(),
    getHeaderMenu('main-menu').catch(() => []),
    getArticleByHandle(blogHandle, articleHandle),
    getBlogArticles({ first: 50 }),
    getFeaturedProducts(6)
  ]);

  if (!article) {
    notFound();
  }

  const relatedArticles = findRelatedArticles(article, allArticles, 3);
  const readTime = calculateReadingTime(article.contentHtml);

  // Article JSON-LD schema
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt || '',
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author?.name || 'FLOIS Editorial Team'
    },
    publisher: {
      '@type': 'Organization',
      name: 'FLOIS',
      logo: { '@type': 'ImageObject', url: 'https://flois.in/logo.png' }
    },
    image: article.image?.url,
    url: `https://flois.in/blog/${blogHandle}/${articleHandle}`,
    keywords: article.tags.join(', '),
    timeRequired: `PT${readTime}M`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://flois.in/blog/${blogHandle}/${articleHandle}`
    }
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://flois.in' },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://flois.in/blog' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://flois.in/blog/${blogHandle}/${articleHandle}` }
    ]
  };

  return (
    <div className="min-h-screen bg-white text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Hero */}
      <ArticleHero article={article} />

      {/* Body — rich text content */}
      <ArticleBody contentHtml={article.contentHtml} />

      {/* Related Products — tag matched */}
      <ArticleRelatedProducts article={article} products={products} />

      {/* Related Articles */}
      <RelatedArticles articles={relatedArticles} />

      {/* Newsletter */}
      <JournalNewsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
