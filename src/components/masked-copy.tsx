"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import React, { type ReactElement, useRef } from "react";

gsap.registerPlugin(SplitText, ScrollTrigger);

interface MaskedCopyProps {
  children: ReactElement;
  animateOnScroll?: boolean;
  delay?: number;
}

/**
 * Font-gated SplitText masked line reveal following the Codegrid WuWei/Terrene
 * pattern. Respects prefers-reduced-motion and reverts SplitText wrappers on unmount.
 */
export function MaskedCopy({
  children,
  animateOnScroll = true,
  delay = 0,
}: MaskedCopyProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReduced) return;

      const splits: SplitText[] = [];
      let cancelled = false;

      const init = async () => {
        await document.fonts.ready;
        if (cancelled) return;

        const targets = el.hasAttribute("data-copy-wrapper")
          ? (Array.from(el.children) as HTMLElement[])
          : [el];

        const allLines: HTMLElement[] = [];

        for (const target of targets) {
          const split = SplitText.create(target, {
            type: "lines",
            mask: "lines",
            linesClass: "line++",
            lineThreshold: 0.1,
          });
          splits.push(split);

          const indent = window.getComputedStyle(target).textIndent;
          if (indent && indent !== "0px" && split.lines.length > 0) {
            (split.lines[0] as HTMLElement).style.paddingLeft = indent;
            target.style.textIndent = "0";
          }
          allLines.push(...(split.lines as HTMLElement[]));
        }

        if (allLines.length === 0) return;

        gsap.set(allLines, { y: "100%" });

        gsap.to(allLines, {
          y: "0%",
          duration: 0.95,
          stagger: 0.08,
          ease: "power4.out",
          delay,
          ...(animateOnScroll
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  once: true,
                },
              }
            : {}),
        });
      };

      init();

      return () => {
        cancelled = true;
        for (const split of splits) {
          split.revert();
        }
      };
    },
    { scope: containerRef, dependencies: [animateOnScroll, delay] },
  );

  return React.cloneElement(children, {
    ref: containerRef,
  } as Record<string, unknown>);
}
