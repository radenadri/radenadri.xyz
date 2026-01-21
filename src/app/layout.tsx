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
  title: 'Adriana Eka Prayudha - Fullstack Engineer',
  description:
    'Fullstack Engineer specializing in modern web and mobile technologies. Building usable, beautiful apps with clean code & minimal design.',
  keywords: [
    'Fullstack Engineer',
    'Web Developer',
    'Mobile Developer',
    'PHP',
    'Laravel',
    'React',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Adriana Eka Prayudha' }],
  creator: 'Adriana Eka Prayudha',
  openGraph: {
    title: 'Adriana Eka Prayudha - Fullstack Engineer',
    description:
      'Fullstack Engineer specializing in modern web and mobile technologies. Building usable, beautiful web apps with clean code & minimal design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adriana Eka Prayudha - Fullstack Engineer',
    description:
      'Fullstack Engineer specializing in modern web and mobile technologies.',
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
          </PreloaderProvider>
        </ThemeProvider>
      </body>
    </Layout>
  );
}
