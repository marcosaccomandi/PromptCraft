import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';

// --- Theme Management ---
export type Theme = 'light' | 'dark' | 'minimal' | 'pixel' | 'cyberpunk' | 'colorblind' | 'colorful' | 'google' | 'pastel';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, rawSetTheme] = useState<Theme>('light');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    if (storedTheme) {
      rawSetTheme(storedTheme);
      document.documentElement.className = storedTheme;
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    rawSetTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.className = newTheme;
  };

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};