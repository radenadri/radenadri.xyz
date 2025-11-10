'use client';

import { createContext, useContext, useState, useEffect } from 'react';
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
    sessionStorage.setItem('preloader-shown', 'true');
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
