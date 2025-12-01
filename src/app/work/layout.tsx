import Link from 'next/link';
import type { Metadata } from 'next';

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
    <div className="relative min-h-screen bg-[var(--space-void)] text-[var(--space-star-white)]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 sm:px-10 lg:px-12">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-3 text-xs uppercase tracking-[0.6em] text-[var(--space-red-shift)]">
            <span>[ WORK ARCHIVE ]</span>
            <Link
              href="/"
              className="font-data text-[0.6rem] text-white/50 hover:text-white/80"
            >
              ← Back to orbit
            </Link>
          </div>
          <div className="rounded-[2.5rem] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
