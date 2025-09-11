import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Layout } from '@/components/ds';
import { SmoothScrollProvider } from '@/components/smooth-scroll-provider';
import { ThemeProvider } from '@/components/theme-provider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Adriana Eka Prayudha - Frontend Developer',
  description:
    'Frontend Developer specializing in React, Vue, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
  keywords: [
    'Frontend Developer',
    'React',
    'Vue',
    'JavaScript',
    'TypeScript',
    'Tailwind CSS',
  ],
  authors: [{ name: 'Adriana Eka Prayudha' }],
  creator: 'Adriana Eka Prayudha',
  openGraph: {
    title: 'Adriana Eka Prayudha - Frontend Developer',
    description:
      'Frontend Developer specializing in React, Vue, and modern web technologies. Building usable, beautiful web apps with clean code & minimal design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Adriana Eka Prayudha - Frontend Developer',
    description:
      'Frontend Developer specializing in React, Vue, and modern web technologies.',
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </Layout>
  );
}
