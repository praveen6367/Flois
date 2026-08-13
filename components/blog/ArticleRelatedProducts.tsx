import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Product } from '@/types/product';
import { BlogArticle } from '@/types/blog';

interface ArticleRelatedProductsProps {
  article: BlogArticle;
  products: Product[];
}

const TAG_PRODUCT_MAP: Record<string, string[]> = {
  'hair growth': ['rootherb-hair-growth-oil', 'hair-growth'],
  'hair care': ['rootherb-hair-growth-oil', 'hair-care'],
  'scalp': ['rootherb-hair-growth-oil'],
  'ayurveda': ['rootherb-hair-growth-oil'],
  'sun protection': ['de-tan-sunscreen', 'sunscreen'],
  'sunscreen': ['de-tan-sunscreen'],
  'skin': ['de-tan-sunscreen'],
  'neem': ['neem-comb', 'neem'],
  'accessories': ['neem-comb'],
  'wellness': []
};

function getRelevantProducts(article: BlogArticle, allProducts: Product[]): Product[] {
  const articleTagsLower = article.tags.map((t) => t.toLowerCase());
  const articleTitleLower = article.title.toLowerCase();

  const handles = new Set<string>();

  for (const tag of articleTagsLower) {
    for (const [keyword, productHandles] of Object.entries(TAG_PRODUCT_MAP)) {
      if (tag.includes(keyword) || articleTitleLower.includes(keyword)) {
        for (const h of productHandles) handles.add(h);
      }
    }
  }

  // Filter real products by handle match
  const matched = allProducts.filter(
    (p) => handles.has(p.handle) || handles.has(p.handle.toLowerCase())
  );

  // Fallback: return all products if no specific match
  return matched.length > 0 ? matched.slice(0, 3) : allProducts.slice(0, 3);
}

export function ArticleRelatedProducts({ article, products }: ArticleRelatedProductsProps) {
  if (products.length === 0) return null;

  const relevant = getRelevantProducts(article, products);
  if (relevant.length === 0) return null;

  return (
    <section className="w-full bg-white py-16 sm:py-20 border-t border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        {/* Label */}
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.3em] text-[#4B644C]">
            Featured in This Article
          </span>
          <div className="h-px w-12 bg-[#E8E6DF]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {relevant.map((product) => {
            const images = product.images?.nodes || product.images?.edges?.map((e) => e.node) || [];
            const img = images[0]?.url || product.featuredImage?.url || '/products/rootherb_product.png';
            const price = product.priceRange?.minVariantPrice?.amount
              ? `₹${parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString('en-IN')}`
              : '₹999';

            return (
              <Link
                key={product.id}
                href={`/products/${product.handle}`}
                className="group flex flex-col rounded-2xl overflow-hidden bg-[#FAF9F5] border border-[#E8E6DF] hover:border-[#4B644C]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F0EEE8]">
                  <Image
                    src={img}
                    alt={product.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#4B644C]">
                    {product.productType || 'FLOIS BOTANICAL'}
                  </span>
                  <h3 className="font-serif text-lg font-normal text-[#121412] leading-snug group-hover:text-[#4B644C] transition-colors"
                  >
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between pt-2">
                    <span className="font-serif text-base text-[#121412]">{price}</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans font-semibold uppercase tracking-wider text-[#4B644C] group-hover:gap-2 transition-all">
                      Shop <ArrowRight className="h-3 w-3" />
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
