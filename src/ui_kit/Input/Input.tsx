import styles from './Input.module.scss';
import type { theme } from '@/types/types.ts';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputFormProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  theme: theme;
  error: boolean;
}

const InputForm = ({ label, theme, error }: InputFormProps) => (
  <div className={styles.container}>
    <form className={styles.inputForm}>
      <label
        htmlFor="inputName"
        className={clsx(styles.label, styles[`label--${theme}`])}
      >
        {label}
      </label>
      <input
        id="inputName"
        placeholder="Placeholder"
        type="text"
        value=""
        className={clsx(
          styles.input,
          styles[`input--${theme}`],
          error && styles.inputError
        )}
      />
      {error && (
        <div className={styles.errorContainer}>
          <ErrorIcon />
          <p className={styles.errorMessage}>This is an error message!</p>
        </div>
      )}
    </form>
  </div>
);

export default InputForm;
