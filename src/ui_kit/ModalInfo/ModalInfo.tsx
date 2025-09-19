import clsx from 'clsx';
import styles from './ModalInfo.module.scss';
import type { theme } from '@/types/types.ts';
import SunIcon from '@/assets/icons/SunIcon';
import { Button } from '../Buttons';
import MoonIcon from '@/assets/icons/MoonIcon';

export interface IModalInfo {
  theme: theme;
  onClick: () => void;
}

const ModalInfo = ({ theme, onClick }: IModalInfo) => {
  return (
    <div
      className={clsx(styles.containerInfo, styles[`containerInfo--${theme}`])}
    >
      <button
        type="button"
        aria-label="Button theme"
        className={clsx(styles.buttonTheme, styles[`buttonTheme--${theme}`])}
        onClick={onClick}
      >
        <div className={clsx(styles.iconTheme, styles[`iconTheme--${theme}`])}>
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </div>
        <Button variant="text" theme={theme}>
          LIGHT MODE
        </Button>
      </button>
      <div className={clsx(styles.loginbuttons, styles[`login--${theme}`])}>
        <a href="#">LOG IN</a>
        <a href="#">SIGN UP</a>
      </div>
    </div>
  );
};

export default ModalInfo;
