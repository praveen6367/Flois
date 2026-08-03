'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogArticle } from '@/types/blog';
import { calculateReadingTime } from '@/lib/shopify/blog';

interface FeaturedArticleProps {
  article: BlogArticle;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const readTime = calculateReadingTime(article.contentHtml);
  const primaryTag = article.tags[0] || 'Wellness';
  const href = `/blog/${article.blog.handle}/${article.handle}`;
  const imgSrc = article.image?.url || '/images/story/hero.jpg';

  return (
    <section className="w-full bg-white border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16 py-16 sm:py-20">
        
        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#4B644C]">
            Featured Story
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-[#E8E6DF]" />
        </div>

        <Link href={href} className="group block">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-0 rounded-3xl overflow-hidden bg-[#FAF9F5] border border-[#E8E6DF] group-hover:border-[#4B644C]/30 transition-colors duration-500 shadow-sm group-hover:shadow-xl"
          >
            {/* Image — 60% */}
            <div className="relative w-full aspect-[16/10] lg:aspect-auto min-h-[380px] overflow-hidden">
              <Image
                src={imgSrc}
                alt={article.image?.altText || article.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />
              {/* Subtle vignette */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#FAF9F5]/20 lg:block hidden" />
            </div>

            {/* Content — 40% */}
            <div className="flex flex-col justify-between p-8 sm:p-10 lg:p-12">
              <div className="space-y-5">
                {/* Category pill */}
                <span className="inline-block px-3.5 py-1 rounded-full bg-[#4B644C]/10 text-[#4B644C] text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                  {primaryTag}
                </span>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-[11px] font-sans text-[#787E78]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3 w-3" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="h-3 w-px bg-[#D8D5CE]" />
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {readTime} min read
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="font-serif text-3xl sm:text-4xl font-normal text-[#121412] leading-[1.1] tracking-tight group-hover:text-[#4B644C] transition-colors duration-300"
                  style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                >
                  {article.title}
                </h2>

                {/* Excerpt — 2 lines max */}
                {article.excerpt && (
                  <p className="text-sm font-sans text-[#4A4E4A] font-light leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                )}
              </div>

              {/* CTA */}
              <div className="mt-8 pt-6 border-t border-[#E8E6DF]">
                <div className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-[#121412] group-hover:text-[#4B644C] transition-colors">
                  <span>Read Article</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                <p className="text-[11px] font-sans text-[#787E78] mt-1">
                  By {article.author?.name || 'FLOIS Editorial'}
                </p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>
    </section>
  );
}
