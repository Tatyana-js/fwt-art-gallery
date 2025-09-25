import { FC, useState } from 'react';
import type { theme } from '@/types/types';
import styles from './ArtistProfile.module.scss';
import type IArtist from '../../types/Artist';
import BackIcon from '@/assets/icons/BackIcon';
import clsx from 'clsx';
import Card from '@/ui_kit/Card/Card';
import { Button } from '@/ui_kit/Buttons';
import SelectButton from '@/assets/icons/SelectButton';
import type { IGenre } from '@/types/Artist';
import { Label } from '@/ui_kit/Label';
import Grid from '@/ui_kit/Grid/Grid';
import type { IMainPainting } from '@/types/Artist';

export interface IArtistProfile {
  theme: theme;
  artist: IArtist;
  onClick: () => void;
}

const ArtistProfile: FC<IArtistProfile> = ({ theme, onClick, artist }) => {
  const [isOpen, setIsOpen] = useState(false);

  const { name, avatar, yearsOfLife, description, genres, paintings } = artist;
  return (
    <>
      <div className={styles.containerArtist}>
        <button
          type="button"
          aria-label="button back"
          onClick={onClick}
          className={clsx(styles.buttonBack, styles[`buttonBack--${theme}`])}
        >
          <div className={styles.rotated}>
            <BackIcon />
          </div>
          <div className={clsx(styles.tablet, styles[`tablet--${theme}`])}>
            <Button variant="text" theme={theme}>
              BACK
            </Button>
          </div>
        </button>
        <Card
          type="artist"
          theme={theme}
          name={name}
          imageSrc={avatar?.src || ''}
          details={yearsOfLife}
        />
        <div
          className={clsx(
            styles.container,
            styles[`container--${theme}`],
            'container'
          )}
        >
          <div className={styles.tabletLgOnly}>
            <div className={clsx(styles.line, styles[`line--${theme}`])}></div>
            <p className={clsx(styles.details, styles[`details--${theme}`])}>
              {yearsOfLife}
            </p>
            <p className={clsx(styles.name, styles[`name--${theme}`])}>
              {name}
            </p>
          </div>
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
          <button
            type="button"
            aria-label="Toggle dropdown menu"
            onClick={() => setIsOpen(!isOpen)}
            className={styles.selectButton}
          >
            <Button variant="text" theme={theme}>
              {isOpen ? 'READ LESS' : 'READ MORE'}
            </Button>
            <div className={clsx(styles.rotated, styles[`rotated--${theme}`])}>
              <SelectButton />
            </div>
          </button>
          <div className={clsx(styles.genresContainer)}>
            {genres.map(({ _id, name }: IGenre) => (
              <Label key={_id} theme={theme}>
                {name}
              </Label>
            ))}
          </div>
        </div>
        <h3 className={clsx(styles.workTitle, styles[`workTitle--${theme}`])}>
          Artworks
        </h3>
      </div>
      <Grid>
        {paintings.map(
          ({ _id, name, yearOfCreation, image }: IMainPainting) => (
            <Card
              key={_id}
              theme={theme}
              name={name}
              details={yearOfCreation}
              imageSrc={image.src}
              type="painting"
            />
          )
        )}
      </Grid>
    </>
  );
};
export default ArtistProfile;
