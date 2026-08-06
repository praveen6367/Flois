'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, ArrowRight, Lock, Mail, Package, MapPin, LogOut, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AccountModal({ isOpen, onClose }: AccountModalProps) {
  const { customer, accessToken, isLoading, login, register, logout } = useAuth();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [activeView, setActiveView] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    try {
      if (tab === 'login') {
        const res = await login(formData);
        if (!res.success) {
          setErrorMsg(res.error || 'Login failed. Please verify credentials.');
        }
      } else {
        const res = await register(formData);
        if (!res.success) {
          setErrorMsg(res.error || 'Registration failed.');
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLoggedIn = Boolean(accessToken && customer);

  const orders = customer?.orders?.nodes || customer?.orders?.edges?.map((e: any) => e.node) || [];
  const addresses = customer?.addresses?.nodes || customer?.addresses?.edges?.map((e: any) => e.node) || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#121412]/50 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border border-[#E8E6DF] overflow-hidden max-h-[90vh] flex flex-col"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-[#787E78] hover:text-[#121412] transition-colors focus:outline-none rounded-full hover:bg-[#FAF9F5]"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {isLoggedIn && customer ? (
              /* LOGGED IN ACCOUNT DASHBOARD MODAL VIEW */
              <div className="flex flex-col h-full overflow-y-auto pr-1">
                {/* Header Banner */}
                <div className="flex items-center gap-4 pb-6 border-b border-[#E8E6DF] mb-6">
                  <div className="h-14 w-14 rounded-full bg-[#141C15] text-[#FAF9F5] flex items-center justify-center font-serif text-xl font-medium shadow-md">
                    {(customer.firstName?.[0] || customer.email?.[0] || 'U').toUpperCase()}
                  </div>
                    <div>
                      <h3 className="font-serif text-xl text-[#121412] font-medium">
                        {customer.firstName ? `${customer.firstName} ${customer.lastName || ''}`.trim() : 'Customer'}
                      </h3>
                      <p className="text-xs text-[#525852] mt-0.5">{customer.email}</p>
                    </div>
                </div>

                {/* Sub Navigation */}
                <div className="flex border-b border-[#E8E6DF] mb-6 gap-6">
                  <button
                    onClick={() => setActiveView('profile')}
                    className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeView === 'profile'
                        ? 'border-[#4B644C] text-[#121412]'
                        : 'border-transparent text-[#787E78] hover:text-[#121412]'
                    }`}
                  >
                    Profile Overview
                  </button>
                  <button
                    onClick={() => setActiveView('orders')}
                    className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeView === 'orders'
                        ? 'border-[#4B644C] text-[#121412]'
                        : 'border-transparent text-[#787E78] hover:text-[#121412]'
                    }`}
                  >
                    Orders ({orders.length})
                  </button>
                  <button
                    onClick={() => setActiveView('addresses')}
                    className={`pb-2.5 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 ${
                      activeView === 'addresses'
                        ? 'border-[#4B644C] text-[#121412]'
                        : 'border-transparent text-[#787E78] hover:text-[#121412]'
                    }`}
                  >
                    Addresses ({addresses.length})
                  </button>
                </div>

                {/* Tab Contents */}
                <div className="flex-1 space-y-4">
                  {activeView === 'profile' && (
                    <div className="space-y-4">
                      <div className="bg-[#FAF9F5] p-4 rounded-xl border border-[#E8E6DF] space-y-3 text-xs">
                        <div className="flex justify-between border-b border-[#E8E6DF]/60 pb-2">
                          <span className="text-[#787E78] uppercase font-semibold text-[10px] tracking-wider">Full Name</span>
                          <span className="font-medium text-[#121412]">
                            {customer.firstName || customer.lastName
                              ? `${customer.firstName || ''} ${customer.lastName || ''}`.trim()
                              : 'Not specified'}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-[#E8E6DF]/60 pb-2">
                          <span className="text-[#787E78] uppercase font-semibold text-[10px] tracking-wider">Email Address</span>
                          <span className="font-medium text-[#121412]">{customer.email}</span>
                        </div>
                        <div className="flex justify-between border-b border-[#E8E6DF]/60 pb-2">
                          <span className="text-[#787E78] uppercase font-semibold text-[10px] tracking-wider">Phone</span>
                          <span className="font-medium text-[#121412]">{customer.phone || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#787E78] uppercase font-semibold text-[10px] tracking-wider">Default Address</span>
                          <span className="font-medium text-[#121412] text-right">
                            {customer.defaultAddress?.formatted
                              ? customer.defaultAddress.formatted.join(', ')
                              : 'No address saved'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeView === 'orders' && (
                    <div className="space-y-3">
                      {orders.length === 0 ? (
                        <div className="text-center py-8 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF]">
                          <Package className="h-8 w-8 text-[#9DAF9E] mx-auto mb-2" />
                          <p className="text-xs font-medium text-[#121412]">No order history found</p>
                          <p className="text-[11px] text-[#787E78] mt-0.5">Your recent purchases will appear here.</p>
                        </div>
                      ) : (
                        orders.map((order: any) => (
                          <div key={order.id} className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#121412]">Order #{order.orderNumber}</span>
                              <span className="px-2 py-0.5 rounded-full bg-[#EAEFEA] text-[#2C402E] text-[10px] font-semibold uppercase">
                                {order.fulfillmentStatus || 'Processing'}
                              </span>
                            </div>
                            <p className="text-[11px] text-[#787E78]">
                              Date: {new Date(order.processedAt).toLocaleDateString()}
                            </p>
                            <div className="flex justify-between items-center pt-2 border-t border-[#E8E6DF]/60 font-semibold">
                              <span>Total Amount:</span>
                              <span className="text-[#2C402E]">
                                {order.currentTotalPrice?.currencyCode} {order.currentTotalPrice?.amount}
                              </span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}

                  {activeView === 'addresses' && (
                    <div className="space-y-3">
                      {addresses.length === 0 && !customer.defaultAddress ? (
                        <div className="text-center py-8 bg-[#FAF9F5] rounded-xl border border-[#E8E6DF]">
                          <MapPin className="h-8 w-8 text-[#9DAF9E] mx-auto mb-2" />
                          <p className="text-xs font-medium text-[#121412]">No addresses saved</p>
                        </div>
                      ) : (
                        <div className="p-4 rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] text-xs space-y-1">
                          <span className="text-[10px] font-semibold text-[#3A523C] uppercase tracking-wider block mb-1">
                            Primary Address
                          </span>
                          <p className="font-medium text-[#121412]">
                            {customer.defaultAddress?.firstName} {customer.defaultAddress?.lastName}
                          </p>
                          <p className="text-[#525852]">{customer.defaultAddress?.address1}</p>
                          {customer.defaultAddress?.address2 && <p className="text-[#525852]">{customer.defaultAddress.address2}</p>}
                          <p className="text-[#525852]">
                            {customer.defaultAddress?.city}, {customer.defaultAddress?.province} {customer.defaultAddress?.zip}
                          </p>
                          <p className="text-[#525852]">{customer.defaultAddress?.country}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="pt-6 border-t border-[#E8E6DF] mt-6 flex items-center justify-between gap-3">
                  <Link
                    href="/account"
                    onClick={onClose}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#3A523C] hover:text-[#121412] transition-colors"
                  >
                    <span>Go to Full Account Page</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>

                  <button
                    onClick={logout}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#991B1B] text-xs font-semibold transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              /* LOGGED OUT SIGN IN / REGISTER FORM */
              <div>
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
                  <div className="mb-4 rounded-lg bg-[#FEF2F2] border border-[#FCA5A5] p-3 text-xs text-[#991B1B]">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {tab === 'register' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#121412] uppercase mb-1">First Name</label>
                        <input
                          name="firstName"
                          type="text"
                          required
                          placeholder="Jane"
                          className="w-full rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] px-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-semibold text-[#121412] uppercase mb-1">Last Name</label>
                        <input
                          name="lastName"
                          type="text"
                          required
                          placeholder="Doe"
                          className="w-full rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] px-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-[#121412] uppercase mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-[#787E78]" />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#121412] uppercase mb-1">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-[#787E78]" />
                      <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full rounded-lg bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-3 py-2.5 text-xs text-[#121412] focus:border-[#4B644C] focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || isLoading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#141C15] hover:bg-[#2C3B2E] text-white py-3 text-xs font-semibold uppercase tracking-widest transition-colors mt-6 shadow-md"
                  >
                    <span>
                      {isSubmitting || isLoading
                        ? 'Processing...'
                        : tab === 'login'
                        ? 'Sign In'
                        : 'Register & Sign In'}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
