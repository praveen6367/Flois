'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-[700px] mx-auto text-center space-y-6 py-12 border-b border-[#304031]/60">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="space-y-3"
      >
        <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#C2CE94]">
          JOIN THE BOTANICAL COMMUNITY
        </span>

        <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#FAF9F5] font-normal leading-tight">
          Stay Connected With FLOIS
        </h3>

        <p className="text-sm sm:text-base font-sans text-[#EAE3D2]/80 leading-relaxed font-light max-w-md mx-auto">
          Receive new product launches, Ayurvedic hair insights, exclusive collections, and wellness inspiration.
        </p>
      </motion.div>

      {isSubscribed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 rounded-full bg-[#4B644C]/30 border border-[#C2CE94]/50 px-6 py-3 text-sm text-[#C2CE94] font-medium"
        >
          <CheckCircle2 className="h-5 w-5" />
          <span>Welcome to the FLOIS Community! Check your inbox soon.</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
          <div className="relative flex items-center">
            <Mail className="absolute left-4 h-5 w-5 text-[#EAE3D2]/60 pointer-events-none z-10" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              suppressHydrationWarning
              className="w-full rounded-full bg-white/5 border border-white/15 text-sm text-[#FAF9F5] placeholder-[#EAE3D2]/50 backdrop-blur-md focus:outline-none focus:border-[#C2CE94] transition-all shadow-inner pl-12 pr-32 py-4"
            />
            <button
              type="submit"
              disabled={isLoading}
              suppressHydrationWarning
              className="absolute right-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#4B644C] hover:bg-[#C2CE94] text-white hover:text-[#141C15] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-md focus:outline-none disabled:opacity-50"
            >
              <span>{isLoading ? 'Joining...' : 'JOIN'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
          <p className="text-[11px] font-sans text-[#EAE3D2]/50 italic">
            We only send meaningful updates. Never spam.
          </p>
        </form>
      )}
    </div>
  );
}
