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
  selectedGenres: string[];
  onGenresChange: (genreIds: string[]) => void;
}

const MultiSelect: React.FC<IMultiSelectProps> = ({ genres, theme, selectedGenres, onGenresChange}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleGenre = (genre: IGenre) => {
      const isCurrentlySelected = selectedGenres.includes(genre._id);
      let newGenres: string[];
      if (isCurrentlySelected) {
        newGenres = selectedGenres.filter((id) => id !== genre._id);
      } else {
        newGenres = [...selectedGenres, genre._id];
        
    };
    onGenresChange(newGenres);
  };

  const isSelected = (_id: string) => {
    return selectedGenres.includes(_id);
  };

  const selectedGenreObjects = genres.filter(genre => 
    selectedGenres.includes(genre._id)
  );

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
          <Label
            key={genre._id}
            theme={theme}
            onClick={() => toggleGenre(genre)}
            showCloseButton={true}
          >
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
      {renderSelectedLabel(selectedGenreObjects, theme)}
      {isOpen && renderSelect(genres, theme)}
    </div>
  );
};

export default MultiSelect;
