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
}

const MultiSelect: React.FC<IMultiSelectProps> = ({ genres, theme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);

  const toggleGenre = (genre: IGenre) => {
    setSelectedGenres((prev) => {
      const isCurrentlySelected = prev.some((g) => g._id === genre._id);
      if (isCurrentlySelected) {
        const newGenres = prev.filter((g) => g._id !== genre._id);
        return newGenres;
      } else {
        const newGenres = [...prev, genre];
        return newGenres;
      }
    });
  };

  const isSelected = (_id: string) => {
    const selected = selectedGenres.some((g) => g._id === _id);
    return selected;
  };

  const renderSelect = (genres: IGenre[], theme: theme) => (
    <div
      className={clsx(
        styles.genreContainer,
        styles[`genreContainer--${theme}`]
      )}
    >
      {genres?.map((genre) => (
        <div
          key={genre._id}
          className={clsx(
            styles.containerGenre,
            styles[`containerGenre--${theme}`]
          )}
        >
          <Checkbox
            theme={theme}
            text={genre.name}
            checked={isSelected(genre._id)}
            onChange={() => toggleGenre(genre)}
          />
        </div>
      ))}
    </div>
  );

  const renderSelectedLabel = (selectedGenres: IGenre[], theme: theme) => (
    <div
      className={clsx(
        styles.selectedGenres,
        styles[`selectedGenres--${theme}`]
      )}
    >
      {selectedGenres.map((genre) => (
        <div key={genre._id} className={styles.selectedItem}>
          <Label key={genre._id} theme={theme} onClick={() => toggleGenre(genre)} showCloseButton={true}>
            {genre.name}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.multiContainer}>
      <Input
        label="Genres*"
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
        className={clsx(
          styles.selectButton,
          styles[`selectButton--${theme}`],
          isOpen && styles.rotated
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SelectButton />
      </button>
      {renderSelectedLabel(selectedGenres, theme)}
      {isOpen && renderSelect(genres, theme)}
    </div>
  );
};

export default MultiSelect;
