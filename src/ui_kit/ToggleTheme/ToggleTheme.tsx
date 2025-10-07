import { FC, memo } from 'react';
import clsx from 'clsx';
import styles from './ToggleTheme.module.scss';
import type { theme } from '@/types/types.ts';
import SunIcon from '@/assets/icons/SunIcon';
import Button from '../Buttons';
import MoonIcon from '@/assets/icons/MoonIcon';

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
