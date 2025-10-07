import { FC } from 'react';
import styles from './Artist.module.scss';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import router from '@/utils/routes';
import Card from '@/ui_kit/Card/Card';
import Button from '@/ui_kit/Buttons';
// import SelectButton from '@/assets/icons/SelectButton';
// import type { IGenre } from '@/types/Artist';
// import Label from '@/ui_kit/Label';
import ArtistInfo from '../ArtistInfo';
import IArtist from '@/types/Artist';
import { theme } from '@/types/types';
import BackIcon from '@/assets/icons/BackIcon';

export interface IArtistsProps {
  artist: IArtist;
  theme: theme;
}

const Artist: FC<IArtistsProps> = ({ artist, theme }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(router.artists());
  };

  const { name, avatar, yearsOfLife, description, genres } = artist;

  return (
    <div className={clsx('container', styles.container)}>
      <div
        onClick={handleBack}
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
      </div>
      <Card
        type="artist"
        theme={theme}
        name={name}
        imageSrc={avatar?.src || ''}
        details={yearsOfLife}
      />
      <div
        className={clsx(styles.tabletLgOnly, styles[`tabletLgOnly--${theme}`])}
      >
        <div className={clsx(styles.line, styles[`line--${theme}`])}></div>
        <p className={clsx(styles.details, styles[`details--${theme}`])}>
          {yearsOfLife}
        </p>
        <p className={clsx(styles.name, styles[`name--${theme}`])}>{name}</p>
        <ArtistInfo theme={theme} description={description} genres={genres} />
      </div>
      <div className={clsx('container', styles.notDesctop)}>
        <ArtistInfo theme={theme} description={description} genres={genres} />
      </div>
    </div>
  );
};

export default Artist;
