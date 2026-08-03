import React from 'react';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

export function EmptyJournalState() {
  return (
    <section className="w-full bg-[#FAFAF8] py-32">
      <div className="max-w-lg mx-auto px-6 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-[#4B644C]/10 mb-8 mx-auto">
          <BookOpen className="h-7 w-7 text-[#4B644C]" />
        </div>
        <h2
          className="font-serif text-3xl text-[#121412] mb-4"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          The Journal is Coming Soon
        </h2>
        <p className="text-sm font-sans text-[#787E78] font-light leading-relaxed mb-8">
          We're crafting thoughtful stories about Ayurvedic science, botanical ingredients, and modern wellness rituals. Check back soon.
        </p>
        <Link
          href="/collections/all"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#141C15] text-white text-xs font-sans uppercase tracking-[0.2em] font-semibold hover:bg-[#4B644C] transition-colors duration-300"
        >
          Explore Our Products
        </Link>
      </div>
    </section>
  );
}
