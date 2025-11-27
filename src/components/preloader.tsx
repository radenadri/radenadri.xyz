'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();

    // Animate counter from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        const nextValue = Math.floor(counter.value);
        setCount(nextValue);
        if (barRef.current) {
          barRef.current.style.width = `${nextValue}%`;
        }
      },
    })
      // Then fade out the preloader
      .to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            onComplete?.();
          },
        },
        '>'
      ); // Start after previous animation
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[var(--space-void)] text-[var(--space-star-white)]"
    >
      <div className="flex flex-col items-center gap-4">
        <p className="font-data text-xs tracking-[0.6em] text-[var(--space-red-shift)] uppercase">
          [ initializing payload ]
        </p>
        <span className="text-6xl font-data font-semibold tabular-nums">
          {count.toString().padStart(3, '0')}
        </span>
      </div>
      <div className="w-[min(90vw,700px)] h-[2px] bg-[var(--space-star-white)]/20 relative">
        <div
          ref={barRef}
          style={{ width: '0%' }}
          className="absolute inset-y-0 left-0 bg-[var(--space-red-shift)] shadow-[0_0_10px_var(--space-red-shift)]"
        />
      </div>
    </div>
  );
}
