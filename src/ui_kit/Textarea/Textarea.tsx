import clsx from 'clsx';
import { FC } from 'react';

import styles from './Textarea.module.scss';

import type { theme } from '@/types/types.ts';

import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  value: string;
  theme: theme;
  error?: boolean;
}

const TextArea: FC<ITextareaProps> = ({ label, value, theme, error }) => {
  return (
    <div className={styles.container}>
      <label
        htmlFor="label"
        className={clsx(styles.label, styles[`label--${theme}`])}
      >
        {label}
      </label>
      <textarea
        id="label"
        value={value}
        className={clsx(
          styles.textarea,
          styles[`textarea--${theme}`],
          error && styles.textareaError
        )}
      />
      {error && (
        <div className={styles.errorContainer}>
          <ErrorIcon />
          <p className={styles.errorMessage}>This is an error message!</p>
        </div>
      )}
    </div>
  );
};

export default TextArea;
