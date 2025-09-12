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

const Input = ({ label, theme, error, ...props }: InputProps) => (
  <div className={styles.container}>
    <form>
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
          id="inputName"
          type="text"
          value=""
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
    </form>
  </div>
);

export default Input;
