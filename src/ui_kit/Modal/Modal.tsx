import useScrollLock from '@/hooks/useScrollLock';
import useTheme from '@/hooks/useTheme';
import clsx from 'clsx';
import { FC, useEffect } from 'react';
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';

import styles from './Modal.module.scss';

import ClearIcon from '@/assets/icons/ClearIcon';

type ModalVariant =
  | 'menuModal'
  | 'authorization'
  | 'register'
  | 'addArtist'
  | 'deleteArtist'
  | 'painting'
  | 'slider'
  | 'filter';

export interface IModal {
  children: React.ReactNode;
  variant: ModalVariant;
  closeModal?: (value: boolean) => void;
}

const Modal: FC<IModal> = ({ children, variant, closeModal }) => {
  const [isActive, setIsActive] = useState(true);
  const { theme } = useTheme();
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

  useOnClickOutside(drawerRef as React.RefObject<HTMLElement>, () => {
    const activeToasts = document.querySelectorAll('[data-toast]');
    if (activeToasts.length > 0) {
      return;
    }
    setIsActive(false);
  });

  const handleAnimationEnd = () => {
    if (!isActive) {
      unlock();
      if (variant === 'authorization' || variant === 'register') {
        if (location.state?.background) {
          navigation(location.state.background, { replace: true });
        } else {
          navigation('/', { replace: true });
        }
      } else if (closeModal) {
        closeModal(false);
      } else {
        if (location.state?.background) {
          navigation(location.state.background, { replace: true });
        }
      }
    } else {
      navigation('/');
    }
  };

  const getVariantClasses = (variant: ModalVariant, theme: string) => {
    switch (variant) {
      case 'menuModal':
      case 'filter':
        return [
          styles.menuModal,
          styles[`menuModal--${theme}`],
          isActive && styles.activeMenuModal,
        ];

      case 'authorization':
      case 'register':
        return [styles.authModal, styles[`authModal--${theme}`]];

      case 'addArtist':
        return [styles.addArtist, styles[`addArtist--${theme}`]];

      case 'deleteArtist':
        return [styles.deleteArtist, styles[`deleteArtist--${theme}`]];

      case 'painting':
        return [styles.paintingModal, styles[`paintingModal--${theme}`]];

      case 'slider':
        return styles.sliderModal;
    }
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
            if (variant === 'authorization' || variant === 'register') {
              if (location.state?.background) {
                navigation(location.state.background, { replace: true });
              } else {
                navigation('/', { replace: true });
              }
            }
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
