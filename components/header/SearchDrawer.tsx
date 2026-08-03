'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';
import { searchAllAction } from '@/hooks/actions/searchActions';
import { SearchResults } from '@/types/search';

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TRENDING_SEARCHES = ['Hair Growth Oil', 'Neem Wooden Comb', 'Advanced Sunscreen', 'Dandruff Relief', 'Hyperpigmentation'];

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  // Handle live Shopify search on query change
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchAllAction(query);
        if (res.success && res.results) {
          setResults(res.results);
        }
      } catch (err) {
        console.error('[SearchDrawer] Error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#121412]/40 backdrop-blur-sm"
          />

          {/* Fullscreen Search Drawer Container */}
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full bg-white shadow-2xl border-b border-[#E8E6DF] max-h-[85vh] overflow-y-auto"
          >
            <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-8">
              
              {/* Top Search Input & Close Bar */}
              <div className="relative flex items-center justify-between border-b border-[#E8E6DF] pb-6">
                <div className="flex flex-1 items-center gap-4">
                  <Search className="h-6 w-6 text-[#787E78]" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search formulations, ingredients, concerns..."
                    className="w-full bg-transparent text-xl sm:text-2xl font-serif text-[#121412] placeholder-[#787E78] focus:outline-none"
                  />
                  {isSearching && <Loader2 className="h-5 w-5 animate-spin text-[#4B644C]" />}
                </div>

                <button
                  onClick={onClose}
                  className="ml-4 p-2 text-[#121412] hover:text-[#4B644C] transition-colors focus:outline-none"
                  aria-label="Close Search"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Body Content */}
              <div className="py-8">
                {!query.trim() ? (
                  // Trending & Popular Default State
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#787E78] mb-4">
                        Trending Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING_SEARCHES.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="rounded-full bg-[#FAF9F5] border border-[#E8E6DF] hover:border-[#4B644C] hover:text-[#4B644C] px-4 py-2 text-xs font-medium text-[#121412] transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#787E78] mb-4">
                        Popular Collections
                      </h4>
                      <ul className="space-y-2.5 text-sm">
                        <li>
                          <Link href="/collections/hair-care" onClick={onClose} className="inline-flex items-center gap-2 text-[#121412] hover:text-[#4B644C] transition-colors">
                            <span>Hair Care Formulations</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                          </Link>
                        </li>
                        <li>
                          <Link href="/collections/sun-care" onClick={onClose} className="inline-flex items-center gap-2 text-[#121412] hover:text-[#4B644C] transition-colors">
                            <span>Advanced Sunscreen & UV Repair</span>
                            <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  // Live Shopify Search Results
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-xs font-semibold uppercase tracking-widest text-[#787E78]">
                        Search Results ({results?.totalResults || 0})
                      </h4>
                    </div>

                    {results && results.products.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {results.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/products/${product.handle}`}
                            onClick={onClose}
                            className="group block rounded-lg border border-[#E8E6DF] bg-[#FAF9F5] p-4 transition-all hover:border-[#4B644C]"
                          >
                            {product.featuredImage?.url && (
                              <div className="relative aspect-square overflow-hidden rounded mb-3 bg-white">
                                <Image
                                  src={product.featuredImage.url}
                                  alt={product.featuredImage.altText || product.title}
                                  fill
                                  sizes="200px"
                                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              </div>
                            )}
                            <h5 className="font-serif text-base text-[#121412] group-hover:text-[#4B644C] transition-colors mb-1">
                              {product.title}
                            </h5>
                            <p className="text-xs font-semibold text-[#4B644C]">
                              {product.priceRange?.minVariantPrice?.currencyCode} {product.priceRange?.minVariantPrice?.amount}
                            </p>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      !isSearching && (
                        <p className="text-sm text-[#787E78] italic">
                          No formulations found matching "{query}". Try searching for "Hair" or "Sunscreen".
                        </p>
                      )
                    )}
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
