import React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { BlogArticle } from '@/types/blog';
import { calculateReadingTime } from '@/lib/shopify/blog';

interface RelatedArticlesProps {
  articles: BlogArticle[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className="w-full bg-[#FAF9F5] py-16 sm:py-20 border-t border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#4B644C]">
            Continue Reading
          </span>
          <div className="h-px w-12 bg-[#E8E6DF]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {articles.map((article) => {
            const readTime = calculateReadingTime(article.contentHtml);
            const href = `/blog/${article.blog.handle}/${article.handle}`;
            const primaryTag = article.tags[0] || 'Wellness';

            return (
              <Link
                key={article.id}
                href={href}
                className="group flex flex-col rounded-2xl overflow-hidden bg-white border border-[#E8E6DF] hover:border-[#4B644C]/30 hover:shadow-lg transition-all duration-300"
              >
                {/* Image */}
                {article.image?.url && (
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image.url}
                      alt={article.image.altText || article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/95 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                        {primaryTag}
                      </span>
                    </div>
                  </div>
                )}
                {/* Content */}
                <div className="p-6 space-y-2 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[11px] font-sans text-[#9A9E9A]">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="h-2.5 w-px bg-[#D8D5CE]" />
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {readTime} min read
                    </span>
                  </div>
                  <h3
                    className="font-serif text-lg font-normal text-[#121412] leading-snug group-hover:text-[#4B644C] transition-colors line-clamp-2 flex-1"
                    style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
                  >
                    {article.title}
                  </h3>
                  <div className="pt-3 border-t border-[#F0EEE8] mt-auto">
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#4B644C] group-hover:gap-2 transition-all">
                      Read Story <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
