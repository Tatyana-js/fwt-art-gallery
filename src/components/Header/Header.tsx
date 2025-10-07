import { FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import clsx from 'clsx';
import useTheme from '@/hooks/index';
import IconLogo from '@/assets/icons/IconLogo';
import IconMenu from '@/assets/icons/IconMenu';
import SunIcon from '@/assets/icons/SunIcon';
import MoonIcon from '@/assets/icons/MoonIcon';
import Modal from '@/ui_kit/Modal';
import ModalInfo from '@/ui_kit/ModalInfo';

const Header: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={clsx(styles.header, styles[`header--${theme}`])}>
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
            <button
              type="button"
              className={clsx(
                styles.buttonItem,
                styles[`buttonItem--${theme}`]
              )}
              onClick={() =>
                navigate('/auth/login', {
                  state: { background: location },
                })
              }
            >
              LOG IN
            </button>
            <button
              type="button"
              className={clsx(
                styles.buttonItem,
                styles[`buttonItem--${theme}`]
              )}
              // onClick={() => navigate('/auth/signup', {
              //   state: { background: location }
              // })}
            >
              SIGN UP
            </button>
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
        {isOpen && (
          <Modal
            theme={theme}
            variant="modalInfo"
            closeModal={() => setIsOpen(false)}
            isOpen={isOpen}
          >
            <ModalInfo
              theme={theme}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                toggleTheme();
              }}
            />
          </Modal>
        )}
        <div className={styles.containerMenu} onClick={() => setIsOpen(true)}>
          <IconMenu />
        </div>
      </div>
    </div>
  );
};

export default Header;
