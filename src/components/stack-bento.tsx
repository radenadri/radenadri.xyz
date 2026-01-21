'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface StackBentoCardProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2;
}

interface StackBentoProps {
  children: React.ReactNode;
  className?: string;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  enableParticles?: boolean;
  particleCount?: number;
  spotlightRadius?: number;
}

const MOBILE_BREAKPOINT = 768;
const DEFAULT_PARTICLE_COUNT = 8;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
// Green color for cream theme: rgb(74, 124, 89)
const GLOW_COLOR = '74, 124, 89';

const createParticleElement = (x: number, y: number): HTMLDivElement => {
  const el = document.createElement('div');
  el.className = 'stack-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${GLOW_COLOR}, 0.8);
    box-shadow: 0 0 6px rgba(${GLOW_COLOR}, 0.4);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const ParticleCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  particleCount?: number;
  disabled?: boolean;
}> = ({
  children,
  className = '',
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  disabled = false
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const timeoutsRef = useRef<number[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLDivElement[]>([]);
    const particlesInitialized = useRef(false);

    const initializeParticles = useCallback(() => {
      if (particlesInitialized.current || !cardRef.current) return;
      const { width, height } = cardRef.current.getBoundingClientRect();
      memoizedParticles.current = Array.from({ length: particleCount }, () =>
        createParticleElement(Math.random() * width, Math.random() * height)
      );
      particlesInitialized.current = true;
    }, [particleCount]);

    const clearAllParticles = useCallback(() => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      particlesRef.current.forEach(particle => {
        gsap.to(particle, {
          scale: 0,
          opacity: 0,
          duration: 0.3,
          ease: 'back.in(1.7)',
          onComplete: () => particle.remove()
        });
      });
      particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
      if (!cardRef.current || !isHoveredRef.current) return;
      if (!particlesInitialized.current) initializeParticles();

      memoizedParticles.current.forEach((particle, index) => {
        const timeoutId = window.setTimeout(() => {
          if (!cardRef.current || !isHoveredRef.current) return;

          const clone = particle.cloneNode(true) as HTMLDivElement;
          const rect = cardRef.current.getBoundingClientRect();

          clone.style.left = `${Math.random() * rect.width}px`;
          clone.style.top = `${Math.random() * rect.height}px`;

          cardRef.current.appendChild(clone);
          particlesRef.current.push(clone);

          gsap.fromTo(clone,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 0.8,
              duration: 0.4,
              ease: 'back.out(1.7)',
              onComplete: () => {
                gsap.to(clone, {
                  y: -30 - Math.random() * 20,
                  x: (Math.random() - 0.5) * 40,
                  opacity: 0,
                  duration: 1 + Math.random() * 0.5,
                  ease: 'power1.out',
                  onComplete: () => {
                    clone.remove();
                    const idx = particlesRef.current.indexOf(clone);
                    if (idx > -1) particlesRef.current.splice(idx, 1);
                  }
                });
              }
            }
          );
        }, index * 100);
        timeoutsRef.current.push(timeoutId);
      });
    }, [initializeParticles]);

    useEffect(() => {
      if (disabled || !cardRef.current) return;

      const element = cardRef.current;

      const handleMouseEnter = () => {
        isHoveredRef.current = true;
        animateParticles();
      };

      const handleMouseLeave = () => {
        isHoveredRef.current = false;
        clearAllParticles();
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        isHoveredRef.current = false;
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
        clearAllParticles();
      };
    }, [animateParticles, clearAllParticles, disabled]);

    return (
      <div
        ref={cardRef}
        className={`${className} relative overflow-hidden`}
        style={{ ...style, position: 'relative', overflow: 'hidden' }}
      >
        {children}
      </div>
    );
  };

const GlobalSpotlight: React.FC<{
  containerRef: React.RefObject<HTMLDivElement | null>;
  disabled?: boolean;
  spotlightRadius?: number;
}> = ({ containerRef, disabled = false, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disabled || !containerRef?.current) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'stack-bento-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${GLOW_COLOR}, 0.12) 0%,
        rgba(${GLOW_COLOR}, 0.06) 20%,
        rgba(${GLOW_COLOR}, 0.02) 40%,
        transparent 60%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: multiply;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const isInside = e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom;

      if (isInside) {
        spotlightRef.current.style.left = `${e.clientX}px`;
        spotlightRef.current.style.top = `${e.clientY}px`;
        gsap.to(spotlightRef.current, { opacity: 1, duration: 0.3 });

        // Update card glow properties
        const cards = containerRef.current.querySelectorAll('.stack-bento-card');
        cards.forEach(card => {
          const cardRect = card.getBoundingClientRect();
          const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
          const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;
          const distance = Math.hypot(e.clientX - (cardRect.left + cardRect.width / 2),
            e.clientY - (cardRect.top + cardRect.height / 2));
          const glow = Math.max(0, 1 - distance / spotlightRadius);

          (card as HTMLElement).style.setProperty('--glow-x', `${relativeX}%`);
          (card as HTMLElement).style.setProperty('--glow-y', `${relativeY}%`);
          (card as HTMLElement).style.setProperty('--glow-intensity', glow.toString());
        });
      } else {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.remove();
    };
  }, [containerRef, disabled, spotlightRadius]);

  return null;
};

export const StackBentoCard: React.FC<StackBentoCardProps> = ({
  children,
  className = '',
  colSpan = 1,
  rowSpan = 1
}) => {
  const isMobile = useMobileDetection();

  const gridClass = isMobile ? '' : `${colSpan === 2 ? 'md:col-span-2' : ''} ${rowSpan === 2 ? 'md:row-span-2' : ''}`;

  return (
    <ParticleCard
      className={`stack-bento-card ${gridClass} ${className}`}
      disabled={isMobile}
    >
      {children}
    </ParticleCard>
  );
};

export const StackBento: React.FC<StackBentoProps> = ({
  children,
  className = '',
  enableSpotlight = true,
  enableBorderGlow = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();

  return (
    <>
      <style>
        {`
          .stack-bento-container {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 200px;
          }
          
          .stack-bento-card {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
          }
          
          ${enableBorderGlow ? `
          .stack-bento-card::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 1px;
            background: radial-gradient(
              300px circle at var(--glow-x) var(--glow-y),
              rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.6)) 0%,
              rgba(${GLOW_COLOR}, calc(var(--glow-intensity) * 0.3)) 30%,
              transparent 60%
            );
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 1;
            z-index: 1;
          }
          ` : ''}
        `}
      </style>

      {enableSpotlight && !isMobile && (
        <GlobalSpotlight
          containerRef={containerRef}
          disabled={isMobile}
          spotlightRadius={spotlightRadius}
        />
      )}

      <div
        ref={containerRef}
        className={`stack-bento-container grid grid-cols-1 md:grid-cols-3 gap-4 ${className}`}
      >
        {children}
      </div>
    </>
  );
};

export default StackBento;
