import { Toast } from '@/Context/errorContext';
import useTheme from '@/hooks/useTheme';
import { FC } from 'react';
import { createPortal } from 'react-dom';

import styles from './ToastComponent.module.scss';

import ToastItem from './ToastItem/ToastItem';

interface IToastComponentProps {
  toasts: Toast[];
  removeToast: (id: string) => void;
}

const ToastComponent: FC<IToastComponentProps> = ({ toasts, removeToast }) => {
  const { theme } = useTheme();
  if (toasts.length === 0) return null;

  return createPortal(
    <div className={styles.toastContainer}>
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={removeToast}
          theme={theme}
        />
      ))}
    </div>,
    document.body
  );
};

export default ToastComponent;
