"use client";

import {
  BookOpen,
  FileText,
  FolderOpen,
  Home,
  Layers,
  Mail,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SorenDockProps {
  onOpenFlipbook: () => void;
  onTrack: (tag: string) => void;
}

interface DockEntry {
  id: string;
  label: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  icon: typeof Home;
}

/**
 * Floating bottom-center macOS-inspired magnifying pill dock
 * implementing the hover scale physics of 2024-04-CGMWT (Soren).
 */
export function SorenDock({ onOpenFlipbook, onTrack }: SorenDockProps) {
  const [hoveredIndex, setHoveredIndex] = useState(-100);
  const [hoverEffectsEnabled, setHoverEffectsEnabled] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setHoverEffectsEnabled(window.innerWidth >= 900);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const items: DockEntry[] = [
    { id: "home", label: "Home", href: "#home", icon: Home },
    { id: "services", label: "Services", href: "#services", icon: Layers },
    { id: "works", label: "Selected Work", href: "#works", icon: FolderOpen },
    { id: "about", label: "About", href: "#about", icon: User },
    {
      id: "flipbook",
      label: "See More Work",
      icon: BookOpen,
      onClick: () => {
        onTrack("see_more_work_clicked");
        onOpenFlipbook();
      },
    },
    {
      id: "resume",
      label: "Resume",
      href: "https://cv.radenadri.xyz",
      external: true,
      icon: FileText,
      onClick: () => onTrack("resume_link_clicked"),
    },
    {
      id: "mail",
      label: "Contact",
      href: "mailto:hello@radenadri.xyz",
      external: true,
      icon: Mail,
      onClick: () => onTrack("mail_link_clicked"),
    },
  ];

  const handleMouseEnter = (index: number) => {
    if (hoverEffectsEnabled) {
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (hoverEffectsEnabled) {
      window.setTimeout(() => {
        setHoveredIndex(-100);
      }, 50);
    }
  };

  return (
    <nav
      aria-label="Floating Dock"
      onMouseLeave={handleMouseLeave}
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-max rounded-[40px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_7.5%)]/95 px-2 py-2 backdrop-blur-md"
    >
      <div className="flex items-center justify-around">
        {items.map((item, index) => {
          const isHovered = index === hoveredIndex;
          const isNeighbor = Math.abs(index - hoveredIndex) === 1;
          const scale = isHovered ? 2.5 : isNeighbor ? 2 : 1;
          const margin = isHovered || isNeighbor ? "28px" : "4px";
          const Icon = item.icon;

          const itemStyle = hoverEffectsEnabled
            ? {
                transform: `scale(${scale})`,
                margin: `0 ${margin}`,
              }
            : { margin: "0 3px" };

          const sharedClass = cn(
            "soren-dock-item relative flex size-[32px] md:size-[40px] items-center justify-center rounded-[30px] border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_12.5%)] text-[hsl(0_0%_55%)] hover:text-[hsl(0_0%_90%)] cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-[hsl(0_0%_90%)]",
          );

          if (item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                onClick={item.onClick}
                onMouseEnter={() => handleMouseEnter(index)}
                title={item.label}
                aria-label={item.label}
                style={itemStyle}
                className={sharedClass}
              >
                <Icon className="size-[14px]" />
              </a>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              onMouseEnter={() => handleMouseEnter(index)}
              title={item.label}
              aria-label={item.label}
              style={itemStyle}
              className={sharedClass}
            >
              <Icon className="size-[14px]" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
