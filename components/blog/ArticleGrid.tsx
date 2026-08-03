'use client';

import React, { useState, useMemo } from 'react';
import { Search, X } from 'lucide-react';
import { BlogArticle } from '@/types/blog';
import { ArticleCard } from './ArticleCard';
import { extractArticleTags } from '@/lib/shopify/blog';

interface ArticleGridProps {
  articles: BlogArticle[];
}

const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A – Z', value: 'az' }
];

export function ArticleGrid({ articles }: ArticleGridProps) {
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const tags = useMemo(() => extractArticleTags(articles), [articles]);

  const filtered = useMemo(() => {
    let result = [...articles];

    // Filter by tag
    if (selectedTag !== 'all') {
      result = result.filter((a) =>
        a.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase())
      );
    }

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          (a.excerpt || '').toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          (a.contentHtml || '').toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'newest') {
      result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    } else if (sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else if (sortBy === 'az') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [articles, selectedTag, search, sortBy]);

  return (
    <section className="w-full bg-[#FAFAF8] py-16 sm:py-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">

        {/* Section label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#4B644C]">
            All Articles
          </span>
          <div className="h-px flex-1 max-w-[60px] bg-[#E8E6DF]" />
        </div>

        {/* Controls row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          {/* Category tabs */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag('all')}
                className={`px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold uppercase tracking-wider transition-all duration-200 ${
                  selectedTag === 'all'
                    ? 'bg-[#141C15] text-white'
                    : 'bg-white border border-[#E8E6DF] text-[#4A4E4A] hover:border-[#4B644C] hover:text-[#4B644C]'
                }`}
              >
                All
              </button>
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag === selectedTag ? 'all' : tag)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold uppercase tracking-wider transition-all duration-200 ${
                    selectedTag === tag
                      ? 'bg-[#4B644C] text-white'
                      : 'bg-white border border-[#E8E6DF] text-[#4A4E4A] hover:border-[#4B644C] hover:text-[#4B644C]'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Right: Search + Sort */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Sort segmented control */}
            <div className="hidden sm:flex items-center bg-white border border-[#E8E6DF] rounded-full p-0.5">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-sans font-semibold transition-all duration-200 ${
                    sortBy === opt.value
                      ? 'bg-[#141C15] text-white'
                      : 'text-[#787E78] hover:text-[#121412]'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#9A9E9A] pointer-events-none" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#E8E6DF] text-xs font-sans text-[#121412] placeholder:text-[#9A9E9A] focus:outline-none focus:border-[#4B644C] w-48 sm:w-56 transition-all"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A9E9A] hover:text-[#121412]"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-[#4A4E4A] mb-3">No articles found</p>
            <p className="text-sm font-sans text-[#787E78]">
              Try a different category or search term.
            </p>
            <button
              onClick={() => { setSelectedTag('all'); setSearch(''); }}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#141C15] text-white text-xs font-sans uppercase tracking-wider"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Results count */}
        {(selectedTag !== 'all' || search) && filtered.length > 0 && (
          <p className="text-center text-xs font-sans text-[#9A9E9A] mt-10">
            Showing {filtered.length} article{filtered.length !== 1 ? 's' : ''}
          </p>
        )}
      </div>
    </section>
  );
}
