"use client";

import { Download, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FlipbookViewer } from "./flipbook-viewer";
import { loadOrPreloadPdf } from "./pdf-loader";

export interface FlipbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl?: string;
  title?: string;
}

/**
 * Minimalist Soren-styled PDF slide deck modal with clean top bar and full-focus canvas.
 */
export function FlipbookModal({
  isOpen,
  onClose,
  pdfUrl = "/portfolio.pdf",
  title = "Selected Works",
}: FlipbookModalProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(21);
  const modalRef = useRef<HTMLDivElement>(null);

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
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, pdfUrl]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" || e.key === "PageDown") {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, totalPages]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleTotalPagesChange = useCallback((total: number) => {
    setTotalPages(total);
  }, []);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={modalRef}
            initial={{ scale: 0.97, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.97, opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex flex-col w-full h-[88vh] max-w-5xl rounded-[8px] overflow-hidden bg-[hsl(0_0%_7.5%)] text-[hsl(0_0%_90%)] border border-[hsl(0_0%_15%)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal Top Bar */}
            <header className="flex items-center justify-between gap-4 px-4 py-3 border-b border-[hsl(0_0%_15%)] bg-[hsl(0_0%_10%)]">
              <p className="text-[14px] font-medium text-[hsl(0_0%_90%)] truncate">
                {title}
              </p>

              <div className="flex items-center gap-3">
                <span className="font-mono text-[12px] text-[hsl(0_0%_60%)] tabular-nums">
                  {currentPage} / {totalPages}
                </span>

                <a
                  href={pdfUrl}
                  download="adrian-portfolio-archive.pdf"
                  aria-label="Download PDF"
                  title="Download PDF"
                  className="p-2 rounded-[8px] bg-[hsl(0_0%_12.5%)] text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] border border-[hsl(0_0%_15%)] transition-colors"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="p-2 rounded-[8px] bg-[hsl(0_0%_12.5%)] text-[hsl(0_0%_60%)] hover:text-[hsl(0_0%_90%)] border border-[hsl(0_0%_15%)] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Full-Focus Slide Canvas */}
            <div className="relative flex-1 overflow-hidden flex items-center justify-center bg-[hsl(0_0%_7.5%)] p-2 sm:p-4">
              <FlipbookViewer
                pdfUrl={pdfUrl}
                zoom={1}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                onTotalPagesChange={handleTotalPagesChange}
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default FlipbookModal;
