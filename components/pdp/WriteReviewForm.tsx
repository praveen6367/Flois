'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, CheckCircle2, X, PenTool, Loader2, ShieldCheck } from 'lucide-react';
import { CustomerPhotoReview } from '@/components/testimonials/CustomerPhotoReviewCard';

interface WriteReviewFormProps {
  productName: string;
  productHandle: string;
  onReviewSubmitted?: (newReview: CustomerPhotoReview) => void;
}

export function WriteReviewForm({ productName, productHandle, onReviewSubmitted }: WriteReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ratingLabels: Record<number, string> = {
    5: '5.0 — Excellent (Highly Recommended)',
    4: '4.0 — Very Good (Satisfied)',
    3: '3.0 — Average',
    2: '2.0 — Below Expectations',
    1: '1.0 — Poor'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!author.trim() || !bodyText.trim()) {
      setErrorMessage('Please fill in your name and review details.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: author.trim(),
          email: email.trim(),
          location: location.trim() || 'Verified Customer',
          rating,
          body: bodyText.trim(),
          productName,
          productHandle
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.review) {
        setIsSuccess(true);
        if (onReviewSubmitted) {
          onReviewSubmitted(data.review);
        }
        // Reset form after short delay
        setTimeout(() => {
          setAuthor('');
          setEmail('');
          setLocation('');
          setBodyText('');
          setIsSuccess(false);
          setIsOpen(false);
        }, 2200);
      } else {
        setErrorMessage(data.error || 'Failed to submit review. Please try again.');
      }
    } catch (err) {
      console.error('[WriteReviewForm] Submit error:', err);
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full my-6">
      
      {/* Trigger Button to Open Review Form */}
      {!isOpen && (
        <div className="flex justify-center">
          <button
            suppressHydrationWarning
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#8C9B3E] text-white font-sans font-bold text-sm hover:bg-[#7A8834] shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <PenTool className="h-4 w-4" />
            <span>Write A Product Review</span>
          </button>
        </div>
      )}

      {/* Expandable Review Form Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-[28px] bg-[#FAF9F6] border border-[#E8E6DF] shadow-xl relative mt-4">
              
              {/* Header & Close Button */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E6DF] mb-6">
                <div>
                  <span className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#8C9B3E] bg-[#F2F4E6] px-3 py-1 rounded-full border border-[#E0E4B3]">
                    {productName}
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#111111] mt-2">
                    Share Your Experience
                  </h3>
                </div>
                <button
                  suppressHydrationWarning
                  onClick={() => setIsOpen(false)}
                  className="h-9 w-9 rounded-full bg-white border border-[#E8E6DF] flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Success Notification */}
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-10 text-center space-y-3"
                >
                  <div className="h-14 w-14 rounded-full bg-[#8C9B3E]/15 text-[#8C9B3E] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="font-serif text-2xl font-normal text-[#111111]">
                    Thank You For Your Review!
                  </h4>
                  <p className="font-sans text-sm text-[#555555]">
                    Your review has been verified and added to {productName}.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-left">
                  
                  {/* Rating Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] font-sans">
                      Overall Rating <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star
                              className={`h-7 w-7 transition-colors ${
                                star <= (hoverRating || rating)
                                  ? 'fill-[#FBBF24] text-[#FBBF24]'
                                  : 'fill-transparent text-[#D1D5DB]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <span className="text-xs font-sans text-[#777777] ml-2">
                        {ratingLabels[hoverRating || rating]}
                      </span>
                    </div>
                  </div>

                  {/* Name & Location Input Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] font-sans">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="e.g. Ankita Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E6DF] text-sm text-[#111111] focus:outline-none focus:border-[#8C9B3E] focus:ring-1 focus:ring-[#8C9B3E] transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] font-sans">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Mumbai, Delhi, Bengaluru"
                        className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E6DF] text-sm text-[#111111] focus:outline-none focus:border-[#8C9B3E] focus:ring-1 focus:ring-[#8C9B3E] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] font-sans">
                      Email Address <span className="text-xs text-[#777777] font-normal">(Private)</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ankita@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E6DF] text-sm text-[#111111] focus:outline-none focus:border-[#8C9B3E] focus:ring-1 focus:ring-[#8C9B3E] transition-all"
                    />
                  </div>

                  {/* Review Body Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#333333] font-sans">
                      Your Review <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={bodyText}
                      onChange={(e) => setBodyText(e.target.value)}
                      placeholder="Describe your honest experience using this product..."
                      className="w-full px-4 py-3 rounded-xl bg-white border border-[#E8E6DF] text-sm text-[#111111] focus:outline-none focus:border-[#8C9B3E] focus:ring-1 focus:ring-[#8C9B3E] transition-all resize-none"
                    />
                  </div>

                  {/* Error Message Alert */}
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-sans">
                      {errorMessage}
                    </div>
                  )}

                  {/* Footer Action Buttons */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="inline-flex items-center gap-1.5 text-xs text-[#2D5A2E] font-sans font-semibold">
                      <ShieldCheck className="h-4 w-4 text-[#8C9B3E]" />
                      <span>Verified Buyer Submission</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#8C9B3E] text-white font-sans font-bold text-sm hover:bg-[#7A8834] transition-colors shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <span>Submit Review</span>
                      )}
                    </button>
                  </div>

                </form>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
