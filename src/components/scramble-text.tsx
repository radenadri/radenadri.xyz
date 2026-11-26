"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

/**
 * Lightweight character-scramble text effect triggered when its interactive
 * parent row (anchor/button) is hovered, matching 2024-04-CGMWT (Soren).
 */
export function ScrambleText({ text, className }: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const spanRef = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<number | null>(null);

  const triggerScramble = useCallback(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
    }

    let iteration = 0;
    const total = text.length;

    timerRef.current = window.setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) return text[index];
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join(""),
      );

      iteration += 1 / 2;
      if (iteration >= total && timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplay(text);
      }
    }, 22);
  }, [text]);

  useEffect(() => {
    const el = spanRef.current;
    const triggerTarget = el?.closest("a, button") ?? el;
    if (!triggerTarget) return;

    triggerTarget.addEventListener("mouseenter", triggerScramble);
    return () => {
      triggerTarget.removeEventListener("mouseenter", triggerScramble);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }
    };
  }, [triggerScramble]);

  return (
    <span ref={spanRef} className={className}>
      {display}
    </span>
  );
}
