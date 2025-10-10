import clsx from 'clsx';
import { FC, memo } from 'react';

import styles from './ToggleTheme.module.scss';

import type { theme } from '@/types/types.ts';

import MoonIcon from '@/assets/icons/MoonIcon';
import SunIcon from '@/assets/icons/SunIcon';

import Button from '../Buttons';

export interface IToggleTheme {
  theme: theme;
  toggleTheme: (e: React.MouseEvent) => void;
}

const ToggleTheme: FC<IToggleTheme> = memo(({ theme, toggleTheme }) => {
  return (
    <div
      className={clsx(styles.buttonTheme, styles[`buttonTheme--${theme}`])}
      onClick={toggleTheme}
    >
      <div className={clsx(styles.iconTheme, styles[`iconTheme--${theme}`])}>
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </div>
      <Button variant="text" theme={theme}>
        {theme === 'light' ? 'LIGHT MODE' : 'DARK MODE'}
      </Button>
    </div>
  );
});

export default ToggleTheme;
