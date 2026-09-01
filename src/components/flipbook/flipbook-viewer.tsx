"use client";

import { BookOpen, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getCachedPdf, loadOrPreloadPdf, type PageData } from "./pdf-loader";

/**
 * Interface definition for flipbook viewer configuration.
 */
export interface FlipbookViewerProps {
  /** Path to the PDF document */
  pdfUrl: string;
  /** Current zoom level factor (1.0 = 100%) */
  zoom: number;
  /** Callback fired when total page count is discovered */
  onTotalPagesChange?: (total: number) => void;
  /** Callback fired when the active page index changes */
  onPageChange?: (page: number) => void;
  /** Current active page index controlled from parent toolbar (1-based) */
  currentPage: number;
}

const DEFAULT_ASPECT_RATIO = 16 / 9;

/**
 * PDF Flipbook Core Viewer Component for Landscape Presentation Decks.
 *
 * Renders presentation slides with auto-detected landscape aspect ratio (16:9),
 * 3D perspective flip transitions, touch swipe gestures, and global in-memory caching.
 *
 * @param props - Flipbook configuration properties
 * @returns JSX Element
 */
export function FlipbookViewer({
  pdfUrl,
  zoom,
  onTotalPagesChange,
  onPageChange,
  currentPage,
}: FlipbookViewerProps) {
  // Initialize state directly from global cache if available to prevent any layout shift or loading flicker
  const initialCache = getCachedPdf(pdfUrl);
  const [pages, setPages] = useState<PageData[]>(
    () => initialCache?.pages || [],
  );
  const [aspectRatio, setAspectRatio] = useState<number>(
    () => initialCache?.aspectRatio || DEFAULT_ASPECT_RATIO,
  );
  const [isLoading, setIsLoading] = useState<boolean>(() => !initialCache);
  const [loadingProgress, setLoadingProgress] = useState<number>(() =>
    initialCache ? 100 : 0,
  );
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev" | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  // Store totalPages callback in a ref to decouple it from effect dependencies (rerender-dependencies)
  const onTotalPagesChangeRef = useRef(onTotalPagesChange);
  useEffect(() => {
    onTotalPagesChangeRef.current = onTotalPagesChange;
  }, [onTotalPagesChange]);

  // Load and cache PDF slides (only re-runs if pdfUrl changes)
  useEffect(() => {
    let isCancelled = false;

    // If already in memory cache, notify parent and complete immediately
    const existingCache = getCachedPdf(pdfUrl);
    if (existingCache) {
      setPages(existingCache.pages);
      setAspectRatio(existingCache.aspectRatio);
      setIsLoading(false);
      onTotalPagesChangeRef.current?.(existingCache.totalPages);
      return;
    }

    setIsLoading(true);

    loadOrPreloadPdf(pdfUrl, (progress) => {
      if (!isCancelled) {
        setLoadingProgress(progress);
      }
    })
      .then((data) => {
        if (!isCancelled) {
          setPages(data.pages);
          setAspectRatio(data.aspectRatio);
          setIsLoading(false);
          onTotalPagesChangeRef.current?.(data.totalPages);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [pdfUrl]);

  const totalPages = pages.length > 0 ? pages.length : 1;

  // Active slide memoization (rerender-memo)
  const activePageData = useMemo(() => {
    return pages.find((p) => p.pageNumber === currentPage) || null;
  }, [pages, currentPage]);

  const handleNextPage = useCallback(() => {
    if (isFlipping) return;
    const nextPage = Math.min(currentPage + 1, totalPages);
    if (nextPage !== currentPage) {
      setIsFlipping(true);
      setFlipDirection("next");
      setTimeout(() => {
        onPageChange?.(nextPage);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 350);
    }
  }, [isFlipping, currentPage, totalPages, onPageChange]);

  const handlePrevPage = useCallback(() => {
    if (isFlipping) return;
    const prevPage = Math.max(currentPage - 1, 1);
    if (prevPage !== currentPage) {
      setIsFlipping(true);
      setFlipDirection("prev");
      setTimeout(() => {
        onPageChange?.(prevPage);
        setIsFlipping(false);
        setFlipDirection(null);
      }, 350);
    }
  }, [isFlipping, currentPage, onPageChange]);

  // Touch gesture support for mobile swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNextPage();
      } else {
        handlePrevPage();
      }
    }
    touchStartX.current = null;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex flex-col items-center justify-center select-none py-2"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Interactive Navigation Trigger (Left Side Overlay) */}
      {!isLoading && currentPage > 1 ? (
        <button
          type="button"
          onClick={handlePrevPage}
          aria-label="Previous Slide"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[var(--text-primary)] hover:text-[var(--green-primary)] border border-[var(--border-light)] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : null}

      {/* Interactive Navigation Trigger (Right Side Overlay) */}
      {!isLoading && currentPage < totalPages ? (
        <button
          type="button"
          onClick={handleNextPage}
          aria-label="Next Slide"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white text-[var(--text-primary)] hover:text-[var(--green-primary)] border border-[var(--border-light)] shadow-lg backdrop-blur-md flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      ) : null}

      {/* Single Landscape Presentation Slide Container with Dynamic Zoom */}
      <div
        className="w-full max-w-5xl flex items-center justify-center px-4 md:px-10 transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      >
        <div className="relative w-full flex items-center justify-center perspective-[1500px]">
          <div
            style={{ aspectRatio: `${aspectRatio}` }}
            className={cn(
              "relative w-full max-h-[62vh] bg-black/95 rounded-xl overflow-hidden border border-[var(--border-light)] shadow-2xl transition-all duration-300 flex items-center justify-center",
              !isLoading && isFlipping && flipDirection === "next"
                ? "animate-page-flip-right"
                : !isLoading && isFlipping && flipDirection === "prev"
                  ? "animate-page-flip-left"
                  : "",
            )}
          >
            {isLoading ? (
              /* Subtle Inline Slide Loader during first-time preloading */
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-[var(--green-light)] flex items-center justify-center text-[var(--green-primary)] mb-3 shadow-xs animate-pulse">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)] font-medium mb-3">
                  <Loader2 className="w-4 h-4 animate-spin text-[var(--green-primary)]" />
                  <span>Memuat Slide Presentasi...</span>
                </div>
                <div className="w-36 h-1.5 bg-[var(--cream-dark)] rounded-full overflow-hidden border border-[var(--border-light)]">
                  <div
                    className="h-full bg-[var(--green-primary)] transition-all duration-200 rounded-full"
                    style={{ width: `${loadingProgress}%` }}
                  />
                </div>
              </div>
            ) : activePageData ? (
              /* biome-ignore lint/performance/noImgElement: dynamically generated high-DPI canvas DataURL for landscape slide deck */
              <img
                src={activePageData.dataUrl}
                alt={`Slide ${activePageData.pageNumber}`}
                className="w-full h-full object-contain pointer-events-none select-none"
              />
            ) : (
              <div className="w-full h-full bg-[var(--cream-dark)] flex items-center justify-center text-[var(--text-secondary)] text-sm">
                Slide tidak ditemukan
              </div>
            )}

            {/* Slide Index Badge */}
            {!isLoading && (
              <span className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-black/40 text-white/80 backdrop-blur-xs">
                {currentPage} / {totalPages}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipbookViewer;
