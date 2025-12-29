import clsx from 'clsx';
import { FC } from 'react';

import styles from './Card.module.scss';

import type { theme } from '@/types/types';

import getImageSrc from '@/utils/getImageSrc';

import ComeIn from '@/assets/icons/ComeIn';
import EmptyImage from '@/assets/image/EmptyImage';

export interface ICardProps {
  name?: string;
  imageSrc: string;
  details: string;
  theme: theme;
  type: 'painting' | 'artist';
  onClick?: () => void;
}

const Card: FC<ICardProps> = ({
  theme,
  name,
  imageSrc,
  details,
  type,
  onClick,
}) => {
  const isEmpty = !imageSrc;

  return (
    <div
      onClick={onClick}
      className={clsx(
        styles.painting,
        type === 'artist' && [
          styles.paintingArtist,
          theme && styles[`paintingArtist--${theme}`],
        ]
      )}
    >
      <a
        aria-label="Link to artist"
        href="#"
        className={styles.linkboxOverlay}
      ></a>
      {isEmpty ? (
        <div className={styles.emptyContainer}>
          <EmptyImage />
          <p className={styles.emptyMessage}>NO IMAGE UPLOADED</p>
        </div>
      ) : (
        <img src={getImageSrc(imageSrc)} alt={name || 'Avatar'} />
      )}
      <div
        className={clsx(
          styles.container,
          styles[`container--${theme}`],
          type === 'artist' && styles.containerArtist
        )}
      >
        <div className={clsx(styles.line, styles[`line--${theme}`])}>
          <ComeIn />
        </div>
        <p className={clsx(styles.name, styles[`name--${theme}`])}>{name}</p>
        <p className={clsx(styles.details, styles[`details--${theme}`])}>
          {details}
        </p>
      </div>
    </div>
  );
};

export default Card;
