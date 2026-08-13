'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQ { question: string; answer: string; }

const HAIR_OIL_FAQS: FAQ[] = [
  {
    question: 'How quickly can I expect to see visible hair fall reduction?',
    answer: 'Most users notice a clear drop in daily comb hair fall within 2–3 weeks of regular application (3× weekly). Baby hair regrowth along hairlines typically becomes visible around week 4–6.'
  },
  {
    question: 'Is this oil suitable for color-treated or chemically straightened hair?',
    answer: 'Yes, absolutely. All FLOIS formulas are 100% natural, sulfate-free, and mineral-oil free — completely safe for color-treated, keratin-treated, or chemically processed hair.'
  },
  {
    question: 'Can I leave the RootHerb hair oil on overnight?',
    answer: 'Yes. Leaving the oil overnight allows deep penetration into dormant scalp follicles. Simply rinse the next morning with a mild, sulfate-free cleanser.'
  },
  {
    question: 'Will this cause scalp breakouts or greasiness?',
    answer: 'No. FLOIS formulas are non-comedogenic and rapidly absorbed without blocking scalp pores. They are specifically designed to be lightweight and non-greasy.'
  },
  {
    question: 'How often should I use the oil for best results?',
    answer: 'We recommend applying 3–4 times per week for the first 8 weeks. After that, you can reduce to twice weekly for maintenance. Consistency is key to sustained results.'
  },
  {
    question: 'Is FLOIS RootHerb suitable for all hair types?',
    answer: 'Yes. The formula is dermatologist-tested and suitable for all hair types including dry, oily, fine, thick, curly, and straight. It is also safe for sensitive scalps.'
  },
];

const SUNSCREEN_FAQS: FAQ[] = [
  {
    question: 'Does the sunscreen leave a white cast on darker skin tones?',
    answer: 'No. The FLOIS Advanced De-Tan Sunscreen Gel is formulated with zero white cast technology. It absorbs completely into the skin without any visible residue, making it suitable for all Indian skin tones.'
  },
  {
    question: 'Can I use this sunscreen under makeup?',
    answer: 'Yes. The ultra-lightweight gel texture creates a smooth, matte base that works perfectly under foundation, BB cream, or any other makeup product. It does not pill or make makeup slide.'
  },
  {
    question: 'How often should I reapply the sunscreen?',
    answer: 'For continuous outdoor exposure, reapply every 2–3 hours. For indoor or mixed use (office + commute), a morning application is usually sufficient for daily protection.'
  },
  {
    question: 'Does it help remove existing tan or just prevent new tanning?',
    answer: 'Both. The de-tan actives (Kojic Acid, Niacinamide) work actively to fade existing tan and dark spots over time, while SPF 50+ PA++++ shields against new UV damage simultaneously.'
  },
  {
    question: 'Is it safe for sensitive or acne-prone skin?',
    answer: 'Yes. The formula is non-comedogenic (does not clog pores), fragrance-free, and dermatologist-tested for sensitive skin. It is safe for daily use even on acne-prone skin types.'
  },
  {
    question: 'Does the sunscreen need to be washed off at night?',
    answer: 'Yes. We recommend removing it with a gentle cleanser at the end of the day, followed by your regular moisturizer and night-time skincare routine.'
  },
];

const NEEM_COMB_FAQS: FAQ[] = [
  {
    question: 'How does a neem wood comb reduce dandruff?',
    answer: 'Neem wood naturally contains nimbidin and azadirachtin bioactives that have proven anti-fungal properties. Every time you comb, these compounds are gently transferred to your scalp, helping control the Malassezia fungus that causes dandruff.'
  },
  {
    question: 'Can I use this comb on wet hair?',
    answer: 'The FLOIS Neem Wood Comb is designed with wide-tooth spacing that is gentle enough for wet detangling. However, avoid soaking the comb in water for extended periods to preserve the wood\'s natural properties.'
  },
  {
    question: 'How do I clean and maintain the neem comb?',
    answer: 'Wipe the comb clean with a dry or slightly damp cloth after each use. Avoid submerging in water. Occasionally rub with a few drops of coconut oil to maintain the wood\'s luster and longevity.'
  },
  {
    question: 'Is the neem comb suitable for all hair types?',
    answer: 'Yes. The rounded, smooth teeth are suitable for straight, wavy, curly, thick, and fine hair. The anti-static property makes it especially beneficial for fine hair prone to breakage and flyaways.'
  },
  {
    question: 'How long does the neem comb last?',
    answer: 'With proper care, a quality neem wood comb lasts 2–3 years. Avoid leaving it in humid or wet environments. The wood is kiln-dried and sealed during manufacturing to ensure durability.'
  },
  {
    question: 'Does the comb have a strong neem smell?',
    answer: 'There is a mild, natural, herbal scent from the neem wood — not overpowering. Most users find it pleasant and soothing. The scent fades slightly after the first few weeks of use.'
  },
];

function getFaqs(handle: string): FAQ[] {
  const h = handle.toLowerCase();
  if (h.includes('sunscreen') || h.includes('tan') || h.includes('spf') || h.includes('de-tan')) return SUNSCREEN_FAQS;
  if (h.includes('neem') || h.includes('comb')) return NEEM_COMB_FAQS;
  return HAIR_OIL_FAQS;
}

interface ProductFAQsProps {
  productHandle?: string;
}

export function ProductFAQs({ productHandle = 'rootherb-hair-growth-oil' }: ProductFAQsProps) {
  const FAQS = getFaqs(productHandle);
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      className="relative w-full bg-[#FAFAF8] py-20 sm:py-28 border-b border-[#E8E6DF]"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="max-w-[680px] mx-auto text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-[#4B644C]" />
            <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.22em] text-[#4B644C]">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#0F1410]">
            Everything You Need To Know
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div
          className="max-w-3xl mx-auto space-y-2.5"
          itemScope
          itemType="https://schema.org/FAQPage"
        >
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-white border border-[#E8E6DF] overflow-hidden transition-shadow hover:shadow-sm"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                suppressHydrationWarning
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4B644C] focus-visible:ring-inset rounded-2xl"
              >
                <span
                  itemProp="name"
                  className="font-sans text-[14px] sm:text-[15px] font-semibold text-[#0F1410] leading-snug pr-2"
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#4B644C] shrink-0 transition-transform duration-300 ${
                    openIdx === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p
                      itemProp="text"
                      className="px-6 pb-5 text-[13px] font-sans text-[#4A4E4A] font-light leading-relaxed border-t border-[#F0EDE6] pt-4"
                    >
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
