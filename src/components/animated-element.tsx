'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'stagger';
  delay?: number;
  duration?: number;
}

export function AnimatedElement({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state
    gsap.set(element, {
      opacity: 0,
      y: animation === 'slideUp' ? 50 : 0,
    });

    // Create animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    });

    if (animation === 'stagger') {
      const children = element.children;

      // Set parent to visible but children to invisible
      gsap.set(element, { opacity: 1 });
      gsap.set(children, { opacity: 0, y: 30 });

      tl.to(children, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: 0.1,
        ease: 'power2.out',
        delay: delay,
      });
    } else {
      tl.to(element, {
        opacity: 1,
        y: 0,
        duration: duration,
        ease: 'power2.out',
        delay: delay,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into words for animation
    const text = element.textContent || '';
    const words = text.split(' ');

    element.innerHTML = words
      .map(
        (word) =>
          `<span class="inline-block will-change-transform">${word}&nbsp;</span>`
      )
      .join('');

    const wordElements = element.querySelectorAll('span');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.from(wordElements, {
      y: 100,
      ease: 'power4.out',
      delay: delay,
      duration: 1.5,
      stagger: {
        amount: 0.3,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay]);

  return (
    <div
      ref={textRef}
      className={`relative overflow-hidden inline-block ${className}`}
    >
      {children}
    </div>
  );
}
