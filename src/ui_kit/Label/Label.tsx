import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Label.module.scss';
import ClearIcon from '@/assets/icons/ClearIcon';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  theme: theme;
  onClick?: () => void;
  showCloseButton: boolean;
}

const Label: FC<LabelProps> = ({
  theme,
  children,
  onClick,
  showCloseButton,
  ...props
}) => (
  <div className={clsx(styles.label, styles[`label--${theme}`])} {...props}>
    <span className={clsx(styles.labelText, styles[`labelText--${theme}`])}>
      {children}
    </span>
    {showCloseButton && (
      <button
        type="button"
        aria-label="Button close"
        onClick={onClick}
        className={clsx(styles.buttonClose, styles[`buttonClose--${theme}`])}
      >
        <ClearIcon />
      </button>
    )}
  </div>
);

export default Label;
