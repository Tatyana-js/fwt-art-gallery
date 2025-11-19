import clsx from 'clsx';
import { FC } from 'react';

import styles from './Skeletons.module.scss';

import { theme } from '@/types/types';

interface ISkeletonsProps {
  theme: theme;
}

const Skeletons: FC<ISkeletonsProps> = ({ theme }) => (
  <div className={clsx(styles.painting, styles[`painting--${theme}`])}>
    <div className={clsx(styles.container, styles[`container--${theme}`])}>
      <p className={clsx(styles.name, styles[`name--${theme}`])}></p>
      <p className={clsx(styles.details, styles[`details--${theme}`])}></p>
    </div>
  </div>
);

export default Skeletons;
