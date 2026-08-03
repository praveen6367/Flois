'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ArrowRight, Lock, Mail } from 'lucide-react';
import { loginCustomerAction, registerCustomerAction } from '@/hooks/actions/customerActions';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      if (tab === 'login') {
        const res = await loginCustomerAction(formData);
        if (!res.success) {
          setErrorMsg(res.error || 'Login failed. Please verify credentials.');
        } else {
          onClose();
        }
      } else {
        const res = await registerCustomerAction(formData);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed.');
        } else {
          setTab('login');
          setErrorMsg('Account created successfully! Please sign in.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#121412]/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-white rounded-xl shadow-2xl p-8 border border-[#E8E6DF] overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#787E78] hover:text-[#121412] transition-colors focus:outline-none"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header Tabs */}
            <div className="flex border-b border-[#E8E6DF] mb-6">
              <button
                onClick={() => { setTab('login'); setErrorMsg(null); }}
                className={`pb-3 font-serif text-lg transition-colors border-b-2 mr-6 ${
                  tab === 'login' ? 'border-[#4B644C] text-[#121412]' : 'border-transparent text-[#787E78]'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setTab('register'); setErrorMsg(null); }}
                className={`pb-3 font-serif text-lg transition-colors border-b-2 ${
                  tab === 'register' ? 'border-[#4B644C] text-[#121412]' : 'border-transparent text-[#787E78]'
                }`}
              >
                Create Account
              </button>
            </div>

            {errorMsg && (
              <div className="mb-4 rounded bg-[#FEF2F2] border border-[#FCA5A5] p-3 text-xs text-[#991B1B]">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === 'register' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#121412] uppercase mb-1">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      className="w-full rounded bg-[#FAF9F5] border border-[#E8E6DF] px-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#121412] uppercase mb-1">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      className="w-full rounded bg-[#FAF9F5] border border-[#E8E6DF] px-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#121412] uppercase mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-[#787E78]" />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    className="w-full rounded bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#121412] uppercase mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-[#787E78]" />
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="••••••••"
                    className="w-full rounded bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded bg-[#4B644C] hover:bg-[#3D523E] text-white py-3 text-xs font-semibold uppercase tracking-widest transition-colors mt-6"
              >
                <span>{isSubmitting ? 'Processing...' : tab === 'login' ? 'Sign In' : 'Register Account'}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
