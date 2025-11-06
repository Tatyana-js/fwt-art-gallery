import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Artist.module.scss';

import ArtistInfo from './components/ArtistInfo';

import IArtist from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';

import BackIcon from '@/assets/icons/BackIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';

export interface IArtistsProps {
  artist: IArtist;
  theme: theme;
  artistModal?: () => void;
  openDeleteModal?: () => void;
}

const Artist: FC<IArtistsProps> = ({
  artist,
  theme,
  artistModal,
  openDeleteModal,
}) => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const { name, yearsOfLife, description, genres, avatar } = artist;

  return (
    <div className={clsx('container', styles.container)}>
      <div
        className={clsx(styles.buttonsBack, styles[`buttonsBack--${theme}`])}
      >
        <Button variant="text" theme={theme} onClick={() => navigate('/')}>
          <BackIcon />
          <span className={styles.backText}>BACK</span>
        </Button>
      </div>
      {isAuth && (
        <div className={styles.editButtons}>
          <Button variant="icon" theme={theme} onClick={artistModal}>
            <EditIcon />
          </Button>
          <Button variant="icon" theme={theme} onClick={openDeleteModal}>
            <DeleteIcon />
          </Button>
        </div>
      )}
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
