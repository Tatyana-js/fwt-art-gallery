import { FC } from 'react';
import styles from './Header.module.scss';
import clsx from 'clsx';
import type { theme } from '@/types/types';
import IconLogo from '@/assets/icons/IconLogo';
import IconMenu from '@/assets/icons/IconMenu';
import SunIcon from '@/assets/icons/SunIcon';
import MoonIcon from '@/assets/icons/MoonIcon';

export interface IHeader {
  theme: theme;
}

const Header: FC<IHeader> = ({ theme }) => (
  <div className="container">
    <div className={clsx(styles.header, styles[`header--${theme}`])}>
      <div className={styles.iconLogo}>
        <IconLogo />
      </div>
      <div className={styles.containerButtons}>
        <div className={styles.buttonContainer}>
          <button
            type="button"
            className={clsx(styles.buttonItem, styles[`buttonItem--${theme}`])}
          >
            LOG IN
          </button>
          <button
            type="button"
            className={clsx(styles.buttonItem, styles[`buttonItem--${theme}`])}
          >
            SIGN UP
          </button>
        </div>
        <div
          className={clsx(
            styles.themeContainer,
            styles[`themeContainer--${theme}`]
          )}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
      </div>
      <div className={styles.containerMenu}>
        <IconMenu />
      </div>
    </div>
  </div>
);

export default Header;
