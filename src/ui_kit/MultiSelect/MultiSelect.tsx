import clsx from 'clsx';
import { useState } from 'react';

import styles from './MultiSelect.module.scss';

import type { IGenre } from '@/types/Artist';
import type { theme } from '@/types/types';

import SelectButton from '@/assets/icons/SelectButton';

import Checkbox from '../Checkbox';
import Input from '../Input/Input';
import Label from '../Label/Label';

interface IMultiSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  genres: IGenre[];
  theme: theme;
  selectedGenres: IGenre[];
}

const isCheckedGenre = (selectedGenres: IGenre[], _id: string) => {
  const selectedIds = selectedGenres.map((item: IGenre) => item._id);
  return selectedIds.includes(_id);
};

const MultiSelect: React.FC<IMultiSelectProps> = ({
  genres,
  selectedGenres,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderSelect = (
    genres: IGenre[],
    theme: theme,
    selectedGenres: IGenre[]
  ) => (
    <>
      {genres.map(({ _id, name }) => (
        <div
          key={_id}
          className={clsx(
            styles.containerGenre,
            styles[`containerGenre--${theme}`]
          )}
        >
          <Checkbox
            theme={theme}
            text={name}
            checked={isCheckedGenre(selectedGenres, _id)}
          />
        </div>
      ))}
    </>
  );

  const renderSelectedLabel = (selectedGenres: IGenre[], theme: theme) => (
    <div
      className={clsx(
        styles.selectedGenres,
        styles[`selectedGenres--${theme}`]
      )}
    >
      {selectedGenres.map(({ _id, name }) => (
        <div key={_id} className={styles.selectedItem}>
          <Label theme={theme} onClick={() => {}} showCloseButton={true}>
            {name}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.multiContainer}>
      <div
        className={clsx(
          styles.containerTheme,
          styles[`containerTheme--${theme}`]
        )}
      ></div>
      <Input
        label="Field name"
        theme={theme}
        readOnly
        className={clsx(
          styles.inputContainer,
          styles[`inputContainer--${theme}`]
        )}
      />
      <button
        type="button"
        aria-label="Toggle dropdown menu"
        className={clsx(styles.selectButton, isOpen && styles.rotated)}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SelectButton />
      </button>
      {renderSelectedLabel(selectedGenres, theme)}
      {isOpen && renderSelect(genres, theme, selectedGenres)}
    </div>
  );
};

export default MultiSelect;
