import Link from 'next/link';
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

export default function NotFound() {
  return (
    <div className={cn(
      inter.variable,
      instrumentSerif.variable,
      'font-body relative min-h-screen overflow-hidden bg-[var(--cream)] text-[var(--text-primary)] px-6 py-20 sm:px-10 flex items-center justify-center'
    )}>
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--green-light),_transparent_50%)]" />
      </div>

      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center gap-8">

        {/* Main Content */}
        <div className="space-y-4">
          <h1 className="font-heading text-5xl sm:text-7xl">
            Page not found
          </h1>
          <p className="max-w-md mx-auto text-lg text-[var(--text-secondary)]">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--green-primary)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--green-dark)] transition-colors"
          >
            ← Back to Home
          </Link>
          <a
            href="mailto:radenadri@gmail.com"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-light)] bg-white px-6 py-3 text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--cream-dark)] transition-colors"
          >
            Contact Me
          </a>
        </div>

      </div>
    </div>
  );
}
