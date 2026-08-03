'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogArticle } from '@/types/blog';
import { calculateReadingTime } from '@/lib/shopify/blog';

interface ArticleCardProps {
  article: BlogArticle;
  index?: number;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const readTime = calculateReadingTime(article.contentHtml);
  const primaryTag = article.tags[0] || 'Wellness';
  const href = `/blog/${article.blog.handle}/${article.handle}`;
  const imgSrc = article.image?.url || '/images/story/botanicals.jpg';

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#E8E6DF] hover:border-[#4B644C]/30 hover:shadow-xl transition-all duration-400"
    >
      {/* Image */}
      <Link href={href} className="block relative aspect-[16/10] overflow-hidden bg-[#FAF9F5]">
        <Image
          src={imgSrc}
          alt={article.image?.altText || article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-600 group-hover:scale-[1.04]"
        />
        {/* Category pill overlay */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[10px] font-sans font-semibold uppercase tracking-[0.18em] text-[#4B644C] shadow-sm">
            {primaryTag}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 space-y-3">
        {/* Meta */}
        <div className="flex items-center gap-3 text-[11px] font-sans text-[#9A9E9A]">
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="h-3 w-px bg-[#D8D5CE]" />
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {readTime} min read
          </span>
        </div>

        {/* Title */}
        <Link href={href}>
          <h3
            className="font-serif text-xl sm:text-2xl font-normal text-[#121412] leading-snug tracking-tight group-hover:text-[#4B644C] transition-colors duration-300 line-clamp-2"
            style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
          >
            {article.title}
          </h3>
        </Link>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-xs sm:text-sm font-sans text-[#787E78] font-light leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>
        )}

        {/* Read link */}
        <div className="pt-3 border-t border-[#F0EEE8]">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold uppercase tracking-[0.15em] text-[#4B644C] hover:gap-2.5 transition-all duration-200"
          >
            <span>Read Story</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
