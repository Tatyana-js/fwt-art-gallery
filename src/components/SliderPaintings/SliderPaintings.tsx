import clsx from 'clsx';
import { FC, useCallback, useEffect } from 'react';

import styles from './SliderPaintings.module.scss';

import { IPainting } from '@/types/Artist';
import { theme } from '@/types/types';

import Button from '@/ui_kit/Buttons';

import getImageSrc from '@/utils/getImageSrc';

import ArrowIcon from '@/assets/icons/ArrowIcon';
import ClearIcon from '@/assets/icons/ClearIcon';
import DeleteIcon from '@/assets/icons/DeleteIcon';
import EditIcon from '@/assets/icons/EditIcon';
import PreviewIcon from '@/assets/icons/PreviewIcon';

interface ISliderPaintingsProps {
  theme: theme;
  paintings: IPainting[];
  currentIndex: number;
  onDeleteModal: (painting: IPainting) => void;
  onPaintModal: () => void;
  onSlideChange: (index: number) => void;
  openSlider: () => void;
}

const SliderPaintings: FC<ISliderPaintingsProps> = ({
  theme,
  paintings,
  currentIndex,
  onDeleteModal,
  onPaintModal,
  onSlideChange,
  openSlider,
}) => {
  const goToNext = useCallback(() => {
    const nextIndex = (currentIndex + 1) % paintings.length;
    onSlideChange(nextIndex);
  }, [currentIndex, onSlideChange, paintings.length]);

  const goToPrev = useCallback(() => {
    const prevIndex = (currentIndex - 1 + paintings.length) % paintings.length;
    onSlideChange(prevIndex);
  }, [currentIndex, onSlideChange, paintings.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrev();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unlocked';
    };
  }, [currentIndex, goToNext, goToPrev, paintings.length]);

  const currentPainting = paintings[currentIndex];
  if (!currentPainting) {
    openSlider();
    return null;
  }
  const { name, yearOfCreation } = currentPainting;

  return (
    <div className={styles.container}>
      <div className={styles.mainImageContainer}>
        <img
          src={getImageSrc(currentPainting.image.src)}
          alt={currentPainting.name}
          className={styles.mainImage}
        />
        <div className={styles.removeContainer}>
          <div className={styles.previewIcon}>
            <Button variant="icon" theme={theme}>
              <PreviewIcon />
            </Button>
          </div>
          <Button variant="text" theme={theme}>
            REMOVE THE COVER
          </Button>
        </div>
        <button
          type="button"
          aria-label="Close modal"
          className={clsx(styles.clearButton, styles[`clearButton--${theme}`])}
          onClick={openSlider}
        >
          <ClearIcon />
        </button>
        <div className={styles.buttonNext}>
          <Button variant="icon" theme={theme} onClick={goToNext}>
            <ArrowIcon />
          </Button>
        </div>
        <div className={styles.buttonPrev}>
          <Button variant="icon" theme={theme} onClick={goToPrev}>
            <ArrowIcon />
          </Button>
        </div>
        <div
          className={clsx(
            styles.infoContainer,
            styles[`infoContainer--${theme}`]
          )}
        >
          <div className={clsx(styles.line, styles[`line--${theme}`])}></div>
          <p className={clsx(styles.details, styles[`details--${theme}`])}>
            {yearOfCreation}
          </p>
          <p>{name}</p>
        </div>
        <div className={styles.editButtons}>
          <Button variant="icon" theme={theme} onClick={onPaintModal}>
            <EditIcon />
          </Button>
          <Button
            variant="icon"
            theme={theme}
            onClick={() => onDeleteModal(currentPainting)}
          >
            <DeleteIcon />
          </Button>
        </div>
        <div className={styles.pageCounter}>
          {currentIndex + 1} / {paintings.length}
        </div>
      </div>
      <div className={styles.thumbnails}>
        {paintings.map((painting, index) => (
          <img
            key={painting._id}
            src={painting.image.src}
            alt={painting.name}
            onClick={() => onSlideChange(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SliderPaintings;
