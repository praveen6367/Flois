'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ShieldCheck, HeartHandshake, Send, CheckCircle2, AlertCircle, Phone, Mail } from 'lucide-react';

const TRUST_HIGHLIGHTS = [
  { icon: Clock, text: 'Average response within 24 hours' },
  { icon: ShieldCheck, text: '100% Secure & Private Communication' },
  { icon: HeartHandshake, text: 'Friendly Support for Product & Order Assistance' },
];

export function ContactFormSection() {
  const cubicEase = [0.16, 1, 0.3, 1] as const;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Product Enquiry',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: 'Product Enquiry',
        message: '',
      });
    }, 1200);
  };

  return (
    <section className="relative w-full bg-[#FAF9F5] py-20 sm:py-28 border-b border-[#E8E6DF]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-16">
        
        {/* ── Trust Highlights Banner ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 pb-12 border-b border-[#E8E6DF] text-left">
          {TRUST_HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/60 border border-[#E8E6DF]"
              >
                <div className="h-10 w-10 rounded-full bg-[#EAF3EA] flex items-center justify-center text-[#2D5A2E] shrink-0">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs sm:text-sm font-sans font-medium text-[#121412]">
                  {item.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* ── Main Split Section: Left 45% Editorial / Right 55% Form Card ──── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <span className="text-xs font-sans font-semibold uppercase tracking-[0.25em] text-[#4B644C] block">
              PERSONAL BOTANICAL CONSULTATION
            </span>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.08] tracking-tight text-[#121412]">
              Happy to Hear<br />
              <em className="italic text-[#4B644C]">From You</em>
            </h2>

            <div className="space-y-4 text-base font-sans text-[#4A4E4A] font-light leading-relaxed">
              <p>
                Our formulation team in Greater Noida is dedicated to providing warm, transparent, and expert guidance for all your Ayurvedic wellness queries.
              </p>
              <p>
                Whether you need advice on selecting the right hair oil, understanding our 100% cold-pressed extractions, or tracking a recent order, we respond promptly.
              </p>
            </div>

            <div className="pt-4 border-t border-[#E8E6DF] space-y-2 text-xs font-sans text-[#787E78]">
              <p><strong>Business Hours:</strong> Monday – Saturday | 10:00 AM – 7:00 PM IST</p>
              <p><strong>Average Email Response Time:</strong> Within 2–4 hours during operational windows.</p>
            </div>
          </div>

          {/* Right Column: Floating Form Card (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-[20px] bg-white/90 backdrop-blur-xl border border-[#E8E6DF] p-6 sm:p-10 shadow-2xl space-y-6">
              
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center space-y-4 my-8"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#EAF3EA] border border-[#C5D1C5] flex items-center justify-center text-[#2D5A2E] mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="font-serif text-3xl text-[#121412]">Message Sent Successfully</h3>
                    <p className="text-sm font-sans text-[#4A4E4A] font-light max-w-md mx-auto leading-relaxed">
                      Thank you for contacting FLOIS. Our botanical support team has received your message and will respond within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-4 px-6 py-2.5 rounded-full bg-[#141C15] text-white text-xs font-sans uppercase tracking-widest font-semibold hover:bg-[#4B644C] transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* First Name & Last Name */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                          First Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="e.g. Ananya"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="e.g. Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors"
                      >
                        <option value="Product Enquiry">Product & Ingredient Enquiry</option>
                        <option value="Order Status">Order Status & Tracking</option>
                        <option value="Business & Wholesale">Business & Wholesale Partnership</option>
                        <option value="Other">Other Query</option>
                      </select>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-sans font-semibold text-[#121412] uppercase tracking-wider block">
                        Your Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us how we can help you on your wellness journey..."
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-sm text-[#121412] focus:outline-none focus:border-[#4B644C] focus:bg-white transition-colors resize-none"
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-2 text-xs text-[#991B1B] bg-[#FEF2F2] p-3 rounded-xl border border-[#FCA5A5]">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>Please complete all required fields (*).</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 rounded-xl bg-[#141C15] hover:bg-[#4B644C] text-white text-xs font-sans uppercase tracking-[0.2em] font-semibold transition-colors duration-300 shadow-xl flex items-center justify-center gap-2 disabled:opacity-70"
                    >
                      {status === 'submitting' ? (
                        <span>Sending Message...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>

                  </form>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* ── Reassurance Strip Below Form ──────────────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-[#E8E6DF] flex items-center justify-between flex-wrap gap-4 text-xs font-sans text-[#787E78]">
          <span>Need immediate assistance?</span>
          <div className="flex items-center gap-6">
            <a href="tel:+918076219724" className="inline-flex items-center gap-1.5 text-[#121412] font-medium hover:text-[#4B644C] transition-colors">
              <Phone className="h-3.5 w-3.5 text-[#4B644C]" />
              <span>+91 8076 219 724</span>
            </a>
            <a href="mailto:support@getflois.com" className="inline-flex items-center gap-1.5 text-[#121412] font-medium hover:text-[#4B644C] transition-colors">
              <Mail className="h-3.5 w-3.5 text-[#4B644C]" />
              <span>support@getflois.com</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
