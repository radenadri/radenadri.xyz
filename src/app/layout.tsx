import type { Metadata } from 'next';
import { Layout } from '@/components/ds';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { PreloaderProvider } from '@/components/preloader-provider';
import { BackToTop } from '@/components/back-to-top';
import './globals.css';

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
    <Layout>
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
