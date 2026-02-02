"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter, Instrument_Serif } from "next/font/google";
import { Home as HomeIcon, Briefcase, FolderOpen, Mail, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import works from "@/data/works";
import experiences from "@/data/experiences";
import techStack from "@/data/tech-stack";
import { AnimatedElement, AnimatedText } from "@/components/animated-element";
import { StackBento, StackBentoCard } from "@/components/stack-bento";
import { WorkExperience, type ExperienceItemType } from "@/components/ui/work-experience";
import { Marquee } from "@/components/ui/marquee";
import { Dock, DockIcon } from "@/components/ui/dock";

// Configure fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
});

const PORTRAIT_IMAGE = "/avatar.png";

export default function Home() {
  const pageRef = useRef<HTMLDivElement>(null);
  const clients = works.filter((w) => w.type === "clients");

  return (
    <div
      ref={pageRef}
      className={cn(
        inter.variable,
        instrumentSerif.variable,
        "font-body bg-[var(--cream)] text-[var(--text-primary)] min-h-screen",
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
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-[var(--yellow-highlight)] opacity-40 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "4s" }}
        />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          {/* Logo/Avatar */}
          <AnimatedElement animation="fadeIn" duration={0.8}>
            <div className="mb-8 flex justify-center">
              <div className="relative">
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
              Crafting{" "}
              <span className="italic animate-text-gradient">beautiful &amp; functional</span>{" "}
              digital experiences
            </h1>
          </AnimatedElement>

          {/* Subheading */}
          <AnimatedElement animation="slideUp" delay={0.4} duration={1}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Based in Bandung, Indonesia. Building modern web and mobile applications with a focus
              on <span className="highlight">functionality</span> and{" "}
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

      {/* Tech Stack Marquee - Powered By */}
      <section className="py-12 overflow-hidden container max-w-3xl mx-auto bg-[var(--cream)]">
        <AnimatedElement animation="fadeIn" duration={0.8}>
          <div className="text-center mb-8">
            <p className="text-sm font-medium tracking-wider text-[var(--text-muted)] uppercase">
              Tools i use to build my projects
            </p>
          </div>
        </AnimatedElement>

        <div className="relative">
          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-[var(--cream)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-[var(--cream)] to-transparent" />

          {/* First Row - Forward */}
          <Marquee className="[--duration:30s] mb-4" pauseOnHover>
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white border border-[var(--border-light)] shadow-sm hover:shadow-md hover:border-[var(--green-primary)]/30 transition-all duration-300 group"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="text-sm font-medium text-[var(--text-primary)] whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>

          {/* Second Row - Reverse */}
          <Marquee className="[--duration:35s]" pauseOnHover reverse>
            {[...techStack].reverse().map((tech) => (
              <div
                key={`${tech.name}-reverse`}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-[var(--cream-dark)] border border-[var(--border-light)] hover:bg-white hover:shadow-md hover:border-[var(--green-primary)]/30 transition-all duration-300 group"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all"
                />
                <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] whitespace-nowrap transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>
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
                The tools I use to bring ideas to reality
              </p>
            </div>
          </AnimatedElement>

          {/* Magic Bento Grid Layout */}
          <AnimatedElement animation="fadeIn" duration={0.8} delay={0.2}>
            <StackBento enableSpotlight enableBorderGlow>
              {/* Main Card - Fullstack */}
              <StackBentoCard
                colSpan={2}
                className="p-8 rounded-2xl border border-[var(--border-light)] bg-white group hover:shadow-lg transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--green-light)] rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity animate-blob" />
                <span className="inline-block px-3 py-1 text-xs font-medium bg-[var(--green-light)] text-[var(--green-dark)] rounded-full mb-4 relative z-10">
                  Primary Stack
                </span>
                <h3 className="font-heading text-3xl md:text-4xl mb-3 relative z-10">Laravel</h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md relative z-10">
                  Building fullstack applications with Laravel backend and React frontend, connected
                  seamlessly with Inertia.js for a modern SPA experience. And also familiar with
                  TALL stack for rapid development.
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="badge badge-green">Laravel</span>
                  <span className="badge badge-green">React</span>
                  <span className="badge badge-green">Inertia.js</span>
                  <span className="badge badge-green">Tailwind CSS</span>
                  <span className="badge badge-green">Alpine.js</span>
                  <span className="badge badge-green">Livewire</span>
                  <span className="badge badge-green">Bun</span>
                  <span className="badge badge-green">TypeScript</span>
                </div>
              </StackBentoCard>

              {/* CMS Card */}
              <StackBentoCard className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--cream-dark)] flex flex-col justify-between group hover:bg-white transition-all duration-300 hover:shadow-lg">
                <div>
                  <h3 className="font-heading text-2xl mb-2">CMS & Headless CMS</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    WordPress and Payload for flexible content management.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">WordPress</span>
                  <span className="badge badge-outline text-xs">Payload</span>
                </div>
              </StackBentoCard>

              {/* Mobile Development Card */}
              <StackBentoCard className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--cream-dark)] flex flex-col justify-between group hover:bg-white transition-all duration-300 hover:shadow-lg">
                <div>
                  <h3 className="font-heading text-2xl mb-2">Mobile Development</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Cross-platform mobile apps with native performance.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">React Native</span>
                </div>
              </StackBentoCard>

              {/* Other Tools - Wide Card */}
              <StackBentoCard
                colSpan={2}
                className="p-6 rounded-2xl border border-[var(--border-light)] bg-white group hover:shadow-lg transition-all duration-300"
              >
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
              </StackBentoCard>
            </StackBento>
          </AnimatedElement>
        </div>
      </section>

      {/* Use Cases/Works Section */}
      <section id="works" className="py-24 px-4 md:px-8 bg-[var(--cream-dark)]">
        <div className="mx-auto max-w-4xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-16">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">Selected Works</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Things I've built, designed, and brought to life
              </p>
            </div>
          </AnimatedElement>

          {/* Clients Section */}
          <AnimatedElement animation="slideUp" delay={0.1} duration={0.8}>
            <div className="mb-12">
              <p className="text-sm text-[var(--text-muted)] mb-4">Clients</p>
              <div className="rounded-2xl border border-[var(--border-light)] bg-white overflow-hidden divide-y divide-[var(--border-light)]">
                <div
                  className={cn(
                    "grid",
                    clients.length % 2 === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
                    "divide-y md:divide-x divide-[var(--border-light)]",
                  )}
                >
                  {clients.map((work, index, arr) => (
                    <Link
                      key={work.slug}
                      href={work.direct ? work.url : `/work/${work.slug}`}
                      target={work.direct ? "_blank" : "_self"}
                      className={cn(
                        "flex items-center gap-3 px-5 py-4 hover:bg-[var(--cream-dark)] transition-colors group",
                        index % 2 === 1 && index === arr.length - 1 && arr.length % 2 === 0
                          ? ""
                          : "",
                        // index >= 2 ? 'md:border-t md:border-[var(--border-light)]' : ''
                      )}
                    >
                      <svg
                        className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--green-primary)] transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                      <span className="font-heading text-lg group-hover:text-[var(--green-primary)] transition-colors">
                        {work.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Side Projects Section */}
          <AnimatedElement animation="slideUp" delay={0.2} duration={0.8}>
            <div>
              <p className="text-sm text-[var(--text-muted)] mb-4">Open Source</p>
              <div className="rounded-2xl border border-[var(--border-light)] bg-white overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {works
                    .filter((work) => work.type === "projects")
                    .map((work, index, arr) => (
                      <Link
                        key={work.slug}
                        href={work.direct ? work.url : `/work/${work.slug}`}
                        target={work.direct ? "_blank" : "_self"}
                        className={cn(
                          "flex items-center justify-between gap-3 px-5 py-4 hover:bg-[var(--cream-dark)] transition-colors group",
                          "border-b border-[var(--border-light)] md:border-b-0",
                          index % 2 === 0 ? "md:border-r md:border-[var(--border-light)]" : "",
                          index >= 2 ? "md:border-t md:border-[var(--border-light)]" : "",
                          index === arr.length - 1 ? "border-b-0" : "",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <svg
                            className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--green-primary)] transition-colors flex-shrink-0"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M7 17L17 7M17 7H7M17 7V17"
                            />
                          </svg>
                          <span className="font-heading text-lg group-hover:text-[var(--green-primary)] transition-colors">
                            {work.title}
                          </span>
                        </div>
                        {/* GitHub Icon */}
                        <svg
                          className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--green-primary)] transition-colors flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-4 md:px-8 bg-[var(--cream)]">
        <div className="mx-auto max-w-3xl">
          {/* Section Header */}
          <AnimatedElement animation="slideUp" duration={0.8}>
            <div className="text-center mb-12">
              <h2 className="font-heading text-4xl md:text-5xl mb-4">Experience</h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                My professional journey so far
              </p>
            </div>
          </AnimatedElement>

          {/* Work Experience Component */}
          <AnimatedElement animation="fadeIn" duration={0.8} delay={0.2}>
            <div className="rounded-2xl border border-[var(--border-light)] bg-white overflow-hidden">
              <WorkExperience
                className="experience-themed"
                experiences={experiences.map(
                  (exp, index): ExperienceItemType => ({
                    id: `exp-${index}`,
                    companyName: exp.company,
                    companyLogo:
                      exp.links !== "#"
                        ? `https://www.google.com/s2/favicons?domain=${new URL(exp.links).hostname}&sz=64`
                        : undefined,
                    isCurrentEmployer: index === 0,
                    positions: [
                      {
                        id: `pos-${index}`,
                        title: exp.position,
                        employmentPeriod: exp.duration,
                        employmentType: "Full-time",
                        description: exp.jobDescription.map((item) => `- ${item}`).join("\n"),
                        icon: "code",
                        skills:
                          index === 0
                            ? ["Laravel", "React", "TypeScript", "PostgreSQL"]
                            : ["Laravel", "React", "WordPress", "MySQL", "Git", "REST API"],
                        isExpanded: index === 0,
                      },
                    ],
                  }),
                )}
              />
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA/Contact Section */}
      <section id="contact" className="py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-[var(--green-light)] opacity-20 rounded-full blur-3xl animate-blob" />
        <div
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-[var(--yellow-highlight)] opacity-30 rounded-full blur-3xl animate-blob"
          style={{ animationDelay: "6s" }}
        />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <AnimatedElement animation="slideUp" duration={0.8}>
            <h2 className="font-heading text-4xl md:text-6xl mb-6">
              Let's work <span className="animate-text-gradient">together</span>
            </h2>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.2} duration={0.8}>
            <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing
              together.
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
      <footer className="mt-18 px-4 md:px-8 mb-22 md:pb-8">
        <AnimatedElement animation="fadeIn" duration={0.8}>
          <div className="mx-auto max-w-6xl">
            {/* Bottom Footer */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-[var(--border-light)]">
              <p className="text-sm text-[var(--text-muted)]">
                © 2025 Adrian. All rights reserved.
              </p>
              <p className="text-sm text-[var(--text-muted)] underline-reveal">radenadri.xyz</p>
            </div>
          </div>
        </AnimatedElement>
      </footer>

      {/* Mobile Dock Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden">
        <Dock
          iconSize={40}
          iconMagnification={56}
          iconDistance={100}
          direction="bottom"
          className="h-14 gap-3 rounded-2xl border-[var(--border-light)] bg-white/90 backdrop-blur-lg shadow-lg shadow-black/5"
        >
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a href="#home" className="flex items-center justify-center w-full h-full">
              <HomeIcon className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a href="#works" className="flex items-center justify-center w-full h-full">
              <FolderOpen className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a href="#experience" className="flex items-center justify-center w-full h-full">
              <Briefcase className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a
              href="https://cv.radenadri.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full h-full"
            >
              <FileText className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a href="#contact" className="flex items-center justify-center w-full h-full">
              <Mail className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
        </Dock>
      </div>
    </div>
  );
}
