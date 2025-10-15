import clsx from 'clsx';
import { FC } from 'react';

import styles from './Input.module.scss';

import type { theme } from '@/types/types.ts';

import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme: theme;
  error?: string;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  theme,
  error,
  className,
  ...props
}) => {
  return (
    <div className={clsx(styles.container)}>
      <label
        htmlFor={label}
        className={clsx(styles.label, styles[`label--${theme}`])}
      >
        {label}
      </label>
      <input
        id={label}
        className={clsx(
          styles.input,
          styles[`input--${theme}`],
          error && styles.inputError,
          className
        )}
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
