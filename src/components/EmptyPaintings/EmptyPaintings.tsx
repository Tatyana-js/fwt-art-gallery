import clsx from 'clsx';
import { FC } from 'react';
import type { theme } from '@/types/types';
import styles from './EmptyPaintings.module.scss';

import Button from '@/ui_kit/Buttons';

import PlusIcon from '@/assets/icons/PlusIcon';
import EmptyImage from '@/assets/image/EmptyImage';

interface IEmptyPaintings {
  theme: theme;
  onAddPaint: () => void;
  isPaintModalOpen: boolean;
}

const EmptyPaintings: FC<IEmptyPaintings> = ({
  theme,
  onAddPaint,
  isPaintModalOpen,
}) => {
  return (
    <>
      <div className={styles.paintings}>
        <div
          className={clsx(
            styles.emptyContainer,
            styles[`emptyContainer--${theme}`]
          )}
        >
          <EmptyImage />
          <div
            className={clsx(styles.addButton, styles[`addButton--${theme}`])}
          >
            {!isPaintModalOpen && (
              <Button theme={theme} variant="circleIcon" onClick={onAddPaint}>
                <PlusIcon />
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.messageContainer}>
        <div className={clsx(styles.line, styles[`line--${theme}`])}></div>
        <p className={clsx(styles.message)}>
          The paintings of this artist have not been uploaded yet.
        </p>
      </div>
    </>
  );
};

export default EmptyPaintings;
