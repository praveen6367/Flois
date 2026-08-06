import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';

import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'FLOIS | Luxury Ayurvedic Personal Care & Wellness',
  description: 'Clinically tested botanical hair and skin care formulations.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="bg-[#FFFFFF] text-[#121412] antialiased">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
              <WishlistDrawer />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
