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
      className={`text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors ${className}`}
    >
      BACK TO TOP
    </button>
  );
}
