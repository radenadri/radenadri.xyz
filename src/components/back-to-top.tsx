'use client';

interface BackToTopProps {
  className?: string;
}

export function BackToTop({ className = '' }: BackToTopProps) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`group hidden lg:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.5em] text-white/70 transition-all hover:border-[var(--space-red-shift)] hover:text-[var(--space-red-shift)] ${className}`}
    >
      <span className="text-[var(--space-red-shift)] transition-transform group-hover:-translate-y-1">
        ↑
      </span>
      Back to top
    </button>
  );
}
