import useTheme from '@/hooks';
import clsx from 'clsx';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './MenuModal.module.scss';

import ToggleTheme from '../../ui_kit/ToggleTheme/ToggleTheme';

import router from '@/utils/routes';

const ModalInfo: FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <ToggleTheme
        theme={theme}
        toggleTheme={(e) => {
          e.stopPropagation();
          toggleTheme();
        }}
      />
      <div className={clsx(styles.loginbuttons, styles[`login--${theme}`])}>
        <Link
          to={router.login()}
          state={{
            background: {
              pathname: location.pathname,
              search: location.search,
              hash: location.hash,
            },
          }}
        >
          LOG IN
        </Link>
        <Link
          to={router.signUp()}
          state={{
            background: {
              pathname: location.pathname,
            },
          }}
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default ModalInfo;
