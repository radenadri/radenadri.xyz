import Link from 'next/link';
import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
});

export const metadata: Metadata = {
  title: 'Work — Adriana Eka Prayudha',
  description: 'Case studies and detailed write-ups of selected work.',
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        'font-body relative min-h-screen w-full overflow-x-hidden bg-[var(--cream)] text-[var(--text-primary)]'
      )}
    >
      {/* Subtle background pattern */}
      <div className="pointer-events-none fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--green-light),_transparent_50%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="sticky top-0 w-full border-b border-[var(--border-light)] bg-[var(--cream)]/80 backdrop-blur-md z-50">
          <div className="mx-auto flex w-full max-w-4xl items-center justify-between px-4 py-4 sm:px-8">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <span>←</span>
              <span>Back to home</span>
            </Link>
            <span className="text-xs font-medium text-[var(--green-primary)] uppercase tracking-wider">
              Case Study
            </span>
          </div>
        </header>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-4xl grow px-4 py-12 sm:px-8 lg:px-0">
          <article className="flex w-full flex-col gap-12">{children}</article>
        </main>

        {/* Footer */}
        <footer className="border-t border-[var(--border-light)] py-8">
          <div className="mx-auto max-w-4xl px-4 sm:px-8 flex items-center justify-between">
            <Link
              href="/#works"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--green-primary)] transition-colors"
            >
              ← View all works
            </Link>
            <p className="text-xs text-[var(--text-muted)]">
              radenadri.xyz
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
