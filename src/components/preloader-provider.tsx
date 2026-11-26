"use client";

import { createContext, useContext } from "react";

interface PreloaderContextValue {
  isLoading: boolean;
}

const PreloaderContext = createContext<PreloaderContextValue>({
  isLoading: false,
});

/**
 * Non-blocking pass-through provider preserving AnimatedElement compatibility
 * while allowing immediate 100vh hero rendering per 2024-04-CGMWT (Soren).
 */
export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  return (
    <PreloaderContext.Provider value={{ isLoading: false }}>
      <div className="w-full min-h-screen">{children}</div>
    </PreloaderContext.Provider>
  );
}

/**
 * Returns preloader state (always ready in Soren layout).
 */
export const usePreloader = () => useContext(PreloaderContext);
