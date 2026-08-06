'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { Header } from '@/components/header/Header';
import { Footer } from '@/components/Footer/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, Package, MapPin, LogOut, Mail, Lock,
  ArrowRight, ShoppingBag, Leaf, ChevronRight, Clock, Truck, RotateCcw,
  Phone, Heart
} from 'lucide-react';
import Link from 'next/link';

/* ─── Stat Card ─────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType; label: string; value: string; color: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-2xl border border-[#E8E6DF] p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={`h-11 w-11 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-[#787E78]">{label}</p>
        <p className="font-serif text-xl text-[#0F1410] leading-tight mt-0.5">{value}</p>
      </div>
    </div>
  );
}

/* ─── Nav Item ──────────────────────────────────────────────── */
function NavItem({ icon: Icon, label, badge, active, onClick }: {
  icon: React.ElementType; label: string; badge?: string;
  active: boolean; onClick: () => void;
}) {
  return (
    <button
      suppressHydrationWarning
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all duration-200 ${
        active
          ? 'bg-[#141C15] text-white shadow-md'
          : 'text-[#525852] hover:bg-[#F2F4E6] hover:text-[#141C15]'
      }`}
    >
      <Icon className="h-4 w-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
          active ? 'bg-white/20 text-white' : 'bg-[#4B644C]/10 text-[#4B644C]'
        }`}>
          {badge}
        </span>
      )}
    </button>
  );
}

