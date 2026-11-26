"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * 2024-04-CGMWT (Soren) styled global error boundary view.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[hsl(0_0%_7.5%)] text-[hsl(0_0%_90%)] px-6 py-20 flex items-center justify-center">
      <div className="relative mx-auto flex w-full max-w-md flex-col items-center text-center gap-6 rounded-[8px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)] p-8">
        <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
          500 — Runtime Exception
        </span>

        <div className="space-y-2">
          <h1 className="text-[16px] font-medium text-[hsl(0_0%_90%)]">
            Something went wrong
          </h1>
          <p className="text-[14px] text-[hsl(0_0%_60%)]">
            An unexpected error occurred. The trace has been logged.
          </p>
        </div>

        <div className="flex w-full flex-col sm:flex-row gap-2 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full rounded-[8px] bg-[hsl(0_0%_12.5%)] hover:bg-[hsl(0_0%_16%)] py-3 text-[14px] font-medium text-[hsl(0_0%_90%)] transition-colors cursor-pointer"
          >
            ↻ Try Again
          </button>
          <Link
            href="/"
            className="w-full rounded-[8px] border border-[hsl(0_0%_15%)] py-3 text-[14px] font-medium text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
