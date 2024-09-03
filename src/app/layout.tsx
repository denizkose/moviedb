import type { Metadata } from 'next';
import '@/globals.css';

import Header from '@/components/client/layout/Header';
import Footer from '@/components/client/layout/Footer';
import { colors } from './lib/colors';

export const metadata: Metadata = {
  title: 'Movie DB',
  description: 'Movie DB app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='uk'>
      <body className={'bg-black font-montserrat ' + colors.bg.gradient}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
