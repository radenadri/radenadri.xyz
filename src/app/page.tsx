'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Inter, Instrument_Serif } from 'next/font/google';
import { cn } from '@/lib/utils';
import works from '@/data/works';
import experiences from '@/data/experiences';
import techStack from '@/data/tech-stack';
import { AnimatedElement, AnimatedText } from '@/components/animated-element';

// Configure fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
});

const PORTRAIT_IMAGE = '/avatar.png';

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={pageRef}
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        'font-body bg-[var(--cream)] text-[var(--text-primary)] min-h-screen'
      )}
    >
      {/* Navigation */}
      <nav className="fixed top-0 w-full px-4 py-4 md:px-8 z-50 bg-[var(--cream)]/80 backdrop-blur-md">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="font-heading text-xl">Adrian</div>
          <div className="flex items-center gap-4">
            <a
              href="https://cv.radenadri.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hidden sm:block"
            >
              Resume
            </a>
            <a
              href="mailto:radenadri@gmail.com"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hidden sm:block"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative Blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-[var(--green-light)] opacity-30 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--yellow-highlight)] opacity-40 rounded-full blur-3xl animate-blob" style={{ animationDelay: '4s' }} />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Logo/Avatar */}
          <AnimatedElement animation="fadeIn" duration={0.8}>
            <div className="mb-8 flex justify-center">
              <div className="relative animate-float-slow">
                <div className="aspect-square rounded-full overflow-hidden border-2 border-[var(--border-light)] glow-hover w-20 h-20">
                  <Image
                    src={PORTRAIT_IMAGE}
                    alt="Adrian"
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Main Heading */}
          <AnimatedElement animation="slideUp" delay={0.2} duration={1}>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-tight mb-6">
              Crafting <span className="italic animate-text-gradient">beautiful &amp; functional</span> digital experiences
            </h1>
          </AnimatedElement>

          {/* Subheading */}
          <AnimatedElement animation="slideUp" delay={0.4} duration={1}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Based in Bandung, Indonesia. Building modern web and mobile applications with a focus on{' '}
              <span className="highlight">functionality</span> and{' '}
              <span className="highlight">aesthetics</span>.
            </p>
          </AnimatedElement>

          {/* CTA Buttons */}
          <AnimatedElement animation="slideUp" delay={0.6} duration={1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#works" className="btn-primary magnetic-hover animate-gentle-pulse">
                View My Work
              </a>
              <a
                href="https://github.com/radenadri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary magnetic-hover"
              >
                GitHub Profile
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Features/About Section */}
      <section id="features" className="py-24 px-4 md:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">My Stack</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                The tools I use to bring ideas to life
              </p>
            </div>
          </AnimatedElement>

          {/* Bento Grid Layout */}
          <AnimatedElement animation="stagger" duration={0.8}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Main Card - Fullstack */}
              <div className="md:col-span-2 p-8 rounded-2xl border border-[var(--border-light)] bg-white relative overflow-hidden group hover-spring">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--green-light)] rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity animate-blob" />
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--green-light)] text-[var(--green-dark)] rounded-full mb-4">
                  Primary Stack
                </span>
                <h3 className="font-heading text-3xl md:text-4xl mb-3">
                  Laravel + React
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md">
                  Building fullstack applications with Laravel backend and React frontend, connected seamlessly with <span className="highlight">Inertia.js</span> for a modern SPA experience.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-green">Laravel</span>
                  <span className="badge badge-green">React</span>
                  <span className="badge badge-green">Inertia.js</span>
                  <span className="badge badge-green">Next.js</span>
                  <span className="badge badge-green">Bun</span>
                  <span className="badge badge-green">TypeScript</span>
                </div>
              </div>

              {/* CMS Card */}
              <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--cream-dark)] flex flex-col justify-between group hover:bg-white transition-colors hover-spring">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[var(--yellow-highlight)] flex items-center justify-center mb-4 text-2xl animate-float-delay">
                    ⚡
                  </div>
                  <h3 className="font-heading text-2xl mb-2">CMS & Headless CMS</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    WordPress and Payload for flexible content management.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">WordPress</span>
                  <span className="badge badge-outline text-xs">Payload</span>
                </div>
              </div>

              {/* Mobile Development Card */}
              <div className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--cream-dark)] flex flex-col justify-between group hover:bg-white transition-colors hover-spring">
                <div>
                  <h3 className="font-heading text-2xl mb-2">Mobile Development</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Cross-platform mobile apps with native performance.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">React Native</span>
                  <span className="badge badge-outline text-xs">Flutter</span>
                </div>
              </div>

              {/* Other Tools - Wide Card */}
              <div className="md:col-span-2 p-6 rounded-2xl border border-[var(--border-light)] bg-white hover-spring">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl mb-2">Other Tools</h3>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Essential tools that power my development workflow.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="badge badge-green">PostgreSQL</span>
                    <span className="badge badge-green">MySQL</span>
                    <span className="badge badge-green">Redis</span>
                    <span className="badge badge-green">Git</span>
                    <span className="badge badge-green">Sentry</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Use Cases/Works Section */}
      <section id="works" className="py-24 px-4 md:px-8 bg-[var(--cream-dark)]">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">Selected Works</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Things I've built, designed, and brought to life
              </p>
            </div>
          </AnimatedElement>

          {/* Simple Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {works.map((work, index) => (
              <AnimatedElement
                key={work.slug}
                animation="slideUp"
                delay={index * 0.1}
                duration={0.8}
              >
                <Link
                  href={`/work/${work.slug}`}
                  className="group block"
                >
                  {/* Image Container */}
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-[var(--border-light)] mb-4 hover-spring">
                    <Image
                      src={work.coverImage}
                      alt={work.title}
                      width={600}
                      height={450}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-heading text-xl mb-1 group-hover:text-[var(--green-primary)] transition-colors underline-reveal">
                        {work.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                        {work.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 md:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">Experience</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                My professional journey so far
              </p>
            </div>
          </AnimatedElement>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-[var(--border-light)] md:-translate-x-1/2" />

            {experiences.map((experience, index) => (
              <AnimatedElement
                key={`${experience.company}-${experience.position}`}
                animation="slideUp"
                delay={index * 0.2}
                duration={0.8}
              >
                <div
                  className={cn(
                    'relative mb-12 last:mb-0',
                    'md:w-1/2',
                    index % 2 === 0 ? 'md:pr-12 md:ml-0' : 'md:pl-12 md:ml-auto'
                  )}
                >
                  {/* Timeline Dot */}
                  <div className={cn(
                    'absolute top-0 w-4 h-4 rounded-full border-4 border-[var(--cream)] z-10',
                    index === 0 ? 'bg-[var(--green-primary)] animate-gentle-pulse' : 'bg-[var(--border-medium)]',
                    'left-0 -translate-x-1/2',
                    'md:left-auto',
                    index % 2 === 0 ? 'md:right-0 md:translate-x-1/2' : 'md:left-0 md:-translate-x-1/2'
                  )} />

                  {/* Card */}
                  <div className="ml-6 md:ml-0 p-6 rounded-2xl border border-[var(--border-light)] bg-white hover:shadow-lg transition-shadow hover-spring">
                    {/* Duration Badge */}
                    <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--cream-dark)] text-[var(--text-secondary)] rounded-full mb-4">
                      {experience.duration}
                    </span>

                    {/* Company & Position */}
                    <h3 className="font-heading text-2xl mb-1">
                      {experience.company}
                    </h3>
                    <p className="text-sm text-[var(--green-primary)] font-medium mb-4">
                      {experience.position} · {experience.location}
                    </p>

                    {/* Job Description */}
                    <ul className="space-y-2">
                      {experience.jobDescription.slice(0, 3).map((item, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="text-[var(--green-primary)] mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-24 px-4 md:px-8 bg-[var(--cream-dark)]">
        <div className="mx-auto max-w-6xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">Tech Stack</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Technologies and tools I work with
              </p>
            </div>
          </AnimatedElement>

          {/* Tech Grid */}
          <AnimatedElement animation="stagger" duration={0.6}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-3 p-5 rounded-xl bg-white border border-[var(--border-light)] card-hover hover-spring glow-hover"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="text-sm text-[var(--text-primary)] font-medium text-center">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA/Contact Section */}
      <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[var(--green-light)] opacity-20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-[var(--yellow-highlight)] opacity-30 rounded-full blur-3xl animate-blob" style={{ animationDelay: '6s' }} />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <AnimatedElement animation="slideUp" duration={0.8}>
            <h2 className="font-heading text-4xl md:text-6xl mb-6">
              Let's work <span className="animate-text-gradient">together</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.2} duration={0.8}>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.4} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:radenadri@gmail.com"
                className="btn-primary text-lg px-8 py-4 magnetic-hover animate-gentle-pulse"
              >
                Get in Touch
              </a>
              <a
                href="https://github.com/radenadri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 magnetic-hover"
              >
                View GitHub
              </a>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-18 px-4 md:px-8">
        <AnimatedElement animation="fadeIn" duration={0.8}>
          <div className="mx-auto max-w-6xl">
            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-light)]">
              <p className="text-sm text-[var(--text-muted)]">
                © 2025 Adrian. All rights reserved.
              </p>
              <p className="text-sm text-[var(--text-muted)] underline-reveal">
                radenadri.xyz
              </p>
            </div>
          </div>
        </AnimatedElement>
      </footer>
    </div>
  );
}
