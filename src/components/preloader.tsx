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
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();

    // Animate counter from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const nextValue = Math.floor(counter.value);
        setCount(nextValue);
        if (barRef.current) {
          barRef.current.style.width = `${nextValue}%`;
        }
      },
    })
      // Animate text up
      .to(
        textRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '+=0.2'
      )
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
        '-=0.1'
      );
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-8 bg-[var(--cream)]"
    >
      {/* Content */}
      <div ref={textRef} className="flex flex-col items-center gap-6">
        {/* Counter */}
        <span className="text-6xl font-light tabular-nums text-[var(--text-primary)]">
          {count}
          <span className="text-[var(--text-muted)]">%</span>
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-[min(80vw,400px)] h-[3px] bg-[var(--border-light)] rounded-full overflow-hidden">
        <div
          ref={barRef}
          style={{ width: '0%' }}
          className="h-full bg-[var(--green-primary)] rounded-full transition-all duration-100"
        />
      </div>

      {/* Loading Text */}
      <p className="text-xs text-[var(--text-muted)] tracking-wider">
        Loading...
      </p>
    </div>
  );
}
