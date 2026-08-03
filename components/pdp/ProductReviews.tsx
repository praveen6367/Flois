'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle2, ThumbsUp } from 'lucide-react';

const RATING_BREAKDOWN = [
  { stars: 5, percent: 82 },
  { stars: 4, percent: 11 },
  { stars: 3, percent: 4 },
  { stars: 2, percent: 2 },
  { stars: 1, percent: 1 },
];

const REVIEWS = [
  {
    name: 'Priya M.',
    initial: 'P',
    location: 'Mumbai',
    rating: 5,
    date: 'July 2026',
    title: 'Visible difference in just 3 weeks',
    body: 'I was sceptical at first, but after 3 weeks my hairfall has dramatically reduced. My scalp feels nourished and I can see baby hairs growing along my hairline. The scent is divine — subtle, herby and completely natural.',
    helpful: 47,
    verified: true,
  },
  {
    name: 'Karthik R.',
    initial: 'K',
    location: 'Bangalore',
    rating: 5,
    date: 'June 2026',
    title: 'Best hair oil I have ever used',
    body: 'Tried everything from Indulekha to Kesh King. Nothing worked like FLOIS. This is not greasy at all. Absorbs quickly, my hair doesn\'t look oily even at night. And the hairfall? Almost zero now.',
    helpful: 39,
    verified: true,
  },
  {
    name: 'Aarohi S.',
    initial: 'A',
    location: 'Delhi',
    rating: 4,
    date: 'July 2026',
    title: 'Gentle on sensitive scalp',
    body: 'I have a very sensitive scalp and most oils cause breakouts. FLOIS is the first hair oil in years that hasn\'t irritated me. My dandruff has reduced significantly. Only giving 4 stars because shipping took longer than expected.',
    helpful: 28,
    verified: true,
  },
];

export function ProductReviews() {
  const totalReviews = 128;
  const avgRating = 4.9;

  return (
    <section
      id="reviews"
      className="relative w-full bg-[#FFFFFF] py-20 sm:py-28 border-b border-[#E8E6DF]"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Schema: AggregateRating */}
      <div
        itemProp="aggregateRating"
        itemScope
        itemType="https://schema.org/AggregateRating"
        className="hidden"
      >
        <meta itemProp="ratingValue" content="4.9" />
        <meta itemProp="reviewCount" content="128" />
        <meta itemProp="bestRating" content="5" />
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Section Header */}
        <div className="max-w-[750px] mx-auto text-center space-y-3 mb-16 sm:mb-20">
          <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
            Verified Customer Reviews
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-[3.25rem] font-normal leading-[1.08] tracking-tight text-[#0F1410]">
            What People Are Saying
          </h2>
        </div>

        {/* Rating Overview */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-12 gap-8 sm:gap-12 mb-14 pb-14 border-b border-[#E8E6DF]">
          {/* Left: Big Score */}
          <div className="sm:col-span-4 flex flex-col items-center justify-center space-y-2 text-center">
            <span className="font-serif text-[5rem] leading-none text-[#0F1410] font-normal">
              {avgRating}
            </span>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-[#C8A96E] text-[#C8A96E]" />
              ))}
            </div>
            <p className="text-xs font-sans text-[#787E78]">Based on {totalReviews} reviews</p>
          </div>

          {/* Right: Breakdown bars */}
          <div className="sm:col-span-8 space-y-2.5 justify-center flex flex-col">
            {RATING_BREAKDOWN.map(({ stars, percent }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="text-[11px] font-sans text-[#4A4E4A] w-6 text-right shrink-0">{stars}</span>
                <Star className="h-3 w-3 fill-[#C8A96E] text-[#C8A96E] shrink-0" />
                <div className="flex-1 h-1.5 bg-[#EDE9E0] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (5 - stars) * 0.07 }}
                    className="h-full bg-[#C8A96E] rounded-full"
                  />
                </div>
                <span className="text-[11px] font-sans text-[#9A9E9A] w-7 shrink-0">{percent}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {REVIEWS.map((review, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              itemScope
              itemProp="review"
              itemType="https://schema.org/Review"
              className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E8E6DF] space-y-4 flex flex-col"
            >
              {/* Reviewer */}
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-[#4B644C] flex items-center justify-center text-white text-sm font-semibold font-sans shrink-0">
                  {review.initial}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span itemProp="author" className="text-sm font-sans font-semibold text-[#0F1410]">
                      {review.name}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-[#2D5A2E] bg-[#EAF3EA] px-1.5 py-0.5 rounded-full border border-[#C5D1C5]">
                        <CheckCircle2 className="h-2.5 w-2.5" />
                        Verified
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-sans text-[#9A9E9A]">{review.location} · {review.date}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < review.rating ? 'fill-[#C8A96E] text-[#C8A96E]' : 'text-[#E8E6DF]'}`}
                  />
                ))}
              </div>

              {/* Review text */}
              <div className="flex-1">
                <p itemProp="name" className="text-sm font-sans font-semibold text-[#0F1410] mb-1.5">
                  {review.title}
                </p>
                <p itemProp="reviewBody" className="text-[13px] font-sans text-[#4A4E4A] font-light leading-relaxed">
                  {review.body}
                </p>
              </div>

              {/* Helpful */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-[#E8E6DF]">
                <ThumbsUp className="h-3 w-3 text-[#9A9E9A]" />
                <span className="text-[10px] font-sans text-[#9A9E9A]">
                  {review.helpful} found this helpful
                </span>
              </div>

              {/* Schema hidden rating */}
              <div itemProp="reviewRating" itemScope itemType="https://schema.org/Rating" className="hidden">
                <meta itemProp="ratingValue" content={String(review.rating)} />
              </div>
            </motion.article>
          ))}
        </div>


      </div>
    </section>
  );
}
