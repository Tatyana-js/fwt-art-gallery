import { FC, useState } from 'react';
import styles from './Input.module.scss';
import type { theme } from '@/types/types.ts';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  theme: theme;
  error?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({
  label,
  theme,
  error,
  className,
  // ...props
}) => {
  const [value, setValue] = useState('');
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
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className={clsx(
          styles.input,
          styles[`input--${theme}`],
          error && styles.inputError,
          className
        )}
        // {...props}
      />
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.errorIcon}>
            <ErrorIcon />
          </div>
          <p className={styles.errorMessage}>This is an error message!</p>
        </div>
      )}
    </div>
  );
};

export default Input;
