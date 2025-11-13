import { Toast } from '@/Context/errorContext';
import clsx from 'clsx';
import { FC } from 'react';

import styles from './ToastItem.module.scss';

import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import ClearIcon from '@/assets/icons/ClearIcon';
import ErrorIcon from '@/assets/icons/ErrorIcon';

interface IToastItemProps {
  toast: Toast;
  onClose: (id: string) => void;
  theme: theme;
}

const ToastItem: FC<IToastItemProps> = ({ toast, onClose, theme }) => {
  const handleClose = () => {
    onClose(toast.id);
  };

  return (
    <div
      className={clsx(
        styles.errorContainer,
        styles[`errorContainer--${theme}`]
      )}
      data-toast="true"
    >
      <div className={styles.lineError}></div>
      <p className={styles.errorText}>Error!</p>
      <div
        className={clsx(styles.errorButton, styles[`errorButton--${theme}`])}
      >
        <ErrorIcon />
      </div>
      <p className={clsx(styles.message, styles[`message--${theme}`])}>
        {toast.message}
      </p>
      <div className={clsx(styles.closeButton, styles[`closeButton-${theme}`])}>
        <Button variant="icon" theme={theme} onClick={handleClose}>
          <ClearIcon />
        </Button>
      </div>
    </div>
  );
};

export default ToastItem;
