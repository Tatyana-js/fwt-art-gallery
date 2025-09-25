import { ReactNode } from 'react';
import styles from './Grid.module.scss';

export interface IGridProps {
  children: ReactNode[];
}

const Grid: React.FC<IGridProps> = ({ children }) => (
  <div className="container">
    <div className={styles.galleryList}>{children}</div>
  </div>
);

export default Grid;
