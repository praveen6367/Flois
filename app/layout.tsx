import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { WishlistDrawer } from '@/components/wishlist/WishlistDrawer';

import { AuthProvider } from '@/context/AuthContext';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

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
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
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
