'use client';

import React from 'react';
import { BlogArticle } from '@/types/blog';
import { calculateReadingTime } from '@/lib/shopify/blog';
import { Calendar, Clock, User } from 'lucide-react';

interface ArticleHeroProps {
  article: BlogArticle;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function ArticleHero({ article }: ArticleHeroProps) {
  const readTime = calculateReadingTime(article.contentHtml);
  const primaryTag = article.tags[0] || 'Wellness';

  return (
    <header className="relative w-full bg-white pt-24 pb-0 overflow-hidden">
      {/* Top section — text above image */}
      <div className="max-w-3xl mx-auto px-6 sm:px-12 pt-12 pb-10 text-center">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 mb-8 text-[11px] font-sans text-[#9A9E9A]">
          <a href="/" className="hover:text-[#4B644C] transition-colors">Home</a>
          <span>/</span>
          <a href="/blog" className="hover:text-[#4B644C] transition-colors">Journal</a>
          <span>/</span>
          <span className="text-[#121412] truncate max-w-[160px]">{article.title}</span>
        </nav>

        {/* Category */}
        <span className="inline-block px-4 py-1.5 rounded-full bg-[#4B644C]/10 text-[#4B644C] text-[10px] font-sans font-semibold uppercase tracking-[0.22em] mb-6">
          {primaryTag}
        </span>

        {/* Title */}
        <h1
          className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#121412] leading-[1.06] tracking-tight mb-6"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-base sm:text-lg font-sans font-light text-[#4A4E4A] leading-relaxed mb-8 max-w-xl mx-auto">
            {article.excerpt}
          </p>
        )}

        {/* Meta row */}
        <div className="flex items-center justify-center flex-wrap gap-5 text-[12px] font-sans text-[#787E78]">
          <span className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            {article.author?.name || 'FLOIS Editorial Team'}
          </span>
          <span className="h-3 w-px bg-[#D8D5CE]" />
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="h-3 w-px bg-[#D8D5CE]" />
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {readTime} min read
          </span>
        </div>
      </div>

      {/* Hero image */}
      {article.image?.url && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="w-full aspect-[21/9] sm:aspect-[21/8] rounded-2xl sm:rounded-3xl overflow-hidden">
            <img
              src={article.image.url}
              alt={article.image.altText || article.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      )}
    </header>
  );
}
