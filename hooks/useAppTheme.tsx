import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { getThemeMode, setThemeMode as persistTheme } from '@/lib/storage';
import { lightTheme, darkTheme, type AppTheme, type ThemeMode } from '@/lib/theme';

interface ThemeContextValue {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');

  useEffect(() => {
    getThemeMode().then((m) => setModeState(m));
  }, []);

  const isDark = mode === 'dark' || (mode === 'system' && systemScheme === 'dark');
  const theme = isDark ? darkTheme : lightTheme;

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    persistTheme(m);
  };

  const value = useMemo<ThemeContextValue>(() => ({ theme, mode, setMode, isDark }), [theme, mode, isDark]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
}
