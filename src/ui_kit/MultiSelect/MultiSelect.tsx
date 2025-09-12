import { useState } from 'react';
import clsx from 'clsx';
import type { theme } from '@/types/types';
import { Checkbox } from '../Checkbox';
import styles from './MultiSelect.module.scss';
import GenresListButton from '@/assets/icons/GenresListButton';
import Label from '../Label/Label';

export interface IGenre {
  _id: string;
  name: string;
}

interface IMultiSelectProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  genres: IGenre[];
  theme: theme;
  selectedGenres: IGenre[];
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  genres,
  selectedGenres,
  theme,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const renderSelect = (genres: IGenre[], theme: theme) => (
    <>
      {genres.map(({ _id, name }) => (
        <div
          key={_id}
          className={clsx(
            styles.containerGenre,
            styles[`containerGenre--${theme}`]
          )}
        >
          <Checkbox theme={theme} />
          <p className={styles.genreName}>{name}</p>
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
          <Label theme={theme} onClick={() => {}}>
            {name}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className={styles.container}>
      <span className={clsx(styles.fieldName, styles[`fieldName--${theme}`])}>
        Field name
      </span>
      <div
        className={clsx(
          styles.containerMultiSelect,
          styles[`containerMultiSelect--${theme}`]
        )}
      >
        <div
          className={clsx(
            styles.showList,
            styles[`showList--${theme}`],
            isOpen && styles.showListOpen
          )}
        >
          {renderSelectedLabel(selectedGenres, theme)}
          <GenresListButton
            className={clsx(
              styles.GenresListButton,
              isOpen && styles.GenresButtonClose
            )}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && renderSelect(genres, theme)}
      </div>
    </div>
  );
};

export default MultiSelect;
