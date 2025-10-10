import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './Modal.module.scss';

import type { theme } from '@/types/types.ts';

import ClearIcon from '@/assets/icons/ClearIcon';

type ModalVariant = 'menuModal' | 'authorization' | 'register';

export interface IModal {
  children: React.ReactNode;
  theme: theme;
  variant: ModalVariant;
  closeModal: (value: boolean) => void;
}

const Modal: React.FC<IModal> = ({ children, theme, variant, closeModal }) => {
  const [isActive, setIsActive] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);

  const navigation = useNavigate();

  useOnClickOutside(drawerRef as React.RefObject<HTMLElement>, () =>
    setIsActive(false)
  );

  const getVariantClasses = (variant: string, theme: string) => {
    if (variant === 'menuModal') {
      return [
        styles.menuModal,
        styles[`menuModal--${theme}`],
        isActive && styles.activeMenuModal,
      ];
    }
    if (variant === 'authorization' || variant === 'register') {
      return [styles.authModal, styles[`authModal--${theme}`]];
    }
    return [];
  };

  return (
    <div
      className={clsx(
        styles.modal_overlay,
        styles[`modal_overlay--${theme}`],
        isActive && styles.active,
        isActive && styles[`active--${theme}`]
      )}
    >
      <div
        ref={drawerRef}
        className={clsx(getVariantClasses(variant, theme))}
        onClick={(e) => e.stopPropagation()}
        onAnimationEnd={() => {
          if (!isActive) closeModal(false);
        }}
      >
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
          onClick={() => {
            setIsActive(false);
            navigation('/');
          }}
        >
          <ClearIcon />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
