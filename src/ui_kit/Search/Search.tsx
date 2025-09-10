import { theme } from '@/types/types';
import styles from './Search.module.scss';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';

interface ISearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: theme;
  error: boolean;
}
const value1 = 'deqw;lmdf';

const Search = ({ theme, error }: ISearchProps) => {
  return (
    <div className={styles.container}>
      <form
        className={clsx(
          styles.searchLine,
          styles[`searchLine--${theme}`],
          error && styles.searchLineError
        )}
      >
        <input
          id="search"
          placeholder="Placeholder"
          type="text"
          value=""
          className={clsx(
            styles.input,
            styles[`input--${theme}`],
            error && styles.inputError
          )}
        />
        {value1 && (
          <button
            type="button"
            className={clsx(styles.clear_icon, styles[`clear_icon--${theme}`])}
            aria-label="Очистить поле ввода"
          />
        )}
      </form>
      {error && (
        <div className={styles.errorContainer}>
          <ErrorIcon />
          <p className={styles.errorMessage}>This is an error message!</p>
        </div>
      )}
    </div>
  );
};

export default Search;
