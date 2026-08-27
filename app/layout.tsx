import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { LoadingScreen } from '@/components/LoadingScreen';
import { ScrollRevealProvider } from '@/components/ScrollRevealProvider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'Ralsha — Digital & AI Solutions',
  description:
    'Ralsha runs your media buying, builds your creative, and automates your funnels — every dollar tracked from click to close.',
  icons: {
    icon: '/favicon.svg',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <LoadingScreen />
        <ScrollRevealProvider>{children}</ScrollRevealProvider>
      </body>
    </html>
  );
}
