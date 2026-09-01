import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import UtmCapture from '@/components/UtmCapture';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.ralsha.com/'),
  title: 'Ralsha — Digital & AI Solutions',
  description:
    'Ralsha runs your media buying, builds your creative, and automates your funnels — every dollar tracked from click to close.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Ralsha — Digital & AI Solutions',
    description:
      'Ralsha runs your media buying, builds your creative, and automates your funnels — every dollar tracked from click to close.',
    url: 'https://www.ralsha.com/',
    siteName: 'Ralsha',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ralsha — Digital & AI Solutions',
    description:
      'Ralsha runs your media buying, builds your creative, and automates your funnels — every dollar tracked from click to close.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.png',
    apple: '/assets/logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <UtmCapture />
        {children}
      </body>
    </html>
  );
}
