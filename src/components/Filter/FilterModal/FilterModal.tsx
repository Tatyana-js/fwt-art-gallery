import { IFilterModalState } from '@/types/types';
import { useGetGenresQuery } from '@/store/api/artistsApi';
import clsx from 'clsx';
import { produce } from 'immer';
import { FC } from 'react';

import styles from './FilterModal.module.scss';

import { IGenre } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import MinusIcon from '@/assets/icons/MinusIcon';
import PlusIcon from '@/assets/icons/PlusIcon';

interface IFilterModalProps {
  theme: theme;
  filterState: IFilterModalState;
  setFilterState: React.Dispatch<React.SetStateAction<IFilterModalState>>;
  onApplyFilters: () => void;
}

type SortType = 'recently_added' | 'a_to_z' | 'z_to_a' | null;

const FilterModal: FC<IFilterModalProps> = ({
  theme,
  filterState,
  setFilterState,
  onApplyFilters,
}) => {
  const { data: genresData } = useGetGenresQuery();
  const { genres, sort } = filterState;

  const toggleList = () => {
    setFilterState(
      produce((draft: IFilterModalState) => {
        draft.genres.isListOpen = !draft.genres.isListOpen;
      })
    );
  };

  const handleSortSelect = (sortType: SortType) => {
    setFilterState(
      produce((draft: IFilterModalState) => {
        draft.sort.selected =
          draft.sort.selected === sortType ? null : sortType;
      })
    );
  };

  const toggleSort = () => {
    setFilterState(
      produce((draft: IFilterModalState) => {
        draft.sort.isSortOpen = !draft.sort.isSortOpen;
      })
    );
  };

  const handleGenreClick = (genre: IGenre) => {
    setFilterState(
      produce((draft: IFilterModalState) => {
        const genreIndex = draft.genres.selectedGenres.findIndex(
          (id: string) => id === genre._id
        );

        if (genreIndex > -1) {
          draft.genres.selectedGenres.splice(genreIndex, 1);
        } else {
          draft.genres.selectedGenres.push(genre._id);
        }
      })
    );
  };

  const handleClear = () => {
    setFilterState(
      produce((draft: IFilterModalState) => {
        draft.genres.selectedGenres = [];
        draft.sort.selected = null;
      })
    );
  };

  const isSelected = (id: string) =>
    genres.selectedGenres.some((genreId: string) => genreId === id)
      ? `${styles.selectedItem} ${styles[`selectedItem--${theme}`]}`
      : '';

  const getSortClasses = (type: SortType) =>
    clsx(
      styles.genreItem,
      styles[`genreItem--${theme}`],
      sort.selected === type && styles.selectedItem,
      sort.selected === type && styles[`selectedItem--${theme}`]
    );

  const hasActiveFilters =
    genres.selectedGenres.length > 0 || sort.selected !== null;

  return (
    <div className={clsx(styles.filterContainer, 'container')}>
      <div className={clsx(styles.sectionContainer)}>
        <div className={clsx(styles.filterButtons)}>
          <Button variant="icon" theme={theme} onClick={toggleList}>
            <p className={styles.title}>
              GENRES
              {genres.selectedGenres.length > 0 &&
                `(${genres.selectedGenres.length})`}
            </p>
            <div className={styles.iconButton}>
              {!genres.isListOpen ? <PlusIcon /> : <MinusIcon />}
            </div>
          </Button>
        </div>
        {genres.isListOpen && (
          <div className={styles.genres}>
            {genresData?.map((genre: IGenre) => (
              <button
                key={genre._id}
                type="button"
                className={clsx(
                  styles.genreItem,
                  styles[`genreItem--${theme}`],
                  isSelected(genre._id)
                )}
                onClick={() => handleGenreClick(genre)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className={clsx(styles.sectionContainer)}>
        <div className={clsx(styles.filterButtons)}>
          <Button variant="icon" theme={theme} onClick={toggleSort}>
            <p className={styles.title}>SORT BY</p>
            <div className={styles.iconButton}>
              {!sort.isSortOpen ? <PlusIcon /> : <MinusIcon />}
            </div>
          </Button>
        </div>
        {sort.isSortOpen && (
          <div className={clsx(styles.sortItem)}>
            <button
              type="button"
              onClick={() => handleSortSelect('recently_added')}
              className={getSortClasses('recently_added')}
            >
              Recently added
            </button>
            <button
              type="button"
              onClick={() => handleSortSelect('a_to_z')}
              className={getSortClasses('a_to_z')}
            >
              A-Z
            </button>
            <button
              type="button"
              onClick={() => handleSortSelect('z_to_a')}
              className={getSortClasses('z_to_a')}
            >
              Z-A
            </button>
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        <Button variant="text" theme={theme} onClick={onApplyFilters}>
          SHOW THE RESULTS
        </Button>
        <Button
          variant="text"
          theme={theme}
          onClick={handleClear}
          disabled={!hasActiveFilters}
        >
          CLEAR
        </Button>
      </div>
    </div>
  );
};

export default FilterModal;
