import useScrollLock from '@/hooks/useScrollLock';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './Modal.module.scss';

import type { theme } from '@/types/types.ts';

import ClearIcon from '@/assets/icons/ClearIcon';

type ModalVariant = 'menuModal' | 'authorization' | 'register' | 'addArtist' | 'deleteArtist';

export interface IModal {
  children: React.ReactNode;
  theme: theme;
  variant: ModalVariant;
  closeModal?: (value: boolean) => void;
}

const Modal: FC<IModal> = ({ children, theme, variant, closeModal }) => {
  const [isActive, setIsActive] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { lock, unlock } = useScrollLock();

  const location = useLocation();
  const navigation = useNavigate();

  useEffect(() => {
    lock();
    return () => {
      unlock();
    };
  }, [lock, unlock]);

  useOnClickOutside(drawerRef as React.RefObject<HTMLElement>, () =>
    setIsActive(false)
  );

  const handleAnimationEnd = () => {
    if (!isActive) {
      unlock();
      if (closeModal) {
        closeModal(false);
      } else {
        if (location.state?.background) {
          navigation(location.state.background, { replace: true });
        } else {
          navigation('/');
        }
      }
    }
  };

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
    if (variant === 'addArtist') {
      return [styles.addArtist, styles[`addArtist--${theme}`]];
    }
    if (variant === 'deleteArtist') {
      return [styles.deleteArtist, styles[`deleteArtist--${theme}`]];
    }
    return [];
  };

  return createPortal(
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
        onAnimationEnd={handleAnimationEnd}
      >
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
          onClick={() => {
            setIsActive(false);
            if (closeModal && variant !== 'menuModal') {
              closeModal(false);
            }
          }}
        >
          <ClearIcon />
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
