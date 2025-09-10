import { ChangeEvent, FormEvent, useState } from 'react';
import styles from './InputForm.module.scss';
import type { theme } from '@/types/types.ts';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface InputFormProps {
  label: string;
  theme: theme;
  error: boolean;
}

const InputForm = ({ label, theme, error }: InputFormProps) => {
  const [value, setValue] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.value.length >= 0) {
      setValue(event.target.value);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.inputForm} onSubmit={handleSubmit}>
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
          value={value}
          onChange={handleChange}
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
};

export default InputForm;
