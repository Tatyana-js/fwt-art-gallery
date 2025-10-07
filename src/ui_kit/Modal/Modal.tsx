import { useRef, useEffect, useState } from 'react';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';
import styles from './Modal.module.scss';
import ClearIcon from '@/assets/icons/ClearIcon';
import type { theme } from '@/types/types.ts';

type ModalVariant = 'modalInfo' | 'authorization';

export interface IModal {
  children: React.ReactNode;
  theme: theme;
  variant: ModalVariant;
  closeModal: () => void;
  isOpen: boolean;
}

const Modal: React.FC<IModal> = ({
  children,
  theme,
  variant,
  closeModal,
  isOpen,
}) => {
  const [isActive, setIsActive] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsActive(true);
      }, 50);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsActive(false);
    setTimeout(() => {
      closeModal();
    }, 300);
  };

  useOnClickOutside(drawerRef as React.RefObject<HTMLElement>, handleClose);

  return (
    <div
      className={clsx(
        styles.modal_overlay,
        styles[`modal_overlay--${theme}`],
        isOpen && styles.active,
        isOpen && styles[`active--${theme}`]
      )}
    >
      <div
        ref={drawerRef}
        className={clsx(
          styles[`${variant}`],
          styles[`${variant}--${theme}`],
          isActive && styles.activeModalInfo
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
          onClick={handleClose}
        >
          <ClearIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
