import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(undefined);
const STORAGE_KEY = 'amanda-portfolio-theme';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'dark' || stored === 'light') return stored;

  const prefersLight = window.matchMedia?.('(prefers-color-scheme: light)').matches;
  return prefersLight ? 'light' : 'dark';
}

/**
 * Provider global de tema. Aplica data-theme no <html>, o que faz as
 * variáveis CSS em styles/theme.css trocarem de valor automaticamente.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // localStorage indisponível (ex: modo privado) — segue sem persistir
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  const setDark = useCallback(() => setTheme('dark'), []);
  const setLight = useCallback(() => setTheme('light'), []);

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme, setDark, setLight }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) {
    throw new Error('useTheme precisa ser usado dentro de um <ThemeProvider>');
  }
  return ctx;
}
