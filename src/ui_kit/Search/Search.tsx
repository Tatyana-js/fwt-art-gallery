import { theme } from '@/types/types';
import styles from './Search.module.scss';
import clsx from 'clsx';
// import ErrorIcon from '@/assets/icons/ErrorIcon';
import ClearIcon from '@/assets/icons/ClearIcon';
import SearchIcon from '@/assets/icons/SearchIcon';
import Input from '../Input/Input';

interface ISearchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  theme: theme;
  error: boolean;
}
const value1 = 'ffw'; //без него выходит ошибка и стори не загружается

const Search = ({ theme, error }: ISearchProps) => {
  return (
    <div
      className={clsx(
        styles.searchLine,
        styles[`searchLine--${theme}`],
        error && styles.searchLineError
      )}
    >
      <div className={clsx(styles.searchIcon, styles[`searchIcon--${theme}`])}>
        <SearchIcon />
      </div>
      <Input
        theme={theme}
        type="text"
        value=""
        placeholder="Placeholder"
        error={error}
        className={styles.input}
      />
      {value1 && (
        <div className={clsx(styles.clearIcon, styles[`clearIcon--${theme}`])}>
          <ClearIcon />
        </div>
      )}
    </div>
  );
};

export default Search;
