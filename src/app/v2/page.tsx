'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Space_Mono, Syncopate } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { cn } from '@/lib/utils';
import experiments from '@/data/experiments';

// Configure fonts
const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
});

const syncopate = Syncopate({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-syncopate',
});

const HERO_COORDINATES = '6.9175° S, 107.6191° E';
const PORTRAIT_IMAGE = '/me.jpeg';
const MARQUEE_SPEED_PX = 80; // pixels per second
const GALLERY_IMAGE_A =
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=2111&auto=format&fit=crop';
const GALLERY_IMAGE_B =
  'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop';

export default function V2Page() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const [hoveredExperiment, setHoveredExperiment] = useState<{
    title: string;
    description: string;
    x: number;
    y: number;
  } | null>(null);

  useLayoutEffect(() => {
    // 1. Initialize GSAP & ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Initialize Lenis (Smooth Scroll)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Velocity Skew Effect
    const proxy = { skew: 0 };
    const skewSetter = gsap.quickSetter('.skew-content', 'skewY', 'deg');
    const clamp = gsap.utils.clamp(-5, 5);

    lenis.on('scroll', (e: { velocity: number }) => {
      ScrollTrigger.update();
      const skew = clamp(e.velocity / 300);
      if (Math.abs(skew) > 0.1) {
        gsap.to(proxy, {
          skew: skew,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      } else {
        gsap.to(proxy, {
          skew: 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. GSAP Animations

    // Hero Reveal
    const heroTl = gsap.timeline();
    heroTl.to('.hero-text-reveal > div', {
      y: 0,
      duration: 1.5,
      stagger: 0.2,
      ease: 'power4.out',
      delay: 0.2,
    });

    // Image Reveal on Scroll
    const revealImages = document.querySelectorAll('.reveal-img');
    revealImages.forEach((img) => {
      ScrollTrigger.create({
        trigger: img,
        start: 'top 80%',
        onEnter: () => img.classList.add('active'),
        once: true,
      });
    });

    // Parallax Effect
    const parallaxLayers = document.querySelectorAll('[data-speed]');
    parallaxLayers.forEach((layer) => {
      const speed = Number(layer.getAttribute('data-speed'));
      gsap.to(layer, {
        y: (_i, _target) => -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: layer,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0,
        },
      });
    });

    const marqueeTrack = marqueeTrackRef.current;
    if (marqueeTrack) {
      const totalWidth = marqueeTrack.scrollWidth;
      const contentWidth = totalWidth / 2;
      const distance = contentWidth;
      const duration = distance / MARQUEE_SPEED_PX;
      const wrapX = gsap.utils.wrap(-distance, 0);

      marqueeTweenRef.current = gsap.to(marqueeTrack, {
        x: `-=${distance}`,
        duration: Math.max(duration, 10),
        ease: 'linear',
        repeat: -1,
        modifiers: {
          x: (value) => `${wrapX(parseFloat(value))}px`,
        },
      });
    }

    // Loading Bar Animation
    gsap.to('.loading-bar', {
      width: '100%',
      scrollTrigger: {
        trigger: '.loading-bar',
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
      },
    });

    // 4. Custom Cursor Logic
    const cursorDot = cursorDotRef.current;
    const cursorOutline = cursorOutlineRef.current;

    const moveCursor = (e: MouseEvent) => {
      if (!cursorDot || !cursorOutline) return;
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 500, fill: 'forwards' }
      );
    };

    window.addEventListener('mousemove', moveCursor);

    // Cursor hover effects
    const links = document.querySelectorAll('a, button, .cursor-pointer');
    links.forEach((link) => {
      link.addEventListener('mouseenter', () => {
        if (cursorOutline && cursorDot) {
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
          cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
          cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        }
      });
      link.addEventListener('mouseleave', () => {
        if (cursorOutline && cursorDot) {
          cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
          cursorOutline.style.backgroundColor = 'transparent';
          cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        }
      });
    });

    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', moveCursor);
      ScrollTrigger.getAll().forEach((t) => {
        t.kill();
      });
      marqueeTweenRef.current?.kill();
    };
  }, []);

  const marqueeExperiments = [...experiments, ...experiments];

  function handleExperimentEnter(
    experiment: { title: string; description: string },
    event: React.MouseEvent<HTMLAnchorElement>
  ) {
    marqueeTweenRef.current?.pause();
    setHoveredExperiment({
      title: experiment.title,
      description: experiment.description,
      x: event.clientX,
      y: event.clientY,
    });
  }

  function handleExperimentMove(event: React.MouseEvent<HTMLAnchorElement>) {
    setHoveredExperiment((prev) =>
      prev
        ? {
            ...prev,
            x: event.clientX,
            y: event.clientY,
          }
        : prev
    );
  }

  function handleExperimentLeave() {
    marqueeTweenRef.current?.resume();
    setHoveredExperiment(null);
  }

  return (
    <div
      className={cn(
        spaceMono.variable,
        syncopate.variable,
        'bg-[var(--space-void)] text-[var(--space-star-white)] min-h-screen cursor-none overflow-x-hidden relative selection:bg-[var(--space-red-shift)] selection:text-white'
      )}
    >
      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }

        .cursor-dot {
          width: 20px;
          height: 20px;
          background-color: var(--space-red-shift);
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
          transform: translate(-50%, -50%);
        }

        .cursor-outline {
          width: 60px;
          height: 60px;
          border: 1px solid var(--space-star-white);
          position: fixed;
          top: 0;
          left: 0;
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
        }

        .outline-text {
          -webkit-text-stroke: 1px rgba(240, 240, 240, 0.3);
          color: transparent;
          transition: all 0.5s ease;
        }

        .outline-text:hover {
          -webkit-text-stroke: 1px var(--space-red-shift);
          color: var(--space-red-shift);
        }

        .reveal-img {
          clip-path: polygon(0 100%, 100% 100%, 100% 100%, 0 100%);
          transition: clip-path 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .reveal-img.active {
          clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 0);
        }

        .skew-content {
          will-change: transform;
        }

        .font-wide {
          font-family: var(--font-syncopate), 'Syncopate', sans-serif;
        }

        .font-data {
          font-family: var(--font-space-mono), 'Space Mono', monospace;
        }
      `}</style>

      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <div ref={cursorDotRef} className="cursor-dot hidden md:block" />
      <div ref={cursorOutlineRef} className="cursor-outline hidden md:block" />

      <nav className="fixed top-0 w-full p-8 flex justify-between items-center z-40 mix-blend-difference">
        <div className="font-data text-sm text-[var(--space-red-shift)]">
          <span>[ 001_BRANDNEWSHVT ]</span>
        </div>
        <div className="font-data text-xs md:text-sm flex gap-6">
          <a
            href="#home"
            className="hover:text-[var(--space-red-shift)] transition-colors"
          >
            [ home ]
          </a>
          <a
            href="#me"
            className="hover:text-[var(--space-red-shift)] transition-colors"
          >
            [ me ]
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--space-red-shift)] transition-colors"
          >
            [ contact ]
          </a>
        </div>
      </nav>

      <div id="smooth-wrapper" ref={scrollWrapperRef}>
        <div id="smooth-content" className="skew-content">
          <section
            id="home"
            className="h-screen w-full flex flex-col justify-center items-center relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-[var(--space-blue-shift)] blur-[120px] rounded-full opacity-20 animate-pulse" />

            <div className="z-10 text-center mix-blend-difference flex flex-col items-center">
              <h1 className="font-wide text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase text-[var(--space-star-white)] hero-text-reveal overflow-hidden">
                <div className="translate-y-full">Adrian</div>
              </h1>
              <h1 className="font-wide text-[12vw] leading-[0.85] font-bold tracking-tighter uppercase outline-text hero-text-reveal overflow-hidden opacity-50">
                <div className="translate-y-full">SSSPACES</div>
              </h1>
            </div>

            <div className="absolute bottom-10 left-8 md:left-20 font-data text-xs md:text-sm max-w-xs text-gray-400">
              <p>COORDINATES: {HERO_COORDINATES}</p>
              <p className="mt-2 text-[var(--space-red-shift)]">
                SCROLL TO INITIATE DESCENT
              </p>
            </div>
          </section>

          <section
            id="me"
            className="min-h-screen w-full py-24 px-6 md:px-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-center"
          >
            <div className="md:col-span-5 relative">
              <div className="w-full h-[60vh] bg-[var(--space-nebula)] overflow-hidden relative">
                <Image
                  src={PORTRAIT_IMAGE}
                  alt="Abstract Space"
                  fill
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700 scale-110 reveal-img"
                  data-speed="0.8"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 font-data text-9xl text-[var(--space-red-shift)] opacity-20 select-none z-[-1]">
                01
              </div>
            </div>

            <div className="md:col-span-7 flex flex-col justify-center">
              <h2 className="font-wide text-5xl md:text-7xl mb-8 leading-none uppercase">
                Hi from <br />
                <span className="text-[var(--space-blue-shift)] italic">
                  Adrian
                </span>
              </h2>
              <p className="font-data text-lg text-[var(--space-gray-400)] max-w-md leading-relaxed">
                Frontend Developer based in Bandung, Indonesia. Trying to find a
                balance between functionality and aesthetics. Always learning
                and exploring new technologies.
              </p>
              <div className="mt-12 h-[1px] w-full bg-[var(--space-gray-800)] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[var(--space-red-shift)] loading-bar" />
              </div>
            </div>
          </section>

          <section className="relative py-20 overflow-hidden bg-[var(--space-star-white)] text-[var(--space-void)]">
            <div
              ref={marqueeTrackRef}
              className="marquee-track flex whitespace-nowrap"
            >
              {marqueeExperiments.map((experiment, index) => (
                <a
                  key={`${experiment.title}-${index}`}
                  href={experiment.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="marquee-item inline-flex items-center gap-3 font-wide text-[clamp(1.5rem,6vw,4.5rem)] font-bold uppercase tracking-tight py-4 hover:text-[var(--space-red-shift)] transition-colors"
                  onMouseEnter={(event) =>
                    handleExperimentEnter(experiment, event)
                  }
                  onMouseMove={handleExperimentMove}
                  onMouseLeave={handleExperimentLeave}
                >
                  <span>{experiment.title}</span>
                  <span
                    className="mx-6 text-[var(--space-void)]"
                    aria-hidden="true"
                  >
                    —
                  </span>
                </a>
              ))}
            </div>

            {hoveredExperiment ? (
              <div
                className="fixed z-50 max-w-xs rounded-lg border border-[var(--space-void)] bg-[var(--space-void)]/90 p-4 font-data text-sm text-[var(--space-star-white)] shadow-lg"
                style={{
                  left: hoveredExperiment.x + 16,
                  top: hoveredExperiment.y + 16,
                }}
              >
                <p className="font-bold text-[var(--space-red-shift)] uppercase text-xs tracking-widest">
                  {hoveredExperiment.title}
                </p>
                <p className="mt-2 text-[var(--space-star-white)]/80">
                  {hoveredExperiment.description}
                </p>
              </div>
            ) : null}
          </section>

          <section className="min-h-screen w-full py-32 px-4 md:px-10 bg-[var(--space-void)] text-[var(--space-star-white)] relative">
            <div className="flex flex-col md:flex-row gap-20 items-start">
              <div className="w-full md:w-1/3 mt-0 md:mt-20">
                <div className="border-t border-gray-700 py-4 flex justify-between font-data text-xs text-[var(--space-red-shift)]">
                  <span>FIG. A</span>
                  <span>[ NEBULA ]</span>
                </div>
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={GALLERY_IMAGE_A}
                    alt="Nebula"
                    width={1200}
                    height={1600}
                    unoptimized
                    className="w-full h-full object-cover reveal-img hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-wide text-3xl mt-4">Dark Matter</h3>
              </div>

              <div className="w-full md:w-5/12">
                <div className="border-t border-gray-700 py-4 flex justify-between font-data text-xs text-[var(--space-blue-shift)]">
                  <span>FIG. B</span>
                  <span>[ VOID ]</span>
                </div>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={GALLERY_IMAGE_B}
                    alt="Void"
                    width={1200}
                    height={1200}
                    unoptimized
                    className="w-full h-full object-cover reveal-img hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-wide text-3xl mt-4">Entropy</h3>
                <p className="font-data text-sm text-gray-500 mt-2">
                  Disorder increases with time. We curate the chaos.
                </p>
              </div>
            </div>
          </section>

          <section
            id="contact"
            className="h-[80vh] w-full bg-[var(--space-red-shift)] flex flex-col justify-between p-6 md:p-14 text-[var(--space-void)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

            <div className="flex justify-between items-start z-10 font-data text-sm border-b border-black pb-4 w-full">
              <div>
                <p>EST. 2025</p>
                <p>radenadri.xyz</p>
              </div>
              <div className="text-right flex flex-col">
                <a
                  href="https://github.com/radenadri"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GITHUB
                </a>
                <a
                  href="https://cv.radenadri.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  RESUME
                </a>
              </div>
            </div>

            <div className="z-10">
              <a
                href="mailto:radenadri@gmail.com"
                className="font-wide text-[14vw] leading-[0.8] tracking-tighter font-bold uppercase hover:italic transition-all duration-300 cursor-pointer"
              >
                Hit
                <br />
                Me Up
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
