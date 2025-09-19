import clsx from 'clsx';
import styles from './Modal.module.scss';
import ClearIcon from '@/assets/icons/ClearIcon';
import type { theme } from '@/types/types.ts';

export interface IModal {
  children: React.ReactNode;
  theme: theme;
}

const Modal: React.FC<IModal> = ({ children, theme }) => {
  return (
    <div className={clsx(styles.modal_overlay, styles[`modal_overlay--${theme}`])}>
      <div
        className={clsx(
          styles.modalContainer,
          styles[`modalContainer--${theme}`]
        )}
      >
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
        >
          <ClearIcon />
        </button>

        {children}
      </div>
    </div>
  );
};

export default Modal;
