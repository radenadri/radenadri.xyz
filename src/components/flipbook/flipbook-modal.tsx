"use client";

import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FlipbookViewer } from "./flipbook-viewer";
import { loadOrPreloadPdf } from "./pdf-loader";

/**
 * Interface definition for FlipbookModal props.
 */
export interface FlipbookModalProps {
  /** Controls modal visibility */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** Optional custom URL to the PDF file (defaults to /portfolio.pdf) */
  pdfUrl?: string;
  /** Optional document title */
  title?: string;
}

/**
 * Interactive In-Page Landscape Slide Deck Modal.
 *
 * Provides an accessible, responsive presentation viewer for PDF documents with
 * 3D landscape flip transitions, zoom, fullscreen, and thumbnail navigation.
 *
 * @param props - Flipbook modal properties
 * @returns JSX Element
 */
export function FlipbookModal({
  isOpen,
  onClose,
  pdfUrl = "/portfolio.pdf",
  title = "Selected Works & Archive",
}: FlipbookModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(21);
  const [zoom, setZoom] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll and trigger immediate preload when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      loadOrPreloadPdf(pdfUrl)
        .then((data) => {
          setTotalPages(data.totalPages);
        })
        .catch(() => {});
    } else {
      document.body.style.overflow = "";
      setCurrentPage(1);
      setZoom(1);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, pdfUrl]);

  // Keyboard navigation shortcuts
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      } else if (e.key === "+" || e.key === "=") {
        e.preventDefault();
        setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(1)), 2.0));
      } else if (e.key === "-") {
        e.preventDefault();
        setZoom((prev) => Math.max(Number((prev - 0.2).toFixed(1)), 0.8));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFullscreen, onClose, totalPages]);

  const handleZoomIn = useCallback(() => {
    setZoom((prev) => Math.min(Number((prev + 0.2).toFixed(1)), 2.0));
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoom((prev) => Math.max(Number((prev - 0.2).toFixed(1)), 0.8));
  }, []);

  const handleZoomReset = useCallback(() => {
    setZoom(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTotalPagesChange = useCallback((total: number) => {
    setTotalPages(total);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!modalRef.current) return;
    if (!document.fullscreenElement) {
      modalRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/65 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          {/* Main Modal Window */}
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "relative flex flex-col w-full h-[92vh] max-w-5xl rounded-2xl overflow-hidden bg-[var(--cream)] border border-[var(--border-light)] shadow-2xl transition-all duration-300",
              isFullscreen &&
                "w-screen h-screen max-w-none rounded-none border-none",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Toolbar Header */}
            <header className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-[var(--border-light)] bg-white/85 backdrop-blur-md z-20">
              {/* Document Identity */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[var(--green-light)] text-[var(--green-dark)] flex items-center justify-center shadow-2xs">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-medium text-[var(--text-primary)] leading-none">
                      {title}
                    </h3>
                    <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-medium bg-[var(--green-light)] text-[var(--green-dark)] rounded-full">
                      Slide Deck
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-muted)] hidden md:block">
                    Interactive Landscape Presentation
                  </p>
                </div>
              </div>

              {/* Page Controls Center */}
              <div className="flex items-center gap-1.5 bg-[var(--cream-dark)] px-3 py-1.5 rounded-full border border-[var(--border-light)]">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage <= 1}
                  aria-label="Previous slide"
                  className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-medium px-2 text-[var(--text-primary)]">
                  Slide {currentPage}{" "}
                  <span className="text-[var(--text-muted)]">/</span>{" "}
                  {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages}
                  aria-label="Next slide"
                  className="p-1 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Action Tools Right */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Zoom Controls (Hidden on small mobile) */}
                <div className="hidden sm:flex items-center gap-1 bg-[var(--cream-dark)] p-1 rounded-lg border border-[var(--border-light)]">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.8}
                    aria-label="Zoom Out"
                    className="p-1.5 rounded hover:bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    aria-label="Reset Zoom"
                    className="flex items-center gap-1 px-1.5 py-1 rounded text-[11px] font-mono hover:bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-[var(--text-muted)]" />
                    <span>{Math.round(zoom * 100)}%</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoom >= 2.0}
                    aria-label="Zoom In"
                    className="p-1.5 rounded hover:bg-white text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Fullscreen Toggle */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--cream-dark)] border border-transparent hover:border-[var(--border-light)] transition-colors cursor-pointer hidden md:flex"
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>

                {/* Download PDF Button */}
                <a
                  href={pdfUrl}
                  download="adrian-portfolio-archive.pdf"
                  aria-label="Download PDF"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--green-primary)] text-white hover:bg-[var(--green-dark)] text-xs font-medium transition-colors shadow-xs cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close presentation deck"
                  className="p-2 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--cream-dark)] border border-transparent hover:border-[var(--border-light)] transition-colors cursor-pointer ml-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </header>

            {/* Slide Content Body */}
            <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-[var(--cream)] p-2">
              <FlipbookViewer
                pdfUrl={pdfUrl}
                zoom={zoom}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onTotalPagesChange={handleTotalPagesChange}
              />
            </div>

            {/* Bottom Landscape Thumbnail Strip */}
            <footer className="border-t border-[var(--border-light)] bg-white/75 backdrop-blur-md px-4 py-2 z-20">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-[var(--text-muted)] uppercase tracking-wider">
                  Slide Thumbnails
                </span>
                <span className="text-[10px] text-[var(--text-muted)] font-mono">
                  Gunakan tombol panah ← → untuk navigasi
                </span>
              </div>
              <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (pageNum) => {
                    const isActive = currentPage === pageNum;
                    return (
                      <button
                        key={`thumb-slide-${pageNum}`}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        aria-label={`Jump to slide ${pageNum}`}
                        className={cn(
                          "relative flex-shrink-0 w-16 h-10 rounded-md border text-center flex flex-col items-center justify-center transition-all duration-200 cursor-pointer aspect-[16/10]",
                          isActive
                            ? "border-[var(--green-primary)] bg-[var(--green-light)] text-[var(--green-dark)] shadow-sm scale-105"
                            : "border-[var(--border-light)] bg-[var(--cream-dark)] text-[var(--text-secondary)] hover:border-[var(--green-primary)]/50 hover:bg-white",
                        )}
                      >
                        <span className="text-[10px] font-mono font-semibold">
                          {pageNum}
                        </span>
                      </button>
                    );
                  },
                )}
              </div>
            </footer>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default FlipbookModal;
