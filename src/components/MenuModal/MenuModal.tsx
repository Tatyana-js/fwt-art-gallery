import clsx from 'clsx';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from './MenuModal.module.scss';

import type { theme } from '@/types/types.ts';

import ToggleTheme from '../../ui_kit/ToggleTheme/ToggleTheme';

import router from '@/utils/routes';

export interface IModalInfo {
  theme: theme;
  onClick: (e: React.MouseEvent) => void;
}

const ModalInfo: FC<IModalInfo> = ({ theme, onClick }) => {
  const location = useLocation();
  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <ToggleTheme
        theme={theme}
        toggleTheme={(e) => {
          e.stopPropagation();
          onClick(e);
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
