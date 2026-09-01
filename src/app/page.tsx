"use client";

import Clarity from "@microsoft/clarity";
import {
  Briefcase,
  FileText,
  FolderOpen,
  Home as HomeIcon,
  Mail,
} from "lucide-react";
import dynamic from "next/dynamic";
import { Instrument_Serif, Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { AnimatedElement } from "@/components/animated-element";
import { loadOrPreloadPdf } from "@/components/flipbook/pdf-loader";
import { StackBento, StackBentoCard } from "@/components/stack-bento";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Marquee } from "@/components/ui/marquee";
import {
  type ExperienceItemType,
  WorkExperience,
} from "@/components/ui/work-experience";
import experiences from "@/data/experiences";
import techStack from "@/data/tech-stack";
import works from "@/data/works";
import { cn } from "@/lib/utils";

const FlipbookModal = dynamic(
  () => import("@/components/flipbook/flipbook-modal"),
  { ssr: false },
);

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
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const clients = works.filter((w) => w.type === "clients");

  const trackVisit = (tag: string) => {
    Clarity.event(tag);
  };

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
              onClick={() => trackVisit("resume_link_clicked")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hidden sm:block"
            >
              Resume
            </a>
            <a
              href="mailto:radenadri@gmail.com"
              onClick={() => trackVisit("mail_link_clicked")}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hidden sm:block"
            >
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden"
      >
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
              <span className="italic animate-text-gradient">
                beautiful &amp; functional
              </span>{" "}
              digital experiences
            </h1>
          </AnimatedElement>

          {/* Subheading */}
          <AnimatedElement animation="slideUp" delay={0.4} duration={1}>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Based in Bandung, Indonesia. Building modern web and mobile
              applications with a focus on{" "}
              <span className="highlight">functionality</span> and{" "}
              <span className="highlight">aesthetics</span>.
            </p>
          </AnimatedElement>

          {/* CTA Buttons */}
          <AnimatedElement animation="slideUp" delay={0.6} duration={1}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#works"
                className="btn-primary magnetic-hover animate-gentle-pulse"
              >
                View My Work
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
              <h2 className="font-heading text-4xl md:text-5xl mb-4">
                My Stack
              </h2>
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
                <h3 className="font-heading text-3xl md:text-4xl mb-3 relative z-10">
                  Full Stack Development
                </h3>
                <p className="text-[var(--text-secondary)] mb-6 max-w-md relative z-10">
                  Building fullstack applications with latest technology.
                  Focused on creating seamless user experiences and efficient
                  server-side logic.
                </p>
                <div className="flex flex-wrap gap-2 relative z-10">
                  <span className="badge badge-green">PHP</span>
                  <span className="badge badge-green">Laravel</span>
                  <span className="badge badge-green">React</span>
                  <span className="badge badge-green">Next</span>
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
                  <h3 className="font-heading text-2xl mb-2">
                    CMS & Headless CMS
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    WordPress for flexible content management.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">WordPress</span>
                  <span className="badge badge-outline text-xs">
                    FilamentPHP
                  </span>
                  <span className="badge badge-outline text-xs">
                    PayloadCMS
                  </span>
                </div>
              </StackBentoCard>

              {/* Mobile Development Card */}
              <StackBentoCard className="p-6 rounded-2xl border border-[var(--border-light)] bg-[var(--cream-dark)] flex flex-col justify-between group hover:bg-white transition-all duration-300 hover:shadow-lg">
                <div>
                  <h3 className="font-heading text-2xl mb-2">
                    Mobile Development
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Cross-platform mobile apps with native performance.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="badge badge-outline text-xs">
                    React Native
                  </span>
                  <span className="badge badge-outline text-xs">Flutter</span>
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
                    <span className="badge badge-green">Claude Code</span>
                    <span className="badge badge-green">n8n</span>
                    <span className="badge badge-green">PostgreSQL</span>
                    <span className="badge badge-green">SQLite</span>
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
              <h2 className="font-heading text-4xl md:text-5xl mb-4">
                Selected Works
              </h2>
              <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
                Things I've built, designed, and brought to life
              </p>
            </div>
          </AnimatedElement>

          {/* Clients Section */}
          <AnimatedElement animation="slideUp" delay={0.1} duration={0.8}>
            <div className="mb-12">
              <p className="text-sm text-[var(--text-muted)] mb-4">Live Work</p>
              <div className="rounded-2xl border border-[var(--border-light)] bg-white overflow-hidden divide-y divide-[var(--border-light)]">
                <div
                  className={cn(
                    "grid",
                    clients.length % 2 === 1
                      ? "grid-cols-1"
                      : "grid-cols-1 md:grid-cols-2",
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
                        index % 2 === 1 &&
                          index === arr.length - 1 &&
                          arr.length % 2 === 0
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
                        aria-hidden="true"
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
                  <button
                    type="button"
                    onMouseEnter={() => {
                      loadOrPreloadPdf("/portfolio.pdf").catch(() => {});
                    }}
                    onTouchStart={() => {
                      loadOrPreloadPdf("/portfolio.pdf").catch(() => {});
                    }}
                    onClick={() => {
                      trackVisit("see_more_work_clicked");
                      setIsFlipbookOpen(true);
                    }}
                    className="w-full flex items-center justify-between px-5 py-4 hover:bg-[var(--cream-dark)] transition-colors group text-left cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--green-primary)] transition-colors flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      <span className="font-heading text-lg group-hover:text-[var(--green-primary)] transition-colors">
                        See more work
                      </span>
                    </div>
                    <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--green-light)] text-[var(--green-dark)] font-medium transition-transform group-hover:scale-105">
                      Interactive Flipbook
                    </span>
                  </button>
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
              <h2 className="font-heading text-4xl md:text-5xl mb-4">
                Experience
              </h2>
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
                        description: exp.jobDescription
                          .map((item) => `- ${item}`)
                          .join("\n"),
                        icon: "code",
                        skills:
                          index === 0
                            ? ["Laravel", "React", "TypeScript", "PostgreSQL"]
                            : [
                                "Laravel",
                                "React",
                                "WordPress",
                                "Git",
                                "REST API",
                              ],
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
      <section
        id="contact"
        className="py-24 px-4 md:px-8 relative overflow-hidden"
      >
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
              Have a project in mind? I'd love to hear about it. Let's create
              something amazing together.
            </p>
          </AnimatedElement>

          <AnimatedElement animation="slideUp" delay={0.4} duration={0.8}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:radenadri@gmail.com"
                className="btn-primary text-lg px-8 py-4 magnetic-hover animate-gentle-pulse"
              >
                Get in touch
              </a>
              <a
                href="https://pinkary.com/@radenadri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-lg px-8 py-4 magnetic-hover"
              >
                More about me
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
              <p className="text-sm text-[var(--text-muted)] underline-reveal">
                radenadri.xyz
              </p>
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
            <a
              href="#home"
              className="flex items-center justify-center w-full h-full"
            >
              <HomeIcon className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a
              href="#works"
              className="flex items-center justify-center w-full h-full"
            >
              <FolderOpen className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
          <DockIcon className="bg-transparent hover:bg-[var(--green-light)]">
            <a
              href="#experience"
              className="flex items-center justify-center w-full h-full"
            >
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
            <a
              href="#contact"
              className="flex items-center justify-center w-full h-full"
            >
              <Mail className="w-5 h-5 text-[var(--text-secondary)]" />
            </a>
          </DockIcon>
        </Dock>
      </div>

      {/* Interactive PDF Flipbook Modal */}
      <FlipbookModal
        isOpen={isFlipbookOpen}
        onClose={() => setIsFlipbookOpen(false)}
        pdfUrl="/portfolio.pdf"
        title="Selected Works & Archive"
      />
    </div>
  );
}
