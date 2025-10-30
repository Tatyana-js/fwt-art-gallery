import { useDeleteArtistMutation } from '@/api/artistsApi';
import clsx from 'clsx';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './DeleteModal.module.scss';

import IArtist from '@/types/Artist';
import type { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import DeleteIcon from '@/assets/icons/DeleteIcon';

interface IDeleteModaleProps {
  theme: theme;
  artist: IArtist;
  closeModal?: (value: boolean) => void;
}

const DeleteModale: FC<IDeleteModaleProps> = ({
  theme,
  artist,
  closeModal,
}) => {
  const [deleteArtist] = useDeleteArtistMutation();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.deleteButton}>
        <Button
          variant="icon"
          theme={theme}
          onClick={() => {
            deleteArtist(artist._id);
            navigate('/');
          }}
        >
          <DeleteIcon />
        </Button>
      </div>
      <p
        className={clsx(
          styles.deleteQuestion,
          styles[`deleteQuestion--${theme}`]
        )}
      >
        Do you want to delete this artist profile?
      </p>
      <p className={styles.textWarning}>
        You will not be able to recover this profile afterwards.
      </p>
      <Button
        variant="defaultButton"
        theme={theme}
        onClick={() => {
          deleteArtist(artist._id);
          navigate('/');
        }}
      >
        DELETE
      </Button>
      <Button
        variant="text"
        theme={theme}
        onClick={() => {
          if (closeModal) {
            closeModal(false);
          }
        }}
      >
        CANCEL
      </Button>
    </div>
  );
};

export default DeleteModale;
