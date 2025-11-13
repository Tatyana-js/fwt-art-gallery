import clsx from 'clsx';
import React from 'react';

import styles from './AuthSection.module.scss';

import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Search from '@/ui_kit/Search';

import FilterIcon from '@/assets/icons/FilterIcon';
import PlusIcon from '@/assets/icons/PlusIcon';

interface AuthSectionProps {
  theme: theme;
  value: string;
  onChange: (value: string) => void;
  onAddArtist: () => void;
  onOpenFilter: () => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({
  theme,
  value,
  onChange,
  onAddArtist,
  onOpenFilter,
}) => (
  <div
    className={clsx(
      styles.buttonContainer,
      styles[`buttonContainer--${theme}`]
    )}
  >
    <div className={styles.addArtistButton}>
      <Button variant="text" theme={theme} onClick={onAddArtist}>
        <PlusIcon />
        ADD ARTISTS
      </Button>
    </div>
    <div className={styles.buttons}>
      <div className={styles.searchButton}>
        <Search theme={theme} value={value} onChange={onChange} />
      </div>
      <div
        className={clsx(styles.filterButton, styles[`filterButton--${theme}`])}
      >
        <Button variant="icon" theme={theme} onClick={onOpenFilter}>
          <FilterIcon />
        </Button>
      </div>
    </div>
  </div>
);

export default AuthSection;
