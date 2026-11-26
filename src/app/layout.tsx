import Clarity from "@microsoft/clarity";
import type { Metadata } from "next";
import { JetBrains_Mono, Urbanist } from "next/font/google";
import Script from "next/script";
import { Layout } from "@/components/ds";
import { PreloaderProvider } from "@/components/preloader-provider";
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider";
import { ThemeProvider } from "@/components/theme-provider";

import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urbanist",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Adriana Eka Prayudha — Artistry and Engineering",
  description:
    "Fullstack Developer based in Bandung, Indonesia. Building modern web and mobile systems with minimal design.",
  keywords: [
    "Fullstack Developer",
    "Web Developer",
    "Mobile Developer",
    "PHP",
    "Laravel",
    "React",
    "JavaScript",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "Adriana Eka Prayudha" }],
  creator: "Adriana Eka Prayudha",
  openGraph: {
    title: "Adriana Eka Prayudha — Artistry and Engineering",
    description:
      "Fullstack Developer based in Bandung, Indonesia. Building modern web and mobile systems with clean code & minimal design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adriana Eka Prayudha — Artistry and Engineering",
    description:
      "Fullstack Developer specializing in modern web and mobile technologies.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Root layout configuring Soren-style Urbanist + JetBrains Mono typography,
 * Lenis smooth scrolling, and dark theme polarity.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const projectId = "u0xerc2qcw";
  Clarity.init(projectId);

  return (
    <Layout className={`dark ${urbanist.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[hsl(0_0%_7.5%)] text-[hsl(0_0%_90%)] selection:bg-[hsl(0_0%_90%)] selection:text-[hsl(0_0%_7.5%)]">
        <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
          <SmoothScrollProvider>
            <PreloaderProvider>{children}</PreloaderProvider>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
      <Script
        id="microsoft-clarity-init"
        strategy="afterInteractive"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Microsoft Clarity initialization snippet
        dangerouslySetInnerHTML={{
          __html: `(function(c,l,a,r,i,t,y){
                      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "${projectId}");`,
        }}
      />
    </Layout>
  );
}
