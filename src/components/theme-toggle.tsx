'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from './theme-provider';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light';
      case 'dark':
        return 'Dark';
      case 'system':
        return 'System';
      default:
        return 'Light';
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[9999] flex items-center gap-2 px-3 py-2 rounded-full bg-background/90 backdrop-blur-md border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 hover:scale-105 shadow-lg"
      aria-label={`Switch to ${
        theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
      } theme`}
    >
      {getIcon()}
      <span className="text-sm font-medium hidden sm:inline">{getLabel()}</span>
    </button>
  );
}
