import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/Footer';
import { JournalHero } from '@/components/blog/JournalHero';
import { FeaturedArticle } from '@/components/blog/FeaturedArticle';
import { ArticleGrid } from '@/components/blog/ArticleGrid';
import { JournalNewsletter } from '@/components/blog/JournalNewsletter';
import { EmptyJournalState } from '@/components/blog/EmptyJournalState';
import { getHeaderMenu } from '@/lib/shopify/menus';
import { getShopBrand } from '@/lib/shopify/shop';
import { getBlogArticles } from '@/lib/shopify/blog';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'The FLOIS Journal | Ayurvedic Insights & Botanical Wellness',
  description:
    'Explore modern Ayurvedic insights, ingredient science, and botanical wellness stories from the FLOIS editorial team.',
  openGraph: {
    title: 'The FLOIS Journal | Ayurvedic Insights & Botanical Wellness',
    description:
      'Modern Ayurvedic insights, ingredient science and botanical wellness — curated by the FLOIS team.',
    url: 'https://flois.in/blog',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The FLOIS Journal',
    description: 'Modern Ayurvedic insights, ingredient science and botanical wellness.'
  },
  alternates: {
    canonical: 'https://flois.in/blog'
  }
};

export default async function BlogPage() {
  const [shopBrand, menuItems, { articles }] = await Promise.all([
    getShopBrand(),
    getHeaderMenu('main-menu').catch(() => []),
    getBlogArticles({ first: 50, sortKey: 'PUBLISHED_AT', reverse: true })
  ]);

  const featuredArticle = articles[0] || null;
  const remainingArticles = articles.slice(1);

  // JSON-LD Blog schema
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'The FLOIS Journal',
    description: 'Modern Ayurvedic insights, ingredient science and botanical wellness.',
    url: 'https://flois.in/blog',
    publisher: {
      '@type': 'Organization',
      name: 'FLOIS',
      logo: {
        '@type': 'ImageObject',
        url: 'https://flois.in/logo.png'
      }
    },
    blogPost: articles.slice(0, 10).map((article) => ({
      '@type': 'BlogPosting',
      headline: article.title,
      description: article.excerpt || '',
      datePublished: article.publishedAt,
      author: {
        '@type': 'Person',
        name: article.author?.name || 'FLOIS Editorial Team'
      },
      url: `https://flois.in/blog/${article.blog.handle}/${article.handle}`,
      image: article.image?.url
    }))
  };

  return (
    <div className="min-h-screen bg-white text-[#121412] font-sans selection:bg-[#4B644C] selection:text-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Header */}
      <Header menu={menuItems} logoImage={shopBrand?.logo} />

      {/* Hero */}
      <JournalHero />

      {articles.length === 0 ? (
        <EmptyJournalState />
      ) : (
        <>
          {/* Featured article — newest */}
          {featuredArticle && <FeaturedArticle article={featuredArticle} />}

          {/* Article grid with filters */}
          <ArticleGrid articles={remainingArticles.length > 0 ? remainingArticles : articles} />
        </>
      )}

      {/* Newsletter */}
      <JournalNewsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
}
