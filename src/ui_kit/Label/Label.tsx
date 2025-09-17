import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Label.module.scss';
// import ClearIcon from '@/assets/icons/ClearIcon';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  theme: theme;
  onClick?: () => void;
}

const Label: FC<LabelProps> = ({ theme, children, ...props }) => (
  <span className={clsx(styles.label, styles[`label--${theme}`])} {...props}>
    {children}
  </span>
);

export default Label;
