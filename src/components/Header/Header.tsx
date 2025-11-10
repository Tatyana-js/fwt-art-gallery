import useTheme from '@/hooks';
import { selectIsAuth } from '@/store/index';
import { authSlice } from '@/store/slices/authSlice';
import clsx from 'clsx';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

import Search from '@/ui_kit/Search';

import router from '@/utils/routes';

import IconLogo from '@/assets/icons/IconLogo';
import IconMenu from '@/assets/icons/IconMenu';
import MoonIcon from '@/assets/icons/MoonIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import SunIcon from '@/assets/icons/SunIcon';

interface IHeader {
  value: string;
  setMenuIsOpen: (value: boolean) => void;
  isSearch: boolean;
  onSearch: () => void;
  onChange: (value: string) => void;
}

const Header: FC<IHeader> = ({
  setMenuIsOpen,
  isSearch,
  value,
  onSearch,
  onChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { logout } = authSlice.actions;

  const handleClick = () => {
    dispatch(logout());
  };

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
          {isAuth ? (
            <button
              type="button"
              className={clsx(
                styles.buttonItem,
                styles[`buttonItem--${theme}`]
              )}
              onClick={handleClick}
            >
              LOG OUT
            </button>
          ) : (
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
          )}
          <div
            className={clsx(
              styles.themeContainer,
              styles[`themeContainer--${theme}`]
            )}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </div>
        </div>
        <div className={styles.buttons}>
          {isSearch ? (
            <div className={styles.search}>
              <Search
                theme={theme}
                error={false}
                value={value}
                onChange={onChange}
                closeSearch={onSearch}
              />
            </div>
          ) : (
            <button
              aria-label="searchIcon"
              type="button"
              className={clsx(
                styles.searchButton,
                styles[`searchButton--${theme}`]
              )}
              onClick={onSearch}
            >
              <SearchIcon />
            </button>
          )}
          <button
            type="button"
            aria-label="menuButton"
            className={clsx(
              styles.containerMenu,
              styles[`containerMenu--${theme}`]
            )}
            onClick={() => setMenuIsOpen(true)}
          >
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
