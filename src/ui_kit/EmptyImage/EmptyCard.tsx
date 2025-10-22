import clsx from 'clsx';

import styles from './EmptyCard.module.scss';

import type { theme } from '@/types/types';

import EmptyImage from '@/assets/image/EmptyImage';

export interface ICardProps {
  theme: theme;
}

const EmptyCard = ({ theme }: ICardProps) => {
  return (
    <div
      className={clsx(styles.cardContainer, styles[`cardContainer--${theme}`])}
    >
      <div className={styles.emptyProfile}>
        <div className={styles.image}>
          <EmptyImage />
        </div>
        <p>NO IMAGE UPLOADED</p>
      </div>
    </div>
  );
};

export default EmptyCard;
