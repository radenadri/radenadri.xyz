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
    <div
      className="relative min-h-screen w-full overflow-x-hidden bg-[var(--space-void)] text-[var(--space-star-white)]"
      style={{ scrollBehavior: 'auto' }}
    >
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_60%)]" />
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        <header className="w-full border-b border-white/5 bg-black/20 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-4 py-8 sm:px-10">
            <p className="text-xs uppercase tracking-[0.6em] text-[var(--space-red-shift)]">
              [ WORK ARCHIVE ]
            </p>
            <Link
              href="/"
              className="font-data text-[0.6rem] text-white/60 hover:text-white/90"
            >
              ← Back to home
            </Link>
          </div>
        </header>
        <main className="mx-auto w-full max-w-4xl grow px-4 py-12 sm:px-8 lg:px-0">
          <article className="flex w-full flex-col gap-12">{children}</article>
        </main>
      </div>
    </div>
  );
}
