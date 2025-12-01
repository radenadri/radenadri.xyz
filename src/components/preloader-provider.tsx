'use client';

import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { Preloader } from './preloader';

interface PreloaderContextValue {
  isLoading: boolean;
}

const PreloaderContext = createContext<PreloaderContextValue | undefined>(
  undefined
);

export function PreloaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [showPreloader, setShowPreloader] = useState(true);
  const pathname = usePathname();
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if (isFirstLoadRef.current) {
      isFirstLoadRef.current = false;
      return;
    }

    setIsLoading(true);
    setShowPreloader(true);
  }, [pathname]);

  // useEffect(() => {
  //   // Check if preloader has been shown in this session
  //   const hasShownPreloader = sessionStorage.getItem('preloader-shown');

  //   if (hasShownPreloader) {
  //     setIsLoading(false);
  //     setShowPreloader(false);
  //   }
  // }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Small delay before removing from DOM
    setTimeout(() => {
      setShowPreloader(false);
    }, 100);
  };

  return (
    <PreloaderContext.Provider value={{ isLoading }}>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        {children}
      </div>
    </PreloaderContext.Provider>
  );
}

export const usePreloader = () => {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within PreloaderProvider');
  }
  return context;
};
