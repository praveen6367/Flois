import type { Metadata } from 'next';
import '@/styles/globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';

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
        <CartProvider>
          <WishlistProvider>
            {children}
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
