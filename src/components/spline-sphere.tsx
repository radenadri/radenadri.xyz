"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
});

/**
 * Exact 2024-04-CGMWT (Soren) interactive 3D Spline particle sphere hero backdrop.
 */
export function SplineSphere() {
  return (
    <div className="relative w-full h-full">
      <Spline
        scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
