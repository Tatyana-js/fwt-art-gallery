import { selectIsAuth } from '@/store/index';
import clsx from 'clsx';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Artist.module.scss';

import ArtistInfo from './components/ArtistInfo';

import IArtist from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';
import Card from '@/ui_kit/Card/Card';
import Modal from '@/ui_kit/Modal';

import BackIcon from '@/assets/icons/BackIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';

import ArtistModal from '../ArtistModal';
import DeleteModal from '../DeleteModal';

export interface IArtistsProps {
  artist: IArtist;
  theme: theme;
}

const Artist: FC<IArtistsProps> = ({ artist, theme }) => {
  const [isDeleteModal, setDeleteModal] = useState<boolean>(false);
  const [isEditModal, setEditModal] = useState<boolean>(false);

  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const { name, yearsOfLife, description, genres, avatar } = artist;

  return (
    <>
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
            <Button
              variant="icon"
              theme={theme}
              onClick={() => setEditModal(true)}
            >
              <EditIcon />
            </Button>
            <Button
              variant="icon"
              theme={theme}
              onClick={() => setDeleteModal(true)}
            >
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
          className={clsx(
            styles.tabletLgOnly,
            styles[`tabletLgOnly--${theme}`]
          )}
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
      {isDeleteModal && (
        <Modal
          variant="deleteArtist"
          closeModal={() => setDeleteModal(false)}
        >
          <DeleteModal
            theme={theme}
            artist={artist}
            type="artist"
            closeModal={() => setDeleteModal(false)}
          />
        </Modal>
      )}
      {isEditModal && (
        <Modal
          variant="addArtist"
          closeModal={() => setEditModal(false)}
        >
          <ArtistModal closeModal={() => setEditModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default Artist;
