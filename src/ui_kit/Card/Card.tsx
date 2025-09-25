import { FC } from 'react';
import clsx from 'clsx';
import styles from './Card.module.scss';
import getImageSrc from '@/utils/getImageSrc';
import type { theme } from '@/types/types';
import ComeIn from '@/assets/icons/ComeIn';

export interface ICardProps {
  name: string;
  imageSrc: string;
  details: string;
  theme: theme;
  type: 'painting' | 'artist';
}

const Card: FC<ICardProps> = ({ theme, name, imageSrc, details, type }) => (
    <div
      className={clsx(
        styles.painting,
        type === 'artist' && styles.paintingArtist
      )}
    >
      <a href="#" className={styles.linkboxOverlay}></a>
      <img src={getImageSrc(imageSrc)} alt={name} width={100} height={100} />
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

export default Card;
