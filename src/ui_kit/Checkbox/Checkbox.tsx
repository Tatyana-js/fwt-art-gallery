import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: theme;
}

const Checkbox: FC<CheckboxProps> = ({ theme, ...props }) => (
    <input
      id="checkbox"
      type="checkbox"
      className={clsx(styles.checkbox, styles[`checkbox--${theme}`])}
      {...props}
    />
  );

export default Checkbox;
