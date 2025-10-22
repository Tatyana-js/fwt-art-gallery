import clsx from 'clsx';
import { FC } from 'react';

import styles from './Textarea.module.scss';

import type { theme } from '@/types/types.ts';

import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  theme: theme;
  error?: string;
}

const TextArea: FC<ITextareaProps> = ({ label, theme, error, ...props }) => {
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
        className={clsx(
          styles.textarea,
          styles[`textarea--${theme}`],
          error && styles.textareaError
        )}
        {...props}
      />
      {error && (
        <div className={styles.errorContainer}>
          <div className={styles.iconContainer}>
            <ErrorIcon />
          </div>
          <p className={styles.errorMessage}>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextArea;
