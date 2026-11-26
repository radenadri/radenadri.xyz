"use client";

import { useGSAP } from "@gsap/react";
import Clarity from "@microsoft/clarity";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { loadOrPreloadPdf } from "@/components/flipbook/pdf-loader";
import { ScrambleText } from "@/components/scramble-text";
import { SorenDock } from "@/components/soren-dock";
import { SplineSphere } from "@/components/spline-sphere";
import { Marquee } from "@/components/ui/marquee";
import techStack from "@/data/tech-stack";
import works from "@/data/works";

gsap.registerPlugin(ScrollTrigger);

const FlipbookModal = dynamic(
  () => import("@/components/flipbook/flipbook-modal"),
  { ssr: false },
);

const PORTRAIT_IMAGE = "/avatar.png";

const INCLUDED_SERVICES = [
  "Full-stack web applications",
  "Cross-platform mobile apps",
  "Clean UI & responsive layouts",
  "API & database architecture",
  "Production deployment & handoff",
] as const;

/**
 * Freelancer-centric portfolio landing page blending 2024-04-CGMWT (Soren)
 * visual architecture with wavyfei.com product-partner positioning.
 */
export default function Home() {
  const [isFlipbookOpen, setIsFlipbookOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const bentoRef = useRef<HTMLDivElement>(null);
  const clients = works.filter((w) => w.type === "clients");

  const trackVisit = (tag: string) => {
    Clarity.event(tag);
  };

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "numeric",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setClock(formatted);
      } catch {
        setClock("WIB");
      }
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      const container = bentoRef.current;
      if (!container) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      gsap.from(".soren-bento-item", {
        y: 120,
        opacity: 0,
        duration: 0.75,
        stagger: 0.04,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: bentoRef },
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_7.5%)] text-[hsl(0_0%_90%)]">
      {/* 100svh Interactive Particle Sphere Hero */}
      <section id="home" className="relative w-full h-[100svh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SplineSphere />
        </div>

        {/* Top-Left LiveClock */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20 pointer-events-none">
          <p className="font-mono text-[13px] font-medium text-[hsl(0_0%_40%)] tabular-nums">
            {clock}
          </p>
        </div>

        {/* Top-Right Minimal Avatar Badge */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 z-20">
          <a
            href="#about"
            aria-label="About Adriana Eka Prayudha"
            title="Adriana Eka Prayudha — Bandung, ID"
            className="block size-8 rounded-full overflow-hidden border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_10%)] opacity-85 hover:opacity-100 hover:border-[hsl(0_0%_40%)] transition-all"
          >
            <Image
              src={PORTRAIT_IMAGE}
              alt="Adriana Eka Prayudha"
              width={32}
              height={32}
              priority
              className="size-full object-cover"
            />
          </a>
        </div>

        {/* Centered Minimal Hero Copy */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-md px-6 text-center pointer-events-none space-y-1.5">
          <p className="text-[14px] font-medium text-[hsl(0_0%_60%)]">
            Adriana Eka Prayudha
          </p>
          <h1 className="text-[16px] sm:text-[18px] font-medium leading-[1.35] text-[hsl(0_0%_90%)]">
            Building websites &amp; digital products for growing business
          </h1>
        </div>
      </section>

      {/* 3-Column Soren Bento: Freelance Services + Stack + Partner Profile */}
      <section
        id="services"
        ref={bentoRef}
        className="w-full max-w-5xl mx-auto px-2 py-4"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          {/* Column 1: Project-Based Services (wavyfei.com) */}
          <div className="soren-bento-item rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-4 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
                  Development Services
                </p>
                <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                  Project-based
                </span>
              </div>

              <div className="space-y-2 pt-2 border-t border-[hsl(0_0%_15%)]">
                <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                  What&apos;s included
                </p>
                <ul className="space-y-2">
                  {INCLUDED_SERVICES.map((service) => (
                    <li
                      key={service}
                      className="flex items-center gap-2.5 text-[14px] text-[hsl(0_0%_90%)]"
                    >
                      <span className="size-1 rounded-full bg-[hsl(0_0%_60%)] shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[13px] leading-[19px] text-[hsl(0_0%_60%)]">
                Scope and pricing are shaped around your goals, timeline, and
                technical needs.
              </p>
              <a
                href="mailto:hello@radenadri.xyz"
                onClick={() => trackVisit("mail_link_clicked")}
                className="block w-full rounded-[8px] bg-[hsl(0_0%_12.5%)] hover:bg-[hsl(0_0%_16%)] py-3 text-center text-[14px] font-medium text-[hsl(0_0%_90%)] transition-colors"
              >
                Discuss a Project
              </a>
            </div>
          </div>

          {/* Column 2: Core Engineering Stack + CMS */}
          <div className="flex flex-col gap-2">
            <div className="soren-bento-item rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-4 flex-1 flex flex-col justify-between gap-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
                    Web &amp; Mobile Stack
                  </p>
                  <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                    Production
                  </span>
                </div>
                <p className="text-[14px] leading-[20px] text-[hsl(0_0%_60%)]">
                  End-to-end delivery from database schema and backend APIs to
                  responsive web and native mobile interfaces.
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {[
                  "PHP",
                  "Laravel",
                  "React",
                  "Next.js",
                  "Inertia.js",
                  "Tailwind CSS",
                  "TypeScript",
                  "Bun",
                  "React Native",
                  "Flutter",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-[6px] bg-[hsl(0_0%_12.5%)] border border-[hsl(0_0%_15%)] px-2.5 py-1 font-mono text-[12px] text-[hsl(0_0%_90%)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="soren-bento-item rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-4 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
                  CMS &amp; Headless
                </p>
                <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                  Publishing
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {["WordPress", "FilamentPHP", "PayloadCMS"].map((item) => (
                  <span
                    key={item}
                    className="rounded-[6px] bg-[hsl(0_0%_12.5%)] border border-[hsl(0_0%_15%)] px-2.5 py-1 font-mono text-[12px] text-[hsl(0_0%_90%)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Column 3: Freelancer Profile + Tools */}
          <div className="flex flex-col gap-2">
            <div className="soren-bento-item rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-4 flex flex-col justify-between gap-4">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
                  Adriana Eka Prayudha
                </p>
                <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                  Bandung, ID
                </span>
              </div>
              <p className="text-[14px] leading-[20px] text-[hsl(0_0%_60%)]">
                Partnering directly with founders and teams to turn ideas into
                fast, reliable digital products.
              </p>
            </div>

            <div className="soren-bento-item rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-4 flex-1 flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
                  Infrastructure &amp; Workflow
                </p>
                <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
                  Data &amp; Ops
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "PostgreSQL",
                  "SQLite",
                  "Redis",
                  "Claude Code",
                  "n8n",
                  "Git",
                  "Sentry",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="rounded-[6px] bg-[hsl(0_0%_12.5%)] border border-[hsl(0_0%_15%)] px-2.5 py-1 font-mono text-[12px] text-[hsl(0_0%_60%)]"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monochrome Tools Marquee */}
      <section
        aria-label="Tools Marquee"
        className="w-full max-w-5xl mx-auto px-2 py-4 overflow-hidden"
      >
        <div className="relative rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] py-3">
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-[hsl(0_0%_10%)] to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-[hsl(0_0%_10%)] to-transparent" />
          <Marquee className="[--duration:34s]" pauseOnHover>
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center gap-2.5 rounded-[6px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_12.5%)] px-3 py-1.5"
              >
                <Image
                  src={tech.icon}
                  alt={tech.name}
                  width={16}
                  height={16}
                  className="size-4 object-contain grayscale opacity-75"
                />
                <span className="font-mono text-[12px] text-[hsl(0_0%_60%)] whitespace-nowrap">
                  {tech.name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* Soren 50% Centered Selected Works Index */}
      <section id="works" className="w-full lg:w-[50%] mx-auto px-2 py-12">
        <div className="px-4 pb-3 flex items-center justify-between">
          <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
            Selected Work
          </p>
          <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">Index</p>
        </div>

        <div className="flex flex-col gap-1">
          {clients.map((work) => (
            <Link
              key={work.slug}
              href={work.direct ? work.url : `/work/${work.slug}`}
              target={work.direct ? "_blank" : "_self"}
              rel={work.direct ? "noopener noreferrer" : undefined}
              className="group relative w-full flex items-center p-4 rounded-[10px] gap-2 overflow-hidden hover:bg-[hsl(0_0%_10%)] transition-colors"
            >
              <div className="shrink-0">
                <p className="text-[14px] font-medium leading-[20px] text-[hsl(0_0%_90%)]">
                  <ScrambleText text={work.title} />
                </p>
              </div>

              {work.description ? (
                <div className="hidden md:block min-w-0 max-w-[45%]">
                  <p className="text-[14px] font-medium leading-[20px] text-[hsl(0_0%_40%)] truncate">
                    <ScrambleText text={work.description} />
                  </p>
                </div>
              ) : null}

              <div className="grow h-px bg-[hsl(0_0%_15%)] mx-2" />

              <div className="shrink-0">
                <p className="font-mono text-[12px] text-[hsl(0_0%_60%)] group-hover:text-[hsl(0_0%_90%)] transition-colors">
                  Live ↗
                </p>
              </div>
            </Link>
          ))}

          {/* See More Work — strictly label only */}
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
            className="group relative w-full flex items-center p-4 rounded-[10px] gap-2 overflow-hidden hover:bg-[hsl(0_0%_10%)] transition-colors text-left cursor-pointer"
          >
            <div className="shrink-0">
              <p className="text-[14px] font-medium leading-[20px] text-[hsl(0_0%_90%)]">
                <ScrambleText text="See More Work" />
              </p>
            </div>

            <div className="grow h-px bg-[hsl(0_0%_15%)] mx-2" />
          </button>
        </div>
      </section>

      {/* About / How I Work (wavyfei.com-inspired freelancer approach) */}
      <section id="about" className="w-full lg:w-[50%] mx-auto px-2 py-8">
        <div className="px-4 pb-3 flex items-center justify-between">
          <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">About</p>
          <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">Approach</p>
        </div>

        <div className="rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-5 space-y-3">
          <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
            I&apos;m Adrian, a fullstack developer focused on clean engineering
            and usable product design.
          </p>
          <p className="text-[14px] leading-[22px] text-[hsl(0_0%_60%)]">
            Every engagement starts with understanding how your product works,
            what your users need to do, and where friction slows things down.
            From there, we shape the architecture, interface, and implementation
            together until it&apos;s ready to ship.
          </p>
        </div>
      </section>

      {/* Direct Freelance Contact & Footer clearing the fixed SorenDock */}
      <footer
        id="contact"
        className="w-full lg:w-[50%] mx-auto px-2 pt-8 pb-32"
      >
        <div className="rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-medium text-[hsl(0_0%_90%)]">
              Let&apos;s work on it together
            </p>
            <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
              Bandung, ID
            </span>
          </div>
          <p className="text-[14px] leading-[20px] text-[hsl(0_0%_60%)]">
            Have a website, SaaS product, or mobile app in mind? Send a message
            and let&apos;s talk scope and timeline.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <a
              href="mailto:hello@radenadri.xyz"
              onClick={() => trackVisit("mail_link_clicked")}
              className="block w-full rounded-[8px] bg-[hsl(0_0%_12.5%)] hover:bg-[hsl(0_0%_16%)] py-3 text-center text-[14px] font-medium text-[hsl(0_0%_90%)] transition-colors"
            >
              hello@radenadri.xyz
            </a>
            <a
              href="https://cv.radenadri.xyz"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackVisit("resume_link_clicked")}
              className="block w-full rounded-[8px] bg-[hsl(0_0%_12.5%)] hover:bg-[hsl(0_0%_16%)] py-3 text-center text-[14px] font-medium text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors"
            >
              Resume ↗
            </a>
          </div>
        </div>

        <div className="mt-6 px-2 flex items-center justify-between font-mono text-[12px] text-[hsl(0_0%_40%)]">
          <span>© 2025 Adrian</span>
          <span>radenadri.xyz</span>
        </div>
      </footer>

      {/* Fixed Bottom Magnifying Dock */}
      <SorenDock
        onOpenFlipbook={() => setIsFlipbookOpen(true)}
        onTrack={trackVisit}
      />

      {/* Minimalist PDF Flipbook Modal */}
      <FlipbookModal
        isOpen={isFlipbookOpen}
        onClose={() => setIsFlipbookOpen(false)}
        pdfUrl="/portfolio.pdf"
        title="Selected Works"
      />
    </div>
  );
}
