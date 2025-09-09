import { FC } from 'react';
import clsx from 'clsx';
import type IArtist from '../../types/Artist';
import styles from './Card.module.scss';
import getImageSrc from '@/utils/getImageSrc';
import type { theme } from '@/types/types';

export interface ICardProps {
  artist: IArtist;
  theme: theme;
}

const Card: FC<ICardProps> = ({ theme, artist }) => {
  const { name, yearOfCreation, image } = artist.mainPainting;

  return (
    <div className={styles.painting}>
      <a href="#" className={styles.linkboxOverlay}></a>
      <img src={getImageSrc(image.src)} alt={name} />
      <div className={clsx(styles.container, styles[`container--${theme}`])}>
        <div>
          <p>{name}</p>
          <p className={clsx(styles.created, styles[`created--${theme}`])}>{yearOfCreation}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
