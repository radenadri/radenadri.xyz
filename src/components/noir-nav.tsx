"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

interface NoirNavProps {
  onOpenFlipbook: () => void;
  onTrack: (tag: string) => void;
}

const NAV_LINKS = [
  { index: "01", label: "Index", href: "#home", external: false },
  { index: "02", label: "Capabilities", href: "#stack", external: false },
  { index: "03", label: "Selected Works", href: "#works", external: false },
  { index: "04", label: "Experience", href: "#experience", external: false },
  { index: "05", label: "Contact", href: "#contact", external: false },
  {
    index: "06",
    label: "Resume",
    href: "https://cv.radenadri.xyz",
    external: true,
    trackTag: "resume_link_clicked",
  },
] as const;

/**
 * Fixed mix-blend-mode: difference top bar paired with a full-screen
 * split-column noir menu overlay animated via GSAP clip-path.
 */
export function NoirNav({ onOpenFlipbook, onTrack }: NoirNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [clock, setClock] = useState("--:--:--");
  const overlayRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Live Bandung (Asia/Jakarta) clock
  useEffect(() => {
    const updateClock = () => {
      try {
        const formatted = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setClock(`${formatted} WIB`);
      } catch {
        setClock("WIB");
      }
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // Close on Escape and lock body scroll while overlay is active
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Build paused GSAP clip-path overlay timeline
  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;

      const links = overlay.querySelectorAll(".noir-menu-link-inner");
      const meta = overlay.querySelectorAll(".noir-menu-meta");

      const tl = gsap.timeline({ paused: true });

      tl.set(overlay, { pointerEvents: "auto" })
        .to(overlay, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.75,
          ease: "hop",
        })
        .fromTo(
          links,
          { yPercent: 110 },
          {
            yPercent: 0,
            duration: 0.6,
            stagger: 0.055,
            ease: "power4.out",
          },
          "-=0.35",
        )
        .fromTo(
          meta,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
          },
          "-=0.45",
        );

      timelineRef.current = tl;

      return () => {
        tl.kill();
      };
    },
    { scope: overlayRef },
  );

  useEffect(() => {
    const tl = timelineRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      gsap.set(overlay, {
        clipPath: isOpen
          ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
          : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        pointerEvents: isOpen ? "auto" : "none",
      });
      return;
    }

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  const handleLinkClick = (trackTag?: string) => {
    if (trackTag) {
      onTrack(trackTag);
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Fixed mix-blend-mode: difference top bar */}
      <header className="fixed top-0 left-0 right-0 z-[70] mix-blend-difference text-white pointer-events-none">
        <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 py-5 md:px-10">
          <button
            type="button"
            onClick={() => {
              handleLinkClick();
              document
                .querySelector("#home")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="pointer-events-auto cursor-pointer font-mono text-xs uppercase tracking-[0.12em] hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
          >
            Adrian — ©25
          </button>

          <div
            title="Local time in Bandung"
            className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] tabular-nums opacity-75"
          >
            <span>Bandung, ID</span>
            <span aria-hidden="true">/</span>
            <span>{clock}</span>
          </div>

          <div className="pointer-events-auto flex items-center gap-5">
            <a
              href="mailto:hello@radenadri.xyz"
              onClick={() => onTrack("mail_link_clicked")}
              className="hidden sm:inline-block font-mono text-xs uppercase tracking-[0.12em] hover:opacity-70 transition-opacity"
            >
              [ Contact ]
            </a>
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-expanded={isOpen}
              aria-controls="noir-menu-overlay"
              aria-label={
                isOpen ? "Close navigation menu" : "Open navigation menu"
              }
              className="font-mono text-xs uppercase tracking-[0.12em] cursor-pointer px-2 py-1 -mr-2 hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-1 focus-visible:outline-white"
            >
              {isOpen ? "[ Close ]" : "[ Menu ]"}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Split-Column Noir Menu Overlay */}
      <div
        id="noir-menu-overlay"
        ref={overlayRef}
        aria-hidden={!isOpen}
        style={{
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          pointerEvents: "none",
        }}
        className="fixed inset-0 z-[60] bg-[#141414] text-[#e4e3db] overflow-y-auto"
      >
        <div className="mx-auto flex min-h-full w-full max-w-[90rem] flex-col justify-between px-5 pt-28 pb-10 md:px-10 md:pt-32">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-12 items-start">
            {/* Primary Navigation Links */}
            <nav aria-label="Primary" className="lg:col-span-7 flex flex-col">
              <p className="noir-menu-meta font-mono text-[11px] uppercase tracking-[0.14em] text-[#666666] mb-6">
                Directory
              </p>
              <ul className="divide-y divide-[#e4e3db]/12 border-y border-[#e4e3db]/12">
                {NAV_LINKS.map((item) => (
                  <li key={item.index} className="overflow-hidden">
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() =>
                          handleLinkClick(
                            "trackTag" in item ? item.trackTag : undefined,
                          )
                        }
                        className="noir-menu-link-inner group flex items-baseline justify-between py-4 md:py-5 transition-colors hover:text-white"
                      >
                        <div className="flex items-baseline gap-4 md:gap-8">
                          <span className="font-mono text-xs text-[#666666] group-hover:text-[#e4e3db] transition-colors">
                            {item.index}
                          </span>
                          <span className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-tight">
                            {item.label}
                          </span>
                        </div>
                        <ArrowUpRight className="size-5 text-[#666666] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </a>
                    ) : (
                      <a
                        href={item.href}
                        tabIndex={isOpen ? 0 : -1}
                        onClick={() => handleLinkClick()}
                        className="noir-menu-link-inner group flex items-baseline justify-between py-4 md:py-5 transition-colors hover:text-white"
                      >
                        <div className="flex items-baseline gap-4 md:gap-8">
                          <span className="font-mono text-xs text-[#666666] group-hover:text-[#e4e3db] transition-colors">
                            {item.index}
                          </span>
                          <span className="font-heading text-4xl sm:text-5xl md:text-6xl tracking-tight">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#666666] opacity-0 group-hover:opacity-100 transition-opacity">
                          [ Jump ]
                        </span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Secondary Metadata & Quick Actions */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-10 lg:pt-10 lg:pl-8">
              <div className="noir-menu-meta space-y-3 border-t border-[#e4e3db]/12 pt-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#666666]">
                  Profile
                </p>
                <p className="text-base leading-relaxed text-[#e4e3db]/85 max-w-md">
                  Adriana Eka Prayudha — Fullstack Developer crafting resilient
                  web platforms and cross-platform mobile applications with
                  minimal architectural discipline.
                </p>
              </div>

              <div className="noir-menu-meta grid grid-cols-2 gap-6 border-t border-[#e4e3db]/12 pt-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#666666] mb-2">
                    Base
                  </p>
                  <p className="text-sm text-[#e4e3db]">Bandung, Indonesia</p>
                  <p className="font-mono text-xs text-[#8c8a82] mt-1 tabular-nums">
                    {clock}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#666666] mb-2">
                    Direct
                  </p>
                  <a
                    href="mailto:hello@radenadri.xyz"
                    tabIndex={isOpen ? 0 : -1}
                    onClick={() => onTrack("mail_link_clicked")}
                    className="text-sm text-[#e4e3db] underline underline-offset-4 decoration-[#e4e3db]/30 hover:decoration-white"
                  >
                    hello@radenadri.xyz
                  </a>
                  <div className="mt-2">
                    <a
                      href="https://cv.radenadri.xyz"
                      target="_blank"
                      rel="noopener noreferrer"
                      tabIndex={isOpen ? 0 : -1}
                      className="font-mono text-xs uppercase tracking-[0.08em] text-[#8c8a82] hover:text-white transition-colors"
                    >
                      Resume ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="noir-menu-meta border-t border-[#e4e3db]/12 pt-6">
                <button
                  type="button"
                  tabIndex={isOpen ? 0 : -1}
                  onClick={() => {
                    setIsOpen(false);
                    onTrack("see_more_work_clicked");
                    onOpenFlipbook();
                  }}
                  className="w-full flex items-center justify-between border border-[#e4e3db]/20 bg-[#0f0f0f] px-5 py-4 text-left hover:bg-[#e4e3db] hover:text-[#0f0f0f] transition-colors cursor-pointer group"
                >
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.12em] block opacity-70">
                      PDF Presentation
                    </span>
                    <span className="font-heading text-2xl">
                      Open Interactive Flipbook
                    </span>
                  </div>
                  <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </div>

          <div className="noir-menu-meta mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#e4e3db]/12 pt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-[#666666]">
            <span>© 2025 Adriana Eka Prayudha</span>
            <span>radenadri.xyz</span>
          </div>
        </div>
      </div>
    </>
  );
}
