import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work — Adriana Eka Prayudha",
  description: "Case studies and detailed write-ups of selected work.",
};

/**
 * Shared 2024-04-CGMWT (Soren) page-post shell for MDX case studies under /work/*.
 */
export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="work-soren relative min-h-screen w-full overflow-x-clip bg-[hsl(0_0%_7.5%)] text-[hsl(0_0%_90%)]">
      <div className="relative z-10 flex min-h-screen w-full flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 w-full border-b border-[hsl(0_0%_15%)] bg-[hsl(0_0%_7.5%)]/90 backdrop-blur-md">
          <div className="mx-auto flex w-full lg:w-[50%] items-center justify-between px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors"
            >
              <span aria-hidden="true">←</span>
              <span>Back to home</span>
            </Link>
            <span className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
              Case Study
            </span>
          </div>
        </header>

        {/* Main Content — Soren 50% centered page-post */}
        <main className="mx-auto w-full lg:w-[50%] grow px-4 py-12">
          <article className="flex w-full flex-col gap-10">{children}</article>
        </main>

        {/* Footer */}
        <footer className="border-t border-[hsl(0_0%_15%)] py-6">
          <div className="mx-auto flex w-full lg:w-[50%] items-center justify-between px-4">
            <Link
              href="/#works"
              className="text-[14px] text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] transition-colors"
            >
              ← View all works
            </Link>
            <p className="font-mono text-[12px] text-[hsl(0_0%_40%)]">
              radenadri.xyz
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
