import { FC } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './ModalInfo.module.scss';
import type { theme } from '@/types/types.ts';
import ToggleTheme from '../ToggleTheme/ToggleTheme';

export interface IModalInfo {
  theme: theme;
  onClick: (e: React.MouseEvent) => void;
}

const ModalInfo: FC<IModalInfo> = ({ theme, onClick }) => {
   const navigate = useNavigate();
  const location = useLocation();
  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <ToggleTheme theme={theme} toggleTheme={(e) => {
         e.stopPropagation();
         onClick(e)
      }} />
      <div className={clsx(styles.loginbuttons, styles[`login--${theme}`])}>
        <a onClick={() => navigate('/auth/login', { state: { background: location }})}>
          LOG IN
        </a>
        <a onClick={() => {}}>
          SIGN UP
        </a>
      </div>
    </div>
  );
};

export default ModalInfo;
