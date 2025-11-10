import clsx from 'clsx';
import { FC, useId } from 'react';

import styles from './Input.module.scss';

import type { theme } from '@/types/types.ts';

import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme: theme;
  error?: string;
}

const Input: FC<InputProps> = ({ label, theme, error, ...props }) => {
  const id = useId();

  return (
    <div className={clsx(styles.container)}>
      {label && (
        <label
          htmlFor={id}
          className={clsx(styles.label, styles[`label--${theme}`])}
        >
          {label}
        </label>
      )}
      <input
        id={id}
        className={clsx(styles.input, styles[`input--${theme}`])}
        {...props}
      />
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <ErrorIcon />
          </div>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
