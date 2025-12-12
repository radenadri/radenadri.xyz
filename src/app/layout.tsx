import type { Metadata } from 'next';
import { Space_Mono, Syncopate } from 'next/font/google';
import { Layout } from '@/components/ds';
import { ThemeProvider } from '@/components/theme-provider';
import { PreloaderProvider } from '@/components/preloader-provider';
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
  title: 'Adriana Eka Prayudha - Web Developer',
  description:
    'Web Developer specializing in React, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
  keywords: [
    'Web Developer',
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Adriana Eka Prayudha' }],
  creator: 'Adriana Eka Prayudha',
  openGraph: {
    title: 'Adriana Eka Prayudha - Web Developer',
    description:
      'Web Developer specializing in React, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adriana Eka Prayudha - Web Developer',
    description:
      'Web Developer specializing in React, and modern web technologies.',
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
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <PreloaderProvider>
            {children}
            <div className="fixed bottom-6 right-6 availability-pill font-data text-[0.55rem] tracking-[0.25em] sm:text-[0.65rem] sm:tracking-[0.4em] uppercase text-[var(--space-star-white)] whitespace-nowrap overflow-hidden">
              <span className="availability-beacon" aria-hidden="true" />
              <span>available for work</span>
            </div>
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </Layout>
  );
}
