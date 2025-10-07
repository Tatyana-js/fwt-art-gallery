import { useState, ReactNode, useMemo, useCallback } from 'react';
import { ThemeContext } from './context';
import type { theme } from '@/types/types';

export interface IThemeProviderProps {
  children: ReactNode;
  defaultTheme?: theme;
}

const ThemeContextProvider = ({
  children,
  defaultTheme = 'dark',
}: IThemeProviderProps) => {
  const [theme, setTheme] = useState(defaultTheme);

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'));
  }, []);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return <ThemeContext value={contextValue}>{children}</ThemeContext>;
};

export default ThemeContextProvider;
