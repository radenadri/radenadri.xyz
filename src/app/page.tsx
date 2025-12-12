'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Space_Mono, Syncopate } from 'next/font/google';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { cn } from '@/lib/utils';
import works from '@/data/works';
import experiences from '@/data/experiences';
import techStack from '@/data/tech-stack';
import { useGSAP } from '@gsap/react';

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

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);
  const marqueeTechStack = [...techStack, ...techStack];

  useGSAP(
    (context) => {
      gsap.registerPlugin(ScrollTrigger);
      const scope = context.scope || pageRef.current;
      const q = gsap.utils.selector(scope);

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const proxy = { skew: 0 };
      const skewTarget = scope?.querySelector('.skew-content');
      const skewSetter = skewTarget
        ? gsap.quickSetter(skewTarget, 'skewY', 'deg')
        : (_value: number) => {};
      const clamp = gsap.utils.clamp(-5, 5);

      const handleScroll = (e: { velocity: number }) => {
        ScrollTrigger.update();
        const skew = clamp(e.velocity / 300);
        gsap.to(proxy, {
          skew: Math.abs(skew) > 0.1 ? skew : 0,
          duration: 0.8,
          ease: 'power3',
          overwrite: true,
          onUpdate: () => skewSetter(proxy.skew),
        });
      };

      lenis.on('scroll', handleScroll);

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);

      const heroLines = q('.hero-text-reveal > div');
      if (heroLines.length) {
        gsap.timeline().to(heroLines, {
          y: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: 'power4.out',
          delay: 0.2,
        });
      }

      q('.reveal-img').forEach((img) => {
        ScrollTrigger.create({
          trigger: img,
          start: 'top 80%',
          onEnter: () => img.classList.add('active'),
          once: true,
        });
      });

      q('[data-speed]').forEach((layer) => {
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

      const loadingBars = q('.loading-bar');
      if (loadingBars.length) {
        gsap.to(loadingBars, {
          width: '100%',
          scrollTrigger: {
            trigger: loadingBars,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: 1,
          },
        });
      }

      return () => {
        lenis.destroy();
        cancelAnimationFrame(rafId);
        ScrollTrigger.getAll().forEach((t) => {
          t.kill();
        });
        marqueeTweenRef.current?.kill();
      };
    },
    { scope: pageRef }
  );

  return (
    <div
      ref={pageRef}
      className={cn(
        spaceMono.variable,
        syncopate.variable,
        'bg-[var(--space-void)] text-[var(--space-star-white)] min-h-screen overflow-x-hidden relative selection:bg-[var(--space-red-shift)] selection:text-white'
      )}
    >
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      <nav className="fixed top-0 w-full px-4 py-4 md:px-8 md:py-6 z-40">
        <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-[var(--space-void)]/80 px-5 py-3 text-[var(--space-star-white)] shadow-[0_15px_60px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-data text-[0.6rem] tracking-[0.4em] text-[var(--space-red-shift)]">
              [ 001_BRANDNEWSHVT ]
            </div>
            <div className="font-data text-[0.65rem] sm:text-xs flex w-full items-center justify-between uppercase tracking-[0.4em] sm:w-auto sm:justify-end sm:gap-6">
              {[
                { href: '#home', label: 'home' },
                { href: '#me', label: 'me' },
                { href: '#contact', label: 'contact' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full px-3 py-1 transition-colors hover:text-[var(--space-red-shift)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <div id="smooth-wrapper">
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
              <div className="w-full h-[60vh] overflow-hidden relative">
                <Image
                  src={PORTRAIT_IMAGE}
                  alt="Abstract Space"
                  width={1200}
                  height={1600}
                  unoptimized
                  className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-700 reveal-img"
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
                Web Developer based in Bandung, Indonesia. Trying to find a
                balance between functionality and aesthetics. Always learning
                and exploring new technologies.
              </p>
              <div className="mt-12 h-[1px] w-full bg-[var(--space-gray-800)] relative overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-1/3 bg-[var(--space-red-shift)] loading-bar" />
              </div>
            </div>
          </section>

          <section className="py-24 px-4 md:px-10 bg-[var(--space-void)] text-[var(--space-star-white)] relative">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">
              <div>
                <p className="font-data mb-2 text-xs tracking-[0.5em] text-[var(--space-blue-shift)]">
                  [ EXPERIENCE LOG ]
                </p>
                <h2 className="font-wide text-3xl md:text-5xl uppercase leading-tight">
                  What i've been doing
                </h2>
              </div>
            </div>

            <div className="grid gap-6">
              {experiences.map((experience, index) => (
                <div
                  key={`${experience.company}-${experience.position}`}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="font-data text-xs tracking-[0.5em] text-[var(--space-red-shift)]">
                        {index < 9 ? `0${index + 1}` : index + 1}
                      </p>
                      <h3 className="font-wide text-2xl md:text-3xl uppercase">
                        {experience.company}
                      </h3>
                      <p className="font-data text-sm text-white/70">
                        {experience.position} — {experience.location}
                      </p>
                    </div>
                    <div className="font-data text-xs text-white/60 uppercase tracking-[0.3em]">
                      {experience.duration}
                    </div>
                  </div>
                  <div className="mt-6 grid gap-2 text-sm text-white/80">
                    {experience.jobDescription.map((item) => (
                      <p key={item} className="flex items-start gap-2">
                        <span className="text-[var(--space-red-shift)]">▸</span>
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="relative py-20 overflow-hidden bg-[var(--space-star-white)] text-[var(--space-void)]">
            <div className="px-4 md:px-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
              <div>
                <p className="font-data mb-2 text-xs tracking-[0.5em] text-[var(--space-red-shift)]">
                  [ TECH STACK ]
                </p>
                <h2 className="font-wide text-3xl md:text-5xl uppercase leading-tight">
                  Tools I Use
                </h2>
              </div>
              <p className="font-data text-sm text-[var(--space-void)]/70 max-w-sm">
                The technologies and frameworks I use to bring ideas to life.
              </p>
            </div>
            <div
              ref={marqueeTrackRef}
              className="marquee-track flex whitespace-nowrap"
            >
              {marqueeTechStack.map((tech, index) => (
                <div
                  key={`${tech.name}-${index}`}
                  className="marquee-item inline-flex items-center gap-4 px-6 py-4"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={48}
                    height={48}
                    unoptimized
                    className="w-10 h-10 md:w-12 md:h-12 object-contain"
                  />
                  <span className="font-wide text-[clamp(1.25rem,4vw,3rem)] font-bold uppercase tracking-tight">
                    {tech.name}
                  </span>
                  <span
                    className="mx-4 text-[var(--space-void)]/30"
                    aria-hidden="true"
                  >
                    •
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="min-h-screen w-full py-32 px-4 md:px-10 bg-[var(--space-void)] text-[var(--space-star-white)] relative">
            <div className="px-2 md:px-0 mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="font-data mb-2 text-xs tracking-[0.5em] text-[var(--space-red-shift)]">
                  [ CURATED WORKS ]
                </p>
                <h2 className="font-wide text-3xl md:text-5xl uppercase leading-tight">
                  Selected from the archive
                </h2>
              </div>
              <p className="font-data text-sm text-[var(--space-star-white)]/80 max-w-md">
                Things I've done, things I've seen, things I've created.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
              {works.map((work, index) => {
                const isEven = index % 2 === 0;
                const figLabel = String.fromCharCode(65 + index);
                const accentColor = isEven
                  ? 'var(--space-red-shift)'
                  : 'var(--space-blue-shift)';
                const aspectRatio = isEven ? 'aspect-[3/4]' : 'aspect-square';

                return (
                  <Link
                    key={work.slug}
                    href={`/work/${work.slug}`}
                    className={cn(
                      'group w-full',
                      isEven ? 'md:mt-10' : 'md:mt-0'
                    )}
                  >
                    <div
                      className="border-t border-gray-700 py-4 flex justify-between font-data text-xs"
                      style={{ color: accentColor }}
                    >
                      <span>FIG. {figLabel}</span>
                      <span>[ {work.title.toUpperCase()} ]</span>
                    </div>
                    <div className={cn(aspectRatio, 'overflow-hidden')}>
                      <Image
                        src={work.coverImage}
                        alt={work.title}
                        width={1200}
                        height={isEven ? 1600 : 1200}
                        unoptimized
                        className="w-full h-full object-cover reveal-img transition-transform duration-700 grayscale group-hover:grayscale-0"
                      />
                    </div>
                    <h3
                      className="font-wide text-2xl md:text-3xl mt-4 transition-colors"
                      style={
                        { '--hover-color': accentColor } as React.CSSProperties
                      }
                    >
                      <span className="group-hover:text-[var(--hover-color)]">
                        {work.title}
                      </span>
                    </h3>
                  </Link>
                );
              })}
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
