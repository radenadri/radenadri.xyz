"use client";

import { useEffect, useRef } from "react";

interface ParticlePoint {
  bx: number;
  by: number;
  bz: number;
  ox: number;
  oy: number;
  size: number;
  alpha: number;
}

/**
 * Interactive 3D Fibonacci particle sphere rendered on HTML5 Canvas.
 * Listens on window pointermove so mouse tilt and particle repulsion respond
 * reliably across the entire 100vh hero, matching 2024-04-CGMWT (Soren).
 */
export function ParticleSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const particleCount = 1600;
    const points: ParticlePoint[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < particleCount; i++) {
      const y = 1 - (i / (particleCount - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const shellJitter = 0.86 + ((i * 73) % 100) * 0.0024;

      points.push({
        bx: Math.cos(theta) * radiusAtY * shellJitter,
        by: y * shellJitter,
        bz: Math.sin(theta) * radiusAtY * shellJitter,
        ox: 0,
        oy: 0,
        size: 0.75 + ((i * 37) % 10) * 0.12,
        alpha: 0.32 + ((i * 53) % 10) * 0.055,
      });
    }

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = 0;
    let angleY = 0.35;
    const angleX = 0.18;

    const pointer = {
      normX: 0,
      normY: 0,
      targetNormX: 0,
      targetNormY: 0,
      clientX: -9999,
      clientY: -9999,
      active: false,
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      pointer.clientX = localX;
      pointer.clientY = localY;
      pointer.targetNormX = Math.max(
        -1,
        Math.min(1, (localX / rect.width) * 2 - 1),
      );
      pointer.targetNormY = Math.max(
        -1,
        Math.min(1, (localY / rect.height) * 2 - 1),
      );
      pointer.active =
        localX >= 0 &&
        localX <= rect.width &&
        localY >= 0 &&
        localY <= rect.height;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetNormX = 0;
      pointer.targetNormY = 0;
    };

    const drawFrame = () => {
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const sphereRadius = Math.min(width, height) * 0.3;
      const fov = 720;

      pointer.normX += (pointer.targetNormX - pointer.normX) * 0.07;
      pointer.normY += (pointer.targetNormY - pointer.normY) * 0.07;

      const rotY = angleY + pointer.normX * 1.15;
      const rotX = angleX + pointer.normY * 0.85;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const repelRadius = 155;
      const repelRadiusSq = repelRadius * repelRadius;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        const x1 = p.bx * cosY - p.bz * sinY;
        const z1 = p.bz * cosY + p.bx * sinY;
        const y2 = p.by * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.by * sinX;

        const worldX = x1 * sphereRadius;
        const worldY = y2 * sphereRadius;
        const worldZ = z2 * sphereRadius;

        const scale = fov / (fov + worldZ + sphereRadius * 0.4);
        const baseX = cx + worldX * scale;
        const baseY = cy + worldY * scale;

        let targetOx = 0;
        let targetOy = 0;

        if (pointer.active) {
          const dx = baseX - pointer.clientX;
          const dy = baseY - pointer.clientY;
          const distSq = dx * dx + dy * dy;
          if (distSq < repelRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / repelRadius) * 48;
            targetOx = (dx / dist) * force;
            targetOy = (dy / dist) * force;
          }
        }

        p.ox += (targetOx - p.ox) * 0.14;
        p.oy += (targetOy - p.oy) * 0.14;

        const sx = baseX + p.ox;
        const sy = baseY + p.oy;

        const depthFactor = Math.max(0.15, Math.min(1, (z2 + 1.1) * 0.52));
        const finalAlpha = p.alpha * depthFactor;

        ctx.fillStyle = `rgba(230, 230, 230, ${finalAlpha.toFixed(3)})`;
        ctx.fillRect(sx, sy, p.size * scale, p.size * scale);
      }

      if (!prefersReduced) {
        angleY += 0.002;
        animationId = window.requestAnimationFrame(drawFrame);
      }
    };

    drawFrame();

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="h-full w-full block cursor-crosshair" />
  );
}
