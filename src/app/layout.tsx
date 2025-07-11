'use client';

import { CartProvider } from '@/contexts/CartContext';
import Header from '@/components/Header';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}