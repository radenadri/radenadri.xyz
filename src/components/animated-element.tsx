'use client';

import { useEffect, useRef, useId } from 'react';
import type { JSX } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { usePreloader } from './preloader-provider';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedElementProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'stagger';
  delay?: number;
  duration?: number;
  start?: string;
  end?: string;
}

export function AnimatedElement({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  start = 'top 85%',
  end = 'bottom 15%',
}: AnimatedElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasAnimatedRef = useRef(false);
  const { isLoading } = usePreloader();
  const pathname = usePathname();
  const uniqueId = useId();

  // Reset animation state when pathname changes (navigation)
  useEffect(() => {
    hasAnimatedRef.current = false;
  }, [pathname]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || isLoading) return;

    // Clean up previous animation if exists
    if (triggerRef.current) {
      triggerRef.current.kill();
      triggerRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Small delay to ensure DOM is ready after navigation
    const initTimeout = setTimeout(() => {
      // Set initial state
      if (animation === 'stagger') {
        const childElements = element.children;
        gsap.set(element, { opacity: 1 });
        gsap.set(childElements, { opacity: 0, y: 30 });
      } else {
        gsap.set(element, {
          opacity: 0,
          y: animation === 'slideUp' ? 50 : 0,
        });
      }

      // Create animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: start,
          end: end,
          toggleActions: 'play none none none',
          id: uniqueId,
          onEnter: () => {
            hasAnimatedRef.current = true;
          },
        },
      });

      timelineRef.current = tl;
      triggerRef.current = tl.scrollTrigger || null;

      if (animation === 'stagger') {
        const childElements = element.children;
        tl.to(childElements, {
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

      // Refresh ScrollTrigger to recalculate positions
      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [animation, delay, duration, start, end, isLoading, pathname, uniqueId]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

export function AnimatedText({
  as: Component = 'span',
  children,
  className = '',
  delay = 0,
  start = 'top 85%',
  end = 'bottom 15%',
}: {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  start?: string;
  end?: string;
}) {
  const textRef = useRef<HTMLSpanElement>(null);
  const originalTextRef = useRef<string>('');
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const { isLoading } = usePreloader();
  const pathname = usePathname();
  const uniqueId = useId();

  // Store original text on first render
  useEffect(() => {
    if (textRef.current && !originalTextRef.current) {
      originalTextRef.current = textRef.current.textContent || '';
    }
  }, []);

  useEffect(() => {
    const element = textRef.current;
    if (!element || isLoading) return;

    // Clean up previous animation
    if (triggerRef.current) {
      triggerRef.current.kill();
      triggerRef.current = null;
    }
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    const initTimeout = setTimeout(() => {
      // Restore original text and split into words
      const text = originalTextRef.current || element.textContent || '';
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
          start: start,
          end: end,
          toggleActions: 'play none none none',
          id: uniqueId,
        },
      });

      timelineRef.current = tl;
      triggerRef.current = tl.scrollTrigger || null;

      tl.from(wordElements, {
        y: 100,
        ease: 'power4.out',
        delay: delay,
        duration: 1.5,
        stagger: {
          amount: 0.3,
        },
      });

      ScrollTrigger.refresh();
    }, 50);

    return () => {
      clearTimeout(initTimeout);
      if (triggerRef.current) {
        triggerRef.current.kill();
        triggerRef.current = null;
      }
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, [delay, start, end, isLoading, pathname, uniqueId]);

  return (
    <Component className={`relative overflow-hidden inline-block ${className}`}>
      <span ref={textRef}>{children}</span>
    </Component>
  );
}
