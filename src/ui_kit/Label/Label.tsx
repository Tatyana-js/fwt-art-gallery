import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Label.module.scss';
import ClearIcon from '@/assets/icons/ClearIcon';

export interface LabelProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: theme;
  onClick?: () => void;
}

const Label: FC<LabelProps> = ({ theme, children, onClick, ...props }) => (
  <button
    className={clsx(styles.label, styles[`label--${theme}`])}
    type="button"
    {...props}
    onClick={onClick}
  >
    {children}
    {onClick && <ClearIcon />}
  </button>
);

export default Label;
