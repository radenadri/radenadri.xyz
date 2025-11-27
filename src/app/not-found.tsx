import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--space-void)] text-[var(--space-star-white)] px-6 py-20 sm:px-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(0,68,255,0.25), transparent 55%), radial-gradient(circle at 80% 0%, rgba(255,42,0,0.12), transparent 45%)',
        }}
        aria-hidden
      />
      <div className="relative mx-auto flex max-w-4xl flex-col gap-12">
        <div className="text-xs uppercase tracking-[0.6em] text-[var(--space-red-shift)]">
          [ LOST SIGNAL ]
        </div>
        <div className="space-y-6">
          <h1 className="text-5xl font-bold uppercase sm:text-7xl">
            404 — page not found
          </h1>
          <p className="max-w-2xl text-base text-white/80">
            The page you pinged never replied. I think you are lost.
          </p>
        </div>
        <div className="grid gap-4 text-sm sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/60">Next actions</p>
            <ul className="mt-3 space-y-2 text-white/80">
              <li>- Jump back to the home page.</li>
              <li>- Or send me a ping if you need help.</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-white/60">Status</p>
            <p className="mt-3 text-2xl font-semibold">Systems OK</p>
            <p className="text-white/70">No anomalies detected.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-xs uppercase">
          <Link
            href="/"
            className="rounded-full border border-white/20 px-5 py-3 tracking-[0.3em] text-[var(--space-red-shift)] transition-colors hover:border-[var(--space-red-shift)]"
          >
            [ home ]
          </Link>
          <a
            href="mailto:radenadri@gmail.com"
            className="rounded-full border border-white/20 px-5 py-3 tracking-[0.3em] text-white/80 transition-colors hover:text-[var(--space-red-shift)]"
          >
            [ contact ]
          </a>
        </div>
        <div className="h-px w-full bg-white/10" />
        <div className="flex flex-col gap-2 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <span>[ 404 PAYLOAD LOGGED ]</span>
          <span>radenadri.xyz</span>
        </div>
      </div>
    </div>
  );
}
