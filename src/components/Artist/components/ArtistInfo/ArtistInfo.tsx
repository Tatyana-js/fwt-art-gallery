import clsx from 'clsx';
import { FC, useState } from 'react';

import styles from './Artistinfo.module.scss';

import type { IGenre } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Label from '@/ui_kit/Label';

import SelectButton from '@/assets/icons/SelectButton';

export interface IArtistInfoProps {
  description: string;
  genres: IGenre[];
  theme: theme;
}

const ArtistInfo: FC<IArtistInfoProps> = ({ theme, description, genres }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <p
        className={clsx(
          styles.description,
          styles[`description--${theme}`],
          !isOpen && styles[`gradient--${theme}`]
        )}
      >
        {description.length < 256
          ? description
          : isOpen
            ? description
            : `${description.substring(0, 256)}...`}
      </p>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.selectButton}>
        <Button variant="text" theme={theme}>
          {isOpen ? 'READ LESS' : 'READ MORE'}
        </Button>
        <div className={clsx(styles.rotated, styles[`rotated--${theme}`])}>
          <SelectButton />
        </div>
      </div>
      <div className={clsx(styles.genresContainer)}>
        {genres.map(({ _id, name }: IGenre) => (
          <Label key={_id} theme={theme}>
            {name}
          </Label>
        ))}
      </div>
    </>
  );
};

export default ArtistInfo;
