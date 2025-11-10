'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const counter = { value: 0 };
    const tl = gsap.timeline();

    // Animate counter from 0 to 100
    tl.to(counter, {
      value: 100,
      duration: 3,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.floor(counter.value));
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <span
        ref={countRef}
        className="text-6xl font-mono font-semibold tabular-nums"
      >
        {count}%
      </span>
    </div>
  );
}
