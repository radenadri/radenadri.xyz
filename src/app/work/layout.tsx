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
    <div className="min-h-screen bg-[var(--space-void)] text-[var(--space-star-white)] px-5 py-16 sm:px-10 lg:px-20">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.6em] text-[var(--space-red-shift)]">
          <span>[ WORK ARCHIVE ]</span>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 backdrop-blur">
          {children}
        </div>
      </div>
    </div>
  );
}
