import { FC } from 'react';
import styles from './Input.module.scss';
import type { theme } from '@/types/types.ts';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  theme: theme;
  error?: boolean;
}

const Input: FC<InputProps> = ({ label, theme, error, ...props }) => (
  <div className={styles.container}>
    <label
      htmlFor="inputName"
      className={clsx(styles.label, styles[`label--${theme}`])}
    >
      {label}
    </label>
    <div
      className={clsx(
        styles.inputContainer,
        styles[`inputContainer--${theme}`]
      )}
    >
      <input
        value={props.value}
        className={clsx(
          styles.input,
          styles[`input--${theme}`],
          error && styles.inputError,
          props.placeholder && styles.placeholder
        )}
        {...props}
      />
      {error && (
        <div className={styles.errorContainer}>
          <ErrorIcon />
          <p className={styles.errorMessage}>This is an error message!</p>
        </div>
      )}
    </div>
  </div>
);

export default Input;
