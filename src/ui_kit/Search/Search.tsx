import { theme } from '@/types/types';
import styles from './Search.module.scss';
import clsx from 'clsx';
import ErrorIcon from '@/assets/icons/ErrorIcon';
import ClearIcon from '@/assets/icons/ClearIcon';
import Search_icon from '@/assets/icons/Search_icon';
import Input from '../Input/Input';

interface ISearchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  theme: theme;
  error: boolean;
}
const value1 = 'rewae';

const Search = ({ theme, error }: ISearchProps) => {
  return (
    <div
      className={clsx(
        styles.searchLine,
        styles[`searchLine--${theme}`],
        error && styles.searchLineError
      )}
    >
      <Search_icon />
      <Input
        label=""
        theme={theme}
        placeholder="Placeholder"
        type="text"
        value=""
        className={clsx(
          styles.input,
          styles[`input--${theme}`],
          error && styles.inputError
        )}
      />
      {value1 && <ClearIcon className={styles.clear_icon} onClick={() => {}} />}
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
