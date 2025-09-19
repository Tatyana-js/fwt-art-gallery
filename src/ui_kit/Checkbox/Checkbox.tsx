import { FC } from 'react';
import type { theme } from '@/types/types';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';
import Success from '@/assets/icons/Success';

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: theme;
  text?: string;
}

const Checkbox: FC<CheckboxProps> = ({ theme, text, ...props }) => (
  <label
    className={clsx(
      styles.checkboxContainer,
      styles[`checkboxContainer--${theme}`]
    )}
  >
    <div className={styles.checkedContainer}>
      <input
        type="checkbox"
        className={clsx(styles.checkbox, styles[`checkbox--${theme}`])}
        {...props}
      />
      {props.checked && <Success />}
    </div>

    {text}
  </label>
);

export default Checkbox;
