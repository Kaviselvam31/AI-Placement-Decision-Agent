import { useEffect, useState } from 'react';

const STORAGE_KEY = 'placement-ai-theme';

export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
      window.localStorage.setItem(STORAGE_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
      window.localStorage.setItem(STORAGE_KEY, 'light');
    }
  }, [isDark]);

  return { isDark, toggle: () => setIsDark((v) => !v) };
}
