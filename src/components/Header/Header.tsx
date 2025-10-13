import clsx from 'clsx';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

import type { theme } from '@/types/types';

import router from '@/utils/routes';

import IconLogo from '@/assets/icons/IconLogo';
import IconMenu from '@/assets/icons/IconMenu';
import MoonIcon from '@/assets/icons/MoonIcon';
import SunIcon from '@/assets/icons/SunIcon';

interface IHeader {
  setMenuIsOpen: (value: boolean) => void;
  toggleTheme: () => void;
  theme: theme;
}

const Header: FC<IHeader> = ({ setMenuIsOpen, theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <header className={clsx(styles.header, styles[`header--${theme}`])}>
      <div
        className={clsx(
          'container',
          styles.container,
          styles[`container--${theme}`]
        )}
      >
        <div className={styles.iconLogo}>
          <IconLogo />
        </div>
        <div className={styles.containerButtons}>
          <div className={styles.buttonContainer}>
            <Link
              to={router.login()}
              className={clsx(
                styles.buttonItem,
                styles[`buttonItem--${theme}`]
              )}
              state={{
                background: {
                  pathname: location.pathname,
                },
              }}
            >
              LOG IN
            </Link>
            <Link
              to={router.signUp()}
              className={clsx(
                styles.buttonItem,
                styles[`buttonItem--${theme}`]
              )}
              state={{
                background: {
                  pathname: location.pathname,
                },
              }}
            >
              SIGN UP
            </Link>
          </div>
          <div
            className={clsx(
              styles.themeContainer,
              styles[`themeContainer--${theme}`]
            )}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>{' '}
        <div
          className={styles.containerMenu}
          onClick={() => setMenuIsOpen(true)}
        >
          <IconMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
