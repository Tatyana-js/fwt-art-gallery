import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';
import Success from '@/assets/icons/Success';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: theme;
}

const Checkbox: FC<CheckboxProps> = ({ theme, ...props }) => (
  <div
    className={clsx(
      styles.checkboxContainer,
      styles[`checkboxContainer--${theme}`]
    )}
  >
    <input
      type="checkbox"
      className={clsx(styles.checkbox, styles[`checkbox--${theme}`])}
      {...props}
    />
    {props.checked && (
        <Success className={styles.checkboxIcon}/>
    )}
  </div>
);

export default Checkbox;
