import type { theme } from '@/types/types.ts';
import styles from './Textarea.module.scss';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

export interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  text: string;
  theme: theme;
  error: boolean;
}

const TextArea = ({ label, value, theme, error }: ITextareaProps) => {
  return (
    <div className={styles.container}>
      <label
        htmlFor="textAreaId"
        className={clsx(styles.label, styles[`label--${theme}`])}
      >
        {label}
      </label>
      <textarea
        id="textAreaId"
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
