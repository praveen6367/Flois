'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf } from 'lucide-react';

export function JournalNewsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <section className="w-full bg-[#121412] py-20 sm:py-28 relative overflow-hidden border-t border-[#1E241E]">
      {/* Soft botanical gradient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,_#4B644C25_0%,_transparent_70%)]" />
      </div>

      <div className="max-w-2xl mx-auto px-6 sm:px-12 text-center relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-[#4B644C]/20 mb-7 mx-auto">
          <Leaf className="h-5 w-5 text-[#4B644C]" />
        </div>

        {/* Heading */}
        <h2
          className="font-serif text-4xl sm:text-5xl font-normal text-white leading-tight mb-4"
          style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
        >
          Stay Connected with FLOIS
        </h2>

        {/* Subline */}
        <p className="text-sm font-sans font-light text-[#9A9E9A] leading-relaxed mb-10 max-w-md mx-auto">
          Receive seasonal botanical insights, ingredient deep dives, and exclusive wellness rituals — delivered with care.
        </p>

        {/* Form */}
        {!submitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto"
          >
            <input
              suppressHydrationWarning
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 w-full px-5 py-3.5 rounded-full bg-[#1A201A] border border-[#2A342A] text-sm font-sans text-white placeholder:text-[#4A4E4A] focus:outline-none focus:border-[#4B644C] transition-colors"
            />
            <button
              suppressHydrationWarning
              type="submit"
              className="px-7 py-3.5 rounded-full bg-[#4B644C] text-white text-xs font-sans font-semibold uppercase tracking-[0.2em] hover:bg-[#3A5040] transition-colors duration-300 whitespace-nowrap shadow-lg"
            >
              Subscribe
            </button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-5 px-8 rounded-2xl bg-[#4B644C]/20 border border-[#4B644C]/40 inline-block"
          >
            <p className="text-sm font-sans text-[#A8C4A8]">
              Thank you — you're now part of the FLOIS Journal.
            </p>
          </motion.div>
        )}

        <p className="text-[11px] font-sans text-[#4A4E4A] mt-5">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
