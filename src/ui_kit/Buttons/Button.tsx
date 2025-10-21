import clsx from 'clsx';
import { FC } from 'react';

import styles from './Button.module.scss';

import type { theme } from '@/types/types';

type ButtonVariant = 'defaultButton' | 'text' | 'icon' | 'circleIcon';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariant;
  theme: theme;
}

const Button: FC<ButtonProps> = ({ variant, children, theme, type = 'button', ...props }) => (
  <button
    className={clsx(styles[variant], styles[`${variant}--${theme}`])}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export default Button;