/* ─── Empty State ───────────────────────────────────────────── */
function EmptyState({ icon: Icon, title, desc, cta, href }: {
  icon: React.ElementType; title: string; desc: string; cta?: string; href?: string;
}) {
  return (
    <div className="text-center py-16 flex flex-col items-center gap-4">
      <div className="h-16 w-16 rounded-2xl bg-[#F2F4E6] flex items-center justify-center">
        <Icon className="h-8 w-8 text-[#4B644C]" />
      </div>
      <div>
        <p className="font-serif text-lg text-[#0F1410]">{title}</p>
        <p className="text-xs text-[#787E78] mt-1 max-w-xs">{desc}</p>
      </div>
      {cta && href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#141C15] text-white text-xs font-semibold hover:bg-[#2C3B2E] transition-colors"
        >
          {cta} <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function AccountPage() {
  const { customer, accessToken, isLoading, login, register, logout } = useAuth();
  const { wishlist, openWishlist } = useWishlist();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'addresses' | 'wishlist'>('overview');
  const [formMode, setFormMode] = useState<'login' | 'register'>('login');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isLoggedIn = Boolean(accessToken && customer);

  // Auto-redirect to dashboard view when already logged in
  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      setActiveTab('overview');
    }
  }, [isLoading, isLoggedIn]);

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = formMode === 'login'
        ? await login(formData)
        : await register(formData);
      if (res.success) {
        router.replace('/account');
      } else {
        setErrorMsg(res.error || 'Something went wrong.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const orders = customer?.orders?.nodes || customer?.orders?.edges?.map((e: any) => e.node) || [];
  const addresses = customer?.addresses?.nodes || customer?.addresses?.edges?.map((e: any) => e.node) || [];
  const initials = [customer?.firstName?.[0], customer?.lastName?.[0]].filter(Boolean).join('').toUpperCase() || customer?.email?.[0]?.toUpperCase() || 'U';

  /* ── Loading ── */
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F5]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="h-12 w-12 border-4 border-[#4B644C] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="font-serif text-lg text-[#0F1410]">Loading your account…</p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Login / Register ── */
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF9F5]">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            <div className="bg-white rounded-3xl border border-[#E8E6DF] shadow-2xl shadow-black/5 overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-[#4B644C] via-[#8C9B3E] to-[#4B644C]" />

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className="h-16 w-16 bg-[#141C15] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Leaf className="h-8 w-8 text-[#8C9B3E]" />
                  </div>
                  <h1 className="font-serif text-2xl font-normal text-[#0F1410]">FLOIS Customer Account</h1>
                  <p className="text-xs text-[#787E78] mt-1.5">Sign in or create an account to view your orders</p>
                </div>

                <div className="flex bg-[#FAF9F5] rounded-xl p-1 mb-7">
                  {(['login', 'register'] as const).map((mode) => (
                    <button
                      key={mode}
                      suppressHydrationWarning
                      onClick={() => { setFormMode(mode); setErrorMsg(null); }}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                        formMode === mode
                          ? 'bg-white shadow text-[#0F1410]'
                          : 'text-[#787E78] hover:text-[#0F1410]'
                      }`}
                    >
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                    </button>
                  ))}
                </div>

                {errorMsg && (
                  <div className="mb-5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {formMode === 'register' && (
                    <div className="grid grid-cols-2 gap-3">
                      {['firstName', 'lastName'].map((name) => (
                        <div key={name}>
                          <label className="block text-[10px] font-semibold text-[#0F1410] uppercase tracking-wider mb-1.5">
                            {name === 'firstName' ? 'First Name' : 'Last Name'}
                          </label>
                          <input
                            name={name}
                            type="text"
                            required
                            placeholder={name === 'firstName' ? 'First Name' : 'Last Name'}
                            className="w-full rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] px-3 py-2.5 text-xs text-[#0F1410] focus:border-[#4B644C] focus:ring-2 focus:ring-[#4B644C]/10 focus:outline-none transition"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] font-semibold text-[#0F1410] uppercase tracking-wider mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9A9E9A]" />
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="name@example.com"
                        className="w-full rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-4 py-2.5 text-xs text-[#0F1410] focus:border-[#4B644C] focus:ring-2 focus:ring-[#4B644C]/10 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold text-[#0F1410] uppercase tracking-wider mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9A9E9A]" />
                      <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full rounded-xl bg-[#FAF9F5] border border-[#E8E6DF] pl-10 pr-4 py-2.5 text-xs text-[#0F1410] focus:border-[#4B644C] focus:ring-2 focus:ring-[#4B644C]/10 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#141C15] hover:bg-[#2C3B2E] text-white py-3.5 text-xs font-bold uppercase tracking-widest transition-all duration-200 mt-2 shadow-md hover:shadow-lg disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <><div className="h-3.5 w-3.5 border-2 border-white/40 border-t-white rounded-full animate-spin" /><span>Processing…</span></>
                    ) : (
                      <><span>{formMode === 'login' ? 'Sign In' : 'Create Account'}</span><ArrowRight className="h-4 w-4" /></>
                    )}
                  </button>
                </form>

              </div>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F7F3] text-[#0F1410]">
      <Header />

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-14 py-10 sm:py-14">

        {/* ── Hero Welcome Banner ── */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-3xl overflow-hidden mb-8 bg-[#141C15] text-white"
        >
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #8C9B3E 0%, transparent 60%), radial-gradient(circle at 80% 20%, #4B644C 0%, transparent 50%)' }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-7 sm:p-10">
            <div className="flex items-center gap-5">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl bg-gradient-to-br from-[#4B644C] to-[#8C9B3E] flex items-center justify-center font-serif text-2xl sm:text-3xl text-white shadow-lg flex-shrink-0">
                {initials}
              </div>
              <div>
                <h1 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                  Welcome, {customer?.firstName || 'Customer'}
                </h1>
                <p className="text-sm text-white/60 mt-1 font-sans">{customer?.email}</p>
              </div>
            </div>

            <button
              suppressHydrationWarning
              onClick={logout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 border border-white/20 hover:bg-red-500/20 hover:border-red-500/40 text-white text-xs font-semibold transition-all duration-200 flex-shrink-0"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* ── Real Stats Row (2 Cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <StatCard icon={Package} label="Total Orders" value={String(orders.length)} color="bg-[#F2F4E6] text-[#4B644C]" />
          <StatCard icon={MapPin} label="Saved Addresses" value={String(addresses.length || (customer?.defaultAddress ? 1 : 0))} color="bg-[#EEF2FF] text-indigo-600" />
        </div>

        {/* ── Layout: Sidebar + Content ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-[#E8E6DF] p-3 shadow-sm space-y-1">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9E9A] px-4 py-2">Account Menu</p>
              <NavItem icon={User} label="Profile" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
              <NavItem icon={Package} label="Orders" badge={String(orders.length)} active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} />
              <NavItem icon={MapPin} label="Addresses" active={activeTab === 'addresses'} onClick={() => setActiveTab('addresses')} />
              <NavItem icon={Heart} label="Wishlist" badge={wishlist.length ? String(wishlist.length) : undefined} active={activeTab === 'wishlist'} onClick={() => setActiveTab('wishlist')} />
            </div>

            <div className="bg-white rounded-2xl border border-[#E8E6DF] p-4 shadow-sm space-y-2">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9A9E9A] px-1 mb-3">Quick Links</p>
              {[
                { label: 'Shop All Products', href: '/shop', icon: ShoppingBag },
                { label: 'Track My Order', href: '/account', icon: Truck },
                { label: 'Returns & Exchanges', href: '/contact', icon: RotateCcw },
                { label: 'Contact Support', href: '/contact', icon: Phone },
              ].map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs text-[#525852] hover:bg-[#F2F4E6] hover:text-[#141C15] transition-colors group"
                >
                  <Icon className="h-3.5 w-3.5 text-[#4B644C]" />
                  <span className="flex-1">{label}</span>
                  <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </div>

          {/* ── Main Content Panel ── */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">

              {/* PROFILE TAB */}
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }} className="space-y-5">

                  {/* Account Info */}
                  <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between px-7 py-5 border-b border-[#E8E6DF]">
                      <h2 className="font-serif text-xl text-[#0F1410]">Account Details</h2>
                    </div>
                    <div className="p-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'First Name', value: customer?.firstName, icon: User },
                        { label: 'Last Name', value: customer?.lastName, icon: User },
                        { label: 'Email Address', value: customer?.email, icon: Mail },
                        { label: 'Phone Number', value: customer?.phone, icon: Phone },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="bg-[#FAF9F5] rounded-xl border border-[#E8E6DF] p-4">
                          <div className="flex items-center gap-2 mb-1.5">
                            <Icon className="h-3.5 w-3.5 text-[#4B644C]" />
                            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A9E9A]">{label}</span>
                          </div>
                          <p className="text-sm font-medium text-[#0F1410]">{value || <span className="text-[#BDBDBD] italic">Not provided</span>}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                  <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#E8E6DF] flex items-center justify-between">
                      <h2 className="font-serif text-xl text-[#0F1410]">Order History</h2>
                      <span className="text-xs text-[#787E78]">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="p-7">
                      {orders.length === 0 ? (
                        <EmptyState
                          icon={ShoppingBag}
                          title="No orders placed yet"
                          desc="Your Shopify orders will automatically appear here once you place an order."
                          cta="Explore Shop"
                          href="/shop"
                        />
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order: any, i: number) => (
                            <motion.div
                              key={order.id}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="rounded-2xl border border-[#E8E6DF] bg-[#FAF9F5] overflow-hidden"
                            >
                              <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 border-b border-[#E8E6DF] bg-white">
                                <div>
                                  <p className="font-serif text-base text-[#0F1410]">Order #{order.orderNumber}</p>
                                  <p className="text-[11px] text-[#787E78] flex items-center gap-1 mt-0.5">
                                    <Clock className="h-3 w-3" />
                                    {new Date(order.processedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="px-3 py-1 rounded-full bg-[#EAEFEA] text-[#2C402E] text-[10px] font-bold uppercase tracking-wider">
                                    {order.fulfillmentStatus || 'Processing'}
                                  </span>
                                </div>
                              </div>
                              <div className="px-5 py-4 space-y-2.5">
                                {order.lineItems?.nodes?.map((item: any, idx: number) => (
                                  <div key={idx} className="flex items-center justify-between text-xs">
                                    <span className="font-medium text-[#0F1410]">
                                      {item.title}
                                      {item.variantTitle ? <span className="text-[#787E78] font-normal"> · {item.variantTitle}</span> : ''}
                                      <span className="text-[#787E78] font-normal"> × {item.quantity}</span>
                                    </span>
                                    <span className="text-[#525852] font-semibold">
                                      {item.originalTotalPrice?.currencyCode || 'INR'} {item.originalTotalPrice?.amount}
                                    </span>
                                  </div>
                                ))}
                                <div className="flex justify-between pt-3 border-t border-[#E8E6DF] text-xs font-bold">
                                  <span>Total Paid</span>
                                  <span className="text-[#4B644C] text-sm">
                                    {order.currentTotalPrice?.currencyCode || 'INR'} {order.currentTotalPrice?.amount}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ADDRESSES TAB */}
              {activeTab === 'addresses' && (
                <motion.div key="addresses" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                  <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#E8E6DF]">
                      <h2 className="font-serif text-xl text-[#0F1410]">Saved Addresses</h2>
                    </div>
                    <div className="p-7">
                      {!customer?.defaultAddress && addresses.length === 0 ? (
                        <EmptyState
                          icon={MapPin}
                          title="No addresses saved"
                          desc="Your saved delivery addresses from Shopify checkout will appear here."
                        />
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {customer?.defaultAddress && (
                            <div className="rounded-2xl border border-[#4B644C]/40 bg-[#F2F4E6] p-5 space-y-2 relative">
                              <span className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#4B644C] text-white">
                                Default
                              </span>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#4B644C]" />
                                <p className="font-semibold text-sm text-[#0F1410]">
                                  {customer.defaultAddress.firstName} {customer.defaultAddress.lastName}
                                </p>
                              </div>
                              <p className="text-xs text-[#525852] leading-relaxed">
                                {customer.defaultAddress.address1}
                                {customer.defaultAddress.address2 && <><br />{customer.defaultAddress.address2}</>}
                                <br />
                                {customer.defaultAddress.city}{customer.defaultAddress.province ? `, ${customer.defaultAddress.province}` : ''} {customer.defaultAddress.zip}
                                <br />
                                {customer.defaultAddress.country}
                              </p>
                            </div>
                          )}
                          {addresses.filter((a: any) => a.id !== customer?.defaultAddress?.id).map((addr: any, i: number) => (
                            <div key={i} className="rounded-2xl border border-[#E8E6DF] bg-[#FAF9F5] p-5 space-y-2">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-[#9A9E9A]" />
                                <p className="font-semibold text-sm text-[#0F1410]">{addr.firstName} {addr.lastName}</p>
                              </div>
                              <p className="text-xs text-[#525852] leading-relaxed">
                                {addr.address1}{addr.address2 && <><br />{addr.address2}</>}
                                <br />{addr.city}{addr.province ? `, ${addr.province}` : ''} {addr.zip}
                                <br />{addr.country}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* WISHLIST TAB */}
              {activeTab === 'wishlist' && (
                <motion.div key="wishlist" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.25 }}>
                  <div className="bg-white rounded-2xl border border-[#E8E6DF] shadow-sm overflow-hidden">
                    <div className="px-7 py-5 border-b border-[#E8E6DF] flex items-center justify-between">
                      <h2 className="font-serif text-xl text-[#0F1410]">My Wishlist</h2>
                      {wishlist.length > 0 && (
                        <button
                          suppressHydrationWarning
                          onClick={openWishlist}
                          className="px-4 py-2 rounded-xl bg-[#141C15] text-white text-xs font-semibold hover:bg-[#2C3B2E] transition-colors"
                        >
                          Open Wishlist Panel ({wishlist.length})
                        </button>
                      )}
                    </div>
                    <div className="p-7">
                      {wishlist.length === 0 ? (
                        <EmptyState
                          icon={Heart}
                          title="No saved items yet"
                          desc="Browse our collection and tap the heart icon on any product to save it to your wishlist."
                          cta="Browse Shop"
                          href="/shop"
                        />
                      ) : (
                        <div className="text-center py-10 space-y-4">
                          <div className="h-16 w-16 rounded-2xl bg-[#F2F4E6] flex items-center justify-center text-[#4B644C] mx-auto">
                            <Heart className="h-8 w-8 fill-[#4B644C]" />
                          </div>
                          <div>
                            <p className="font-serif text-lg text-[#0F1410]">
                              You have {wishlist.length} item{wishlist.length !== 1 ? 's' : ''} in your wishlist
                            </p>
                            <p className="text-xs text-[#787E78] mt-1 max-w-sm mx-auto">
                              Open your wishlist panel to view saved items or quickly move them to your bag.
                            </p>
                          </div>
                          <button
                            suppressHydrationWarning
                            onClick={openWishlist}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#141C15] text-white text-xs font-semibold hover:bg-[#2C3B2E] transition-colors"
                          >
                            <span>View Saved Products</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
