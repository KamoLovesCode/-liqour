import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import { Theme, ThemeContextType } from '../types';
import { PRE_CURATED_COLORS } from '../constants';
import { hexToRgb, getContrastColor, tintColor } from '../utils/colors';

const defaultTheme: Theme = {
  primary: PRE_CURATED_COLORS[0].hex,
  isDarkMode: false,
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setThemeColor: () => {},
  toggleDarkMode: () => {},
  setThemeByName: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      const storedTheme = localStorage.getItem('bottlr-theme');
      return storedTheme ? JSON.parse(storedTheme) : defaultTheme;
    } catch (error) {
      return defaultTheme;
    }
  });

  const applyTheme = useCallback((currentTheme: Theme) => {
    const root = document.documentElement;
    const { primary, isDarkMode } = currentTheme;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const primaryRgb = hexToRgb(primary);
    if (!primaryRgb) return;

    // Light mode dynamic colors
    const primaryContainer = tintColor(primary, 0.9);
    const onPrimary = getContrastColor(primary);
    const onPrimaryContainer = tintColor(primary, -0.6);
    
    // Dark mode dynamic colors
    const primaryDark = tintColor(primary, 0.4);
    const primaryContainerDark = tintColor(primary, -0.4);
    const onPrimaryDark = getContrastColor(primaryDark);
    const onPrimaryContainerDark = tintColor(primary, 0.9);

    const primaryRgbDark = hexToRgb(primaryDark);
    const primaryContainerRgb = hexToRgb(primaryContainer);
    const primaryContainerRgbDark = hexToRgb(primaryContainerDark);
    const onPrimaryRgb = hexToRgb(onPrimary);
    const onPrimaryRgbDark = hexToRgb(onPrimaryDark);
    const onPrimaryContainerRgb = hexToRgb(onPrimaryContainer);
    const onPrimaryContainerRgbDark = hexToRgb(onPrimaryContainerDark);

    if (isDarkMode) {
      root.style.setProperty('--color-primary', `${primaryRgbDark?.r} ${primaryRgbDark?.g} ${primaryRgbDark?.b}`);
      root.style.setProperty('--color-primary-container', `${primaryContainerRgbDark?.r} ${primaryContainerRgbDark?.g} ${primaryContainerRgbDark?.b}`);
      root.style.setProperty('--color-on-primary', `${onPrimaryRgbDark?.r} ${onPrimaryRgbDark?.g} ${onPrimaryRgbDark?.b}`);
      root.style.setProperty('--color-on-primary-container', `${onPrimaryContainerRgbDark?.r} ${onPrimaryContainerRgbDark?.g} ${onPrimaryContainerRgbDark?.b}`);
    } else {
      root.style.setProperty('--color-primary', `${primaryRgb.r} ${primaryRgb.g} ${primaryRgb.b}`);
      root.style.setProperty('--color-primary-container', `${primaryContainerRgb?.r} ${primaryContainerRgb?.g} ${primaryContainerRgb?.b}`);
      root.style.setProperty('--color-on-primary', `${onPrimaryRgb?.r} ${onPrimaryRgb?.g} ${onPrimaryRgb?.b}`);
      root.style.setProperty('--color-on-primary-container', `${onPrimaryContainerRgb?.r} ${onPrimaryContainerRgb?.g} ${onPrimaryContainerRgb?.b}`);
    }
  }, []);

  useEffect(() => {
    applyTheme(theme);
    try {
      localStorage.setItem('bottlr-theme', JSON.stringify(theme));
    } catch (error) {
      console.error("Could not save theme to localStorage", error);
    }
  }, [theme, applyTheme]);

  // Detect system preference for dark mode
   useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(prev => ({ ...prev, isDarkMode: e.matches }));
    };
    
    setTheme(prev => ({...prev, isDarkMode: mediaQuery.matches}));

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setThemeColor = (colorHex: string) => {
    setTheme(prev => ({ ...prev, primary: colorHex }));
  };

  const toggleDarkMode = () => {
    setTheme(prev => ({ ...prev, isDarkMode: !prev.isDarkMode }));
  };

  const setThemeByName = (name: string) => {
    const color = PRE_CURATED_COLORS.find(c => c.name === name);
    if (color) {
      setThemeColor(color.hex);
    }
  };

  const value = useMemo(() => ({
    theme,
    setThemeColor,
    toggleDarkMode,
    setThemeByName,
  }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
