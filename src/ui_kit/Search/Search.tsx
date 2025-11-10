import clsx from 'clsx';
import { FC, FormEvent } from 'react';

import styles from './Search.module.scss';

import { theme } from '@/types/types';

import ClearIcon from '@/assets/icons/ClearIcon';
import SearchIcon from '@/assets/icons/SearchIcon';

import Input from '../Input/Input';

interface ISearchProps {
  theme: theme;
  error?: boolean;
  value: string;
  closeSearch?: () => void;
  onChange: (value: string) => void;
}

const Search: FC<ISearchProps> = ({
  theme,
  error = false,
  value,
  closeSearch,
  onChange,
}: ISearchProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleClear = () => {
    onChange('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        styles.searchLine,
        styles[`searchLine--${theme}`],
        error && styles.searchLineError
      )}
    >
      <button
        type="button"
        aria-label="searchIcon"
        className={clsx(
          styles.searchIcon,
          styles[`searchIcon--${theme}`],
          value && styles.notSearchIcon
        )}
        onClick={closeSearch}
      >
        <SearchIcon />
      </button>
      <Input
        theme={theme}
        type="text"
        placeholder="Search"
        onChange={handleInputChange}
        value={value}
      />
      {value && (
        <button
          type="button"
          aria-label="clear button"
          className={clsx(styles.clearIcon, styles[`clearIcon--${theme}`])}
          onClick={handleClear}
        >
          <ClearIcon />
        </button>
      )}
    </form>
  );
};

export default Search;
