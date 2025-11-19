import clsx from 'clsx';
import { FC } from 'react';

import styles from './Loader.module.scss';

import { theme } from '@/types/types';

interface ILoaderProps {
  theme: theme;
}

const Loader: FC<ILoaderProps> = ({ theme }) => (
  <div className={clsx(styles.loader, styles[`loader--${theme}`])}></div>
);

export default Loader;
