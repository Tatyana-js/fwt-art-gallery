import { ReactNode, useCallback, useMemo, useState } from 'react';

import type { theme } from '@/types/types';

import { ThemeContext } from './context';

export interface IThemeProviderProps {
  children: ReactNode;
  defaultTheme?: theme;
}

const ThemeContextProvider = ({
  children,
  defaultTheme = 'light',
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
