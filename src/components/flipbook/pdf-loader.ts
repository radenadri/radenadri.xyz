/**
 * Global In-Memory PDF Preloader & Cache Engine.
 *
 * Implements module-level caching and background preloading for PDF slide decks,
 * eliminating re-rendering overhead and providing instantaneous 60fps page transitions.
 *
 * @module pdf-loader
 */

export interface PageData {
  pageNumber: number;
  dataUrl: string;
  width: number;
  height: number;
}

export interface PdfCacheItem {
  pages: PageData[];
  aspectRatio: number;
  totalPages: number;
}

const DEFAULT_ASPECT_RATIO = 16 / 9;
const RENDER_SCALE = 2.0;

// Module-level global cache to persist parsed pages across renders and modal toggles
const pdfCache = new Map<string, PdfCacheItem>();
const activeLoadingPromises = new Map<string, Promise<PdfCacheItem>>();

/**
 * Retrieves cached PDF slides if already rendered.
 *
 * @param pdfUrl - The URL or local path to the PDF document
 * @returns Cached PDF data or null if not yet cached
 */
export function getCachedPdf(pdfUrl: string): PdfCacheItem | null {
  return pdfCache.get(pdfUrl) || null;
}

/**
 * Loads and caches all PDF pages into high-DPI canvas DataURLs.
 * Deduplicates in-flight requests and returns existing cached data immediately.
 *
 * @param pdfUrl - The URL or local path to the PDF document
 * @param onProgress - Optional progress callback percentage (0-100)
 * @returns Promise resolving to the complete PdfCacheItem
 */
export async function loadOrPreloadPdf(
  pdfUrl: string,
  onProgress?: (progress: number) => void,
): Promise<PdfCacheItem> {
  const cached = pdfCache.get(pdfUrl);
  if (cached) {
    onProgress?.(100);
    return cached;
  }

  const existingPromise = activeLoadingPromises.get(pdfUrl);
  if (existingPromise) {
    return existingPromise;
  }

  const loadPromise = (async (): Promise<PdfCacheItem> => {
    try {
      onProgress?.(10);

      // Load PDF.js dynamically via CDN in the browser
      const importCDN = new Function(
        "url",
        "return import(/* webpackIgnore: true */ url)",
      );
      // biome-ignore lint/suspicious/noExplicitAny: dynamic external library loaded at runtime
      const pdfjsLib: any = await importCDN(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs",
      );

      if (pdfjsLib.GlobalWorkerOptions) {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs";
      }

      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        cMapUrl: "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/cmaps/",
        cMapPacked: true,
      });

      const pdfDoc = await loadingTask.promise;
      const total = pdfDoc.numPages;
      const renderedPages: PageData[] = [];
      let detectedAspectRatio = DEFAULT_ASPECT_RATIO;

      for (let i = 1; i <= total; i++) {
        const page = await pdfDoc.getPage(i);
        const viewport = page.getViewport({ scale: RENDER_SCALE });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (i === 1 && viewport.width > 0 && viewport.height > 0) {
          detectedAspectRatio = viewport.width / viewport.height;
        }

        if (context) {
          await page.render({
            canvasContext: context,
            viewport: viewport,
          }).promise;

          renderedPages.push({
            pageNumber: i,
            dataUrl: canvas.toDataURL("image/webp", 0.92),
            width: viewport.width,
            height: viewport.height,
          });
        }

        onProgress?.(Math.round((i / total) * 90) + 10);
      }

      const result: PdfCacheItem = {
        pages: renderedPages,
        aspectRatio: detectedAspectRatio,
        totalPages: total,
      };

      pdfCache.set(pdfUrl, result);
      return result;
    } finally {
      activeLoadingPromises.delete(pdfUrl);
    }
  })();

  activeLoadingPromises.set(pdfUrl, loadPromise);
  return loadPromise;
}
