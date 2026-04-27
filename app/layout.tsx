import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils/cn';

// Configure Inter font (sans-serif)
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

// Configure Playfair Display font (serif/display)
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JAVUSSEO - Premium SEO Agency | Boost Your Rankings & Traffic',
  description: 'Strategy-driven SEO agency helping businesses achieve higher rankings and increased organic traffic with proven tactics and transparent reporting.',
  keywords: 'SEO agency, digital marketing, SEO services, keyword research, content marketing',
  authors: [{ name: 'JAVUSSEO' }],
  openGraph: {
    title: 'JAVUSSEO - Premium SEO Agency',
    description: 'Boost your website rankings with our powerful SEO strategies',
    url: 'https://seo-agency.com',
    siteName: 'JAVUSSEO',
    images: [
      {
        url: 'https://seo-agency.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'JAVUSSEO SEO Agency',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JAVUSSEO - Premium SEO Agency',
    description: 'Boost your website rankings with our powerful SEO strategies',
    images: ['https://seo-agency.com/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={cn('font-sans antialiased', inter.className)}>
        <Header />
        <main>{children}</main>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
