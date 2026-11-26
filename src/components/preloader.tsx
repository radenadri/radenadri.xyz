"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useRef, useState } from "react";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

interface PreloaderProps {
  onComplete?: () => void;
}

/**
 * Fast (~1.1s) noir-editorial preloader with stepped progress digits and
 * CustomEase("hop") clip-path curtain exit.
 */
export function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState("00");
  const overlayRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = overlayRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReduced) {
        onComplete?.();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      const steps = [
        { val: "27", scale: 0.27, at: 0.12 },
        { val: "64", scale: 0.64, at: 0.34 },
        { val: "99", scale: 0.99, at: 0.58 },
        { val: "100", scale: 1, at: 0.72 },
      ];

      for (const step of steps) {
        tl.call(() => setCount(step.val), undefined, step.at);
        if (barRef.current) {
          tl.to(
            barRef.current,
            {
              scaleX: step.scale,
              duration: 0.18,
              ease: "power2.out",
            },
            step.at,
          );
        }
      }

      if (digitsRef.current) {
        tl.to(
          digitsRef.current,
          {
            yPercent: -25,
            opacity: 0,
            duration: 0.25,
            ease: "power3.in",
          },
          0.78,
        );
      }

      tl.to(
        el,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.65,
          ease: "hop",
        },
        0.85,
      );
    },
    { scope: overlayRef },
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-[#0f0f0f] text-[#e4e3db] p-6 md:p-10 pointer-events-none"
    >
      {/* Top 2px ScaleX Progress Bar */}
      <div className="w-full h-[2px] bg-[#e4e3db]/10 overflow-hidden">
        <div
          ref={barRef}
          style={{ transform: "scaleX(0)" }}
          className="h-full w-full origin-left bg-[#e4e3db]"
        />
      </div>

      {/* Bottom Editorial Telemetry & Stepped Counter */}
      <div className="flex items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#8c8a82]">
            Adriana Eka Prayudha
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#5c5b55]">
            Bandung, Indonesia — Portfolio Index
          </p>
        </div>

        <div ref={digitsRef} className="overflow-hidden">
          <span className="font-heading text-6xl md:text-8xl leading-none tabular-nums tracking-tight text-[#e4e3db]">
            {count}
          </span>
        </div>
      </div>
    </div>
  );
}
