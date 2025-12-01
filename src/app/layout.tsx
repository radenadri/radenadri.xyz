import type { Metadata } from 'next';
import { Space_Mono, Syncopate } from 'next/font/google';
import { Layout } from '@/components/ds';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { PreloaderProvider } from '@/components/preloader-provider';
import { BackToTop } from '@/components/back-to-top';
import './globals.css';

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

export const metadata: Metadata = {
  title: 'Adriana Eka Prayudha - Frontend Developer',
  description:
    'Frontend Developer specializing in React, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
  keywords: [
    'Frontend Developer',
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Adriana Eka Prayudha' }],
  creator: 'Adriana Eka Prayudha',
  openGraph: {
    title: 'Adriana Eka Prayudha - Frontend Developer',
    description:
      'Frontend Developer specializing in React, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adriana Eka Prayudha - Frontend Developer',
    description:
      'Frontend Developer specializing in React, and modern web technologies.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Layout className={`${spaceMono.variable} ${syncopate.variable}`}>
      <body className="antialiased">
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <PreloaderProvider>
            <SmoothScrollProvider>
              {children}
              <BackToTop className="fixed bottom-6 right-6 z-50 shadow-[0_0_30px_rgba(255,42,0,0.25)]" />
            </SmoothScrollProvider>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </Layout>
  );
}
